import { BaseMail } from '@adonisjs/mail'

export default class VerificationCodeMail extends BaseMail {
  constructor(
    public email: string,
    public code: string
  ) {
    super()
  }

  prepare() {
    this.message
      .to(this.email)
      .subject('Votre code de vérification')
      .htmlView('emails/verification_code', { code: this.code })
  }
} 