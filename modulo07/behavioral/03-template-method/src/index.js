import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: '13234',
    amount: 20.00,
    products: [{ description: 'shampoo' }]
})

const orderBusiness = new OrderBusiness()
console.info('orderCreated', orderBusiness)