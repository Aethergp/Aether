// components
import Grainient from '@/components/Grainient'

export const metadata = {
	title: 'Erro 404: Página não encontrada | Aether Global Pharma'
}

export default function Error404() {
	return (
		<main className=''>
			<section className='min-h-svh relative overflow-hidden' style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>

				<Grainient
					className='absolute! inset-0 z-0 w-full h-full'
					color1='#555328'
					color2='#90916c'
					color3='#555328'
					timeSpeed={0.9}
					colorBalance={0}
					warpStrength={1}
					warpFrequency={11.3}
					warpSpeed={3.2}
					warpAmplitude={41}
					blendAngle={36}
					blendSoftness={0.54}
					rotationAmount={430}
					noiseScale={2.2}
					grainAmount={0.06}
					grainScale={0.7}
					grainAnimated={false}
					contrast={1.5}
					gamma={1}
					saturation={1}
					centerX={-0.12}
					centerY={0.48}
					zoom={0.65}
				/>

				<h1 className='z-3 text-100 font-heading font-bold uppercase tracking-tighter text-[40vw]! leading-none! text-green-light absolute bottom-0 lg:-bottom-16 right-6 sm:right-10'>
					404
				</h1>
			</section>
		</main>
	)
}
