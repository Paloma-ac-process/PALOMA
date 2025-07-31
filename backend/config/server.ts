import env from '#start/env'
import { defineConfig } from '@adonisjs/core/http'

export default defineConfig({
  port: Number(process.env.PORT) || 3333,
  host: '0.0.0.0',
  allowMethodSpoofing: false,
  trustProxy: false,
  forceHttps: false,
  etag: false,
  jsonpCallbackName: 'callback',
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  },
}) 