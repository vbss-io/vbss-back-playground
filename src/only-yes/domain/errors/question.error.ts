import { HttpStatusCodes } from '@/api/domain/enums/http/http-status-codes'
import { CustomError } from '@/api/domain/errors/custom-error'

export class QuestionNotFoundError extends CustomError {
  constructor() {
    super(HttpStatusCodes.NOT_FOUND, 'Question Not found')
  }
}
