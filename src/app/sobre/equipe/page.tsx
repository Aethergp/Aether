// libraries
import type { Metadata } from 'next'
import { Link } from 'next-transition-router'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Committee from './Committee'

// utils
import { pages } from '@/utils/routes'

// img - placeholders (swap for approved photos later)
import portrait from '@/assets/img/patricia.png'
import abstract from '@/assets/img/abstract.jpg'
import member1 from '@/assets/img/team/member-1.jpg'
import member2 from '@/assets/img/team/member-2.jpg'
import member3 from '@/assets/img/team/member-3.jpg'
import member4 from '@/assets/img/team/member-4.jpg'
import member5 from '@/assets/img/team/member-5.jpg'
import member6 from '@/assets/img/team/member-6.jpg'

// svg
import Linkedin from '@/assets/svg/social/linkedin.svg'

export const metadata: Metadata = {
	title: 'Equipe - Lideranças e comitê científico | Aether Global Pharma',
	description: 'Conheça as lideranças da Aether Global Pharma e do ICT AetherBio+: experiência em desenvolvimento farmacêutico, propriedade intelectual e governança científica.',
	alternates: {
		canonical: '/sobre/equipe'
	},
	openGraph: {
		title: 'Equipe - Lideranças e comitê científico | Aether Global Pharma',
		description: 'Conheça as lideranças da Aether Global Pharma e do ICT AetherBio+: experiência em desenvolvimento farmacêutico, propriedade intelectual e governança científica.',
		url: 'https://aethergp.com.br/sobre/equipe',
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

const bio = [
	'Há mais de 25 anos, Patricia atua na interseção entre desenvolvimento farmacêutico, estratégia regulatória e operações industriais, liderando projetos que transformam conhecimento científico em soluções viáveis e escaláveis.',
	'Sua trajetória combina experiência regulatória junto à ANVISA, ao MAPA e a autoridades internacionais com engenharia farmacêutica e operações industriais em multinacionais como P&G, Reckitt Benckiser e JTI, além de instituições como o TECPAR e o Laboratório Lifal.',
	'À frente da Aether, lidera a plataforma que conecta ciência, capital e indústria para transformar moléculas promissoras e tecnologias em saúde em ativos farmacêuticos globais.'
]

const realizacoes = [
	'Mais de 300 produtos aprovados junto à ANVISA',
	'Certificação da linha de produção da fração PMT da vacina Hib no TECPAR',
	'Certificações internacionais para exportação em mercados altamente regulados',
	'Implantação da primeira fábrica de ácido hialurônico reticulado da América Latina',
	'Liderança de equipes industriais com mais de 200 profissionais em ambiente GMP'
]

// PLACEHOLDER - nomes, titulações, instituições, bios e fotos do comitê são
// TEMPORÁRIOS. A lista real depende do alinhamento jurídico da Patricia com
// cada pesquisador (nome, titulação, área, instituição + autorização individual).
const bioPlaceholder = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pesquisador(a) com atuação em desenvolvimento e validação de tecnologias em saúde. Nome, titulação e instituição a confirmar com o cliente.'

const comite = [
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Química Medicinal', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member4 },
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Farmacologia', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member2 },
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Biotecnologia', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member3 },
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Imunologia', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member5 },
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Engenharia Farmacêutica', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member1 },
	{ name: 'Nome a confirmar', titulacao: 'PhD', area: 'Assuntos Regulatórios', instituicao: 'Instituição a confirmar', bio: bioPlaceholder, photo: member6 }
]

export default function EquipePage() {
	return (
		<div className='bg-white'>

			<section className='pt-[26vh] lg:pt-[30vh] pb-16 lg:pb-[7vw]'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(equipe)' />
							</h3>
						</div>

						<div className='col-lg-9'>
							<h1 className='text-72 font-heading font-bold text-green-dark'>
								<AnimatedText text='Pessoas que conectam ciência e estratégia.' />
							</h1>

							<p className='text-24 font-heading mt-8 lg:mt-12 lg:pr-[8vw]'>
								<AnimatedText text='A Aether reúne lideranças com experiência em desenvolvimento farmacêutico, propriedade intelectual e gestão científica, apoiadas por um comitê de pesquisadores especialistas em diferentes áreas terapêuticas.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='py-16 lg:py-[8vw]'>

				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(liderança)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								Quem responde pela plataforma.
							</AnimatedTitle>
						</div>
					</div>

					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-12 lg:items-stretch'>

						<div className='col-lg-5'>
							<div className='relative w-full max-lg:aspect-4/5 lg:h-full lg:min-h-150 overflow-hidden rounded-md lg:rounded-lg'>

								<ScrollingImage>
									<Image
										src={portrait}
										alt='Patricia P. Oliveira, CEO e Fundadora da Aether Global Pharma'
										fill
										className='cover'
										sizes='(max-width: 992px) 100vw, 42vw'
									/>
								</ScrollingImage>

								<a
									href='https://www.linkedin.com/in/patricia-p-oliveira/'
									target='_blank'
									rel='noopener noreferrer'
									aria-label='Perfil de Patricia P. Oliveira no LinkedIn'
									className='absolute z-2 bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-md bg-green-dark text-green-light transition-colors duration-300 hover:bg-black'
								>
									<Linkedin className='w-6 h-6 lg:w-7 lg:h-7' />
								</a>

							</div>
						</div>

						<div className='col-lg-6 offset-lg-1 flex flex-col justify-center py-2'>

							<span className='block text-sm font-semibold uppercase tracking-wide opacity-60 mb-3'>
								(CEO &amp; Fundadora)
							</span>

							<h3 className='text-60 font-heading font-semibold leading-[1.05]!'>
								Patricia P. Oliveira
							</h3>

							<div className='flex flex-col gap-5 mt-8 lg:mt-10 text-18 leading-relaxed lg:pr-[4vw]'>
								{bio.map((paragraph, i) => (
									<p key={i}>{paragraph}</p>
								))}
							</div>

							<div className='mt-12 lg:mt-14'>

								<h4 className='font-semibold font-heading mb-8 lg:mb-10'>
									<AnimatedText text='(realizações em destaque)' />
								</h4>

								<StaggerUp className='flex flex-col'>
									{realizacoes.map((item, i) => (
										<div
											key={i}
											className='py-5 border-t border-green-dark/15 first:border-t-0'
										>
											<p className='text-20 leading-snug'>{item}</p>
										</div>
									))}
								</StaggerUp>

							</div>

						</div>

					</div>

				</div>
			</section>

			<section className='py-16 lg:py-[8vw] bg-green-pale'>
				<div className='base-container'>

					<div className='row pb-10 lg:pb-[5vw]'>
						<div className='col-lg-3 pb-4 lg:pb-0'>
							<h3 className='font-semibold font-heading'>
								<AnimatedText text='(comitê científico)' />
							</h3>
						</div>
						<div className='col-lg-9'>
							<AnimatedTitle
								style='dark'
								className='text-60 font-heading font-semibold'
							>
								A ciência que sustenta cada decisão.
							</AnimatedTitle>

							<p className='text-20 leading-relaxed mt-6 lg:mt-8 lg:pr-[8vw]'>
								<AnimatedText text='Um corpo de pesquisadores especialistas dá respaldo técnico à avaliação dos projetos e à governança científica da plataforma. Clique em cada perfil para conhecer a trajetória.' />
							</p>
						</div>
					</div>

					<Committee members={comite} />

					<p className='text-16 opacity-60 mt-10 lg:mt-12'>
						Os nomes e perfis do comitê serão divulgados após o alinhamento com cada pesquisador.
					</p>

				</div>
			</section>

			<section className='bg-green-pale pb-20 lg:pb-[10vw]'>
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
									<AnimatedText text='Quer trabalhar com a gente ou propor uma colaboração?' />
								</h2>

								<p className='text-20 mt-6 lg:mt-8 opacity-90'>
									Buscamos pesquisadores, especialistas e parceiros que compartilhem o compromisso de transformar ciência em soluções com impacto global. Fale com a nossa equipe e vamos explorar caminhos juntos.
								</p>

								<div className='flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 lg:mt-12'>

									<Button
										style='light-2'
										href={pages.contato}
										text='Entre em contato'
										icon='diagonal-arrow'
									/>

									<Link
										href={pages.inscreva}
										className='hover-underline-alt hover-underline-alt--light font-heading font-semibold cursor-pointer'
									>
										Inscreva seu projeto
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
