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

export default function About() {

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
                            <AnimatedText text='A Aether Global Pharma e o ICT AetherBio+ operam de forma sinérgica para transformar ciência de alto potencial em ativos farmacêuticos estruturados para avançar ao longo da jornada de desenvolvimento e gerar valor.<br /><br /> O ICT AetherBio+ articula competências científicas, infraestrutura, parceiros e recursos para promover o avanço e o desrisking tecnológico dos projetos. A Aether Global Pharma conduz a estratégia de desenvolvimento e valorização dos ativos, integrando propriedade intelectual, estratégia regulatória, capital e posicionamento para parcerias e licenciamento.<br /><br /> Juntas, conectam universidades e pesquisadores, capital especializado e indústria farmacêutica, criando uma jornada estruturada para que descobertas promissoras avancem com maior maturidade, consistência e potencial global ampliando, para a indústria, o acesso a ativos selecionados, protegidos e progressivamente desenvolvidos para inovação externa.' />
                        </p>

                        <Button
                            style='dark'
                            href='/sobre'
                            text='Como construímos ativos'
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