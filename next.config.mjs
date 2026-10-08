// libraries
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */

const nextConfig = {
	turbopack: {
		rules: {
			// `?url` imports skip svgr and fall through to Next's default static asset handling
			'*.svg': {
				condition: { not: { query: /[?&]url(?=&|$)/ } },
				loaders: [{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [{
								name: 'preset-default',
								params: {
									overrides: {
										removeViewBox: false
									}
								}
							}]
						}
					}
				}],
				as: '*.js'
			}
		}
	},
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'wp.aethergp.com.br'
			}
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		qualities: [65, 75, 85, 90, 100]
	},
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true
			}
		]
	},
	async headers() {
		return [
			{
				source: '/:path(img|videos)/:file*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	}
}

export default withNextIntl(nextConfig)