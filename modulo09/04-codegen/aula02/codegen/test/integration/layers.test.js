import {
    expect,
    describe,
    test,
    jest,
    beforeAll,
    afterAll
} from '@jest/globals'
import { createLayersIfNotExists } from '../../src/createLayers.js'
import fsPromises from 'fs/promises'
import fs from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'


describe('#Integration - Layers - Folder Structure', () => {
    const config = {
        defaultFolder: 'src',
        mainPath: '',
        //system returns alphabetical order
        layers: ['service', 'factory', 'repository'].sort()
    }
    beforeEach(() => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    beforeAll(async () => {
        config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
    })

    afterAll(async () => {
        await fsPromises.rm(config.mainPath, { recursive: true })
    })

    test('Should create folder if it doesn\'t exist', async() => {
        const beforeRun = await fsPromises.readdir(config.mainPath)

        // run
        await createLayersIfNotExists(config)

        const afterRun = await getFolders(config)
        expect(beforeRun).not.toStrictEqual(afterRun)
        expect(afterRun).toEqual(config.layers)
    })
    test('Should not create folder if it exists', async () => {
        const beforeRun = await getFolders(config)
        await createLayersIfNotExists(config)
        const afterRun = await getFolders(config)
        
        expect(afterRun).toEqual(beforeRun)


    })
})

async function getFolders({ mainPath, defaultFolder }) {
    return fsPromises.readdir(join(mainPath, defaultFolder))
}