import nodemailer from 'nodemailer'

import { MailerError } from '@/api/domain/errors/catalog.errors'
import { Logger } from '@/api/domain/providers/logger/logger'
import { Mailer } from '@/api/domain/providers/mailer/mailer'
import { inject } from '@/api/infra/dependency-injection/registry'

export class NodemailerAdapter implements Mailer {
  @inject('logger')
  private readonly logger!: Logger

  async sendMail(to: string, subject: string, text?: string, html?: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER_MAIL,
          pass: process.env.SMTP_USER_PASS
        }
      })
      const mailOptions = {
        from: process.env.SMTP_FROM_MAIL,
        to,
        subject,
        text,
        html
      }
      await transporter.sendMail(mailOptions)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.logger.error(errorMessage)
      throw new MailerError()
    }
  }
}
