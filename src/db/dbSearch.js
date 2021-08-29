const mysql = require('mysql');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);


module.exports = {
    getConnection: function () {
        let conn = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            port: config.port
        })
        conn.connect((error) => {
            if (error)
                console.log(`getConnection 에러 발생: ${error}`);
        })
        return conn;
    },

    searchKeywordGetLists: function (searchKeyword, callback) {
        let conn = this.getConnection()
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
        conn.query(sql, searchKeyword, (error, rows, fields) => {
            if (error)
                console.log(`searchKeywordGetLists 에러 발생: ${error}`);
            callback(rows);
        })
    },

    searchPaginationLists: function (searchParams, callback) {
        let conn = this.getConnection()
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
        conn.query(sql, searchParams, (error, rows, fields) => {
            if (error)
                console.log(`searchPaginationLists 에러 발생: ${error}`);
            callback(rows);
        })
    },
    getTotalNumSearch: function (searchKeyword, callback) {
        let conn = this.getConnection()
        let sql = `
        SELECT COUNT(*) AS search_count
        FROM bbs 
        WHERE bbs.title LIKE ?
        `
        conn.query(sql, searchKeyword, (error, result, fields) => {
            if (error)
                console.log(`searchKeywordGetLists 에러 발생: ${error}`);
            callback(result[0]);
        })
    }

}