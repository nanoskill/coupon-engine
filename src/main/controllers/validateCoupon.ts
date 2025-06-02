import { FastifyReply, FastifyRequest } from "fastify"

import validateCouponService from "../services/validateCoupon";
import getCouponByCode from "../services/getCouponByCode";

export const handler = async (
    req: FastifyRequest<{
        Params: { code: string }
    }>,
    resp: FastifyReply
) => {

    const reqParam = req.params;

    try {
        const res = await getCouponByCode(reqParam.code);
        if (res == null) {
            resp.status(404);
        }
        resp.status(200).send(res)
    } catch (error) {
        console.error(error);
    }
}