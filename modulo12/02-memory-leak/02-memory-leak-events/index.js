import { createServer } from 'http'

import Events from 'events'

const myEvent = new Events()

function onData() {
    const items = []
    setInterval(() => items.push(Date.now()))
}

createServer((request, response) => {
    myEvent.on('data', onData)
    myEvent.emit('data', Date.now())
    response.end()
}).listen(3000, () => console.log('O administrador está online'))