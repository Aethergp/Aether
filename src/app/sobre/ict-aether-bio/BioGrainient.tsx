'use client'

// libraries
import { useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// components
import Grainient from '@/components/Grainient'

// top of the field = more green; bottom = more blue + terracotta, a touch less green
const START: [string, string, string] = ['#555328', '#323F70', '#DDB295']
const END: [string, string, string] = ['#2f3a68', '#6B1C2A', '#9a8b52']

const hexToRgb = (h: string): [number, number, number] => [
	parseInt(h.slice(1, 3), 16),
	parseInt(h.slice(3, 5), 16),
	parseInt(h.slice(5, 7), 16)
]

const lerpHex = (a: string, b: string, t: number) => {
	const A = hexToRgb(a)
	const B = hexToRgb(b)
	return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('')
}

export default function BioGrainient() {

	const [colors, setColors] = useState<[string, string, string]>([START[0], START[1], START[2]])

	useGSAP(() => {
		const scroller = document.getElementById('viewport') as HTMLElement
		const trigger = document.getElementById('bio-field')
		if (!trigger) return

		const st = ScrollTrigger.create({
			scroller,
			trigger,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
			refreshPriority: -1,
			onUpdate: self => {
				const p = self.progress
				setColors([
					lerpHex(START[0], END[0], p),
					lerpHex(START[1], END[1], p),
					lerpHex(START[2], END[2], p)
				])
			}
		})

		return () => st.kill()
	})

	// the clip-path lives HERE (background-only layer), not on the parent section, so the
	// fixed Grainient is scoped to the section while the pinned circles - a clip-path-free
	// sibling - can still use pinType:'fixed' (no jitter). See NOTES.
	return (
		<div className='absolute inset-0 z-0' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

			<div className='fixed inset-0 w-lvw h-lvh'>
				<Grainient
					className='w-full h-full'
					color1={colors[0]}
					color2={colors[1]}
					color3={colors[2]}
					timeSpeed={0.8}
					colorBalance={0}
					warpStrength={1}
					warpFrequency={11}
					warpSpeed={3}
					warpAmplitude={44}
					blendAngle={38}
					blendSoftness={0.6}
					rotationAmount={260}
					noiseScale={2.2}
					grainAmount={0.06}
					grainScale={0.7}
					grainAnimated={false}
					contrast={1.35}
					gamma={1}
					saturation={1.1}
					centerX={-0.15}
					centerY={0.4}
					zoom={0.7}
				/>
			</div>

			<div className='absolute inset-0 bg-black/25' />

		</div>
	)
}
