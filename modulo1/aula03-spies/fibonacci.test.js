const Fibonacci = require('./fibonacci');
const sinon = require('sinon');
const assert = require('assert');

(async() => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        // generators return iterators, (.next) every time you want new yields you will need .next
        //.next, for await, rest/spread
        for await ( const i of fibonacci.execute(3)) {}

        const expectedCallCount = 4
        assert.deepStrictEqual(spy.callCount, expectedCallCount)
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)
        // rest/spread
        const [...result] = fibonacci.execute(5)
        const { args } = spy.getCall(2)

        const expectedResult = [ 0, 1, 1, 2, 3 ]

        const expectedParams = Object.values({
            input: 3,
            current: 1,
            next: 2
        })

        assert.deepStrictEqual(args, expectedParams)
        assert(result, expectedResult)
    }
})()
