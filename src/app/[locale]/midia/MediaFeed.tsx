'use client'

// libraries
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { useTranslations } from 'next-intl'

// components
import MediaGrid from './MediaGrid'
import Pagination from '@/components/Pagination'

// utils
import { type MediaPost, type MediaType, POSTS_PER_PAGE } from './db/data'
import { usePathname, useRouter } from '@/i18n/navigation'

interface Props {
	posts: MediaPost[]
}

// deliberately avoids next/navigation's useSearchParams(): that hook forces this
// whole subtree behind a Suspense boundary during static generation, and the
// prerendered fallback then ships with zero post links/headings - bad for SEO.
// Reading window.location.search after mount keeps the component fully static
// (SSR/first paint always shows the unfiltered first page, same as the sitemap/
// canonical URL) while still staying in sync with the real URL for deep links,
// filtering, pagination, and back/forward navigation.
export default function MediaFeed({ posts }: Props) {

	const t = useTranslations('MidiaPage')
	const router = useRouter()
	const pathname = usePathname()

	const [category, setCategory] = useState<'todos' | MediaType>('todos')
	const [rawPage, setRawPage] = useState(1)

	useEffect(() => {
		const syncFromUrl = () => {
			const params = new URLSearchParams(window.location.search)
			setCategory((params.get('categoria') as MediaType | null) ?? 'todos')
			setRawPage(Number(params.get('pagina')) || 1)
		}

		syncFromUrl()

		window.addEventListener('popstate', syncFromUrl)
		return () => window.removeEventListener('popstate', syncFromUrl)
	}, [])

	const filters: { value: 'todos' | MediaType; label: string }[] = [
		{ value: 'todos', label: t('filterAll') },
		{ value: 'blog', label: t('filterBlog') },
		{ value: 'imprensa', label: t('filterPress') }
	]

	const filtered = useMemo(() => (
		category === 'todos' ? posts : posts.filter((post) => post.type === category)
	), [posts, category])

	const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
	const currentPage = Math.min(Math.max(1, rawPage), totalPages)

	const visible = filtered.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE
	)

	const pushParams = (next: { categoria?: string; pagina?: number }) => {
		const nextCategory = next.categoria ?? category
		const nextPage = next.pagina ?? 1

		const params = new URLSearchParams(window.location.search)

		if (nextCategory === 'todos') params.delete('categoria')
		else params.set('categoria', nextCategory)

		if (nextPage <= 1) params.delete('pagina')
		else params.set('pagina', String(nextPage))

		setCategory(nextCategory as 'todos' | MediaType)
		setRawPage(nextPage)

		const query = params.toString()
		router.push((query ? `${pathname}?${query}` : pathname) as never, { scroll: false })

		scrollToFeed()
	}

	const scrollToFeed = () => {
		const viewport = document.getElementById('viewport')
		const target = document.getElementById('feed')
		if (!viewport || !target) return

		const top = target.getBoundingClientRect().top + viewport.scrollTop - 120

		gsap.to(viewport, {
			scrollTop: top,
			duration: 1,
			ease: 'power2.inOut'
		})
	}

	return (
		<>

			<div className='flex flex-wrap items-center gap-2 sm:gap-3 mb-10 lg:mb-16'>
				{filters.map((filter) => {
					const active = filter.value === category
					return (
						<button
							key={filter.value}
							type='button'
							onClick={() => pushParams({ categoria: filter.value, pagina: 1 })}
							className={clsx(
								'px-5 py-2.5 rounded-sm text-16 transition-colors duration-200 cursor-pointer',
								active
									? 'bg-green-dark text-green-light'
									: 'bg-green-pale text-green-dark hover:bg-green-dark hover:text-green-light'
							)}
						>
							{filter.label}
						</button>
					)
				})}
			</div>

			<MediaGrid
				key={`${category}-${currentPage}`}
				posts={visible}
				emptyLabel={t('emptyState')}
			/>

			<div className='mt-16 lg:mt-[6vw]'>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onChange={(page) => pushParams({ pagina: page })}
				/>
			</div>

		</>
	)
}
