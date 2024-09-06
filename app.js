const express = require('express')
const connectDB = require('./db/connect')   // connect to the database
require('dotenv').config() 
const app = express()
const port = 3000
const routes = require('./Routes/tasks')    // import the tasks route
const notFound = require('./Midlleware/notFound')  // import the notFound middleware
const errorHandler = require('./Midlleware/errorHandler')  // import the errorHandler middleware  
 

// middleware
app.use(express.json())
app.use(express.static('./public'))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1/tasks', routes)   // use the tasks route

app.use(notFound)  // use the notFound middleware

app.use(errorHandler)  // use the errorHandler middleware

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start() // start the server