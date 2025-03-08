import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import supertest from 'supertest'
import { app } from '../index'
import { prisma } from '../services/db/prisma'
import { type Prisma } from '@prisma/client'

const api = supertest(app)

const initialUser = {
  email: 'thor@gmail.com',
  password: '1234567890'
}

beforeAll(async () => {
  await prisma.user.deleteMany()
  await api.post('/api/v1/auth/register').send({
    email: initialUser.email,
    pass: initialUser.password
  }).expect(201)
})

const initialQuotes: Prisma.QuoteCreateInput[] = [
  {
    author: 'Homer Simpson',
    text: 'Doh!'
  },
  {
    author: 'Steve Jobs',
    text: 'Think Diferent'
  }
]

beforeEach(async () => {
  await prisma.quote.deleteMany()
  await prisma.quote.createMany({
    data: initialQuotes
  })
})

describe('quotes', () => {
  test('quotes are json', async () => {
    await api
      .get('/api/v1/quotes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two quotes', async () => {
    const res = await api.get('/api/v1/quotes')
    expect(res.body.data).toHaveLength(initialQuotes.length)
  })

  test('a quote is from Homer Simpson', async () => {
    const res = await api.get('/api/v1/quotes')
    expect(res.body.data[0].author).toBe('Homer Simpson')
  })

  test('get one quote', async () => {
    const quotes = (await api.get('/api/v1/quotes')).body.data
    const firstQuote = quotes[0]
    await api.get(`/api/v1/quotes/${firstQuote.id}`).expect(200)
  })
  // with auth
  test('a quote can be created', async () => {
    const newQoute: Prisma.QuoteCreateInput = {
      text: 'A great quote',
      author: 'Me'
    }

    // login
    const res = await api.post('/api/v1/auth/login').send({
      email: initialUser.email,
      pass: initialUser.password
    }).expect(200)

    const token = res.body.data.token

    const quote = (await api.post('/api/v1/quotes')
      .set('Authorization', 'Bearer ' + token)
      .send({
        ...newQoute
      })
      .expect(201))
      .body.data

    expect(quote.text).toBe(newQoute.text)
    expect(quote.author).toBe(newQoute.author)

    const quotesAfter = (await api.get('/api/v1/quotes')).body.data
    expect(quotesAfter).toHaveLength(initialQuotes.length + 1)
  })

  test('a quote can be updated', async () => {
    const quotesBefore = (await api.get('/api/v1/quotes')).body.data
    const firstQuote = quotesBefore[0]

    // login
    const res = await api.post('/api/v1/auth/login').send({
      email: initialUser.email,
      pass: initialUser.password
    }).expect(200)

    const token = res.body.data.token

    const newQuoteInfo: Prisma.QuoteUpdateInput = { text: 'Beer!!!' }

    const quote = (await api.patch(`/api/v1/quotes/${firstQuote.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        ...newQuoteInfo
      })
      .expect(200)).body.data

    expect(quote.text).toBe(newQuoteInfo.text)
  })

  test('a quote can be deleted', async () => {
    const quotesBefore = (await api.get('/api/v1/quotes')).body.data
    const firstQuote = quotesBefore[0]

    // login
    const res = await api.post('/api/v1/auth/login').send({
      email: initialUser.email,
      pass: initialUser.password
    }).expect(200)

    const token = res.body.data.token

    await api.delete(`/api/v1/quotes/${firstQuote.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
    const quotesAfter = (await api.get('/api/v1/quotes')).body.data
    expect(quotesAfter).toHaveLength(quotesBefore.length - 1)
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})
