// libraries
import Image from 'next/image'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import StaggerScale from '@/components/Utils/Animations/StaggerScale'
import StaggerUp from '@/components/Utils/Animations/StaggerUp'

import Companies from './Companies'
import Partners from './Partners'
import Contact from './Contact'

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

			<Companies />

			<Partners />

			<Contact />

		</div>
	)
}
