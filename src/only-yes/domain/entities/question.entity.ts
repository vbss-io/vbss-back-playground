import type { AnswerType } from '@/only-yes/domain/enums/answer-type.enum'
import { Code } from '@/only-yes/domain/vos/code.vo'

export class Question {
  private constructor(
    readonly id: string | undefined,
    readonly code: string,
    readonly question: string,
    readonly yesText: string,
    readonly noText: string,
    readonly answerType: AnswerType,
    readonly answer: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {}

  static create(input: QuestionCreate): Question {
    const code = new Code(5)
    const yesText = input.yesText ?? 'Sim'
    const noText = input.noText ?? 'Não'
    return new Question(undefined, code.getValue(), input.question, yesText, noText, input.answerType, input.answer)
  }

  static restore(input: QuestionRestore): Question {
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

export interface QuestionCreate {
  question: string
  yesText?: string
  noText?: string
  answerType: AnswerType
  answer: string
}

export type QuestionRestore = QuestionCreate & {
  id: string
  code: string
  createdAt: Date
  updatedAt: Date
}
