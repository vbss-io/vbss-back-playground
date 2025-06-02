import { SendPortfolioEmailType } from '@/communication-center/infra/validates/send-portfolio-email.validate'
import { Mailer } from '@api/domain/providers/mailer/mailer'
import { inject } from '@api/infra/dependency-injection/registry'

export type SendPortfolioContactMailUsecaseInput = SendPortfolioEmailType

export class SendPortfolioMailContactUsecase {
  @inject('mailer')
  private readonly mailer!: Mailer

  async execute(input: SendPortfolioContactMailUsecaseInput): Promise<void> {
    const subject = `${input.name} - ${input.email}`
    await this.mailer.sendMail('vitor@vbss.io', subject, input.message)
  }
}
