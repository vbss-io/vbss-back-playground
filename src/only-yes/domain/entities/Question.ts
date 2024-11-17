import { type QuestionCreate, type QuestionRestore } from '@/only-yes/domain/entities/dtos/Question.dto'
import { Code } from '@/only-yes/domain/vos/Code'

export class Question {
  private constructor (
    readonly id: string,
    readonly code: string,
    readonly question: string,
    readonly yesText: string,
    readonly noText: string,
    readonly answerType: string,
    readonly answer: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}

  static create (input: QuestionCreate): Question {
    const code = new Code(5)
    const yesText = input.yesText ?? 'Sim'
    const noText = input.noText ?? 'Não'
    return new Question(
      '',
      code.getValue(),
      input.question,
      yesText,
      noText,
      input.answerType,
      input.answer
    )
  }

  static restore (input: QuestionRestore): Question {
    return new Question(
      input.id,
      input.code,
      input.question,
      input.yesText as string,
      input.noText as string,
      input.answerType,
      input.answer,
      input.createdAt,
      input.updatedAt
    )
  }
}
