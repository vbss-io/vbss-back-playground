import { AnswerType } from '@/only-yes/domain/enums/answer-type.enum'
import { z } from 'zod'

export const CreateQuestionSchema = z.object({
  question: z.string({
    required_error: 'question is required',
    invalid_type_error: 'question must be a string'
  }),
  yesText: z
    .string({
      invalid_type_error: 'yesText must be a string'
    })
    .optional(),
  noText: z
    .string({
      invalid_type_error: 'noText must be a string'
    })
    .optional(),
  answerType: z.nativeEnum(AnswerType, {
    required_error: 'answerType is required',
    message: 'answerType must be "text", "image", "video" or "link"'
  }),
  answer: z.string({
    required_error: 'answer is required',
    invalid_type_error: 'answer must be a string'
  })
})

export type CreateQuestionType = z.infer<typeof CreateQuestionSchema>
