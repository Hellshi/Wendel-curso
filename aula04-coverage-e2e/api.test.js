const assert = require('assert')
const { describe, it } = require('mocha')
const request = require('supertest')
const app =  require('./api')

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should request the contact name and return HTTP Status 200', async() => {
            const response = await request(app)
                .get('/contact')
                .expect(200)
                assert.deepStrictEqual(response.text, 'Contact us page')
        })
        
    })

    describe('/hi', () => {
        it('should redirect to default on inexistent route', async() => {
            const response = await request(app)
                .get('/hi')
                .expect(200)
                assert.deepStrictEqual(response.text, 'Hello World')
        })
    })

    describe('/login', () => {
        it('Should return 200 on success', async() => {
            const username = "Hell"
             const response = await request(app)
                 .post('/login')
                 .send({
                     username,
                     password: 12345
                 })
                 .expect(200)
                 assert.deepStrictEqual(response.text, `Hello ${username}`)
         })
    })
})