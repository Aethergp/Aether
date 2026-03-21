'use client'

import { gsap } from 'gsap'

export function useAnchorScroll() {
	const scrollTo = (
		e: React.MouseEvent<HTMLElement>,
		href: string,
		options?: { duration?: number; ease?: string }
	) => {
		e.preventDefault()

		const target = document.querySelector(href)
		const viewport = document.getElementById('viewport')

		if (!target || !viewport) return

		// getBoundingClientRect().top is relative to the visible viewport (= the #viewport div top)
		// Adding viewport.scrollTop gives the absolute offset from the top of the scroll content
		const targetTop = target.getBoundingClientRect().top + viewport.scrollTop

		gsap.to(viewport, {
			scrollTop: targetTop,
			duration: options?.duration ?? 1.2,
			ease: options?.ease ?? 'power2.inOut'
		})
	}

	return scrollTo
}
