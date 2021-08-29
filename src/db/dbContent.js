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
    getContent: function (bid, callback) {
        let conn = this.getConnection()
        /* 아마 이것도 full outer join인가봐... */
        /* 테이블 3개 합치기 */
        /* params로 들어가는 건 잘 받았는데. */
        /* 여기서 bbs_bid를 제대로 안 주니까 다 1001로 나오잖아 */
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
        WHERE bbs.isDeleted = 0 and bbs.bid = ?
    
        `
        conn.query(sql, bid, (error, results, fields) => {
            if (error)
                console.log(`getContent 에러 발생: ${error}`);
            callback(results[0])
        })
    },
    increaseViewCount: function (bid, callback) {
        let conn = this.getConnection()
        let sql = `update bbs set viewCount = viewCount + 1
                    where bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`increaseViewCount 에러 발생: ${error} `);
            callback();
        })
    },
    createContent: function (params, callback) {
        let conn = this.getConnection()
        let sql = `INSERT into bbs (uid, title, content)
        VALUES(?,?,?)
        `
        /* 구문이 두개로 나눠져있네... 시발 */

        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`createContent 에러 발생: ${error}`);

            console.log();
            /* 이게 왜 안 나오지? */
            callback();
        })
        /* 여기엔 문제가 없다. 하이디에서 잘 들어오니까 */

        /* 이제 여기서 뭘 받아와야 하는지... */
        /* select 해서 row를 받는게 아니니까 콜백이 없지 */
    },

    contentToUpdate: function (bid, callback) {
        let conn = this.getConnection();
        /* 여기서 uname을 받아야 함 */
        // let sql = `select * from bbs where bid =?`
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
        conn.query(sql, bid, (error, rows, fields) => {
            if (error)
                console.log(`contentToUpdate 에러 발생: ${error}`);
            callback(rows[0])
        })
    },
    updateContent: function (params, callback) {
        let conn = this.getConnection();
        let sql = `update bbs set title=?, content=? where bid=?  `
        conn.query(sql, params, (error, fields) => {
            if (error)
                console.log(`updateContent 에러 발생: ${error}`);
            callback()
        })
    },
    deleteContent: function (bid, callback) {
        let conn = this.getConnection();
        let sql = `delete from bbs where bid = ?`
        conn.query(sql, bid, (error, fields) => {
            if (error)
                console.log(`deleteContent 에러 발생: ${error}`);
            callback()
        })
    },
}