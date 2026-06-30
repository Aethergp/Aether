'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
	number: number
	decimals?: number
	className?: string
}

function inferDecimals(n: number) {
	const [, fraction = ''] = n.toString().split('.')
	return fraction.length
}

function formatBrazilianNumber(value: number | string, decimals: number) {
	return (+value).toLocaleString('pt-BR', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	})
}

export default function Counter({
	number,
	decimals,
	className
}: Props) {

	const fractionDigits = decimals ?? inferDecimals(number)
	const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		if (item.current) {
			gsap.set(item.current, {
				textContent: formatBrazilianNumber(0, fractionDigits)
			})

			gsap.to(item.current, {
				textContent: number,
				duration: 3,
				ease: 'power2.inOut',
				modifiers: {
					textContent: (value) => formatBrazilianNumber(value, fractionDigits)
				},
				scrollTrigger: {
					scroller: document.getElementById('viewport') as HTMLElement,
					trigger: item.current,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			})
		}
	}, { dependencies: [number, fractionDigits] })

	return (
		<span
			ref={item}
			className={className}
		>
			{formatBrazilianNumber(number, fractionDigits)}
		</span>
	)
}
