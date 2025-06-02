import { BaseController } from '@/api/application/controllers/base.controller'
import { HttpMethod } from '@/api/domain/enums/http/http-methods'
import { HttpStatusCodes } from '@/api/domain/enums/http/http-status-codes'
import { inject } from '@/api/infra/dependency-injection/registry'
import { InputValidate } from '@/api/infra/validate/zod-adapter'
import { SendPortfolioMailContactUsecase } from '@/communication-center/application/usecases/send-portfolio-contact-mail.usecase'
import { SendPortfolioEmailType } from '@/communication-center/infra/validates/send-portfolio-email.validate'

export class PortfolioController extends BaseController {
  @inject('sendPortfolioEmailValidate')
  private readonly sendPortfolioEmailValidate!: InputValidate<SendPortfolioEmailType>

  @inject('sendPortfolioMailContactUsecase')
  private readonly sendPortfolioMailContactUsecase!: SendPortfolioMailContactUsecase

  constructor() {
    super()

    this.httpServer.register(
      HttpMethod.POST,
      '/portfolio/contact',
      async (params: SendPortfolioEmailType) => {
        const inputParsed = this.sendPortfolioEmailValidate.validate(params)
        return await this.sendPortfolioMailContactUsecase.execute(inputParsed)
      },
      HttpStatusCodes.OK
    )
  }
}
