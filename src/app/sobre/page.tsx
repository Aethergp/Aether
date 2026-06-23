// libraries
import type { Metadata } from 'next'
import { Link } from 'next-transition-router'
import clsx from 'clsx'
import Image from 'next/image'

// components
import Context from '@/app/home/Context'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import ImageReveal from '@/components/Utils/Animations/ImageReveal'
import Button from '@/components/Button'

// utils
import { pages } from '@/utils/routes'

// img - placeholders, to be swapped for the brand's photographic direction
import scientists from '@/assets/img/scientists.jpg'
import microscope from '@/assets/img/microscope.jpg'
import abstract from '@/assets/img/abstract.jpg'

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

const timeline = [
	{
		year: '2000',
		title: 'Origem como Bap Consult',
		text: 'A empresa nasce como consultoria, ponto de partida da trajetória que daria origem à plataforma.'
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
		name: 'Aether Global Pharma',
		text: 'A holding privada que dá nome à plataforma - responsável pela estratégia comercial, parcerias industriais, licenciamento de tecnologias e inserção dos ativos no mercado farmacêutico global.',
		href: pages.sobreAgp,
		cta: 'Conhecer a AGP',
		dark: true
	},
	{
		eyebrow: 'instituto científico',
		icon: '/img/svg/logo/icon-bio-green-dark.svg',
		name: 'ICT AetherBio+',
		text: 'O instituto de ciência, tecnologia e inovação da plataforma - uma organização sem fins lucrativos que conduz cada projeto da validação técnica à maturação de TRL, com governança independente e comitê científico especializado.',
		href: pages.sobreIct,
		cta: 'Conhecer o Bio+',
		dark: false
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

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-12 lg:pb-[5vw]'>

				<div className='base-container'>

					<div className='row'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading mb-6 lg:pt-1'>
								<AnimatedText text='(sobre a aether)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Inovação, Espiritualidade, Ousadia.' />
							</h1>

							<p className='text-24 font-heading text-green-dark mt-8 lg:mt-10 lg:pr-[6vw]'>
								<AnimatedText text='Com leveza nos negócios e profundidade nas pesquisas, a Aether propõe um novo jeito de atuar no setor farmacêutico: mais humano, mais conectado e mais consciente.' />
							</p>

							<p className='text-20 leading-relaxed mt-8 lg:mt-10 lg:pr-[12vw]'>
								<AnimatedText text='Nosso propósito é ser o elo entre a pesquisa científica, a indústria e a vida das pessoas. Mais do que desenvolver, acreditamos em traduzir inovação em bem-estar.' />
							</p>
						</div>

					</div>

				</div>

			</section>

			<section className='pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>
						<div className='col-lg-10 offset-lg-1'>
							<div className='relative w-full aspect-4/3 md:aspect-video lg:aspect-21/9 rounded-md lg:rounded-lg overflow-hidden bg-green-dark'>
								<ImageReveal
									src={microscope.src}
									alt='Pesquisa científica conduzida na plataforma Aether'
									overlay='black'
									className='w-full h-full relative'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='bg-green-dark text-green-light py-20 lg:py-[8vw]'>
				<div className='base-container'>

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
								className='flex flex-col gap-4 p-8 lg:p-10 rounded-sm lg:rounded-md border border-green-light/15 bg-green-light/[0.04] h-full'
							>

								<p className='text-7xl sm:text-8xl lg:text-9xl font-heading font-bold text-green-light/30 self-end leading-none'>
									{i + 1}
								</p>

								<h3 className='text-30 font-heading font-semibold md:mt-8'>
									{item.title}
								</h3>

								<p className='text-18 leading-relaxed opacity-80'>
									{item.text}
								</p>

							</div>
						))}
					</StaggerUp>

				</div>
			</section>

			<Context showCreation={false} />

			<section className='py-16 lg:py-[8vw]'>
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

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
						{pilares.map((item, i) => (
							<div
								key={i}
								className={clsx(
									'flex flex-col rounded-md lg:rounded-lg p-10 lg:p-[3.5vw] h-full',
									item.dark ? 'bg-green-dark text-green-light' : 'bg-green-pale text-green-dark'
								)}
							>

								<div className='flex flex-col gap-6 grow'>

									<Image
										src={item.icon}
										alt={item.name}
										width={50}
										height={50}
										className={clsx(
											'w-10 lg:w-12 h-auto',
											item.dark && 'brightness-0 invert'
										)}
										loading='lazy'
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
										style={item.dark ? 'light-2' : 'dark'}
										href={item.href}
										text={item.cta}
										icon='diagonal-arrow'
									/>
								</div>

							</div>
						))}
					</div>

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
							<StaggerUp className='flex flex-col'>
								{timeline.map((item, i) => (
									<div
										key={i}
										className='relative border-l border-green-dark/20 pl-8 lg:pl-12 pb-12 lg:pb-16 last:pb-0'
									>

										<span className='absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-dark' />

										<p className='text-36 lg:text-60 font-heading font-bold text-green-dark leading-none'>
											{item.year}
										</p>

										<h3 className='text-24 font-heading font-semibold mt-4 lg:mt-6'>
											{item.title}
										</h3>

										<p className='text-18 leading-relaxed mt-3 lg:pr-[10vw]'>
											{item.text}
										</p>

									</div>
								))}
							</StaggerUp>
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

						<div className='col-lg-7'>
							<div className='block relative overflow-hidden w-full max-lg:aspect-4/3 lg:h-full lg:min-h-[80vh] rounded-md'>
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

			<section className='pb-20 lg:pb-[10vw] pt-8 lg:pt-[4vw]'>
				<div className='base-container'>

					<div className='relative overflow-hidden bg-green-dark text-green-light rounded-md lg:rounded-lg px-10 py-16 md:p-16 lg:p-[6vw] text-center'>

						<div className='absolute inset-0 z-0 opacity-25'>
							<Image
								src={abstract}
								alt=''
								aria-hidden='true'
								fill
								className='cover'
								sizes='100vw'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-green-dark via-green-dark/70 to-green-dark/40' />
						</div>

						<div className='row relative z-2'>
							<div className='col-lg-8 offset-lg-2'>

								<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
									<AnimatedText text='Quer levar sua tecnologia para o próximo nível?' />
								</h2>

								<p className='text-20 mt-6 lg:mt-8 opacity-90'>
									A plataforma Aether avalia projetos científicos com potencial translacional em biotecnologia e saúde humana, conduzidos por pesquisadores, startups e instituições no Brasil e no exterior.
								</p>

								<div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 lg:mt-12'>

									<Button
										style='light-2'
										href={pages.inscreva}
										text='Inscreva seu projeto'
										icon='diagonal-arrow'
									/>

									<Link
										href={pages.contato}
										className='hover-underline-alt hover-underline-alt--light font-heading font-semibold cursor-pointer'
									>
										Fale com nosso time
									</Link>

								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
