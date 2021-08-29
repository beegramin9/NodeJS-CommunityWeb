const mysql = require('mysql2/promise');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);

module.exports = {
    getContent: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT bbs.title as bbs_title,
            bbs.bid as bbs_bid,
            DATE_FORMAT(bbs.modTime, '%y-%m-%d %H: %i: %s') as bbs_modTime,
            users.uname AS users_uname,
            users.uid as users_uid,
            bbs.viewCount as bbs_viewCount, 
            reply.NumComments as reply_NumComments,
            bbs.content as bbs_content, 
            reply.comments as reply_comments, 
            reply.isMine as reply_isMine
            FROM bbs 
            LEFT outer JOIN reply 
            ON bbs.bid = reply.bid
            LEFT OUTER JOIN users
            ON USERs.uid = bbs.uid 
            WHERE bbs.isDeleted = 0 and bbs.bid = ?`
            let [result] = await conn.query(sql, bid)
            conn.release()
            return result[0]

        } catch (error) {
            console.log(`getContent 에러 발생: ${error}`);
            return false
        }
    },
    increaseViewCount: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `update bbs set viewCount = viewCount + 1
            where bid = ?`
            let [rows] = await conn.query(sql, bid)
            conn.release()
            return;
            /* 리턴값이 없으면, 원래같으면 callback()이면 그냥 비워놓는다. */
        } catch (error) {
            return false
        }
    },
    createContent: async function (params) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `INSERT into bbs (uid, title, content)
            VALUES(?,?,?)`
            let [rows] = await conn.query(sql, params)
            conn.release()
            return;
        } catch (error) {
            console.log(`createContent 에러 발생: ${error}`);
            return false
        }
    },
    contentToUpdate: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `SELECT bbs.bid AS bbs_bid,
            bbs.title AS bbs_title,
            bbs.content AS bbs_content,
            users.uname AS users_uname,
            users.uid AS users_uid
            FROM bbs
            left outer JOIN users
            ON users.uid = bbs.uid
            where bid = ?
            `
            let [result] = await conn.query(sql, bid)
            conn.release()
            return result[0]

        } catch (error) {
            console.log(`contentToUpdate 에러 발생: ${error}`);
            return false
        }
    },
    updateContent: async function (params) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `update bbs set title=?, content=? where bid=?  `
            let [rows] = await conn.query(sql, params)
            conn.release()
            return;

        } catch (error) {
            console.log(`updateContent 에러 발생: ${error}`);
            return false
        }
    },
    deleteContent: async function (bid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `delete from bbs where bid = ?`
            let [rows] = await conn.query(sql, bid)
            conn.release()
            return;
        } catch (error) {
            console.log(`updateContent 에러 발생: ${error}`);
            return false
        }
    }
}