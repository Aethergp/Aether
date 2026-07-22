// libraries
import { useTranslations } from 'next-intl'

// svg
import Linkedin from '@/assets/svg/social/linkedin.svg'
import Facebook from '@/assets/svg/social/facebook.svg'
import Twitter from '@/assets/svg/social/twitter.svg'
import Whatsapp from '@/assets/svg/social/whatsapp.svg'

interface Props {
	url: string
	title: string
}

export default function ShareButtons({ url, title }: Props) {

	const t = useTranslations('MidiaPostPage')
	const encodedUrl = encodeURIComponent(url)
	const encodedTitle = encodeURIComponent(title)

	const links = [
		{ name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
		{ name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
		{ name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
		{ name: 'WhatsApp', icon: Whatsapp, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` }
	]

	return (
		<div className='flex items-center gap-5'>
			{links.map(({ name, icon: Icon, href }) => (
				<a
					key={name}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					aria-label={t('shareLabel', { name })}
					className='text-green-dark transition-opacity duration-200 hover:opacity-60'
				>
					<Icon className='w-5 h-5 text-current' />
				</a>
			))}
		</div>
	)
}
