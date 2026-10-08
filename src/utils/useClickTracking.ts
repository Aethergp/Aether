'use client'

// libraries
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const useGTagTracking = () => {
	const pageUrl = usePathname()

	const gTagTracking = (eventCategory: string, eventLabel: string) => {
		const gtag = typeof window !== 'undefined'
			? (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
			: undefined

		if (gtag) {
			gtag('event', 'click', {
				event_category: `${eventCategory} | Located on: ${pageUrl}`,
				event_label: eventLabel,
			})
		}
	}

	return gTagTracking
}

const useClickTracking = () => {
	const gTagTracking = useGTagTracking()

	return (clickLocation: string, clickEvent: string, itemName?: string) => {
		const eventCategory = clsx(clickLocation)
		const eventLabel = clsx(clickEvent, itemName && ` ${itemName}`)
		gTagTracking(eventCategory, eventLabel)
	}
}

export default useClickTracking