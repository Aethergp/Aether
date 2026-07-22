'use client'

// libraries
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { Link } from 'next-transition-router'
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// components
import Button from '@/components/Button'
import { Form, Input, Textarea, FileUpload, Checkbox, InputHidden, Honeypot, Submit } from '@/components/Form'

// utils
import { pages, contact } from '@/utils/routes'

gsap.registerPlugin(ScrollTrigger)

// required step-1 fields gated before advancing (Telefone is optional)
const STEP_1_REQUIRED = ['Nome', 'Instituição', 'Cargo', 'Email', 'Localização']

function Steps() {

	const t = useTranslations('InscrevaPage')
	const [step, setStep] = useState(1)
	const { trigger } = useFormContext()

	const isFirstRender = useRef(true)

	// the step swap changes the page height - refresh ScrollTrigger once the CSS
	// fade/height has settled so the footer reveal + stroke triggers stay accurate
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		const timer = setTimeout(() => ScrollTrigger.refresh(), 450)
		return () => clearTimeout(timer)
	}, [step])

	const goNext = async () => {
		const valid = await trigger(STEP_1_REQUIRED)
		if (valid) setStep(2)
	}

	return (
		<>

			<div className='mb-8'>
				<div className='flex items-center justify-between text-sm text-green-dark mb-2'>
					<span className='font-semibold'>{t('form.stepLabel', { step })}</span>
					<span className='opacity-60'>{step === 1 ? t('form.stepIdentification') : t('form.stepTechnology')}</span>
				</div>
				<div className='flex gap-2'>
					<span className='h-1 flex-1 rounded-full bg-green-dark' />
					<span className={clsx('h-1 flex-1 rounded-full transition-colors duration-300', step === 2 ? 'bg-green-dark' : 'bg-green-dark/15')} />
				</div>
			</div>

			<div key={step} className='fade-step-in'>

				{step === 1 ? (
					<div>

						<Input id='nome' label={t('form.nameLabel')} name='Nome' type='text' placeholder={t('form.namePlaceholder')} required />
						<Input id='instituicao' label={t('form.institutionLabel')} name='Instituição' type='text' placeholder={t('form.institutionPlaceholder')} required />
						<Input id='cargo' label={t('form.roleLabel')} name='Cargo' type='text' placeholder={t('form.rolePlaceholder')} required />
						<Input id='email' label={t('form.emailLabel')} name='Email' type='email' placeholder={t('form.emailPlaceholder')} required />
						<Input id='telefone' label={t('form.phoneLabel')} name='Telefone' type='tel' placeholder={t('form.phonePlaceholder')} />
						<Input id='localizacao' label={t('form.locationLabel')} name='Localização' type='text' placeholder={t('form.locationPlaceholder')} required />

						<div className='mt-8'>
							<Button type='button' onClick={goNext} text={t('form.continueButton')} icon='diagonal-arrow' style='dark' />
						</div>

					</div>
				) : (
					<div>

						<Textarea
							id='resumo'
							label={t('form.summaryLabel')}
							name='Resumo da tecnologia'
							microcopy={t('form.summaryMicrocopy')}
							placeholder={t('form.summaryPlaceholder')}
							required
						/>

						<Textarea
							id='problema'
							label={t('form.problemLabel')}
							name='Problema que resolve'
							placeholder={t('form.problemPlaceholder')}
							required
						/>

						<Textarea
							id='limitacoes'
							label={t('form.limitationsLabel')}
							name='Limitações atuais'
							microcopy={t('form.limitationsMicrocopy')}
							placeholder={t('form.limitationsPlaceholder')}
							required
						/>

						<p className='text-sm text-green-dark/70 -mt-1 mb-4'>
							{t('form.trlPrompt')}{' '}
							<Link href={pages.trl} className='hover-underline font-semibold'>
								{t('form.trlLink')}
							</Link>
						</p>

						<Textarea
							id='diferenciais'
							label={t('form.differentiatorsLabel')}
							name='Diferenciais'
							placeholder={t('form.differentiatorsPlaceholder')}
							required
						/>

						<FileUpload
							id='documento'
							label={t('form.documentLabel')}
							name='Documento'
							microcopy={t('form.documentMicrocopy')}
							uploadToR2
						/>

						<Checkbox
							type='checkbox'
							id='lgpd'
							label={t('form.lgpdLabel')}
							name='Consentimento LGPD'
							required
							className='mt-6'
						>
							<span>
								{t('form.lgpdText')}{' '}
								<Link href={pages.privacy} className='hover-underline font-semibold'>
									{t('form.privacyLink')}
								</Link>
								. {/* PLACEHOLDER - texto LGPD a alinhar com o cliente */}
							</span>
						</Checkbox>

						<div className='flex flex-wrap items-center gap-3 mt-8'>
							<Button type='button' onClick={() => setStep(1)} text={t('form.backButton')} style='dark-2' />
							<Submit text={t('form.submitButton')} style='dark' />
						</div>

					</div>
				)}

			</div>

		</>
	)
}

export default function ProjectForm() {
	const t = useTranslations('InscrevaPage')

	return (
		<Form
			endpoint='/api/resend'
			onSuccess={{
				title: t('form.successTitle'),
				text: t('form.successText')
			}}
			onError={{
				title: t('form.errorTitle'),
				text: t('form.errorText', { email: contact.email })
			}}
		>

			<InputHidden name='form' value='inscricao' id='form' />
			
			<Honeypot />

			<Steps />

		</Form>
	)
}
