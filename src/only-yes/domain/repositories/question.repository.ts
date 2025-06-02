import type { BaseRepository } from '@/api/domain/repositories/base.repository'
import { type Question } from '@/only-yes/domain/entities/question.entity'

export interface QuestionRepository<T = unknown> extends BaseRepository<T, Question> {
  getQuestionByCode: (code: string) => Promise<Question | undefined>
  deleteByIds: (ids: string[]) => Promise<void>
  toDomain(user: T): Question
}
