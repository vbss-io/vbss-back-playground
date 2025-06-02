import { inject } from '@/api/infra/dependency-injection/registry'
import { Question } from '@/only-yes/domain/entities/question.entity'
import { type QuestionRepository } from '@/only-yes/domain/repositories/question.repository'
import { CreateQuestionType } from '@/only-yes/infra/validates/create-question.validate'

export type CreateQuestionUsecaseInput = CreateQuestionType

export interface CreateQuestionUsecaseOutput {
  code: string
}

export class CreateQuestionUsecase {
  @inject('questionRepository')
  private readonly questionRepository!: QuestionRepository

  async execute(input: CreateQuestionUsecaseInput): Promise<CreateQuestionUsecaseOutput> {
    const question = Question.create(input)
    const repositoryQuestion = await this.questionRepository.create(question)
    return {
      code: repositoryQuestion.code
    }
  }
}
