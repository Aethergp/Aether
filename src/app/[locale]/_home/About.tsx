'use client'

// libraries
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'

// images
import microscope from '@/assets/img/microscope.jpg'

export default function About() {

	const t = useTranslations('HomePage.about')

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
                            {t('title')}
                        </AnimatedTitle>

                        <p className='text-20 leading-relaxed block my-10 2xl:pr-20'>
                            <AnimatedText text={t('body')} />
                        </p>

                        <Button
                            style='dark'
                            href='/sobre'
                            text={t('ctaButton')}
                            icon='diagonal-arrow'
                        />

                    </div>

                    <div className='col-lg-6 pt-14 lg:pt-0'>
                        <div className="block relative overflow-hidden w-full max-lg:aspect-3/4 lg:h-full lg:min-h-[120vh] rounded-sm">
                            <ScrollingImage>
                                <Image
                                    src={microscope}
                                    alt={t('imageAlt')}
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