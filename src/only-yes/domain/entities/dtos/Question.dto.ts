export interface QuestionCreate {
  question: string
  yesText?: string
  noText?: string
  answerType: 'text' | 'image' | 'video' | 'link'
  answer: string
}

export type QuestionRestore = QuestionCreate & {
  id: string
  code: string
  createdAt: Date
  updatedAt: Date
}
