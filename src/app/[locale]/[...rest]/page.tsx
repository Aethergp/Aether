import { notFound } from 'next/navigation'

// catches any path under [locale] with no matching page, so it renders the
// localized [locale]/not-found.tsx instead of bubbling to the root fallback
export default function CatchAllPage() {
	notFound()
}
