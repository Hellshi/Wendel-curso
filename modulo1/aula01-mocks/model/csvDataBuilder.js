const CSV = require('./entities/csv')

class CsvDataBuilder {
    constructor() {
        this.csv = [
            {
                id:  1,
                name: "Hell",
                profession: "Backend developer",
                age: 22,
            },

            {
                id:  123,
                name: "Jao",
                profession: "Testemunha de flutter",
                age: 22,
            },

            {
                id:  145,
                name: "Hiran",
                profession: "Backend developer",
                age: 25,
            },
        ]
    }

    static csv() {
        return new CsvDataBuilder()
    }

    build() {
        const csv = new CSV(this.csv)
        return csv
    }
}

module.exports = CsvDataBuilder 