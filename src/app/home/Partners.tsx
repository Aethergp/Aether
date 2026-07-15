// libraries
import Image from 'next/image'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'

// utils
import { partners } from '@/utils/partners'

export default function Partners() {
	return (
		<section
            id='parceiros'
            className='py-20 lg:py-[10vw]'
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
                            <AnimatedText text='A plataforma Aether opera em colaboração com universidades, centros de pesquisa e instituições científicas e tecnológicas que compõem um ecossistema altamente qualificado.' />
                        </p>
                    </div>

                </div>

                <StaggerScale
                    className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px'
                    infinite
                >
                    {partners.map((item, i) => (
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