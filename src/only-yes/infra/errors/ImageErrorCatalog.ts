import { HttpStatusCodes } from '@api/domain/http/HttpStatusCodes'
import { CustomError } from '@api/infra/errors/CustomError'

export class QuestionNotFoundError extends CustomError {
  constructor () {
    super(HttpStatusCodes.NotFound, 'Question Not found')
  }
}
