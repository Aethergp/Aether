// JSON-LD graph helpers. Every node is emitted with a stable @id so nodes can
// reference each other (breadcrumbs → page, article → publisher) instead of
// repeating the organisation on every route.

export const SITE_URL = 'https://aethergp.com.br'

export const ORG_ID = `${SITE_URL}/#organization`
export const ICT_ID = `${SITE_URL}/#ict-aetherbio`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const FOUNDER_ID = `${SITE_URL}/#patricia-oliveira`

const SLOGAN = 'Ciência e Ativos Farmacêuticos'

const DESCRIPTION = 'A Aether Global Pharma é uma plataforma especializada em transformar ciência em ativos farmacêuticos: desrisking científico, propriedade intelectual, maturidade tecnológica, transferência de tecnologia e licenciamento global.'

export const organization = {
	'@type': 'Organization',
	'@id': ORG_ID,
	name: 'Aether Global Pharma',
	alternateName: 'Aether',
	legalName: 'Aether Global Pharma LTDA',
	slogan: SLOGAN,
	url: SITE_URL,
	logo: {
		'@type': 'ImageObject',
		url: `${SITE_URL}/web-app-manifest-512x512.png`,
		width: 512,
		height: 512
	},
	image: `${SITE_URL}/img/og-image.jpg`,
	description: DESCRIPTION,
	// street address and phone are intentionally omitted (not public); country +
	// region are safe to publish and still give Google a geographic signal
	address: {
		'@type': 'PostalAddress',
		addressRegion: 'PR',
		addressCountry: 'BR'
	},
	areaServed: [
		{ '@type': 'Country', name: 'Brasil' },
		{ '@type': 'Country', name: 'Canadá' }
	],
	// contact runs through the site form only - no public e-mail or phone
	contactPoint: [
		{
			'@type': 'ContactPoint',
			contactType: 'business',
			url: `${SITE_URL}/contato`,
			availableLanguage: ['pt-BR', 'en']
		}
	],
	subOrganization: { '@id': ICT_ID },
	founder: { '@id': FOUNDER_ID },
	sameAs: [
		'https://www.instagram.com/aetherglobalpharma/'
	],
	knowsAbout: [
		'Desenvolvimento de ativos farmacêuticos',
		'Propriedade intelectual farmacêutica',
		'Transferência de tecnologia',
		'Licenciamento farmacêutico global',
		'Maturidade tecnológica (TRL)',
		'Biotecnologia',
		'Desrisking científico'
	]
}

export const ictOrganization = {
	'@type': 'ResearchOrganization',
	'@id': ICT_ID,
	name: 'ICT AetherBio+',
	alternateName: 'Instituto de Ciência e Tecnologia AetherBio+',
	url: `${SITE_URL}/sobre/ict-aether-bio`,
	description: 'Instituto de Ciência e Tecnologia dedicado a pesquisas avançadas em saúde e biotecnologia, maturidade tecnológica e governança científica independente.',
	parentOrganization: { '@id': ORG_ID }
}

// founder/CEO - a named person is a strong E-E-A-T signal on a YMYL (health)
// site, so this node ships on every page rather than only on /sobre/equipe
export const founder = {
	'@type': 'Person',
	'@id': FOUNDER_ID,
	name: 'Patricia P. Oliveira',
	jobTitle: 'CEO e Fundadora',
	description: 'Mais de 25 anos de experiência na indústria farmacêutica e em ambientes altamente regulados, na interseção entre desenvolvimento farmacêutico, estratégia regulatória, transferência de tecnologia e operações industriais. Fundadora e CEO da Aether Global Pharma e presidente do ICT AetherBio+.',
	worksFor: { '@id': ORG_ID },
	url: `${SITE_URL}/sobre/equipe`,
	sameAs: ['https://www.linkedin.com/in/patricia-p-oliveira/']
}

export const website = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: SITE_URL,
	name: 'Aether Global Pharma',
	description: DESCRIPTION,
	inLanguage: 'pt-BR',
	publisher: { '@id': ORG_ID }
}

