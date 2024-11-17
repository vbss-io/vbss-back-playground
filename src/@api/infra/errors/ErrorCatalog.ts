import { HttpStatusCodes } from '@api/domain/http/HttpStatusCodes'
import { CustomError } from '@api/infra/errors/CustomError'

export class NotFoundError extends CustomError {
  constructor () {
    super(HttpStatusCodes.NotFound, 'Not Found')
  }
}

export class DatabaseConnectionError extends CustomError {
  constructor () {
    super(HttpStatusCodes.InternalServerError, 'Database Connection Error')
  }
}

export class DatabaseConnectionCloseError extends CustomError {
  constructor () {
    super(HttpStatusCodes.InternalServerError, 'Database Connection Close Error')
  }
}
