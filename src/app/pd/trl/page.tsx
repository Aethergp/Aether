// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import TRLScale from './TRLScale'

// img
import imgContext from '@/assets/img/stairs.png'

export const metadata: Metadata = {
	title: 'TRL - Níveis de Maturidade Tecnológica | Aether Global Pharma',
	description: 'A escala TRL 1-9 aplicada ao desenvolvimento farmacêutico: do princípio científico à comercialização. Abordagem técnica da Aether, baseada na ISO 16290 e no Guia TRL da RBIF.',
	alternates: {
		canonical: '/pd/trl'
	},
	openGraph: {
		title: 'TRL - Níveis de Maturidade Tecnológica | Aether Global Pharma',
		description: 'A escala TRL 1-9 aplicada ao desenvolvimento farmacêutico: do princípio científico à comercialização. Abordagem técnica da Aether, baseada na ISO 16290 e no Guia TRL da RBIF.',
		url: 'https://aethergp.com.br/pd/trl',
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

const jornada = [
	{
		fase: 'Pesquisa e Descoberta',
		range: 'TRL 1-3',
		subtitle: 'Fundamentos científicos',
		desc: 'Estudos de bancada, hipóteses terapêuticas e primeiras provas de conceito experimentais. A tecnologia ainda está em ambiente acadêmico, com valor principal concentrado em propriedade intelectual inicial.',
		onde: 'Universidades, centros de pesquisa, laboratórios acadêmicos.',
		card: 'bg-white border border-green-dark/12 text-green-dark',
		muted: 'text-green-dark/50',
		divider: 'border-green-dark/12'
	},
	{
		fase: 'Desenvolvimento Pré-Clínico',
		range: 'TRL 4-6',
		subtitle: 'Validação e escala',
		desc: 'Validação laboratorial, estudos pré-clínicos regulatórios e demonstração em ambiente relevante. A tecnologia passa a ser tratada como ativo técnico, com dossiês documentais e submissões iniciais junto a agências reguladoras.',
		onde: 'Laboratórios estruturados, CROs, parcerias industriais.',
		card: 'bg-green-pale text-green-dark',
		muted: 'text-green-dark/55',
		divider: 'border-green-dark/15'
	},
	{
		fase: 'Desenvolvimento Clínico e Operacional',
		range: 'TRL 7-9',
		subtitle: 'Comprovação e mercado',
		desc: 'Ensaios clínicos em humanos, qualificação regulatória e comercialização aprovada. A tecnologia se torna um ativo farmacêutico global, sujeito a licenciamento, parcerias industriais e geração de royalties.',
		onde: 'Centros clínicos, agências reguladoras, indústria farmacêutica.',
		card: 'bg-green-dark text-green-light',
		muted: 'text-green-light/60',
		divider: 'border-green-light/20'
	}
]

const principios = [
	'Governança científica independente a cada estágio, com acompanhamento por comitê especializado.',
	'Documentação técnica alinhada desde o início às exigências regulatórias nacionais e internacionais.',
	'Estratégia de propriedade intelectual construída em paralelo à evolução técnica, com titularidade consolidada.',
	'Captação de fomento público e privado adequada ao TRL em curso.',
	'Articulação com universidades, CROs e parceiros industriais no momento certo do desenvolvimento.',
	'Preparação progressiva para licenciamento e inserção na indústria farmacêutica global.'
]

export default function TRLPage() {
	return (
		<div className='bg-white'>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(maturidade tecnológica)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Nove níveis entre a descoberta científica e o mercado global.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='A escala de Technology Readiness Level - TRL - descreve o percurso completo de uma tecnologia farmacêutica, dos princípios científicos fundamentais à comprovação operacional em uso comercial. É a linguagem comum que conecta pesquisa acadêmica, indústria farmacêutica, agências reguladoras e investidores especializados.' />
							</p>

							<p className='text-15 leading-relaxed mt-8 lg:mt-10 opacity-50 max-w-xl'>
								<AnimatedText text='Baseado na norma NBR ISO 16290:2015 e no Guia TRL da Rede Brasileira de Inovação Farmacêutica.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			{/* Contexto */}
			<section className='relative overflow-hidden'>
				<div className='base-container'>

					<div className='relative w-full aspect-square sm:aspect-4/3 lg:aspect-video rounded-md xl:rounded-xl overflow-hidden'>

						<div className='absolute z-2 inset-0 bg-green-dark mix-blend-screen' />

						<ScrollingImage>
							<Image
								src={imgContext}
								alt='TRL'
								fill
								className='object-cover'
								sizes='100vw'
							/>
						</ScrollingImage>
					</div>

					<div className='row pb-10 lg:pb-[5vw] pt-16 lg:pt-[6vw]'>

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
								Uma linguagem comum para falar de risco, maturidade e valor.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row pt-2 lg:pt-[2vw]'>

						<div className='col-lg-3' />

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(a escala)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='A escala TRL foi desenvolvida pela NASA na década de 1970 e hoje é adotada globalmente como padrão para avaliar a maturidade de tecnologias em desenvolvimento. No setor farmacêutico, ela oferece um vocabulário técnico que permite comparar projetos, dimensionar riscos e tomar decisões de investimento em diferentes estágios - desde a pesquisa básica em universidades até a implantação comercial de um novo medicamento.<br /><br />Cada avanço de nível representa a geração de evidências científicas mais robustas e uma redução mensurável do risco tecnológico. Na Aether, o TRL não é apenas um indicador: é o eixo que organiza a condução científica, o planejamento regulatório, a captação de fomento e a estratégia de propriedade intelectual de cada projeto.' />
							</p>

							<div className='mt-8 lg:mt-10 p-7 lg:p-8 rounded-sm lg:rounded-md bg-green-pale'>
								<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-3'>
									Referência normativa
								</span>
								<p className='text-16 leading-relaxed'>
									A Aether adota como referência técnica a norma <strong className='font-semibold'>NBR ISO 16290:2015</strong> e as adaptações setoriais propostas pelo <strong className='font-semibold'>Guia TRL da RBIF</strong> (Rede Brasileira de Inovação Farmacêutica), com foco no desenvolvimento de novos medicamentos e biofármacos.
								</p>
							</div>
						</div>

					</div>
				</div>

			</section>

			{/* A jornada em três blocos */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(a jornada)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Da bancada ao mercado, em três fases de desenvolvimento.
							</AnimatedTitle>
						</div>

					</div>

					<StaggerUp className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch'>
						{jornada.map((bloco, i) => (
							<div
								key={i}
								className={`flex flex-col gap-5 p-8 lg:p-10 rounded-md lg:rounded-lg h-full ${bloco.card}`}
							>

								<div className='flex items-center justify-between'>
									<span className='text-sm font-semibold font-heading uppercase tracking-wide'>
										{bloco.range}
									</span>

									{/*
									<span className={`text-5xl lg:text-6xl font-heading font-bold leading-none ${bloco.muted}`}>
										{String(i + 1).padStart(2, '0')}
									</span>
									*/}

								</div>

								<h3 className='text-30 font-heading font-semibold leading-tight mt-2'>
									{bloco.fase}
								</h3>

								<span className={`text-18 font-heading font-semibold ${bloco.muted}`}>
									{bloco.subtitle}
								</span>

								<p className='text-18 leading-relaxed opacity-90'>
									{bloco.desc}
								</p>

								<div className={`mt-auto pt-5 border-t ${bloco.divider}`}>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-1'>
										Onde acontece
									</span>
									<p className='text-16 leading-relaxed opacity-80'>
										{bloco.onde}
									</p>
								</div>

							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<section className='relative overflow-hidden h-screen'>

				<div className='absolute z-3 inset-0 bg-green-dark mix-blend-soft-light' />

				<ScrollingImage>
					<video
						loop
						muted
						playsInline
						autoPlay
						className='relative z-2 w-full h-full object-cover'
					>
						<source
							src='/videos/lab.mp4'
							type='video/mp4'
						/>
					</video>
				</ScrollingImage>

			</section>

			{/* Escala completa - os nove níveis */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(os nove níveis)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								A escala completa, nível a nível.
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text='Clique em cada nível para ver a descrição técnica e a tradução correspondente no desenvolvimento farmacêutico. As cores acompanham as três fases da jornada.' />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-12'>
							<TRLScale />
						</div>
					</div>

				</div>
			</section>

			{/* Como a Aether conduz a maturação */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-pale/30'>

				<div className='absolute bottom-0 right-0 w-1/2 max-w-xl opacity-[0.04] pointer-events-none select-none flex items-end justify-end pr-10 pb-10'>
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

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(a abordagem aether)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h2 className='text-60 font-heading font-semibold'>
								<AnimatedText text='Avançar em TRL sem diluir o valor do ativo.' />
							</h2>

							<p className='text-20 leading-relaxed mt-8 lg:mt-10 opacity-90 max-w-3xl'>
								<AnimatedText text='Cada salto de nível na escala TRL representa tanto um avanço técnico quanto uma decisão estratégica. Tão importante quanto gerar as evidências científicas necessárias é preservar integralmente a titularidade, a proteção e o posicionamento global dos ativos de propriedade intelectual ao longo do percurso.' />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
								{principios.map((item, i) => (
									<div
										key={i}
										className='flex items-start gap-4 bg-green-dark text-green-light px-6 py-5 rounded-sm h-full'
									>
										<MaskedIcon
											url='/img/svg/logo/icon-gp.svg'
											className='block w-4 aspect-square bg-green-light mt-1 shrink-0'
										/>
										<span className='text-18 leading-relaxed'>
											{item}
										</span>
									</div>
								))}
							</StaggerUp>

							<blockquote className='mt-12 lg:mt-16 border-l-2 border-green-dark pl-8 lg:pl-10'>
								<p className='text-30 lg:text-36 font-heading font-semibold leading-tight'>
									&ldquo;Gestão do avanço de TRLs sem diluição da propriedade intelectual.&rdquo;
								</p>
								<footer className='text-16 mt-5 opacity-60'>
									- uma das funções centrais do ICT AetherBio+
								</footer>
							</blockquote>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
