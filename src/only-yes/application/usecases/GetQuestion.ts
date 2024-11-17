import { type GetQuestionInput, type GetQuestionOutput } from '@/only-yes/application/usecases/dtos/GetQuestion.dto'
import { type QuestionRepository } from '@/only-yes/domain/repositories/QuestionRepository'
import { QuestionNotFoundError } from '@/only-yes/infra/errors/ImageErrorCatalog'
import { inject } from '@api/infra/dependency-injection/Registry'

export class GetQuestion {
  @inject('questionRepository')
  private readonly questionRepository!: QuestionRepository

  async execute ({ code }: GetQuestionInput): Promise<GetQuestionOutput> {
    const repositoryQuestion = await this.questionRepository.getQuestionByCode(code)
    if (!repositoryQuestion) throw new QuestionNotFoundError()
    return repositoryQuestion
  }
}
