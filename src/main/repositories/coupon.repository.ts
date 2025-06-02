// import { Coupon, dbToCoupon } from "../model/dao/Coupon";
import { pgInstance } from "./database";

const dbToCoupon = (db: { [key: string]: any }): Coupon => {
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

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
    const query = 'SELECT * FROM coupon WHERE code = $1';
    const params = [code];
    try {
        const result = await pgInstance.query(query, params);
        if (result.rowCount == 0) {
            return null
        }

        console.log(result.rows[0]);
        return dbToCoupon(result.rows[0])
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

export const createCoupon = async (coupon: Coupon, userId: number | undefined): Promise<Coupon | null> => {
    const query = `INSERT INTO 
        coupon(code,minimum_purchase,valid_start_time,valid_end_time,"type",maximum_redemption)
        VALUES 
        {{param}}
        RETURNING id, code, minimum_purchase, valid_start_time, valid_end_time, "type", maximum_redemption`
    const insertCouponParams = [coupon.code, coupon.minimumPurchase, coupon.validStartTime, coupon.validEndTime, coupon.type, coupon.maxRedemption];

    const insertCouponQuery = query.replace('{{param}}', `(${insertCouponParams.map((_, i) => `$${i + 1}`).join(',')})`);

    if (!userId) {
        try {
            const result = await pgInstance.query(insertCouponQuery, insertCouponParams);
            console.log(result);
            // return {
            //     id: result.rows[0]

            // };
            return dbToCoupon(result.rows[0]);
        } catch (error) {
            console.error('Error executing query:', error);
            throw error
        }

    }

    const insertUserQuery = `INSERT INTO
    coupon_customer(coupon_id, customer_id, is_redeemed)
    VALUES
    ($1, $2, $3)`

    const cl = await pgInstance.connect();

    try {
        await cl.query('BEGIN');
        const insertCouponResult = await cl.query(insertCouponQuery, insertCouponParams);
        const c = dbToCoupon(insertCouponResult.rows[0]);

        const insertUserParams = [c.id, userId, false];

        await cl.query(insertUserQuery, insertUserParams);
        await cl.query('COMMIT');

        return dbToCoupon(insertCouponResult.rows[0]);

    } catch (error) {
        cl.query('ROLLBACK');

    } finally {
        cl.release();

    }

    return null;

}