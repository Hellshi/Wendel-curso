const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert');

(async() => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)

        const result = File.csvToJson(filePath)

        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/four-items-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)

        const result = File.csvToJson(filePath)

        await rejects(result, rejection)
    }

    {
        const filePath = './mocks/validFile.csv'

        const result = await File.csvToJson(filePath)

        const expected = [
                {
                  "id": 123,
                  "name": "Erick Wendel",
                  "profession": "Javascript Instructor",
                  "birthday": 1998
                },
                {
                  "id": 321,
                  "name": "NANANANANA",
                  "profession": "Javascript Specialist",
                  "birthday": 1943
                },
                {
                  "id": 321,
                  "name": "Marlos",
                  "profession": "Chemestry boy",
                  "birthday": 2001
                }
              ]
        

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()