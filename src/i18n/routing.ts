// libraries
import { defineRouting } from 'next-intl/routing'

// pt-BR values are the canonical keys used everywhere in the app (routes.js,
// getPathname() calls, sitemap, breadcrumbs) - every route/component keeps
// referencing the unprefixed pt-BR path; next-intl translates the actual
// segment per locale from this map. Brand/entity names (Aether Global Pharma,
// ICT AetherBio+) and already-loanword terms (Pipeline, TRL) are deliberately
// left untranslated in the slug - see CLAUDE.md → Internationalization.
export const routing = defineRouting({
	locales: ['pt-BR', 'en-US', 'es'],
	defaultLocale: 'pt-BR',
	localePrefix: {
		mode: 'as-needed',
		prefixes: {
			'en-US': '/en-us'
		}
	},
	pathnames: {
		'/': '/',
		'/sobre': {
			'pt-BR': '/sobre',
			'en-US': '/about',
			es: '/nosotros'
		},
		'/sobre/aether-global-pharma': {
			'pt-BR': '/sobre/aether-global-pharma',
			'en-US': '/about/aether-global-pharma',
			es: '/nosotros/aether-global-pharma'
		},
		'/sobre/ict-aether-bio': {
			'pt-BR': '/sobre/ict-aether-bio',
			'en-US': '/about/ict-aether-bio',
			es: '/nosotros/ict-aether-bio'
		},
		'/sobre/equipe': {
			'pt-BR': '/sobre/equipe',
			'en-US': '/about/team',
			es: '/nosotros/equipo'
		},
		'/desenvolvimento-de-ativos': {
			'pt-BR': '/desenvolvimento-de-ativos',
			'en-US': '/asset-development',
			es: '/desarrollo-de-activos'
		},
		'/desenvolvimento-de-ativos/trl': {
			'pt-BR': '/desenvolvimento-de-ativos/trl',
			'en-US': '/asset-development/trl',
			es: '/desarrollo-de-activos/trl'
		},
		'/desenvolvimento-de-ativos/pipeline': {
			'pt-BR': '/desenvolvimento-de-ativos/pipeline',
			'en-US': '/asset-development/pipeline',
			es: '/desarrollo-de-activos/pipeline'
		},
		'/midia': {
			'pt-BR': '/midia',
			'en-US': '/media',
			es: '/medios'
		},
		'/midia/[slug]': {
			'pt-BR': '/midia/[slug]',
			'en-US': '/media/[slug]',
			es: '/medios/[slug]'
		},
		'/parceiros': {
			'pt-BR': '/parceiros',
			'en-US': '/partners',
			es: '/socios'
		},
		'/inscreva-seu-projeto': {
			'pt-BR': '/inscreva-seu-projeto',
			'en-US': '/submit-your-project',
			es: '/inscriba-su-proyecto'
		},
		'/contato': {
			'pt-BR': '/contato',
			'en-US': '/contact',
			es: '/contacto'
		},
		'/politica-de-privacidade': {
			'pt-BR': '/politica-de-privacidade',
			'en-US': '/privacy-policy',
			es: '/politica-de-privacidad'
		},
		'/termos-e-condicoes': {
			'pt-BR': '/termos-e-condicoes',
			'en-US': '/terms-and-conditions',
			es: '/terminos-y-condiciones'
		}
	}
})
