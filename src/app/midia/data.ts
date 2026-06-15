// Temporary local data source for the /midia feed.
// Shape mirrors a future headless-WordPress GraphQL query so the swap stays
// contained to this file: `blog` = internal post (WP post → /midia/[slug]),
// `imprensa` = curated external link (WP custom field → opens in a new tab).
// When WP is wired, replace getMediaPosts() with the GraphQL call and keep the
// MediaPost shape; the feed/card/pagination components stay untouched.

import raw from './temp.json'

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
	// optional in the local seed; filled with defaults below. these map to WP
	// fields later (author → post author, content → rendered HTML body).
	author?: string
	readingTime?: number // minutes
	content?: string // HTML body
}

export const POSTS_PER_PAGE = 18

// internal posts live under this base - change here if the route ever moves
export const BLOG_BASE = '/midia'

export const SITE_URL = 'https://aethergp.com.br'

// institutional authorship (spec recommendation while bylines aren't defined)
const DEFAULT_AUTHOR = 'Equipe Aether'

// temporary article body, clearly marked, until real posts are produced
const PLACEHOLDER_CONTENT = `
<p><em>⟨ Conteúdo de exemplo - o texto final deste artigo será produzido posteriormente. ⟩</em></p>
<p>A plataforma Aether integra ciência, propriedade intelectual e estratégia de mercado em um único ecossistema. Este espaço editorial reúne os bastidores desse trabalho - das descobertas científicas em estágio inicial à valorização dos ativos no cenário global.</p>
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
`

export function getMediaPosts(): MediaPost[] {
	return (raw as MediaPost[])
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date))
}

export function getMediaPostBySlug(slug: string): MediaPost | null {
	return getMediaPosts().find((post) => post.type === 'blog' && post.slug === slug) ?? null
}

export function getRelatedPosts(post: MediaPost, limit = 3): MediaPost[] {
	const others = getMediaPosts().filter((p) => p.type === 'blog' && p.slug !== post.slug)
	const sameCategory = others.filter((p) => p.category === post.category)
	const rest = others.filter((p) => p.category !== post.category)
	return [...sameCategory, ...rest].slice(0, limit)
}

export function mediaHref(post: MediaPost): string {
	if (post.type === 'imprensa') return post.externalUrl ?? '#'
	return `${BLOG_BASE}/${post.slug}`
}

export function getAuthor(post: MediaPost): string {
	return post.author ?? DEFAULT_AUTHOR
}

export function getContent(post: MediaPost): string {
	return post.content ?? PLACEHOLDER_CONTENT
}

export function getReadingTime(post: MediaPost): number {
	if (post.readingTime) return post.readingTime
	const words = getContent(post).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
	return Math.max(1, Math.round(words / 200))
}

const MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export function formatDate(iso: string): string {
	const [year, month, day] = iso.split('-').map(Number)
	return `${String(day).padStart(2, '0')} ${MONTHS_PT[month - 1]} ${year}`
}
