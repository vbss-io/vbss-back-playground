import { type Question } from '@/only-yes/domain/entities/Question'

export interface QuestionRepository {
  create: (image: Question) => Promise<Question>
  getQuestionByCode: (code: string) => Promise<Question | undefined>
  deleteByIds: (ids: string[]) => Promise<void>
}
