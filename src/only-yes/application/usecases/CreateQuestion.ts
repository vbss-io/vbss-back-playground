import { type CreateQuestionInput, type CreateQuestionOutput } from '@/only-yes/application/usecases/dtos/CreateQuestion.dto'
import { Question } from '@/only-yes/domain/entities/Question'
import { type QuestionRepository } from '@/only-yes/domain/repositories/QuestionRepository'
import { inject } from '@api/infra/dependency-injection/Registry'

export class CreateQuestion {
  @inject('questionRepository')
  private readonly questionRepository!: QuestionRepository

  async execute (input: CreateQuestionInput): Promise<CreateQuestionOutput> {
    const question = Question.create(input)
    const repositoryQuestion = await this.questionRepository.create(question)
    return {
      code: repositoryQuestion.code
    }
  }
}
