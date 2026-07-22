// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ProjectForm from './ProjectForm'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'InscrevaPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/inscreva-seu-projeto'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/inscreva-seu-projeto',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/inscreva-seu-projeto.jpg',
					width: 1200,
					height: 630,
					alt: 'Aether Global Pharma'
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		}
	}
}

export default async function InscrevaSeuProjetoPage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'InscrevaPage' })
	const steps = t.raw('steps') as { title: string, text: string }[]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-inscreva'
				data={pageGraph({
					type: 'WebPage',
					path: '/inscreva-seu-projeto',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/inscreva-seu-projeto' }
					]
				})}
			/>

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-12 lg:pb-[5vw] bg-green-light'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-md-10 offset-md-2 col-lg-9 offset-lg-3'>

							<p className='font-semibold font-heading mb-6'>
								<AnimatedText text={t('eyebrow')} />
							</p>

						</div>

						<div className='col-md-2 col-lg-3'>
                                <Image
                                    src='/img/svg/logo/icon-gp.svg'
                                    alt='Aether Global Pharma'
                                    width={50}
                                    height={50}
                                    className='w-8 md:w-10 lg:w-12 h-auto'
                                    loading='lazy'
                                />
                            </div>

						<div className="col-md-10 col-lg-9 max-md:pt-6">
							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									{t('heading')}
								</h1>
							</TextReveal>
						</div>

						<div className='col-md-10 offset-md-2 col-lg-9 offset-lg-3'>
							<p className='text-20 leading-relaxed text-green-dark mt-6 lg:mt-8 max-w-[62ch]'>
								<AnimatedText text={t('intro')} />
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='pb-12 lg:pb-[5vw] relative overflow-hidden'>

				<div className="absolute z-0 top-0 left-0 w-full h-1/2 bg-green-light" />

				<div className='base-container relative z-2'>
					<div className='row'>

						<div className='col-lg-3'>
							<h2 className='font-semibold font-heading mb-8 lg:mb-0'>
								<AnimatedText text={t('howItWorksEyebrow')} />
							</h2>
						</div>

						<div className='col-lg-9'>
							<StaggerUp className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
								{steps.map((step, i) => (
									<div
										key={i}
										className='relative overflow-hidden bg-green-dark rounded-sm lg:rounded-md p-8 lg:p-10 lg:min-h-100'
									>
										<span className='absolute z-0 bottom-4 right-6 text-6xl leading-none font-heading font-bold text-green-pale pointer-events-none select-none max-lg:hidden'>
											{i + 1}
										</span>
										<div className='relative z-2'>
											<h3 className='text-20 font-heading font-semibold text-green-pale mb-1'>
												{step.title}
											</h3>
											<p className='text-16 leading-relaxed text-green-pale'>
												{step.text}
											</p>
										</div>
									</div>
								))}
							</StaggerUp>
						</div>

					</div>
				</div>
			</section>

			<section className='relative overflow-hidden pb-20 lg:pb-[8vw]'>

				<div className='base-container relative z-2'>

					<h2 className='font-semibold font-heading mb-6'>
						<AnimatedText text={t('confidentialityEyebrow')} />
					</h2>

					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-10'>

						<div className='col-md-3'>

							<div className='bg-green-pale rounded-md p-6 lg:p-8 text-16 leading-relaxed'>
								{t('confidentialityText')}
							</div>

						</div>

						<div className="col-md-3" />

						<div className='col-md-6'>
							<ProjectForm />
						</div>

					</div>
				</div>

			</section>

		</div>
	)
}
