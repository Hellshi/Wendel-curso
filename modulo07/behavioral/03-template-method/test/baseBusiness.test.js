import { test, jest, expect, beforeEach } from '@jest/globals'
import { BaseBusiness } from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/utils/exceptions.js'

const VALIDATION_FAILED = false
const VALIDATION_SUCCEEDED = true
const CREATE_SUCCEEDED = true

describe('#BaseBusiness', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('should throw an NotImplementedException when child class doesn\'t implement _validateRequiredFields', () => {
        class ConcreteClass extends BaseBusiness {  }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw when _validateRequiredFields returns false', () => {
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_FAILED)
         }
        const concreteClass = new ConcreteClass()
        const validationError = new Error(`Invalid data!`)
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('should throw an NotImplementedException when child class doesn\'t implement _create', () => {
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
         }
        const concreteClass = new ConcreteClass()
        const validationError = new NotImplementedException(
            concreteClass._create.name
        )
        expect(() => concreteClass.create({})).toThrow(validationError)
    })
    test('Should call _create and _validateRequiredFields on create', () => {
        class ConcreteClass extends BaseBusiness { 
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEEDED)
            _create = jest.fn().mockReturnValue(CREATE_SUCCEEDED)
         }
        const concreteClass = new ConcreteClass()
        const createFromBaseClass = jest.spyOn(
            BaseBusiness.prototype,
            BaseBusiness.prototype.create.name
        )

        const result = concreteClass.create({})
        expect(result).toBeTruthy()
        expect(createFromBaseClass).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
        expect(concreteClass._create).toHaveBeenCalled()
    })
})