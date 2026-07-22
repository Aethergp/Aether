'use client'

// libraries
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

// components
import Portal from '@/components/Utils/Portal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import Button from '@/components/Button'

// svg
import UxClose from '@/assets/svg/ux/close.svg'

interface Member {
	name: string
	titulacao?: string
	area?: string
	instituicao?: string
	bio: string
	photo: StaticImageData
	linked?: string
}

interface Props {
	members: Member[]
}

export default function Committee({ members }: Props) {

	const t = useTranslations('Committee')
	const [selected, setSelected] = useState<number | null>(null)

	useEffect(() => {
		const viewport = document.getElementById('viewport')
		if (!viewport) return

		if (selected !== null) {
			viewport.style.overflow = 'hidden'
			viewport.setAttribute('data-scroll-paused', 'true')
			document.body.classList.add('no-scroll')
		} else {
			viewport.style.overflow = ''
			viewport.removeAttribute('data-scroll-paused')
			document.body.classList.remove('no-scroll')
		}

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSelected(null)
		}
		window.addEventListener('keydown', onKey)

		return () => {
			window.removeEventListener('keydown', onKey)
			viewport.style.overflow = ''
			viewport.removeAttribute('data-scroll-paused')
			document.body.classList.remove('no-scroll')
		}
	}, [selected])

	const member = selected !== null ? members[selected] : null

	return (
		<>

			<StaggerUp className='grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'>
				{members.map((m, i) => (
					<div key={i}>
						<div className='group block w-full text-left'>
							<div className='relative w-full aspect-square overflow-hidden rounded-sm lg:rounded-md bg-green-dark/10'>

								{m.linked && (
									<div className='absolute z-2 bottom-4 left-4 lg:bottom-6 lg:left-6'>
										<Button
											style='light'
											href={m.linked}
											text={t('linkedinLabel')}
											icon='linkedin'
											target='_blank'
											rel='noopener noreferrer'
											aria-label={t('linkedinAriaLabel', { name: m.name })}
										/>
									</div>
								)}

								<button
									type='button'
									onClick={() => setSelected(i)}
									className='cursor-pointer'
								>

									<Image
										src={m.photo}
										alt={m.name}
										fill
										style={{ objectPosition: 'center 18%' }}
										className='cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105'
										loading='lazy'
										sizes='(max-width: 768px) 50vw, 33vw'
									/>

									<div className='absolute inset-0 bg-green-dark/10 transition-opacity duration-500 group-hover:opacity-0' />

								</button>

							</div>

							<button
								type='button'
								onClick={() => setSelected(i)}
								className='cursor-pointer block w-fit'
							>
								<h3 className='text-20 font-heading font-semibold mt-4'>
									{m.name}
								</h3>
							</button>

							{m.area && (
								<button
									type='button'
									onClick={() => setSelected(i)}
									className='cursor-pointer block w-fit'
								>
									<p className='text-16 opacity-70 mt-1'>
										{m.area}
									</p>
								</button>
							)}

						</div>
					</div>
				))}
			</StaggerUp>

			<Portal>
				<div
					onClick={() => setSelected(null)}
					className={`fixed inset-0 z-99999 flex items-center justify-center p-4 transition-opacity duration-300 ${member ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
				>
					<div className='absolute inset-0 bg-black/80' />

					{member && (
						<div
							onClick={e => e.stopPropagation()}
							className='relative z-2 bg-white rounded-md lg:rounded-lg w-[calc(100vw-2rem)] sm:w-[80vw] max-w-375 max-h-[calc(100svh-2rem)] sm:max-h-[88vh] overflow-y-auto overscroll-contain md:overflow-hidden grid md:grid-cols-2 md:h-[88vh]'
						>
							<button
								type='button'
								onClick={() => setSelected(null)}
								aria-label={t('closeAriaLabel')}
								className='absolute z-2 top-5 right-5 md:top-5 md:right-5 flex items-center justify-center w-4 h-4 cursor-pointer hover:rotate-180 transition-transform duration-300 max-md:text-white'
							>
								<UxClose className='w-full h-full' />
							</button>

							<div className='relative aspect-square md:aspect-auto md:h-full'>

								<Image
									src={member.photo}
									alt={member.name}
									fill
									style={{ objectPosition: 'center 18%' }}
									className='cover'
									sizes='(max-width: 768px) 80vw, 40vw'
								/>

								{member.linked && (
									<div className='absolute z-2 bottom-4 left-4 lg:bottom-6 lg:left-6'>
										<Button
											style='light'
											href={member.linked}
											text={t('linkedinLabel')}
											icon='linkedin'
											target='_blank'
											rel='noopener noreferrer'
											aria-label={t('linkedinAriaLabel', { name: member.name })}
										/>
									</div>
								)}
							</div>

							<div className='md:overflow-y-auto md:overscroll-contain md:h-full px-6 py-8 sm:p-10 md:p-14 lg:p-[4vw]'>

								<h3 className='text-3xl lg:text-4xl font-heading font-semibold text-green-dark/70 leading-[1.05]!'>
									{member.name}
								</h3>

								<div className='flex flex-col gap-2 mt-6 lg:mt-8 text-18'>
									{member.titulacao && <span><span className='opacity-50'>{t('titulacaoLabel')}</span> {member.titulacao}</span>}
									{member.area && <span><span className='opacity-50'>{t('areaLabel')}</span> {member.area}</span>}
									{member.instituicao && <span><span className='opacity-50'>{t('instituicaoLabel')}</span> {member.instituicao}</span>}
								</div>

								<p
									className='text-18 leading-relaxed mt-8 lg:mt-10 opacity-80 lg:pr-[2vw]'
									dangerouslySetInnerHTML={{ __html: member.bio }}
								/>

							</div>
						</div>
					)}
				</div>
			</Portal>

		</>
	)
}
