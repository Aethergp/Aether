// JSON-LD nodes for the /midia feed and its posts. Lives next to the data
// source so the WP swap only has to keep the MediaPost shape intact.

import type { Locale } from 'next-intl'
import { ORG_ID, WEBSITE_ID, SITE_URL, plainText } from '@/utils/schema'
import { getPathname } from '@/i18n/navigation'
import { type MediaPost, getContent, getReadingTime, getAuthor, mediaHref } from './data'

export const BLOG_ID = `${SITE_URL}/midia#blog`

function postUrl(post: MediaPost, locale: Locale) {
	return `${SITE_URL}${getPathname({ href: mediaHref(post), locale })}`
}

/** Full BlogPosting for a single internal post. */
export function articleNode(post: MediaPost, locale: Locale) {
	const url = postUrl(post, locale)
	const body = getContent(post)

	return {
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		headline: post.title,
		description: post.excerpt,
		articleSection: post.category,
		inLanguage: locale,
		datePublished: post.date,
		dateModified: post.date,
		wordCount: plainText(body, Infinity).split(/\s+/).length,
		timeRequired: `PT${getReadingTime(post)}M`,
		image: post.image
			? (post.image.url.startsWith('http') ? post.image.url : `${SITE_URL}${post.image.url}`)
			: `${SITE_URL}/img/og-image.jpg`,
		author: {
			'@type': 'Organization',
			name: getAuthor(post),
			url: SITE_URL
		},
		publisher: { '@id': ORG_ID },
		// typed stub rather than a bare @id: the Blog node itself only exists on
		// /midia, so this keeps the article page's graph self-resolving
		isPartOf: {
			'@type': 'Blog',
			'@id': BLOG_ID,
			name: 'Mídia - Aether Global Pharma',
			url: `${SITE_URL}${getPathname({ href: '/midia', locale })}`
		},
		mainEntityOfPage: { '@id': url }
	}
}

/**
 * The Blog node for the feed. Only internal posts are listed - the `imprensa`
 * entries are links to third-party coverage, so claiming them as our own
 * blogPost would misrepresent authorship.
 */
export function blogNode(posts: MediaPost[], locale: Locale, name: string, description: string) {
	const internal = posts.filter((post) => post.type === 'blog' && post.slug)

	return {
		'@type': 'Blog',
		'@id': BLOG_ID,
		name,
		description,
		inLanguage: locale,
		url: `${SITE_URL}${getPathname({ href: '/midia', locale })}`,
		publisher: { '@id': ORG_ID },
		isPartOf: { '@id': WEBSITE_ID },
		blogPost: internal.map((post) => ({
			'@type': 'BlogPosting',
			'@id': `${postUrl(post, locale)}#article`,
			headline: post.title,
			description: post.excerpt,
			datePublished: post.date,
			url: postUrl(post, locale)
		}))
	}
}
