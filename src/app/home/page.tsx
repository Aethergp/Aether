// libraries
import Image from 'next/image'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import { Form, Input, Submit, Textarea } from '@/components/Form'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

export default function Home() {
	return (
		<div className='bg-white'>

			<section id='banner'>
				<div className='base-container min-h-[50vh]'>
					banner
				</div>
			</section>

			<section id='contexto'>
				<div className='base-container min-h-[50vh]'>
					sobre
				</div>
			</section>

			<section id='criacao'>
				<div className='base-container min-h-[50vh]'>
					criacao
				</div>
			</section>

			<section id='sobre'>
				<div className='base-container min-h-[50vh]'>
					plataforma
				</div>
			</section>

			<section id='arquitetura'>
				<div className='base-container min-h-[50vh]'>
					arquitetura
				</div>
			</section>

			<section id='aether-global-pharma'>
				<div className='base-container pb-20 lg:pb-[15vw]'>
					
					<div className='row'>
						<div className='col-lg-push-2 col-lg-8'>
							<Image
								src='/img/svg/logo/aether-gp.svg'
								alt='Aether Global Pharma'
								width={1180}
								height={135}
								className='w-full h-auto'
								loading='lazy'
							/>	
						</div>
					</div>

					<div className='row pt-12 lg:pt-[7vw] max-md:flex max-md:flex-col-reverse max-md:gap-10'>

						<div className='col-md-2 col-xl-3'>
							<Image
								src='/img/svg/logo/icon-gp.svg'
								alt='Aether Global Pharma'
								width={50}
								height={50}
								className='w-8 md:w-10 lg:w-12 h-auto'
								loading='lazy'
							/>
						</div>

						<div className='col-md-10 col-lg-8 col-xl-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='A Aether Global Pharma é a holding privada responsável pela gestão estratégica e jurídica dos ativos de propriedade intelectual da plataforma.<br /><br />Atuando no Brasil e internacionalmente, a empresa detém a titularidade dos ativos gerados ou desenvolvidos no ecossistema da Aether e conduz as interações com a indústria farmacêutica global e investidores especializados.' />
							</p>
						</div>

					</div>

					<div className='row pt-10 lg:pt-[5vw]'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<StaggerUp className='flex flex-col gap-1'>
								{[
									'Titularidade das patentes e ativos de propriedade intelectual',
									'Estratégia jurídica e posicionamento global dos ativos farmacêuticos',
									'Consolidação contratual e definição de modelos de licenciamento',
									'Desenvolvimento de parcerias com a indústria farmacêutica global',
									'Relacionamento com investidores e fundos especializados em life sciences',
									'Estruturação de acordos de royalties, milestones e eventos de liquidez'
								].map((item, i) => (
									<div
										key={i}
										className='flex items-center gap-3 bg-green-pale px-6 py-4 rounded-sm'
									>

										<Image
											src='/img/svg/logo/icon-gp.svg'
											alt='GP'
											width={20}
											height={20}
											className='w-4 h-auto'
											loading='lazy'
										/>

										<span>
											{item}
										</span>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

			<section id='aether-bio'>
				<div className='base-container'>
					
					<div className='row'>
						<div className='col-lg-push-2 col-lg-8'>
							<Image
								src='/img/svg/logo/aether-bio.svg'
								alt='Aether Bio'
								width={1179}
								height={147}
								className='w-full h-auto'
								loading='lazy'
							/>	
						</div>
					</div>

					<div className='row pt-12 lg:pt-[7vw] max-md:flex max-md:flex-col-reverse max-md:gap-10'>

						<div className='col-md-2 col-xl-3'>
							<Image
								src='/img/svg/logo/icon-bio.svg'
								alt='Aether Bio'
								width={50}
								height={50}
								className='w-8 md:w-10 lg:w-12 h-auto'
								loading='lazy'
							/>
						</div>

						<div className='col-md-10 col-lg-8 col-xl-6'>
							<p className='text-20 leading-relaxed'>
								<AnimatedText text='O ICT AetherBio+ é o instituto de ciência, tecnologia e inovação da plataforma, responsável pela condução científica e tecnológica dos projetos.<br /><br />Como instituição sem fins lucrativos, o AetherBio+ promove o avanço da maturidade tecnológica das descobertas científicas, assegura a governança científica independente de cada projeto e viabiliza a captação de fomento público nacional e internacional, apoiado por um comitê científico composto por pesquisadores especialistas em diferentes áreas terapêuticas.' />
							</p>
						</div>

					</div>

					<div className='row pt-10 lg:pt-[5vw]'>

						<div className='col-lg-3'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(principais funções)' />
							</h3>
						</div>

						<div className='col-lg-6'>
							<StaggerUp className='flex flex-col gap-1'>
								{[
									'Desrisking tecnológico baseado em evidências científicas',
									'Captação de fomento público nacional e internacional',
									'Governança científica independente dos projetos',
									'Gestão do avanço de TRLs sem diluição da propriedade intelectual',
									'Articulação com universidades, centros de pesquisa e CROs',
									'Geração qualificada de projetos científicos com potencial translacional'
								].map((item, i) => (
									<div
										key={i}
										className='flex items-center gap-3 bg-green-pale px-6 py-4 rounded-sm'
									>

										<Image
											src='/img/svg/logo/icon-bio-green-dark.svg'
											alt='Bio+'
											width={20}
											height={20}
											className='w-4 h-auto'
											loading='lazy'
										/>

										<span>
											{item}
										</span>

									</div>
								))}
							</StaggerUp>
						</div>

					</div>

				</div>
			</section>

			<section
				id='parceiros'
				className='my-20 lg:my-[10vw]'
			>
				<div className='base-container'>
					
					<div className='row pb-10 lg:pb-[7vw]'>

						<div className='col-lg-2 col-xl-3' />

						<div className='col-lg-5 col-xl-4'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Ecossistema científico e institucional
							</AnimatedTitle>
						</div>

						<div className='col-xl-1 max-xl:hidden' />

						<div className='col-lg-5 col-xl-4 pt-4 lg:pt-1 xl:pt-3'>
							<p className='text-20'>
								<AnimatedText text='A plataforma Aether opera em colaboração com universidades, centros de pesquisa e instituições de inovação que compõem um ecossistema científico altamente qualificado.' />
							</p>
						</div>

					</div>

					<StaggerScale
						className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-px'
						infinite
					>
						{[
							{
								src: '/img/partners/unicamp.png',
								alt: 'Unicamp',
								width: 106,
								height: 106
							},
							{
								src: '/img/partners/cqmed.png',
								alt: 'CQMED - Centro de Química Medicinal',
								width: 171,
								height: 61
							},
							{
								src: '/img/partners/ufmg.png',
								alt: 'UFMG',
								width: 155,
								height: 60
							},
							{
								src: '/img/partners/farmavax.png',
								alt: 'FarmaVax',
								width: 174,
								height: 61
							},
							{
								src: '/img/partners/embrapii.png',
								alt: 'EMBRAPII',
								width: 106,
								height: 84
							},
							{
								src: '/img/partners/inova.png',
								alt: 'INOVA - Agência de Inovação Unicamp',
								width: 163,
								height: 56
							}
						].map((item, i) => (
							<div
								key={i}
								className='flex items-center justify-center w-full h-auto aspect-square bg-white border border-gray-lighter/25 p-8 xs:p-10 sm:p-12 transition-colors duration-200 hover:border-green-dark group'
							>
								<Image
									src={item.src}
									alt={item.alt}
									width={item.width}
									height={item.height}
									className='block w-full max-w-[85%] max-h-[55%] h-auto object-contain brightness-0 opacity-75 group-hover:opacity-100 transition-opacity duration-200'
								/>
							</div>
						))}
					</StaggerScale>

				</div>
			</section>

			<section
				id='contato'
				className='py-20 lg:py-[10vw]'
			>
				<div className='base-container'>
					
					<div className='row pb-20 lg:pb-[10vw]'>
						<div className='col-lg-9 col-lg-push-2'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Entre em contato para oportunidades de parceria científica, desenvolvimento tecnológico ou colaboração institucional.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row'>

						<div className='col-lg-2' />

						<div className='col-lg-3 col-xl-4 pb-10 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(contato)' />
							</h3>
						</div>

						<div className='col-lg-6 col-xl-5'>
							<Form
								endpoint='#'
								onSuccess={{
									title: 'Mensagem enviada com sucesso',
									text: 'Obrigado por entrar em contato. Entraremos em contato o mais breve possível.'
								}}
								onError={{
									title: 'Erro ao enviar mensagem',
									text: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.'
								}}
							>

								<Input
									id='nome'
									label='Nome'
									name='Nome'
									type='text'
									placeholder='Nome completo'
									required
								/>

								<Input
									id='email'
									label='Email'
									name='Email'
									type='email'
									placeholder='Email'
									required
								/>

								<Textarea
									id='mensagem'
									label='Mensagem'
									name='Mensagem'
									placeholder='Mensagem'
									required
								/>

								<Submit text='Enviar' />

							</Form>
						</div>

					</div>

				</div>
			</section>

		</div>
	)
}
