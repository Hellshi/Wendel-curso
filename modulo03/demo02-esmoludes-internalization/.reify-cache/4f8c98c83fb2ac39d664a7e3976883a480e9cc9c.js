"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);



describe('Person', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '2 Bike,aviao,navio 200000000 2000-01-01 2002-02-01'
        )
        const expected = {
            id: '2',
            vehicles: [ 'Bike', 'aviao', 'navio' ],
            kmTraveled: '200000000',
            from: '2000-01-01',
            to: '2002-02-01'
          }
        expect(person).to.be.deep.equal(expected)
    })

    it("should format values", () => {
        const person = new Person({
            id: '2',
            vehicles: [ 'Bike', 'aviao', 'navio' ],
            kmTraveled: '200000000',
            from: '2000-01-01',
            to: '2002-02-01'
          })
        
          const result = person.formatted("pt-br")
          const expected = {
            id: 2,
            vehicles: 'Bike, aviao e navio',
            kmTraveled: '200.000.000 km',
            from: '01 de janeiro de 2000',
            to: '01 de fevereiro de 2002'
          }
          
        expect(result).to.deep.equal(expected)
    })
})