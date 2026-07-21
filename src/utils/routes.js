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
	pd: '/desenvolvimento-de-ativos',
	trl: '/desenvolvimento-de-ativos/trl',
	pdPipeline: '/desenvolvimento-de-ativos/pipeline',

	// contact
	contato: '/contato',

	// legal
	privacy: '/politica-de-privacidade',
	termos: '/termos-e-condicoes',

	// others
	error: '/404'
}

/**
 * @typedef {'inicio'|'sobre'|'sobreAgp'|'sobreIct'|'sobreEquipe'|'pd'|'trlFull'|'trlShort'|'pipeline'|'midia'|'parceiros'|'inscreva'|'contato'} NavLabelKey
 * @typedef {{ href: string, label: NavLabelKey }} NavChild
 * @typedef {{ href: string, label: NavLabelKey, home?: boolean, children?: NavChild[] }} NavItem
 */

// `label` here is a key into the "Nav" message namespace (src/messages/*.json), NOT
// display text - Menu/Footer resolve it via `useTranslations('Nav')` at render time.

// subpage groups - referenced as `children` on the Sobre / Desenvolvimento de Ativos nav entries so the
// menu (header dropdown + mobile sub-list) and footer can render them nested. the
// subpages don't all exist yet (they 404 until built) - links are intentional.
/** @type {NavChild[]} */
const sobreChildren = [
	{ href: pages.sobreAgp, label: 'sobreAgp' },
	{ href: pages.sobreIct, label: 'sobreIct' },
	{ href: pages.sobreEquipe, label: 'sobreEquipe' }
]

/** @type {NavChild[]} */
const pdChildren = [
	{ href: pages.trl, label: 'trlFull' },
	{ href: pages.pdPipeline, label: 'pipeline' }
]

// full navigation - feeds the mobile (fullscreen) menu and the footer.
// anchors (#...) scroll the home; routes (/...) navigate. the `home` entry scrolls
// to top on home and navigates home from other pages. items may carry `children`.
/** @type {NavItem[]} */
export const navLinks = [
	{ href: pages.home, label: 'inicio', home: true },
	{ href: pages.sobre, label: 'sobre', children: sobreChildren },
	{ href: pages.pd, label: 'pd', children: pdChildren },
	{ href: pages.midia, label: 'midia' },
	{ href: pages.parceiros, label: 'parceiros' },
	{ href: pages.inscreva, label: 'inscreva' },
	{ href: pages.contato, label: 'contato' }
]

// desktop header - a trimmed subset (no Início/Parceiros), but now carries the
// Sobre / Desenvolvimento de Ativos groups (rendered as hover dropdowns). edit independently of navLinks.
/** @type {NavItem[]} */
export const headerLinks = [
	{ href: pages.sobre, label: 'sobre', children: sobreChildren },
	{ href: pages.pd, label: 'pd', children: pdChildren },
	{ href: pages.midia, label: 'midia' },
	//{ href: pages.inscreva, label: 'inscreva' },
	{ href: pages.contato, label: 'contato' }
]

// footer "Navegação" laid out as 4 columns - each column is a list of items, each
// item may carry `children` (rendered indented). distinct from the flat menu lists.
// (footer uses the short "trlShort" key; the menu dropdown uses "trlFull".)
/** @type {NavItem[][]} */
export const footerColumns = [
	[{ href: pages.sobre, label: 'sobre', children: sobreChildren }],
	[{ href: pages.pd, label: 'pd', children: [
		{ href: pages.trl, label: 'trlShort' },
		{ href: pages.pdPipeline, label: 'pipeline' }
	] }],
	[
		{ href: pages.midia, label: 'midia' },
		{ href: pages.parceiros, label: 'parceiros' }
	],
	[
		{ href: pages.inscreva, label: 'inscreva' },
		{ href: pages.contato, label: 'contato' }
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