'use client'

// libraries
import { useState } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

gsap.registerPlugin(ScrollTrigger)

type Phase = {
	label: string
	range: string
	bar: string
	number: string
	tag: string
}

type Level = {
	n: number
	phase: number
	name: string
	desc: string
	pharma: string
}

const phases: Phase[] = [
	{
		label: 'Pesquisa e Descoberta',
		range: 'TRL 1-3',
		bar: 'bg-green-dark/25',
		number: 'text-green-dark/40',
		tag: 'text-green-dark/55'
	},
	{
		label: 'Desenvolvimento Pré-Clínico',
		range: 'TRL 4-6',
		bar: 'bg-green-dark/55',
		number: 'text-green-dark/70',
		tag: 'text-green-dark/55'
	},
	{
		label: 'Desenvolvimento Clínico e Operacional',
		range: 'TRL 7-9',
		bar: 'bg-green-dark',
		number: 'text-green-dark',
		tag: 'text-green-dark/55'
	}
]

const levels: Level[] = [
	{
		n: 1,
		phase: 0,
		name: 'Princípios básicos observados',
		desc: 'Pesquisa científica de natureza acadêmica, com identificação e observação dos princípios fundamentais. A tecnologia ainda é um conceito teórico ou hipótese científica em formação.',
		pharma: 'Identificação de alvo molecular, revisão de literatura, hipóteses sobre mecanismos de ação, seleção de ingredientes ativos candidatos.'
	},
	{
		n: 2,
		phase: 0,
		name: 'Conceito tecnológico formulado',
		desc: 'Os princípios básicos já foram estudados e uma aplicação prática é formulada, ainda sem prova experimental consolidada. A hipótese se traduz em um conceito técnico específico.',
		pharma: 'Definição da classe de compostos, proposição de formulação, desenho de estudos de viabilidade iniciais.'
	},
	{
		n: 3,
		phase: 0,
		name: 'Prova de conceito experimental',
		desc: 'Estudos analíticos e de laboratório confirmam a viabilidade da tecnologia. Um modelo de prova de conceito é construído e testado em condições controladas.',
		pharma: 'Triagem (screening) de moléculas, ensaios in vitro iniciais, validação analítica do princípio ativo.'
	},
	{
		n: 4,
		phase: 1,
		name: 'Validação em ambiente de laboratório',
		desc: 'Os componentes da tecnologia são validados de forma integrada em ambiente de bancada. A prova de conceito evolui para um sistema funcional em escala de laboratório.',
		pharma: 'Estudos in vivo iniciais em modelos animais, validação de formulação, primeiros ensaios de eficácia pré-clínica.'
	},
	{
		n: 5,
		phase: 1,
		name: 'Validação em ambiente relevante',
		desc: 'A tecnologia é validada em ambiente que se aproxima significativamente do real, com rigor regulatório crescente e documentação formal dos resultados.',
		pharma: 'Estudos pré-clínicos regulatórios - toxicologia, farmacocinética, farmacodinâmica - segundo padrões de Boas Práticas de Laboratório (BPL/GLP).'
	},
	{
		n: 6,
		phase: 1,
		name: 'Demonstração em ambiente relevante',
		desc: 'Um protótipo funcional é demonstrado em escala e condições próximas às da aplicação final. A tecnologia deixa a bancada e se prepara para o contato com o ambiente operacional.',
		pharma: 'Produção do lote clínico em escala piloto, submissão regulatória inicial (IND / dossiê de pesquisa clínica) junto à agência reguladora.'
	},
	{
		n: 7,
		phase: 2,
		name: 'Demonstração em ambiente operacional',
		desc: 'O sistema completo é testado em ambiente real. A tecnologia é submetida a condições operacionais finais, com ajustes incrementais baseados nos resultados.',
		pharma: 'Ensaios clínicos fase I e fase II - avaliação de segurança, farmacocinética em humanos e eficácia preliminar.'
	},
	{
		n: 8,
		phase: 2,
		name: 'Sistema completo e qualificado',
		desc: 'A tecnologia é qualificada formalmente por meio de testes e demonstrações. Todas as especificações são atendidas e o produto está pronto para registro e comercialização.',
		pharma: 'Ensaios clínicos fase III em larga escala, submissão para aprovação regulatória (registro), auditoria de fabricação e qualificação industrial.'
	},
	{
		n: 9,
		phase: 2,
		name: 'Sistema implantado em operação',
		desc: 'A tecnologia está em uso operacional comprovado, comercializada e monitorada em ambiente real. O ativo é mensurável em receita, impacto clínico e geração contínua de evidências.',
		pharma: 'Medicamento comercializado, fase IV (farmacovigilância pós-mercado), acompanhamento de eventos adversos e estudos de efetividade em uso real.'
	}
]

