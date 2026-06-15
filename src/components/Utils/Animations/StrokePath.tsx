'use client'

// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// interface
interface Props {
	d: string
	viewBox: string
	className?: string
	start?: string
	end?: string
	markers?: boolean
}

export default function StrokePath({
	d,
	viewBox,
	className,
	start = '10% 80%',
	end = '50% 20%',
	markers = false
}: Props) {

	const svgRef = useRef<SVGSVGElement>(null)
	const pathRef = useRef<SVGPathElement>(null)

	useGSAP(() => {
		const svg = svgRef.current
		const path = pathRef.current
		if (!svg || !path) return

		const length = path.getTotalLength()

		gsap.set(path, { strokeDasharray: length })

		gsap.fromTo(path,
			{ strokeDashoffset: length },
			{
				strokeDashoffset: 0,
				ease: 'none',
				scrollTrigger: {
					scroller: document.getElementById('viewport') as HTMLElement,
					trigger: svg.parentElement ?? svg,
					start,
					end,
					scrub: 1.5,
					refreshPriority: -1,
					markers: markers
				}
			}
		)
	}, { scope: svgRef })

	return (
		<svg
			ref={svgRef}
			viewBox={viewBox}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			preserveAspectRatio='xMinYMax meet'
			aria-hidden='true'
			className={clsx(
				'absolute pointer-events-none h-auto object-contain text-green-light',
				className
			)}
		>
			<path
				ref={pathRef}
				d={d}
				stroke='currentColor'
				strokeWidth='100'
			/>
		</svg>
	)
}
