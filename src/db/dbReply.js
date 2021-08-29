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

    getWholeComment: function (bid, callback) {
        /* bid랑 isMine이 필요함 */
        let conn = this.getConnection()
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
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(`getWholeComment 에러 발생: ${error}`);
            callback(rows)
        })
    },

    createMyComment: function (params, callback) {
        let conn = this.getConnection()
        let sql = `INSERT INTO reply (bid, uid, comments, isMine)
        VALUES (?, ?, ?, ?)`
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`createMyComment 에러 발생: ${error}`);
            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
    },
    /* 댓글은 수정이 안 되도록, 실제로 안 되잖아 */
    deleteMyComment: function (rid, callback) {
        let conn = this.getConnection()
        let sql = ` delete from reply where rid = ?`
        conn.query(sql, rid, (error, fields) => {
            if (error)
                console.log(`deleteMyComment 에러 발생: ${error}`);
            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
    },
    increaseReplyCount: function (bid, callback) {
        let conn = this.getConnection()
        let sql = `update bbs set replyCount = replyCount + 1
                    WHERE bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`increaseReplyCount 에러 발생: ${error} `);
            callback();
        })
    },
    decreaseReplyCount: function (bid, callback) {
        let conn = this.getConnection()
        let sql = `update bbs set replyCount = replyCount - 1
                    WHERE bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`decreaseReplyCount 에러 발생: ${error} `);
            callback();
        })
    }
}