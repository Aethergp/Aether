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
	title: 'Desenvolvimento de Ativos - Pesquisa e Desenvolvimento | Aether Global Pharma',
	description: 'Abordagem científica da Aether: maturação de TRL, governança científica independente e proteção integral da propriedade intelectual na condução de projetos farmacêuticos globais.',
	alternates: {
		canonical: '/desenvolvimento-de-ativos'
	},
	openGraph: {
		title: 'Desenvolvimento de Ativos - Pesquisa e Desenvolvimento | Aether Global Pharma',
		description: 'Abordagem científica da Aether: maturação de TRL, governança científica independente e proteção integral da propriedade intelectual na condução de projetos farmacêuticos globais.',
		url: 'https://aethergp.com.br/desenvolvimento-de-ativos',
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
		text: 'Hipóteses sustentadas por evidências experimentais, metodologia tecnicamente consistente e dados que permitam análise crítica, validação e definição dos próximos marcos de desenvolvimento.'
	},
	{
		title: 'Potencial translacional',
		text: 'Possibilidade concreta de transformar a descoberta científica em uma solução terapêutica ou tecnologia aplicável ao desenvolvimento farmacêutico.'
	},
	{
		title: 'Potencial de propriedade intelectual',
		text: 'Capacidade de construção ou fortalecimento de uma posição de propriedade intelectual que contribua para a exclusividade, defensibilidade e valor estratégico do ativo.'
	},
	{
		title: 'Potencial de desenvolvimento e monetização',
		text: 'Existência de uma trajetória tecnicamente viável de desenvolvimento e de uma hipótese clara de geração de valor por meio de licenciamento, parceria estratégica, transferência de tecnologia ou outra operação relacionada ao ativo.'
	}
]

const governancaPills = [
	'Instituição sem fins lucrativos',
	'Ciência e tecnologia',
	'Governança científica especializada',
	'Desenvolvimento translacional'
]

export default function DesenvolvimentodeAtivos() {
	return (
		<div className='bg-white'>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(desenvolvimento de ativos)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Da descoberta científica ao ativo farmacêutico global.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='Na Aether, pesquisa e desenvolvimento são orientados à construção de valor. <br /><br />Como uma <b>Pharmaceutical Asset Venture Builder</b>, identificamos e desenvolvemos descobertas científicas com potencial de se tornarem ativos farmacêuticos protegidos, tecnicamente validados e estrategicamente posicionados para licenciamento, parceria industrial ou outras operações de monetização. <br /><br />Cada ativo avança por uma jornada estruturada de desrisking científico e tecnológico, maturação de TRL, estratégia de propriedade intelectual e governança especializada.' />
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
								Uma descoberta científica ainda não é um ativo farmacêutico.
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
								<AnimatedText text='Transformar ciência em um ativo farmacêutico exige mais do que gerar resultados experimentais. Exige identificar o potencial de aplicação, construir proteção intelectual, reduzir incertezas críticas e gerar as evidências necessárias para aumentar progressivamente a maturidade e o valor do ativo. <br /><br /> Na plataforma Aether, o desenvolvimento é orientado por uma lógica de asset building: cada decisão científica, tecnológica e estratégica deve contribuir para tornar o ativo mais robusto, protegível e atrativo para futuros parceiros industriais, licenciados e investidores especializados em life sciences. <br /><br />A execução científica e tecnológica é conduzida em articulação com o ICT AetherBio+, universidades, centros de pesquisa, especialistas e parceiros tecnológicos, dentro de uma governança estruturada para cada ativo.' />
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
								<AnimatedText text='(perfil dos ativos)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								O que buscamos construir.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<p className='text-20 leading-relaxed pb-10 lg:pb-[3vw]'>
								<AnimatedText text='A Aether identifica e seleciona descobertas científicas e tecnologias em saúde com potencial de transformação em ativos farmacêuticos protegidos, desenvolvíveis e licenciáveis. Priorizamos oportunidades que apresentem uma combinação consistente dos seguintes atributos:' />
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

							<p className='text-20 leading-relaxed pt-6'>
								As oportunidades podem se originar em universidades, ICTs, centros de pesquisa, startups científicas, pesquisadores independentes e outras organizações de inovação, no Brasil ou no exterior.
							</p>

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
								<AnimatedText text='(nossa plataforma de desenvolvimento)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Uma plataforma para construir e maturar ativos farmacêuticos.
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
										Ativos em desenvolvimento
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										Pipeline
									</h2>

									<p className='text-18 leading-relaxed opacity-90 relative z-1 max-w-sm'>
										Conheça os ativos que integram o pipeline da Aether, organizados por estágio de maturidade, área terapêutica e status de desenvolvimento.
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='light-2'
											href={pages.pdPipeline}
											text='Explorar o pipeline'
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
										Maturidade tecnológica
									</span>

									<h2 className='text-48 font-heading font-semibold relative z-1'>
										Jornada de desenvolvimento
									</h2>

									<p className='text-18 leading-relaxed relative z-1 max-w-sm'>
										Acompanhe a evolução dos ativos ao longo dos níveis de maturidade tecnológica e os principais marcos associados à redução de risco e à geração de valor.
									</p>

									<div className='mt-auto pt-4 relative z-1'>
										<Button
											style='dark'
											href={pages.trl}
											text='Conhecer os níveis de TRL'
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
								<AnimatedText text='Ciência e tecnologia integradas à construção dos ativos.' />
							</h2>

							<p className='text-20 leading-relaxed opacity-70 mb-10 lg:mb-12 max-w-2xl'>
								<AnimatedText text='O ICT AetherBio+ integra a plataforma Aether como ambiente institucional de ciência, tecnologia e inovação, apoiando a execução e a governança do desenvolvimento científico e tecnológico dos ativos. Em articulação com universidades, centros de pesquisa, especialistas e parceiros tecnológicos, o ICT contribui para a geração de evidências, o avanço de maturidade tecnológica e a execução dos programas de desenvolvimento definidos para cada ativo. Essa arquitetura permite conectar ciência, propriedade intelectual, capital e estratégia de desenvolvimento em uma única tese de construção de valor.' />
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
								style='dark'
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
