'use client'

// libraries
import clsx from 'clsx'

interface Props {
	currentPage: number
	totalPages: number
	onChange: (page: number) => void
}

const WINDOW = 5

export default function Pagination({ currentPage, totalPages, onChange }: Props) {

	if (totalPages <= 1) return null

	let start = Math.max(1, currentPage - Math.floor(WINDOW / 2))
	const end = Math.min(totalPages, start + WINDOW - 1)
	start = Math.max(1, end - WINDOW + 1)

	const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

	const Arrow = ({ direction }: { direction: 'prev' | 'next' }) => (
		<svg
			viewBox='0 0 16 16'
			fill='none'
			aria-hidden='true'
			className={clsx('w-3.5 h-3.5', direction === 'next' && 'rotate-180')}
		>
			<path d='M10 2 4 8l6 6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	)

	return (
		<nav
			aria-label='Paginação'
			className='flex items-center justify-center gap-1.5 sm:gap-2'
		>

			<button
				type='button'
				onClick={() => onChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label='Página anterior'
				className='flex items-center justify-center w-10 h-10 rounded-sm border border-green-dark/20 text-green-dark transition-colors duration-200 enabled:hover:bg-green-dark enabled:hover:text-green-light disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
			>
				<Arrow direction='prev' />
			</button>

			{pages.map((page) => {
				const active = page === currentPage
				return (
					<button
						key={page}
						type='button'
						onClick={() => onChange(page)}
						aria-current={active ? 'page' : undefined}
						className={clsx(
							'flex items-center justify-center w-10 h-10 rounded-sm border text-16 transition-colors duration-200 cursor-pointer',
							active
								? 'bg-green-dark text-green-light border-green-dark'
								: 'border-green-dark/20 text-green-dark hover:bg-green-pale'
						)}
					>
						{page}
					</button>
				)
			})}

			<button
				type='button'
				onClick={() => onChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label='Próxima página'
				className='flex items-center justify-center w-10 h-10 rounded-sm border border-green-dark/20 text-green-dark transition-colors duration-200 enabled:hover:bg-green-dark enabled:hover:text-green-light disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
			>
				<Arrow direction='next' />
			</button>

		</nav>
	)
}
