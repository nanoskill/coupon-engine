interface Coupon {
    id: number | undefined,
    code: string,
    minimumPurchase: number,
    validStartTime: Date,
    validEndTime: Date,
    type: string,
    maxRedemption: number,
    redemptionCount: number | undefined,
}