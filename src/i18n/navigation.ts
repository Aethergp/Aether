// libraries
import type { Locale } from 'next-intl'
import { createNavigation } from 'next-intl/navigation'

// utils
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)

/**
 * Loosely-typed wrapper around getPathname() for callers holding a plain
 * `string` canonical path (routes.js's `pages.x` constants, schema.ts's
 * `Crumb.item`, etc.) rather than one of next-intl's strict pathname-key
 * literals - re-typing every href-accepting utility/component across the app
 * as a literal union isn't worth the churn for what's fundamentally an
 * internal, already-consistent canonical path.
 *
 * Special-cases the one dynamic route (`/midia/[slug]`): next-intl's
 * getPathname() needs the `{pathname, params}` object form to translate a
 * templated route - a concrete string like `/midia/some-slug` doesn't match
 * the `[slug]` template key, so it would come back completely untranslated
 * (not even locale-prefixed). Detecting the `/midia/<slug>` shape here keeps
 * every caller (Button, Menu, Footer, pageGraph, breadcrumbs, MediaCard, …)
 * working with a single plain-string call, instead of threading the object
 * form through every one of them.
 */
export function getLocalizedPathname(href: string, locale: Locale): string {
	const mediaPostMatch = href.match(/^\/midia\/(.+)$/)

	if (mediaPostMatch) {
		return getPathname({
			href: { pathname: '/midia/[slug]', params: { slug: mediaPostMatch[1] } },
			locale
		})
	}

	return getPathname({ href: href as never, locale })
}
