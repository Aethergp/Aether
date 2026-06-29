// libraries
import type { Metadata } from 'next'
import { Suspense } from 'react'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import MediaFeed from './MediaFeed'

// utils
import { getMediaPosts } from './db/data'

// metadata
export const metadata: Metadata = {
	title: 'Mídia - Notícias e artigos | Aether Global Pharma',
	description: 'Acompanhe a Aether: artigos sobre ciência, propriedade intelectual e desenvolvimento farmacêutico, além da cobertura da imprensa sobre a plataforma.',
	alternates: {
		canonical: '/midia'
	},
	openGraph: {
		title: 'Mídia - Notícias e artigos | Aether Global Pharma',
		description: 'Acompanhe a Aether: artigos sobre ciência, propriedade intelectual e desenvolvimento farmacêutico, além da cobertura da imprensa sobre a plataforma.',
		url: 'https://aethergp.com.br/midia',
		siteName: 'Aether Global Pharma',
		images: [
			{
				url: '/img/og-image.jpg',
				width: 1280,
				height: 628,
				alt: 'Aether Global Pharma'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

export default function MidiaPage() {

	const posts = getMediaPosts()

	return (
		<div className='bg-white'>

			<section className='pt-36 sm:pt-44 lg:pt-60 2xl:pt-[12vw] pb-12 lg:pb-[5vw]'>
				<div className='base-container'>

					<div className="row">

						<div className="col-lg-3">
							<h3 className='font-semibold font-heading mb-6 lg:pt-1'>
								<AnimatedText text='(mídia)' />
							</h3>
						</div>

						<div className='col-lg-9'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									Ciência, propriedade intelectual e o caminho até o mercado.
								</h1>
							</TextReveal>

						</div>

					</div>

					<div className="row mt-4 lg:mt-[9vw]">
						<div className="col-lg-9 offset-lg-3">
							<p className='text-20 leading-relaxed text-green-dark'>
								<AnimatedText text='Artigos da equipe Aether e a cobertura da imprensa sobre a plataforma, os projetos e o ecossistema de inovação farmacêutica.' />
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
