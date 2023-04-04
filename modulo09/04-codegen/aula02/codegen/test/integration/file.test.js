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
        // factory
        // factory/heroesFactory.js
        const filename = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`
        // mainPath: /Documents/project/jsexpert
        // defaultMainFolder: src
        // layer: factory
        // filename: heroesFactory.js

        return join(mainPath, defaultFolder, layer, filename)
    })
}

function getAllFunctionsFromInstance(instance) {
    return Reflect.ownKeys(Reflect.getPrototypeOf(instance))
        .filter(method => method !== 'constructor')
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
       //await fsPromises.rm(config.mainPath, { recursive: true })
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
    test('Service should have the same signature of repository and call all its methods', async() => {
        const myConfig = {
            ...config,
            layers: ['repository', 'service']
        }

        await createFiles(myConfig)
        const [repositoryFile, serviceFile] = generateFilePath(myConfig)

        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)

        const repository = new Repository()
        const service = new Service({ repository })
        const allRepositoryMethods = getAllFunctionsFromInstance(repository)

        allRepositoryMethods
            .forEach(method => jest.spyOn(repository, method).mockResolvedValue())

        // executa todos os metodos de service
        getAllFunctionsFromInstance(service)
            .forEach(method => service[method].call(service, []))

        allRepositoryMethods
            .forEach(method => expect(repository[method]).toHaveBeenCalled())
    
    })
    test('Factory instance should match layers', async() => {
        await createFiles(config)
        const [factoryFile, repositoryFile, serviceFile ] = generateFilePath(config)
        const { default: Repository } = await import(repositoryFile)
        const { default: Service } = await import(serviceFile)
        const { default: Factory } = await import(factoryFile)

        const expectedInstance = new Service({ repository: new Repository() })
        const instance = Factory.getInstance()

        expect(instance).toMatchObject(expectedInstance)
        expect(instance).toBeInstanceOf(Service)
    })
})

