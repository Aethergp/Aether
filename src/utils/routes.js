// svg
import Facebook from '@/assets/svg/social/facebook.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'
import Instagram from '@/assets/svg/social/instagram.svg'

// pages
export const pages = {
	home: '/',

	// media
	midia: '/midia',

	// project submission
	inscreva: '/inscreva-seu-projeto',

	// partners
	parceiros: '/parceiros',

	// p&d (not built yet - constant kept for forward links)
	trl: '/pd/trl',

	// contact
	contato: '/contato',

	// legal
	privacy: '/politica-de-privacidade',
	termos: '/termos-e-condicoes',

	// others
	error: '/404'
}

// full navigation - feeds the mobile (fullscreen) menu and the footer.
// anchors (#...) scroll the home; routes (/...) navigate. the `home` entry scrolls
// to top on home and navigates home from other pages.
export const navLinks = [
	{ href: pages.home, label: 'Início', home: true },
	{ href: '#contexto', label: 'Contexto' },
	{ href: '#sobre', label: 'Sobre' },
	{ href: pages.midia, label: 'Mídia' },
	{ href: pages.parceiros, label: 'Parceiros' },
	{ href: pages.inscreva, label: 'Inscreva seu Projeto' },
	{ href: pages.contato, label: 'Contato' }
]

// desktop header only - a deliberately trimmed subset (the header isn't the full
// sitemap). edit this independently of navLinks.
export const headerLinks = [
	{ href: '#sobre', label: 'Sobre' },
	{ href: pages.midia, label: 'Mídia' },
	{ href: pages.inscreva, label: 'Inscreva seu Projeto' },
	{ href: pages.contato, label: 'Contato' }
]

// social
export const social = {
	instagram: 'https://www.instagram.com/aetherglobalpharma/'
}

// contact
export const contact = {
	//phone: '(41) 3340-4300',
	email: 'poliveira@aethergp.com',
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