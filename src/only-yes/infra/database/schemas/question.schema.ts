import { answerType, type AnswerType } from '@/only-yes/domain/enums/answer-type.enum'
import { type Document, model, Schema } from 'mongoose'

export interface QuestionDocument extends Document {
  _id: string
  code: string
  question: string
  yesText: string
  noText: string
  answerType: AnswerType
  answer: string
  createdAt: Date
  updatedAt: Date
}

const questionSchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    question: { type: String, required: true },
    yesText: { type: String, required: true },
    noText: { type: String, required: true },
    answerType: { type: String, required: true, enum: answerType },
    answer: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      transform: (_, ret) => {
        ret.id = ret._id as string
        delete ret._id
        delete ret.passwordHash
        delete ret.confirmationCode
        return ret
      }
    }
  }
)

export const QuestionModel = model<QuestionDocument>('Question', questionSchema)
