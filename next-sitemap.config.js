import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next-sitemap').IConfig} */

// asset routes Next emits from src/app (icons + manifest) - not pages, must stay out of the sitemap
const assetRoutes = ['/icon.svg', '/icon.png', '/apple-icon.png', '/favicon.ico', '/manifest.json']

// pages that should never be indexed
const noIndexRoutes = ['/404', '/500', '/home']

// next-sitemap's default route discovery scans .next/server/app for page files, but it
// can't resolve the [locale] dynamic segment or generateStaticParams, so it silently
// produces zero URLs for this app. The static route list + pathname translations below
// are duplicated from src/utils/routes.js and src/i18n/routing.ts (not importable here
// as plain Node ESM without transpilation) - keep both in sync when routes/locales/
// translated slugs change.
const STATIC_ROUTES = [
	'/',
	'/sobre',
	'/sobre/aether-global-pharma',
	'/sobre/ict-aether-bio',
	'/sobre/equipe',
	'/desenvolvimento-de-ativos',
	'/desenvolvimento-de-ativos/trl',
	'/desenvolvimento-de-ativos/pipeline',
	'/midia',
	'/parceiros',
	'/inscreva-seu-projeto',
	'/contato',
	'/politica-de-privacidade',
	'/termos-e-condicoes'
]

// mirrors src/i18n/routing.ts's localePrefix config ('as-needed', pt-BR default with no
// prefix, en-US customized to /en-us, es falls back to its own locale code)
const LOCALE_PREFIXES = {
	'pt-BR': '',
	'en-US': '/en-us',
	es: '/es'
}

// mirrors src/i18n/routing.ts's `pathnames` map - the pt-BR key is the canonical route
// used in STATIC_ROUTES above; each locale's translated URL segment lives here
const PATHNAMES = {
	'/sobre': { 'en-US': '/about', es: '/nosotros' },
	'/sobre/aether-global-pharma': { 'en-US': '/about/aether-global-pharma', es: '/nosotros/aether-global-pharma' },
	'/sobre/ict-aether-bio': { 'en-US': '/about/ict-aether-bio', es: '/nosotros/ict-aether-bio' },
	'/sobre/equipe': { 'en-US': '/about/team', es: '/nosotros/equipo' },
	'/desenvolvimento-de-ativos': { 'en-US': '/asset-development', es: '/desarrollo-de-activos' },
	'/desenvolvimento-de-ativos/trl': { 'en-US': '/asset-development/trl', es: '/desarrollo-de-activos/trl' },
	'/desenvolvimento-de-ativos/pipeline': { 'en-US': '/asset-development/pipeline', es: '/desarrollo-de-activos/pipeline' },
	'/midia': { 'en-US': '/media', es: '/medios' },
	'/midia/[slug]': { 'en-US': '/media/[slug]', es: '/medios/[slug]' },
	'/parceiros': { 'en-US': '/partners', es: '/socios' },
	'/inscreva-seu-projeto': { 'en-US': '/submit-your-project', es: '/inscriba-su-proyecto' },
	'/contato': { 'en-US': '/contact', es: '/contacto' },
	'/politica-de-privacidade': { 'en-US': '/privacy-policy', es: '/politica-de-privacidad' },
	'/termos-e-condicoes': { 'en-US': '/terms-and-conditions', es: '/terminos-y-condiciones' }
}

function translatePath(route, locale) {
	if (route === '/' || locale === 'pt-BR') return route
	return PATHNAMES[route]?.[locale] ?? route
}

function getBlogSlugs() {
	const raw = JSON.parse(readFileSync(path.join(__dirname, 'src/app/[locale]/midia/db/posts.json'), 'utf8'))
	return raw.filter((post) => post.type === 'blog' && post.slug).map((post) => post.slug)
}

function priorityFor(route) {
	if (route === '/') return 1.0
	if (['/sobre', '/desenvolvimento-de-ativos', '/midia', '/contato', '/inscreva-seu-projeto'].includes(route)) return 0.9
	if (['/politica-de-privacidade', '/termos-e-condicoes'].includes(route)) return 0.3
	return 0.7
}

function changefreqFor(route, priority) {
	if (route === '/midia' || route.startsWith('/midia/')) return 'weekly'
	if (priority <= 0.3) return 'yearly'
	return 'monthly'
}

function buildPaths() {
	const blogSlugs = getBlogSlugs()
	const lastmod = new Date().toISOString()

	return Object.entries(LOCALE_PREFIXES).flatMap(([locale, prefix]) => {
		const staticEntries = STATIC_ROUTES.map((route) => {
			const translated = translatePath(route, locale)
			const priority = priorityFor(route)

			return {
				loc: `${prefix}${translated === '/' ? '' : translated}` || '/',
				changefreq: changefreqFor(route, priority),
				priority,
				lastmod
			}
		})

		const blogEntries = blogSlugs.map((slug) => {
			const translatedBase = translatePath('/midia/[slug]', locale).replace('[slug]', slug)
			const priority = priorityFor('/midia')

			return {
				loc: `${prefix}${translatedBase}`,
				changefreq: changefreqFor('/midia', priority),
				priority,
				lastmod
			}
		})

		return [...staticEntries, ...blogEntries]
	})
}

export default {
	siteUrl: process.env.SITE_URL || 'https://aethergp.com.br',
	generateRobotsTxt: true,
	exclude: ['/*'],
	additionalPaths: async () => buildPaths(),
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/'
			}
		]
	}
}
