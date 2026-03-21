'use client'

// libraries
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface Props {
    text: React.ReactNode
    infinite?: boolean
}

export default function AnimatedText({
    text,
    infinite = false
}: Props) {

    const item = useRef<HTMLSpanElement>(null)
    const animRef = useRef<gsap.core.Tween | null>(null)
    const splitsRef = useRef<SplitText[]>([])

    useGSAP(() => {
        if (!item.current) return

        const initAnimation = async () => {
            if (animRef.current) {
                animRef.current.progress(1).kill()
            }
            splitsRef.current.forEach(s => s.revert())
            splitsRef.current = []

            // Wait for fonts to load before initializing SplitText
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready
            }

            if (!item.current) return

            const html = typeof text === 'string' ? text : ''
            const segments = html.split(/<br\s*\/?>/gi)

            // Rebuild innerHTML: each segment wrapped in a block span
            // so <br> is preserved visually but SplitText never sees it
            item.current.innerHTML = segments
                .map(seg => `<span class="br-line">${seg}</span>`)
                .join('')

            // Run SplitText on each segment separately, collect all chars
            const allChars: Element[] = []

            item.current.querySelectorAll<HTMLElement>('.br-line').forEach(lineEl => {
                const split = new SplitText(lineEl, {
                    type: 'lines, words, chars',
                    linesClass: 'split-line'
                })
                splitsRef.current.push(split)
                allChars.push(...split.chars)
            })

            if (!item.current) return

            animRef.current = gsap.from(allChars, {
                scrollTrigger: {
                    scroller: document.getElementById('viewport') as HTMLElement,
                    trigger: item.current,
                    toggleActions: infinite ? 'restart pause resume reverse' : 'play none none none',
                    start: 'top 85%'
                },
                duration: 0.5,
                ease: 'circ.out',
                y: '110%',
                stagger: 0.0075,
                onComplete: () => {
                    if (item.current) {
                        item.current.classList.add('completed')
                    }
                },
                onReverseComplete: () => {
                    if (item.current) {
                        item.current.classList.remove('completed')
                    }
                }
            })
        }

        initAnimation()

        return () => {
            if (animRef.current) {
                animRef.current.kill()
            }
            splitsRef.current.forEach(s => s.revert())
            splitsRef.current = []
            if (item.current) {
                item.current.classList.remove('completed')
            }
        }
    }, { scope: item })

    return (
        <span
            className='reveal-text'
            ref={item}
        />
    )
}
