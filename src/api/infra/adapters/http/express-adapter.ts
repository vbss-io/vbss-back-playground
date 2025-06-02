/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors'
import express, { type Application, type NextFunction, type Request, type RequestHandler, type Response } from 'express'

import { corsOptions } from '@/api/domain/consts/cors-options.const'
import { HttpMethod } from '@/api/domain/enums/http/http-methods'
import { NotFoundError } from '@/api/domain/errors/catalog.errors'
import { Logger } from '@/api/domain/providers/logger/logger'
import { inject } from '@/api/infra/dependency-injection/registry'
import { ErrorHandler } from '@/api/infra/handlers/express-error-handler'
import { HttpLoggerHandler } from '@/api/infra/handlers/express-http-logger-handler'

type RequestParams = any
type Headers = Record<string, string | string[] | undefined>
type CallbackResponse = Promise<Record<string, any> | void>
export type StreamResponse = Response

export interface HttpServer {
  register: (
    method: HttpMethod,
    url: string,
    callback: (params?: RequestParams, headers?: Headers) => CallbackResponse,
    code?: number
  ) => void
  start: (port?: number) => void
}

export class ExpressAdapter implements HttpServer {
  @inject('errorHandler')
  private readonly errorHandler!: ErrorHandler

  @inject('httpLoggerHandler')
  private readonly httpLoggerHandler!: HttpLoggerHandler

  @inject('logger')
  private readonly logger!: Logger

  private readonly app: Application

  constructor() {
    this.app = express()
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(this.httpLoggerHandler.handle.bind(this.httpLoggerHandler))
  }

  register(
    method: HttpMethod,
    url: string,
    callback: (params?: RequestParams, headers?: Headers) => CallbackResponse,
    code = 200
  ): void {
    const handler: RequestHandler = async (req: Request, res: Response) => {
      const output = await callback({ ...req.params, ...req.query, ...req.body }, req.headers)
      res.status(code).json(output)
    }
    this.app[method](url, handler)
  }

  start(port?: number): void {
    this.app.use(() => {
      throw new NotFoundError()
    })
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      this.errorHandler.handle(err, req, res, next)
    })
    this.app.listen(port, () => {
      this.logger.info(`Server started on PORT ${port}`)
    })
  }
}
