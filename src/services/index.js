const { redis } = require("../configs");
const pify = require("pify");

/**
 * Handles anything related to the Redis memory store
 */
class RedisService {
    /**
     * Saves data to Redis memory-store
     * @param {String} key - the key to be used
     * @param {String} value - Stringified data to be used as value
     * @return {Promise<boolean>} if the data was saved or not
     */
    static async set(key, value) {
        try {
            return await pify(redis).set(key, value);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Gets data from Redis using the provided key
     * @param {String} key - the key to check for in Redis
     * @return {Promise<String>}
     */
    static async get(key) {
        try {
            return await pify(redis).get(key);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Deletes data from Redis using the provided key
     * @param {String} key
     * @return {*}
     */
    static async delete(key) {
        try {
            return await pify(redis).del(key);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = { RedisService };
