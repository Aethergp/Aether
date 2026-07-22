// components
import StaggerUp from '@/components/Utils/Animations/StaggerUp'
import MediaCard from '@/components/MediaCard'

// utils
import { type MediaPost } from './db/data'

interface Props {
	posts: MediaPost[]
	emptyLabel: string
}

export default function MediaGrid({ posts, emptyLabel }: Props) {
	if (posts.length === 0) {
		return (
			<p className='text-20 opacity-70 py-10'>
				{emptyLabel}
			</p>
		)
	}

	return (
		<StaggerUp className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20'>
			{posts.map((post) => (
				<div key={post.id}>
					<MediaCard post={post} />
				</div>
			))}
		</StaggerUp>
	)
}
