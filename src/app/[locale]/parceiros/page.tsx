// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import JsonLd from '@/components/JsonLd'

// utils
import { partners } from '@/utils/partners'
import { pages } from '@/utils/routes'
import { pageGraph, SITE_URL } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

// img
import partnership from '@/assets/img/banner.jpg'
import scientists from '@/assets/img/scientists.jpg'
import abstract from '@/assets/img/abstract.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ParceirosPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/parceiros'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/parceiros',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/parceiros.jpg',
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

export default async function ParceirosPage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ParceirosPage' })

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-parceiros'
				data={await pageGraph({
					locale,
					type: 'CollectionPage',
					path: '/parceiros',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/parceiros' }
					],
					extend: {
						mainEntity: {
							'@type': 'ItemList',
							name: t('schemaListName'),
							numberOfItems: partners.length,
							itemListElement: partners.map((item, i) => ({
								'@type': 'ListItem',
								position: i + 1,
								item: {
									'@type': 'Organization',
									name: item.alt,
									logo: `${SITE_URL}${item.src}`
								}
							}))
						}
					}
				})}
			/>

			<section className='bg-green-dark text-green-light pt-40 sm:pt-48 lg:pt-64 2xl:pt-[14vw] overflow-hidden'>

				<div className='absolute z-0 top-0 left-0 w-full h-3/4 opacity-50'>

					<div className='absolute z-1 top-0 left-0 w-full h-full from-green-dark to-green-dark/0 bg-linear-to-t' />

					<Image
						src={abstract}
						alt={t('backgroundAlt')}
						fill
						className='cover'
						sizes='100vw'
					/>
				</div>

				<div className='base-container relative z-2 pb-8 lg:pb-[3vw]'>
					<div className='row'>

						<div className='col-lg-3'>
							<p className='font-semibold font-heading mb-6 lg:pt-1'>
								<AnimatedText text={t('eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-light'>
									{t('heading')}
								</h1>
							</TextReveal>

							<p className='text-20 mt-6 lg:mt-8 lg:pr-[8vw] opacity-90'>
								<AnimatedText text={t('intro')} />
							</p>

						</div>

					</div>

				</div>

				<div className='base-container relative z-2 pb-10 lg:pb-[5vw]'>

					<div className='absolute z-0 bottom-0 -left-30 w-[120%] h-1/2 bg-white' />

					<div className='row relative z-2'>
						<div className='col-lg-9 offset-lg-3'>
							<div className='block relative overflow-hidden w-full aspect-4/3 md:aspect-video rounded-md'>
								<ScrollingImage>
									<Image
										src={scientists}
										alt={t('scientistsAlt')}
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

			<section className='pb-16 lg:pb-[7vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-2 col-xl-3' />

						<div className='col-lg-10 col-xl-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('logosHeading')}
							</AnimatedTitle>
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

			<section className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]'>
				<div className='base-container'>

					<div className='relative overflow-hidden bg-green-dark text-green-light rounded-md lg:rounded-lg lg:grid lg:grid-cols-2'>

						<div className='flex flex-col justify-center p-10 md:p-16 lg:p-[5vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-70 mb-6'>
								{t('ctaEyebrow')}
							</span>

							<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text={t('ctaHeading')} />
							</h2>

							<p className='text-20 mt-6 lg:mt-8 opacity-90'>
								{t('ctaText')}
							</p>

							<div className='mt-10 lg:mt-12'>
								<Button
									style='light-2'
									href={pages.contato}
									text={t('ctaButton')}
									icon='diagonal-arrow'
								/>
							</div>

						</div>

						<div className='relative overflow-hidden min-h-136 max-lg:hidden'>
							<ScrollingImage>
								<Image
									src={partnership}
									alt={t('partnershipAlt')}
									fill
									className='cover'
									sizes='(max-width: 1024px) 100vw, 50vw'
								/>
							</ScrollingImage>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
