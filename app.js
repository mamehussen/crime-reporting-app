require('dotenv').config()
require('express-async-errors')

//extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

// Connect DB
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')


// routers
const authRouter = require('./routes/auth')
const crimesRouter = require('./routes/crimes')
const announcementsRouter = require('./routes/announcements')
const authAnnouncementsRouter = require('./routes/authAnnouncement')
const tipsRouter = require('./routes/tips')
const missingPeopleRouter = require('./routes/missingpeople')
const wantedPeopleRouter = require('./routes/wantedpeople')


// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({windowMs: 60 * 1000, max: 60}))

app.get('/', (req, res) => {
  res.send('Crime Reporting App API')
})

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/crimes', authenticateUser, crimesRouter)
app.use('/api/v1/announcements', announcementsRouter)
app.use('/api/v1/authannouncement', authenticateUser, authAnnouncementsRouter)
app.use('/api/v1/tips', authenticateUser, tipsRouter)
app.use('/api/v1/missing', authenticateUser, missingPeopleRouter)
app.use('/api/v1/wanted', authenticateUser, wantedPeopleRouter)



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
