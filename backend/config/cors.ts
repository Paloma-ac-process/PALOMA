import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: [
    'http://localhost:5173', // Frontend local
    'http://localhost:3000', // Frontend local alternatif
    'https://vitrine-client.pages.dev', // Cloudflare Pages
    'https://paloma-9sq.pages.dev', // Cloudflare Pages actuel
    env.get('RAILWAY_STATIC_URL', ''), // Railway static URL
    env.get('RAILWAY_PUBLIC_DOMAIN', ''), // Railway public domain
  ].filter(Boolean),
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  headers: true,
  exposeHeaders: ['Content-Length', 'X-Kernel-Id'],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
