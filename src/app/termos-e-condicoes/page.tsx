// libraries
import type { Metadata } from 'next'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import StrokePath from '@/components/Utils/Animations/StrokePath'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph } from '@/utils/schema'

// metadata
export const metadata: Metadata = {
	title: 'Termos & Condições | Aether Global Pharma',
	description: 'Termos & Condições de uso da Aether Global Pharma.',
	alternates: {
		canonical: '/termos-e-condicoes'
	},
	openGraph: {
		title: 'Termos & Condições | Aether Global Pharma',
		description: 'Termos & Condições de uso da Aether Global Pharma.',
		url: 'https://aethergp.com.br/termos-e-condicoes',
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

export default function TermosECondicoesPage() {
	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-termos'
				data={pageGraph({
					type: 'WebPage',
					path: '/termos-e-condicoes',
					name: metadata.title as string,
					description: metadata.description as string,
					trail: [
						{ name: 'Termos & Condições', item: '/termos-e-condicoes' }
					]
				})}
			/>

			<section className='pt-36 lg:pt-56 xl:pt-[12vw] pb-20 lg:pb-[8vw]'>

				<StrokePath
					viewBox='0 0 657 1636'
					d='M-138.5 175.674C-20 -59.8263 472.32 17.711 584.5 556.174C707 1144.17 297.5 1493.17 -97.5 1587.17'
					className='z-0 top-[20%] -right-80 w-[85vw] sm:w-[55vw] lg:w-[40vw] scale-x-[-1] max-lg:hidden!'
					//markers
					start='10% 30%'
					end='50% 10%'
				/>

				<div className='base-container'>

					<div className='row'>

						<div className='col-lg-3'>

							<p className='font-semibold font-heading lg:pt-4'>
								<AnimatedText text='(seus direitos)' />
							</p>

						</div>

						<div className='col-lg-9 mt-2 lg:mt-0'>

							<TextReveal>
								<h1 className='text-60 font-heading font-semibold text-green-dark'>
									Termos & Condições
								</h1>
							</TextReveal>

							<p className='text-18 leading-relaxed text-green-dark mt-10 lg:mt-20'>
								Estes termos e condições são efetivos a partir de 15 de junho de 2026.
							</p>

						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>
						<div className='col-lg-9 col-xl-6 offset-lg-3'>
							<div className='rich-text'>

								<p>
									Ao acessar ao site Aether Global Pharma, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
								</p>
								
							</div>
						</div>
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(uso de licença)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Aether Global Pharma , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
								</p>

								<ol>
									<li>
										modificar ou copiar os materiais;
									</li>

									<li>
										usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);
									</li>

									<li>
										tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Aether Global Pharma;
									</li>

									<li>
										remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou
									</li>

									<li>
										transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.
									</li>
								</ol>

								<p>
									Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Aether Global Pharma a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
								</p>
								
							</div>
						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(isenção de responsabilidade)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<ol>
									<li>
										Os materiais no site da Aether Global Pharma são fornecidos 'como estão'. Aether Global Pharma não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
									</li>

									<li>
										Além disso, o Aether Global Pharma não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
									</li>
								</ol>
								
							</div>
						</div>
						
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(limitações)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									Em nenhum caso o Aether Global Pharma ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Aether Global Pharma, mesmo que Aether Global Pharma ou um representante autorizado da Aether Global Pharma tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
								</p>
								
							</div>
						</div>
						
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(precisão dos materiais)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									Os materiais exibidos no site da Aether Global Pharma podem incluir erros técnicos, tipográficos ou fotográficos. Aether Global Pharma não garante que qualquer material em seu site seja preciso, completo ou atual. Aether Global Pharma pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Aether Global Pharma não se compromete a atualizar os materiais.
								</p>
								
							</div>
						</div>
						
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(links)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									O Aether Global Pharma não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Aether Global Pharma do site. O uso de qualquer site vinculado é por conta e risco do usuário.
								</p>
								
							</div>
						</div>
						
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(modificações)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									O Aether Global Pharma pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
								</p>
								
							</div>
						</div>
						
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(lei aplicável)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									Estes termos e condições são regidos e interpretados de acordo com as leis do Aether Global Pharma e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
								</p>
								
							</div>
						</div>
						
					</div>

				</div>
			</section>

		</div>
	)
}
