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
import Counter from '@/components/Utils/Animations/Counter'
import Button from '@/components/Button'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Committee from '@/components/Committee'
import JsonLd from '@/components/JsonLd'

// img
import imgFlagship from '@/assets/img/water.jpg'
import katlin from '@/assets/img/team/katlin.jpg'
import phili from '@/assets/img/team/phili.jpg'

// utils
import { pages } from '@/utils/routes'
import { pageGraph, person, personId, plainText } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'PipelinePage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/desenvolvimento-de-ativos/pipeline'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/desenvolvimento-de-ativos/pipeline',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/desenvolvimento-de-ativos-pipeline.jpg',
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

// name/titulacao/instituicao/photo/linked are the same regardless of locale;
// area/bio come from PipelinePage.responsaveis in the message files
const responsaveisBase = [
	{
		name: 'Katlin B. Massirer',
		titulacao: 'PhD',
		instituicao: 'CQMED',
		photo: katlin,
		linked: 'https://www.linkedin.com/in/katlin-massirer-86a0779/'
	},
	{
		name: 'Ronaldo Pilli',
		titulacao: 'PhD',
		instituicao: 'CQMED',
		photo: phili
		//linked: 'https://www.linkedin.com/in/katlin-massirer-86a0779/'
	}
]

const dimensoesIcons = [
	'/img/svg/logo/icon-gp.svg',
	'/img/svg/logo/icon-gp.svg',
	'/img/svg/logo/icon-gp.svg'
]

