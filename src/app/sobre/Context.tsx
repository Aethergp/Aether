'use client'

// libraries
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Button from '@/components/Button'

export default function Context({
	showCreation = true,
	showCta = true
} : {
	showCreation?: boolean
	showCta?: boolean
}) {

	const sectionRef = useRef<HTMLDivElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
	const pinRef = useRef<HTMLElement | null>(null)

    useGSAP(() => {
        const path = pathRef.current
        const section = sectionRef.current
        if (!path || !section) return

        const length = path.getTotalLength()

        gsap.set(path, { strokeDasharray: length })

        gsap.fromTo(path,
            { strokeDashoffset: length },
            {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: section,
                    start: '10% 80%',
                    end: '50% 20%',
                    scrub: 1.5
                }
            }
        )
    }, { scope: sectionRef })

	const scrollbarRef = useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperType | null>(null)

    const handleSwiper = (swiper: SwiperType) => {
        swiperRef.current = swiper
    }

    // set scrollbar element and initialize
    useEffect(() => {
        if (swiperRef.current && scrollbarRef.current) {
            if (swiperRef.current.scrollbar) {
                swiperRef.current.scrollbar.el = scrollbarRef.current
                swiperRef.current.scrollbar.init()
                swiperRef.current.scrollbar.updateSize()
                swiperRef.current.update()
            }
        }
    }, [])

	return (
		<div
			ref={sectionRef}
			className='relative z-2'
		>

			<svg
				width='657'
				height='1636'
				viewBox='0 0 657 1636'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute -z-1 top-[5%] -left-2 w-vw sm:w-[45vw] h-auto object-contain'
				preserveAspectRatio='xMinYMax meet'
			>
				<path
					ref={pathRef}
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					stroke='#E0E6A1'
					strokeWidth='100'
				/>
			</svg>

            <section id='contexto' className='pt-px'>
				<div className='base-container my-20 md:my-30 lg:my-[10vw]'>

					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-10'>

						<div className='col-lg-3'>
							<Image
								src='/img/svg/logo/icon-gp.svg'
								alt='Aether Global Pharma'
								width={50}
								height={50}
								className='w-8 md:w-10 lg:w-12 h-auto'
								loading='lazy'
							/>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Ciência de fronteira gera descobertas. O desafio é transformá-las em ativos farmacêuticos.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row pt-10 lg:pt-[10vw]'>

						<div className='col-lg-3' />

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(o contexto)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='Universidades e centros de pesquisa produzem, todos os anos, tecnologias com elevado potencial terapêutico. Entretanto, sem desenvolvimento estruturado, governança científica, estratégia regulatória e proteção intelectual, a maior parte dessas descobertas permanece restrita ao ambiente acadêmico. <br /><br />A Plataforma Aether foi criada para conduzir essa jornada de maturação tecnológica e preparar ativos para licenciamento global.' />
							</p>

							{showCta && (
								<div className='mt-10'>
									<Button
										style='dark'
										href='/sobre'
										text='Conheça a plataforma'
										icon='diagonal-arrow'
									/>
								</div>
							)}
							
						</div>
						
					</div>

					</div>
			</section>

			<section
				id='items'
				className='relative overflow-hidden z-2'
			>
				<div className='base-container'>
					<div className='relative w-full'>
						<Swiper
							modules={[Navigation, Scrollbar, FreeMode, Mousewheel]}
							allowTouchMove={true}
							slidesPerView={1.1}
							spaceBetween={15}
							freeMode={true}
							mousewheel={{
								forceToAxis: true
							}}
							scrollbar={{
								draggable: true
							}}
							simulateTouch
							onSwiper={handleSwiper}
							breakpoints={{
								768: {
									slidesPerView: 2,
									spaceBetween: 20
								},
								992: {
									slidesPerView: 3,
									spaceBetween: 25
								},
								1400: {
									slidesPerView: 4,
									spaceBetween: 30
								}
							}}
							className='overflow-visible!'
						>
							{[
								{
									title: 'Scouting e Seleção Tecnológica',
									text: 'Identificamos pesquisas de alto potencial e realizamos avaliações técnico-científicas, regulatórias e de propriedade intelectual para selecionar ativos com potencial de desenvolvimento e licenciamento.',
								},
								{
									title: 'Desrisking Científico e Tecnológico',
									text: 'Reduzimos progressivamente as incertezas científicas, tecnológicas e regulatórias por meio de desenvolvimento estruturado, validação experimental e evolução da maturidade tecnológica.',
								},
								{
									title: 'Estratégia de Propriedade Intelectual',
									text: 'Estruturamos portfólios robustos de propriedade intelectual, avaliando liberdade de operação, titularidade, proteção internacional e potencial competitivo.',
								},
								{
									title: 'Posicionamento e Licenciamento Global',
									text: 'Preparamos ativos para conexão com empresas farmacêuticas, investidores e parceiros estratégicos, estruturando oportunidades de co-desenvolvimento, investimento e licenciamento.',
								}
							].map((item, i) => (
								<SwiperSlide
									key={i}
									className='h-auto!'
								>
									<div
										className='flex flex-col gap-4 p-8 sm:p-6 rounded-sm lg:rounded-md bg-green-pale w-full h-full'
									>

										<p className='text-7xl sm:text-8xl lg:text-9xl font-heading font-bold text-green-light self-end'>
											{i+1}
										</p>

										<h3
											className='text-30 font-heading font-semibold md:mt-8'
											dangerouslySetInnerHTML={{ __html: item.title }}
										/>

										<p className='text-18 leading-relaxed'>
											{item.text}
										</p>

									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</section>

			{showCreation && (
				<section
					id='criacao'
					ref={pinRef}
					className='min-h-lvh flex items-center'
				>
					<div className='base-container'>
						<div className='row'>
							<div className='col-lg-8 col-lg-push-2'>
								<TextReveal
									className='text-60 font-heading font-semibold text-center'
									scrub={1.5}
									pinSection={pinRef}
								>
									<h2 className='flex flex-wrap justify-center items-center gap-x-4'>
										Entre a descoberta científica e a indústria farmacêutica, construímos ativos.
									</h2>
								</TextReveal>
							</div>
						</div>
					</div>
				</section>
			)}

        </div>
	)
}