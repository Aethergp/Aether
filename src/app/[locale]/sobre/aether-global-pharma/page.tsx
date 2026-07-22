// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import JsonLd from '@/components/JsonLd'

// utils
import { pages } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

// img
import labMeeting from '@/assets/img/data.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'AgpPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/sobre/aether-global-pharma'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/sobre/aether-global-pharma',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/sobre-aether-global-pharma.jpg',
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

export default async function AetherGlobalPharmaPage({ params }: Props) {

	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'AgpPage' })
	const tNav = await getTranslations({ locale, namespace: 'Nav' })

	const funcoes = t.raw('funcoes') as { title: string, text: string }[]
	const modelo = t.raw('modelo') as { title: string, text: string }[]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-sobre-agp'
				data={await pageGraph({
					locale,
					type: 'AboutPage',
					path: '/sobre/aether-global-pharma',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: tNav('sobre'), item: '/sobre' },
						{ name: tNav('sobreAgp'), item: '/sobre/aether-global-pharma' }
					]
				})}
			/>

			<div className='relative pb-1 overflow-hidden' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

				<div className='fixed inset-0 z-0'>
					<Grainient
						className='w-full h-full'
						color1='#555328'
						color2='#90916c'
						color3='#555328'
						timeSpeed={0.8}
						colorBalance={0}
						warpStrength={3}
						warpFrequency={10}
						warpSpeed={3}
						warpAmplitude={40}
						blendAngle={36}
						blendSoftness={0.5}
						rotationAmount={40}
						noiseScale={2.2}
						grainAmount={0.06}
						grainScale={0.7}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={0.18}
						centerY={0.4}
						zoom={0.7}
					/>
				</div>

				<div className='absolute top-0 left-0 w-full h-[98%] z-1 bg-green-dark/35' />

				<section className='relative z-2 overflow-hidden text-green-light min-h-lvh flex flex-col'>
					<div className='relative base-container grow flex flex-col justify-end pt-32 lg:pt-[10vw] pb-16'>

						<div className='row pt-12 lg:pt-[6vw]'>
							<div className='col-lg-10'>
								<h1 className='text-60 font-heading font-semibold leading-[1.05]!'>
									<AnimatedText text={t('heroTitle')} />
								</h1>
							</div>
						</div>

						<div className='row pt-10 lg:pt-[4vw]'>
							<div className='col-lg-3' />
							<div className='col-lg-8'>
								<p className='text-20 leading-relaxed opacity-90'>
									<AnimatedText text={t.markup('heroText', { b: (chunks) => `<b>${chunks}</b>` })} />
								</p>
							</div>
						</div>

					</div>
				</section>

				<section className='relative z-2 overflow-hidden py-16 lg:py-[8vw]'>
					<div className='base-container relative z-2'>

						<div className='row pb-10 lg:pb-[5vw]'>

							<div className='col-lg-3 pb-4 lg:pb-0'>
								<p className='font-semibold font-heading text-green-light md:pt-3'>
									<AnimatedText text={t('funcoesEyebrow')} />
								</p>
							</div>

							<div className='col-lg-9'>
								<h2 className='text-60 font-heading font-semibold text-green-light'>
									{t('funcoesHeading')}
								</h2>

								<p className='text-20 leading-relaxed text-green-light mt-6 lg:mt-8 lg:pr-[6vw] opacity-90'>
									<AnimatedText text={t('funcoesText')} />
								</p>
							</div>

						</div>

						<div className='row pt-8 lg:pt-[3vw]'>

							<div className='col-lg-3' />

							<div className='col-lg-9'>
								<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
									{funcoes.map((item, i) => (
										<div
											key={i}
											className='flex items-start gap-4 bg-green-pale px-6 py-6 rounded-sm h-full'
										>

											<Image
												src='/img/svg/logo/icon-gp.svg'
												alt=''
												width={20}
												height={20}
												aria-hidden
												className='w-4 h-auto mt-1.5 shrink-0'
												loading='lazy'
											/>

											<span className='block'>
												<span className='block text-18 font-heading font-semibold leading-snug'>
													{item.title}
												</span>
												<span className='block text-16 leading-relaxed mt-2 opacity-80'>
													{item.text}
												</span>
											</span>

										</div>
									))}
								</StaggerUp>
							</div>

						</div>

					</div>
				</section>

				<section className='relative z-2 pt-16 lg:pt-[8vw] text-green-light'>
					<div className='base-container'>

						<div className='row items-end pb-12 lg:pb-[5vw]'>

							<div className='col-lg-7'>
								<span className='block text-sm font-semibold mb-6'>
									{t('modeloEyebrow')}
								</span>

								<h2 className='text-60 font-heading font-semibold'>
									<AnimatedText text={t('modeloHeading')} />
								</h2>
							</div>

							<div className='col-lg-4 offset-lg-1 max-lg:mt-8'>
								<p className='text-18 leading-relaxed opacity-90'>
									<AnimatedText text={t('modeloText')} />
								</p>
							</div>

						</div>

						<div className='relative'>
							
							<div className='absolute -bottom-1 -left-30 w-[calc(100vw+5rem)] h-1/2 z-1 bg-white' />

							<div className='relative z-3 w-full aspect-21/9 max-md:aspect-16/10 rounded-md lg:rounded-lg overflow-hidden'>
								<ScrollingImage>
									<Image
										src={labMeeting}
										alt={t('labMeetingAlt')}
										fill
										className='cover'
										loading='lazy'
										sizes='100vw'
									/>
								</ScrollingImage>
							</div>

						</div>

					</div>
				</section>

			</div>

			<section className='relative z-3 -mt-1 py-16 lg:py-[5vw] bg-white'>
				<div className='base-container'>
					<StaggerUp className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
						{modelo.map((step, i) => (
							<div
								key={i}
								className='flex flex-col gap-5 p-8 lg:p-10 rounded-sm lg:rounded-md bg-green-dark h-full text-green-light'
							>

								<p className='text-lg font-heading font-bold leading-none text-green-pale'>
									{String(i + 1).padStart(2, '0')}
								</p>

								<h3 className='text-30 font-heading font-semibold'>
									{step.title}
								</h3>

								<p className='text-18 leading-relaxed opacity-90'>
									{step.text}
								</p>

							</div>
						))}
					</StaggerUp>
				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
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
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg p-10 lg:p-[3.5vw] text-green-light' style={{ background: 'linear-gradient(106deg, rgba(85,83,40,1) 0%, rgba(60,64,44,1) 26%, rgba(56,45,50,1) 62%, rgba(39,39,59,1) 100%)' }}>

								<MaskedIcon
									url='/img/svg/logo/icon-bio.svg'
									className='block w-10 lg:w-12 aspect-square bg-green-light mb-8'
								/>

								<p className='text-24 font-heading leading-snug'>
									{t('platformCardText1')}
								</p>

								<p className='text-18 leading-relaxed mt-6 opacity-80'>
									{t('platformCardText2')}
								</p>

								<div className='mt-10 lg:mt-12'>
									<Button
										style='light'
										href={pages.sobreIct}
										text={t('platformButton')}
										icon='diagonal-arrow'
									/>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
