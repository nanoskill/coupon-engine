import { pgInstance } from "./database";
import _ from 'lodash';

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
    const query = 'SELECT * FROM coupon WHERE code = $1';
    const params = [code];
    try {
        const result = await pgInstance.query(query, params);
        if (result.rowCount == 0) {
            return null
        }

        return _.mapKeys(result.rows[0], (_v, k) => _.camelCase(k)) as Coupon
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}