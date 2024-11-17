import 'dotenv/config'
import 'express-async-errors'

import { StatusModule } from '@api/application/StatusModule'
import { Registry } from '@api/infra/dependency-injection/Registry'
import { ExpressErrorHandler } from '@api/infra/errors/ErrorHandler'
import { ExpressAdapter } from '@api/infra/http/ExpressAdapter'

function main (): any {
  const errorHandler = new ExpressErrorHandler()
  Registry.getInstance().provide('errorHandler', errorHandler)
  const httpServer = new ExpressAdapter()
  Registry.getInstance().provide('httpServer', httpServer)
  new StatusModule()
  httpServer.start(Number(process.env.PORT))
}
main()
