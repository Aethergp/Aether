'use client'

// libraries
import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

// interface
interface Props {
    children: React.ReactNode
    animateOnScroll?: boolean
    delay?: number
    blockColor?: string
    stagger?: number
    duration?: number
    className?: string
    // when set, the animation is tied to a pinned ScrollTrigger scrub
    // instead of playing freely on scroll
    scrub?: boolean | number
    // the section element to pin — required when scrub is enabled
    pinSection?: React.RefObject<HTMLElement | null>
}

export default function TextReveal({
    children,
    animateOnScroll = true,
    delay = 0,
    blockColor = 'var(--color-green-light)',
    stagger = 0.15,
    duration = 0.75,
    className,
    scrub,
    pinSection
}: Props) {

    const containerRef = useRef<HTMLDivElement>(null)
    const splitRefs = useRef<SplitText[]>([])
    const lines = useRef<HTMLElement[]>([])
    const blocks = useRef<HTMLElement[]>([])

    useGSAP(() => {
        if (!containerRef.current) return

        const initAnimation = async () => {
            // Wait for fonts to load before initializing SplitText
            if (typeof document !== 'undefined' && document.fonts) {
                await document.fonts.ready
            }

            if (!containerRef.current) return

            splitRefs.current = []
            lines.current = []
            blocks.current = []

            let elements = []

            if (containerRef.current.hasAttribute('data-copy-wrapper')) {
                elements = Array.from(containerRef.current.children)
            } else {
                elements = [containerRef.current]
            }

            elements.forEach((element) => {
                const split = SplitText.create(element, {
                    type: 'lines'
                })

                splitRefs.current.push(split)

                split.lines.forEach((line) => {
                    const wrapper = document.createElement('span')
                    wrapper.className = 'block-line-wrapper'
                    line.parentNode?.insertBefore(wrapper, line)
                    wrapper.appendChild(line)

                    const block = document.createElement('span')
                    block.className = 'block-revealer'
                    block.style.backgroundColor = blockColor
                    wrapper.appendChild(block)

                    lines.current.push(line as HTMLElement)
                    blocks.current.push(block)
                })

            })

            gsap.set(lines.current, {
                opacity: 0
            })

            gsap.set(blocks.current, {
                scaleX: 0,
                transformOrigin: 'left center'
            })

            const createBlockRevealAnimation = (block: HTMLElement, line: HTMLElement, i: number) => {
                const tl = gsap.timeline({
                    delay: delay + i * stagger,
                })

                tl.to(block, {
                    scaleX: 1,
                    duration: duration,
                    ease: 'power4.inOut'
                })

                tl.set(line, {
                    opacity: 1
                })

                tl.set(block, {
                    transformOrigin: 'right center'
                })

                tl.to(block, {
                    scaleX: 0,
                    duration: duration,
                    ease: 'power4.inOut'
                })

                return tl
            }

            const isScrub = scrub !== undefined && scrub !== false

            if (animateOnScroll) {
                if (isScrub) {
                    // build a master timeline with all line animations
                    // each sub-tl keeps its own delay so stagger is preserved
                    const masterTl = gsap.timeline()

                    blocks.current.forEach((block, i) => {
                        const tl = createBlockRevealAnimation(block, lines.current[i], i)
                        masterTl.add(tl, 0)
                    })

                    const triggerEl = pinSection?.current ?? containerRef.current

                    ScrollTrigger.create({
                        scroller: document.getElementById('viewport') as HTMLElement,
                        trigger: triggerEl,
                        animation: masterTl,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        pinType: 'fixed',
                        scrub: typeof scrub === 'number' ? scrub : 1.5,
                        start: 'top top',
                        end: () => `+=${window.innerHeight * 1.5}`,
                        // ensure this pin is processed FIRST during any refresh
                        // so its spacer is accounted for by all other ScrollTriggers
                        refreshPriority: 1
                    })

                    // wait for the DOM to settle with the pin spacer,
                    // then force all other ScrollTriggers to recalculate
                    requestAnimationFrame(() => {
                        ScrollTrigger.refresh(true)
                    })
                } else {
                    blocks.current.forEach((block, i) => {
                        const tl = createBlockRevealAnimation(block, lines.current[i], i)
                        tl.pause()

                        ScrollTrigger.create({
                            scroller: document.getElementById('viewport') as HTMLElement,
                            trigger: containerRef.current,
                            start: 'top 90%',
                            once: true,
                            onEnter: () => tl.play()
                        })
                    })
                }
            } else {
                blocks.current.forEach((block, i) => {
                    createBlockRevealAnimation(block, lines.current[i], i)
                })
            }
        }

        initAnimation()

        return () => {
            splitRefs.current.forEach((split) => split?.revert())

            const wrappers = containerRef.current?.querySelectorAll('.block-line-wrapper')

            wrappers?.forEach((wrapper) => {
                if (wrapper.parentNode && wrapper.firstChild) {
                    wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper)
                    wrapper.remove()
                }
            })
        }

    }, {
        scope: containerRef,
        dependencies: [animateOnScroll, delay, blockColor, stagger, duration, scrub]
    })

    return (
        <div
            ref={containerRef}
            data-copy-wrapper='true'
            className={className}
        >
            {children}
        </div>
    )
}
