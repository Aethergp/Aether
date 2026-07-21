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
	title: 'Política de Privacidade | Aether Global Pharma',
	description: 'Política de Privacidade da Aether Global Pharma.',
	alternates: {
		canonical: '/politica-de-privacidade'
	},
	openGraph: {
		title: 'Política de Privacidade | Aether Global Pharma',
		description: 'Política de Privacidade da Aether Global Pharma.',
		url: 'https://aethergp.com.br/politica-de-privacidade',
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

export default function PoliticaDePrivacidadePage() {
	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-privacidade'
				data={pageGraph({
					type: 'WebPage',
					path: '/politica-de-privacidade',
					name: metadata.title as string,
					description: metadata.description as string,
					trail: [
						{ name: 'Política de Privacidade', item: '/politica-de-privacidade' }
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
									Política de Privacidade
								</h1>
							</TextReveal>

							<p className='text-18 leading-relaxed text-green-dark mt-10 lg:mt-20'>
								Esta política é efetiva a partir de 15 de junho de 2026.
							</p>

						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>
						<div className='col-lg-9 col-xl-6 offset-lg-3'>
							<div className='rich-text'>

								<p>
									A sua privacidade é importante para nós. É política do Aether Global Pharma respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Aether Global Pharma, e outros sites que possuímos e operamos.
								</p>

								<p>
									Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
								</p>

								<p>
									Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
								</p>

								<p>
									Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
								</p>

								<p>
									O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
								</p>

								<p>
									Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
								</p>

								<p>
									O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
								</p>

								<ul>
									<li>
										O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
									</li>

									<li>
										Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
									</li>

									<li>
										Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
									</li>

									<li>
										Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
									</li>
								</ul>
								
							</div>
						</div>
					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(compromisso do usuário)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Aether Global Pharma oferece no site e com caráter enunciativo, mas não limitativo:
								</p>

								<ul>
									<li>
										A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
									</li>

									<li>
										B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
									</li>

									<li>
										C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Aether Global Pharma, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
									</li>
								</ul>
								
							</div>
						</div>

					</div>

					<div className='row mt-10 lg:mt-[5vw]'>

						<div className="col-lg-3">
							<h2 className='font-semibold font-heading'>
								<AnimatedText text='(mais informações)' />
							</h2>
						</div>

						<div className='col-lg-9 col-xl-6 max-lg:mt-4'>
							<div className='rich-text'>

								<p>
									Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
								</p>
								
							</div>
						</div>
						
					</div>

				</div>
			</section>

		</div>
	)
}
