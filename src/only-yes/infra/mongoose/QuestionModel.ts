import mongoose, { type Document, type Model, Schema } from 'mongoose'

export interface QuestionDocument extends Document {
  code: string
  question: string
  yesText: string
  noText: string
  answerType: string
  answer: string
  createdAt: Date
  updatedAt: Date
}

const QuestionSchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    question: { type: String, required: true },
    yesText: { type: String, required: true },
    noText: { type: String, required: true },
    answerType: { type: String, required: true },
    answer: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
)

export const QuestionModel: Model<QuestionDocument> = mongoose.model<QuestionDocument>('Question', QuestionSchema)
