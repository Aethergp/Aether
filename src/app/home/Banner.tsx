'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Button from '@/components/Button'

// images
import banner from '@/assets/img/banner.jpg'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

export default function Banner() {

	const scrollTo = useAnchorScroll()
	const sectionRef = useRef<HTMLDivElement>(null)

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

            <div className='absolute z-2 top-0 left-0 w-full h-full bg-linear-to-r from-green-dark to-green-dark/0' />

			<div
                className='absolute z-0 top-0 left-0 w-full min-h-vh min-h-svh'
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
                        src='/videos/3.mp4'
                        type='video/mp4'
                    />
                </video>
            </div>

			<div className='base-container relative z-2'>

				<div className='flex h-lvh items-end pt-30 pb-20'>
					<h1 className='text-72 font-heading font-bold text-green-light w-280 block'> 
						Transformamos descobertas científicas em ativos farmacêuticos globais.
					</h1>
				</div>

				<div className='flex flex-col gap-14 pt-20 lg:pt-[5vw] pb-60'>

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