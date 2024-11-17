import { type Question } from '@/only-yes/domain/entities/Question'
import { type GetQuestionInput as GetQuestionSchemaInput } from '@/only-yes/infra/schemas/GetQuestionSchema'

export type GetQuestionInput = GetQuestionSchemaInput

export type GetQuestionOutput = Question
