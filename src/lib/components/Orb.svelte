<script lang="ts">
	import { onMount } from 'svelte';

	// A glowing core inside a shell of orbiting dashes, standing in for the
	// reference site's hero video.
	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const colors = ['96,165,250', '192,132,252', '45,212,191'];
		const pts = Array.from({ length: 320 }, () => {
			const u = Math.random() * 2 - 1;
			const t = Math.random() * Math.PI * 2;
			const s = Math.sqrt(1 - u * u);
			return {
				x: s * Math.cos(t),
				y: u,
				z: s * Math.sin(t),
				r: 0.62 + Math.random() * 0.38,
				len: 0.03 + Math.random() * 0.05,
				col: colors[Math.floor(Math.random() * 3)]
			};
		});

		let W = 0;
		let raf = 0;
		const size = () => {
			const d = devicePixelRatio || 1;
			W = canvas.clientWidth;
			canvas.width = W * d;
			canvas.height = W * d;
			ctx.setTransform(d, 0, 0, d, 0, 0);
		};

		const frame = (ts: number) => {
			if (canvas.clientWidth !== W) size();
			const a = ts * 0.00018;
			const b = Math.sin(ts * 0.0001) * 0.35;
			const c = W / 2;
			const R = W * 0.46;
			ctx.clearRect(0, 0, W, W);

			const g = ctx.createRadialGradient(c, c, 0, c, c, R * 0.42);
			g.addColorStop(0, 'rgba(167,139,250,.95)');
			g.addColorStop(0.55, 'rgba(124,58,237,.55)');
			g.addColorStop(1, 'rgba(124,58,237,0)');
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(c, c, R * 0.42, 0, Math.PI * 2);
			ctx.fill();

			ctx.lineCap = 'round';
			for (const p of pts) {
				const x = p.x * Math.cos(a) - p.z * Math.sin(a);
				let z = p.x * Math.sin(a) + p.z * Math.cos(a);
				const y = p.y * Math.cos(b) - z * Math.sin(b);
				z = p.y * Math.sin(b) + z * Math.cos(b);
				const depth = (z + 1) / 2;
				const r1 = p.r * R;
				const r2 = (p.r + p.len) * R;
				ctx.strokeStyle = `rgba(${p.col},${0.15 + depth * 0.75})`;
				ctx.lineWidth = 0.6 + depth * 1.2;
				ctx.beginPath();
				ctx.moveTo(c + x * r1, c + y * r1);
				ctx.lineTo(c + x * r2, c + y * r2);
				ctx.stroke();
			}
			if (!reduce) raf = requestAnimationFrame(frame);
		};

		size();
		addEventListener('resize', size);
		if (reduce) frame(4000);
		else raf = requestAnimationFrame(frame);

		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('resize', size);
		};
	});
</script>

<canvas bind:this={canvas} class="block aspect-square w-[min(78vw,520px)]" aria-hidden="true"
></canvas>
