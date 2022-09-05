import express from 'express'
import config from 'config'

import auth from './src/routes/auth.routes'
import path from 'path'
import dictionary from './src/routes/dictionary.routes'

const mongoose = require('mongoose')

const app = express()

app.use(express.json({}))

app.use('/api/dictionary', dictionary)
app.use('/api/auth', auth)

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

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


