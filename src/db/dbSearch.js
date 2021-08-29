const mysql = require('mysql2/promise');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);


module.exports = {
    searchKeywordGetLists: async function (searchKeyword) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
                SELECT bbs.bid AS bbs_bid, 
                bbs.title AS bbs_title, 
                bbs.uid AS users_uid, 
                DATE_FORMAT(bbs.modTime, '%y-%m-%d %T') AS bbs_modTime,
                bbs.replyCount as bbs_replyCount, 
                if (date(modTime) = DATE(NOW()),
		        	DATE_FORMAT(modTime, '%H:%i:%s'),
		        	DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
                bbs.viewCount AS bbs_viewCount  
                
                FROM bbs 
                WHERE bbs.title LIKE ? 
                `
            let [rows] = await conn.query(sql, searchKeyword)
            conn.release()
            return rows
        } catch (error) {
            console.log(`searchKeywordGetLists 에러 발생: ${error}`);
            return false
        }
    },
    searchPaginationLists: async function (searchParams) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT bbs.bid AS bbs_bid, 
            bbs.title AS bbs_title, 
            bbs.uid AS users_uid, 
            bbs.replyCount as bbs_replyCount, 
            if (date(modTime) = DATE(NOW()),
                DATE_FORMAT(modTime, '%H:%i:%s'),
                DATE_FORMAT(modTime, '%Y-%m-%d')) AS bbs_modTime,
            bbs.viewCount AS bbs_viewCount  
            
            FROM bbs 
            WHERE bbs.title LIKE ? 
            limit 10 offset ?
            `
            let [rows] = await conn.query(sql, searchParams)
            conn.release()
            return rows
        } catch (error) {
            console.log(`searchPaginationLists 에러 발생: ${error}`);
            return false
        }
    },
    getTotalNumSearch: async function (searchKeyword) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT COUNT(*) AS search_count
            FROM bbs 
            WHERE bbs.title LIKE ?
            `
            let [result] = await conn.query(sql, searchKeyword)
            conn.release()
            return result[0]
        } catch (error) {
            console.log(`getTotalNumSearch 에러 발생: ${error}`);
            return false
        }
    }
}