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
            [
                {
                  "id": 123,
                  "name": "Erick Wendel",
                  "profession": "Javascript Instructor",
                  "age": 25
                },
                {
                  "id": 321,
                  "name": "NANANANANA",
                  "profession": "Javascript Specialist",
                  "age": 80
                },
                {
                  "id": 321,
                  "name": "Marlos",
                  "profession": "Chemestry boy",
                  "age": 22
                }
              ]
        ]

        deepStrictEqual(result, expected)
    }
})()