'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Button from '@/components/Button'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

export default function Banner() {

	const scrollTo = useAnchorScroll()
	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.to('[data-bg]', {
                opacity: 0.1,
                scale: 1.5,
                scrollTrigger: {
                    pin: '[data-bg]',
                    anticipatePin: 1,
                    pinType: 'fixed',
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
        }

		// animate h1 on preloader "init" event
		// split and hide chars immediately
		const initTitle = async () => {
			const h1 = titleRef.current
			if (!h1) return

			if (typeof document !== 'undefined' && document.fonts) {
				await document.fonts.ready
			}

			if (!titleRef.current) return

			const split = new SplitText(h1, {
				type: 'lines, words, chars',
				linesClass: 'split-line'
			})

			// chars start hidden
			gsap.set(split.chars, { y: '110%' })

			// when preloader finishes, animate them in
			const onInit = () => {
				gsap.to(split.chars, {
					y: '0%',
					duration: 0.5,
					ease: 'back.out(1.7)',
					stagger: 0.02,
					onComplete: () => {
						h1.classList.add('completed')
						split.revert()
					}
				})
			}

			window.addEventListener('init', onInit, { once: true })

			return () => {
				window.removeEventListener('init', onInit)
				split.revert()
			}
		}

		const cleanup = initTitle()

		return () => {
			cleanup.then(fn => fn?.())
		}
    }, {
        scope: sectionRef
    })

	return (
		<section
			id='banner'
			className='overflow-hidden bg-green-dark'
			style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            ref={sectionRef}
		>

            <div className='absolute z-2 top-0 left-0 w-[75%] h-full bg-linear-to-r from-green-dark/75 to-green-dark/0' />

			<div
                className='absolute z-0 top-0 left-0 w-full h-lvh'
                data-bg
            >
                <video
                    loop
                    muted
                    playsInline
                    autoPlay
                    className='relative z-2 w-full h-full object-cover'
                >
                    <source
                        src='/videos/banner.mp4'
                        type='video/mp4'
                    />
                </video>
            </div>

			<div className='base-container relative z-2'>

				<div className='relative flex flex-col items-start justify-end md:flex-row h-svh md:items-end md:justify-between pt-30 pb-10 md:pb-20 gap-4'>

					<h1
						ref={titleRef}
						className='text-72 font-heading font-bold text-green-light md:w-280 max-w-full block reveal-text md:pr-20'
					>
						Transformamos descobertas científicas em ativos farmacêuticos globais.
					</h1>

                    <button
                        onClick={(e) => scrollTo(e, '#contexto')}
                        className='md:absolute md:z-4 md:bottom-18 md:right-0 flex cursor-pointer flex-col md:items-end gap-4 text-green-light text-sm tracking-normal hover:text-white transition-colors duration-300 group'
                    >
                        <span className='relative overflow-hidden w-px h-15 block'>
                            <span
                                className='absolute top-0 left-0 w-full h-full bg-green-light group-hover:bg-white origin-top transition-colors duration-300'
                                style={{
                                    animationDuration: '3s',
                                    animationName: 'scroll-bar-animation',
                                    animationIterationCount: 'infinite'
                                }}
                            />
                        </span>

                        <span>
                            scroll
                        </span>

                    </button>

				</div>

				<div className='flex flex-col gap-14 pt-20 lg:pt-[5vw] pb-30 sm:pb-40 md:pb-60'>

					<TextReveal>
						<p className='text-green-light text-20 w-200 max-w-full block'>
							Identificamos, desenvolvemos e valorizamos propriedade intelectual originada em universidades e centros de pesquisa no Brasil e no exterior, conectando ciência de alto potencial terapêutico ao desenvolvimento farmacêutico global por meio de governança científica, estratégia regulatória e proteção jurídica consistente.
						</p>
					</TextReveal>

					<Button
						style='light'
						href='#contato'
						onClick={(e) => scrollTo(e, '#contato')}
						text='Entre em contato'
						icon='diagonal-arrow'
					/>

				</div>

			</div>
		</section>
	)
}