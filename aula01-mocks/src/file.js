const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id","name","profession","age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await this.getFileContent(filePath)
        const validation = this.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        return content
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString('utf8')
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [headers, ...fileWithoutHeader] = csvString.split('\n')
        const isHeaderValid = headers === options.fields.join(',')
        if(!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
        const isContentLengthAccepted = (
            fileWithoutHeader.length > 0 &&
            fileWithoutHeader.length <= options.maxLines
        )

        if(!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }
}

(async () => {
    //const result = await File.csvToJson('./../mocks/invalid-header.csv')
    //const result = await File.csvToJson('../mocks/four-items-invalid.csv')
})()

module.exports = File