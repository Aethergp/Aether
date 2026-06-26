'use client'

// libraries
import { useRef } from 'react'

// components
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Button from '@/components/Button'

// utils
import { pages } from '@/utils/routes'

export default function PDCTA() {

	const pinRef = useRef<HTMLElement | null>(null)

	return (
		<section
			ref={pinRef}
			className='min-h-lvh flex flex-col items-center justify-center py-20 lg:py-[8vw] px-4'
		>
			<div className='base-container'>
				<div className='row'>

					<div className='col-lg-8 offset-lg-2 text-center'>

						<TextReveal
							className='text-60 font-heading font-semibold text-center'
							scrub={1.5}
							pinSection={pinRef}
						>
							<h2 className='flex flex-wrap justify-center items-center gap-x-4'>
								Tem uma tecnologia em desenvolvimento? Submeta seu projeto a plataforma Aether.
							</h2>
						</TextReveal>

						<p className='text-20 leading-relaxed mt-10 lg:mt-12 opacity-70 max-w-2xl mx-auto'>
							Avaliamos projetos científicos com potencial translacional em biotecnologia e saúde humana, conduzidos por pesquisadores, startups e instituições de pesquisa no Brasil e no exterior.
						</p>

						<div className='flex flex-wrap justify-center gap-4 mt-10 lg:mt-12'>
							<Button
								style='dark'
								href={pages.inscreva}
								text='Inscreva seu projeto'
								icon='diagonal-arrow'
							/>
							<Button
								style='light-2'
								href={pages.contato}
								text='Fale com nosso time'
								icon='diagonal-arrow'
							/>
						</div>

					</div>

				</div>
			</div>
		</section>
	)
}
