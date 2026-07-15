'use client'

// libraries
import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// img
import img1 from '@/assets/img/xray.jpg'
import img2 from '@/assets/img/bio-lab.jpg'
import img3 from '@/assets/img/group.png'
import img4 from '@/assets/img/pillars.png'

gsap.registerPlugin(ScrollTrigger, SplitText)

const dimensoes = [
	{
		title: 'Desrisking Científico e Tecnológico',
		text: 'Identificamos as incertezas críticas de cada ativo e estruturamos seu desenvolvimento para reduzi-las progressivamente. A geração de evidências científicas, a validação tecnológica e o avanço de maturidade são orientados por marcos de decisão, permitindo concentrar capital e recursos nos ativos que demonstram maior consistência e potencial de valorização. O objetivo não é apenas avançar a pesquisa. É aumentar a qualidade e a confiabilidade do ativo.',
		image: img1
	},
	{
		title: 'Propriedade Intelectual e Defensibilidade',
		text: 'A propriedade intelectual é parte central da construção do ativo farmacêutico. Avaliamos titularidade, novidade, potencial de proteção, liberdade de operação e estratégia de expansão da proteção ao longo do desenvolvimento. Ciência protegida deixa de ser apenas conhecimento e passa a constituir um ativo intangível com potencial de geração de valor econômico.',
		image: img2
	},
	{
		title: 'Governança Científica Especializada',
		text: 'Cada ativo é acompanhado por especialistas selecionados de acordo com sua natureza científica, tecnológica e terapêutica. A governança científica fortalece a qualidade das decisões, o rigor metodológico e a análise independente dos marcos de desenvolvimento, apoiando decisões de continuidade, redirecionamento ou NO GO. Na Aether, avançar também significa saber quando não avançar.',
		image: img3
	},
	{
		title: 'Maturação e Valorização do Ativo',
		text: 'O desenvolvimento é estruturado para aumentar progressivamente a maturidade científica, tecnológica e estratégica de cada ativo. À medida que riscos relevantes são reduzidos, evidências são consolidadas e a propriedade intelectual é fortalecida, o ativo amplia seu potencial de interesse para a indústria farmacêutica e para parceiros especializados. Cada avanço deve aumentar não apenas o TRL, mas também a qualidade estratégica e o potencial de monetização do ativo.',
		image: img4
	}
]

