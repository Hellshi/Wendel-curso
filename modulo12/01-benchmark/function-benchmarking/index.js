import Benchmark from 'benchmark'
import CartMapReduce from './cart-rm-prop-old.js'
import CartForLoop from './cart-rm-prop-new.js'
const suite = new Benchmark.Suite

/* Uuid x crypto */
/* 
import CartIdOld from './cart-id-old.js'
import CartIdNew from './cart-id-new.js'
    suite
    .add('Cart#cartUUID', function() {
        new CartIdOld()
    })
    .add('Cart#cartCrypto', function() {
        new CartIdNew()
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`The winner isssss: ${ this.filter('fastest').map('name') }`)
    })
    .run()
 */

    /* Map Reduce x For */
    const database = {
    "at": "2023-04-06T13:10:52.218Z",
      "products": [
        {
          "description": "officia dolore in culpa",
          "name": "aliquip",
          "price": 1436.04,
          "tmpProperty": undefined,
          "activePromoId": 5
        },
        {
          "description": "ad ut voluptate sunt",
          "name": "dolor",
          "price": 851.55,
          "tmpProperty": undefined,
          "activePromoId": null
        }
        ]
    }

    suite
    .add('Cart#cartMapReduce', function() {
        new CartMapReduce(database)
    })
    .add('Cart#cartForLoop', function() {
        new CartForLoop(database)
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`The winner isssss: ${ this.filter('fastest').map('name') }`)
    })
    .run({async: true})
