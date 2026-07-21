// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ProjectForm from './ProjectForm'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph } from '@/utils/schema'

// metadata
export const metadata: Metadata = {
	title: 'Inscreva seu Projeto | Aether Global Pharma',
	description: 'Tem uma tecnologia com potencial terapêutico? Inscreva seu projeto na Aether: avaliação científica criteriosa, confidencialidade e alcance global.',
	alternates: {
		canonical: '/inscreva-seu-projeto'
	},
	openGraph: {
		title: 'Inscreva seu Projeto | Aether Global Pharma',
		description: 'Tem uma tecnologia com potencial terapêutico? Inscreva seu projeto na Aether: avaliação científica criteriosa, confidencialidade e alcance global.',
		url: 'https://aethergp.com.br/inscreva-seu-projeto',
		siteName: 'Aether Global Pharma',
		images: [
			{
				url: '/img/og/inscreva-seu-projeto.jpg',
				width: 1200,
				height: 630,
				alt: 'Aether Global Pharma'
			}
		],
		locale: 'pt_BR',
		type: 'website'
	}
}

const steps = [
	{
		title: 'Você inscreve',
		text: 'Duas etapas: seus dados e uma descrição aberta da tecnologia. Anexe um documento de apoio, se tiver.'
	},
	{
		title: 'Nós avaliamos',
		text: 'A equipe científica analisa o potencial terapêutico, o estágio de maturidade e o cenário de propriedade intelectual.'
	},
	{
		title: 'Conversamos',
		text: 'Se houver aderência ao modelo da plataforma, entramos em contato para uma conversa aprofundada, com acordo de confidencialidade quando aplicável.'
	}
]

export default function InscrevaSeuProjetoPage() {
	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-inscreva'
				data={pageGraph({
					type: 'WebPage',
					path: '/inscreva-seu-projeto',
					name: metadata.title as string,
					description: metadata.description as string,
					trail: [
						{ name: 'Inscreva seu Projeto', item: '/inscreva-seu-projeto' }
					]
				})}
			/>

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-12 lg:pb-[5vw] bg-green-light'>
				<div className='base-container'>
					<div className='row'>

						<div className='col-md-10 offset-md-2 col-lg-9 offset-lg-3'>

							<p className='font-semibold font-heading mb-6'>
								<AnimatedText text='(inscreva seu projeto)' />
							</p>

						</div>

						<div className='col-md-2 col-lg-3'>
                                <Image
                                    src='/img/svg/logo/icon-gp.svg'
                                    alt='Aether Global Pharma'
                                    width={50}
                                    height={50}
                                    className='w-8 md:w-10 lg:w-12 h-auto'
                                    loading='lazy'
                                />
                            </div>

						<div className="col-md-10 col-lg-9 max-md:pt-6">
							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									Sua pesquisa pode ser o próximo ativo farmacêutico global.
								</h1>
							</TextReveal>
						</div>

						<div className='col-md-10 offset-md-2 col-lg-9 offset-lg-3'>
							<p className='text-20 leading-relaxed text-green-dark mt-6 lg:mt-8 max-w-[62ch]'>
								<AnimatedText text='Se você desenvolve uma tecnologia com potencial terapêutico em universidade, centro de pesquisa, startup ou empresa, conte para a gente. A inscrição leva poucos minutos, em duas etapas, e toda submissão é avaliada pela equipe científica da plataforma.' />
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className='pb-12 lg:pb-[5vw] relative overflow-hidden'>

				<div className="absolute z-0 top-0 left-0 w-full h-1/2 bg-green-light" />

				<div className='base-container relative z-2'>
					<div className='row'>

						<div className='col-lg-3'>
							<h2 className='font-semibold font-heading mb-8 lg:mb-0'>
								<AnimatedText text='(como funciona)' />
							</h2>
						</div>

						<div className='col-lg-9'>
							<StaggerUp className='flex flex-col lg:grid lg:grid-cols-3 gap-3'>
								{steps.map((step, i) => (
									<div
										key={i}
										className='relative overflow-hidden bg-green-dark rounded-sm lg:rounded-md p-8 lg:p-10 lg:min-h-100'
									>
										<span className='absolute z-0 bottom-4 right-6 text-6xl leading-none font-heading font-bold text-green-pale pointer-events-none select-none max-lg:hidden'>
											{i + 1}
										</span>
										<div className='relative z-2'>
											<h3 className='text-20 font-heading font-semibold text-green-pale mb-1'>
												{step.title}
											</h3>
											<p className='text-16 leading-relaxed text-green-pale'>
												{step.text}
											</p>
										</div>
									</div>
								))}
							</StaggerUp>
						</div>

					</div>
				</div>
			</section>

			<section className='relative overflow-hidden pb-20 lg:pb-[8vw]'>

				<div className='base-container relative z-2'>

					<h2 className='font-semibold font-heading mb-6'>
						<AnimatedText text='(confidencialidade)' />
					</h2>

					<div className='row max-lg:flex max-lg:flex-col max-lg:gap-10'>

						<div className='col-md-3'>

							<div className='bg-green-pale rounded-md p-6 lg:p-8 text-16 leading-relaxed'>
								Trate esta inscrição como uma apresentação inicial. Não inclua dados experimentais sigilosos, sequências, estruturas ou qualquer informação que comprometa um futuro pedido de patente. Esses detalhes serão tratados em etapa posterior, sob acordo de confidencialidade.
							</div>

						</div>

						<div className="col-md-3" />

						<div className='col-md-6'>
							<ProjectForm />
						</div>

					</div>
				</div>

			</section>

		</div>
	)
}
