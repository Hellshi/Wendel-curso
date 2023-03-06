import { test, jest, expect, beforeEach } from '@jest/globals'
import OrderBusiness from '../src/business/orderBusiness'
import Order from '../src/entities/order'


describe('Test suite for Template Method Design Pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    describe('#OrderBusiness', () => {
        test('execute Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()

            const isValid = orderBusiness._validateRequiredFields(order)
            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()
        })

        test('execute Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{ description: 'ferrari' }]
            })

            const orderBusiness = new OrderBusiness()

            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            ) 

            const calledCreateFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            ) 

            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledValidationFn).toHaveBeenCalled()
            expect(calledCreateFn).toHaveBeenCalled()
        })
    })
})