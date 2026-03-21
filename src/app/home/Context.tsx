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

export default function Context() {

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
			className='relative overflow-hidden z-2'
		>

		<svg
			width='657'
			height='1636'
			viewBox='0 0 657 1636'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='absolute -z-1 top-0 -left-2 w-[60vw] sm:w-[45vw] h-auto object-contain'
            preserveAspectRatio='xMinYMax meet'
		>
			<path
				ref={pathRef}
				d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
				stroke='#E0E6A1'
				strokeWidth='100'
			/>
		</svg>

            <section id='contexto'>
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

						<div className='col-lg-8'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Ciência de alto valor é produzida continuamente. Grande parte nunca chega ao mercado.
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
								<AnimatedText text='Universidades e centros de pesquisa geram descobertas com elevado potencial terapêutico todos os anos. O desafio raramente está na ciência mas na capacidade de transformar conhecimento em ativos farmacêuticos protegidos, validados e prontos para desenvolvimento global.<br /><br />Sem maturação tecnológica adequada, governança científica e estratégia de propriedade intelectual, tecnologias promissoras permanecem restritas ao ambiente acadêmico e não alcançam seu potencial de impacto.' />
							</p>
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
									title: 'Redução de Risco Tecnológico',
									text: 'Incertezas científicas, regulatórias e de escalonamento industrial precisam ser tratadas de forma integrada ao longo do desenvolvimento. Sem essa abordagem, tecnologias promissoras permanecem em estágios iniciais e tornam-se pouco atrativas para parceiros industriais e investidores especializados.',
								},
								{
									title: 'Governança Científica e Regulatória',
									text: 'A ausência de validação técnica independente, combinada à falta de estratégia regulatória desde as fases iniciais, compromete a credibilidade dos ativos e pode gerar barreiras relevantes nos processos de desenvolvimento e concessão de registro junto às agências reguladoras.',
								},
								{
									title: 'Consolidação de Propriedade Intelectual',
									text: 'Titularidades fragmentadas, proteção incompleta e ausência de estratégia global de propriedade intelectual reduzem significativamente o valor tecnológico dos ativos e limitam sua capacidade de desenvolvimento e licenciamento internacional.',
								},
								{
									title: 'Inserção <br />Internacional',
									text: 'A ausência de posicionamento institucional adequado dificulta a integração com o ecossistema global de inovação farmacêutica, restringindo o acesso a parceiros estratégicos, programas avançados de desenvolvimento e capital especializado em life sciences.',
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
								<h2>
									A Aether foi criada para atuar exatamente nessa lacuna do ecossistema científico.
								</h2>
							</TextReveal>
						</div>
					</div>
				</div>
			</section>

        </div>
	)
}