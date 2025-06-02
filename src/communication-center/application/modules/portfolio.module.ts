import { PortfolioController } from '@/communication-center/application/controllers/portfolio.controller'
import { SendPortfolioMailContactUsecase } from '@/communication-center/application/usecases/send-portfolio-contact-mail.usecase'
import { SendPortfolioEmailSchema } from '@/communication-center/infra/validates/send-portfolio-email.validate'
import { Registry } from '@api/infra/dependency-injection/registry'
import { ZodAdapter } from '@api/infra/validate/zod-adapter'

export class CommunicationCenterModule {
  constructor() {
    const registry = Registry.getInstance()
    registry.provide('sendPortfolioEmailValidate', new ZodAdapter(SendPortfolioEmailSchema))
    registry.provide('sendPortfolioMailContactUsecase', new SendPortfolioMailContactUsecase())
    new PortfolioController()
  }
}
