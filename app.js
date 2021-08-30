require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// Connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')


// routers
const authRouter = require('./routes/auth')
const crimesRouter = require('./routes/crimes')
const announcementsRouter = require('./routes/announcements')
const tipsRouter = require('./routes/tips')
const missingPeopleRouter = require('./routes/missingpeople')
const wantedPeopleRouter = require('./routes/wantedpeople')


// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.json())
// extra packages

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/crimes', authenticateUser, crimesRouter)
app.use('/api/v1/announcements', announcementsRouter)
app.use('/api/v1/tips', authenticateUser, tipsRouter)
app.use('/api/v1/missing', missingPeopleRouter)
app.use('/api/v1/wanted', wantedPeopleRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
      console.log(error)
    }
  }

  start()
