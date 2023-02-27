const rewireMock = require('rewiremock/node')
const { deepStrictEqual } = require('assert');

// Poderia estar em outro arquivo
    const dbData = [{name: 'Mariazinha'}, { name: 'Jão' }]
    class MockDatabase {
        connect = () => this
        find = async (query) => dbData
    }
// Poderia estar em outro arquivo


rewireMock(() => require('./../src/utils/database')).with(MockDatabase)

;(async () => {
    {
        const expected = [{name: 'MARIAZINHA'}, { name: 'JÃO' }]
        rewireMock.enable()
        const UserFactory = require('../src/factory/userFactory');

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()
        deepStrictEqual(result, expected)
        rewireMock.disable()
        
    }

    {
        const expected = [{name: 'ERICKWENDELL'}]
        const UserFactory = require('../src/factory/userFactory');

        const userFactory = await UserFactory.createInstance()
        const result = await userFactory.find()
        deepStrictEqual(result, expected)
        
    }
})()