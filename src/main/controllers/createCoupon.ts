import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";

import createCoupon from "../services/createCoupon";
import { FromSchema } from "json-schema-to-ts";

export const schema = {
    body: {
        type: 'object',
        properties: {
            code: { type: 'string' },
            minimumPurchase: { type: 'string', /* pattern: "^-?\d+(\.\d+)?$"*/ },
            validStartTime: { type: 'string', format: 'date-time' },
            validEndTime: { type: 'string', format: 'date-time' },
            type: { enum: ["GLOBAL", "USER"] },
            maximumRedemption: { type: 'integer' },
            userId: { type: 'integer' },
        },
        required: ['code', 'minimumPurchase', 'validStartTime', 'validEndTime', 'type', 'maximumRedemption'],
        if: {
            properties: {
                type: { const: "USER" }
            }
        },
        then: {
            required: ['code', 'minimumPurchase', 'validStartTime', 'validEndTime', 'type', 'maximumRedemption', 'userId'],
        }
    } as const,
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
    req: FastifyRequest<{ Body: FromSchema<typeof schema.body> }>,
    resp: FastifyReply
) => {

    const reqBody = req.body;

    const result = await createCoupon({
        code: reqBody.code,
        minimumPurchase: reqBody.minimumPurchase,
        validStartTime: reqBody.validStartTime,
        validEndTime: reqBody.validEndTime,
        type: reqBody.type,
        maximumRedemption: reqBody.maximumRedemption,
        userId: reqBody.userId
    });

    try {
        resp.status(200).send(result)

    } catch (error) {
        console.error(error);
        resp.status(500).send({ "message": `Internal server error` });
    }
}
