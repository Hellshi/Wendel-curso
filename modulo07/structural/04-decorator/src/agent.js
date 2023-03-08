import Http from 'http'

export async function InjectHttpInterceptor() {
    const oldEmit = Http.Server.prototype.emit
    Http.Server.prototype.emit = function(...args) {
        const [type, req, response] = args
        if(type === "request") {
            response.setHeader('X-Instrumented-By', 'ErickWendell')
        }

        return oldEmit.apply(this, args)
    }

}

