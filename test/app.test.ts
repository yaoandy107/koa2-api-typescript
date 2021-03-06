import server from '../src/app'
import * as request from 'supertest'

console.log = jest.fn()

describe('Test HelloWorld', () => {
  test('It should return status code: 200' , async () => {
    const response = await request(server).get('/')
    expect(response.statusCode).toBe(200)
  })
  test('It should return body: HelloWorld' , async () => {
    const response = await request(server).get('/')
    expect(JSON.parse(response.text).data).toBe('Hello World!')
  })
})
