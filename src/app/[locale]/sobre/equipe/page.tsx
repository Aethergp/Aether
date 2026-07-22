// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Committee from '@/components/Committee'
import ContactBanner from '@/components/ContactBanner'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph, person, personId, plainText, FOUNDER_ID, ORG_ID } from '@/utils/schema'
import { ogLocale, localizedMetadata } from '@/utils/functions'

// imgs
import portrait from '@/assets/img/patricia.jpg'
import claudia from '@/assets/img/team/claudia.jpg'
import andre from '@/assets/img/team/andre.jpg'
import luciani from '@/assets/img/team/luciani.jpg'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'EquipePage' })

	const { canonical, languages, url } = localizedMetadata('/sobre/equipe', locale)

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
					url: '/img/og/sobre-equipe.jpg',
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

// name/photo/linked are the same regardless of locale; area/bio come from EquipePage.comite in the message files
const comiteBase = [
	{
		name: 'Claudia Ramos',
		titulacao: '',
		instituicao: '',
		photo: claudia,
		linked: 'https://www.linkedin.com/in/claudia-s-ramos-santos-4a9937a8/'
	},
	{
		name: 'André Adriano Chaia',
		titulacao: '',
		instituicao: '',
		photo: andre,
		linked: 'https://www.linkedin.com/in/andr%C3%A9-adriano-chaia-a94a343a/'
	},
	{
		name: 'Luciani Fagotti',
		titulacao: '',
		instituicao: '',
		photo: luciani,
		linked: 'https://www.linkedin.com/in/lucianifagotti/'
	}
]

export default async function EquipePage({ params }: Props) {

	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'EquipePage' })
	const tNav = await getTranslations({ locale, namespace: 'Nav' })

	const bio = t.raw('bio') as string[]
	const realizacoes = t.raw('realizacoes') as string[]
	const comite = comiteBase.map((base, i) => ({
		...base,
		...(t.raw('comite') as { area: string, bio: string }[])[i]
	}))

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-equipe'
				data={await pageGraph({
					locale,
					type: 'AboutPage',
					path: '/sobre/equipe',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: tNav('sobre'), item: '/sobre' },
						{ name: tNav('sobreEquipe'), item: '/sobre/equipe' }
					],
					extend: {
						mainEntity: [
							{ '@id': FOUNDER_ID },
							...comite.map((m) => ({ '@id': personId(m.name) }))
						]
					},
					extra: comite.map((m) => person({
						name: m.name,
						jobTitle: m.area || 'Scientific Advisor',
						description: plainText(m.bio),
						image: m.photo.src,
						linkedin: m.linked,
						worksFor: ORG_ID
					}))
				})}
			/>

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
								<AnimatedText text={t('heroTitle')} />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text={t('heroText')} />
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>

				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-12'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('sectionHeading')}
							</AnimatedTitle>
						</div>
					</div>

					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-12 lg:items-stretch'>

						<div className='col-lg-5'>
							<div className='relative w-full max-lg:aspect-4/5 lg:h-full lg:min-h-150 overflow-hidden rounded-md lg:rounded-lg'>

								<ScrollingImage>
									<Image
										src={portrait}
										alt={t('founderPhotoAlt')}
										fill
										className='cover'
										sizes='(max-width: 992px) 100vw, 42vw'
									/>
								</ScrollingImage>

								<div className='absolute z-2 bottom-4 left-4 lg:bottom-6 lg:left-6'>
									<Button
										style='light'
										href='https://www.linkedin.com/in/patricia-p-oliveira/'
										text={t('founderLinkedinText')}
										icon='linkedin'
										target='_blank'
										rel='noopener noreferrer'
										aria-label={t('founderLinkedinAriaLabel')}
									/>
								</div>

							</div>
						</div>

						<div className='col-lg-6 offset-lg-1 flex flex-col justify-center py-2'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-3'>
								{t('founderRole')}
							</span>

							<h3 className='text-60 font-heading font-semibold leading-[1.05]!'>
								Patricia P. Oliveira
							</h3>

							<div className='flex flex-col gap-5 mt-8 lg:mt-10 text-18 leading-relaxed lg:pr-[4vw]'>
								{bio.map((paragraph, i) => (
									<p
										key={i}
										dangerouslySetInnerHTML={{ __html: paragraph }}
									/>
								))}
							</div>

							<div className='mt-12'>

								<p className='font-semibold font-heading'>
									<AnimatedText text={t('realizacoesEyebrow')} />
								</p>

								<StaggerUp className='flex flex-col'>
									{realizacoes.map((item, i) => (
										<div
											key={i}
											className='py-5 border-t border-green-dark/15 first:border-t-0'
										>
											<p className='text-20 leading-snug'>{item}</p>
										</div>
									))}
								</StaggerUp>

							</div>

						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw] bg-green-pale'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text={t('committeeEyebrow')} />
							</p>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								{t('committeeHeading')}
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[8vw]'>
								<AnimatedText text={t('committeeText')} />
							</p>
						</div>
					</div>

					<Committee members={comite} />

				</div>
			</section>

			<ContactBanner className='bg-green-pale pb-20 lg:pb-[10vw]' />

		</div>
	)
}
