// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'

// utils
import { partners } from '@/utils/partners'
import { pages } from '@/utils/routes'

// img
import partnership from '@/assets/img/banner.jpg'
import scientists from '@/assets/img/scientists.jpg'
import abstract from '@/assets/img/abstract.jpg'

// metadata
export const metadata: Metadata = {
	title: 'Parceiros - Ecossistema científico e institucional | Aether Global Pharma',
	description: 'Conheça as universidades, centros de pesquisa e instituições de inovação que compõem o ecossistema científico da Aether Global Pharma, e descubra como se tornar um parceiro.',
	alternates: {
		canonical: '/parceiros'
	},
	openGraph: {
		title: 'Parceiros - Ecossistema científico e institucional | Aether Global Pharma',
		description: 'Conheça as universidades, centros de pesquisa e instituições de inovação que compõem o ecossistema científico da Aether Global Pharma, e descubra como se tornar um parceiro.',
		url: 'https://aethergp.com.br/parceiros',
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

export default function ParceirosPage() {
	return (
		<div className='bg-white'>

			<section className='bg-green-dark text-green-light pt-40 sm:pt-48 lg:pt-64 2xl:pt-[14vw] overflow-hidden'>

				<div className='absolute z-0 top-0 left-0 w-full h-3/4 opacity-50'>

					<div className='absolute z-1 top-0 left-0 w-full h-full from-green-dark to-green-dark/0 bg-linear-to-t' />

					<Image
						src={abstract}
						alt='Background'
						fill
						className='cover'
						sizes='100vw'
					/>
				</div>

				<div className='base-container relative z-2 pb-8 lg:pb-[3vw]'>
					<div className='row'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading mb-6 lg:pt-1'>
								<AnimatedText text='(parceiros)' />
							</h3>
						</div>

						<div className='col-lg-9'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-light'>
									Um ecossistema científico e institucional de alto nível
								</h1>
							</TextReveal>

							<p className='text-20 mt-6 lg:mt-8 lg:pr-[8vw] opacity-90'>
								<AnimatedText text='A plataforma Aether opera em colaboração com universidades, centros de pesquisa e instituições de inovação que sustentam o desenvolvimento dos nossos ativos, da pesquisa básica à produção em escala.' />
							</p>

						</div>

					</div>

				</div>

				<div className='base-container relative z-2 pb-10 lg:pb-[5vw]'>

					<div className='absolute z-0 bottom-0 -left-30 w-[120%] h-1/2 bg-white' />

					<div className='row relative z-2'>
						<div className='col-lg-9 offset-lg-3'>
							<div className='block relative overflow-hidden w-full aspect-4/3 md:aspect-video rounded-md'>
								<ScrollingImage>
									<Image
										src={scientists}
										alt='Pesquisadores'
										fill
										className='cover'
										loading='lazy'
										sizes='100vw'
									/>
								</ScrollingImage>
							</div>
						</div>
					</div>
				</div>

			</section>

			<section className='pb-16 lg:pb-[7vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-2 col-xl-3' />

						<div className='col-lg-10 col-xl-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Quem está junto da Aether
							</AnimatedTitle>
						</div>

					</div>

					<StaggerScale
						className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px'
						infinite
					>
						{partners.map((item, i) => (
							<div
								key={i}
								className='flex items-center justify-center w-full h-auto aspect-square bg-white border border-gray-lighter/25 p-8 xs:p-10 sm:p-12 transition-colors duration-200 hover:border-green-dark group'
							>
								<Image
									src={item.src}
									alt={item.alt}
									width={item.width}
									height={item.height}
									className='block w-full max-w-[85%] max-h-[55%] h-auto object-contain brightness-0 opacity-75 group-hover:opacity-100 transition-opacity duration-200'
								/>
							</div>
						))}
					</StaggerScale>

				</div>

			</section>

			<section className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]'>
				<div className='base-container'>

					<div className='relative overflow-hidden bg-green-dark text-green-light rounded-md lg:rounded-lg lg:grid lg:grid-cols-2'>

						<div className='flex flex-col justify-center p-10 md:p-16 lg:p-[5vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-70 mb-6'>
								(seja um parceiro)
							</span>

							<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text='Quer construir o futuro da inovação farmacêutica com a Aether?' />
							</h2>

							<p className='text-20 mt-6 lg:mt-8 opacity-90'>
								Buscamos universidades, ICTs, centros de pesquisa, parceiros industriais e investidores especializados que compartilhem o compromisso de transformar ciência em ativos com impacto global. Fale com a nossa equipe e vamos explorar caminhos de colaboração.
							</p>

							<div className='mt-10 lg:mt-12'>
								<Button
									style='light-2'
									href={pages.contato}
									text='Seja um parceiro'
									icon='diagonal-arrow'
								/>
							</div>

						</div>

						<div className='relative overflow-hidden min-h-136 max-lg:hidden'>
							<ScrollingImage>
								<Image
									src={partnership}
									alt='Pesquisa científica na plataforma Aether'
									fill
									className='cover'
									sizes='(max-width: 1024px) 100vw, 50vw'
								/>
							</ScrollingImage>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
