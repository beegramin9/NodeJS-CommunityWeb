const mysql = require('mysql2/promise');

const fs = require('fs');
const { timingSafeEqual } = require('crypto');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);

module.exports = {
    mainPageGetLists: async function (offset) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn);
            let sql = `
            SELECT bid AS bbs_bid, 
            title AS bbs_title, 
            uid AS users_uid, 
            DATE_FORMAT(modTime, '%y-%m-%d %T') AS bbs_modTime,
            replyCount as bbs_replyCount, 
            if (date(modTime) = DATE(NOW()),
                DATE_FORMAT(modTime, '  %H :  %i  :  %s'),
                DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
            viewCount AS bbs_viewCount  
            
            FROM bbs
            ORDER BY bbs_bid desc
            limit 10 offset ?
            `
            let [rows] = await conn.query(sql, offset)
            conn.release()
            return rows

        } catch (error) {
            console.log(`mainPageGetLists 에러 발생: ${error}`);
            return false
        }
    },
    getTotalNumContent: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT COUNT(*) AS bbs_count FROM bbs 
            where isDeleted=0
            `
            let [result] = await conn.query(sql)
            conn.release();
            return result[0]
        } catch (error) {
            console.log(`getTotalNumContent 에러 발생: ${error}`);
            return false
        }
    },

    loginUserInfo: async function (uid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `select uid,
            pwd, 
            uname
            from users where uid like ?`
            let [result] = await conn.query(sql, uid)
            conn.release()
            return result[0]
        } catch (error) {
            console.log(`loginUserInfo 에러 발생: ${error}`);
            return false
        }
    }
}