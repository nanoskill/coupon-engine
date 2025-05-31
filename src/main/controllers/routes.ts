import { FastifyInstance } from "fastify";
import * as controller from "./coupon.controller";

export default async (fastify: FastifyInstance) => {

    fastify.post("/coupon", controller.createCoupon)
    fastify.get("/coupon/:code", controller.getCoupon)

}
