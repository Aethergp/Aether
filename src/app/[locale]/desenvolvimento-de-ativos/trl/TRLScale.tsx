'use client'

// libraries
import { useState } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
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

// visual styling classes stay in code, keyed by index; copy comes from TRLPage.scale
const phaseStyles = [
	{ bar: 'bg-green-dark/25', number: 'text-green-dark/40', tag: 'text-green-dark/55' },
	{ bar: 'bg-green-dark/55', number: 'text-green-dark/70', tag: 'text-green-dark/55' },
	{ bar: 'bg-green-dark', number: 'text-green-dark', tag: 'text-green-dark/55' }
]

// each level's phase index (0, 1, or 2) mirrors the 9-level -> 3-phase grouping (TRL 1-3, 4-6, 7-9)
const levelPhases = [0, 0, 0, 1, 1, 1, 2, 2, 2]

export default function TRLScale() {

	const t = useTranslations('TRLPage')
	const phases: Phase[] = (t.raw('scale.phases') as { label: string, range: string }[])
		.map((item, i) => ({ ...item, ...phaseStyles[i] }))
	const levels: Level[] = (t.raw('scale.levels') as { name: string, desc: string, pharma: string }[])
		.map((item, i) => ({ ...item, n: i + 1, phase: levelPhases[i] }))
	const pharmaContextLabel = t('scale.pharmaContextLabel')

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
													{pharmaContextLabel}
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
