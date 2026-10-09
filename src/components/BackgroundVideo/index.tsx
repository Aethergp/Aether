'use client'

// libraries
import { useEffect, useRef } from 'react'

interface Props {
	src: string
	poster?: string
	className?: string
}

// muted looping background video that stops decoding once it leaves the viewport.
// An IntersectionObserver rather than a ScrollTrigger, so it adds nothing to
// ScrollTrigger's refresh pass.
export default function BackgroundVideo({ src, poster, className }: Props) {

	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) video.play().catch(() => {})
			else video.pause()
		})
		observer.observe(video)

		return () => observer.disconnect()
	}, [])

	return (
		<video
			ref={videoRef}
			loop
			muted
			playsInline
			autoPlay
			poster={poster}
			className={className}
		>
			<source
				src={src}
				type='video/mp4'
			/>
		</video>
	)
}
