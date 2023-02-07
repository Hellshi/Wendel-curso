'use-strict'
const assert = require('assert');
// Reflect is meant to assert semantic and object's security

// -- apply

const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue
    }
}

//This will throw every time apply is called
//Function.prototype.apply = () => { throw new TypeError('Eita!') }

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20}, [ 100]), 130)

myObj.add.apply = function() { throw new TypeError('vixi') }
assert.throws(() => myObj.add.apply({}, []), {
    name: "TypeError",
    message: "vixi"
})

const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20}, [ 100])
assert.deepStrictEqual(result, 130)

// -- Define property

function MyDate() {}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })
Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey Reflect' })

assert.deepStrictEqual(MyDate.withReflect(), 'Hey Reflect')
assert.deepStrictEqual(MyDate.withObject(), 'Hey there')

// --Delete Property
const withDelete = { user: 'Hell' }
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

// get property
const withReflect = { user: 'Hell' }
Reflect.deleteProperty(withReflect, "user")
assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false)

assert.deepStrictEqual(1['username'], undefined)
assert.throws(() => Reflect.get(1, "username"), TypeError)

// Has property

assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))

