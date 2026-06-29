// libraries
import type { Metadata } from 'next'
import clsx from 'clsx'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import Context from '@/app/home/Context'
import Timeline from './Timeline'
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import ContactBanner from '@/components/ContactBanner'

// utils
import { pages } from '@/utils/routes'

// img
import scientists from '@/assets/img/team-2.jpg'

// metadata
export const metadata: Metadata = {
	title: 'Sobre a Aether - Inovação, Espiritualidade e Ousadia | Aether Global Pharma',
	description: 'Conheça a Aether: uma plataforma que une holding de propriedade intelectual e instituto de ciência e tecnologia para transformar pesquisa científica em soluções reais para a saúde.',
	alternates: {
		canonical: '/sobre'
	},
	openGraph: {
		title: 'Sobre a Aether - Inovação, Espiritualidade e Ousadia | Aether Global Pharma',
		description: 'Conheça a Aether: uma plataforma que une holding de propriedade intelectual e instituto de ciência e tecnologia para transformar pesquisa científica em soluções reais para a saúde.',
		url: 'https://aethergp.com.br/sobre',
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

const valores = [
	{
		title: 'Inovação',
		text: 'Buscamos ciência de fronteira e a conduzimos com método: maturidade tecnológica, governança científica e estratégia regulatória desde o primeiro dia.'
	},
	{
		title: 'Espiritualidade',
		text: 'Acreditamos que ciência e propósito caminham juntos. Cada projeto existe para chegar às pessoas - não apenas ao mercado.'
	},
	{
		title: 'Ousadia',
		text: 'Atuamos onde o ecossistema falha: na travessia entre a descoberta acadêmica e o ativo farmacêutico global, assumindo a complexidade que outros evitam.'
	}
]

// marcos 2000 / 2025 / 2026 confirmados pela Patricia; os 5 intermediários são
// PLACEHOLDER (lorem ipsum) - anos e textos a alinhar com o cliente
const timeline = [
	{
		year: '2000',
		title: 'Origem como Bap Consult',
		text: 'A empresa nasce como consultoria, ponto de partida da trajetória que daria origem à plataforma.'
	},
	{
		year: '2005',
		title: 'Lorem ipsum dolor sit amet',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Marco a confirmar com o cliente.'
	},
	{
		year: '2009',
		title: 'Consectetur adipiscing elit',
		text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Marco a confirmar com o cliente.'
	},
	{
		year: '2013',
		title: 'Ut enim ad minim veniam',
		text: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Marco a confirmar com o cliente.'
	},
	{
		year: '2017',
		title: 'Duis aute irure dolor',
		text: 'In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Marco a confirmar com o cliente.'
	},
	{
		year: '2021',
		title: 'Excepteur sint occaecat',
		text: 'Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Marco a confirmar com o cliente.'
	},
	{
		year: '2025',
		title: 'Aether Global Pharma e ICT AetherBio+',
		text: 'Durante o período da fundadora no Canadá, a razão social é alterada para Aether Global Pharma, marcando a virada para a inovação farmacêutica. No mesmo ano nasce o ICT AetherBio+, que passa a complementar as atividades de gestão de pesquisas.'
	},
	{
		year: '2026',
		title: 'Projetos de Alto Impacto em Saúde',
		text: 'Seleção na chamada Projetos de Alto Impacto em Saúde, iniciativa do Ministério da Saúde e da EMBRAPII.'
	}
]

const pilares = [
	{
		eyebrow: 'empresa-mãe',
		icon: '/img/svg/logo/icon-gp.svg',
		iconColor: 'bg-green-light',
		name: 'Aether Global Pharma',
		text: 'A holding privada que dá nome à plataforma - responsável pela estratégia comercial, parcerias industriais, licenciamento de tecnologias e inserção dos ativos no mercado farmacêutico global.',
		href: pages.sobreAgp,
		cta: 'Conhecer a AGP',
		cardClass: 'bg-green-dark text-green-light',
		buttonStyle: 'light-2' as const
	},
	{
		eyebrow: 'instituto científico',
		icon: '/img/svg/logo/icon-bio-green-dark.svg',
		iconColor: 'bg-white',
		name: 'ICT AetherBio+',
		text: 'O instituto de ciência, tecnologia e inovação da plataforma - uma organização sem fins lucrativos que conduz cada projeto da validação técnica à maturação de TRL, com governança independente e comitê científico especializado.',
		href: pages.sobreIct,
		cta: 'Conhecer o Bio+',
		cardClass: 'bg-linear-to-br from-sapphire to-navy-mid text-white',
		buttonStyle: 'blue' as const
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
										Inovação <br />
										Espiritualidade <br />
										Ousadia
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
									<AnimatedText text='Com leveza nos negócios e profundidade nas pesquisas, a Aether propõe um novo jeito de atuar no setor farmacêutico: mais humano, mais conectado e mais consciente.' />
								</p>

								<p className='text-20 leading-relaxed mt-8 lg:mt-10 lg:pr-[12vw] opacity-90'>
									<AnimatedText text='Nosso propósito é ser o elo entre a pesquisa científica, a indústria e a vida das pessoas. Mais do que desenvolver, acreditamos em traduzir inovação em bem-estar.' />
								</p>
							</div>

						</div>
					</div>

					<div className='base-container pb-20 lg:pb-[8vw] pt-8 lg:pt-[2vw]'>

						<div className='row pb-10 lg:pb-[5vw]'>

							<div className='col-lg-3 pb-4 lg:pb-0'>
								<h3 className='font-semibold font-heading'>
									<AnimatedText text='(nossos valores)' />
								</h3>
							</div>

							<div className='col-lg-9'>
								<h2 className='text-60 font-heading font-semibold'>
									<AnimatedText text='Três princípios que orientam cada decisão.' />
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
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(a plataforma)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Dois pilares institucionais. Uma estratégia integrada.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[6vw]'>
								<AnimatedText text='A plataforma Aether opera por meio de duas entidades complementares, cada uma com funções específicas dentro de um modelo integrado de captura e valorização de propriedade intelectual.' />
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
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(nossa história)' />
							</h3>
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
								Pessoas que conectam ciência e estratégia.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed my-8 lg:my-10'>
								<AnimatedText text='A Aether reúne lideranças com experiência em desenvolvimento farmacêutico, propriedade intelectual e gestão científica, apoiadas por um comitê de pesquisadores especialistas em diferentes áreas terapêuticas.' />
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

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(presença)' />
							</h3>
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

			<ContactBanner className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]' />

		</div>
	)
}
