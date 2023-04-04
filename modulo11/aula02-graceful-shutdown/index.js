import { MongoClient } from 'mongodb'
import { createServer } from 'http';
import { promisify } from 'util';
async function dbConnect() {
    const client = new MongoClient("mongodb://root:rootpassword@localhost:27017")
    await client.connect()
    console.log('mongodb is connected')
    const db = client.db('comics')
    return {
        collection: { heroes: db.collection('heroes') },
        client
    }
}

const { collection, client } = await dbConnect()

async function handler(request, response) {
    for await(const data of request) {
        try {
            const hero = JSON.parse(data)
            await collection.heroes.insertOne({ ...hero, updatedAt: new Date().toUTCString() })
            const heroes = await collection.heroes.find().toArray()
            response.writeHead(200)
            response.write(JSON.stringify(heroes))
        } catch(e) {
            console.log('A request error happened', e)
            response.writeHead(500)
            response.write(JSON.stringify({ message: 'internal server error' }))
        } finally {
            response.end()
        }
    }
}
/* 
    #request
    curl -i  -X POST --data '{"name": "hell", "age": "90"}' localhost:3000
*/

const server = createServer(handler)
    .listen(3000, () => console.log('running at 3000 and process', process.pid))
//await client.close()

const onStop = async (signal) => {
    console.info(`\n${signal} signal recieved`)
    console.log('closing http server')
    await promisify(server.close.bind(server))()
    console.log('Http server has closed')

    await client.close()
    console.log('Mongo connection has closed')
    process.exit(0)
}
// SIGINT: ctrl + c 
// SIGTERM: kill
["SIGINT", "SIGTERM"].forEach((event) => process.on(event, onStop))
