// libraries
import type { Locale } from 'next-intl'

// utils
import { getPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://aethergp.com.br'

// format date in US format (MM/DD/YYYY)
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '.')
}

// format the date and only get the day showing always 2 digits
export function getDay(day: string) {
    return new Date(day).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        day: '2-digit'
    })
}

// format the date and show only the written month
export function getMonth(month: string) {
    return new Date(month).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        month: 'long'
    })
}

// format the date and show only the year
export function getYear(year: string) {
    return new Date(year).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric'
    })
}

// phone
export function phone(str: string) {
	return (
		'tel:' + str.replace(/[^0-9]/g, '')
	)
}

// email
export function email(str: string) {
	return (
		'mailto:' + str
	)
}

// limit characters
export function limitCharacters(
    text: string,
    limit: number
) {
    if (text.length <= limit) {
        return text
    } else {
        return text.slice(0, limit) + '...'
    }
}

// slugify
export function slugify(str: string) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}

// get all focusable elements inside the container
export const getFocusableElements = (container: HTMLElement) => {
    return container.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
}

// get all focusable elements outside the container
export const getFocusableElementsOutside = (container: HTMLElement) => {
    const allFocusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )

    // filter out elements that are inside the container
    return Array.from(allFocusableElements).filter(
        (element) => !container?.contains(element)
    )
}

// first char
export function firstChar(str: string) {
    return str.charAt(0) || ''
}

// next-intl Locale -> og:locale (openGraph.locale) format
export function ogLocale(locale: string) {
    const map: Record<string, string> = {
        'pt-BR': 'pt_BR',
        'en-US': 'en_US',
        es: 'es_ES'
    }

    return map[locale] ?? 'pt_BR'
}

// self-referencing canonical + hreflang alternates + absolute OG url for a given
// unprefixed path, resolved for the current locale - so a page's SEO metadata
// points at its own locale's URL instead of always the pt-BR one
export function localizedMetadata(path: string, locale: Locale) {
    const canonical = getPathname({ href: path, locale })

    const languages = Object.fromEntries(
        routing.locales.map((loc) => [loc, getPathname({ href: path, locale: loc })])
    ) as Record<string, string>
    languages['x-default'] = languages[routing.defaultLocale]

    return {
        canonical,
        languages,
        url: `${SITE_URL}${canonical === '/' ? '' : canonical}`
    }
}