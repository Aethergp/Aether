// libraries
import type { Metadata } from 'next'
import clsx from 'clsx'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import Context from './Context'
import Timeline from './Timeline'
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import ContactBanner from '@/components/ContactBanner'
import JsonLd from '@/components/JsonLd'

// utils
import { pages } from '@/utils/routes'
import { pageGraph } from '@/utils/schema'

// img
import scientists from '@/assets/img/team-2.jpg'

// metadata
export const metadata: Metadata = {
	title: 'Sobre a Aether - Plataforma de ativos farmacêuticos',
	description: 'Conheça a Aether: a plataforma que une a construção e valorização de ativos farmacêuticos ao instituto de ciência e tecnologia ICT AetherBio+.',
	alternates: {
		canonical: '/sobre'
	},
	openGraph: {
		title: 'Sobre a Aether - Plataforma de ativos farmacêuticos',
		description: 'Conheça a Aether: a plataforma que une a construção e valorização de ativos farmacêuticos ao instituto de ciência e tecnologia ICT AetherBio+.',
		url: 'https://aethergp.com.br/sobre',
		siteName: 'Aether Global Pharma',
		images: [
			{
				url: '/img/og/sobre.jpg',
				width: 1200,
				height: 630,
				alt: 'Aether Global Pharma'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

const valores = [
	{
		title: 'Ciência',
		text: 'Selecionamos pesquisas com elevado potencial terapêutico e conduzimos seu desenvolvimento com rigor técnico, visão translacional e foco em aplicação industrial.'
	},
	{
		title: 'Propriedade Intelectual',
		text: 'Transformamos conhecimento científico em ativos farmacêuticos por meio de desenvolvimento tecnológico, desrisking e estratégia integrada de propriedade intelectual.'
	},
	{
		title: 'Licenciamento Global',
		text: 'Posicionamos ativos para conexão com a indústria farmacêutica, investidores e parceiros estratégicos, ampliando seu potencial de transferência tecnológica e comercialização.'
	}
]

const timeline = [
	{
		year: '2000',
		title: 'Origem na indústria farmacêutica',
		text: 'Início da atuação da fundadora em qualidade, produção industrial, assuntos regulatórios e desenvolvimento farmacêutico.'
	},
	{
		year: '2005',
		title: 'Expansão em projetos industriais',
		text: 'Atuação em projetos de implantação, validação, desenvolvimento industrial e gestão estratégica no setor farmacêutico.'
	},
	{
		year: '2013',
		title: 'Consolidação da experiência internacional',
		text: 'Participação em projetos de desenvolvimento tecnológico, transferência de tecnologia e gestão de operações farmacêuticas de alta complexidade.'
	},
	{
		year: '2020',
		title: 'Evolução para a construção de ativos tecnológicos',
		text: 'A experiência acumulada evidencia uma oportunidade: transformar ciência em ativos farmacêuticos estruturados para licenciamento.'
	},
	{
		year: '2025',
		title: 'Fundação da Aether Global Pharma',
		text: 'Nasce uma empresa dedicada à construção, desenvolvimento e monetização de ativos farmacêuticos.'
	},
	{
		year: '2025',
		title: 'Criação do ICT AetherBio+',
		text: 'Constituição do braço científico da plataforma para acelerar a maturação tecnológica das pesquisas.'
	},
	{
		year: '2026',
		title: 'Consolidação da Plataforma Aether',
		text: 'Captação de projetos estratégicos, fomento federal, parcerias científicas e expansão da atuação como plataforma integrada de desenvolvimento de ativos farmacêuticos.'
	}
]

const pilares = [
	{
		eyebrow: 'Pharmaceutical Asset Venture Builder',
		icon: '/img/svg/logo/icon-gp.svg',
		iconColor: 'bg-green-light',
		name: 'Aether Global Pharma',
		text: 'Responsável pela estratégia empresarial da plataforma, conduzindo desenvolvimento dos ativos, propriedade intelectual, estruturação financeira, parcerias estratégicas e licenciamento internacional.',
		href: pages.sobreAgp,
		cta: 'Conhecer a AGP',
		cardClass: 'bg-green-dark text-green-light',
		buttonStyle: 'light-2' as const
	},
	{
		eyebrow: 'Pilar Científico',
		icon: '/img/svg/logo/icon-bio-green-dark.svg',
		iconColor: 'bg-white',
		name: 'ICT AetherBio+',
		text: 'Instituição científica responsável pelo avanço tecnológico dos projetos, governança científica, coordenação das pesquisas, desrisking e interação com universidades, centros de pesquisa e agências de fomento.',
		href: pages.sobreIct,
		cta: 'Conhecer o Bio+',
		cardClass: 'bg-linear-to-br from-sapphire to-navy-mid text-white',
		buttonStyle: 'white' as const
	}
]

// temporary placeholder addresses - same as /contato until the client confirms the real ones (~2 months, parques tecnológicos)
const presenca = [
	{
		country: 'Brasil',
		lead: 'Origem e núcleo científico da plataforma.',
		offices: [
			{ eyebrow: 'Sede', city: 'Curitiba, PR', lines: ['Rua José Casemiro Stenzowski, 21D', 'Novo Mundo', 'CEP 81010-370'] },
			{ eyebrow: 'Filial', city: 'Campinas, SP', lines: ['Rua José Casemiro Stenzowski, 21D', 'Novo Mundo', 'CEP 81010-370'] }
		]
	},
	{
		country: 'Canadá',
		lead: 'Braço internacional, interface com parceiros industriais e mercados globais.',
		offices: [
			{ eyebrow: 'Operação internacional', city: 'A confirmar', lines: ['Endereço da operação canadense', 'em definição'] }
		]
	}
]

export default function SobrePage() {
	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-sobre'
				data={pageGraph({
					type: 'AboutPage',
					path: '/sobre',
					name: metadata.title as string,
					description: metadata.description as string,
					trail: [
						{ name: 'Sobre', item: '/sobre' }
					]
				})}
			/>

			<section className='relative overflow-hidden text-green-light mask-clip-fill' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

				<div className='fixed inset-0 z-0 w-lvw h-lvh'>
					<Grainient
						className='w-full h-full'
						color1='#555328'
						color2='#90916c'
						color3='#555328'
						timeSpeed={0.9}
						colorBalance={0}
						warpStrength={1}
						warpFrequency={11.3}
						warpSpeed={3.2}
						warpAmplitude={41}
						blendAngle={36}
						blendSoftness={0.54}
						rotationAmount={430}
						noiseScale={2.2}
						grainAmount={0.06}
						grainScale={0.7}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={-0.12}
						centerY={0.48}
						zoom={0.65}
					/>
				</div>

				<div className='absolute inset-0 z-1 bg-green-dark/35' />

				<div className='relative z-2'>

					<div className='relative flex flex-col justify-end h-svh min-h-lvh'>

						<div className='base-container relative z-2 pb-12 lg:pb-[3vw]'>
							<div className='row'>
								<div className='col-lg-10'>
									<h1 className='text-72 font-heading font-bold text-green-light'>
										Ciência <br />
										Propriedade Intelectual <br />
										Licenciamento Global
									</h1>
								</div>
							</div>
						</div>

					</div>

					<div className='base-container py-12 lg:py-[6vw]'>
						<div className='row'>

							<div className='col-lg-3' />

							<div className='col-lg-9'>
								<p className='text-24 font-heading lg:pr-[6vw]'>
									<AnimatedText text='Um novo modelo para transformar ciência em valor.' />
								</p>

								<p className='text-20 leading-relaxed mt-8 lg:mt-10 lg:pr-[12vw] opacity-90'>
									<AnimatedText text='A maior parte das descobertas científicas nunca chega ao mercado. Não por falta de mérito científico, mas porque poucas tecnologias percorrem toda a jornada necessária para se tornarem ativos farmacêuticos atrativos para a indústria. <br /><br /> A Plataforma Aether foi criada para preencher essa lacuna, conectando pesquisa, desenvolvimento, propriedade intelectual, capital e estratégia de mercado em um modelo estruturado de geração de valor.' />
								</p>
							</div>

						</div>
					</div>

					<div className='base-container pb-20 lg:pb-[8vw] pt-8 lg:pt-[2vw]'>

						<div className='row pb-10 lg:pb-[5vw]'>

							<div className='col-lg-3 pb-4 lg:pb-0'>
								<p className='font-semibold font-heading'>
									<AnimatedText text='(nossos valores)' />
								</p>
							</div>

							<div className='col-lg-9'>
								<h2 className='text-60 font-heading font-semibold'>
									<AnimatedText text='Três princípios orientam todas as decisões.' />
								</h2>
							</div>

						</div>

						<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
							{valores.map((item, i) => (
								<div
									key={i}
									className='flex flex-col justify-end gap-4 p-8 lg:p-10 rounded-sm lg:rounded-md border border-green-light/20 bg-green-dark/30 backdrop-blur-sm h-full min-h-100'
								>

									<h3 className='text-30 font-heading font-semibold md:mt-8'>
										{item.title}
									</h3>

									<p className='text-18 leading-relaxed opacity-90'>
										{item.text}
									</p>

								</div>
							))}
						</StaggerUp>

					</div>

				</div>

			</section>

			<Context
				showCreation={false}
				showCta={false}
			/>

			<section className='relative z-3 py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(a plataforma)' />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Uma plataforma. Dois pilares complementares.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw]'>
								<AnimatedText text='A Plataforma Aether integra duas instituições com funções distintas e complementares, permitindo conduzir toda a jornada de desenvolvimento dos ativos farmacêuticos, desde a pesquisa até sua preparação para o mercado.' />
							</p>
						</div>

					</div>

					<StaggerUp className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
						{pilares.map((item, i) => (
							<div
								key={i}
								className={clsx(
									'flex flex-col rounded-md lg:rounded-lg p-10 lg:p-[3.5vw] h-full',
									item.cardClass
								)}
							>

								<div className='flex flex-col gap-6 grow'>

									<MaskedIcon
										url={item.icon}
										className={clsx('block w-10 lg:w-12 aspect-square', item.iconColor)}
									/>

									<span className='block text-sm font-semibold uppercase tracking-wide opacity-60'>
										({item.eyebrow})
									</span>

									<h3 className='text-30 font-heading font-semibold'>
										{item.name}
									</h3>

									<p className='text-18 leading-relaxed opacity-90'>
										{item.text}
									</p>

								</div>

								<div className='mt-10 lg:mt-12'>
									<Button
										style={item.buttonStyle}
										href={item.href}
										text={item.cta}
										icon='diagonal-arrow'
									/>
								</div>

							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(nossa trajetória)' />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Uma plataforma que nasceu dentro da pesquisa.
							</AnimatedTitle>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<Timeline items={timeline} />
						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>
					<div className='row lg:items-center max-lg:flex max-lg:flex-col max-lg:gap-12'>

						<div className='col-lg-5 flex flex-col justify-center lg:pr-[4vw]'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-4'>
								(quem conduz)
							</span>

							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Pessoas que transformam ciência em ativos farmacêuticos.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10'>
								<AnimatedText text='A Plataforma Aether reúne profissionais com experiência em desenvolvimento farmacêutico, propriedade intelectual, assuntos regulatórios, estratégia empresarial e transferência de tecnologia. Nosso modelo integra especialistas científicos, executivos e parceiros estratégicos para conduzir ativos desde a descoberta até oportunidades de licenciamento global.' />
							</p>

							<Button
								style='dark'
								href={pages.sobreEquipe}
								text='Conheça a equipe'
								icon='diagonal-arrow'
							/>

						</div>

						<div className='col-lg-push-1 col-lg-6'>
							<div className='block relative overflow-hidden w-full max-lg:aspect-4/3 lg:h-full lg:min-h-[120vh] rounded-md'>

								<div className='absolute inset-0 z-2 bg-green-dark mix-blend-soft-light' />

								<ScrollingImage>
									<Image
										src={scientists}
										alt='Equipe Aether'
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

			{/*
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text='(presença)' />
							</p>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Brasil e Canadá. Atuação global.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw]'>
								<AnimatedText text='A Aether opera em duas geografias complementares: no Brasil, origem e núcleo científico da plataforma; no Canadá, braço internacional responsável pela interface com parceiros industriais e mercados globais.' />
							</p>
						</div>

					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
								{presenca.map((place, i) => (
									<div
										key={i}
										className='bg-green-pale rounded-sm lg:rounded-md p-8 lg:p-10 h-full'
									>

										<h3 className='text-30 font-heading font-semibold'>
											{place.country}
										</h3>

										<p className='text-18 leading-relaxed mt-3 mb-8 opacity-90'>
											{place.lead}
										</p>

										<div className='flex flex-col gap-6'>
											{place.offices.map((office, j) => (
												<div key={j}>
													<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-2'>
														{office.eyebrow} · {office.city}
													</span>
													<address className='not-italic text-18 leading-relaxed'>
														{office.lines.map((line, k) => (
															<span key={k} className='block'>{line}</span>
														))}
													</address>
												</div>
											))}
										</div>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>
			*/}

			<ContactBanner className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]' />

		</div>
	)
}
