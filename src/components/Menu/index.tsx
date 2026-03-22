'use client'

// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import { useEffect, useState } from 'react'

// components
import Button from '@/components/Button'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

// svg
import Logo from '@/assets/svg/logo/aether-gp.svg'
import UxClose from '@/assets/svg/ux/close.svg'

export default function Menu() {

	const scrollTo = useAnchorScroll()

	// fs menu
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const viewport = document.getElementById('viewport')
		if (!viewport) return

		if (isOpen) {
			viewport.style.overflow = 'hidden'
			viewport.setAttribute('data-scroll-paused', '')
		} else {
			viewport.style.overflow = ''
			viewport.removeAttribute('data-scroll-paused')
		}

		return () => {
			viewport.style.overflow = ''
			viewport.removeAttribute('data-scroll-paused')
		}
	}, [isOpen])

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false)
			}
		}

		window.addEventListener('keydown', handleEscape)

		return () => {
			window.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<>
			<header className='absolute z-5 top-0 left-0 w-full pt-4 sm:pt-6 lg:pt-10'>
				<div className='base-container'>
					<div className='flex items-center justify-between gap-4'>

						<MagneticButton>
							<Link
								href='/'
								className='w-60 sm:w-70 lg:w-80 xl:w-90 flex'
							>
								<Logo className='w-full h-auto [&_path]:fill-green-light!' />
							</Link>
						</MagneticButton>

						<div className='flex items-stretch justify-end gap-1'>

							<ul className='flex items-center justify-end gap-1 max-lg:hidden'>
								{[
									{
										href: '#contexto',
										label: 'Contexto'
									},
									{
										href: '#sobre',
										label: 'Sobre'
									},
									{
										href: '#parceiros',
										label: 'Parceiros'
									},
									{
										href: '#contato',
										label: 'Contato'
									}
								].map((item ,i) => (
									<li key={i}>
										<Button
											href={item.href}
											text={item.label}
											style='dark'
											onClick={(e) => scrollTo(e, item.href)}
										/>
									</li>
								))}
							</ul>

							<MagneticButton>
								<button
									className='flex flex-col items-center justify-center gap-[.3rem] px-4 py-4 lg:py-3 rounded-sm md:rounded-md bg-green-dark text-green-light cursor-pointer min-h-full group transition-all duration-200 hover:bg-black'
									onClick={() => setIsOpen(true)}
								>
									<span className='h-px bg-green-light block w-6 sm:w-7 transition-all duration-200 group-hover:translate-y-[.4rem]' data-line-top />
									<span className='h-px bg-green-light block w-6 sm:w-7 transition-all duration-200 group-hover:-translate-y-[.4rem]' data-line-bottom />
								</button>
							</MagneticButton>

						</div>

					</div>
				</div>
			</header>

			<aside className={clsx(
				'fixed z-99 top-0 right-0 w-180 max-w-full h-full bg-green-light translate-x-[120%] transition-transform duration-500 ease-in-out',
				isOpen && 'translate-x-0!'
			)}>

				<div className='flex items-center justify-between gap-4 p-6 sm:p-10'>

					<Link
						href='/'
						className='w-60 md:w-70 flex'
						onClick={(e) => (
							setIsOpen(false),
							scrollTo(e, '#banner')
						)}
					>
						<Logo className='w-full h-auto' />
					</Link>

					<button
						className='bg-green-dark text-green-light sm:rounded-sm w-12 h-9 flex items-center justify-center cursor-pointer hover:bg-black'
						onClick={() => setIsOpen(false)}
					>
						<UxClose className='w-2 h-2' />
					</button>

				</div>

				<ul className='flex flex-col gap-4 p-6 sm:p-10'>
					{[
						{
							href: '#banner',
							label: 'Início'
						},
						{
							href: '#contexto',
							label: 'Contexto'
						},
						{
							href: '#sobre',
							label: 'Sobre'
						},
						{
							href: '#parceiros',
							label: 'Parceiros'
						},
						{
							href: '#contato',
							label: 'Contato'
						}
					].map((item ,i) => (
						<li key={i}>
							<Link
								href={item.href}
								onClick={(e) => (
									scrollTo(e, item.href),
									setIsOpen(false)
								)}
								className='text-60 font-heading font-semibold transition-all duration-200 hover:translate-x-2 block w-fit'
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>

			</aside>

			<aside
				onClick={() => setIsOpen(false)}
				data-fs-overlay
				className={clsx(
					'fixed z-97 inset-0 bg-black/90 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out',
					isOpen && 'opacity-100 pointer-events-auto!'
				)}
			/>

		</>
	)
}