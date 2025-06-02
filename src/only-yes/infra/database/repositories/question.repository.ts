import { Question } from '@/only-yes/domain/entities/question.entity'
import { type QuestionRepository } from '@/only-yes/domain/repositories/question.repository'
import { type QuestionDocument, QuestionModel } from '@/only-yes/infra/database/schemas/question.schema'
import { BaseRepositoryMongoose } from '@api/infra/repositories/base.repository'

export class QuestionRepositoryMongoose
  extends BaseRepositoryMongoose<QuestionDocument, Question>
  implements QuestionRepository<QuestionDocument>
{
  constructor(model = QuestionModel) {
    super(model)
  }

  async getQuestionByCode(code: string): Promise<Question | undefined> {
    const questionDoc = await QuestionModel.findOne({ code })
    if (!questionDoc) return
    return this.toDomain(questionDoc)
  }

  async deleteByIds(ids: string[]): Promise<void> {
    const findOptions = { _id: { $in: ids } }
    await QuestionModel.deleteMany(findOptions)
  }

  toDomain(entity: QuestionDocument): Question {
    return Question.restore({
      id: entity._id.toString(),
      code: entity.code,
      question: entity.question,
      yesText: entity.yesText,
      noText: entity.noText,
      answerType: entity.answerType,
      answer: entity.answer,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt)
    })
  }
}
