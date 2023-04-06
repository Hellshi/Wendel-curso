import Benchmark from 'benchmark'
import CartIdOld from './cart-id-old.js'
import CartIdNew from './cart-id-new.js'
const suite = new Benchmark.Suite

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
