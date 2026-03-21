'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

export default function Companies() {

    const sectionRef = useRef<HTMLDivElement>(null)
    const pathRef = useRef<SVGPathElement>(null)

    useGSAP(() => {
        const path = pathRef.current
        const section = sectionRef.current
        if (!path || !section) return

        const length = path.getTotalLength()

        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        })

        gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                scroller: document.getElementById('viewport') as HTMLElement,
                trigger: section,
                start: '10% 80%',
                end: '50% 20%',
                scrub: 1.5
            }
        })
    }, { scope: sectionRef })

	return (
		<div
            className='relative overflow-hidden z-2'
            ref={sectionRef}
        >

            <svg
                width='250'
                height='1194'
                viewBox='0 0 250 1194'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute z-0 top-0 lg:top-[20%] -right-4 w-[40vw] lg:w-[15vw] h-auto object-contain'
                preserveAspectRatio='xMinYMax meet'
            >
                <path ref={pathRef} d='M331.502 42.7948C118.002 171.795 50 377.174 50 579.795C50 889.795 228.502 1074.79 324.002 1155.79' stroke='#E0E6A1' strokeWidth='100'/>
            </svg>
			
            <section id='aether-global-pharma'>
				<div className='base-container pb-20 lg:pb-[15vw]'>
					
					<div className='row'>
						<div className='col-lg-push-2 col-lg-8'>
							<Image
								src='/img/svg/logo/aether-gp.svg'
								alt='Aether Global Pharma'
								width={1180}
								height={135}
								className='w-full h-auto'
								loading='lazy'
							/>	
						</div>
					</div>

					<div className='row pt-12 lg:pt-[7vw] max-md:flex max-md:flex-col-reverse max-md:gap-10'>

						<div className='col-md-2 col-xl-3'>
							<Image
								src='/img/svg/logo/icon-gp.svg'
								alt='Aether Global Pharma'
								width={50}
								height={50}
								className='w-8 md:w-10 lg:w-12 h-auto'
								loading='lazy'
							/>
						</div>

						<div className='col-md-10 col-lg-8 col-xl-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='A Aether Global Pharma é a holding privada responsável pela gestão estratégica e jurídica dos ativos de propriedade intelectual da plataforma.<br /><br />Atuando no Brasil e internacionalmente, a empresa detém a titularidade dos ativos gerados ou desenvolvidos no ecossistema da Aether e conduz as interações com a indústria farmacêutica global e investidores especializados.' />
							</p>
						</div>

					</div>

					<div className='row pt-10 lg:pt-[5vw]'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<StaggerUp className='flex flex-col gap-1'>
								{[
									'Titularidade das patentes e ativos de propriedade intelectual',
									'Estratégia jurídica e posicionamento global dos ativos farmacêuticos',
									'Consolidação contratual e definição de modelos de licenciamento',
									'Desenvolvimento de parcerias com a indústria farmacêutica global',
									'Relacionamento com investidores e fundos especializados em life sciences',
									'Estruturação de acordos de royalties, milestones e eventos de liquidez'
								].map((item, i) => (
									<div
										key={i}
										className='flex items-center gap-3 bg-green-pale px-6 py-4 rounded-sm'
									>

										<Image
											src='/img/svg/logo/icon-gp.svg'
											alt='GP'
											width={20}
											height={20}
											className='w-4 h-auto'
											loading='lazy'
										/>

										<span>
											{item}
										</span>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

			<section id='aether-bio'>
				<div className='base-container'>
					
					<div className='row'>
						<div className='col-lg-push-2 col-lg-8'>
							<Image
								src='/img/svg/logo/aether-bio.svg'
								alt='Aether Bio'
								width={1179}
								height={147}
								className='w-full h-auto'
								loading='lazy'
							/>	
						</div>
					</div>

					<div className='row pt-12 lg:pt-[7vw] max-md:flex max-md:flex-col-reverse max-md:gap-10'>

						<div className='col-md-2 col-xl-3'>
							<Image
								src='/img/svg/logo/icon-bio.svg'
								alt='Aether Bio'
								width={50}
								height={50}
								className='w-8 md:w-10 lg:w-12 h-auto'
								loading='lazy'
							/>
						</div>

						<div className='col-md-10 col-lg-8 col-xl-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='O ICT AetherBio+ é o instituto de ciência, tecnologia e inovação da plataforma, responsável pela condução científica e tecnológica dos projetos.<br /><br />Como instituição sem fins lucrativos, o AetherBio+ promove o avanço da maturidade tecnológica das descobertas científicas, assegura a governança científica independente de cada projeto e viabiliza a captação de fomento público nacional e internacional, apoiado por um comitê científico composto por pesquisadores especialistas em diferentes áreas terapêuticas.' />
							</p>
						</div>

					</div>

					<div className='row pt-10 lg:pt-[5vw]'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<StaggerUp className='flex flex-col gap-1'>
								{[
									'Desrisking tecnológico baseado em evidências científicas',
									'Captação de fomento público nacional e internacional',
									'Governança científica independente dos projetos',
									'Gestão do avanço de TRLs sem diluição da propriedade intelectual',
									'Articulação com universidades, centros de pesquisa e CROs',
									'Geração qualificada de projetos científicos com potencial translacional'
								].map((item, i) => (
									<div
										key={i}
										className='flex items-center gap-3 bg-green-pale px-6 py-4 rounded-sm'
									>

										<Image
											src='/img/svg/logo/icon-bio-green-dark.svg'
											alt='Bio+'
											width={20}
											height={20}
											className='w-4 h-auto'
											loading='lazy'
										/>

										<span>
											{item}
										</span>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}