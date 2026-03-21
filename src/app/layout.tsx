// libraries
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import clsx from 'clsx'
import type { Viewport } from 'next'

// components
import Menu from '@/components/Menu'
import SmoothScroller from '@/components/Utils/SmoothScroller'
import Guidelines from '@/components/Utils/Guidelines'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import PageTransition from '@/components/Utils/PageTransition'
import ViewportHeight from '@/components/Utils/ViewportHeight'

// css
import '@/assets/css/global.css'

// metadata
export const metadata: Metadata = {
	metadataBase: new URL(`https://aethergp.com.br`),
	alternates: {
        canonical: './',
    },
	title: 'Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica',
	description: 'Aether Global Pharma é uma empresa farmacêutica global que conecta pesquisa científica, indústria e bem-estar humano. Atuamos com inovação, propósito e consciência para transformar descobertas em soluções reais para a saúde.',
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
		title: 'Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica',
		description: 'Aether Global Pharma é uma empresa farmacêutica global que conecta pesquisa científica, indústria e bem-estar humano. Atuamos com inovação, propósito e consciência para transformar descobertas em soluções reais para a saúde.',
		url: 'https://aethergp.com.br',
		siteName: 'Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica',
		images: [
			{
				url: 'https://aethergp.com.br/img/og-image.png',
				width: 1280,
				height: 628,
				alt: 'Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
}

import { Inter, Syne } from 'next/font/google'

const inter = Inter({
	weight: ['400', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap'
})

const syne = Syne({
	weight: ['400', '500'],
	style: ['normal'],
	subsets: ['latin'],
	variable: '--font-syne',
	display: 'swap'
})

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({
	children
}:RootLayoutProps ) {

	// schema
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica",
		"legalName": "Aether Global Pharma | Inovação, Espiritualidade e Ciência Farmacêutica LTDA",
		"url": "https://aethergp.com.br",
		"logo": "https://aethergp.com.br/img/og-image.jpg",
		"description": "Aether Global Pharma é uma empresa farmacêutica global que conecta pesquisa científica, indústria e bem-estar humano. Atuamos com inovação, propósito e consciência para transformar descobertas em soluções reais para a saúde.",
		/*
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "Av. Rep. Argentina, 1228",
			"addressLocality": "Vila Izabel, Curitiba",
			"addressRegion": "PR",
			"postalCode": "80610-260",
			"addressCountry": "BR"
		},
		*/
		"contactPoint": [
			{
				"@type": "ContactPoint",
				"email": "poliveira@aethergp.com",
				"contactType": "customer support"
			}
		],
		"email": "poliveira@aethergp.com",
		"sameAs": [
			"https://www.instagram.com/aetherglobalpharma/"
		],
		"keywords": [
			"Aether Global Pharma",
			"empresa farmacêutica global",
			"pesquisa farmacêutica",
			"inovação em saúde",
			"biotecnologia",
			"ICT AetherBio+",
			"Instituto de Ciência e Tecnologia",
			"desenvolvimento de moléculas",
			"patentes farmacêuticas",
			"indústria farmacêutica Brasil Canadá"
		]
	}

	return (
		<html
			lang='pt-BR'
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

				<Script
					id='jsonld'
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<GoogleAnalytics gaId='' />

			</head>

			<body id='start'>

				<div id='portal' />
				<div id='overlay' />

				<ViewportHeight />

				{/* <Preloader /> */}

				<PageTransition>
					<SmoothScroller>

						<Menu />

						<main
							className='relative z-1 pb-[100lvh]'
							data-main-content
						>
							{children}

							<aside data-footer-spacer />
							
						</main>

						<Footer />

					</SmoothScroller>
				</PageTransition>

				{ process.env.NODE_ENV === 'development' && <Guidelines /> }

			</body>

		</html>
	)
}

