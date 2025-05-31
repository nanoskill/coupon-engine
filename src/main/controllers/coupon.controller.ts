import { FastifyReply, FastifyRequest, FastifyRequestContext } from "fastify";

import service from '../services'

export const createCoupon = async (
    request: FastifyRequest<{
        Body: { code: string }
    }>,
    reply: FastifyReply
) => {

    const reqBody = request.body;

    try {
        reply.status(200).send({ "message": `Coupon ${reqBody.code} created!` })

    } catch (error) {
        console.error(error)
    }
}

export const getCoupon = async (
    request: FastifyRequest<{
        Params: { code: string }
    }>,
    reply: FastifyReply
) => {

    const reqParam = request.params;

    try {
        const res = await service.getCoupon(reqParam.code)
        if (res == null) {
            reply.status(404).send([])
        }
        reply.status(200).send(res)
    } catch (error) {
        console.error(error)
    }
}
