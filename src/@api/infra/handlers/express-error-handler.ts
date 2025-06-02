import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { HttpStatusCodes } from '@api/domain/enums/http/http-status-codes'
import { CustomError } from '@api/domain/errors/custom-error'

export interface ErrorHandler {
  handle: (err: Error, req: Request, res: Response, next: NextFunction) => Response
}

export class ExpressErrorHandler implements ErrorHandler {
  handle(err: Error, _req: Request, res: Response, _next: NextFunction): Response {
    if (err instanceof ZodError) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: err.errors[0].message })
    }
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ message: err.message })
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
  }
}