export default function PDDimensoes() {

	const outerRef = useRef<HTMLDivElement>(null)
	const stickyRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const outer = outerRef.current
		const sticky = stickyRef.current
		if (!outer || !sticky) return

		;(async () => {
			await document.fonts.ready

			if (!outer || !sticky) return

			const images = sticky.querySelectorAll<HTMLElement>('[data-slide-image]')
			const items = sticky.querySelectorAll<HTMLElement>('[data-slide-item]')
			const segments = sticky.querySelectorAll<HTMLElement>('[data-slide-segment]')
			const counter = sticky.querySelector<HTMLElement>('[data-slide-counter]')
			const count = dimensoes.length
			let currentIdx = 0

			// Pre-split all titles so chars are ready to animate
			const splits = Array.from(items).map(item => {
				const titleEl = item.querySelector<HTMLElement>('[data-title]')!
				const bodyEl = item.querySelector<HTMLElement>('[data-body]')!

				const split = new SplitText(titleEl, {
					type: 'lines,chars',
					linesClass: 'split-line'
				})
				// clip chars within their line
				gsap.set(split.lines, { overflow: 'hidden' })

				return { split, bodyEl }
			})

			// Initial state
			gsap.set(images, { opacity: 0 })
			gsap.set(images[0], { opacity: 1 })
			gsap.set(segments, { scaleY: 0 })

			splits.forEach(({ split, bodyEl }, i) => {
				if (i !== 0) {
					gsap.set(split.chars, { y: '110%' })
					gsap.set(bodyEl, { opacity: 0, y: 15 })
				}
			})

			const showItem = (idx: number) => {
				if (idx === currentIdx) return

				const prev = currentIdx
				currentIdx = idx

				// Crossfade images
				images.forEach((img, i) => {
					gsap.to(img, {
						opacity: i === idx ? 1 : 0,
						duration: 0.8,
						ease: 'power2.inOut',
						overwrite: true
					})
				})

				// Title out
				gsap.to(splits[prev].split.chars, {
					y: '-110%',
					duration: 0.3,
					ease: 'power2.in',
					stagger: { each: 0.006, from: 'end' },
					overwrite: true
				})
				// Body out
				gsap.to(splits[prev].bodyEl, {
					opacity: 0,
					y: -12,
					duration: 0.2,
					ease: 'power2.in',
					overwrite: true
				})

				// Title in
				gsap.fromTo(
					splits[idx].split.chars,
					{ y: '110%' },
					{
						y: '0%',
						duration: 0.55,
						ease: 'back.out(1.7)',
						stagger: 0.009,
						delay: 0.2,
						overwrite: true
					}
				)
				// Body in
				gsap.fromTo(
					splits[idx].bodyEl,
					{ opacity: 0, y: 15 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: 'power3.out',
						delay: 0.3,
						overwrite: true
					}
				)

				if (counter) {
					counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
				}
			}

			ScrollTrigger.create({
				scroller: document.getElementById('viewport') as HTMLElement,
				trigger: outer,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: (self) => {
					const raw = self.progress * count
					const idx = Math.min(Math.floor(raw), count - 1)
					const local = Math.min(raw - idx, 1)

					// Fill each segment: past = full, current = local progress, future = empty
					segments.forEach((seg, i) => {
						const fill = i < idx ? 1 : i === idx ? local : 0
						gsap.set(seg, { scaleY: fill })
					})

					showItem(idx)
				}
			})
		})()
	}, { scope: outerRef })

	return (
		<section>

			{/* Desktop: scroll-pinned */}
			<div
				ref={outerRef}
				className='hidden lg:block relative'
				style={{ height: `${dimensoes.length * 100}vh` }}
			>
				<div
					ref={stickyRef}
					className='sticky top-0 h-svh overflow-hidden'
				>

					{/* Background images */}
					{dimensoes.map((item, i) => (
						<div
							key={i}
							data-slide-image
							className='absolute inset-0'
						>
							<Image
								src={item.image}
								alt=''
								fill
								className='cover'
								sizes='100vw'
								priority={i === 0}
							/>
						</div>
					))}

					{/* Scrim */}
					<div className='absolute inset-0 z-1 bg-green-dark/60' />

					{/* Vertical progress bar - center-right */}
					<div className='absolute right-12 lg:right-[5vw] top-1/2 -translate-y-1/2 z-3 flex flex-col gap-[5px]'>
						{dimensoes.map((_, i) => (
							<div
								key={i}
								className='w-0.75 h-14 rounded-full overflow-hidden'
								style={{ background: 'rgba(224,230,161,0.2)' }}
							>
								<div
									data-slide-segment={i}
									className='w-full h-full rounded-full origin-top'
									style={{
										background: '#E0E6A1',
										transform: 'scaleY(0)'
									}}
								/>
							</div>
						))}
					</div>

					{/* Content */}
					<div className='relative z-2 h-full flex flex-col justify-between text-green-light pt-32 lg:pt-[10vw] pb-20 lg:pb-[6vw]'>

						<div className='base-container'>
							<h2 className='text-24 font-heading max-w-2xl'>
								Quatro dimensões.<br />Uma abordagem integrada.
							</h2>
						</div>

						<div className='base-container'>

							{/* Counter */}
							<p
								data-slide-counter
								className='text-sm font-heading font-semibold opacity-50 mb-6'
							>
								01 / {String(dimensoes.length).padStart(2, '0')}
							</p>

							{/* Text items */}
							<div className='relative'>
								{dimensoes.map((item, i) => (
									<div
										key={i}
										data-slide-item
										style={{
											position: i === 0 ? 'relative' : 'absolute',
											top: 0,
											left: 0,
											right: 0
										}}
									>
										<div className='row'>
											<div className='col-lg-8'>
												<h2
													data-title
													className='text-60 font-heading font-semibold mb-6'
												>
													{item.title}
												</h2>
												<p
													data-body
													className='text-20 leading-relaxed opacity-90'
												>
													{item.text}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

						</div>
					</div>

				</div>
			</div>

			{/* Mobile: stacked cards */}
			<div className='lg:hidden'>
				<div className='base-container pt-16 pb-12'>

					<h2 className='text-60 font-heading font-semibold text-green-dark mb-10'>
						Quatro dimensões. Uma abordagem integrada.
					</h2>

					<div className='flex flex-col gap-12'>
						{dimensoes.map((item, i) => (
							<div key={i}>

								<div className='relative aspect-4/3 rounded-sm overflow-hidden bg-green-dark'>
									<Image
										src={item.image}
										alt=''
										fill
										className='object-cover'
										sizes='100vw'
										loading='lazy'
									/>
								</div>

								<h3 className='text-30 font-heading font-semibold leading-tight text-green-dark mt-5'>
									{item.title}
								</h3>

								<p className='text-16 leading-relaxed opacity-70 mt-3'>
									{item.text}
								</p>

							</div>
						))}
					</div>

				</div>
			</div>

		</section>
	)
}
