'use client'

// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// components
import Button from '@/components/Button'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// utils
import { useAnchorScroll } from '@/hooks/useAnchorScroll'

// svg
import Logo from '@/assets/svg/logo/aether-gp.svg'

export default function Menu() {

	const scrollTo = useAnchorScroll()

	return (
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
							<button className='flex flex-col items-center justify-center gap-[.3rem] px-4 py-4 lg:py-3 rounded-sm md:rounded-md bg-green-dark text-green-light cursor-pointer min-h-full group transition-all duration-200 hover:bg-black'>
								<span className='h-px bg-green-light block w-6 sm:w-7 transition-all duration-200 group-hover:translate-y-[.4rem]' data-line-top />
								<span className='h-px bg-green-light block w-6 sm:w-7 transition-all duration-200 group-hover:-translate-y-[.4rem]' data-line-bottom />
							</button>
						</MagneticButton>

					</div>

				</div>
			</div>
		</header>
	)
}