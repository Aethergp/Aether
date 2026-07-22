// Local data source for the /midia feed - no CMS yet (see CLAUDE.md → "Blog / news").
// Shape mirrors a future headless-WordPress GraphQL query so a swap stays contained to
// this file: `blog` = internal post (WP post → /midia/[slug]), `imprensa` = curated
// external link (WP custom field → opens in a new tab). Each post's translatable fields
// (title/excerpt/category/author/content, plus each image's alt) live under
// `translations`/`image.alt`, keyed by locale - the slug/date/url stay the same across
// locales so a post has one URL regardless of which locale it's viewed under.

import type { Locale } from 'next-intl'
import raw from './posts.json'

// img
import bioLab from '@/assets/img/bio-lab.jpg'
import microscope from '@/assets/img/microscope.jpg'
import scientists from '@/assets/img/scientists.jpg'
import group from '@/assets/img/group.jpg'
import lab from '@/assets/img/lab.jpg'
import pillars from '@/assets/img/pillars.jpg'
import spheres from '@/assets/img/spheres.jpg'
import stairs from '@/assets/img/stairs.jpg'

export type MediaType = 'blog' | 'imprensa'

export interface MediaImage {
	url: string
	alt: string
}

export interface MediaPost {
	id: string
	type: MediaType
	slug: string | null
	title: string
	excerpt: string
	date: string // ISO yyyy-mm-dd
	category: string
	image: MediaImage | null
	externalUrl: string | null
	source: string | null
	author?: string
	readingTime?: number // minutes
	content?: string // HTML body
}

interface RawMediaTranslation {
	title: string
	excerpt: string
	category: string
	author?: string
	content?: string
}

interface RawMediaImage {
	url: string
	alt: Record<string, string>
}

interface RawMediaPost {
	id: string
	type: MediaType
	slug: string | null
	date: string
	image?: RawMediaImage
	externalUrl: string | null
	source: string | null
	readingTime?: number
	translations: Record<string, RawMediaTranslation>
}

export const POSTS_PER_PAGE = 18

// internal posts live under this base - change here if the route ever moves
export const BLOG_BASE = '/midia'

export const SITE_URL = 'https://aethergp.com.br'

// institutional authorship (spec recommendation while bylines aren't defined)
const DEFAULT_AUTHOR: Record<string, string> = {
	'pt-BR': 'Equipe Aether',
	'en-US': 'Aether Team',
	es: 'Equipo Aether'
}

