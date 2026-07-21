// libraries
import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

// utils
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const LOCALE_COOKIE = 'NEXT_LOCALE'
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

// path prefixes must mirror routing.ts localePrefix.prefixes
const LOCALE_PATH_PREFIXES: Record<(typeof routing.locales)[number], string> = {
	'pt-BR': '',
	'en-US': '/en-us',
	es: '/es'
}

const SPANISH_SPEAKING_COUNTRIES = new Set([
	'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY',
	'CR', 'PA', 'DO', 'HN', 'SV', 'GT', 'NI', 'CU', 'PR'
])

// null means "no geo signal at all" (x-vercel-ip-country is only ever set on
// Vercel's edge network - it's always absent in local dev, and would also be
// absent on a non-Vercel host), as opposed to a known country that just isn't
// BR or Spanish-speaking, which still gets a definite en-US
function detectLocaleFromCountry(country: string | null): (typeof routing.locales)[number] | null {
	if (country === 'BR') return 'pt-BR'
	if (country && SPANISH_SPEAKING_COUNTRIES.has(country)) return 'es'
	if (country) return 'en-US'

	return null
}

export default function middleware(request: NextRequest) {
	const hasLocaleCookie = request.cookies.has(LOCALE_COOKIE)

	if (!hasLocaleCookie) {
		const country = request.headers.get('x-vercel-ip-country')
		const detectedLocale = detectLocaleFromCountry(country)

		if (detectedLocale) {
			const response = detectedLocale === routing.defaultLocale
				? intlMiddleware(request)
				: NextResponse.redirect(
					new URL(
						`${LOCALE_PATH_PREFIXES[detectedLocale]}${request.nextUrl.pathname}${request.nextUrl.search}`,
						request.url
					)
				)

			response.cookies.set(LOCALE_COOKIE, detectedLocale, {
				path: '/',
				maxAge: LOCALE_COOKIE_MAX_AGE
			})

			return response
		}

		// no geo signal - defer to next-intl's own Accept-Language negotiation
		// (it sets its own NEXT_LOCALE cookie once it picks a locale)
	}

	return intlMiddleware(request)
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
