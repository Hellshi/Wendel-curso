import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals'
import Util from '../../src/util'

describe('#Util - Strings', () => {
   
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test('#upperCaseFirstLetter should transform the first letter in uppercase', () => {
        const data = 'hello'
        const expected = 'Hello'
        const result = Util.upperCaseFirstLetter(data)
        expect(result).toStrictEqual(expected)
    })
    test('#lowerCaseFirstLetter should transform the first letter in lowercase', () => {
        const data = 'Hello'
        const expected = 'hello'
        const result = Util.lowerCaseFirstLetter(data)
        expect(result).toStrictEqual(expected) 
    })
    test.todo('#lowerCaseFirstLetter given an empty string should return empty')
    test.todo('#upperCaseFirstLetter given an empty string should return empty')
})