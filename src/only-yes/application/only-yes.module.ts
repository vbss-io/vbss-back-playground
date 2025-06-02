import { QuestionController } from '@/only-yes/application/controllers/question.controller'
import { CreateQuestionUsecase } from '@/only-yes/application/usecases/create-question.usecase'
import { GetQuestionUsecase } from '@/only-yes/application/usecases/get-question.usecase'
import { QuestionRepositoryMongoose } from '@/only-yes/infra/database/repositories/question.repository'
import { CreateQuestionSchema } from '@/only-yes/infra/validates/create-question.validate'
import { GetQuestionSchema } from '@/only-yes/infra/validates/get-question.validate'
import { MongooseAdapter } from '@api/infra/adapters/database/mongoose-adapter'
import { Registry } from '@api/infra/dependency-injection/registry'
import { ZodAdapter } from '@api/infra/validate/zod-adapter'

export class OnlyYesModule {
  constructor() {
    const registry = Registry.getInstance()
    const databaseConnection = new MongooseAdapter(String(process.env.ONLY_YES_MONGO_URI))
    void databaseConnection.connect()
    registry.provide('createQuestionValidate', new ZodAdapter(CreateQuestionSchema))
    registry.provide('getQuestionValidate', new ZodAdapter(GetQuestionSchema))
    registry.provide('questionRepository', new QuestionRepositoryMongoose())
    registry.provide('createQuestionUsecase', new CreateQuestionUsecase())
    registry.provide('getQuestionUsecase', new GetQuestionUsecase())
    new QuestionController()
  }
}
