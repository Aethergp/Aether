'use client'

// libraries
import Image from 'next/image'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'

// images
import microscope from '@/assets/img/microscope.jpg'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

export default function About() {

    const scrollTo = useAnchorScroll()

	return (
		<section id='sobre'>
            <div className='base-container'>
                <div className='row'>

                    <div className='col-xl-1 max-xl:hidden' />

                    <div className='col-lg-6 col-xl-5 flex flex-col justify-center lg:py-20'>

                        <AnimatedTitle
                            style='dark'
                            className='text-60 font-heading font-semibold'
                        >
                            Uma plataforma integrada. Dois pilares complementares.
                        </AnimatedTitle>

                        <p className='text-20 leading-relaxed block my-10 2xl:pr-20'>
                            <AnimatedText text='A <strong>Aether Global Pharma</strong> e o <strong>ICT AetherBio+</strong> operam de forma sinérgica, combinando uma holding privada de propriedade intelectual com um instituto de ciência e tecnologia.<br /><br />A plataforma conecta pesquisa acadêmica, capital especializado e indústria farmacêutica global para transformar descobertas científicas em ativos farmacêuticos estratégicos.' />
                        </p>

                        <Button
                            style='dark'
                            href='#contato'
                            onClick={(e) => scrollTo(e, '#contato')}
                            text='Entre em contato'
                            icon='diagonal-arrow'
                        />

                    </div>

                    <div className='col-lg-6 pt-14 lg:pt-0'>
                        <div className="block relative overflow-hidden w-full max-lg:aspect-3/4 lg:h-full lg:min-h-[120vh] rounded-sm">
                            <ScrollingImage>
                                <Image
                                    src={microscope}
                                    alt='Microscópio'
                                    fill
                                    className='cover'
                                    loading='lazy'
                                    sizes='100vw'
                                />
                            </ScrollingImage>
                        </div>
                    </div>

                </div>
            </div>
        </section>
	)
}