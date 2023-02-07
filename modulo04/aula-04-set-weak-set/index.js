const assert = require('assert');

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual(Array.from(set), [ '0', '1', '2', '3' ])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [ '0', '1', '2', '3' ])

// Common array [].indexOf('1') !== -1 OR [0].includes(0)
assert.ok(set.has('3'))

// It has no get, but you always work with a full list

//Find matching values in between lists
const user01 = new Set([
    'erick',
    'mariazinha',
    'xuxa da silva'
])

const user02 = new Set([
    'joaozinho',
    'erick',
    'julio'
])

const intersection = new Set([...user01].filter(user => user02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...user01].filter(user => !user02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['mariazinha', 'xuxa da silva'])
