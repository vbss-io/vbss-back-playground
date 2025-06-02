import { type CreateQuestionUsecase } from '@/only-yes/application/usecases/create-question.usecase'
import { type GetQuestionUsecase } from '@/only-yes/application/usecases/get-question.usecase'
import { type CreateQuestionType } from '@/only-yes/infra/validates/create-question.validate'
import { type GetQuestionType } from '@/only-yes/infra/validates/get-question.validate'
import { BaseController } from '@api/application/controllers/base.controller'
import { HttpMethod } from '@api/domain/enums/http/http-methods'
import { HttpStatusCodes } from '@api/domain/enums/http/http-status-codes'
import { inject } from '@api/infra/dependency-injection/registry'
import { InputValidate } from '@api/infra/validate/zod-adapter'

export class QuestionController extends BaseController {
  @inject('createQuestionValidate')
  private readonly createQuestionValidate!: InputValidate<CreateQuestionType>

  @inject('createQuestionUsecase')
  private readonly createQuestionUsecase!: CreateQuestionUsecase

  @inject('getQuestionValidate')
  private readonly getQuestionValidate!: InputValidate<GetQuestionType>

  @inject('getQuestionUsecase')
  private readonly getQuestionUsecase!: GetQuestionUsecase

  constructor() {
    super()

    this.httpServer.register(
      HttpMethod.POST,
      '/only-yes/question',
      async (params: CreateQuestionType) => {
        const inputParsed = this.createQuestionValidate.validate(params)
        return await this.createQuestionUsecase.execute(inputParsed)
      },
      HttpStatusCodes.CREATED
    )

    this.httpServer.register(
      HttpMethod.GET,
      '/only-yes/question',
      async (params: GetQuestionType) => {
        const inputParsed = this.getQuestionValidate.validate(params)
        return await this.getQuestionUsecase.execute(inputParsed)
      },
      HttpStatusCodes.OK
    )
  }
}
