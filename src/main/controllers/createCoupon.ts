import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";

import createCoupon from "../services/createCoupon";

export const schema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            code: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                code: { type: 'string' },
            }
        }
    }
}

export const handler = async (
    req: FastifyRequest,
    resp: FastifyReply
) => {

    // TODO update
    const reqBody = req.body as { code: string };

    const result = await createCoupon(reqBody.code);

    try {
        resp.status(200).send(result)

    } catch (error) {
        console.error(error);
        resp.status(500).send({ "message": `Internal server error` });
    }
}
