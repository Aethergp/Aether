// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// components
import Banner from './_home/Banner'
import Context from './_home/Context'
import About from './_home/About'
import Companies from './_home/Companies'
import Partners from './_home/Partners'
import Contact from './_home/Contact'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph, ORG_ID } from '@/utils/schema'
import { ogLocale } from '@/utils/functions'

interface Props {
	params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'HomePage' })

	return {
		title: t('metaTitle'),
		description: t('metaDescription'),
		openGraph: {
			title: t('metaTitle'),
			description: t('metaDescription'),
			url: 'https://aethergp.com.br',
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: 'https://aethergp.com.br/img/og-image.jpg',
					width: 1280,
					height: 628,
					alt: t('metaTitle')
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		}
	}
}

export default async function Home({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'HomePage' })

	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-home'
				data={pageGraph({
					path: '/',
					name: t('metaTitle'),
					description: t('metaDescription'),
					trail: [],
					extend: {
						mainEntity: { '@id': ORG_ID }
					}
				})}
			/>

			<Banner />

			<Context />

			<About />

			<Companies />

			<Partners />

			{/* <Contact /> */}

		</div>
	)
}
