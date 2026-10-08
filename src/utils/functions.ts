// libraries
import type { Locale } from 'next-intl'

// utils
import { getLocalizedPathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://aethergp.com.br'

// format the date and show only the year
export function getYear(year: string) {
    return new Date(year).toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric'
    })
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

// the other two locales as og:locale:alternate, so link previews know the
// page also exists in those languages
export function ogAlternateLocales(locale: string) {
    return routing.locales
        .filter((other) => other !== locale)
        .map(ogLocale)
}

// self-referencing canonical + hreflang alternates + absolute OG url for a given
// unprefixed path, resolved for the current locale - so a page's SEO metadata
// points at its own locale's URL instead of always the pt-BR one
export function localizedMetadata(path: string, locale: Locale) {
    const canonical = getLocalizedPathname(path, locale)

    const languages = Object.fromEntries(
        routing.locales.map((loc) => [loc, getLocalizedPathname(path, loc)])
    ) as Record<string, string>
    languages['x-default'] = languages[routing.defaultLocale]

    return {
        canonical,
        languages,
        url: `${SITE_URL}${canonical === '/' ? '' : canonical}`
    }
}