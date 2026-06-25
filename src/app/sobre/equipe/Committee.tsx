'use client'

// libraries
import { useEffect, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'

// components
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

// svg
import UxClose from '@/assets/svg/ux/close.svg'

interface Member {
	name: string
	titulacao: string
	area: string
	instituicao: string
	bio: string
	photo: StaticImageData
}

interface Props {
	members: Member[]
}

export default function Committee({ members }: Props) {

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

		return () => window.removeEventListener('keydown', onKey)
	}, [selected])

	const member = selected !== null ? members[selected] : null

	return (
		<>

			<StaggerUp className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6'>
				{members.map((m, i) => (
					<div key={i}>
						<button
							type='button'
							onClick={() => setSelected(i)}
							className='group block w-full text-left cursor-pointer'
						>
							<div className='relative w-full aspect-square overflow-hidden rounded-sm lg:rounded-md bg-green-dark/10'>
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
							</div>

							<h4 className='text-20 font-heading font-semibold mt-4 text-green-dark/70'>
								{m.name}
							</h4>
							<p className='text-16 opacity-70 mt-1'>{m.area}</p>
						</button>
					</div>
				))}
			</StaggerUp>

			<div
				onClick={() => setSelected(null)}
				className={`fixed inset-0 z-99999 flex items-center justify-center p-4 transition-opacity duration-300 ${member ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
			>
				<div className='absolute inset-0 bg-black/80' />

				{member && (
					<div
						onClick={e => e.stopPropagation()}
						className='relative z-2 bg-white rounded-md w-180 max-w-full max-h-[88vh] overflow-y-auto'
					>
						<button
							type='button'
							onClick={() => setSelected(null)}
							aria-label='Fechar'
							className='absolute z-2 top-4 right-4 md:top-6 md:right-6 flex items-center justify-center w-5 h-5 cursor-pointer hover:rotate-180 transition-transform duration-300'
						>
							<UxClose className='w-full h-full' />
						</button>

						<div className='grid md:grid-cols-2'>

							<div className='relative aspect-square md:aspect-auto md:min-h-90'>
								<Image
									src={member.photo}
									alt={member.name}
									fill
									style={{ objectPosition: 'center 18%' }}
									className='cover'
									sizes='(max-width: 768px) 100vw, 50vw'
								/>
							</div>

							<div className='p-8 md:p-10'>

								<h3 className='text-30 font-heading font-semibold text-green-dark/70'>
									{member.name}
								</h3>

								<div className='flex flex-col gap-1 mt-4 text-16'>
									<span><span className='opacity-50'>Titulação:</span> {member.titulacao}</span>
									<span><span className='opacity-50'>Área:</span> {member.area}</span>
									<span><span className='opacity-50'>Instituição:</span> {member.instituicao}</span>
								</div>

								<p className='text-16 leading-relaxed mt-6 opacity-80'>
									{member.bio}
								</p>

							</div>

						</div>
					</div>
				)}
			</div>

		</>
	)
}
