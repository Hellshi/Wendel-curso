const Product = require("../../src/entities/product");

class ProductDataBuilder {

    constructor() {
        // Success cases
        this.productData = {
            id: '000001',
            name: 'computer',
            price: 1000,
            category: 'electronic'
        }
    }

    static aProduct() {
        return new ProductDataBuilder()
    }

    withInvalidId() {
        this.productData.id = '1'
        return this
    }

    withInvalidName() {
        this.productData.name = 'abc124'
        return this
    }

    withInvalidPrice() {
        this.productData.price = 2001
        return this
    }

    withInvalidCategory() {
        this.productData.category = 'Invalid category'
        return this
    }

    build() {
        const product = new Product(this.productData)
        return product
    }

}

module.exports = ProductDataBuilder