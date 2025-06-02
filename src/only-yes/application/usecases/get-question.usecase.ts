import { inject } from '@/api/infra/dependency-injection/registry'
import { Question } from '@/only-yes/domain/entities/question.entity'
import { QuestionNotFoundError } from '@/only-yes/domain/errors/question.error'
import { type QuestionRepository } from '@/only-yes/domain/repositories/question.repository'
import { GetQuestionType } from '@/only-yes/infra/validates/get-question.validate'

export type GetQuestionUsecaseInput = GetQuestionType

export type GetQuestionUsecaseOutput = Question

export class GetQuestionUsecase {
  @inject('questionRepository')
  private readonly questionRepository!: QuestionRepository

  async execute({ code }: GetQuestionUsecaseInput): Promise<GetQuestionUsecaseOutput> {
    const repositoryQuestion = await this.questionRepository.getQuestionByCode(code)
    if (!repositoryQuestion) throw new QuestionNotFoundError()
    return repositoryQuestion
  }
}
