import * as repository from '../repositories/coupon.repository'

export default async (code: string) => {
    const res = await repository.getCouponByCode(code)
    console.log(res)
    return res
}