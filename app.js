const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/dictionary', require('./routes/dictionary.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5005

async function start() {
  try {
    await mongoose.connect(config.get('mongoURL'))

    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server error: ', e.message)
    process.exit(1)
  }


}

start()


