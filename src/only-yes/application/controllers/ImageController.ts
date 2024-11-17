import { type CreateQuestion } from '@/only-yes/application/usecases/CreateQuestion'
import { type GetQuestion } from '@/only-yes/application/usecases/GetQuestion'
import { type CreateQuestionInput } from '@/only-yes/infra/schemas/CreateQuestionSchema'
import { type GetQuestionInput } from '@/only-yes/infra/schemas/GetQuestionSchema'
import { type HttpServer } from '@api/domain/http/HttpServer'
import { HttpStatusCodes } from '@api/domain/http/HttpStatusCodes'
import { type InputValidate } from '@api/domain/validate/InputValidate'
import { inject } from '@api/infra/dependency-injection/Registry'

export class QuestionController {
  @inject('httpServer')
  private readonly httpServer!: HttpServer

  @inject('createQuestionValidate')
  private readonly createQuestionValidate!: InputValidate<CreateQuestionInput>

  @inject('createQuestion')
  private readonly createQuestion!: CreateQuestion

  @inject('getQuestionValidate')
  private readonly getQuestionValidate!: InputValidate<GetQuestionInput>

  @inject('getQuestion')
  private readonly getQuestion!: GetQuestion

  constructor () {
    this.httpServer.register('post', '/only-yes/question', async (params: CreateQuestionInput) => {
      const inputParsed = this.createQuestionValidate.validate(params)
      return await this.createQuestion.execute(inputParsed)
    }, HttpStatusCodes.Created)

    this.httpServer.register('get', '/only-yes/question', async (params: GetQuestionInput) => {
      const inputParsed = this.getQuestionValidate.validate(params)
      return await this.getQuestion.execute(inputParsed)
    }, HttpStatusCodes.OK)
  }
}