interface PersonOptions {
	name: string
	jobTitle: string
	description?: string
	image?: string
	linkedin?: string
	/** Page the person is presented on - scopes their @id. Defaults to /sobre/equipe. */
	basePath?: string
	/**
	 * @id of an organisation the person actually works for. Only pass this for
	 * Aether's own people - external researchers get `affiliation` instead, since
	 * claiming they work for Aether would be false.
	 */
	worksFor?: string
	/** Name of the institution the person is affiliated with (e.g. 'CQMED'). */
	affiliation?: string
}

/** Stable @id for a person, so pages can reference them by name. */
export function personId(name: string, basePath = '/sobre/equipe') {
	const slug = name
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')

	return `${SITE_URL}${basePath}#${slug}`
}

/** Strips tags/entities from a copy string and trims it to a schema-sized summary. */
export function plainText(html: string, max = 300) {
	const text = html
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		.trim()

	if (text.length <= max) return text

	// cut on a word boundary so the summary doesn't end mid-word
	return text.slice(0, text.lastIndexOf(' ', max)) + '...'
}

/** A committee member / advisor node, keyed off their name. */
export function person({
	name,
	jobTitle,
	description,
	image,
	linkedin,
	basePath,
	worksFor,
	affiliation
}: PersonOptions) {
	return {
		'@type': 'Person',
		'@id': personId(name, basePath),
		name,
		jobTitle,
		...(description ? { description } : {}),
		...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
		...(linkedin ? { sameAs: [linkedin] } : {}),
		...(worksFor ? { worksFor: { '@id': worksFor } } : {}),
		...(affiliation ? { affiliation: { '@type': 'Organization', name: affiliation } } : {})
	}
}

interface Crumb {
	name: string
	item: string
}

/**
 * Builds a BreadcrumbList. Pass the trail without the home entry - it is
 * prepended automatically. `item` is a site-relative path.
 */
export function breadcrumbs(trail: Crumb[]) {
	const all = [{ name: 'Início', item: '/' }, ...trail]

	return {
		'@type': 'BreadcrumbList',
		'@id': `${SITE_URL}${all[all.length - 1].item}#breadcrumb`,
		itemListElement: all.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: `${SITE_URL}${crumb.item === '/' ? '' : crumb.item}`
		}))
	}
}

/** Wraps nodes in a @graph document ready for JSON.stringify. */
export function graph(...nodes: object[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': nodes
	}
}

/**
 * The schema.org type that best describes a page. `WebPage` is the safe
 * default; the others are recognised subtypes that give Google a stronger
 * signal about what the route is.
 */
type PageType =
	| 'WebPage'
	| 'AboutPage'
	| 'ContactPage'
	| 'CollectionPage'
	| 'ProfilePage'

interface PageOptions {
	type?: PageType
	/** Site-relative path, e.g. '/sobre/equipe'. */
	path: string
	name: string
	description: string
	/** Breadcrumb trail without the home entry. */
	trail: Crumb[]
	/** Extra nodes to merge into the graph (Person, Blog, ItemList…). */
	extra?: object[]
	/** Merged into the WebPage node - e.g. mainEntity, significantLink. */
	extend?: Record<string, unknown>
}

/**
 * Standard per-page graph: a typed WebPage bound to the WebSite and the
 * Organization, plus its BreadcrumbList. Every route should call this.
 */
export function pageGraph({
	type = 'WebPage',
	path,
	name,
	description,
	trail,
	extra = [],
	extend = {}
}: PageOptions) {
	const url = `${SITE_URL}${path === '/' ? '' : path}`

	// the home page has no trail; a single-item BreadcrumbList carries no
	// information, so skip the node entirely there
	const crumb = trail.length ? breadcrumbs(trail) : null

	const page = {
		'@type': type,
		'@id': url,
		url,
		name,
		description,
		inLanguage: 'pt-BR',
		isPartOf: { '@id': WEBSITE_ID },
		about: { '@id': ORG_ID },
		...(crumb ? { breadcrumb: { '@id': crumb['@id'] } } : {}),
		...extend
	}

	return graph(page, ...(crumb ? [crumb] : []), ...extra)
}
