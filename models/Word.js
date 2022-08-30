const {Schema, model} = require('mongoose')

const schema = Schema({
  russianWord: {type: String, required: true},
  englishWord: {type: String, required: true},
  transcript: {type: String, required: true},
})

module.exports = model('Word', schema)
