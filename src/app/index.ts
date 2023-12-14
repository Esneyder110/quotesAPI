import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'

import { apiRouter } from './routes'
import { appErrorHandler } from './error/errorHandler'

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Quotes!')
})

apiRouter(app)

// Not found route
app.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>')
})

// error handler
appErrorHandler(app)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
