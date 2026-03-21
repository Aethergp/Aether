// libraries
import Image from 'next/image'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'

export default function Partners() {
	return (
		<section
            id='parceiros'
            className='my-20 lg:my-[10vw]'
        >
            <div className='base-container'>
                
                <div className='row pb-10 lg:pb-[7vw]'>

                    <div className='col-lg-2 col-xl-3' />

                    <div className='col-lg-5 col-xl-4'>
                        <AnimatedTitle
                            style='dark'
                            className='text-60 font-heading font-semibold'
                        >
                            Ecossistema científico e institucional
                        </AnimatedTitle>
                    </div>

                    <div className='col-xl-1 max-xl:hidden' />

                    <div className='col-lg-5 col-xl-4 pt-4 lg:pt-1 xl:pt-3'>
                        <p className='text-20'>
                            <AnimatedText text='A plataforma Aether opera em colaboração com universidades, centros de pesquisa e instituições de inovação que compõem um ecossistema científico altamente qualificado.' />
                        </p>
                    </div>

                </div>

                <StaggerScale
                    className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px'
                    infinite
                >
                    {[
                        {
                            src: '/img/partners/unicamp.png',
                            alt: 'Unicamp',
                            width: 106,
                            height: 106
                        },
                        {
                            src: '/img/partners/cqmed.png',
                            alt: 'CQMED - Centro de Química Medicinal',
                            width: 171,
                            height: 61
                        },
                        {
                            src: '/img/partners/ufmg.png',
                            alt: 'UFMG',
                            width: 155,
                            height: 60
                        },
                        {
                            src: '/img/partners/farmavax.png',
                            alt: 'FarmaVax',
                            width: 174,
                            height: 61
                        },
                        {
                            src: '/img/partners/embrapii.png',
                            alt: 'EMBRAPII',
                            width: 106,
                            height: 84
                        },
                        {
                            src: '/img/partners/inova.png',
                            alt: 'INOVA - Agência de Inovação Unicamp',
                            width: 163,
                            height: 56
                        }
                    ].map((item, i) => (
                        <div
                            key={i}
                            className='flex items-center justify-center w-full h-auto aspect-square bg-white border border-gray-lighter/25 p-8 xs:p-10 sm:p-12 transition-colors duration-200 hover:border-green-dark group'
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={item.width}
                                height={item.height}
                                className='block w-full max-w-[85%] max-h-[55%] h-auto object-contain brightness-0 opacity-75 group-hover:opacity-100 transition-opacity duration-200'
                            />
                        </div>
                    ))}
                </StaggerScale>

            </div>
        </section>
	)
}