import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import authRouter from './routes/authRoutes'
import apiRouter from './routes/apiRoutes'
import mainRouter from './routes/mainRoutes'

const app = express()

app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1', apiRouter)
app.use(mainRouter)

export default app