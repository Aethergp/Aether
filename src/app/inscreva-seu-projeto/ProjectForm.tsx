'use client'

// libraries
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { Link } from 'next-transition-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// components
import Button from '@/components/Button'
import { Form, Input, Textarea, FileUpload, Checkbox, InputHidden, Honeypot, Submit } from '@/components/Form'

// utils
import { pages } from '@/utils/routes'

gsap.registerPlugin(ScrollTrigger)

// required step-1 fields gated before advancing (Telefone is optional)
const STEP_1_REQUIRED = ['Nome', 'Instituição', 'Cargo', 'Email', 'Localização']

function Steps() {

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
					<span className='font-semibold'>Etapa {step} de 2</span>
					<span className='opacity-60'>{step === 1 ? 'Identificação' : 'Sobre a tecnologia'}</span>
				</div>
				<div className='flex gap-2'>
					<span className='h-1 flex-1 rounded-full bg-green-dark' />
					<span className={clsx('h-1 flex-1 rounded-full transition-colors duration-300', step === 2 ? 'bg-green-dark' : 'bg-green-dark/15')} />
				</div>
			</div>

			<div key={step} className='fade-step-in'>

				{step === 1 ? (
					<div>

						<Input id='nome' label='Nome completo' name='Nome' type='text' placeholder='Seu nome' required />
						<Input id='instituicao' label='Instituição / Empresa' name='Instituição' type='text' placeholder='Universidade, centro de pesquisa ou empresa' required />
						<Input id='cargo' label='Cargo / Função' name='Cargo' type='text' placeholder='Ex.: pesquisador, professor, fundador' required />
						<Input id='email' label='E-mail de contato' name='Email' type='email' placeholder='seu@email.com' required />
						<Input id='telefone' label='Telefone' name='Telefone' type='tel' placeholder='Com DDD (opcional)' />
						<Input id='localizacao' label='País / Estado / Cidade' name='Localização' type='text' placeholder='Ex.: Brasil / SP / Campinas' required />

						<div className='mt-8'>
							<Button type='button' onClick={goNext} text='Continuar' icon='diagonal-arrow' style='dark' />
						</div>

					</div>
				) : (
					<div>

						<Textarea
							id='resumo'
							label='Resuma sua tecnologia em um parágrafo curto.'
							name='Resumo da tecnologia'
							microcopy='Em linguagem livre - o essencial do que ela é e faz.'
							placeholder='Descreva sua tecnologia'
							required
						/>

						<Textarea
							id='problema'
							label='Qual problema sua tecnologia resolve?'
							name='Problema que resolve'
							placeholder='Descreva o problema'
							required
						/>

						<Textarea
							id='limitacoes'
							label='Quais limitações ou desafios você enfrenta hoje com a tecnologia?'
							name='Limitações atuais'
							microcopy='Técnicos, regulatórios, de financiamento - o que estiver travando o avanço.'
							placeholder='Descreva as limitações'
							required
						/>

						<p className='text-sm text-green-dark/70 -mt-1 mb-4'>
							Não sabe em que estágio sua tecnologia está?{' '}
							<Link href={pages.trl} className='hover-underline font-semibold'>
								Conheça os níveis TRL
							</Link>
						</p>

						<Textarea
							id='diferenciais'
							label='O que torna sua tecnologia diferente do que já existe?'
							name='Diferenciais'
							placeholder='Descreva os diferenciais'
							required
						/>

						<FileUpload
							id='documento'
							label='Documento de apoio'
							name='Documento'
							microcopy='Pitch deck, artigo publicado ou resumo executivo. PDF, máximo 15 MB. Lembre-se: nada sigiloso nesta etapa.'
						/>

						<Checkbox
							type='checkbox'
							id='lgpd'
							label='Autorizo o tratamento dos meus dados'
							name='Consentimento LGPD'
							required
							className='mt-6'
						>
							<span>
								Autorizo a Aether a tratar os dados informados para avaliação desta inscrição, conforme a{' '}
								<Link href={pages.privacy} className='hover-underline font-semibold'>
									Política de Privacidade
								</Link>
								. {/* PLACEHOLDER - texto LGPD a alinhar com o cliente */}
							</span>
						</Checkbox>

						<div className='flex flex-wrap items-center gap-3 mt-8'>
							<Button type='button' onClick={() => setStep(1)} text='Voltar' style='dark-2' />
							<Submit text='Enviar inscrição' style='dark' />
						</div>

					</div>
				)}

			</div>

		</>
	)
}

export default function ProjectForm() {
	return (
		<Form
			endpoint='/api/resend'
			isFormData
			onSuccess={{
				title: 'Inscrição enviada com sucesso',
				text: 'Obrigado por compartilhar seu projeto. Nossa equipe científica fará a avaliação inicial e retornaremos o mais breve possível pelo e-mail informado.'
			}}
			onError={{
				title: 'Erro ao enviar inscrição',
				text: 'Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente. Se o problema persistir, escreva para contato@aethergp.com.br.'
			}}
		>

			<InputHidden name='form' value='inscricao' id='form' />
			<Honeypot />

			<Steps />

		</Form>
	)
}
