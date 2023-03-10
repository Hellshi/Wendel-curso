const Service = require('./service')
const sinon = require('sinon')
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const { rejects, deepStrictEqual } = require('assert');

const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json')
}
;

(async () => {
    //This uses the actual implementation
    /* {
        const service = new Service()
        const withoutStub = await service.makeRequest(BASE_URL_2)
        console.log(JSON.stringify(withoutStub))
    } */
    
    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)
    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)

    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)
    {
        const expected = {
            name:"Tatooine",
            surface_water:"1",
            appearedIn: 5
        }
        const response = await service.getPlanets(BASE_URL_1)
        deepStrictEqual(response, expected)
    } 
    {
        const expected = {
            name:"Alderaan",
            surface_water:"40",
            appearedIn: 2
        }
        const response = await service.getPlanets(BASE_URL_2)
        deepStrictEqual(response, expected)
    }
})() 