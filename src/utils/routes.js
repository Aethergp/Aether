// svg
import Facebook from '@/assets/svg/social/facebook.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'
import Instagram from '@/assets/svg/social/instagram.svg'

// pages
export const pages = {
	home: '/',

	// about (hub + entity/team subpages - subpages not built yet, constants kept for forward links)
	sobre: '/sobre',
	sobreAgp: '/sobre/aether-global-pharma',
	sobreIct: '/sobre/ict-aether-bio',
	sobreEquipe: '/sobre/equipe',

	// media
	midia: '/midia',

	// project submission
	inscreva: '/inscreva-seu-projeto',

	// partners
	parceiros: '/parceiros',

	// p&d (hub + subpages - hub/pipeline not built yet, constants kept for forward links)
	pd: '/pd',
	trl: '/pd/trl',
	pdPipeline: '/pd/pipeline',

	// contact
	contato: '/contato',

	// legal
	privacy: '/politica-de-privacidade',
	termos: '/termos-e-condicoes',

	// others
	error: '/404'
}

/**
 * @typedef {{ href: string, label: string }} NavChild
 * @typedef {{ href: string, label: string, home?: boolean, children?: NavChild[] }} NavItem
 */

// subpage groups - referenced as `children` on the Sobre / P&D nav entries so the
// menu (header dropdown + mobile sub-list) and footer can render them nested. the
// subpages don't all exist yet (they 404 until built) - links are intentional.
/** @type {NavChild[]} */
const sobreChildren = [
	{ href: pages.sobreAgp, label: 'Aether Global Pharma' },
	{ href: pages.sobreIct, label: 'ICT AetherBio+' },
	{ href: pages.sobreEquipe, label: 'Equipe' }
]

/** @type {NavChild[]} */
const pdChildren = [
	{ href: pages.trl, label: 'Maturidade Tecnológica (TRL)' },
	{ href: pages.pdPipeline, label: 'Pipeline' }
]

// full navigation - feeds the mobile (fullscreen) menu and the footer.
// anchors (#...) scroll the home; routes (/...) navigate. the `home` entry scrolls
// to top on home and navigates home from other pages. items may carry `children`.
/** @type {NavItem[]} */
export const navLinks = [
	{ href: pages.home, label: 'Início', home: true },
	{ href: pages.sobre, label: 'Sobre', children: sobreChildren },
	{ href: pages.pd, label: 'P&D', children: pdChildren },
	{ href: pages.midia, label: 'Mídia' },
	{ href: pages.parceiros, label: 'Parceiros' },
	{ href: pages.inscreva, label: 'Inscreva seu Projeto' },
	{ href: pages.contato, label: 'Contato' }
]

// desktop header - a trimmed subset (no Início/Parceiros), but now carries the
// Sobre / P&D groups (rendered as hover dropdowns). edit independently of navLinks.
/** @type {NavItem[]} */
export const headerLinks = [
	{ href: pages.sobre, label: 'Sobre', children: sobreChildren },
	{ href: pages.pd, label: 'P&D', children: pdChildren },
	{ href: pages.midia, label: 'Mídia' },
	//{ href: pages.inscreva, label: 'Inscreva seu Projeto' },
	{ href: pages.contato, label: 'Contato' }
]

// footer "Navegação" laid out as 4 columns - each column is a list of items, each
// item may carry `children` (rendered indented). distinct from the flat menu lists.
// (footer uses the short "TRL" label; the menu dropdown uses the fuller one.)
/** @type {NavItem[][]} */
export const footerColumns = [
	[{ href: pages.sobre, label: 'Sobre', children: sobreChildren }],
	[{ href: pages.pd, label: 'P&D', children: [
		{ href: pages.trl, label: 'TRL' },
		{ href: pages.pdPipeline, label: 'Pipeline' }
	] }],
	[
		{ href: pages.midia, label: 'Mídia' },
		{ href: pages.parceiros, label: 'Parceiros' }
	],
	[
		{ href: pages.inscreva, label: 'Inscreva seu Projeto' },
		{ href: pages.contato, label: 'Contato' }
	]
]

// social
export const social = {
	instagram: 'https://www.instagram.com/aetherglobalpharma/'
}

// contact
export const contact = {
	phone: '+55 (41) 99661-6144',
	email: 'aether@aethergp.com.br',
	//address: 'Av. Rep. Argentina, 1228 - Sala 2210 - Vila Izabel, Curitiba - PR, 80610-260',
	//gmaps: 'https://maps.app.goo.gl/Sg1E92zC1FYNJMYx7'
}

// social links
export const socialLinks = [
	{
		icon: Instagram,
		name: 'Instagram',
		href: social.instagram
	}
]