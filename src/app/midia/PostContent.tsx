// libraries
import clsx from 'clsx'

interface Props {
	html: string
	className?: string
}

export default function PostContent({ html, className }: Props) {
	return (
		<div
			className={clsx(
				'text-18 leading-relaxed text-green-dark',
				'[&_p]:mb-6 [&_p]:last:mb-0',
				'[&_h2]:text-36 [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-5',
				'[&_h3]:text-24 [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-4',
				'[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2',
				'[&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:opacity-70',
				'[&_blockquote]:border-l-2 [&_blockquote]:border-green-dark [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-24',
				'[&_img]:rounded-md [&_img]:my-8',
				className
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
