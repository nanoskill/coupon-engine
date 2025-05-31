import dotenv from 'dotenv';
dotenv.config();
import Fastify, { fastify, FastifyInstance, RouteShorthandOptions } from "fastify";

import routes from "./controllers/routes";
import { pgInstance } from "./repositories/database";

const server: FastifyInstance = Fastify({})

const spinUp = async () => {

    try {
        const client = await pgInstance.connect();
        console.log("Connected to postgre");
        client.release();
    } catch (error) {
        console.error("Failed to connect to postgres", error);
    }

    server.register(routes)

    try {
        const port = Number(process.env.PORT || 3000)
        console.log(`Starting server on port ${port}`)
        await server.listen({ port })

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

spinUp()