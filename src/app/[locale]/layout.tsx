// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import clsx from 'clsx'
import type { Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'

// components
import Menu from '@/components/Menu'
import SmoothScroller from '@/components/Utils/SmoothScroller'
import Guidelines from '@/components/Utils/Guidelines'
import Footer from '@/components/Footer'
import PageTransition from '@/components/Utils/PageTransition'
import { NotFoundProvider } from '@/components/Utils/NotFoundContext'
import ViewportHeight from '@/components/Utils/ViewportHeight'
import JsonLd from '@/components/JsonLd'

// utils
import { graph, getOrganization, getIctOrganization, getFounder, getWebsite } from '@/utils/schema'
import { routing } from '@/i18n/routing'
import { ogLocale, localizedMetadata } from '@/utils/functions'

// css
import '@/assets/css/global.css'

interface LayoutMetadataProps {
	params: Promise<{ locale: Locale }>
}

// metadata
export async function generateMetadata({ params }: LayoutMetadataProps): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Schema' })

	const title = `Aether Global Pharma | ${t('orgSlogan')}`
	const description = t('orgDescription')
	const { canonical, languages, url: ogUrl } = localizedMetadata('/', locale)

	return {
		metadataBase: new URL(`https://aethergp.com.br`),
		alternates: {
			canonical,
			languages
		},
		title,
		description,
		icons: {
			icon: [
				{ url: '/icon.svg', type: 'image/svg+xml' },
				{ url: '/icon.png', type: 'image/png', sizes: '32x32' },
				{ url: '/icon.png', type: 'image/png', sizes: '96x96' },
				{ url: '/favicon.ico', sizes: 'any' }
			],
			apple: [
				{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
			]
		},
		manifest: '/manifest.json',
		openGraph: {
			title,
			description,
			url: ogUrl,
			siteName: 'Aether Global Pharma',
			images: [
				{
					url: 'https://aethergp.com.br/img/og-image.jpg',
					width: 1280,
					height: 628,
					alt: title
				}
			],
			locale: ogLocale(locale),
			type: 'website'
		},
		// only the card type is set here: `twitter` is inherited by every route, so
		// pinning a title/description/image would override each page's own
		twitter: {
			card: 'summary_large_image'
		}
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
}

const inter = Inter({
	weight: ['400', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

const syne = Syne({
	weight: ['400', '500', '600'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-syne',
	display: 'swap'
})

interface LocaleLayoutProps {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
	children,
	params
}: LocaleLayoutProps) {

	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	const [organization, ictOrganization, founder, website] = await Promise.all([
		getOrganization(locale),
		getIctOrganization(locale),
		getFounder(locale),
		getWebsite(locale)
	])

	return (
		<html
			lang={locale}
			className={clsx(inter.className, syne.className)}
		>

			<head>

				<meta
					name='apple-mobile-web-app-title'
					content='Aether'
				/>

				<link
					rel='icon'
					type='image/svg+xml'
					href='/icon.svg'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/icon.png'
				/>

				<link
					rel='icon'
					type='image/png'
					sizes='96x96'
					href='/icon.png'
				/>

				<link
					rel='shortcut icon'
					href='/favicon.ico'
				/>

				<link
					rel='apple-touch-icon'
					href='/apple-icon.png'
					sizes='180x180'
				/>

				<link
					rel='manifest'
					href='/manifest.json'
				/>

				<JsonLd
					id='jsonld-org'
					data={graph(organization, ictOrganization, founder, website)}
				/>

			</head>

			<body id='start'>

				<NextIntlClientProvider>

					<div id='portal' />
					<div id='overlay' />

					<ViewportHeight />

					<PageTransition>
						<NotFoundProvider>
							<SmoothScroller>

								<Menu />

								<main
									className='relative z-1 '
									data-main-content
								>

									{children}

									<aside data-footer-spacer />

								</main>

								<Footer />

							</SmoothScroller>
						</NotFoundProvider>
					</PageTransition>

					{ process.env.NODE_ENV === 'development' && <Guidelines /> }

				</NextIntlClientProvider>

			</body>

		</html>
	)
}

