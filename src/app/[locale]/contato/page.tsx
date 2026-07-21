// libraries
import type { Metadata } from 'next'
import clsx from 'clsx'
import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import { Form, Input, Select, Textarea, InputHidden, Honeypot, Submit } from '@/components/Form'
import JsonLd from '@/components/JsonLd'

// utils
import { email, phone } from '@/utils/functions'
import { social, contact } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'ContatoPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/contato'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/contato',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/contato.jpg',
					width: 1200,
					height: 630,
					alt: 'Aether Global Pharma'
				}
			],
			locale: 'pt_BR',
			type: 'website'
		}
	}
}

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3601.624946455032!2d-49.29010442399409!3d-25.484196177527387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce359c443d8e3%3A0xdb55f50153993a47!2sR.%20Jos%C3%A9%20Casemiro%20Stenzowski%2C%2021%20-%20Novo%20Mundo%2C%20Curitiba%20-%20PR%2C%2081010-370!5e0!3m2!1spt-BR!2sbr!4v1781447134921!5m2!1spt-BR!2sbr'
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Rua%20Jos%C3%A9%20Casemiro%20Stenzowski%2C%2021D%2C%20Curitiba%20-%20PR'

// temporary placeholder addresses until the client confirms the real ones (~2 months)
const offices = [
	{
		eyebrow: 'Sede',
		city: 'Curitiba, PR',
		lines: ['Rua José Casemiro Stenzowski, 21D', 'Novo Mundo', 'CEP 81010-370'],
		mapSrc: MAP_SRC,
		mapLink: MAP_LINK
	},
	{
		eyebrow: 'Filial',
		city: 'Campinas, SP',
		lines: ['Rua José Casemiro Stenzowski, 21D', 'Novo Mundo', 'CEP 81010-370'],
		mapSrc: MAP_SRC,
		mapLink: MAP_LINK
	}
]

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
				data={pageGraph({
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

								{/*
								<div>
									<span className='block text-sm opacity-60 mb-1'>E-mail</span>
									<a
										href={email(contact.email)}
										className='hover-underline'
									>
										{contact.email}
									</a>
								</div>

								<div>
									<span className='block text-sm opacity-60 mb-1'>Telefone</span>
									<a
										href={phone(contact.phone)}
										className='hover-underline'
									>
										{contact.phone}
									</a>
								</div>
								*/}

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

			{/*
			<section className='pb-16 lg:pb-[8vw]'>
				<div className='base-container'>

					<AnimatedTitle
						style='dark'
						className='text-60 font-heading font-semibold text-[10vw]! leading-[.9]! mb-10 lg:mb-[5vw]'
					>
						Onde Estamos
					</AnimatedTitle>

					{offices.map((office, i) => {
						const textFirst = i % 2 === 0

						return (
							<div
								key={i}
								className='row lg:items-center max-lg:flex max-lg:flex-col max-lg:gap-8 mb-16 lg:mb-[6vw] last:mb-0'
							>

								<div className={clsx(
									'col-lg-6 flex flex-col justify-center lg:py-10',
									textFirst ? 'lg:pr-[4vw]' : 'lg:order-2 lg:pl-[4vw]'
								)}>

									<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-3'>
										({office.eyebrow})
									</span>

									<TextReveal blockColor='var(--color-green-dark)'>
										<h2 className='text-60 font-heading font-semibold'>
											{office.city}
										</h2>
									</TextReveal>

									<address className='not-italic text-20 leading-relaxed my-8'>
										{office.lines.map((line, j) => (
											<AnimatedText key={j} text={line} />
										))}
									</address>

									<Button
										style='dark-2'
										href={office.mapLink}
										target='_blank'
										rel='noopener noreferrer'
										text='Ver no Google Maps'
										icon='diagonal-arrow'
									/>

								</div>

								<div className={clsx('col-lg-6', !textFirst && 'lg:order-1')}>
									<div className='block relative overflow-hidden w-full max-lg:aspect-4/3 lg:h-full lg:min-h-[90vh] rounded-md pointer-events-none'>
										<ScrollingImage>
											<iframe
												src={office.mapSrc}
												title={`Localização - ${office.city}`}
												loading='lazy'
												allowFullScreen
												referrerPolicy='no-referrer-when-downgrade'
												className='cover border-0 saturate-0'
											/>
										</ScrollingImage>
									</div>
								</div>

							</div>
						)
					})}

				</div>
			</section>
			*/}

		</div>
	)
}
