const { expect } = require('chai')
const TextProcessorFluentAPI = require('./../src/textProcessorFluentApi')
const mock = require('./mock/valid')

describe('Text Processor Fluent Api', () => {
    it('#build', () => {
        const result = new TextProcessorFluentAPI(mock).build()
        expect(result).to.be.deep.equal(mock)
    })

    it('#extractPeopleData', () => {
        const result = new TextProcessorFluentAPI(mock)
            .extractPeopleData()
            .build()

        const expected = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e",
                "domiciliada a Rua bobos, zero, Alpha Ville, de São Paulo."
            ].join("\n"),
            [
                "Arya Robbin, belga, casado, CPF 225.741.420-11, residente e",
                "domiciliada a Av. Paulista, 1400,bairro Consolação, São Paulo."
            ].join("\n"),
            [
                "Júlia Menezes, brasileira, solteira,CPF 235.245.421-11, residente e",
                "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo."
            ].join("\n")
        ]

        expect(result).to.be.deep.equal(expected)
    })

    it('#divideTextInColumns', () => {

        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e",
                "domiciliada a Rua bobos, zero, Alpha Ville, de São Paulo."
            ].join("\n")
        ]

        const result = new TextProcessorFluentAPI(content)
            .divideTextInColumns()
            .build()

        const expected = [
            [
                "Xuxa da Silva",
                " brasileira",
                " casada",
                " CPF 235.743.420-12",
                " residente e\ndomiciliada a Rua bobos",
                " zero",
                " Alpha Ville",
                " de São Paulo.",    
            ]
    ]

        expect(result).to.be.deep.equal(expected)
    })

    it('#removeEmptyCharacters', () => {
        const content = [
            [
                "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e",
                "domiciliada a Rua bobos, zero, Alpha Ville, de São Paulo."
            ].join("\n")
        ]

        const result = new TextProcessorFluentAPI(content)
            .divideTextInColumns()
            .removeEmptyCharacters()
            .build()

        const expected = [
            [
                "Xuxa da Silva",
                "brasileira",
                "casada",
                "CPF 235.743.420-12",
                "residente e\ndomiciliada a Rua bobos",
                "zero",
                "Alpha Ville",
                "de São Paulo.",     
            ]
    ]

        expect(result).to.be.deep.equal(expected)
    })
})