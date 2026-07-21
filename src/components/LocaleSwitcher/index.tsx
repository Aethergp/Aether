'use client'

// libraries
import clsx from 'clsx'
import { useLocale } from 'next-intl'

// components
import Button from '@/components/Button'

// utils
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const localeLabels: Record<string, string> = {
	'pt-BR': 'PT',
	'en-US': 'EN',
	es: 'ES'
}

interface Props {
	className?: string
	// 'dropdown' = header trigger + hover panel; 'inline' = flat pill group (fs menu, no hover on touch)
	variant?: 'dropdown' | 'inline'
}

export default function LocaleSwitcher({ className, variant = 'dropdown' }: Props) {
	const locale = useLocale()
	const pathname = usePathname()
	const router = useRouter()

	if (variant === 'inline') {
		return (
			<div className={clsx('flex items-center gap-2', className)}>
				{routing.locales.map((item) => (
					<button
						key={item}
						type='button'
						onClick={() => router.replace(pathname, { locale: item })}
						className={clsx(
							'px-4 py-2 rounded-sm text-16 font-heading font-medium cursor-pointer transition-colors duration-200',
							item === locale
								? 'bg-green-dark text-green-light'
								: 'bg-green-dark/[0.07] text-green-dark hover:bg-green-dark hover:text-green-light'
						)}
					>
						{localeLabels[item]}
					</button>
				))}
			</div>
		)
	}

	const otherLocales = routing.locales.filter((item) => item !== locale)

	return (
		<div className={clsx('relative group', className)}>
			<Button
				text={localeLabels[locale]}
				style='dark'
				chevron
			/>

			<div className='absolute top-full right-0 pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-10'>
				<ul className='flex flex-col gap-1 bg-green-pale rounded-md p-2 min-w-24'>
					{otherLocales.map((item) => (
						<li key={item}>
							<button
								type='button'
								onClick={() => router.replace(pathname, { locale: item })}
								className='block w-full text-left px-4 py-2.5 rounded-sm text-green-dark whitespace-nowrap cursor-pointer transition-colors duration-200 hover:bg-green-dark hover:text-green-light'
							>
								{localeLabels[item]}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
