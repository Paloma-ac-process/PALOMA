import { defineConfig, transports } from '@adonisjs/mail'
import env from '#start/env'

export default defineConfig({
  default: 'smtp',
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      auth: {
        type: 'login',
        user: env.get('SMTP_USER'),
        pass: env.get('SMTP_PASS'),
      },
      secure: false,
    }),
  },
  from: {
    address: env.get('SMTP_USER'),
    name: env.get('APP_NAME', 'AdonisJS App'),
  },
})