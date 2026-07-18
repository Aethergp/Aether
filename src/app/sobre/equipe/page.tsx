// libraries
import type { Metadata } from 'next'
import Image from 'next/image'

// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import ScrollingImage from '@/components/Utils/Animations/ScrollingImage'
import Button from '@/components/Button'
import Committee from './Committee'
import ContactBanner from '@/components/ContactBanner'

// imgs
import portrait from '@/assets/img/patricia.jpg'
import claudia from '@/assets/img/team/claudia.png'
import andre from '@/assets/img/team/andre.png'
import luciani from '@/assets/img/team/luciani.png'
import katlin from '@/assets/img/team/katlin.png'
import phili from '@/assets/img/team/phili.png'

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
	'Com mais de 25 anos de experiência na indústria farmacêutica e em ambientes altamente regulados, <b>Patricia P. Oliveira</b> construiu sua trajetória na interseção entre desenvolvimento farmacêutico, estratégia regulatória, transferência de tecnologia e operações industriais.',
	'Sua experiência reúne atuação junto à ANVISA, ao MAPA e a autoridades internacionais, além da liderança de projetos, operações industriais e iniciativas de desenvolvimento tecnológico em organizações nacionais e multinacionais.',
	'Como fundadora e CEO da <b>Aether Global Pharma</b> e presidente do <b>ICT AetherBio+</b>, lidera uma plataforma integrada de <b>Pharmaceutical Asset Venture Building</b>, conectando ciência de alto potencial, propriedade intelectual, capital e indústria para construir, desenvolver e valorizar ativos farmacêuticos com potencial global.'
]

const realizacoes = [
	'Mais de 300 produtos aprovados junto à ANVISA',
	'Certificação da linha de produção da fração PMT da vacina Hib no TECPAR',
	'Certificações internacionais para exportação a mercados altamente regulados',
	'Implantação da fábrica de ácido hialurônico reticulado da América Latina',
	'Liderança de operações e equipes industriais com mais de 200 profissionais em ambiente GMP'
]

const comite = [
	{
		name: 'Claudia Ramos',
		titulacao: '',
		area: 'Scientific Advisor',
		instituicao: '',
		bio: 'Acredita que a inovação em saúde somente alcança impacto real quando ciência, regulação e estratégia caminham de forma integrada.<br /><br />Farmacêutica Bioquímica com mais de 20 anos de atuação em Assuntos Regulatórios e Vigilância Sanitária, desenvolveu sua trajetória em instituições como ANVISA, Organização Pan-Americana da Saúde (OPAS), Fundação para o Desenvolvimento Científico e Tecnológico em Saúde (FIOTEC), Ministério da Saúde e consultoria especializada para a indústria farmacêutica. Sua experiência concentra-se na produção de inteligência regulatória, elaboração de pareceres técnico-científicos, interpretação de marcos regulatórios, avaliação de processos administrativos e estruturação de documentos que subsidiam decisões estratégicas em ambientes regulatórios complexos. Ao longo da carreira, participou da consolidação de entendimentos regulatórios, da sistematização de conhecimento institucional e do desenvolvimento de análises técnicas envolvendo medicamentos, produtos para saúde, cosméticos, saneantes e alimentos, além de planejamento regulatório e estratégico para precificação de medicamentos novos junto à CMED (Câmara de Regulação do Mercado de Medicamentos). Tem especial interesse em iniciativas voltadas à maturação tecnológica de ativos farmacêuticos, governança científica, avaliação regulatória de tecnologias inovadoras, inteligência regulatória aplicada à inovação e construção de estratégias que aproximem universidades, centros de pesquisa, setor produtivo e autoridades sanitárias. Defende que a previsibilidade regulatória constitui um dos principais fatores para reduzir riscos tecnológicos, acelerar o desenvolvimento de ativos inovadores e ampliar as oportunidades de transferência de tecnologia.',
		photo: claudia,
		linked: 'https://www.linkedin.com/in/claudia-s-ramos-santos-4a9937a8/'
	},
	{
		name: 'André Adriano Chaia',
		titulacao: '',
		area: 'Scientific Advisor',
		instituicao: '',
		bio: 'Farmacêutico e mestre em Microbiologia, construiu uma trajetória de mais de 26 anos dedicada a transformar complexidade regulatória em vantagem competitiva para a indústria de life sciences. Sua carreira ganhou contornos decisivos durante quase uma década na ANVISA, onde atuou como Consultor Técnico Especializado, analisando dossiês de registro, renovação e pós-registro de medicamentos novos, genéricos e similares, avaliando segurança e eficácia, e participando da elaboração e acompanhamento de novas legislações.<br /><br />Sua atuação multissetorial - indústria, consultoria, ANVISA, ICT e ambiente acadêmico - permite uma visão 360° do ciclo de vida regulatório. Como professor universitário por mais de 10 anos, formou profissionais com mentalidade crítica e alinhada às melhores práticas de qualidade, segurança e conformidade. Em paralelo, no ICT, atua para aproximar pesquisa científica, investimentos e estratégia regulatória, ajudando projetos em estágios iniciais a atravessarem o "vale da morte" da inovação e a evoluírem até se tornarem produtos e patentes com real potencial de mercado.<br /><br />Hoje, atua como parceiro estratégico para empresas que buscam navegar com segurança em um ambiente regulatório exigente, sem perder competitividade. Combina experiência adquirida na ANVISA, histórico robusto de registros bem-sucedidos e vivência em auditorias regulatórias para desenhar caminhos normativos sólidos, encurtar prazos, prevenir retrabalhos e sustentar decisões de alto impacto em portfólios farmacêuticos complexos. Seu compromisso é usar a inteligência regulatória como alavanca de negócios, destravando oportunidades e agregando valor tangível a cada projeto.',
		photo: andre,
		linked: 'https://www.linkedin.com/in/andr%C3%A9-adriano-chaia-a94a343a/'
	},
	{
		name: 'Luciani Fagotti',
		titulacao: '',
		area: 'Scientific Advisor',
		instituicao: '',
		bio: 'Profissional com sólida experiência em Assuntos Regulatórios e Garantia da Qualidade, atua na elaboração, implementação e execução de treinamentos e procedimentos regulatórios e de qualidade.<br /><br />É fundadora da Vigidoc, empresa especializada em assessoria regulatória e qualidade para negócios que atuam em mercados regulados. Tem experiência na regularização de empresas em início de atividade, incluindo a obtenção de licenças e registros junto às autoridades sanitárias. Atua em registro de produtos perante a ANVISA, apoiando empresas no cumprimento dos requisitos regulatórios e na manutenção da conformidade ao longo do ciclo de vida dos produtos.',
		photo: luciani,
		linked: 'https://www.linkedin.com/in/lucianifagotti/'
	},
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
		photo: phili,
		//linked: 'https://www.linkedin.com/in/katlin-massirer-86a0779/'
	}
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

						<div className='col-12'>
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

								<div className='absolute z-2 bottom-4 left-4 lg:bottom-6 lg:left-6'>
									<Button
										style='light'
										href='https://www.linkedin.com/in/patricia-p-oliveira/'
										text='LinkedIn'
										icon='linkedin'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Perfil de Patricia P. Oliveira no LinkedIn'
									/>
								</div>

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
									<p
										key={i}
										dangerouslySetInnerHTML={{ __html: paragraph }}
									/>
								))}
							</div>

							<div className='mt-12'>

								<h4 className='font-semibold font-heading'>
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

				</div>
			</section>

			<ContactBanner className='bg-green-pale pb-20 lg:pb-[10vw]' />

		</div>
	)
}
