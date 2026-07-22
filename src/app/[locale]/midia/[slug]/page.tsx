// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import ImageReveal from '@/components/Utils/Animations/ImageReveal'
import Button from '@/components/Button'
import ShareButtons from '../ShareButtons'
import RelatedPosts from '../RelatedPosts'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph } from '@/utils/schema'
import { articleNode } from '../db/schema'
import { ogLocale } from '@/utils/functions'
import {
	getMediaPosts,
	getMediaPostBySlug,
	getRelatedPosts,
	getContent,
	getReadingTime,
	formatDate,
	mediaHref,
	SITE_URL
} from '../db/data'

interface Props {
	params: Promise<{ locale: Locale, slug: string }>
}

export function generateStaticParams() {
	return getMediaPosts()
		.filter((post) => post.type === 'blog' && post.slug)
		.map((post) => ({ slug: post.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params
	const post = getMediaPostBySlug(slug)

	if (!post) {
		const t = await getTranslations({ locale, namespace: 'MidiaPostPage' })
		return { title: t('notFoundTitle') }
	}

	const title = `${post.title} | Aether Global Pharma`
	const url = `${SITE_URL}${mediaHref(post)}`

	return {
		title,
		description: post.excerpt,
		alternates: { canonical: mediaHref(post) },
		openGraph: {
			title,
			description: post.excerpt,
			url,
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: post.image?.url ?? '/img/og-image.jpg',
					width: 1280,
					height: 628,
					alt: post.image?.alt ?? post.title
				}
			],
			locale: ogLocale(locale),
			type: 'article'
		}
	}
}

export default async function PostPage({ params }: Props) {

	const { locale, slug } = await params
	const t = await getTranslations({ locale, namespace: 'MidiaPostPage' })
	const tNav = await getTranslations({ locale, namespace: 'Nav' })
	const post = getMediaPostBySlug(slug)

	if (!post) notFound()

	const related = getRelatedPosts(post)
	const readingTime = getReadingTime(post)
	const shareUrl = `${SITE_URL}${mediaHref(post)}`

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-article'
				data={await pageGraph({
					locale,
					path: mediaHref(post),
					name: `${post.title} | Aether Global Pharma`,
					description: post.excerpt,
					trail: [
						{ name: tNav('midia'), item: '/midia' },
						{ name: post.title, item: mediaHref(post) }
					],
					extend: {
						mainEntity: { '@id': `${shareUrl}#article` }
					},
					extra: [articleNode(post)]
				})}
			/>

			<article>

				<section className='pt-36 sm:pt-44 lg:pt-[10vw] pb-10 lg:pb-[3vw] bg-green-light'>
					<div className='base-container'>
						<div className='row'>
							<div className='col-lg-10 offset-lg-1'>

								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									<AnimatedText text={post.title} />
								</h1>

								<p className='text-24 leading-relaxed text-green-dark mt-6 lg:mt-8 max-w-[58ch]'>
									<AnimatedText text={post.excerpt} />
								</p>

								<div className='flex flex-wrap gap-2 mt-8'>
									<span className='border border-green-dark/20 rounded-sm px-4 py-1.5 text-sm text-green-dark'>
										{post.category}
									</span>
								</div>

								<div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-green-dark/10 mt-10 pt-6'>

									<div className='flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-green-dark'>

										<span className='flex items-center gap-2'>
											<svg viewBox='0 0 16 16' fill='none' aria-hidden='true' className='w-4 h-4'>
												<circle cx='8' cy='8' r='6.25' stroke='currentColor' strokeWidth='1.5' />
												<path d='M8 4.5V8l2.5 1.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
											</svg>
											{readingTime} {readingTime === 1 ? t('readingTimeSingular') : t('readingTimePlural')}
										</span>

										<span>{formatDate(post.date)}</span>

									</div>

									<ShareButtons url={shareUrl} title={post.title} />

								</div>

							</div>
						</div>
					</div>
				</section>

				<section className='pb-6 lg:pb-[3vw] relative overflow-hidden'>

					<div className='absolute z-0 top-0 left-0 w-full h-1/2 bg-green-light' />

					<div className='base-container relative z-2'>
						<div className='row'>
							<div className='col-lg-10 offset-lg-1'>

								<div className='relative w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+10rem)] xl:w-[calc(100%+11rem)] 2xl:w-[calc(100%+15rem)] aspect-video rounded-md overflow-hidden bg-green-dark'>
									{post.image ? (
										<ImageReveal
											src={post.image.url}
											alt={post.image.alt}
											overlay='black'
											zoom={false}
											className='w-full h-full'
										/>
									) : (
										<span className='absolute inset-0 flex items-center justify-center'>
											<Image
												src='/img/svg/logo/icon-gp.svg'
												alt=''
												width={96}
												height={96}
												aria-hidden='true'
												className='w-16 h-auto invert brightness-0 opacity-30'
											/>
										</span>
									)}
								</div>

							</div>
						</div>
					</div>
				</section>

				<section className='relative overflow-hidden pb-16 lg:pb-[8vw]'>
					<div className='base-container relative z-2'>
						<div className='row'>
							<div className='col-lg-8 offset-lg-1'>
								<div
									className="rich-text"
									dangerouslySetInnerHTML={{ __html: getContent(post) }}
								/>

								<div className='mt-14 pt-10 border-t border-green-dark/10'>
									<Button
										href='/midia'
										style='dark'
										text={t('backButton')}
										icon='diagonal-arrow'
									/>
								</div>

							</div>
						</div>
					</div>

				</section>

			</article>

			<RelatedPosts posts={related} />

		</div>
	)
}
