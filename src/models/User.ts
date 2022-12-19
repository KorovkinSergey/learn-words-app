import pkg from 'mongoose'

const { model, Schema } = pkg

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	avatar: { type: String },
	achievements: {
		wordsLearned: { type: Number, default: 0 },
		wordsOnRepeat: { type: Number, default: 0 },
	},
	dictionary: [
		{
			title: { type: String, required: true },
			basic: { type: Boolean },
			countRepeat: { type: Number, default: 0 },
			words: [
				{
					russian: { type: String, required: true },
					english: { type: String, required: true },
					transcript: { type: String, required: true },
				},
			],
		},
	],
})

export default model('User', schema)
