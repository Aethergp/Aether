'use client'

// libraries
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import Button from '@/components/Button'
import MediaCard from '@/components/MediaCard'

// utils
import { type MediaPost } from './db/data'
import { pages } from '@/utils/routes'

interface Props {
	posts: MediaPost[]
}

export default function RelatedPosts({ posts }: Props) {

	const swiperRef = useRef<SwiperType | null>(null)

	if (posts.length === 0) return null

	return (
		<section className='py-16 lg:py-[8vw]'>
			<div className='base-container'>

				<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10 lg:mb-[4vw]'>

					<AnimatedTitle
						style='dark'
						className='text-60 font-heading font-semibold'
					>
						Leia também
					</AnimatedTitle>

					<Button
						style='dark'
						href={pages.midia}
						text='Veja todas'
						icon='diagonal-arrow'
					/>

				</div>

				<div className='relative w-full'>
					<Swiper
						modules={[Scrollbar, FreeMode, Mousewheel]}
						allowTouchMove
						slidesPerView={1.1}
						spaceBetween={20}
						freeMode
						mousewheel={{ forceToAxis: true }}
						scrollbar={{ draggable: true }}
						simulateTouch
						onSwiper={(swiper) => { swiperRef.current = swiper }}
						breakpoints={{
							768: { slidesPerView: 2, spaceBetween: 25 },
							992: { slidesPerView: 3, spaceBetween: 30 }
						}}
						className='overflow-visible!'
					>
						{posts.map((post) => (
							<SwiperSlide key={post.id} className='h-auto!'>
								<MediaCard post={post} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

			</div>
		</section>
	)
}
