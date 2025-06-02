import 'dotenv/config'

import { CommunicationCenterModule } from '@/communication-center/application/modules/portfolio.module'
import { OnlyYesModule } from '@/only-yes/application/only-yes.module'
import { StatusModule } from '@api/application/modules/status.module'
import { ExpressAdapter } from '@api/infra/adapters/http/express-adapter'
import { WinstonLoggerAdapter } from '@api/infra/adapters/logger/winston-logger-adapter'
import { NodemailerAdapter } from '@api/infra/adapters/mailer/nodemailer-adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { ExpressErrorHandler } from '@api/infra/handlers/express-error-handler'
import { ExpressHttpLoggerHandler } from '@api/infra/handlers/express-http-logger-handler'

const PORT = Number(process.env.PORT ?? 3000)

function main(): void {
  const registry = Registry.getInstance()
  registry.provide('httpLoggerHandler', new ExpressHttpLoggerHandler())
  registry.provide('errorHandler', new ExpressErrorHandler())
  registry.provide('logger', new WinstonLoggerAdapter())
  registry.provide('mailer', new NodemailerAdapter())
  const httpServer = new ExpressAdapter()
  registry.provide('httpServer', httpServer)
  new StatusModule()
  new OnlyYesModule()
  new CommunicationCenterModule()
  httpServer.start(PORT)
}
main()
