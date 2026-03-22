'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import { Form, Input, Submit, Textarea } from '@/components/Form'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'

export default function Contact() {

    const sectionRef = useRef<HTMLElement>(null)
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
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1.5,
                    refreshPriority: -1
                }
            }
        )
    }, { scope: sectionRef })

	return (
		<section
            id='contato'
            ref={sectionRef}
            className='py-20 lg:py-[10vw] relative overflow-hidden'
        >

            <svg
                width='550'
                height='1363'
                viewBox='0 0 550 1363'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute z-0 top-0 lg:top-[20%] left-0 w-vw lg:w-[40vw] h-auto object-contain'
                preserveAspectRatio='xMinYMax meet'
            >
                <path
                    ref={pathRef}
                    d='M-441.283 112.205C-182.224 -3.68036 303.324 12.5692 455.5 421.223C615.106 849.828 308.235 1191.62 32.7822 1317.19'
                    stroke='#E0E6A1'
                    strokeWidth='100'
                />
            </svg>

            <div className='base-container relative z-2'>

                <div className='row pb-20 lg:pb-[10vw]'>
                    <div className='col-lg-9 col-lg-push-2'>
                        <AnimatedTitle
                            style='dark'
                            className='text-60 font-heading font-semibold'
                        >
                            Entre em contato para oportunidades de parceria científica, desenvolvimento tecnológico ou colaboração institucional.
                        </AnimatedTitle>
                    </div>
                </div>

                <div className='row'>

                    <div className='col-lg-2' />

                    <div className='col-lg-3 col-xl-4 pb-10 lg:pb-0'>
                        <h3 className='font-semibold font-heading'>
                            <AnimatedText text='(contato)' />
                        </h3>
                    </div>

                    <div className='col-lg-6 col-xl-5'>
                        <Form
                            endpoint='#'
                            onSuccess={{
                                title: 'Mensagem enviada com sucesso',
                                text: 'Obrigado por entrar em contato. Entraremos em contato o mais breve possível.'
                            }}
                            onError={{
                                title: 'Erro ao enviar mensagem',
                                text: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.'
                            }}
                        >

                            <Input
                                id='nome'
                                label='Nome'
                                name='Nome'
                                type='text'
                                placeholder='Nome completo'
                                required
                            />

                            <Input
                                id='email'
                                label='Email'
                                name='Email'
                                type='email'
                                placeholder='Email'
                                required
                            />

                            <Textarea
                                id='mensagem'
                                label='Mensagem'
                                name='Mensagem'
                                placeholder='Mensagem'
                                required
                            />

                            <Submit
                                text='Enviar'
                                style='dark'
                            />

                        </Form>
                    </div>

                </div>

            </div>
        </section>
	)
}
