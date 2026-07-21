/** @type {import('next-sitemap').IConfig} */

// asset routes Next emits from src/app (icons + manifest) - not pages, must stay out of the sitemap
const assetRoutes = ['/icon.svg', '/icon.png', '/apple-icon.png', '/favicon.ico', '/manifest.json']

// pages that should never be indexed
const noIndexRoutes = ['/404', '/500', '/home']

export default {
	siteUrl: process.env.SITE_URL || 'https://aethergp.com.br',
	generateRobotsTxt: true,
	exclude: [...assetRoutes, ...noIndexRoutes],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/'
			}
		]
	},
	transform: async (config, path) => {
		// priority/changefreq by depth: home > hubs > subpages > legal
		const priority =
			path === '/' ? 1.0 :
			['/sobre', '/desenvolvimento-de-ativos', '/midia', '/contato', '/inscreva-seu-projeto'].includes(path) ? 0.9 :
			['/politica-de-privacidade', '/termos-e-condicoes'].includes(path) ? 0.3 :
			0.7

		const changefreq =
			path === '/midia' || path.startsWith('/midia/') ? 'weekly' :
			priority <= 0.3 ? 'yearly' :
			'monthly'

		return {
			loc: path,
			changefreq,
			priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined
		}
	}
}
