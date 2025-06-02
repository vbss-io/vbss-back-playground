import { HttpStatusCodes } from '@api/domain/enums/http/http-status-codes'
import { CustomError } from '@api/domain/errors/custom-error'

export class NotFoundError extends CustomError {
  constructor() {
    super(HttpStatusCodes.NOT_FOUND, 'Not Found')
  }
}

export class DatabaseConnectionError extends CustomError {
  constructor() {
    super(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Database Connection Error')
  }
}

export class DatabaseConnectionCloseError extends CustomError {
  constructor() {
    super(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Database Connection Close Error')
  }
}

export class DatabaseEntityNotFound extends CustomError {
  constructor() {
    super(HttpStatusCodes.NOT_FOUND, 'Entity Not Found')
  }
}

export class MailerError extends CustomError {
  constructor() {
    super(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'error sending email')
  }
}