export default function TRLScale() {

	const [open, setOpen] = useState<number>(1)

	const toggle = (n: number) => {
		setOpen(prev => (prev === n ? 0 : n))
		// the expand/collapse changes page height - keep footer + stroke triggers accurate
		window.setTimeout(() => ScrollTrigger.refresh(), 550)
	}

	return (
		<StaggerUp className='flex flex-col gap-2 lg:gap-3'>
			{levels.map((level) => {
				const phase = phases[level.phase]
				const isOpen = open === level.n
				const isPhaseStart = level.n === 1 || levels[level.n - 2].phase !== level.phase

				return (
					<div key={level.n}>

						{isPhaseStart && (
							<div className='flex items-baseline gap-3 mt-8 lg:mt-12 mb-3 lg:mb-4 first:mt-0'>
								<span className={clsx('w-8 h-1 rounded-full shrink-0 translate-y-[-3px]', phase.bar)} />
								<span className='text-sm font-semibold font-heading uppercase tracking-wide'>
									{phase.label}
								</span>
								<span className={clsx('text-sm font-semibold font-heading', phase.tag)}>
									{phase.range}
								</span>
							</div>
						)}

						<div
							className={clsx(
								'relative overflow-hidden rounded-sm lg:rounded-md border transition-colors duration-300',
								isOpen ? 'border-green-dark/25 bg-green-pale/30' : 'border-green-dark/10 hover:border-green-dark/25'
							)}
						>

							<span className={clsx('absolute left-0 top-0 bottom-0 w-1', phase.bar)} />

							<button
								type='button'
								onClick={() => toggle(level.n)}
								aria-expanded={isOpen}
								className='w-full flex items-center gap-5 lg:gap-8 text-left pl-6 lg:pl-10 pr-6 lg:pr-8 py-6 lg:py-7 cursor-pointer'
							>

								<span className={clsx('text-5xl lg:text-7xl font-heading font-bold leading-none shrink-0 w-14 lg:w-24 tabular-nums', phase.number)}>
									{level.n}
								</span>

								<span className='grow'>
									<span className='block text-24 lg:text-30 font-heading font-semibold leading-tight'>
										{level.name}
									</span>
									<span className='block text-sm font-semibold opacity-50 mt-1'>
										TRL {level.n}
									</span>
								</span>

								<span
									className='relative shrink-0 w-10 h-10 rounded-xs bg-green-dark flex items-center justify-center'
									aria-hidden='true'
								>
									<span className='absolute w-3 h-px bg-green-light' />
									<span
										className={clsx(
											'absolute w-px h-3 bg-green-light transition-transform duration-300',
											isOpen ? 'scale-y-0' : 'scale-y-100'
										)}
									/>
								</span>

							</button>

							<div
								className={clsx(
									'grid transition-[grid-template-rows] duration-500 ease-out',
									isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
								)}
							>
								<div className='overflow-hidden'>
									<div className='pl-6 lg:pl-10 pr-6 lg:pr-8 pb-7 lg:pb-9 pt-0'>
										<div className='lg:pl-24'>

											<p className='text-18 lg:text-20 leading-relaxed max-w-3xl'>
												{level.desc}
											</p>

											<div className='mt-5 lg:mt-6 pt-5 lg:pt-6 border-t border-green-dark/10 max-w-3xl'>
												<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-2'>
													No contexto farmacêutico
												</span>
												<p className='text-16 lg:text-18 leading-relaxed opacity-80'>
													{level.pharma}
												</p>
											</div>

										</div>
									</div>
								</div>
							</div>

						</div>

					</div>
				)
			})}
		</StaggerUp>
	)
}
