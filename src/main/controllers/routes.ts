import { FastifyInstance } from "fastify";
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

import * as createCoupon from "./createCoupon";
import * as validateCoupon from "./validateCoupon";

export default async (fastify: FastifyInstance) => {

    fastify.withTypeProvider<JsonSchemaToTsProvider>();

    fastify.post("/coupon", { schema: createCoupon.schema }, createCoupon.handler)
    fastify.get("/coupon/:code", validateCoupon.handler)

}
