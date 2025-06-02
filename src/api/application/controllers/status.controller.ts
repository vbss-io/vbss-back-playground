import { BaseController } from '@/api/application/controllers/base.controller'
import { type CheckStatusUsecase } from '@/api/application/usecases/check-status.usecase'
import { HttpMethod } from '@/api/domain/enums/http/http-methods'
import { HttpStatusCodes } from '@/api/domain/enums/http/http-status-codes'
import { inject } from '@/api/infra/dependency-injection/registry'

export class StatusController extends BaseController {
  @inject('checkStatusUsecase')
  private readonly checkStatusUsecase!: CheckStatusUsecase

  constructor() {
    super()

    this.httpServer.register(
      HttpMethod.GET,
      '/status',
      async () => {
        return await this.checkStatusUsecase.execute()
      },
      HttpStatusCodes.OK
    )
  }
}
