// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import Counter from '@/components/Utils/Animations/Counter'
import Button from '@/components/Button'

// img
import imgFlagship from '@/assets/img/microscope.jpg'

// utils
import { pages } from '@/utils/routes'

export const metadata: Metadata = {
	title: 'Pipeline - Projetos em Desenvolvimento | Aether Global Pharma',
	description: 'O pipeline da Aether reúne os projetos científicos em desenvolvimento na plataforma, conduzidos pelo ICT AetherBio+ - incluindo a plataforma produtiva para IFA anti-inflamatória selecionada pelo Ministério da Saúde e pela EMBRAPII.',
	alternates: {
		canonical: '/pd/pipeline'
	},
	openGraph: {
		title: 'Pipeline - Projetos em Desenvolvimento | Aether Global Pharma',
		description: 'O pipeline da Aether reúne os projetos científicos em desenvolvimento na plataforma, conduzidos pelo ICT AetherBio+ - incluindo a plataforma produtiva para IFA anti-inflamatória selecionada pelo Ministério da Saúde e pela EMBRAPII.',
		url: 'https://aethergp.com.br/pd/pipeline',
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
		title: 'Estágio de maturidade',
		text: 'Cada ativo avança pela escala TRL - dos princípios científicos básicos à implantação operacional comprovada. O estágio de cada projeto é divulgado conforme o desenvolvimento amadurece.',
		icon: '/img/svg/logo/icon-gp.svg'
	},
	{
		eyebrow: '02',
		title: 'Área terapêutica',
		text: 'Os projetos são organizados por frente científica e aplicação clínica - de plataformas produtivas a biofármacos e terapias avançadas - refletindo a natureza translacional da plataforma.',
		icon: '/img/svg/logo/icon-gp.svg'
	},
	{
		eyebrow: '03',
		title: 'Status do desenvolvimento',
		text: 'Cada ativo carrega o seu momento atual - captação de fomento, validação técnica, parcerias industriais ou avanço regulatório - conduzido com governança científica independente.',
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
								<AnimatedText text='Os projetos que avançam na plataforma Aether.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='O pipeline reúne os ativos científicos em desenvolvimento na plataforma, organizados por estágio de maturidade tecnológica, área terapêutica e status atual. Cada projeto é conduzido pelo ICT AetherBio+, com governança independente e proteção integral da propriedade intelectual.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			{/* Projeto em destaque */}
			<section className='relative overflow-hidden py-16 lg:py-[8vw] bg-green-dark text-green-light'>

				<StrokePath
					d='M795.5 175.674C677 -59.8263 184.68 17.711 72.5 556.174C-50 1144.17 359.5 1493.17 754.5 1587.17'
					viewBox='0 0 657 1636'
					className='z-0 top-[8%] -right-2 w-vw sm:w-[42vw] opacity-30'
					start='10% 80%'
					end='50% 20%'
				/>

				<div className='base-container relative z-1'>

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

						<div className='col-lg-5'>
							<div className='relative aspect-4/5 lg:h-full rounded-md lg:rounded-lg overflow-hidden'>
								<Image
									src={imgFlagship}
									alt='Pesquisa laboratorial da plataforma Aether'
									fill
									className='object-cover'
									sizes='(max-width: 1024px) 100vw, 40vw'
								/>
								<div className='absolute inset-0 bg-green-dark/20' />
							</div>
						</div>

						<div className='col-lg-7'>
							<div className='lg:pl-[3vw] h-full flex flex-col'>

								<p className='text-20 leading-relaxed opacity-90'>
									A Aether Global Pharma integra os Projetos de Alto Impacto em Saúde - iniciativa do Ministério da Saúde e da EMBRAPII - com o desenvolvimento de uma plataforma produtiva para IFA anti-inflamatória, em parceria com o CQMED e a unidade de Inovação de Fármacos da UFMG.
								</p>

								<div className='mt-8 lg:mt-10 p-7 lg:p-8 rounded-sm lg:rounded-md bg-green-light/[0.07] border border-green-light/15'>
									<span className='block text-sm font-semibold font-heading uppercase tracking-wide opacity-60 mb-2'>
										Foco técnico do projeto
									</span>
									<p className='text-24 font-heading font-semibold leading-tight'>
										Plataforma produtiva para IFA anti-inflamatória.
									</p>
								</div>

								<div className='mt-8 lg:mt-auto lg:pt-10'>
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

							</div>
						</div>

					</div>

					<div className='row pt-12 lg:pt-[5vw]'>
						<div className='col-12'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-px rounded-md lg:rounded-lg overflow-hidden border border-green-light/15'>

								<div className='bg-green-light/[0.04] p-8 lg:p-10'>
									<span className='block text-72 lg:text-[6vw] font-heading font-bold leading-none'>
										R$ <Counter number={90} /> mi
									</span>
									<span className='block text-18 mt-4 opacity-70'>
										Chamada pública nacional dos Projetos de Alto Impacto em Saúde
									</span>
								</div>

								<div className='bg-green-light/[0.04] p-8 lg:p-10'>
									<span className='block text-72 lg:text-[6vw] font-heading font-bold leading-none'>
										R$ 12,5 mi
									</span>
									<span className='block text-18 mt-4 opacity-70'>
										Investimento total destinado ao desenvolvimento do projeto
									</span>
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

										<h3 className='text-24 font-heading font-semibold leading-tight mt-2'>
											{item.title}
										</h3>

										<p className='text-16 leading-relaxed opacity-80'>
											{item.text}
										</p>
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
								<AnimatedText text='A partir de 2027, novos ativos entram no pipeline, em diferentes estágios de maturidade. Alguns projetos permanecem sob confidencialidade até a liberação para divulgação - e passam a ser detalhados aqui à medida que avançam.' />
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

							<p className='text-15 leading-relaxed mt-8 opacity-50 max-w-xl'>
								Quadro ilustrativo dos próximos ativos do pipeline. Os projetos reais substituem estes espaços conforme entram em divulgação.
							</p>
						</div>
					</div>

				</div>
			</section>

			{/* CTA final */}
			<section className='relative overflow-hidden py-24 lg:py-[10vw] bg-green-dark text-green-light'>

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

				<div className='base-container relative z-1 text-center'>
					<div className='row'>
						<div className='col-lg-8 offset-lg-2'>

							<h2 className='text-60 font-heading font-semibold leading-[1.05]!'>
								<AnimatedText text='Tem uma tecnologia em desenvolvimento?<br />Submeta seu projeto à plataforma Aether.' />
							</h2>

							<p className='text-20 mt-8 lg:mt-10 opacity-90'>
								Avaliamos projetos científicos com potencial translacional em biotecnologia e saúde humana, conduzidos por pesquisadores, startups e instituições de pesquisa no Brasil e no exterior.
							</p>

							<div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12 lg:mt-14'>

								<Button
									style='light-2'
									href={pages.inscreva}
									text='Inscreva seu projeto'
									icon='diagonal-arrow'
								/>

								<Button
									style='dark-2'
									href={pages.contato}
									text='Fale com nosso time'
									icon='diagonal-arrow'
								/>

							</div>

						</div>
					</div>
				</div>

			</section>

		</div>
	)
}
