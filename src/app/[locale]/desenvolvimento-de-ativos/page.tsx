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
import StrokePath from '@/components/Utils/Animations/StrokePath'
import Button from '@/components/Button'
import PDDimensoes from './PDDimensoes'
import JsonLd from '@/components/JsonLd'

// utils
import { pages } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'
import { ogLocale, localizedMetadata } from '@/utils/functions'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'PDPage' })

	const { canonical, languages, url } = localizedMetadata('/desenvolvimento-de-ativos', locale)

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical,
			languages
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url,
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/desenvolvimento-de-ativos.jpg',
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

export default async function DesenvolvimentodeAtivos({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'PDPage' })
	const criterios = t.raw('criterios') as { title: string, text: string }[]
	const governancaPills = t.raw('governance.pills') as string[]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-pd'
				data={await pageGraph({
					locale,
					type: 'WebPage',
					path: '/desenvolvimento-de-ativos',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/desenvolvimento-de-ativos' }
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
			<section className='relative overflow-hidden py-16 lg:py-[8vw]'>

				<StrokePath
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					viewBox='0 0 657 1636'
					className='-z-1 top-[5%] -left-2 w-vw sm:w-[45vw]'
					start='10% 80%'
					end='50% 20%'
				/>

				<div className='base-container'>
					<div className='row pb-10 lg:pb-[5vw]'>

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

					<div className='row pt-2 lg:pt-[4vw]'>

						<div className='col-lg-3' />

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('approachEyebrow')} />
							</p>
						</div>

						<div className='col-lg-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text={t('approachText')} />
							</p>
						</div>

					</div>
				</div>

			</section>

			{/* Quatro dimensões */}
			<PDDimensoes />

			{/* Perfil dos projetos */}
			<section className='pt-16 lg:pt-[8vw] pb-16 lg:pb-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text={t('profileEyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('profileHeading')}
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<p className='text-20 leading-relaxed pb-10 lg:pb-[3vw]'>
								<AnimatedText text={t('profileIntro')} />
							</p>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{criterios.map((item, i) => (
									<div
										key={i}
										className='flex flex-col gap-4 p-8 lg:p-10 rounded-sm lg:rounded-md bg-green-pale h-full'
									>
										<h3 className='text-24 font-heading font-semibold'>
											{item.title}
										</h3>
										<p className='text-18 leading-relaxed'>
											{item.text}
										</p>
									</div>
								))}
							</StaggerUp>

							<p className='text-20 leading-relaxed pt-6'>
								{t('profileFooter')}
							</p>

						</div>
					</div>

				</div>
			</section>

			{/* As duas frentes */}
			<section className='py-16 lg:py-[8vw] bg-green-pale/40'>
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
						</div>

					</div>

					<div className='row'>
						<StaggerUp className='col-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6'>

							<div>
								<div className='flex flex-col gap-6 p-10 lg:p-[3vw] rounded-md lg:rounded-lg bg-green-dark text-green-light h-full overflow-hidden relative'>

									<div className='absolute bottom-0 right-0 text-[12rem] leading-none font-heading font-bold text-green-pale/5 select-none pointer-events-none'>
										PI
									</div>

									<span className='text-sm font-semibold opacity-60 uppercase tracking-wide'>
										{t('pipelineCard.label')}
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										{t('pipelineCard.title')}
									</h2>

									<p className='text-18 leading-relaxed opacity-90 relative z-1 max-w-sm'>
										{t('pipelineCard.text')}
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='light-2'
											href={pages.pdPipeline}
											text={t('pipelineCard.button')}
											icon='diagonal-arrow'
										/>
									</div>

								</div>
							</div>

							<div>
								<div className='flex flex-col gap-6 p-10 lg:p-[3vw] rounded-md lg:rounded-lg border border-green-dark/20 bg-white h-full overflow-hidden relative'>

									<div className='absolute bottom-0 right-0 text-[10rem] leading-none font-heading font-bold text-green-pale/10 select-none pointer-events-none'>
										TRL
									</div>

									<span className='text-sm font-semibold opacity-60 uppercase tracking-wide'>
										{t('trlCard.label')}
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										{t('trlCard.title')}
									</h2>

									<p className='text-18 leading-relaxed relative z-1 max-w-sm'>
										{t('trlCard.text')}
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='dark'
											href={pages.trl}
											text={t('trlCard.button')}
											icon='diagonal-arrow'
										/>
									</div>

								</div>
							</div>

						</StaggerUp>
					</div>

				</div>
			</section>

			{/* Governança */}
			<section className='pb-16 lg:pb-[8vw] bg-green-pale/40 overflow-hidden relative'>

				<div className='absolute bottom-0 right-0 w-1/2 max-w-xl opacity-5 pointer-events-none select-none flex items-end justify-end pr-10 pb-10'>
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
					<div className='row'>

						<div className='col-lg-8 offset-lg-3'>

							<h2 className='text-48 font-heading font-semibold mb-8 lg:mb-10'>
								<AnimatedText text={t('governance.heading')} />
							</h2>

							<p className='text-20 leading-relaxed opacity-70 mb-10 lg:mb-12 max-w-2xl'>
								<AnimatedText text={t('governance.text')} />
							</p>

							<StaggerUp className='flex flex-wrap gap-3 mb-10 lg:mb-12'>
								{governancaPills.map((label, i) => (
									<span
										key={i}
										className='inline-flex items-center px-5 py-3 rounded-full border border-green-dark/30 text-15 font-semibold text-green-dark'
									>
										{label}
									</span>
								))}
							</StaggerUp>

							<Button
								style='dark'
								href={pages.sobreIct}
								text={t('governance.button')}
								icon='diagonal-arrow'
							/>

						</div>

					</div>
				</div>

			</section>

		</div>
	)
}
