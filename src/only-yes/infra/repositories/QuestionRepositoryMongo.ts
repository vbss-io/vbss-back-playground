import { Question } from '@/only-yes/domain/entities/Question'
import { type QuestionRepository } from '@/only-yes/domain/repositories/QuestionRepository'
import { type QuestionDocument, QuestionModel } from '@/only-yes/infra/mongoose/QuestionModel'

export class QuestionRepositoryMongo implements QuestionRepository {
  async create (question: Question): Promise<Question> {
    const questionDoc = new QuestionModel({
      code: question.code,
      question: question.question,
      yesText: question.yesText,
      noText: question.noText,
      answerType: question.answerType,
      answer: question.answer
    })
    const savedDoc = await questionDoc.save()
    return this.toDomain(savedDoc)
  }

  async getQuestionByCode (code: string): Promise<Question | undefined> {
    const questionDoc = await QuestionModel.findOne({ code })
    if (!questionDoc) return
    return this.toDomain(questionDoc)
  }

  async deleteByIds (ids: string[]): Promise<void> {
    const findOptions = { _id: { $in: ids } }
    await QuestionModel.deleteMany(findOptions)
  }

  private toDomain (questionDoc: QuestionDocument): Question {
    const id = questionDoc._id as any
    const answerType = questionDoc.answerType as 'text' | 'image' | 'video' | 'link'
    return Question.restore({
      id: id.toString(),
      code: questionDoc.code,
      question: questionDoc.question,
      yesText: questionDoc.yesText,
      noText: questionDoc.noText,
      answerType,
      answer: questionDoc.answer,
      createdAt: new Date(questionDoc.createdAt),
      updatedAt: new Date(questionDoc.updatedAt)
    })
  }
}
