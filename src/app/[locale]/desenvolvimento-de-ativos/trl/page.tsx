// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import TRLScale from './TRLScale'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

// img
import imgContext from '@/assets/img/stairs.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'TRLPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/desenvolvimento-de-ativos/trl'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/desenvolvimento-de-ativos/trl',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/desenvolvimento-de-ativos-trl.jpg',
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

// visual styling classes stay in code, keyed by index; copy comes from TRLPage.jornada/principios
const jornadaStyles = [
	{ card: 'bg-white border border-green-dark/12 text-green-dark', muted: 'text-green-dark/50', divider: 'border-green-dark/12' },
	{ card: 'bg-green-pale text-green-dark', muted: 'text-green-dark/55', divider: 'border-green-dark/15' },
	{ card: 'bg-green-dark text-green-light', muted: 'text-green-light/60', divider: 'border-green-light/20' }
]

export default async function TRLPage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'TRLPage' })

	const jornada = (t.raw('jornada') as { fase: string, range: string, subtitle: string, desc: string, onde: string }[])
		.map((item, i) => ({ ...item, ...jornadaStyles[i] }))
	const principios = t.raw('principios') as string[]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-pd-trl'
				data={pageGraph({
					type: 'WebPage',
					path: '/desenvolvimento-de-ativos/trl',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: 'Desenvolvimento de Ativos', item: '/desenvolvimento-de-ativos' },
						{ name: 'TRL', item: '/desenvolvimento-de-ativos/trl' }
					]
				})}
			/>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text={t('heading')} />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text={t.markup('heroText', { b: (chunks) => `<b>${chunks}</b>` })} />
							</p>

						</div>

					</div>
				</div>
			</section>

			{/* Contexto */}
			<section className='relative overflow-hidden'>
				<div className='base-container'>

					<div className='relative w-full aspect-square sm:aspect-4/3 lg:aspect-video rounded-md xl:rounded-xl overflow-hidden'>

						<div className='absolute z-2 inset-0 bg-green-dark mix-blend-screen' />

						<ScrollingImage>
							<Image
								src={imgContext}
								alt={t('contextImageAlt')}
								fill
								className='object-cover'
								sizes='100vw'
							/>
						</ScrollingImage>
					</div>

					<div className='row pb-10 lg:pb-[5vw] pt-16 lg:pt-[6vw]'>

						<div className='col-lg-3 pb-8 lg:pb-0'>
							<MaskedIcon
								url='/img/svg/logo/icon-bio.svg'
								className='block w-8 md:w-10 lg:w-12 aspect-square bg-green-dark'
							/>
						</div>

						<div className='col-lg-8'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('contextTitle')}
							</AnimatedTitle>
						</div>

					</div>

					<div className='row pt-2 lg:pt-[2vw]'>

						<div className='col-lg-3' />

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('scaleEyebrow')} />
							</p>
						</div>

						<div className='col-lg-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text={t('scaleText')} />
							</p>

							<div className='mt-8 lg:mt-10 p-7 lg:p-8 rounded-sm lg:rounded-md bg-green-pale'>
								<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-3'>
									{t('methodologyLabel')}
								</span>
								<p className='text-16 leading-relaxed'>
									{t.rich('methodologyText', { b: (chunks) => <b>{chunks}</b> })}
								</p>
							</div>
						</div>

					</div>
				</div>

			</section>

			{/* A jornada em três blocos */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('journeyEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('journeyHeading')}
							</AnimatedTitle>
						</div>

					</div>

					<StaggerUp className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch'>
						{jornada.map((bloco, i) => (
							<div
								key={i}
								className={`flex flex-col gap-5 p-8 lg:p-10 rounded-md lg:rounded-lg h-full ${bloco.card}`}
							>

								<div className='flex items-center justify-between'>
									<span className='text-sm font-semibold font-heading uppercase tracking-wide'>
										{bloco.range}
									</span>

									{/*
									<span className={`text-5xl lg:text-6xl font-heading font-bold leading-none ${bloco.muted}`}>
										{String(i + 1).padStart(2, '0')}
									</span>
									*/}

								</div>

								<h3 className='text-30 font-heading font-semibold leading-tight mt-2'>
									{bloco.fase}
								</h3>

								<span className={`text-18 font-heading font-semibold ${bloco.muted}`}>
									{bloco.subtitle}
								</span>

								<p className='text-18 leading-relaxed opacity-90'>
									{bloco.desc}
								</p>

								<div className={`mt-auto pt-5 border-t ${bloco.divider}`}>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-1'>
										{t('whereLabel')}
									</span>
									<p className='text-16 leading-relaxed opacity-80'>
										{bloco.onde}
									</p>
								</div>

							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<section className='relative overflow-hidden h-screen'>

				<div className='absolute z-3 inset-0 bg-green-dark mix-blend-soft-light' />

				<ScrollingImage>
					<video
						loop
						muted
						playsInline
						autoPlay
						className='relative z-2 w-full h-full object-cover'
					>
						<source
							src='/videos/lab.mp4'
							type='video/mp4'
						/>
					</video>
				</ScrollingImage>

			</section>

			{/* Escala completa - os nove níveis */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('levelsEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('levelsHeading')}
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text={t('levelsText')} />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-12'>
							<TRLScale />
						</div>
					</div>

				</div>
			</section>

			{/* Como a Aether conduz a maturação */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-pale/30'>

				<div className='absolute bottom-0 right-0 w-1/2 max-w-xl opacity-[0.04] pointer-events-none select-none flex items-end justify-end pr-10 pb-10'>
					<Image
						src='/img/svg/logo/icon-bio.svg'
						alt=''
						width={400}
						height={400}
						className='w-full h-auto'
						aria-hidden
					/>
				</div>

				<div className='base-container relative z-1'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('approachEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<h2 className='text-60 font-heading font-semibold'>
								<AnimatedText text={t('approachHeading')} />
							</h2>

							<p className='text-20 leading-relaxed mt-8 lg:mt-10 opacity-90 max-w-3xl'>
								<AnimatedText text={t('approachText')} />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
								{principios.map((item, i) => (
									<div
										key={i}
										className='flex items-start gap-4 bg-green-dark text-green-light px-6 py-5 rounded-sm h-full'
									>
										<MaskedIcon
											url='/img/svg/logo/icon-gp.svg'
											className='block w-4 aspect-square bg-green-light mt-1 shrink-0'
										/>
										<span
											className='text-18 leading-relaxed'
											dangerouslySetInnerHTML={{ __html: item }}
										/>
									</div>
								))}
							</StaggerUp>

							<blockquote className='mt-12 lg:mt-16 border-l-2 border-green-dark pl-8 lg:pl-10'>
								<p className='text-30 lg:text-36 font-heading font-semibold leading-tight'>
									&ldquo;{t('quote')}&rdquo;
								</p>
								<footer className='text-16 mt-5 opacity-60'>
									{t('quoteAttribution')}
								</footer>
							</blockquote>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
