import {
    expect,
    describe,
    test,
    jest,
    beforeAll,
    afterAll
} from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import { createFiles } from '../../src/createFiles.js'
import fsPromises from 'fs/promises'
import fs from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import Util from '../../src/util.js'

function generateFilePath({ mainPath, defaultFolder, layers, componentName }) {
    return layers.map(layer => {
        // The filePath follows this structure:
        // src/factory/heroesFactory.js
        const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        // mainPath: /Documents/projects;jsexpert
        // defaultMainFolder: src
        // layer: factory
        // filename: heroesFactory.js

        return join(mainPath, defaultFolder, layer, fileName)
    })
}


describe('#Integration - Files - Files Structure', () => {
    const config = {
        defaultFolder: 'src',
        mainPath: '',
        //system returns alphabetical order
        layers: ['service', 'factory', 'repository'].sort(),
        componentName: 'heroes'
    }
    const packageJSON = 'package.json'
    const packageJSONLocation = join('./test/integration/mocks', packageJSON)


    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'layers-'))
        await fsPromises.copyFile(
            packageJSONLocation,
            join(config.mainPath, packageJSON)
        )
        await createLayersIfNotExists(config)
    })

    afterAll(async () => {
       await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('Repository class should have create, read, update and delete methods', async() => {
        const myConfig = {
            ...config,
            layers: ['repository']
        }
        await createFiles(myConfig)
        const  [ repositoryFile ]  = generateFilePath(myConfig)
        const { default: Repository } =  await import(repositoryFile)
        const instance = new Repository()
        const expectNotImplemented = fn => expect(() => fn.call()).rejects.toEqual("method not implemented!")
        
        expectNotImplemented(instance.create)
        expectNotImplemented(instance.read)
        expectNotImplemented(instance.update)
        expectNotImplemented(instance.delete)
    })
    test.todo('Service should have the same signature of repository and call all its methods')
    test.todo('Factory instance should match layers')
})

