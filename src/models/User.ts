import { model, Schema } from 'mongoose'

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  achievements: {
    wordsLearned: { type: Number, default: 0 },
    wordsOnRepeat: { type: Number, default: 0 },
  },
  dictionary: {
    new: [{
      russianWord: { type: String, required: true },
      englishWord: { type: String, required: true },
      transcript: { type: String, required: true },
    }],
    learned: [{
      russianWord: { type: String, required: true },
      englishWord: { type: String, required: true },
      transcript: { type: String, required: true },
    }],
    repeat: [{
      russianWord: { type: String, required: true },
      englishWord: { type: String, required: true },
      transcript: { type: String, required: true },
    }]
  }
})

export default model('User', schema)
