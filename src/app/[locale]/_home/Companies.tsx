'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import Button from '@/components/Button'

export default function Companies() {

    const t = useTranslations('HomePage.companies')
    const sectionRef = useRef<HTMLDivElement>(null)
    const pathRef = useRef<SVGPathElement>(null)

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
                    scrub: 1.5,
                    refreshPriority: -1
                }
            }
        )
    }, { scope: sectionRef })

	return (
        <>

            <section id='arquitetura'>
				<div className='base-container mt-20 mb-24 md:my-30 lg:my-[10vw]'>

					<div className='row'>

                        <div className='col-lg-3' />

                        <div className='col-lg-7'>
                            <AnimatedTitle
                                style='dark'
                                className='text-60 font-heading font-semibold'
                            >
                                {t('title')}
                            </AnimatedTitle>

                            <p className='text-24 font-heading mt-6 lg:mt-8'>
                                <AnimatedText text={t('subtitle')} />
                            </p>
                        </div>

                    </div>

                    <div className='row pt-10 lg:pt-[10vw]'>

                        <div className='col-lg-3' />

                        <div className='col-lg-3 pb-4 lg:pb-0'>
                            <p className='font-semibold font-heading'>
                                <AnimatedText text={t('eyebrow')} />
                            </p>
                        </div>

						<div className='col-lg-6'>
                            <p className='text-20 leading-relaxed'>
                                <AnimatedText text={t('intro')} />
                            </p>
						</div>
						
					</div>

				</div>
			</section>

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
                    className='absolute z-0 top-0 lg:top-[20%] -right-4 w-[60vw] sm:w-[40vw] lg:w-[15vw] h-auto object-contain'
                    preserveAspectRatio='xMinYMax meet'
                >
                    <path
                        ref={pathRef}
                        d='M331.502 42.7948C118.002 171.795 50 377.174 50 579.795C50 889.795 228.502 1074.79 324.002 1155.79'
                        stroke='#E0E6A1'
                        strokeWidth='100'
                    />
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
                                    <AnimatedText text={t.markup('gp.body', { b: (chunks) => `<b>${chunks}</b>` })} />
                                </p>
                                <div className='mt-10'>
                                    <Button
                                        style='dark'
                                        href='/sobre/aether-global-pharma'
                                        text={t('gp.button')}
                                        icon='diagonal-arrow'
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='row pt-10 lg:pt-[5vw]'>

                            <div className='col-lg-3'>
                                <h2 className='font-semibold font-heading'>
                                    <AnimatedText text={t('functionsEyebrow')} />
                                </h2>
                            </div>

                            <div className='col-lg-6'>
                                <StaggerUp className='flex flex-col gap-1'>
                                    {(t.raw('gp.functions') as string[]).map((item, i) => (
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
                                    <AnimatedText text={t.markup('bio.body', { b: (chunks) => `<b>${chunks}</b>` })} />
                                </p>
                                <div className='mt-10'>
                                    <Button
                                        style='dark'
                                        href='/sobre/ict-aether-bio'
                                        text={t('bio.button')}
                                        icon='diagonal-arrow'
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='row pt-10 lg:pt-[5vw]'>

                            <div className='col-lg-3'>
                                <h2 className='font-semibold font-heading'>
                                    <AnimatedText text={t('functionsEyebrow')} />
                                </h2>
                            </div>

                            <div className='col-lg-6'>
                                <StaggerUp className='flex flex-col gap-1'>
                                    {(t.raw('bio.functions') as string[]).map((item, i) => (
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

        </>
	)
}