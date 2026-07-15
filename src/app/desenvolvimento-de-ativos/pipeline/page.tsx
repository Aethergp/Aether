// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import Counter from '@/components/Utils/Animations/Counter'
import Button from '@/components/Button'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'

// img
import imgFlagship from '@/assets/img/water.jpg'

// utils
import { pages } from '@/utils/routes'

export const metadata: Metadata = {
	title: 'Pipeline - Projetos em Desenvolvimento | Aether Global Pharma',
	description: 'O pipeline da Aether reúne os projetos científicos em desenvolvimento na plataforma, conduzidos pelo ICT AetherBio+, incluindo a plataforma produtiva para IFA anti-inflamatória selecionada pelo Ministério da Saúde e pela EMBRAPII.',
	alternates: {
		canonical: '/desenvolvimento-de-ativos/pipeline'
	},
	openGraph: {
		title: 'Pipeline - Projetos em Desenvolvimento | Aether Global Pharma',
		description: 'O pipeline da Aether reúne os projetos científicos em desenvolvimento na plataforma, conduzidos pelo ICT AetherBio+, incluindo a plataforma produtiva para IFA anti-inflamatória selecionada pelo Ministério da Saúde e pela EMBRAPII.',
		url: 'https://aethergp.com.br/desenvolvimento-de-ativos/pipeline',
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

const parceiros = [
	'Ministério da Saúde',
	'EMBRAPII',
	'CQMED',
	'UFMG - Inovação de Fármacos'
]

const dimensoes = [
	{
		eyebrow: '01',
		title: 'Maturidade do Ativo',
		text: '<b>Onde o ativo está na jornada de desenvolvimento.</b> O nível de maturidade tecnológica permite compreender o estágio atual do projeto, as evidências já construídas e os próximos marcos necessários para seu avanço.',
		icon: '/img/svg/logo/icon-gp.svg'
	},
	{
		eyebrow: '02',
		title: 'Tese de Valor',
		text: '<b>Por que esse ativo merece avançar.</b> Cada projeto é analisado a partir de seu racional científico, potencial terapêutico, estratégia de propriedade intelectual e capacidade de gerar valor ao longo do desenvolvimento.',
		icon: '/img/svg/logo/icon-gp.svg'
	},
	{
		eyebrow: '03',
		title: 'Próximo marco de valorização',
		text: '<b>O que precisa acontecer para aumentar o valor do ativo.</b> Identificamos o próximo milestone capaz de reduzir risco, fortalecer as evidências e ampliar o potencial do ativo para investimento, parceria estratégica ou licenciamento.',
		icon: '/img/svg/logo/icon-gp.svg'
	}
]

export default function PipelinePage() {
	return (
		<div className='bg-white'>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(pipeline)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Um portfólio de ativos farmacêuticos em construção.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='A Aether identifica, seleciona e desenvolve ativos farmacêuticos com potencial de valorização ao longo de sua jornada de maturação. Como uma <b>Pharmaceutical Asset Venture Builder</b>, construímos um portfólio orientado por ciência, propriedade intelectual e marcos progressivos de desenvolvimento, com foco na redução de risco e na criação de valor até oportunidades de parceria, investimento ou licenciamento.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			{/* Projeto em destaque */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-dark text-green-light'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(projeto em destaque)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<span className='inline-flex items-center px-5 py-2.5 rounded-full border border-green-light/30 text-15 font-semibold mb-8 lg:mb-10'>
								Projetos de Alto Impacto em Saúde
							</span>

							<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text='Selecionada em chamada pública nacional de R$ 90 milhões.' />
							</h2>
						</div>

					</div>

					<div className='row items-stretch gap-y-8'>

						<div className='col-xl-5'>
							<div className='relative aspect-4/5 sm:aspect-4/3 xl:aspect-auto xl:h-full rounded-md xl:rounded-xl overflow-hidden'>
								<ScrollingImage>
									<Image
										src={imgFlagship}
										alt='Pesquisa laboratorial da plataforma Aether'
										fill
										className='object-cover'
										sizes='(max-width: 1024px) 100vw, 40vw'
									/>
								</ScrollingImage>
								<div className='absolute z-2 inset-0 bg-green-dark mix-blend-soft-light' />
							</div>
						</div>

						<div className='col-xl-7'>
							<div className='xl:pl-[3vw] h-full flex flex-col'>

								<p className='text-20 leading-relaxed opacity-90'>
									A Aether Global Pharma integra os Projetos de Alto Impacto em Saúde, iniciativa do Ministério da Saúde e da EMBRAPII, com o desenvolvimento de uma plataforma produtiva para IFA anti-inflamatória, em parceria com o CQMED e a unidade de Inovação de Fármacos da UFMG.
								</p>

								<div className='mt-8 lg:mt-10 p-7 lg:p-8 rounded-sm lg:rounded-md bg-green-light/[0.07] border border-green-light/15'>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-2'>
										Foco técnico do projeto
									</span>
									<p className='text-24 font-heading font-semibold leading-tight'>
										Plataforma produtiva para IFA anti-inflamatória.
									</p>
								</div>

								<div className='mt-8 lg:mt-10'>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-4'>
										Parceiros do projeto
									</span>
									<div className='flex flex-wrap gap-3'>
										{parceiros.map((label, i) => (
											<span
												key={i}
												className='inline-flex items-center px-5 py-2.5 rounded-full bg-green-light/[0.07] border border-green-light/15 text-15 font-semibold'
											>
												{label}
											</span>
										))}
									</div>
								</div>

								<div className='mt-8 lg:mt-10 grid grid-cols-1 gap-px rounded-md lg:rounded-lg overflow-hidden border border-green-light/15'>
									<div className='bg-green-light/4 p-7 lg:p-8'>
										<span className='block text-60 lg:text-[4vw] font-heading font-bold leading-none'>
											R$ <Counter number={90} /> mi
										</span>
										<span className='block text-16 mt-3 opacity-70'>
											Chamada pública nacional dos Projetos de Alto Impacto em Saúde
										</span>
									</div>
									<div className='bg-green-light/4 p-7 lg:p-8'>
										<span className='block text-60 lg:text-[4vw] font-heading font-bold leading-none'>
											R$ <Counter number={12.5} /> mi
										</span>
										<span className='block text-16 mt-3 opacity-70'>
											Investimento total destinado ao desenvolvimento do projeto
										</span>
									</div>
								</div>

							</div>
						</div>

					</div>

				</div>
			</section>

			{/* Como o pipeline se organiza */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(como organizamos)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Três dimensões para ler cada projeto.
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text='O pipeline da Aether é translacional por natureza. À medida que cresce, cada ativo é apresentado por três eixos que tornam comparável o seu momento de desenvolvimento.' />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
								{dimensoes.map((item, i) => (
									<div
										key={i}
										className='flex flex-col gap-5 p-8 lg:p-9 rounded-md lg:rounded-lg bg-green-pale h-full'
									>
										<div className='flex items-center justify-between'>
											<MaskedIcon
												url={item.icon}
												className='block w-7 aspect-square bg-green-dark'
											/>
											<span className='text-5xl font-heading font-bold leading-none text-green-dark/15'>
												{item.eyebrow}
											</span>
										</div>

										<h3 className='text-24 font-heading font-semibold leading-tight! mt-2'>
											{item.title}
										</h3>

										<p
											className='text-16 leading-relaxed opacity-80'
											dangerouslySetInnerHTML={{ __html: item.text }}
										/>
									</div>
								))}
							</StaggerUp>

							<div className='mt-8 lg:mt-10'>
								<Button
									style='dark'
									href={pages.trl}
									text='Entenda a escala TRL'
									icon='diagonal-arrow'
								/>
							</div>
						</div>
					</div>

				</div>
			</section>

			{/* Pipeline em expansão */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-pale/40'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(em expansão)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Um pipeline em formação.
							</AnimatedTitle>

							<p className='text-18 leading-relaxed mt-6 lg:mt-8 opacity-70 max-w-2xl'>
								<AnimatedText text='A partir de 2027, novos ativos entram no pipeline, em diferentes estágios de maturidade. Alguns projetos permanecem sob confidencialidade até a liberação para divulgação, e passam a ser detalhados aqui à medida que avançam.' />
							</p>
						</div>

					</div>

					<div className='row'>
						<div className='col-lg-3' />
						<div className='col-lg-9'>
							<StaggerUp className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6'>
								{[0, 1, 2].map((i) => (
									<div
										key={i}
										className='relative flex flex-col gap-5 p-8 lg:p-9 rounded-md lg:rounded-lg border border-dashed border-green-dark/25 bg-white/40 h-full min-h-[15rem]'
									>
										<span className='inline-flex w-fit items-center px-4 py-2 rounded-full bg-green-dark/[0.06] text-sm font-semibold uppercase tracking-wide text-green-dark/60'>
											A partir de 2027
										</span>

										<div className='mt-auto'>
											<span className='block h-3 w-2/3 rounded-full bg-green-dark/10 mb-3' />
											<span className='block h-3 w-1/2 rounded-full bg-green-dark/10' />
										</div>

										<span className='text-15 font-semibold text-green-dark/50'>
											Novo ativo em desenvolvimento
										</span>
									</div>
								))}
							</StaggerUp>

						</div>
					</div>

				</div>
			</section>

		</div>
	)
}
