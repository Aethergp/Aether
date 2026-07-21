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
import Committee from '@/components/Committee'
import JsonLd from '@/components/JsonLd'

// img
import imgFlagship from '@/assets/img/water.jpg'
import katlin from '@/assets/img/team/katlin.jpg'
import phili from '@/assets/img/team/phili.jpg'

// utils
import { pages } from '@/utils/routes'
import { pageGraph, person, personId, plainText } from '@/utils/schema'

export const metadata: Metadata = {
	title: 'Pipeline de Projetos Científicos | Aether Global Pharma',
	description: 'Projetos científicos em desenvolvimento na plataforma Aether, conduzidos pelo ICT AetherBio+, incluindo a plataforma produtiva para IFA anti-inflamatória.',
	alternates: {
		canonical: '/desenvolvimento-de-ativos/pipeline'
	},
	openGraph: {
		title: 'Pipeline de Projetos Científicos | Aether Global Pharma',
		description: 'Projetos científicos em desenvolvimento na plataforma Aether, conduzidos pelo ICT AetherBio+, incluindo a plataforma produtiva para IFA anti-inflamatória.',
		url: 'https://aethergp.com.br/desenvolvimento-de-ativos/pipeline',
		siteName: 'Aether Global Pharma',
		images: [
			{
				url: '/img/og/desenvolvimento-de-ativos-pipeline.jpg',
				width: 1200,
				height: 630,
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

const responsaveis = [
	{
		name: 'Katlin B. Massirer',
		titulacao: 'PhD',
		area: 'Coordenadora CQMED',
		instituicao: 'CQMED',
		bio: 'Coordenadora do Centro de Química Medicinal (CQMED-Unicamp), uma Unidade Embrapii de Inovação Industrial na área de Fármacos/Biofármacos, desde 2017. Pesquisadora da área de: proteínas de ligação a RNA em doenças, química medicinal, bioinformática, e proteínas recombinantes para diagnóstico. Tem mais de 15 anos de experiência em planejamento e execução de projetos de pesquisa e inovação, com 46 publicações internacionais de alto impacto. <br /><br />Atua na coordenação de projetos internacionais na área de splicing de RNA e química medicinal, com a University of Oxford, University of California San Diego, Tubingen University e o Structural Genomics Consortium (SGC) no Canadá. Em 2025 recebeu prêmio de pesquisadora destaque da Embrapii e em 2024 recebeu honraria como profissional de destaque em pesquisa na área de saúde pela Câmara Municipal de Campinas, SP. Atua como coordenadora adjunta do CBMEG e Coordenadora da CIBIO-CBMEG.',
		photo: katlin,
		linked: 'https://www.linkedin.com/in/katlin-massirer-86a0779/'
	},
	{
		name: 'Ronaldo Pilli',
		titulacao: 'PhD',
		area: 'Coordenador Química',
		instituicao: 'CQMED',
		bio: 'Professor na Unicamp na área de Síntese Orgânica, com ênfase em síntese assimétrica, síntese de fármacos e produtos naturais, com avaliação de atividade biológica. Coordena a área de Química do CQMED-Unicamp. Possui pedidos de patente relacionados a métodos de preparação de princípios farmacêuticos, incluindo fenidato de metila, tamoxifeno, levobupivacaína e fluoxetina.<br /><br />Ocupou posições de destaque na gestão acadêmica e científica, como diretor do Instituto de Química e Pró-Reitor de Pesquisa da Unicamp, além de atuação em instâncias estratégicas de formulação de políticas científicas no CNPq e na FAPESP, incluindo a vice-presidência do Conselho Superior da FAPESP. <br /><br />É coautor do livro-texto Substâncias Carboniladas e Derivados, referência na área de Química Orgânica, com edição nacional e internacional em inglês. <br /><br />Recebeu importantes prêmios e honrarias nacionais e internacionais, como o Prêmio Zeferino Vaz (Unicamp), a Medalha Simão Mathias (SBQ), a Medalha Israel Vargas e o BMOS Award. É membro da Academia de Ciências do Estado de São Paulo e da Academia Brasileira de Ciências.',
		photo: phili
		//linked: 'https://www.linkedin.com/in/katlin-massirer-86a0779/'
	}
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

			<JsonLd
				id='jsonld-pd-pipeline'
				data={pageGraph({
					type: 'CollectionPage',
					path: '/desenvolvimento-de-ativos/pipeline',
					name: metadata.title as string,
					description: metadata.description as string,
					trail: [
						{ name: 'Desenvolvimento de Ativos', item: '/desenvolvimento-de-ativos' },
						{ name: 'Pipeline', item: '/desenvolvimento-de-ativos/pipeline' }
					],
					extend: {
						mainEntity: responsaveis.map((m) => ({
							'@id': personId(m.name, '/desenvolvimento-de-ativos/pipeline')
						}))
					},
					// external researchers: affiliation, never worksFor - they are not
					// Aether employees
					extra: responsaveis.map((m) => person({
						name: m.name,
						jobTitle: m.area,
						description: plainText(m.bio),
						image: m.photo.src,
						linkedin: m.linked,
						basePath: '/desenvolvimento-de-ativos/pipeline',
						affiliation: m.instituicao
					}))
				})}
			/>

			{/* Hero */}
			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text='(pipeline)' />
							</p>
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
							<p className='font-semibold font-heading'>
								<AnimatedText text='(projeto em destaque)' />
							</p>
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

			{/* Responsáveis científicos */}
			<section className='pb-16 lg:pb-[8vw] bg-green-dark text-green-light -mt-px'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading pt-2'>
								<AnimatedText text='(responsáveis científicos)' />
							</p>
						</div>
						<div className='col-lg-9'>
							<h2 className='text-60 font-heading font-semibold'>
								Quem lidera a ciência deste projeto.
							</h2>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[8vw]'>
								<AnimatedText text='A condução científica da plataforma produtiva para IFA anti-inflamatória é responsabilidade dos pesquisadores do CQMED-Unicamp. Clique em cada perfil para conhecer a trajetória.' />
							</p>
						</div>
					</div>

					<Committee members={responsaveis} />

				</div>
			</section>

			{/* Como o pipeline se organiza */}
			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<p className='font-semibold font-heading'>
								<AnimatedText text='(como organizamos)' />
							</p>
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
							<p className='font-semibold font-heading'>
								<AnimatedText text='(em expansão)' />
							</p>
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
