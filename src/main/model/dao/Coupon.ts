export type Coupon = {
    id: Number
    code: string,
    minimumPurchase: Number,
    validStartTime: Date,
    validEndTime: Date,
    type: string,
    maxRedemption: Number,
    redemptionCount: Number,
}

export const dbToCoupon = (db: { [key: string]: any }): Coupon => {
    return {
        id: Number(db.id),
        code: db.code,
        minimumPurchase: db.minimum_purchase,
        validStartTime: new Date(db.valid_start_time),
        validEndTime: new Date(db.valid_end_time),
        type: db.type,
        maxRedemption: Number(db.maximum_redemption),
        redemptionCount: Number(db.redemption_count),
    }
}