const { expect } = require('chai')
const { it, describe } = require('mocha')
const productValidator = require('./../src')
;
const ProductDataBuilder = require('./model/productDataBuilder');

describe('Test Data Builder', () => {
    it('shouldn\'t return error with valid product', () => {
        const product = ProductDataBuilder.aProduct().build()
        const result = productValidator(product)

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected)
    })

    describe('Product validation Rules', () => {
        it('Should return an object error when creating a product with invalid id', () => {
            const product = ProductDataBuilder
                .aProduct()
                .withInvalidId()
                .build()
            const result = productValidator(product)

            const expected = {
                errors: [`id: invalid length, current [1] expected to be between 2 and 20`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('Should return an object error when creating a product with invalid name', () => {
            const product = ProductDataBuilder
                .aProduct()
                .withInvalidName()
                .build()
            const result = productValidator(product)

            const expected = {
                errors: [`name: invalid value, current [${product.name}] expected to have only words`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
        it('Should return an object error when creating a product with invalid price', () => {
            const product = ProductDataBuilder
                .aProduct()
                .withInvalidPrice()
                .build()
            const result = productValidator(product)

            const expected = {
                errors: [`price: invalid value, current [${product.price}] expected to be between 0 and 1000`],
                result: false
            }
            expect(result).to.be.deep.equal(expected)
        })
        it('Should return an object error when creating a product with invalid category', () => {
            const product = ProductDataBuilder
                .aProduct()
                .withInvalidCategory()
                .build()
            const result = productValidator(product)

            const expected = {
                errors: [`category: invalid value, current [${product.category}] expected to 'electronic' or 'organic'`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
    })
})