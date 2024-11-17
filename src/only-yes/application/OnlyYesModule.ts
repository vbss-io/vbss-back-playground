import { QuestionController } from '@/only-yes/application/controllers/ImageController'
import { CreateQuestion } from '@/only-yes/application/usecases/CreateQuestion'
import { GetQuestion } from '@/only-yes/application/usecases/GetQuestion'
import { QuestionRepositoryMongo } from '@/only-yes/infra/repositories/QuestionRepositoryMongo'
import { CreateQuestionSchema } from '@/only-yes/infra/schemas/CreateQuestionSchema'
import { GetQuestionSchema } from '@/only-yes/infra/schemas/GetQuestionSchema'
import { MongooseAdapter } from '@api/infra/database/MongooseAdapter'
import { Registry } from '@api/infra/dependency-injection/Registry'
import { ZodAdapter } from '@api/infra/validate/ZodAdapter'

export class OnlyYesModule {
  constructor () {
    const databaseConnection = new MongooseAdapter(String(process.env.ONLY_YES_MONGO_URI))
    void databaseConnection.connect()
    const createQuestionValidate = new ZodAdapter(CreateQuestionSchema)
    const getQuestionValidate = new ZodAdapter(GetQuestionSchema)
    Registry.getInstance().provide('createQuestionValidate', createQuestionValidate)
    Registry.getInstance().provide('getQuestionValidate', getQuestionValidate)
    const questionRepository = new QuestionRepositoryMongo()
    Registry.getInstance().provide('questionRepository', questionRepository)
    const createQuestion = new CreateQuestion()
    const getQuestion = new GetQuestion()
    Registry.getInstance().provide('createQuestion', createQuestion)
    Registry.getInstance().provide('getQuestion', getQuestion)
    new QuestionController()
  }
}
