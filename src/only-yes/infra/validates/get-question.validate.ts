import { z } from 'zod'

export const GetQuestionSchema = z.object({
  code: z.string({
    required_error: 'code is required',
    invalid_type_error: 'code must be a string'
  })
})

export type GetQuestionType = z.infer<typeof GetQuestionSchema>
