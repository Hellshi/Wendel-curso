const { expect } = require('chai');
const Person = require('../src/person')

describe('Person', () => {
    it('Should generate a person instance from properties list', () => {
        const content = [
            "Xuxa da Silva",
            "brasileira",
            "casada",
            "CPF 235.743.420-12",
            "residente e\ndomiciliada a Rua bobos",
            "zero",
            "Alpha Ville",
            "de São Paulo.",     
        ]

        const result = new Person(content)
        const expected = {
            nome: "Xuxa da Silva",
            nacionalidade: "Brasileira",
            estadoCivil: "Casada",
            documento: "23574342012",
            rua: "Rua bobos",
            numero: "zero",
            bairro: "Alpha Ville",
            estado: "São Paulo",  
        }

        expect(result).to.be.deep.equal(expected)
    })
})