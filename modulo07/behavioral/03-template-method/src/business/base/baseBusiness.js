import { NotImplementedException } from "../../utils/exceptions.js";

class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(this._validateRequiredFields.name)
    }

    _create(data) {
        throw new NotImplementedException(this._create.name)
    }

    /* 
        A Martin Fowler's pattern
        The proposal of this pattern ir to grant an execution sequence to be followed

        The create method bellow is the execution of the Template Method (Think about Plato's allegory haha)
    */

    create(data) {
        // Validate fields 
        const isValid = this._validateRequiredFields(data)
        if(!isValid) throw new Error(`Invalid data!`)
        // Save in the database
        return this._create(data)
    }
}

export { BaseBusiness }