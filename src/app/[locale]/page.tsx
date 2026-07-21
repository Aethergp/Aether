// components
import Banner from './_home/Banner'
import Context from './_home/Context'
import About from './_home/About'
import Companies from './_home/Companies'
import Partners from './_home/Partners'
import Contact from './_home/Contact'
import JsonLd from '@/components/JsonLd'

// utils
import { pageGraph, ORG_ID } from '@/utils/schema'

export default function Home() {
	return (
		<div className='bg-white'>

			<JsonLd
				id='jsonld-home'
				data={pageGraph({
					path: '/',
					name: 'Aether Global Pharma | Ciência e Ativos Farmacêuticos',
					description: 'Plataforma especializada em transformar ciência em ativos farmacêuticos: desrisking científico, propriedade intelectual e licenciamento global.',
					trail: [],
					extend: {
						mainEntity: { '@id': ORG_ID }
					}
				})}
			/>

			<Banner />

			<Context />

			<About />

			<Companies />

			<Partners />

			{/* <Contact /> */}

		</div>
	)
}
