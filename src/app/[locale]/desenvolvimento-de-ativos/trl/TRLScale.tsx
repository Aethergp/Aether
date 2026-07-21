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
		desc: 'Pesquisa científica de natureza exploratória, com identificação e observação dos princípios fundamentais relacionados à tecnologia. O conhecimento ainda se encontra em estágio inicial de investigação.',
		pharma: 'Identificação de alvos, mecanismos biológicos, classes moleculares ou princípios ativos candidatos; revisão de literatura e formulação das primeiras hipóteses científicas.'
	},
	{
		n: 2,
		phase: 0,
		name: 'Conceito tecnológico formulado',
		desc: 'Os princípios fundamentais começam a ser traduzidos em uma aplicação potencial. Hipóteses científicas e tecnológicas são formuladas e os primeiros caminhos para sua validação são definidos.',
		pharma: 'Definição do conceito terapêutico, seleção inicial de candidatos, proposição de mecanismo de ação e planejamento dos primeiros estudos de viabilidade.'
	},
	{
		n: 3,
		phase: 0,
		name: 'Prova de conceito experimental',
		desc: 'Evidências experimentais iniciais demonstram a viabilidade do conceito. A hipótese é testada em condições controladas e os primeiros resultados permitem avaliar o potencial da tecnologia.',
		pharma: 'Ensaios in vitro, estudos analíticos, caracterização inicial e geração de evidências preliminares de atividade, mecanismo ou viabilidade do ativo.'
	},
	{
		n: 4,
		phase: 1,
		name: 'Validação em ambiente de laboratório',
		desc: 'Os principais componentes da tecnologia são integrados e validados em ambiente controlado. A prova de conceito evolui para uma configuração mais robusta e reprodutível.',
		pharma: 'Caracterização ampliada do ativo, otimização inicial, desenvolvimento analítico, estudos de formulação ou processo e geração de evidências de eficácia em modelos experimentais apropriados.'
	},
	{
		n: 5,
		phase: 1,
		name: 'Validação em ambiente relevante',
		desc: 'A tecnologia é avaliada em condições que representam de forma mais consistente sua aplicação pretendida. A geração de evidências torna-se mais estruturada e orientada à redução de riscos para as etapas subsequentes.',
		pharma: 'Estudos pré-clínicos avançados, evolução de CMC, caracterização do processo e do produto, estudos de estabilidade e planejamento de estudos regulatórios, conforme a estratégia específica do ativo.'
	},
	{
		n: 6,
		phase: 1,
		name: 'Demonstração em ambiente relevante',
		desc: 'A tecnologia é demonstrada de forma integrada em condições relevantes, com evidências suficientes para sustentar decisões de desenvolvimento, transferência tecnológica e preparação para etapas subsequentes.',
		pharma: 'Processo de obtenção ou produção tecnicamente estabelecido em escala compatível com o estágio de desenvolvimento, caracterização do ativo, geração de evidências pré-clínicas e documentação técnica alinhada à estratégia de desenvolvimento, transferência e evolução regulatória.'
	},
	{
		n: 7,
		phase: 2,
		name: 'Demonstração em ambiente operacional',
		desc: 'A tecnologia alcança estágio avançado de desenvolvimento e passa a ser avaliada em condições de uso ou aplicação próximas ao ambiente operacional pretendido.',
		pharma: 'Início ou avanço do desenvolvimento clínico, quando aplicável, acompanhado pela evolução de CMC, produção, controle de qualidade e estratégia regulatória.'
	},
	{
		n: 8,
		phase: 2,
		name: 'Sistema completo e qualificado',
		desc: 'A tecnologia apresenta elevado grau de maturidade, com seus principais componentes qualificados e evidências robustas para sustentar as etapas finais de desenvolvimento e aprovação.',
		pharma: 'Desenvolvimento clínico avançado, consolidação do processo produtivo, qualificação industrial e preparação ou submissão do conjunto de evidências requerido para aprovação regulatória, conforme a modalidade terapêutica e a jurisdição aplicável.'
	},
	{
		n: 9,
		phase: 2,
		name: 'Sistema implantado em operação',
		desc: 'A tecnologia alcança maturidade operacional e sua aplicação é comprovada em ambiente real.',
		pharma: 'Medicamento ou tecnologia em utilização após as aprovações aplicáveis, com produção e operação estabelecidas e geração contínua de evidências de segurança, efetividade e desempenho em uso real.'
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
							<div className='flex items-center gap-4 mt-14 mb-6'>
								<span className='text-36 font-semibold font-heading! grow'>
									{phase.label}
								</span>
								<span className={clsx('text-sm font-semibold font-heading shrink-0', phase.tag)}>
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
										<div className='lg:pl-32'>

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
