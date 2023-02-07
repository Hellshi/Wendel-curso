const assert = require('assert')
;
const myMap = new Map()


//May use anything as key

myMap
    .set(1, 'one')
    .set('Erick', { text: 'two' })
    .set(true, () => 'hello')

const myMapWithConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Object's keys can only be symbols and strings. Numbers are converted to strings
const obj = { id: 1 }
myMap.set(obj, { name: 'Erick' })
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(obj), { name: 'Erick' })
assert.deepStrictEqual(myMap.size, 4)

// To object this is would be a hasOwnProperty()
assert.ok(myMap.has(obj))

assert.ok(myMap.delete(obj))

//Object is insecure because the user can replace some behavior
// ({  }).toString() === '[object Object]'
// ({ toString: () => 'hey' }).toString === 'hey'

const actor = {
    name: 'AAA',
    toString: 'Queennnn'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// You can't clear an object without reassign it 
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

/* 
    You should deep map when:
    1) You have constant keys updates
    2) Needs a semantic validation
    3) When you need your object to work as a DB
    4) When you need to clear a state after the usage

    There's also another data structure called week map where you can only use object as ids
    You can't navigate it using for of, HOWEVER is a good choice if you only ever need to add and update keys
    
*/

// --- WeekMap ---
// Used in VERY specif cases
