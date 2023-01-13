const http = require('http');

const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact us page');
        return response.end();
    },

    '/login:post': async(request, response) => {
        let user
        // Response is a iterator
        for await(const data of request) {
            user = JSON.parse(data)
        }
        response.write(`Hello ${user.username}`);
        return response.end();
    },

    default: (request, response) => {
        response.write('Hello World');
        return response.end();
    }

};

const handler = function(request, response) {
    const { url, method } = request
 
    const routeKey = `${url}:${method.toLowerCase()}`

    const chosen = routes[routeKey] || routes.default

    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    return chosen(request,response)
}

const app = http.createServer(handler)
    .listen(3000, () => console.log('O administrador está onlineee'))

module.exports = app