const { describe, it,  } = require('mocha');
const assert = require('assert');
const CarService = require('./../../src/service/carService');

const { join } = require('path');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

describe('Car Services Suite Tests', () => {
    let carService = {}
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })

        it('given a car category it should return an available Car', async () => {
            const result = await carService.test()
           console.log(result, 'result')
         })
})