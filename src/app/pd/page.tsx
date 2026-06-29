// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import Button from '@/components/Button'
import PDDimensoes from './PDDimensoes'

// utils
import { pages } from '@/utils/routes'

export const metadata: Metadata = {
	title: 'P&D - Pesquisa e Desenvolvimento | Aether Global Pharma',
	description: 'Abordagem científica da Aether: maturação de TRL, governança científica independente e proteção integral da propriedade intelectual na condução de projetos farmacêuticos globais.',
	alternates: {
		canonical: '/pd'
	},
	openGraph: {
		title: 'P&D - Pesquisa e Desenvolvimento | Aether Global Pharma',
		description: 'Abordagem científica da Aether: maturação de TRL, governança científica independente e proteção integral da propriedade intelectual na condução de projetos farmacêuticos globais.',
		url: 'https://aethergp.com.br/pd',
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

const criterios = [
	{
		title: 'Fundamentação científica robusta',
		text: 'Hipóteses sustentadas por evidências experimentais, metodologia reproduzível e dados técnicos ou publicações que permitam avaliação por pares.'
	},
	{
		title: 'Potencial translacional',
		text: 'Caminho identificável entre a descoberta científica e uma aplicação terapêutica concreta - medicamento, biofármaco, terapia avançada ou plataforma tecnológica associada.'
	},
	{
		title: 'Propriedade intelectual protegível',
		text: 'Titularidade clara, ineditismo técnico verificável e potencial de proteção por patente ou regime equivalente ao longo do avanço de TRL.'
	},
	{
		title: 'Origem em pesquisadores, startups ou instituições',
		text: 'Projetos originados em universidades, centros de pesquisa, institutos de ciência e tecnologia, startups de base científica ou colaborações entre esses atores - no Brasil ou no exterior.'
	}
]

const governancaPills = [
	'Instituição sem fins lucrativos',
	'Governança independente',
	'Comitê científico multidisciplinar'
]

export default function PDPage() {
	return (
		<div className='bg-white'>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(pesquisa & desenvolvimento)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Da descoberta científica ao ativo farmacêutico global.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='Conduzimos o desenvolvimento científico e tecnológico dos projetos da plataforma com governança independente, maturação progressiva de TRL e proteção integral da propriedade intelectual. Cada projeto avança sustentado por evidências científicas robustas e por um comitê científico de especialistas.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			{/* Contexto */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw]'>

				<StrokePath
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					viewBox='0 0 657 1636'
					className='-z-1 top-[5%] -left-2 w-vw sm:w-[45vw]'
					start='10% 80%'
					end='50% 20%'
				/>

				<div className='base-container'>
					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-8 lg:pb-0'>
							<MaskedIcon
								url='/img/svg/logo/icon-bio.svg'
								className='block w-8 md:w-10 lg:w-12 aspect-square bg-green-dark'
							/>
						</div>

						<div className='col-lg-8'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								O desenvolvimento farmacêutico exige mais do que ciência.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row pt-2 lg:pt-[4vw]'>

						<div className='col-lg-3' />

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(a abordagem)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='Traduzir uma descoberta científica em um ativo farmacêutico global é um percurso longo e multidisciplinar. Exige validação técnica independente, avanço progressivo de maturidade tecnológica, captação de fomento qualificado e uma estratégia de propriedade intelectual construída desde os primeiros estágios.<br /><br />Na plataforma Aether, esse percurso é conduzido pelo ICT AetherBio+ - instituto de ciência, tecnologia e inovação responsável pela condução científica e tecnológica de cada projeto, com governança independente e rigor metodológico.' />
							</p>
						</div>

					</div>
				</div>

			</section>

			{/* Quatro dimensões */}
			<PDDimensoes />

			{/* Perfil dos projetos */}
			<section className='pt-16 lg:pt-[8vw] pb-16 lg:pb-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(perfil dos projetos)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								O que a Aether avalia.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<p className='text-20 leading-relaxed pb-10 lg:pb-[3vw]'>
								<AnimatedText text='A plataforma Aether é translacional por natureza - avalia projetos científicos em biotecnologia e saúde humana com potencial de transformação em ativos farmacêuticos globais. Na prática, priorizamos projetos com as seguintes características:' />
							</p>
						</div>
					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{criterios.map((item, i) => (
									<div
										key={i}
										className='flex flex-col gap-4 p-8 lg:p-10 rounded-sm lg:rounded-md bg-green-pale h-full'
									>
										<h3 className='text-24 font-heading font-semibold'>
											{item.title}
										</h3>
										<p className='text-18 leading-relaxed'>
											{item.text}
										</p>
									</div>
								))}
							</StaggerUp>
						</div>
					</div>

				</div>
			</section>

			{/* As duas frentes */}
			<section className='py-16 lg:py-[8vw] bg-green-pale/40'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(nossas frentes)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Como estruturamos a pesquisa e o desenvolvimento.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>
						<StaggerUp className='col-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6'>

							<div>
								<div className='flex flex-col gap-6 p-10 lg:p-[3vw] rounded-md lg:rounded-lg bg-green-dark text-green-light h-full overflow-hidden relative'>

									<div className='absolute bottom-0 right-0 text-[12rem] leading-none font-heading font-bold text-green-pale/5 select-none pointer-events-none'>
										PI
									</div>

									<span className='text-sm font-semibold opacity-60 uppercase tracking-wide'>
										Projetos em desenvolvimento
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										Pipeline
									</h2>

									<p className='text-18 leading-relaxed opacity-90 relative z-1 max-w-sm'>
										Conheça os projetos em andamento na plataforma Aether, organizados por estágio de maturidade tecnológica, área terapêutica e status atual do desenvolvimento.
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='light-2'
											href={pages.pdPipeline}
											text='Explorar pipeline'
											icon='diagonal-arrow'
										/>
									</div>

								</div>
							</div>

							<div>
								<div className='flex flex-col gap-6 p-10 lg:p-[3vw] rounded-md lg:rounded-lg border border-green-dark/20 bg-white h-full overflow-hidden relative'>

									<div className='absolute bottom-0 right-0 text-[10rem] leading-none font-heading font-bold text-green-pale/10 select-none pointer-events-none'>
										TRL
									</div>

									<span className='text-sm font-semibold opacity-60 uppercase tracking-wide'>
										Níveis TRL 1-9
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										Maturidade tecnológica
									</h2>

									<p className='text-18 leading-relaxed relative z-1 max-w-sm'>
										A jornada completa de um ativo farmacêutico, detalhada nível a nível - dos princípios científicos básicos a implantação comercial comprovada.
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='dark'
											href={pages.trl}
											text='Conhecer os níveis TRL'
											icon='diagonal-arrow'
										/>
									</div>

								</div>
							</div>

						</StaggerUp>
					</div>

				</div>
			</section>

			{/* Governança */}
			<section className='pb-16 lg:pb-[8vw] bg-green-pale/40 overflow-hidden relative'>

				<div className='absolute bottom-0 right-0 w-1/2 max-w-xl opacity-5 pointer-events-none select-none flex items-end justify-end pr-10 pb-10'>
					<Image
						src='/img/svg/logo/icon-bio.svg'
						alt=''
						width={400}
						height={400}
						className='w-full h-auto'
						aria-hidden
					/>
				</div>

				<div className='base-container relative z-1'>
					<div className='row'>

						<div className='col-lg-8 offset-lg-3'>

							<h2 className='text-48 font-heading font-semibold mb-8 lg:mb-10'>
								<AnimatedText text='Governança científica que valida cada passo.' />
							</h2>

							<p className='text-20 leading-relaxed opacity-70 mb-10 lg:mb-12 max-w-2xl'>
								<AnimatedText text='O ICT AetherBio+ é uma instituição sem fins lucrativos apoiada por um comitê científico independente, formado por pesquisadores com atuação consolidada em diferentes áreas terapêuticas. O comitê assegura validação técnica, rigor metodológico e independência científica em cada projeto conduzido pela plataforma.' />
							</p>

							<StaggerUp className='flex flex-wrap gap-3 mb-10 lg:mb-12'>
								{governancaPills.map((label, i) => (
									<span
										key={i}
										className='inline-flex items-center px-5 py-3 rounded-full border border-green-dark/30 text-15 font-semibold text-green-dark'
									>
										{label}
									</span>
								))}
							</StaggerUp>

							<Button
								style='blue-dark'
								href={pages.sobreIct}
								text='Conheça o ICT AetherBio+'
								icon='diagonal-arrow'
							/>

						</div>

					</div>
				</div>

			</section>

		</div>
	)
}
