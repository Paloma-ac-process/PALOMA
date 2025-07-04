import { defineConfig } from '@adonisjs/mail'
import env from '#start/env'

export default defineConfig({
  mailer: 'smtp',
  mailers: {
    smtp: {
      driver: 'smtp',
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      auth: {
        type: 'login',
        user: env.get('SMTP_USER'),
        pass: env.get('SMTP_PASS'),
      },
      secure: false, // STARTTLS
    },
  },
  from: env.get('SMTP_USER'),
}) 