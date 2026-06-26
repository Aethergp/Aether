type Props = {
	url: string
	className?: string
	position?: string
}

export default function MaskedIcon({ url, className, position = 'center' }: Props) {
	return (
		<span
			aria-hidden='true'
			className={className}
			style={{
				maskImage: `url(${url})`,
				WebkitMaskImage: `url(${url})`,
				maskRepeat: 'no-repeat',
				WebkitMaskRepeat: 'no-repeat',
				maskPosition: position,
				WebkitMaskPosition: position,
				maskSize: 'contain',
				WebkitMaskSize: 'contain'
			}}
		/>
	)
}
