import { Coupon, dbToCoupon } from "../model/dao/Coupon";
import { pgInstance } from "./database";

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
    const query = 'SELECT * FROM coupon WHERE code = $1';
    const params = [code];
    try {
        const result = await pgInstance.query(query, params);
        if (result.rowCount == 0) {
            return null
        }

        return dbToCoupon(result.rows[0])
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}