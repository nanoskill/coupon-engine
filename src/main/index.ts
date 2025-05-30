import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

server.get("/ping", opts, async () => {
    console.log("ping received")
    return { pong: "it works!" }
})

const start = async () => {
    try {
        console.log("starting server...")
        await server.listen({ port: 3000 })

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()