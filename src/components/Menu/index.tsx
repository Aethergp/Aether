'use client'

// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

// components
import Button from '@/components/Button'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LocaleSwitcher from '@/components/LocaleSwitcher'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'
import { useIsNotFound } from '@/components/Utils/NotFoundContext'
import { navLinks, headerLinks, pages } from '@/utils/routes'
import { usePathname } from '@/i18n/navigation'

// svg
import Logo from '@/assets/svg/logo/aether-gp.svg'
import UxClose from '@/assets/svg/ux/close.svg'
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

export default function Menu() {

	const t = useTranslations('Nav')
	const scrollTo = useAnchorScroll()

	// light logo over the dark home hero, dark logo over light pages
	const pathname = usePathname()
	const isNotFound = useIsNotFound()
	const darkHeader = pathname === '/' || pathname === pages.parceiros || pathname === pages.sobre || pathname === pages.sobreAgp || pathname === pages.sobreIct || pathname === '/404' || isNotFound

	// fs menu
	const [isOpen, setIsOpen] = useState(false)

	// fs menu accordions (which parent items are expanded)
	const [openAccordions, setOpenAccordions] = useState<number[]>([])
	const toggleAccordion = (i: number) =>
		setOpenAccordions(prev => prev.includes(i) ? prev.filter(n => n !== i) : [...prev, i])

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
								<Logo className={clsx(
									'w-full h-auto',
									darkHeader ? '[&_path]:fill-green-light!' : '[&_path]:fill-green-dark!'
								)} />
							</Link>
						</MagneticButton>

						<div className='flex items-stretch justify-end gap-1'>

							<ul className='flex items-center justify-end gap-1 max-xl:hidden'>
								{headerLinks.map((item, i) => (
									<li key={i} className='relative group'>
										<Button
											href={item.href}
											text={t(item.label)}
											style='dark'
											chevron={!!item.children}
											onClick={item.href.startsWith('/') ? undefined : (e) => scrollTo(e, item.href)}
										/>

										{item.children && (
											<div className='absolute top-full right-0 pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-10'>
												<ul className='flex flex-col gap-1 bg-green-pale rounded-md p-2 min-w-60'>
													{item.children.map((child, j) => (
														<li key={j}>
															<Link
																href={child.href}
																className='block px-4 py-2.5 rounded-sm text-green-dark whitespace-nowrap transition-colors duration-200 hover:bg-green-dark hover:text-green-light'
															>
																{t(child.label)}
															</Link>
														</li>
													))}
												</ul>
											</div>
										)}
									</li>
								))}
							</ul>

							<LocaleSwitcher className='max-sm:hidden' />

							<MagneticButton>
								<button
									className='flex flex-col items-center justify-center gap-[.3rem] px-4 py-4 xl:py-3 rounded-sm md:rounded-md bg-green-dark text-green-light cursor-pointer min-h-full group transition-all duration-200 hover:bg-black'
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
				'fixed z-97 top-0 right-0 w-180 max-w-full h-full bg-green-dark translate-x-[120%] transition-transform duration-300 ease-in-out flex flex-col',
				isOpen && 'translate-x-0!'
			)} />

			<aside className={clsx(
				'fixed z-98 top-0 right-0 w-180 max-w-full h-full bg-green-pale translate-x-[120%] transition-transform duration-400 ease-in-out flex flex-col',
				isOpen && 'translate-x-0!'
			)} />

			<aside className={clsx(
				'fixed z-99 top-0 right-0 w-180 max-w-full h-full bg-green-light translate-x-[120%] transition-transform duration-500 ease-in-out flex flex-col',
				isOpen && 'translate-x-0!'
			)}>

				<div className='flex items-center justify-between gap-4 p-6 sm:p-10 shrink-0'>

					<Link
						href='/'
						className='w-60 md:w-70 flex'
						onClick={() => setIsOpen(false)}
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

				<div className='px-6 sm:px-10 pb-6 sm:pb-10 shrink-0 sm:hidden'>
					<LocaleSwitcher variant='inline' />
				</div>

				<ul className='flex flex-col gap-1 p-6 sm:p-10 pt-0 sm:pt-0 flex-1 overflow-y-auto'>
					{navLinks.map((item, i) => {
						const open = openAccordions.includes(i)

						return (
							<li
								key={i}
								className={clsx(
									'bg-green-dark/[0.07] px-4 rounded-sm transition-all duration-300 ease-in-out translate-x-30 opacity-0',
									isOpen && 'translate-x-0! opacity-100!'
								)}
								style={{
									transitionDelay: `${i * 50 + 150}ms`
				
								}}
							>
								<div className='flex items-center justify-between gap-4'>
									<Link
										href={item.href}
										onClick={(e) => {
											if (item.href.startsWith('#')) {
												scrollTo(e, item.href)
											} else if (item.home && pathname === pages.home) {
												scrollTo(e, '#banner')
											}
											setIsOpen(false)
										}}
										className='text-30 font-heading font-semibold transition-all duration-200 hover:translate-x-2 block w-full py-4'
									>
										{t(item.label)}
									</Link>

									{item.children && (
										<button
											type='button'
											onClick={() => toggleAccordion(i)}
											aria-expanded={open}
											aria-label={t(open ? 'recolher' : 'expandir', { label: t(item.label) })}
											className='shrink-0 relative w-10 h-10 rounded-xs bg-green-dark text-green-light flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-black'
										>
											<span className='absolute w-3 h-px rounded-full bg-current' />
											<span className={clsx(
												'absolute h-3 w-px rounded-full bg-current transition-transform duration-300',
												open && 'scale-y-0'
											)} />
										</button>
									)}
								</div>

								{item.children && (
									<div className={clsx(
										'grid transition-all duration-300 ease-in-out',
										open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
									)}>
										<ul className='flex flex-col gap-2 overflow-hidden [&>li:last-child]:pb-4'>
					
											{item.children.map((child, j) => (
												<li key={j}>
													<Link
														href={child.href}
														onClick={() => setIsOpen(false)}
														className='group/sub flex items-center justify-between gap-4 bg-green-dark/[0.07] rounded-md px-5 py-3.5 text-18 font-heading font-medium text-green-dark transition-colors duration-200 hover:bg-green-dark hover:text-green-light'
													>
														{t(child.label)}
														<UxArrowRight className='w-3 h-3 shrink-0 opacity-70 transition-transform duration-200 group-hover/sub:translate-x-1' />
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</li>
						)
					})}
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
