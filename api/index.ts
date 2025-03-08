import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { apiRouter } from '../src/routes'
import { appErrorHandler } from '../src/error/errorHandler'
import { swaggerDocs } from '../src/docs/quotesV1'

dotenv.config()
const { NODE_ENV, PORT } = process.env
const env = { enviroment: NODE_ENV, port: PORT }

const app = express()
app.use(cors())
app.use(express.json())
const enviroment = env.enviroment

console.log(`[server]: Enviroment: ${enviroment}`)
const port = env.port
if (!port) throw new Error('no hay puerto')

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Quotes!')
})

apiRouter(app)

if (enviroment !== 'test') {
  swaggerDocs(app, +port)
}

// Not found route
app.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>')
})

// error handler
appErrorHandler(app)
if (enviroment !== 'development') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

export default app
