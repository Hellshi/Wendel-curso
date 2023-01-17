const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('./../../src/service/carService');

const { join } = require('path');
const { expect } = require('chai');
const { sandBox } = require('sinon');
const sinon = require('sinon');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
    validCarCategory: require('./../mocks/valid-car-category.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json')
}

describe('Car Services Suite Tests', () => {
    let carService = {}
    let sandBox = {}
    before(() => {
        carService = new CarService({
            cars: carsDatabase
        })
    })

    beforeEach(() => {
        sandBox = sinon.createSandbox()
    })

    afterEach(() => {
        sandBox = sinon.restore()
    })

    it('should return a random array position', async () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0)
     })

     it('should choose the first id from cardIds in carCategory', async () => {
        const carCategory = mocks.validCarCategory
        const carIndex = 0

        sandBox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIndex)

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]
        
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
     })

    it('given a car category it should return an available Car', async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]

        sandBox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        sandBox.spy(
            carService,
            carService.chooseRandomCar.name,
        )

        const result = await carService.getAvailableCar(carCategory)
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRepository.find.calledWithExactly(car.id))
        expect(result).to.be.deep.equal(expected)
    })
})