import express from 'express'
import config from 'config'
import dictionary from './routes/dictionary.routes'
import auth from './routes/auth.routes'

const mongoose = require('mongoose')

const app = express()

app.use(express.json({}))

app.use('/api/dictionary', dictionary)
app.use('/api/auth', auth)

const PORT = config.get('port') || 5005

async function start() {
	try {
		await mongoose.connect(config.get('mongoURL'))

		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	} catch (e: any) {
		console.log('Server error: ', e.message)
		process.exit(1)
	}
}

start()
