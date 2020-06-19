const express  = require('express')
const  app = express()
const PORT = require('./config').port

app.get('/', (req, res) => {
  res.status(200).send('Hello there!')
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
