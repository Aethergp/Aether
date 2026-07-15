// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from 'next-transition-router'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Hero from './Hero'

// utils
import { pages } from '@/utils/routes'

// img
import bioLab from '@/assets/img/team.jpg'

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
	{ text: 'Desrisking científico e tecnológico orientado à construção de ativos farmacêuticos' },
	{ text: 'Governança científica e gestão estruturada do avanço de maturidade tecnológica' },
	{ text: 'Articulação com universidades, centros de pesquisa, CROs e parceiros especializados' },
	{ text: 'Estruturação e qualificação de projetos científicos com potencial translacional' },
	{ text: 'Captação e articulação de fomento público e recursos não dilutivos, nacionais e internacionais' },
	{ text: 'Geração de evidências e avanço de TRLs para redução de incertezas e valorização dos ativos', href: pages.trl }
]

export default function IctAetherBioPage() {
	return (
		<div className='bg-white'>

			<Hero />

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-wine lg:pt-2'>
								<AnimatedText text='(o instituto)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								Um ICT dedicado ao avanço da maturidade tecnológica de projetos farmacêuticos.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw] text-wine'>
								<AnimatedText text='Como instituição de ciência, tecnologia e inovação sem fins lucrativos, o ICT AetherBio+ promove o avanço da maturidade de projetos científicos com potencial terapêutico. Sua atuação integra governança científica, articulação de competências especializadas, geração de evidências e acesso a mecanismos de fomento, criando condições para reduzir incertezas e apoiar a evolução dos projetos ao longo da jornada de desenvolvimento farmacêutico.' />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading text-wine'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
								{funcoes.map((item, i) => {
									const inner = (
										<>
											<MaskedIcon
												url='/img/svg/logo/icon-bio.svg'
												className='block w-4 aspect-square bg-light-blue mt-1 shrink-0'
											/>
											<span className='text-18 leading-relaxed text-light-blue'>
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
											className='flex items-start gap-4 bg-navy-mid px-6 py-5 rounded-sm h-full'
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
							<h3 className='font-semibold font-heading text-wine lg:pt-2'>
								<AnimatedText text='(governança)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								Governança científica independente.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg bg-navy-mid text-light-blue p-10 lg:p-[3.5vw]'>

								<div className='row'>
									<div className='col-lg-9'>
										<p className='text-24 font-heading leading-snug'>
											Cada projeto é acompanhado por uma governança científica especializada, responsável por apoiar a avaliação técnica e as decisões críticas ao longo de seu desenvolvimento.
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											A atuação multidisciplinar fortalece o rigor científico, a qualidade das evidências e a consistência das decisões, contribuindo para a redução progressiva de riscos e para a construção de ativos farmacêuticos mais robustos.
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

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-4 text-wine'>
								(para pesquisadores)
							</span>

							<AnimatedTitle
								style="wine"
								className='text-60 font-heading font-semibold'
							>
								Sua pesquisa pode ir além do laboratório.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10 text-wine'>
								<AnimatedText text='Se você desenvolve uma tecnologia com potencial terapêutico em uma universidade, centro de pesquisa ou outro ambiente científico, o ICT AetherBio+ pode contribuir para construir o caminho entre a descoberta científica e as próximas etapas do desenvolvimento farmacêutico. Projetos submetidos à plataforma passam por um processo estruturado de avaliação, com confidencialidade e análise de seu potencial científico, tecnológico e translacional.' />
							</p>

							<div>
								<Button
									style='blue-dark'
									href={pages.inscreva}
									text='Submeta seu projeto'
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
							<h3 className='font-semibold font-heading text-green-dark lg:pt-2'>
								<AnimatedText text='(plataforma integrada)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								O pilar científico e tecnológico de uma plataforma integrada.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg text-green-light p-10 lg:p-[3.5vw]' style={{ background: 'linear-gradient(106deg, rgba(85,83,40,1) 0%, rgba(60,64,44,1) 26%, rgba(56,45,50,1) 62%, rgba(39,39,59,1) 100%)' }}>

								<div className='row'>
									<div className='col-lg-8'>

										<MaskedIcon
											url='/img/svg/logo/icon-gp.svg'
											className='block w-10 lg:w-12 aspect-square bg-green-light mb-8'
										/>

										<p className='text-24 font-heading leading-snug'>
											O ICT AetherBio+ promove o avanço científico e tecnológico dos projetos, a geração de evidências e a redução progressiva de riscos. A Aether Global Pharma conduz a estratégia de construção e valorização dos ativos, integrando propriedade intelectual, capital, parcerias e licenciamento.
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											Juntas, as duas entidades conectam ciência, desenvolvimento, capital e indústria para construir e valorizar ativos farmacêuticos com potencial global.
										</p>

										<div className='mt-10 lg:mt-12'>
											<Button
												style='light'
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
