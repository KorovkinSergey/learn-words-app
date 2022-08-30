import { model, Schema } from 'mongoose'

const schema = new Schema({
  russianWord: { type: String, required: true },
  englishWord: { type: String, required: true },
  transcript: { type: String, required: true },
})

export default model('Word', schema)
