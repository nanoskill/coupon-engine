import { FastifyRequest, FastifyReply } from "fastify";

export const handler = async (
    _req: FastifyRequest,
    resp: FastifyReply,
) => {

    try {
        resp.status(404).send({ "message": "Unimplemented" });

    } catch (error) {
        console.error(error);
        resp.status(500)
    }
}