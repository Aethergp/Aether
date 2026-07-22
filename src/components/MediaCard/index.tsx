'use client'

// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from 'next-transition-router'

// svg
import UxArrowDiagonal from '@/assets/svg/ux/arrow-diagonal.svg'
import UxLink from '@/assets/svg/ux/link.svg'

// utils
import { type MediaPost, mediaHref, formatDate } from '@/app/[locale]/midia/db/data'
import { getLocalizedPathname } from '@/i18n/navigation'

interface Props {
	post: MediaPost
}

export default function MediaCard({ post }: Props) {

	const t = useTranslations('MediaCard')
	const locale = useLocale()

	const href = mediaHref(post)
	const isExternal = post.type === 'imprensa'

	const body = (
		<>
			<div className='relative aspect-4/3 rounded-sm lg:rounded-md overflow-hidden bg-green-dark'>

				{post.image ? (
					<Image
						src={post.image.url}
						alt={post.image.alt}
						fill
						className='object-cover'
						sizes='(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw'
						loading='lazy'
					/>
				) : (
					<span className='absolute inset-0 flex items-center justify-center'>
						<Image
							src='/img/svg/logo/icon-gp.svg'
							alt=''
							width={64}
							height={64}
							aria-hidden='true'
							className='w-12 h-auto opacity-30 transition-transform duration-500 group-hover:scale-110 invert brightness-0'
						/>
					</span>
				)}

				<span className='absolute top-4 left-4 flex flex-wrap gap-1'>

					<span className='flex items-center gap-2 bg-black text-green-light text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-sm'>
						{post.category}
					</span>

					{isExternal && (
						<span className='flex items-center gap-1.5 bg-black text-green-light text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-sm'>
							<UxLink className='w-3 h-3 text-current' />
							{t('externalLinkLabel')}
						</span>
					)}

				</span>

			</div>

			<div className='flex items-start justify-between gap-6 mt-5'>

				<h2 className='text-30 font-heading font-semibold leading-tight text-green-dark transition-colors duration-200'>
					{post.title}
				</h2>

				<UxArrowDiagonal className='w-3 h-3 mt-3 mr-2 shrink-0 text-green-dark transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />

			</div>

			<p className='text-16 leading-relaxed opacity-70 mt-3 line-clamp-2'>
				{post.excerpt}
			</p>

			<div className='flex items-center gap-2 text-sm opacity-60 mt-5'>
				<span>{formatDate(post.date, locale)}</span>
				{isExternal && post.source && (
					<>
						<span aria-hidden='true'>·</span>
						<span>{post.source}</span>
					</>
				)}
			</div>
		</>
	)

	const className = 'group block hover:-translate-y-2! transition-transform duration-300'

	if (isExternal) {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={clsx(className, 'cursor-pointer')}
			>
				{body}
			</a>
		)
	}

	return (
		<Link href={getLocalizedPathname(href, locale)} className={className}>
			{body}
		</Link>
	)
}
