// libraries
import { useTranslations, useLocale } from 'next-intl'

// components
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Button from '@/components/Button'
import { Link } from 'next-transition-router'
import { pages } from '@/utils/routes'
import { getLocalizedPathname } from '@/i18n/navigation'

type Props = {
    className?: string
}

export default function ContactBanner({ className }: Props) {

	const t = useTranslations('ContactBanner')
	const locale = useLocale()

	return (
        <section className={className}>
            <div className='base-container'>

                <div className='relative overflow-hidden bg-green-dark text-green-light rounded-md lg:rounded-lg px-10 py-16 md:p-16 lg:p-[6vw] text-center'>

                    <div className='absolute inset-0 z-0 opacity-80'>
                        <Grainient
                            className='w-full h-full'
                            color1='#555328'
                            color2='#90916c'
                            color3='#555328'
                            timeSpeed={0.75}
                            colorBalance={0}
                            warpStrength={1}
                            warpFrequency={12}
                            warpSpeed={3}
                            warpAmplitude={40}
                            blendAngle={35}
                            blendSoftness={0.5}
                            rotationAmount={400}
                            noiseScale={2}
                            grainAmount={0.05}
                            grainScale={0.75}
                            grainAnimated={false}
                            contrast={1.5}
                            gamma={1}
                            saturation={1}
                            centerX={0}
                            centerY={0}
                            zoom={0.75}
                        />
                    </div>

                    <div className='row relative z-2'>
                        <div className='col-lg-8 offset-lg-2'>

                            <h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
                                <AnimatedText text={t('heading')} />
                            </h2>

                            <p className='text-20 mt-6 lg:mt-8 opacity-90'>
                                {t('text')}
                            </p>

                            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 lg:mt-12'>

                                <Button
                                    style='light-2'
                                    href={pages.contato}
                                    text={t('ctaButton')}
                                    icon='diagonal-arrow'
                                />

                                <Link
                                    href={getLocalizedPathname(pages.inscreva, locale)}
                                    className='hover-underline-alt hover-underline-alt--light font-heading font-semibold cursor-pointer'
                                >
                                    {t('secondaryLink')}
                                </Link>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}