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

		const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', root)

		const setLit = (node: HTMLElement, lit: boolean) => {
			if ((node.dataset.lit === '1') === lit) return
			node.dataset.lit = lit ? '1' : '0'
			gsap.to(node, {
				backgroundColor: lit ? 'var(--color-green-light)' : 'color-mix(in srgb, var(--color-green-dark) 25%, transparent)',
				boxShadow: lit ? '0 0 0 6px color-mix(in srgb, var(--color-green-light) 30%, transparent)' : '0 0 0 0px color-mix(in srgb, var(--color-green-light) 0%, transparent)',
				duration: lit ? 0.35 : 0.25,
				ease: 'power2.out'
			})
		}

		// one scrubbed trigger drives BOTH the line fill and the node lighting from the
		// same scroll progress, so each node lights at the exact moment the painted line
		// reaches its center (no independent per-node trigger lagging behind)
		ScrollTrigger.create({
			scroller,
			trigger: root,
			start: 'top 65%',
			end: 'bottom 65%',
			scrub: true,
			onUpdate: self => {
				const p = self.progress
				gsap.set(fill, { scaleY: p })

				const filledPx = root.offsetHeight * p
				const rootTop = root.getBoundingClientRect().top
				nodes.forEach(node => {
					const r = node.getBoundingClientRect()
					const center = r.top - rootTop + r.height / 2
					setLit(node, filledPx >= center)
				})
			}
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