// temporary article body, clearly marked, until real posts are produced
const PLACEHOLDER_CONTENT: Record<string, string> = {
	'pt-BR': `
<p><em>⟨ Conteúdo de exemplo, o texto final deste artigo será produzido posteriormente. ⟩</em></p>
<p>A plataforma Aether integra ciência, propriedade intelectual e estratégia de mercado em um único ecossistema. Este espaço editorial reúne os bastidores desse trabalho, das descobertas científicas em estágio inicial à valorização dos ativos no cenário global.</p>
<h2>Da bancada ao mercado</h2>
<p>O avanço da maturidade tecnológica de uma descoberta depende de um conjunto coordenado de decisões científicas, regulatórias e jurídicas. Tratadas de forma integrada desde o início, essas decisões reduzem incertezas e tornam o ativo mais atrativo para parceiros industriais e investidores especializados.</p>
<ul>
<li>Redução de risco tecnológico baseada em evidências científicas.</li>
<li>Governança científica independente ao longo do desenvolvimento.</li>
<li>Consolidação da propriedade intelectual com estratégia global.</li>
</ul>
<h2>Propriedade intelectual como ativo</h2>
<p>A titularidade bem estruturada das patentes protege e valoriza o resultado da pesquisa. Sem uma estratégia clara de proteção, mesmo tecnologias promissoras perdem valor e capacidade de licenciamento internacional.</p>
<p>É nesse ponto que a articulação entre o instituto de ciência e a holding de gestão faz diferença: cada um cuida de uma parte do caminho, sem diluir o que foi gerado pela ciência.</p>
<h2>O que vem a seguir</h2>
<p>Acompanhe este canal para entender, em linguagem acessível, como funciona o desenvolvimento farmacêutico moderno e qual o papel da Aether em conectar pesquisa de ponta ao mercado global.</p>
`,
	'en-US': `
<p><em>⟨ Sample content - the final text for this article will be produced later. ⟩</em></p>
<p>The Aether Platform integrates science, intellectual property, and market strategy into a single ecosystem. This editorial space brings together the behind-the-scenes of that work, from early-stage scientific discoveries to asset value creation on the global stage.</p>
<h2>From the bench to the market</h2>
<p>Advancing the technology readiness of a discovery depends on a coordinated set of scientific, regulatory, and legal decisions. Handled together from the start, these decisions reduce uncertainty and make the asset more attractive to industrial partners and specialized investors.</p>
<ul>
<li>Technological risk reduction based on scientific evidence.</li>
<li>Independent scientific governance throughout development.</li>
<li>Consolidation of intellectual property with a global strategy.</li>
</ul>
<h2>Intellectual property as an asset</h2>
<p>Well-structured patent ownership protects and adds value to research outcomes. Without a clear protection strategy, even promising technologies lose value and international licensing potential.</p>
<p>This is where the coordination between the science institute and the management holding makes a difference: each one takes care of part of the path, without diluting what science generated.</p>
<h2>What comes next</h2>
<p>Follow this channel to understand, in accessible language, how modern pharmaceutical development works and what role Aether plays in connecting cutting-edge research to the global market.</p>
`,
	es: `
<p><em>⟨ Contenido de ejemplo, el texto final de este artículo se producirá más adelante. ⟩</em></p>
<p>La Plataforma Aether integra ciencia, propiedad intelectual y estrategia de mercado en un único ecosistema. Este espacio editorial reúne lo que ocurre detrás de ese trabajo, desde los descubrimientos científicos en etapa inicial hasta la valorización de los activos en el escenario global.</p>
<h2>Del laboratorio al mercado</h2>
<p>El avance de la madurez tecnológica de un descubrimiento depende de un conjunto coordinado de decisiones científicas, regulatorias y jurídicas. Tratadas de forma integrada desde el inicio, estas decisiones reducen incertidumbres y hacen que el activo sea más atractivo para socios industriales e inversores especializados.</p>
<ul>
<li>Reducción del riesgo tecnológico basada en evidencias científicas.</li>
<li>Gobernanza científica independiente a lo largo del desarrollo.</li>
<li>Consolidación de la propiedad intelectual con estrategia global.</li>
</ul>
<h2>La propiedad intelectual como activo</h2>
<p>La titularidad bien estructurada de las patentes protege y valoriza el resultado de la investigación. Sin una estrategia clara de protección, incluso las tecnologías prometedoras pierden valor y capacidad de licenciamiento internacional.</p>
<p>Es en este punto donde la articulación entre el instituto de ciencia y la sociedad de gestión marca la diferencia: cada uno se ocupa de una parte del camino, sin diluir lo que la ciencia generó.</p>
<h2>Qué viene a continuación</h2>
<p>Siga este canal para entender, en lenguaje accesible, cómo funciona el desarrollo farmacéutico moderno y cuál es el papel de Aether al conectar la investigación de vanguardia con el mercado global.</p>
`
}

