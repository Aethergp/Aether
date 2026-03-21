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

export default function Menu() {
	return (
		<header>
			<div className='base-container'>
				
			</div>
		</header>
	)
}