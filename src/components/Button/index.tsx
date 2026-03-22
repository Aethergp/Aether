// libraries
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Link } from 'next-transition-router'

// svg
import UxArrowDiagonal from '@/assets/svg/ux/arrow-diagonal.svg'
import UxClose from '@/assets/svg/ux/close.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'

type BaseLinkProps = ComponentProps<typeof Link>

interface BaseProps {
	className?: string
	style: 'light' | 'dark'
	text: string
	icon?: 'diagonal-arrow' | 'close'
}

interface LinkProps
	extends BaseProps,
		Omit<BaseLinkProps, 'children' | 'className' | 'href' | 'style'> {
	href: string
	type?: never
}

interface ButtonElProps
	extends BaseProps,
		Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			'children' | 'className' | 'style' | 'type'
		> {
	href?: never
	type?: 'button' | 'submit'
}

export type ButtonProps = LinkProps | ButtonElProps

export default function Button({
	className,
	style,
	href,
	text,
	icon,
	type,
	...rest
}: ButtonProps) {

	const classes = clsx(
		className,
		'relative flex items-stretch justify-center gap-px w-fit cursor-pointer',
		'hover:**:data-icon:scale-0 hover:**:data-icon-hover:scale-100 ',
		style === 'dark' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black',
		style === 'light' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black'
	)

	const content = (
		<>
			<span
				className={clsx(
					'py-4 px-6 transition-colors duration-200 rounded-md flex items-center justify-center leading-none',
					style === 'dark' && 'bg-green-dark text-green-light',
					style === 'light' && 'bg-green-light text-green-dark'
				)}
				data-text
			>
				{text}
			</span>

			{icon && (
				<span className='relative h-auto'>

					<span
						className={clsx(
							'h-full px-6 transition-all duration-200 rounded-md flex items-center justify-center leading-none relative z-1 origin-top-right',
							style === 'dark' && 'bg-green-dark text-green-light',
							style === 'light' && 'bg-green-light text-green-dark'
						)}
						data-icon
					>

						{icon === 'diagonal-arrow' && (
							<UxArrowDiagonal
                                className='w-2 h-2 text-current'
                                data-regular-icon
                            />
						)}

						{icon === 'close' && (
							<UxClose
                                className='w-2 h-2 text-current'
                                data-regular-icon
                            />
						)}

                        {type === 'submit' && (
                            <span
                                className='absolute inset-0 z-2 opacity-0 flex items-center justify-center'
                                data-spinner
                            >
                                <UxSpinner className='w-5 h-5 animate-spin' style={{ animationDuration: '.3s' }} />
                            </span>
                        )}

					</span>

                    <span
						className={clsx(
							'h-full px-6 transition-all duration-200 rounded-md flex items-center justify-center leading-none absolute bottom-0 left-0 z-0 origin-bottom-left scale-0',
							style === 'dark' && 'bg-green-light text-green-dark',
							style === 'light' && 'bg-green-dark text-green-light'
						)}
						data-icon-hover
					>

						{icon === 'diagonal-arrow' && (
							<UxArrowDiagonal
                                className='w-2 h-2 text-current'
                                data-regular-icon
                            />
						)}

                        {icon === 'close' && (
							<UxClose
                                className='w-2 h-2 text-current'
                                data-regular-icon
                            />
						)}

                        {type === 'submit' && (
                            <span
                                className='absolute inset-0 z-2 opacity-0 flex items-center justify-center'
                                data-spinner
                            >
                                <UxSpinner className='w-5 h-5 animate-spin' style={{ animationDuration: '.3s' }} />
                            </span>
                        )}

					</span>

				</span>
			)}
		</>
	)

	if (href) {
		const { type: _, ...linkRest } = rest as any
		return (
			<Link
				href={href}
				className={classes}
				{...linkRest}
			>
				{content}
			</Link>
		)
	}

	return (
		<button
			type={type ?? 'button'}
			className={classes}
			{...(rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'style' | 'type'>)}
		>
			{content}
		</button>
	)
}
