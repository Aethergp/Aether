'use client'

// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import BioGrainient from './BioGrainient'


const words = ['+ Ciência de alto potencial', '+ Evidências', '+ Ativos farmacêuticos']
export default function Hero() {

	const rootRef = useRef<HTMLElement>(null)
	const pinRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const scroller = document.getElementById('viewport') as HTMLElement
		const root = rootRef.current
		const pin = pinRef.current
		if (!root || !pin) return

		const circles = gsap.utils.toArray<HTMLElement>('[data-circle]', root)
		gsap.set(circles, { scale: 0.5, opacity: 0 })

		const isDesktop = window.innerWidth >= 992

		if (isDesktop) {
			const tl = gsap.timeline({
				scrollTrigger: {
					scroller,
					trigger: pin,
					start: 'top top',
					end: '+=' + window.innerHeight * 1.8,
					pin,
					pinType: 'fixed',
					anticipatePin: 1,
					scrub: 1,
					refreshPriority: 1
				}
			})

			tl.to(circles[0], { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
				.to(circles[1], { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '>-0.35')
				.to(circles[2], { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '>-0.35')
				.to({}, { duration: 0.6 })

			requestAnimationFrame(() => ScrollTrigger.refresh(true))
		} else {
			circles.forEach((circle, i) => {
				gsap.to(circle, {
					scale: 1,
					opacity: 1,
					duration: 0.7,
					ease: 'power3.out',
					delay: i * 0.12,
					scrollTrigger: {
						scroller,
						trigger: circle,
						start: 'top 85%'
					}
				})
			})
		}
	}, { scope: rootRef })

	return (
		<section
			ref={rootRef}
			id='bio-field'
			className='relative text-cream'
		>
			<BioGrainient />

			<div className='relative z-2'>

				<div className='base-container min-h-lvh flex flex-col justify-center pt-32 lg:pt-[10vw] pb-16 lg:pb-[7vw]'>

					<div className='row'>
						<div className='col-lg-9'>
							<span className='block text-sm font-semibold uppercase tracking-wide opacity-70 mb-6 lg:mb-8'>
								(ict aetherbio+)
							</span>

							<MaskedIcon
								url='/img/svg/logo/aether-bio.svg'
								className='block w-full max-w-lg aspect-1179/148 bg-cream'
								position='left center'
							/>
						</div>
					</div>

					<div className='row pt-12 lg:pt-[6vw]'>
						<div className='col-lg-10'>
							<h1 className='text-72 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text='Onde ciência de alto potencial avança para se tornar um ativo farmacêutico.' />
							</h1>
						</div>
					</div>

					<div className='row pt-10 lg:pt-[4vw]'>
						
						<div className='col-lg-3' />

						<div className='col-lg-8'>
							<p className='text-20 leading-relaxed opacity-90'>
								<AnimatedText text='O ICT AetherBio+ é o pilar científico e tecnológico da plataforma Aether, responsável por articular competências, infraestrutura e recursos para promover o avanço e o desrisking de projetos farmacêuticos de alto potencial. Conectamos pesquisadores, universidades, centros de pesquisa e parceiros especializados para gerar evidências, reduzir incertezas e ampliar a maturidade científica e tecnológica dos projetos.' />
							</p>
						</div>

					</div>

				</div>

				<div
					ref={pinRef}
					className='flex items-center justify-center lg:h-svh py-20 lg:py-0'
				>
					<div className='flex flex-col lg:flex-row items-center lg:justify-center'>
						{words.map((word, i) => (
							<MagneticButton
								key={i}
								strength={45}
								className={clsx(i > 0 && '-mt-6 lg:mt-0 lg:-ml-[2vw]')}
							>
								<div
									data-circle
									style={{ opacity: 0, transform: 'scale(0.5)' }}
									className='flex items-center justify-center text-center rounded-full aspect-square w-[76vw] max-w-[24rem] lg:w-[29vw] lg:max-w-[34rem] border border-green-light text-green-light'
								>
									<span className='text-24 lg:text-30 font-heading font-semibold px-6'>
										{word}
									</span>
								</div>
							</MagneticButton>
						))}
					</div>
				</div>

			</div>

		</section>
	)
}
