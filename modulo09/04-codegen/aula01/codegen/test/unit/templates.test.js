import {
    expect,
    describe,
    test,
    jest,
    beforeEach
} from '@jest/globals'
import templates from '../../src/templates/index.js'
const {
    repositoryTemplate
} = templates
import { repositoryTemplateMock } from './mocks/index.js'

describe('#Codegen 3-layer arch', () => {
    const componentName = "product"
    const repositoryName = `${componentName}Repository`
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    test.todo('#should generate repository template')
    test.todo('#should generate service template')
    test.todo('#should generate factory template')
})