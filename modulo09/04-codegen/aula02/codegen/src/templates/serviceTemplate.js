import Util from "../util.js"

const componentNameAnchor = '$$componentName'
const currentContextAnchor = '$$currentContext'
const repositoryAnchor = '$$repositoryAnchor'

const template = `
export default class $$componentNameService {
    constructor({ repository: $$repositoryAnchor }) {
        $$currentContext = $$repositoryAnchor
    }

    create(data) {
        return this.productRepository.create(data)
    }

    read(query) {
        return this.productRepository.read(query)
    }

    update(id, data) {
        return this.productRepository.update(id, data)
    }

    delete(id) {
        return this.productRepository.delete(id)
    }
}`

export function serviceTemplate(componentName, repositoryName) {
    const currentContext = `this.${repositoryName}`
    const txtFile = template
        .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
        .replace(currentContextAnchor, currentContext)
        .replaceAll(repositoryAnchor, repositoryName)

    return {
        fileName: `${componentName}Service`,
        template: txtFile
    }
}