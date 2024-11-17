import { type CreateQuestionInput as CreateQuestionSchemaInput } from '@/only-yes/infra/schemas/CreateQuestionSchema'

export type CreateQuestionInput = CreateQuestionSchemaInput

export interface CreateQuestionOutput {
  code: string
}
