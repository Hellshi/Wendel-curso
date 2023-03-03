class CSV {
    constructor( json ) {
      this.json = json
        const array = [Object.keys(this.json[0])].concat(this.json)

        this.csv = array.map(it => {
          return Object.values(it).toString()
        }).join('\n')
    }
}

module.exports = CSV