export default async function PipelinePage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'PipelinePage' })

	const parceiros = t.raw('parceiros') as string[]
	const responsaveis = responsaveisBase.map((base, i) => ({
		...base,
		...(t.raw('responsaveis') as { area: string, bio: string }[])[i]
	}))
	const dimensoes = (t.raw('dimensoes') as { title: string, text: string }[]).map((item, i) => ({
		...item,
		eyebrow: String(i + 1).padStart(2, '0'),
		icon: dimensoesIcons[i]
	}))

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-pd-pipeline'
				data={pageGraph({
					type: 'CollectionPage',
					path: '/desenvolvimento-de-ativos/pipeline',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: 'Desenvolvimento de Ativos', item: '/desenvolvimento-de-ativos' },
						{ name: 'Pipeline', item: '/desenvolvimento-de-ativos/pipeline' }
					],
					extend: {
						mainEntity: responsaveis.map((m) => ({
							'@id': personId(m.name, '/desenvolvimento-de-ativos/pipeline')
						}))
					},
					// external researchers: affiliation, never worksFor - they are not
					// Aether employees
					extra: responsaveis.map((m) => person({
						name: m.name,
						jobTitle: m.area,
						description: plainText(m.bio),
						image: m.photo.src,
						linkedin: m.linked,
						basePath: '/desenvolvimento-de-ativos/pipeline',
						affiliation: m.instituicao
					}))
				})}
			/>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
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

			{/* Projeto em destaque */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-dark text-green-light'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('flagship.eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<span className='inline-flex items-center px-5 py-2.5 rounded-full border border-green-light/30 text-15 font-semibold mb-8 lg:mb-10'>
								{t('flagship.badge')}
							</span>

							<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text={t('flagship.heading')} />
							</h2>
						</div>

					</div>

					<div className='row items-stretch gap-y-8'>

						<div className='col-xl-5'>
							<div className='relative aspect-4/5 sm:aspect-4/3 xl:aspect-auto xl:h-full rounded-md xl:rounded-xl overflow-hidden'>
								<ScrollingImage>
									<Image
										src={imgFlagship}
										alt={t('flagship.imageAlt')}
										fill
										className='object-cover'
										sizes='(max-width: 1024px) 100vw, 40vw'
									/>
								</ScrollingImage>
								<div className='absolute z-2 inset-0 bg-green-dark mix-blend-soft-light' />
							</div>
						</div>

						<div className='col-xl-7'>
							<div className='xl:pl-[3vw] h-full flex flex-col'>

								<p className='text-20 leading-relaxed opacity-90'>
									{t('flagship.description')}
								</p>

								<div className='mt-8 lg:mt-10 p-7 lg:p-8 rounded-sm lg:rounded-md bg-green-light/[0.07] border border-green-light/15'>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-2'>
										{t('flagship.focusLabel')}
									</span>
									<p className='text-24 font-heading font-semibold leading-tight'>
										{t('flagship.focusText')}
									</p>
								</div>

								<div className='mt-8 lg:mt-10'>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-4'>
										{t('flagship.partnersLabel')}
									</span>
									<div className='flex flex-wrap gap-3'>
										{parceiros.map((label, i) => (
											<span
												key={i}
												className='inline-flex items-center px-5 py-2.5 rounded-full bg-green-light/[0.07] border border-green-light/15 text-15 font-semibold'
											>
												{label}
											</span>
										))}
									</div>
								</div>

								<div className='mt-8 lg:mt-10 grid grid-cols-1 gap-px rounded-md lg:rounded-lg overflow-hidden border border-green-light/15'>
									<div className='bg-green-light/4 p-7 lg:p-8'>
										<span className='block text-60 lg:text-[4vw] font-heading font-bold leading-none'>
											R$ <Counter number={90} /> mi
										</span>
										<span className='block text-16 mt-3 opacity-70'>
											{t('flagship.stat1Label')}
										</span>
									</div>
									<div className='bg-green-light/4 p-7 lg:p-8'>
										<span className='block text-60 lg:text-[4vw] font-heading font-bold leading-none'>
											R$ <Counter number={12.5} /> mi
										</span>
										<span className='block text-16 mt-3 opacity-70'>
											{t('flagship.stat2Label')}
										</span>
									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

			{/* Responsáveis científicos */}
			<section className='pb-16 lg:pb-[8vw] bg-green-dark text-green-light -mt-px'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading pt-2'>
								<AnimatedText text={t('team.eyebrow')} />
							</p>
						</div>
						<div className='col-lg-9'>
							<h2 className='text-60 font-heading font-semibold'>
								{t('team.heading')}
							</h2>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[8vw]'>
								<AnimatedText text={t('team.text')} />
							</p>
						</div>
					</div>

					<Committee members={responsaveis} />

				</div>
			</section>

			{/* Como o pipeline se organiza */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('organize.eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('organize.heading')}
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text={t('organize.text')} />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
								{dimensoes.map((item, i) => (
									<div
										key={i}
										className='flex flex-col gap-5 p-8 lg:p-9 rounded-md lg:rounded-lg bg-green-pale h-full'
									>
										<div className='flex items-center justify-between'>
											<MaskedIcon
												url={item.icon}
												className='block w-7 aspect-square bg-green-dark'
											/>
											<span className='text-5xl font-heading font-bold leading-none text-green-dark/15'>
												{item.eyebrow}
											</span>
										</div>

										<h3 className='text-24 font-heading font-semibold leading-tight! mt-2'>
											{item.title}
										</h3>

										<p
											className='text-16 leading-relaxed opacity-80'
											dangerouslySetInnerHTML={{ __html: item.text }}
										/>
									</div>
								))}
							</StaggerUp>

							<div className='mt-8 lg:mt-10'>
								<Button
									style='dark'
									href={pages.trl}
									text={t('organize.button')}
									icon='diagonal-arrow'
								/>
							</div>
						</div>
					</div>

				</div>
			</section>

			{/* Pipeline em expansão */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-pale/40'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('expansion.eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('expansion.heading')}
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text={t('expansion.text')} />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
								{[0, 1, 2].map((i) => (
									<div
										key={i}
										className='relative flex flex-col gap-5 p-8 lg:p-9 rounded-md lg:rounded-lg border border-dashed border-green-dark/25 bg-white/40 h-full min-h-[15rem]'
									>
										<span className='inline-flex w-fit items-center px-4 py-2 rounded-full bg-green-dark/[0.06] text-sm font-semibold uppercase tracking-wide text-green-dark/60'>
											{t('expansion.badge')}
										</span>

										<div className='mt-auto'>
											<span className='block h-3 w-2/3 rounded-full bg-green-dark/10 mb-3' />
											<span className='block h-3 w-1/2 rounded-full bg-green-dark/10' />
										</div>

										<span className='text-15 font-semibold text-green-dark/50'>
											{t('expansion.placeholder')}
										</span>
									</div>
								))}
							</StaggerUp>

						</div>
					</div>

				</div>
			</section>

		</div>
	)
}