// temporary image pool, assigned in a fixed pseudo-random order until each post
// carries its own cover (WP featured image later). deterministic per id so SSR
// and client hydration agree.
const MEDIA_IMAGES: Record<string, MediaImage>[] = [
	{ 'pt-BR': { url: bioLab.src, alt: 'Laboratório de pesquisa biológica' }, 'en-US': { url: bioLab.src, alt: 'Biological research laboratory' }, es: { url: bioLab.src, alt: 'Laboratorio de investigación biológica' } },
	{ 'pt-BR': { url: microscope.src, alt: 'Microscópio em laboratório científico' }, 'en-US': { url: microscope.src, alt: 'Microscope in a scientific laboratory' }, es: { url: microscope.src, alt: 'Microscopio en un laboratorio científico' } },
	{ 'pt-BR': { url: scientists.src, alt: 'Equipe de cientistas em ambiente de pesquisa' }, 'en-US': { url: scientists.src, alt: 'Team of scientists in a research environment' }, es: { url: scientists.src, alt: 'Equipo de científicos en un entorno de investigación' } },
	{ 'pt-BR': { url: group.src, alt: 'Equipe da Aether reunida' }, 'en-US': { url: group.src, alt: 'The Aether team gathered together' }, es: { url: group.src, alt: 'Equipo de Aether reunido' } },
	{ 'pt-BR': { url: lab.src, alt: 'Ambiente de laboratório farmacêutico' }, 'en-US': { url: lab.src, alt: 'Pharmaceutical laboratory environment' }, es: { url: lab.src, alt: 'Entorno de laboratorio farmacéutico' } },
	{ 'pt-BR': { url: pillars.src, alt: 'Detalhe arquitetônico em colunas' }, 'en-US': { url: pillars.src, alt: 'Architectural detail of columns' }, es: { url: pillars.src, alt: 'Detalle arquitectónico de columnas' } },
	{ 'pt-BR': { url: spheres.src, alt: 'Composição visual de esferas' }, 'en-US': { url: spheres.src, alt: 'Visual composition of spheres' }, es: { url: spheres.src, alt: 'Composición visual de esferas' } },
	{ 'pt-BR': { url: stairs.src, alt: 'Escadaria em ambiente corporativo' }, 'en-US': { url: stairs.src, alt: 'Staircase in a corporate environment' }, es: { url: stairs.src, alt: 'Escalera en un entorno corporativo' } }
]

function pickImage(id: string, locale: string): MediaImage {
	const seed = Number(id) || 0
	const pool = MEDIA_IMAGES[(seed * 7 + 3) % MEDIA_IMAGES.length]
	return pool[locale] ?? pool['pt-BR']
}

function resolvePost(post: RawMediaPost, locale: string): MediaPost {
	const t = post.translations[locale] ?? post.translations['pt-BR']

	const image: MediaImage = post.image
		? { url: post.image.url, alt: post.image.alt[locale] ?? post.image.alt['pt-BR'] }
		: pickImage(post.id, locale)

	return {
		id: post.id,
		type: post.type,
		slug: post.slug,
		title: t.title,
		excerpt: t.excerpt,
		date: post.date,
		category: t.category,
		image,
		externalUrl: post.externalUrl,
		source: post.source,
		author: t.author ?? DEFAULT_AUTHOR[locale] ?? DEFAULT_AUTHOR['pt-BR'],
		readingTime: post.readingTime,
		content: t.content ?? PLACEHOLDER_CONTENT[locale] ?? PLACEHOLDER_CONTENT['pt-BR']
	}
}

export function getMediaPosts(locale: Locale = 'pt-BR'): MediaPost[] {
	return (raw as RawMediaPost[])
		.map((post) => resolvePost(post, locale))
		.sort((a, b) => b.date.localeCompare(a.date))
}

export function getMediaPostBySlug(slug: string, locale: Locale = 'pt-BR'): MediaPost | null {
	return getMediaPosts(locale).find((post) => post.type === 'blog' && post.slug === slug) ?? null
}

export function getRelatedPosts(post: MediaPost, locale: Locale = 'pt-BR', limit = 3): MediaPost[] {
	const others = getMediaPosts(locale).filter((p) => p.type === 'blog' && p.slug !== post.slug)
	const sameCategory = others.filter((p) => p.category === post.category)
	const rest = others.filter((p) => p.category !== post.category)
	return [...sameCategory, ...rest].slice(0, limit)
}

export function mediaHref(post: MediaPost): string {
	if (post.type === 'imprensa') return post.externalUrl ?? '#'
	return `${BLOG_BASE}/${post.slug}`
}

export function getAuthor(post: MediaPost): string {
	return post.author ?? DEFAULT_AUTHOR['pt-BR']
}

export function getContent(post: MediaPost): string {
	return post.content ?? PLACEHOLDER_CONTENT['pt-BR']
}

export function getReadingTime(post: MediaPost): number {
	if (post.readingTime) return post.readingTime
	const words = getContent(post).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
	return Math.max(1, Math.round(words / 200))
}

const MONTHS: Record<string, string[]> = {
	'pt-BR': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
	'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
}

export function formatDate(iso: string, locale: string = 'pt-BR'): string {
	const [year, month, day] = iso.split('-').map(Number)
	const months = MONTHS[locale] ?? MONTHS['pt-BR']
	return `${String(day).padStart(2, '0')} ${months[month - 1]} ${year}`
}
