'use-strict'

const { watch, promises: { readFile } } = require('fs');

class File {
    watch(event, filename) {
        console.log('this', this)
        console.log('arguments', Array.prototype.slice.call(arguments))
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

/* watch(__filename, async (event, filename) => {
    console.log((await readFile(filename)).toString())
}) */

const file = new File()
//This way of calling ignores File class this and uses watch function this context
//watch(__filename, file.watch)

//It works but it's ugly
//watch(__filename, (event, fileName) => file.watch(event, fileName))

//We can make the context explicit

// We can make the context explicit using .bind 
//watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: welcome to the internet') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: welcome to the internet') }, [null, __filename])
