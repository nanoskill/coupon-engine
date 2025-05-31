import { createCouponReturn } from "../model/dto/Coupon";
import { getCouponByCode } from "../repositories/coupon.repository"

export default async (code: string): Promise<createCouponReturn | null> => {
    const repoRes = await getCouponByCode(code);
    if (repoRes == null) {
        return null;
    }
    return {
        id: repoRes.id,
        code: repoRes.code,
    }

}