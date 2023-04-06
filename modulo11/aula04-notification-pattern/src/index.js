import { createServer } from 'http'
import { statusCodes } from './util/httpStatusCodes.js'
import HeroEntity from './heroEntity.js'


async function handler(request, response) {
    for await(const data of request) {
        try {
            const parsedData = JSON.parse(data)

            if(Reflect.has(parsedData, "connectionError")) {
                throw new Error("error connecting to DB!")
            }
            const hero = new HeroEntity(parsedData)

            if(!hero.isValid()) {
                console.log(hero.notification)
                response.writeHead(statusCodes.BAD_REQUEST)
                response.end(hero.notification.join('\n'))
            }
            response.writeHead(statusCodes.OK)
            response.end()
        } catch (error) {
            
            response.writeHead(statusCodes.INTERNAL_SERVER_ERROR)
            response.end()
        }
    }
}

createServer(handler).listen(3000, () => console.log('running at 3000'))

/* 
    curl -i  -X POST --data '{"name": "hell", "age": 90}' localhost:3000
*/