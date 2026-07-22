// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import clsx from 'clsx'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import Context from './Context'
import Timeline from './Timeline'
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import ContactBanner from '@/components/ContactBanner'
import JsonLd from '@/components/JsonLd'

// utils
import { pages } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

// img
import scientists from '@/assets/img/team-2.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'SobrePage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/sobre'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/sobre',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/sobre.jpg',
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

export default async function SobrePage({ params }: Props) {

	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'SobrePage' })

	const heroTitleLines = t.raw('heroTitleLines') as string[]

	const valores = t.raw('valores') as { title: string, text: string }[]
	const timeline = t.raw('timeline') as { year: string, title: string, text: string }[]

	const pilares = [
		{
			eyebrow: t('pilares.0.eyebrow'),
			icon: '/img/svg/logo/icon-gp.svg',
			iconColor: 'bg-green-light',
			name: t('pilares.0.name'),
			text: t('pilares.0.text'),
			href: pages.sobreAgp,
			cta: t('pilares.0.cta'),
			cardClass: 'bg-green-dark text-green-light',
			buttonStyle: 'light-2' as const
		},
		{
			eyebrow: t('pilares.1.eyebrow'),
			icon: '/img/svg/logo/icon-bio-green-dark.svg',
			iconColor: 'bg-white',
			name: t('pilares.1.name'),
			text: t('pilares.1.text'),
			href: pages.sobreIct,
			cta: t('pilares.1.cta'),
			cardClass: 'bg-linear-to-br from-sapphire to-navy-mid text-white',
			buttonStyle: 'white' as const
		}
	]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-sobre'
				data={await pageGraph({
					locale,
					type: 'AboutPage',
					path: '/sobre',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/sobre' }
					]
				})}
			/>

			<section className='relative overflow-hidden text-green-light mask-clip-fill' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

				<div className='fixed inset-0 z-0 w-lvw h-lvh'>
					<Grainient
						className='w-full h-full'
						color1='#555328'
						color2='#90916c'
						color3='#555328'
						timeSpeed={0.9}
						colorBalance={0}
						warpStrength={1}
						warpFrequency={11.3}
						warpSpeed={3.2}
						warpAmplitude={41}
						blendAngle={36}
						blendSoftness={0.54}
						rotationAmount={430}
						noiseScale={2.2}
						grainAmount={0.06}
						grainScale={0.7}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={-0.12}
						centerY={0.48}
						zoom={0.65}
					/>
				</div>

				<div className='absolute inset-0 z-1 bg-green-dark/35' />

				<div className='relative z-2'>

					<div className='relative flex flex-col justify-end h-svh min-h-lvh'>

						<div className='base-container relative z-2 pb-12 lg:pb-[3vw]'>
							<div className='row'>
								<div className='col-lg-10'>
									<h1 className='text-72 font-heading font-bold text-green-light'>
										{heroTitleLines[0]} <br />
										{heroTitleLines[1]} <br />
										{heroTitleLines[2]}
									</h1>
								</div>
							</div>
						</div>

					</div>

					<div className='base-container py-12 lg:py-[6vw]'>
						<div className='row'>

							<div className='col-lg-3' />

							<div className='col-lg-9'>
								<p className='text-24 font-heading lg:pr-[6vw]'>
									<AnimatedText text={t('heroSubtitle')} />
								</p>

								<p className='text-20 leading-relaxed mt-8 lg:mt-10 lg:pr-[12vw] opacity-90'>
									<AnimatedText text={t('heroText')} />
								</p>
							</div>

						</div>
					</div>

					<div className='base-container pb-20 lg:pb-[8vw] pt-8 lg:pt-[2vw]'>

						<div className='row pb-10 lg:pb-[5vw]'>

							<div className='col-lg-3 pb-4 lg:pb-0'>
								<p className='font-semibold font-heading'>
									<AnimatedText text={t('valuesEyebrow')} />
								</p>
							</div>

							<div className='col-lg-9'>
								<h2 className='text-60 font-heading font-semibold'>
									<AnimatedText text={t('valuesHeading')} />
								</h2>
							</div>

						</div>

						<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
							{valores.map((item, i) => (
								<div
									key={i}
									className='flex flex-col justify-end gap-4 p-8 lg:p-10 rounded-sm lg:rounded-md border border-green-light/20 bg-green-dark/30 backdrop-blur-sm h-full min-h-100'
								>

									<h3 className='text-30 font-heading font-semibold md:mt-8'>
										{item.title}
									</h3>

									<p className='text-18 leading-relaxed opacity-90'>
										{item.text}
									</p>

								</div>
							))}
						</StaggerUp>

					</div>

				</div>

			</section>

			<Context
				showCreation={false}
				showCta={false}
			/>

			<section className='relative z-3 py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
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

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw]'>
								<AnimatedText text={t('platformText')} />
							</p>
						</div>

					</div>

					<StaggerUp className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
						{pilares.map((item, i) => (
							<div
								key={i}
								className={clsx(
									'flex flex-col rounded-md lg:rounded-lg p-10 lg:p-[3.5vw] h-full',
									item.cardClass
								)}
							>

								<div className='flex flex-col gap-6 grow'>

									<MaskedIcon
										url={item.icon}
										className={clsx('block w-10 lg:w-12 aspect-square', item.iconColor)}
									/>

									<span className='block text-sm font-semibold uppercase tracking-wide opacity-60'>
										({item.eyebrow})
									</span>

									<h3 className='text-30 font-heading font-semibold'>
										{item.name}
									</h3>

									<p className='text-18 leading-relaxed opacity-90'>
										{item.text}
									</p>

								</div>

								<div className='mt-10 lg:mt-12'>
									<Button
										style={item.buttonStyle}
										href={item.href}
										text={item.cta}
										icon='diagonal-arrow'
									/>
								</div>

							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('trajectoryEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('trajectoryHeading')}
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<Timeline items={timeline} />
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>
					<div className='row lg:items-center max-lg:flex max-lg:flex-col max-lg:gap-12'>

						<div className='col-lg-5 flex flex-col justify-center lg:pr-[4vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-4'>
								{t('teamEyebrow')}
							</span>

							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('teamHeading')}
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10'>
								<AnimatedText text={t('teamText')} />
							</p>

							<Button
								style='dark'
								href={pages.sobreEquipe}
								text={t('teamButton')}
								icon='diagonal-arrow'
							/>

						</div>

						<div className='col-lg-push-1 col-lg-6'>
							<div className='block relative overflow-hidden w-full max-lg:aspect-4/3 lg:h-full lg:min-h-[120vh] rounded-md'>

								<div className='absolute inset-0 z-2 bg-green-dark mix-blend-soft-light' />

								<ScrollingImage>
									<Image
										src={scientists}
										alt={t('teamImageAlt')}
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

			{/*
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text='(presença)' />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Brasil e Canadá. Atuação global.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw]'>
								<AnimatedText text='A Aether opera em duas geografias complementares: no Brasil, origem e núcleo científico da plataforma; no Canadá, braço internacional responsável pela interface com parceiros industriais e mercados globais.' />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
								{presenca.map((place, i) => (
									<div
										key={i}
										className='bg-green-pale rounded-sm lg:rounded-md p-8 lg:p-10 h-full'
									>

										<h3 className='text-30 font-heading font-semibold'>
											{place.country}
										</h3>

										<p className='text-18 leading-relaxed mt-3 mb-8 opacity-90'>
											{place.lead}
										</p>

										<div className='flex flex-col gap-6'>
											{place.offices.map((office, j) => (
												<div key={j}>
													<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-2'>
														{office.eyebrow} · {office.city}
													</span>
													<address className='not-italic text-18 leading-relaxed'>
														{office.lines.map((line, k) => (
															<span key={k} className='block'>{line}</span>
														))}
													</address>
												</div>
											))}
										</div>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>
			*/}

			<ContactBanner className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]' />

		</div>
	)
}
