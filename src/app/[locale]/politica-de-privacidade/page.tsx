// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StrokePath from '@/components/Utils/Animations/StrokePath'
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
	const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/politica-de-privacidade'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/politica-de-privacidade',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og-image.jpg',
					width: 1280,
					height: 628,
					alt: 'Aether Global Pharma'
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		}
	}
}

export default async function PoliticaDePrivacidadePage({ params }: Props) {

	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'PrivacyPage' })

	const intro = t.raw('intro') as string[]
	const introList = t.raw('introList') as string[]
	const commitmentList = t.raw('commitmentList') as string[]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-privacidade'
				data={await pageGraph({
					locale,
					type: 'WebPage',
					path: '/politica-de-privacidade',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('title'), item: '/politica-de-privacidade' }
					]
				})}
			/>

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-20 lg:pb-[8vw]'>

				<StrokePath
					viewBox='0 0 657 1636'
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					className='z-0 top-[20%] -right-80 w-[85vw] sm:w-[55vw] lg:w-[40vw] scale-x-[-1] max-lg:hidden!'
					//markers
					start='10% 30%'
					end='50% 10%'
				/>

				<div className='base-container'>

					<div className='row'>

						<div className='col-lg-3'>

							<p className='font-semibold font-heading lg:pt-4'>
								<AnimatedText text={t('eyebrow')} />
							</p>

						</div>

						<div className='col-lg-9 mt-2 lg:mt-0'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									{t('title')}
								</h1>
							</TextReveal>

							<p className='text-18 leading-relaxed text-green-dark mt-10 lg:mt-20'>
								{t('effectiveDate')}
							</p>

						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>
						<div className='col-lg-9 col-xl-6 offset-lg-3'>
							<div className='rich-text'>

								{intro.map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}

								<ul>
									{introList.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>

							</div>
						</div>
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text={t('commitmentEyebrow')} />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									{t('commitmentText')}
								</p>

								<ul>
									{commitmentList.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>

							</div>
						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text={t('moreInfoEyebrow')} />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									{t('moreInfoText')}
								</p>

							</div>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
