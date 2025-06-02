import { StatusController } from '@/api/application/controllers/status.controller'
import { CheckStatusUsecase } from '@/api/application/usecases/check-status.usecase'
import { Registry } from '@/api/infra/dependency-injection/registry'

export class StatusModule {
  constructor() {
    const registry = Registry.getInstance()
    registry.provide('checkStatusUsecase', new CheckStatusUsecase())
    new StatusController()
  }
}
