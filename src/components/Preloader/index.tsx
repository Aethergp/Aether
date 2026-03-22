'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Preloader() {

	const tl = gsap.timeline()

	useGSAP(() => {
		tl.to('[data-preloader] svg', {
			opacity: 1,
			marginLeft: '0',
			rotate: 180,
			duration: 2,
			ease: 'power2.inOut',
			delay: .5
		})

		tl.call(() => {
			setTimeout(() => {
				dispatchEvent(new Event('init'))
			}, 500)
		})

		tl.to('[data-preloader] svg', {
			opacity: 0,
			marginLeft: '40rem',
			rotate: 360,
			duration: 2,
			ease: 'power2.inOut'
		})

		tl.to('[data-preloader]', {
			clipPath: 'inset(0 0 100% 0)',
			duration: 1,
			ease: 'power2.inOut',
			onComplete: () => {
				gsap.to('[data-preloader]', {
					autoAlpha: 0
				})
			}
		}, '=-1.5')
	})

	return (
		<aside
            className='fixed z-999999 inset-0 bg-green-light flex items-center justify-center'
            data-preloader
        >
			<svg
				width="50"
				height="50"
				viewBox="0 0 50 50"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className='w-20 h-20 opacity-0 -ml-100'
			>
				<path d="M0.286797 37.3525C4.02363 35.3433 11.633 30.5699 11.633 24.9988C11.633 19.4278 4.02363 14.6544 0.286797 12.6451C-0.208279 12.3796 -0.0192947 11.6306 0.54303 11.6306H11.633V0.541869C11.633 -0.019294 12.3819 -0.20944 12.6475 0.285635C14.6556 4.02247 19.4301 11.6318 25.0012 11.6318C30.5722 11.6318 35.3456 4.02247 37.3549 0.285635C37.6204 -0.20944 38.3694 -0.0204534 38.3694 0.541869V11.6318H49.4581C50.0205 11.6318 50.2094 12.3808 49.7144 12.6463C45.9775 14.6544 38.3682 19.4289 38.3682 25C38.3682 30.5711 45.9775 35.3444 49.7144 37.3537C50.2094 37.6192 50.0205 38.3682 49.4581 38.3682H38.3682V49.4581C38.3682 50.0193 37.6192 50.2094 37.3537 49.7144C35.3444 45.9775 30.5711 38.3682 25 38.3682C19.4289 38.3682 14.6556 45.9775 12.6463 49.7144C12.3796 50.2094 11.6318 50.0205 11.6318 49.4581V38.3682H0.54187C-0.0204506 38.3682 -0.209438 37.6192 0.285637 37.3537L0.286797 37.3525ZM25.0012 36.8238C31.5322 36.8238 36.8262 31.5299 36.8262 24.9988C36.8262 18.4678 31.5322 13.1738 25.0012 13.1738C18.4701 13.1738 13.1762 18.4678 13.1762 24.9988C13.1762 31.5299 18.4701 36.8238 25.0012 36.8238Z" fill="#565522" />
			</svg>
		</aside>
	)
}