const assert = require('assert');
const obj = {}
const arr = []
const fn = () => {}

// Object literals are turned into explicit functions internally
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)

// __proto__ is the object reference which carries it's properties within
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)


console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// The Object __proto__ is actually null

console.log('------')

function Employee() {}

Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary())

function Supervisor() {}

//Inherits Employee's instance
Supervisor.prototype = Object.create(Employee.prototype)

Supervisor.prototype.profitShare = () => "profitShare**"

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// We may call it via prototype, direct calls are going to generate errors
console.log('Manager.prototype.salary', Manager.prototype.salary)

// If we don't call "new", the first __proto__ will always be
// the instance of function without our inherited classes
// to access classes without new we new prototype
console.log('Manager.prototype.__proto__ === Supervisor.prototype',Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())

console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)

console.log('----------')

const manager = new Manager()

//And this is what we call prototype chain
// Javascript engine will look after every prototype searching for a function
// The last prototype is always null since every function is actually an object and 
// an object's prototype is null
assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('----------')

class T1 {
    ping() {
        return 'ping'
    }
}

class T2 extends T1 {
    pong() {
        return 'pong'
    }
}

class T3 extends T2 {
    shoot() {
        return 'shoot'
    }
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3 ping', t3.ping())
console.log('t3 pong', t3.pong())
console.log('t3 shoot', t3.shoot())
