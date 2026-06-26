// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from 'next-transition-router'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Hero from './Hero'

// utils
import { pages } from '@/utils/routes'

// img
import bioLab from '@/assets/img/bio-lab.jpg'

// metadata
export const metadata: Metadata = {
	title: 'ICT AetherBio+ - Instituto de Ciência e Tecnologia | Aether',
	description: 'O ICT AetherBio+ impulsiona pesquisas avançadas em saúde e biotecnologia: maturidade tecnológica, governança científica independente e captação de fomento para transformar descobertas em soluções reais.',
	alternates: {
		canonical: '/sobre/ict-aether-bio'
	},
	openGraph: {
		title: 'ICT AetherBio+ - Instituto de Ciência e Tecnologia | Aether',
		description: 'O ICT AetherBio+ impulsiona pesquisas avançadas em saúde e biotecnologia: maturidade tecnológica, governança científica independente e captação de fomento para transformar descobertas em soluções reais.',
		url: 'https://aethergp.com.br/sobre/ict-aether-bio',
		siteName: 'Aether Global Pharma',
		images: [
			{
				url: '/img/og-image.jpg',
				width: 1280,
				height: 628,
				alt: 'ICT AetherBio+'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

const funcoes = [
	{ text: 'Desrisking tecnológico baseado em evidências científicas' },
	{ text: 'Captação de fomento público nacional e internacional' },
	{ text: 'Governança científica independente dos projetos' },
	{ text: 'Gestão do avanço de TRLs sem diluição da propriedade intelectual', href: pages.trl },
	{ text: 'Articulação com universidades, centros de pesquisa e CROs' },
	{ text: 'Geração qualificada de projetos científicos com potencial translacional' }
]

export default function IctAetherBioPage() {
	return (
		<div className='bg-white'>

			<Hero />

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-vinho'>
								<AnimatedText text='(o instituto)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='vinho'
								className='text-60 font-heading font-semibold'
							>
								Um instituto sem fins lucrativos no centro da inovação.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw] text-vinho'>
								<AnimatedText text='Como instituição sem fins lucrativos, o AetherBio+ promove o avanço da maturidade tecnológica das descobertas científicas, assegura a governança científica independente de cada projeto e viabiliza a captação de fomento público nacional e internacional, apoiado por um comitê científico composto por pesquisadores especialistas em diferentes áreas terapêuticas.' />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-vinho'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
								{funcoes.map((item, i) => {
									const inner = (
										<>
											<span
												aria-hidden='true'
												className='block w-4 aspect-square bg-azul-claro mt-1 shrink-0'
												style={{
													maskImage: 'url(/img/svg/logo/icon-bio.svg)',
													WebkitMaskImage: 'url(/img/svg/logo/icon-bio.svg)',
													maskRepeat: 'no-repeat',
													WebkitMaskRepeat: 'no-repeat',
													maskPosition: 'center',
													WebkitMaskPosition: 'center',
													maskSize: 'contain',
													WebkitMaskSize: 'contain'
												}}
											/>
											<span className='text-18 leading-relaxed text-azul-claro'>
												{item.text}
												{item.href && (
													<>
														{' '}
														<Link
															href={item.href}
															className='underline underline-offset-4 decoration-1 hover:text-white'
														>
															Saiba mais
														</Link>
													</>
												)}
											</span>
										</>
									)

									return (
										<div
											key={i}
											className='flex items-start gap-4 bg-sereno px-6 py-5 rounded-sm h-full'
										>
											{inner}
										</div>
									)
								})}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-vinho'>
								<AnimatedText text='(governança)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='vinho'
								className='text-60 font-heading font-semibold'
							>
								Governança científica independente.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg bg-linear-to-br from-safira to-sereno text-azul-claro p-10 lg:p-[3.5vw]'>

								<div className='row'>
									<div className='col-lg-9'>
										<p className='text-24 font-heading leading-snug'>
											Cada projeto do AetherBio+ é acompanhado por um comitê científico formado por pesquisadores especialistas em diferentes áreas terapêuticas, responsável pela validação técnica independente das decisões de desenvolvimento.
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											É essa governança que assegura que cada molécula evolua com rigor científico, conformidade regulatória e geração qualificada de dados - reduzindo incertezas e aumentando a atratividade dos ativos para licenciamento e parcerias industriais.
										</p>
									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>
					<div className='row lg:items-stretch max-lg:flex max-lg:flex-col max-lg:gap-10'>

						<div className='col-lg-6 flex flex-col justify-center lg:pr-[3vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-4 text-vinho'>
								(para pesquisadores)
							</span>

							<AnimatedTitle
								style='vinho'
								className='text-60 font-heading font-semibold'
							>
								Sua pesquisa pode ir além do laboratório.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10 text-vinho'>
								<AnimatedText text='Se você desenvolve uma tecnologia com potencial terapêutico - em universidade, centro de pesquisa ou startup -, o AetherBio+ pode ser o caminho entre a descoberta e o desenvolvimento farmacêutico global. A inscrição é simples, em duas etapas, e toda submissão é tratada com confidencialidade.' />
							</p>

							<div>
								<Button
									style='blue-dark'
									href={pages.inscreva}
									text='Inscreva seu projeto'
									icon='diagonal-arrow'
								/>
							</div>

						</div>

						<div className='col-lg-6'>
							<div className='block relative overflow-hidden w-full max-lg:aspect-3/4 lg:h-full lg:min-h-[120vh] rounded-md lg:rounded-lg'>
								<ScrollingImage>
									<Image
										src={bioLab}
										alt='Pesquisadora ao microscópio no laboratório do AetherBio+'
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

			<section className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-vinho'>
								<AnimatedText text='(plataforma integrada)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='vinho'
								className='text-60 font-heading font-semibold'
							>
								O pilar científico de uma plataforma maior.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg bg-green-dark text-green-light p-10 lg:p-[3.5vw]'>

								<div className='row'>
									<div className='col-lg-8'>

										<span
											aria-hidden='true'
											className='block w-10 lg:w-12 aspect-square bg-green-light mb-8'
											style={{
												maskImage: 'url(/img/svg/logo/icon-gp.svg)',
												WebkitMaskImage: 'url(/img/svg/logo/icon-gp.svg)',
												maskRepeat: 'no-repeat',
												WebkitMaskRepeat: 'no-repeat',
												maskPosition: 'center',
												WebkitMaskPosition: 'center',
												maskSize: 'contain',
												WebkitMaskSize: 'contain'
											}}
										/>

										<p className='text-24 font-heading leading-snug'>
											O AetherBio+ é o pilar científico da plataforma Aether. A dimensão estratégica, jurídica e comercial dos ativos é conduzida pela Aether Global Pharma - holding responsável pela titularidade e valorização da propriedade intelectual.
										</p>

										<div className='mt-10 lg:mt-12'>
											<Button
												style='light-2'
												href={pages.sobreAgp}
												text='Conheça a Aether Global Pharma'
												icon='diagonal-arrow'
											/>
										</div>

									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
