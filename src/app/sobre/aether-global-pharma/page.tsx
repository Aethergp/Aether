// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import MaskedIcon from '@/components/MaskedIcon'
import Grainient from '@/components/Grainient'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'

// utils
import { pages } from '@/utils/routes'

// img
import labMeeting from '@/assets/img/scientists.jpg'

// metadata
export const metadata: Metadata = {
	title: 'Aether Global Pharma - Holding de propriedade intelectual farmacêutica',
	description: 'A Aether Global Pharma detém e valoriza ativos de propriedade intelectual farmacêutica, conduzindo licenciamento, parcerias com a indústria global e relacionamento com investidores especializados.',
	alternates: {
		canonical: '/sobre/aether-global-pharma'
	},
	openGraph: {
		title: 'Aether Global Pharma - Holding de propriedade intelectual farmacêutica',
		description: 'A Aether Global Pharma detém e valoriza ativos de propriedade intelectual farmacêutica, conduzindo licenciamento, parcerias com a indústria global e relacionamento com investidores especializados.',
		url: 'https://aethergp.com.br/sobre/aether-global-pharma',
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

const funcoes = [
	'Titularidade das patentes e ativos de propriedade intelectual',
	'Estratégia jurídica e posicionamento global dos ativos farmacêuticos',
	'Consolidação contratual e definição de modelos de licenciamento',
	'Desenvolvimento de parcerias com a indústria farmacêutica global',
	'Relacionamento com investidores e fundos especializados em life sciences',
	'Estruturação de acordos de royalties, milestones e eventos de liquidez'
]

const modelo = [
	{
		title: 'Captura',
		text: 'Identificação de tecnologias com potencial terapêutico em universidades e centros de pesquisa, com consolidação de titularidade e proteção de propriedade intelectual desde a origem.'
	},
	{
		title: 'Desrisking',
		text: 'Condução científica pelo ICT AetherBio+: avanço de maturidade tecnológica validado por evidências, com governança independente e sem diluição da propriedade intelectual.'
	},
	{
		title: 'Posicionamento',
		text: 'Estratégia regulatória e jurídica global, preparando o ativo para os mercados e as agências reguladoras relevantes.'
	},
	{
		title: 'Valorização',
		text: 'Licenciamento, parcerias industriais e acordos estruturados em royalties, milestones e eventos de liquidez com a indústria farmacêutica global.'
	}
]

export default function AetherGlobalPharmaPage() {
	return (
		<div className='bg-white'>

			<div className='relative pb-1 overflow-hidden' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

				<div className='fixed inset-0 z-0'>
					<Grainient
						className='w-full h-full'
						color1='#555328'
						color2='#90916c'
						color3='#555328'
						timeSpeed={0.8}
						colorBalance={0}
						warpStrength={3}
						warpFrequency={10}
						warpSpeed={3}
						warpAmplitude={40}
						blendAngle={36}
						blendSoftness={0.5}
						rotationAmount={40}
						noiseScale={2.2}
						grainAmount={0.06}
						grainScale={0.7}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={0.18}
						centerY={0.4}
						zoom={0.7}
					/>
				</div>

				<div className='absolute top-0 left-0 w-full h-[98%] z-1 bg-green-dark/35' />

				<section className='relative z-2 overflow-hidden text-green-light min-h-lvh flex flex-col'>
					<div className='relative base-container grow flex flex-col justify-end pt-32 lg:pt-[10vw] pb-16'>

						<div className='row pt-12 lg:pt-[6vw]'>
							<div className='col-lg-10'>
								<h1 className='text-60 font-heading font-semibold leading-[1.05]!'>
									<AnimatedText text='A holding que transforma propriedade intelectual em ativos farmacêuticos globais.' />
								</h1>
							</div>
						</div>

						<div className='row pt-10 lg:pt-[4vw]'>
							<div className='col-lg-3' />
							<div className='col-lg-8'>
								<p className='text-20 leading-relaxed opacity-90'>
									<AnimatedText text='A Aether Global Pharma é a holding privada responsável pela gestão estratégica e jurídica dos ativos de propriedade intelectual da plataforma. Atuando no Brasil e internacionalmente, detém a titularidade dos ativos gerados ou desenvolvidos no ecossistema da Aether e conduz as interações com a indústria farmacêutica global e investidores especializados.' />
								</p>
							</div>
						</div>

					</div>
				</section>

				<section className='relative z-2 overflow-hidden py-16 lg:py-[8vw]'>
					<div className='base-container relative z-2'>

						<div className='row pb-10 lg:pb-[5vw]'>

							<div className='col-lg-3 pb-4 lg:pb-0'>
								<h3 className='font-semibold font-heading text-green-light md:pt-3'>
									<AnimatedText text='(principais funções)' />
								</h3>
							</div>

							<div className='col-lg-9'>
								<h2 className='text-60 font-heading font-semibold text-green-light'>
									O escopo de uma holding de propriedade intelectual.
								</h2>
							</div>

						</div>

						<div className='row'>

							<div className='col-lg-3' />

							<div className='col-lg-9'>
								<StaggerUp className='grid grid-cols-1 md:grid-cols-2 gap-1'>
									{funcoes.map((item, i) => (
										<div
											key={i}
											className='flex items-start gap-4 bg-green-pale px-6 py-5 rounded-sm h-full'
										>

											<Image
												src='/img/svg/logo/icon-gp.svg'
												alt=''
												width={20}
												height={20}
												className='w-4 h-auto mt-1 shrink-0'
												loading='lazy'
											/>

											<span className='text-18 leading-relaxed'>
												{item}
											</span>

										</div>
									))}
								</StaggerUp>
							</div>

						</div>

					</div>
				</section>

				<section className='relative z-2 pt-16 lg:pt-[8vw] text-green-light'>
					<div className='base-container'>

						<div className='row items-end pb-12 lg:pb-[5vw]'>

							<div className='col-lg-7'>
								<span className='block text-sm font-semibold mb-6'>
									(o modelo)
								</span>

								<h2 className='text-60 font-heading font-semibold'>
									<AnimatedText text='Como um ativo ganha valor dentro da plataforma.' />
								</h2>
							</div>

							<div className='col-lg-4 offset-lg-1 max-lg:mt-8'>
								<p className='text-18 leading-relaxed opacity-90'>
									<AnimatedText text='Um percurso estruturado que conduz a ciência da origem acadêmica até o ativo farmacêutico pronto para o mercado global.' />
								</p>
							</div>

						</div>

						<div className='relative'>
							
							<div className='absolute -bottom-1 -left-30 w-[calc(100vw+5rem)] h-1/2 z-1 bg-white' />

							<div className='relative z-3 w-full aspect-21/9 max-md:aspect-16/10 rounded-md lg:rounded-lg overflow-hidden'>
								<ScrollingImage>
									<Image
										src={labMeeting}
										alt='Equipe da Aether em discussão estratégica de pesquisa'
										fill
										className='cover'
										loading='lazy'
										sizes='100vw'
									/>
								</ScrollingImage>
							</div>

						</div>

					</div>
				</section>

			</div>

			<section className='relative z-3 -mt-1 py-16 lg:py-[5vw] bg-white'>
				<div className='base-container'>
					<StaggerUp className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
						{modelo.map((step, i) => (
							<div
								key={i}
								className='flex flex-col gap-5 p-8 lg:p-10 rounded-sm lg:rounded-md bg-green-dark h-full text-green-light'
							>

								<p className='text-lg font-heading font-bold leading-none text-green-pale'>
									{String(i + 1).padStart(2, '0')}
								</p>

								<h3 className='text-30 font-heading font-semibold'>
									{step.title}
								</h3>

								<p className='text-18 leading-relaxed opacity-90'>
									{step.text}
								</p>

							</div>
						))}
					</StaggerUp>
				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[4vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading lg:pt-2'>
								<AnimatedText text='(plataforma integrada)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Estratégia de um lado. Ciência do outro.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-3' />

						<div className='col-lg-9'>
							<div className='relative overflow-hidden rounded-md lg:rounded-lg p-10 lg:p-[3.5vw] bg-linear-to-br from-sapphire to-navy-mid text-blue-100'>

								<div className='row'>

									<div className='col-lg-8'>

										<MaskedIcon
											url='/img/svg/logo/icon-bio.svg'
											className='block w-10 lg:w-12 aspect-square bg-blue-100 mb-8'
										/>

										<p className='text-24 font-heading leading-snug'>
											Enquanto a Aether Global Pharma conduz a dimensão estratégica, jurídica e comercial dos ativos, o ICT AetherBio+ - instituto sem fins lucrativos da plataforma - responde pela condução científica e tecnológica dos projetos, com governança independente.
										</p>

										<p className='text-18 leading-relaxed mt-6 opacity-80'>
											Essa separação de papéis protege a integridade científica dos projetos e a solidez jurídica dos ativos.
										</p>

										<div className='mt-10 lg:mt-12'>
											<Button
												style='blue-light'
												href={pages.sobreIct}
												text='Conheça o ICT AetherBio+'
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
