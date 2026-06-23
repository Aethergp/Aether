'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

interface Item {
	year: string
	title: string
	text: string
}

export default function Timeline({ items }: { items: Item[] }) {

	const rootRef = useRef<HTMLDivElement>(null)
	const fillRef = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		const scroller = document.getElementById('viewport') as HTMLElement
		const root = rootRef.current
		const fill = fillRef.current
		if (!root || !fill) return

		// the line paints green from top to bottom as you scroll through the section
		gsap.fromTo(fill,
			{ scaleY: 0 },
			{
				scaleY: 1,
				ease: 'none',
				scrollTrigger: {
					scroller,
					trigger: root,
					start: 'top 65%',
					end: 'bottom 65%',
					scrub: true
				}
			}
		)

		// each node "lights up" to a lighter green as the line reaches it
		const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', root)
		nodes.forEach(node => {
			ScrollTrigger.create({
				scroller,
				trigger: node,
				start: 'top 60%',
				onEnter: () => gsap.to(node, {
					backgroundColor: 'var(--color-green-light)',
					boxShadow: '0 0 0 6px color-mix(in srgb, var(--color-green-light) 30%, transparent)',
					duration: 0.45,
					ease: 'power2.out'
				}),
				onLeaveBack: () => gsap.to(node, {
					backgroundColor: 'color-mix(in srgb, var(--color-green-dark) 25%, transparent)',
					boxShadow: '0 0 0 0px color-mix(in srgb, var(--color-green-light) 0%, transparent)',
					duration: 0.3,
					ease: 'power2.out'
				})
			})
		})
	}, { scope: rootRef })

	return (
		<div ref={rootRef} className='relative'>

			<span className='absolute left-0 top-0 bottom-0 w-px bg-green-dark/15' />

			<span
				ref={fillRef}
				className='absolute left-0 top-0 bottom-0 w-px bg-green-dark origin-top'
				style={{ transform: 'scaleY(0)' }}
			/>

			<StaggerUp className='flex flex-col'>
				{items.map((item, i) => (
					<div
						key={i}
						className='relative pl-8 lg:pl-12 pb-12 lg:pb-16 last:pb-0'
					>

						<span
							data-node
							className='absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-green-dark/25'
						/>

						<p className='text-36 lg:text-60 font-heading font-bold text-green-dark leading-none'>
							{item.year}
						</p>

						<h3 className='text-24 font-heading font-semibold mt-4 lg:mt-6'>
							{item.title}
						</h3>

						<p className='text-18 leading-relaxed mt-3 lg:pr-[10vw]'>
							{item.text}
						</p>

					</div>
				))}
			</StaggerUp>

		</div>
	)
}
