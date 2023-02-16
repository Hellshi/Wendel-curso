const { expect } = require('chai')
const { evaluateRegex, InvalidRegexError } = require('../src/util')

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/
        /* 
            // roda em loop e quebra tudo
            time \
            node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eae man como vai voce e como vai?') && console.log('nice')"
        */
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude`)
    })

    it('#evaluateRegex should not throw an error using safe regex', () => {
        const safeRegex = /^([a-z])$/
        expect(() => evaluateRegex(safeRegex)).to.be.ok
    })   
})