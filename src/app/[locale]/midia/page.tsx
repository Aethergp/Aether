// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import MediaFeed from './MediaFeed'
import JsonLd from '@/components/JsonLd'

// utils
import { getMediaPosts } from './db/data'
import { blogNode } from './db/schema'
import { pageGraph, SITE_URL } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

interface Props {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'MidiaPage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		alternates: {
			canonical: '/midia'
		},
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br/midia',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: '/img/og/midia.jpg',
					width: 1200,
					height: 630,
					alt: 'Aether Global Pharma'
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		}
	}
}

export default async function MidiaPage({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'MidiaPage' })

	const posts = getMediaPosts()

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-midia'
				data={pageGraph({
					type: 'CollectionPage',
					path: '/midia',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [
						{ name: t('metaTitle'), item: '/midia' }
					],
					extend: {
						mainEntity: { '@id': `${SITE_URL}/midia#blog` }
					},
					extra: [blogNode(posts)]
				})}
			/>

			<section className='pt-36 sm:pt-44 lg:pt-60 2xl:pt-[12vw] pb-12 lg:pb-[5vw]'>
				<div className='base-container'>

					<div className="row">

						<div className="col-lg-3">
							<p className='font-semibold font-heading mb-6 lg:pt-1'>
								<AnimatedText text={t('eyebrow')} />
							</p>
						</div>

						<div className='col-lg-9'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									{t('heading')}
								</h1>
							</TextReveal>

						</div>

					</div>

					<div className="row mt-4 lg:mt-[9vw]">
						<div className="col-lg-9 offset-lg-3">
							<p className='text-20 leading-relaxed text-green-dark'>
								<AnimatedText text={t('intro')} />
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id='feed'
				className='relative overflow-hidden py-12 lg:py-[6vw]'
			>

				<StrokePath
					viewBox='0 0 657 1636'
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					className='z-0 top-[10%] -right-20 w-[85vw] sm:w-[55vw] lg:w-[40vw] scale-x-[-1] max-md:hidden!'
					end='50% 50%'
				/>

				<div className='base-container relative z-2'>
					<Suspense fallback={null}>
						<MediaFeed posts={posts} />
					</Suspense>
				</div>

			</section>

		</div>
	)
}
