import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/checkout/success', '/conta', '/entrar', '/registrar', '/confirmar-email', '/esqueci-senha', '/nova-senha'],
    },
    sitemap: 'https://rcastro.com.br/sitemap.xml',
  }
}

