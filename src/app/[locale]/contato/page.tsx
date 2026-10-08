// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import Button from '@/components/Button'
import { Form, Input, Select, Textarea, InputHidden, Honeypot, Submit } from '@/components/Form'
import JsonLd from '@/components/JsonLd'

// utils
import { ogLocale, localizedMetadata } from '@/utils/functions'
import { social } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ContatoPage' })

	const { canonical, languages, url } = localizedMetadata('/contato', locale)

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
					url: '/img/og/contato.jpg',
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

export default async function ContatoPage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ContatoPage' })

	const subjectOptions = [
		{ value: 'Parceria científica ou institucional', label: t('form.subjectScientific') },
		{ value: 'Licenciamento e negócios', label: t('form.subjectLicensing') },
		{ value: 'Investimento', label: t('form.subjectInvestment') },
		{ value: 'Imprensa', label: t('form.subjectPress') },
		{ value: 'Outros assuntos', label: t('form.subjectOther') }
	]

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-contato'
				data={await pageGraph({
					locale,
					type: 'ContactPage',
					path: '/contato',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/contato' }
					]
				})}
			/>

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-12 lg:pb-[5vw]'>

				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-9 offset-lg-2'>

							<p className='font-semibold font-heading mb-6'>
								<AnimatedText text={t('eyebrow')} />
							</p>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									{t('heading')}
								</h1>
							</TextReveal>

							<p className='text-30 font-heading text-green-dark mt-3 lg:mt-5'>
								{t('subheading')}
							</p>

						</div>
					</div>
				</div>

			</section>

			<section className='pb-12 lg:pb-[4vw]'>
				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-10 col-xl-7 offset-lg-2'>

							<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-green-pale rounded-md p-8 lg:p-10'>

								<p className='text-18 md:pr-10'>
									{t('researcherText')}
								</p>

								<Button
									style='dark'
									href='/inscreva-seu-projeto'
									text={t('researcherButton')}
									icon='diagonal-arrow'
									className='shrink-0'
								/>

							</div>

						</div>
					</div>
				</div>
			</section>

			<section className='relative overflow-hidden py-16 lg:py-[8vw]'>

				<StrokePath
					viewBox='0 0 657 1636'
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					className='z-0 top-0 -left-10 w-[85vw] sm:w-[55vw] lg:w-[45vw]'
					//markers
					end='100% 0%'
				/>

				<div className='base-container relative z-2'>
					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-12'>

						<div className='col-lg-2 max-lg:hidden' />

						<div className='col-lg-4 col-xl-3'>

							<h2 className='font-semibold font-heading mb-8 lg:mb-12'>
								<AnimatedText text={t('contactEyebrow')} />
							</h2>

							<StaggerUp className='flex flex-col gap-6 text-18'>

								<div>
									<span className='block text-sm opacity-60 mb-1'>Instagram</span>
									<a
										href={social.instagram}
										target='_blank'
										rel='noopener noreferrer'
										className='hover-underline'
									>
										@aetherglobalpharma
									</a>
								</div>

							</StaggerUp>

						</div>

						<div className='col-lg-1 max-lg:hidden' />

						<div className='col-lg-5'>

							<Form
								endpoint='/api/resend'
								onSuccess={{
									title: t('form.successTitle'),
									text: t('form.successText')
								}}
								onError={{
									title: t('form.errorTitle'),
									text: t('form.errorText')
								}}
								clearOnSubmit
							>

								<InputHidden
									name='form'
									value='contato'
									id='form'
								/>

								<Honeypot />

								<Input
									id='nome'
									label={t('form.nameLabel')}
									name='Nome'
									type='text'
									placeholder={t('form.namePlaceholder')}
									required
								/>

								<Input
									id='email'
									label={t('form.emailLabel')}
									name='Email'
									type='email'
									placeholder={t('form.emailPlaceholder')}
									required
								/>

								<Input
									id='empresa'
									label={t('form.companyLabel')}
									name='Empresa'
									type='text'
									placeholder={t('form.companyPlaceholder')}
								/>

								<Select
									id='assunto'
									label={t('form.subjectLabel')}
									name='Assunto'
									placeholder={t('form.subjectPlaceholder')}
									options={subjectOptions}
									required
								/>

								<Textarea
									id='mensagem'
									label={t('form.messageLabel')}
									name='Mensagem'
									placeholder={t('form.messagePlaceholder')}
									required
								/>

								<Submit
									text={t('form.submit')}
									style='dark'
								/>

							</Form>

						</div>

					</div>
				</div>

			</section>

		</div>
	)
}
