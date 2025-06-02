import { createCoupon, getCouponByCode } from "../repositories/coupon.repository"

export default async (req: createCouponRequest): Promise<createCouponReturn | null> => {

    const res = await createCoupon({
        code: req.code,
        minimumPurchase: parseInt(req.minimumPurchase, 10),
        validStartTime: new Date(req.validStartTime),
        validEndTime: new Date(req.validEndTime),
        type: req.type,
        maxRedemption: req.maximumRedemption,
        id: undefined,
        redemptionCount: undefined
    }, req.userId);

    if (!res) {
        return null;
    }

    return {
        id: res.id ?? 0,
        code: res.code
    }

}