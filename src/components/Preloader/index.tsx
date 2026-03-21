'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function Preloader() {

	return (
		<aside
            className='fixed z-9999'
            data-preloader
        >

		</aside>
	)
}