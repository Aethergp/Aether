// libraries
import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { useLocale } from 'next-intl'
import { Link } from 'next-transition-router'

// utils
import { getPathname } from '@/i18n/navigation'

// svg
import UxArrowDiagonal from '@/assets/svg/ux/arrow-diagonal.svg'
import UxClose from '@/assets/svg/ux/close.svg'
import UxChevronDown from '@/assets/svg/ux/chevron-down.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'
import Linkedin from '@/assets/svg/social/linkedin.svg'

type BaseLinkProps = ComponentProps<typeof Link>

interface BaseProps {
	className?: string
	style: 'light' | 'light-2' | 'dark' | 'dark-2' | 'blue' | 'blue-dark' | 'blue-light' | 'white'
	text: string
	icon?: 'diagonal-arrow' | 'close' | 'linkedin'
	chevron?: boolean
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
	chevron,
	type,
	...rest
}: ButtonProps) {

	const locale = useLocale()

	const classes = clsx(
		className,
		'relative flex items-stretch justify-center gap-px w-fit cursor-pointer',
		'hover:**:data-icon:scale-0 hover:**:data-icon-hover:scale-100 ',
		style === 'dark' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black',
		style === 'dark-2' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black hover:**:data-icon-hover:bg-black',
		style === 'light' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black',
		style === 'light-2' && 'hover:**:data-text:text-green-light hover:**:data-text:bg-black hover:**:data-icon-hover:bg-black',
		style === 'blue' && 'hover:**:data-text:text-cyan hover:**:data-text:bg-sapphire hover:**:data-icon-hover:bg-sapphire',
		style === 'blue-dark' && 'hover:**:data-text:text-light-blue hover:**:data-text:bg-wine hover:**:data-icon-hover:bg-wine',
		style === 'blue-light' && 'hover:**:data-text:text-sapphire hover:**:data-text:bg-white hover:**:data-icon-hover:bg-white',
		style === 'white' && 'hover:**:data-text:bg-light-blue hover:**:data-icon-hover:bg-light-blue'
	)

	const content = (
		<>
			<span
				className={clsx(
					'py-4 px-6 transition-colors duration-200 rounded-md flex items-center justify-center leading-none',
					(style === 'dark' || style === 'dark-2') && 'bg-green-dark text-green-light',
					(style === 'light' || style === 'light-2') && 'bg-green-light text-green-dark',
					style === 'blue' && 'bg-cyan text-sapphire',
					style === 'blue-dark' && 'bg-sapphire text-light-blue',
					style === 'blue-light' && 'bg-light-blue text-sapphire',
					style === 'white' && 'bg-white text-sapphire'
				)}
				data-text
			>
				{text}

				{chevron && (
					<UxChevronDown
						className='inline-block w-2 h-2 ml-2 transition-transform duration-200 group-hover:rotate-180'
						data-chevron
					/>
				)}
			</span>

			{icon && (
				<span className='relative h-auto'>

					<span
						className={clsx(
							'h-full px-6 transition-all duration-200 rounded-md flex items-center justify-center leading-none relative z-1 origin-top-right',
							(style === 'dark' || style === 'dark-2') && 'bg-green-dark text-green-light',
							(style === 'light' || style === 'light-2') && 'bg-green-light text-green-dark',
							style === 'blue' && 'bg-cyan text-sapphire',
							style === 'blue-dark' && 'bg-sapphire text-light-blue',
							style === 'blue-light' && 'bg-light-blue text-sapphire',
							style === 'white' && 'bg-white text-sapphire'
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

						{icon === 'linkedin' && (
							<Linkedin
                                className='w-3 h-3 text-current'
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
							style === 'dark-2' && 'bg-green-dark text-green-light',
							(style === 'light' || style === 'light-2') && 'bg-green-dark text-green-light',
							style === 'blue' && 'bg-sapphire text-cyan',
							style === 'blue-dark' && 'bg-sapphire text-light-blue',
							style === 'blue-light' && 'bg-light-blue text-sapphire',
							style === 'white' && 'bg-white text-sapphire'
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

						{icon === 'linkedin' && (
							<Linkedin
                                className='w-3 h-3 text-current'
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

		const isExternal = /^(https?:|mailto:|tel:)/.test(href)

		if (isExternal) {
			return (
				<a
					href={href}
					className={classes}
					{...linkRest}
				>
					{content}
				</a>
			)
		}

		const localizedHref = href.startsWith('/') ? getPathname({ href, locale }) : href

		return (
			<Link
				href={localizedHref}
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
