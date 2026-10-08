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

    useGSAP(() => {
        const el = item.current
        if (!el) return

        const scroller = document.getElementById('viewport') as HTMLElement
        const originalHtml = el.innerHTML
        const splits: SplitText[] = []
        let tween: gsap.core.Tween | null = null
        let observer: IntersectionObserver | null = null
        let cancelled = false

        const split = () => {
            const segments = originalHtml.split(/<br\s*\/?>/gi)

            // the split letters are hidden from assistive tech and a visually hidden
            // copy carries the text instead (an aria-label on a <span> is prohibited).
            // Added client-side only, so the server HTML still holds the text once.
            const plain = document.createElement('span')
            plain.innerHTML = segments.join(' ')

            // each segment gets a block span so <br> is preserved visually but
            // SplitText never sees it
            el.innerHTML = `<span class="sr-only">${plain.textContent ?? ''}</span>` + segments
                .map(seg => `<span class="br-line" aria-hidden="true">${seg}</span>`)
                .join('')

            const chars: Element[] = []
            el.querySelectorAll<HTMLElement>('.br-line').forEach(lineEl => {
                const s = new SplitText(lineEl, {
                    type: 'lines, words, chars',
                    linesClass: 'split-line',
                    aria: 'none'
                })
                splits.push(s)
                chars.push(...s.chars)
            })

            tween = gsap.from(chars, {
                scrollTrigger: {
                    scroller,
                    trigger: el,
                    toggleActions: infinite ? 'restart pause resume reverse' : 'play none none none',
                    start: 'top 85%'
                },
                duration: 0.25,
                ease: 'circ.out',
                y: '110%',
                stagger: 0.0025,
                onComplete: () => el.classList.add('completed'),
                onReverseComplete: () => el.classList.remove('completed')
            })
        }

        const init = async () => {
            // SplitText must not run against the fallback font. When the webfonts
            // are already loaded we skip the await so an above-the-fold split happens
            // synchronously inside the layout effect, before the next paint.
            if (document.fonts && document.fonts.status !== 'loaded') {
                await document.fonts.ready
            }
            if (cancelled) return

            // splitting builds a node per letter, so doing it for every instance on
            // mount made one long hydration task (1.7s of TBT on /sobre under mobile
            // throttling). Only text near the viewport splits now; the rest waits
            // until it scrolls within a quarter screen of the bottom edge. This is an
            // IntersectionObserver, not a ScrollTrigger: an extra trigger per instance
            // made ScrollTrigger's load refresh shift the sticky footer (CLS 0.08).
            if (el.getBoundingClientRect().top < window.innerHeight * 1.25) {
                split()
            } else {
                observer = new IntersectionObserver(([entry]) => {
                    if (!entry.isIntersecting) return
                    observer?.disconnect()
                    split()
                }, { root: scroller, rootMargin: '0px 0px 25% 0px' })
                observer.observe(el)
            }
        }

        init()

        return () => {
            cancelled = true
            observer?.disconnect()
            tween?.scrollTrigger?.kill()
            tween?.kill()
            splits.forEach(s => s.revert())
            el.classList.remove('completed')
            el.innerHTML = originalHtml
        }
    }, { scope: item })

    // the text is rendered server-side so it exists in the HTML for crawlers; the
    // effect above then replaces it with the split markup. Rendering an empty
    // span here (the previous behaviour) left every heading/paragraph that uses
    // this component blank in the SSR output.
    if (typeof text === 'string') {
        return (
            <span
                className='reveal-text'
                ref={item}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        )
    }

    return (
        <span
            className='reveal-text'
            ref={item}
        >
            {text}
        </span>
    )
}
