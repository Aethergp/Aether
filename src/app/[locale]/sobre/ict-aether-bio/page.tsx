// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from 'next-transition-router'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Hero from './Hero'
import JsonLd from '@/components/JsonLd'

// utils
import { pages } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'
import { getPathname } from '@/i18n/navigation'

// img
import bioLab from '@/assets/img/team.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'IctPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/sobre/ict-aether-bio'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/sobre/ict-aether-bio',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/sobre-ict-aether-bio.jpg',
					width: 1200,
					height: 630,
					alt: 'ICT AetherBio+'
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		}
	}
}

export default async function IctAetherBioPage({ params }: Props) {

	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'IctPage' })
	const tNav = await getTranslations({ locale, namespace: 'Nav' })

	const funcoes = (t.raw('funcoes') as { text: string }[]).map((item, i) => ({
		...item,
		href: i === 5 ? pages.trl : undefined
	}))

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-sobre-ict'
				data={await pageGraph({
					locale,
					type: 'AboutPage',
					path: '/sobre/ict-aether-bio',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: tNav('sobre'), item: '/sobre' },
						{ name: tNav('sobreIct'), item: '/sobre/ict-aether-bio' }
					]
				})}
			/>

			<Hero />

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading text-wine lg:pt-2'>
								<AnimatedText text={t('instituteEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								{t('instituteHeading')}
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw] text-wine'>
								<AnimatedText text={t('instituteText')} />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading text-wine'>
								<AnimatedText text={t('funcoesEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
								{funcoes.map((item, i) => {
									const inner = (
										<>
											<MaskedIcon
												url='/img/svg/logo/icon-bio.svg'
												className='block w-4 aspect-square bg-light-blue mt-1 shrink-0'
											/>
											<span className='text-18 leading-relaxed text-light-blue'>
												{item.text}
												{item.href && (
													<>
														{' '}
														<Link
															href={getPathname({ href: item.href, locale })}
															className='underline underline-offset-4 decoration-1 hover:text-white'
														>
															{t('saibaMais')}
														</Link>
													</>
												)}
											</span>
										</>
									)

									return (
										<div
											key={i}
											className='flex items-start gap-4 bg-navy-mid px-6 py-5 rounded-sm h-full'
										>
											{inner}
										</div>
									)
								})}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading text-wine lg:pt-2'>
								<AnimatedText text={t('governancaEyebrow')} />
							</p>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								{t('governancaHeading')}
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg bg-navy-mid text-light-blue p-10 lg:p-[3.5vw]'>

								<div className='row'>
									<div className='col-lg-9'>
										<p className='text-24 font-heading leading-snug'>
											{t('governancaText1')}
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											{t('governancaText2')}
										</p>
									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>
					<div className='row lg:items-stretch max-lg:flex max-lg:flex-col max-lg:gap-10'>

						<div className='col-lg-6 flex flex-col justify-center lg:pr-[3vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-4 text-wine'>
								{t('researchersEyebrow')}
							</span>

							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								{t('researchersHeading')}
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10 text-wine'>
								<AnimatedText text={t('researchersText')} />
							</p>

							<div>
								<Button
									style='blue-dark'
									href={pages.inscreva}
									text={t('researchersButton')}
									icon='diagonal-arrow'
								/>
							</div>

						</div>

						<div className='col-lg-6'>
							<div className='block relative overflow-hidden w-full max-lg:aspect-3/4 lg:h-full lg:min-h-[120vh] rounded-md lg:rounded-lg'>
								<ScrollingImage>
									<Image
										src={bioLab}
										alt={t('bioLabAlt')}
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

			<section className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading text-green-dark lg:pt-2'>
								<AnimatedText text={t('platformEyebrow')} />
							</p>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('platformHeading')}
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg text-green-light p-10 lg:p-[3.5vw]' style={{ background: 'linear-gradient(106deg, rgba(85,83,40,1) 0%, rgba(60,64,44,1) 26%, rgba(56,45,50,1) 62%, rgba(39,39,59,1) 100%)' }}>

								<div className='row'>
									<div className='col-lg-8'>

										<MaskedIcon
											url='/img/svg/logo/icon-gp.svg'
											className='block w-10 lg:w-12 aspect-square bg-green-light mb-8'
										/>

										<p className='text-24 font-heading leading-snug'>
											{t('platformText1')}
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											{t('platformText2')}
										</p>

										<div className='mt-10 lg:mt-12'>
											<Button
												style='light'
												href={pages.sobreAgp}
												text={t('platformButton')}
												icon='diagonal-arrow'
											/>
										</div>

									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
