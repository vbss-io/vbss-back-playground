import type { HttpServer } from '@api/infra/adapters/http/express-adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export class BaseController {
  @inject('httpServer')
  protected readonly httpServer!: HttpServer
}
