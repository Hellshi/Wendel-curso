const assert = require('assert')

//------- keys
const uniqueKey = Symbol('userName')
const user = {}

user["userName"] = 'value for normal objects'
user[uniqueKey] = 'value for symbol'

//console.log('getting normal Objects', user.userName)
// Sempre unico a nível de endereço de memória
//console.log('getting normal Objects', user[Symbol("userName")])

assert.deepStrictEqual(user.userName, 'value for normal objects')
assert.deepStrictEqual(user[Symbol("userName")], undefined)

//It's accessible via breakpoint debug
assert(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//Well known symbols
const obj = {
    //iterators
    [Symbol.iterator]: () => ({
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])
const kItems = Symbol('kItems')

class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if(coercionType !== 'string') throw new TypeError()
        const items = this[kItems]
                .map(item => 
                    new Intl
                        .DateTimeFormat("pt-BR", { month: 'long', day: "2-digit", year: "numeric" })
                        .format(item) 
                )
        return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
    }

    *[Symbol.iterator]() {
        for(const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(r => setTimeout(r, ms))
        for(const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }     
    }

    get [Symbol.toStringTag]() {
        return 'WHAT???'
    }
}

const myDate = new MyDate(
    [2020, 03, 01],
    [2018, 02, 01]
)

const expectedDates = [
    new Date(2020, 03, 01),
    new Date(2018, 02, 01)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT???]')
assert.throws(() => myDate + 1, TypeError)

assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 01 de março de 2018')
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()