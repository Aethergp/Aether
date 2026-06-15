'use client'

// libraries
import clsx from 'clsx'
import { useMemo } from 'react'
import { gsap } from 'gsap'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// components
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import MediaCard from '@/components/MediaCard'
import Pagination from '@/components/Pagination'

// utils
import { type MediaPost, type MediaType, POSTS_PER_PAGE } from './data'

interface Props {
	posts: MediaPost[]
}

const filters: { value: 'todos' | MediaType; label: string }[] = [
	{ value: 'todos', label: 'Todos' },
	{ value: 'blog', label: 'Blogs' },
	{ value: 'imprensa', label: 'Imprensa' }
]

export default function MediaFeed({ posts }: Props) {

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const category = searchParams.get('categoria') ?? 'todos'
	const rawPage = Number(searchParams.get('pagina')) || 1

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
		const params = new URLSearchParams(searchParams.toString())

		const nextCategory = next.categoria ?? category
		if (nextCategory === 'todos') params.delete('categoria')
		else params.set('categoria', nextCategory)

		const nextPage = next.pagina ?? 1
		if (nextPage <= 1) params.delete('pagina')
		else params.set('pagina', String(nextPage))

		const query = params.toString()
		router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })

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

			{visible.length > 0 ? (
				<StaggerUp
					key={`${category}-${currentPage}`}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20'
				>
					{visible.map((post) => (
						<div key={post.id}>
							<MediaCard post={post} />
						</div>
					))}
				</StaggerUp>
			) : (
				<p className='text-20 opacity-70 py-10'>
					Nenhum conteúdo encontrado nesta categoria.
				</p>
			)}

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
