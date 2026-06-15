// svg
import Facebook from '@/assets/svg/social/facebook.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'
import Instagram from '@/assets/svg/social/instagram.svg'

// pages
export const pages = {
	home: '/',

	// media
	midia: '/midia',

	// contact
	contato: '/contato',

	// privacy
	privacy: '/politica-de-privacidade',

	// others
	error: '/404'
}

// primary site navigation - SINGLE SOURCE OF TRUTH for the three nav surfaces:
// the desktop header, the mobile (fullscreen) menu, and the footer.
// update a destination here once and all three follow. anchors (#...) scroll the
// home; routes (/...) navigate. the desktop header omits the `home` entry (the logo covers it).
export const navLinks = [
	{ href: pages.home, label: 'Início', home: true },
	{ href: '#contexto', label: 'Contexto' },
	{ href: '#sobre', label: 'Sobre' },
	{ href: pages.midia, label: 'Mídia' },
	{ href: '#parceiros', label: 'Parceiros' },
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