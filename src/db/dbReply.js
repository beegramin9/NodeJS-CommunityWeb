const mysql = require('mysql2/promise');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);


module.exports = {
    getWholeComment: async function (bid) {
        /* bid랑 isMine이 필요함 */
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT users.uname as reply_uname, 
            reply.comments as reply_comments, 

            if (date(reply.regTime) = DATE(NOW()),
		    	DATE_FORMAT(reply.regTime, '%H:%i:%s'),
		    	DATE_FORMAT(reply.regTime, '%Y-%m-%d')) AS reply_regTime,
            
		      reply.bid as reply_bid,
            reply.rid as reply_rid,
            reply.isMine as reply_isMine
            
	        FROM reply
	        LEFT JOIN users
	        ON users.uid = reply.uid
	        WHERE bid = ?
            `
            let [rows] = await conn.query(sql, bid)
            conn.release()
            return rows
        } catch (error) {
            console.log(`getWholeComment 에러 발생: ${error}`);
            return false
        }
    },
    createMyComment: async function (params) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `INSERT INTO reply (bid, uid, comments, isMine)
            VALUES (?, ?, ?, ?)`
            let [rows] = await conn.query(sql, params)
            conn.release()
            return;
        } catch (error) {
            console.log(`createMyComment 에러 발생: ${error}`);
            return false
        }
    },
    /* 댓글은 수정이 안 되도록, 실제로 안 되잖아 */

    deleteMyComment: async function (rid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = ` delete from reply where rid = ?`
            let [rows] = await conn.query(sql, rid)
            conn.release()
            return;
        } catch (error) {
            console.log(`deleteMyComment 에러 발생: ${error}`);
            return false
        }
    },
    increaseReplyCount: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `update bbs set replyCount = replyCount + 1
            WHERE bid = ?`
            let [rows] = await conn.query(sql, bid)
            conn.release()
            return;
        } catch (error) {
            console.log(`increaseReplyCount 에러 발생: ${error}`);
            return false
        }
    },
    decreaseReplyCount: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `update bbs set replyCount = replyCount - 1
            WHERE bid = ?`
            let [rows] = await conn.query(sql, bid)
            conn.release()
            return;
        } catch (error) {
            console.log(`decreaseReplyCount 에러 발생: ${error}`);
            return false
        }
    }
}