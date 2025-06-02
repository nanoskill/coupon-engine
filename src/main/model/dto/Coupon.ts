interface createCouponRequest {
    code: string,
    minimumPurchase: string,
    validStartTime: string,
    validEndTime: string,
    type: string,
    maximumRedemption: number,
    userId: number | undefined,
}

interface createCouponReturn {
    id: number,
    code: string
}