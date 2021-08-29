const mysql = require('mysql');

const fs = require('fs');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);

module.exports = {
    // getConnection: function () {
    //     let conn = mysql.createConnection({
    //         host: config.host,
    //         user: config.user,
    //         password: config.password,
    //         database: config.database,
    //         port: config.port
    //     })
    //     conn.connect((error) => {
    //         if (error)
    //             console.log(`getConnection 에러 발생: ${error}`);
    //     })
    //     return conn;
    // },
    mainPageGetLists: function (offset, callback) {
        // let conn = this.getConnection()
        connectionPool.getConnection((err, conn) => {
            if (err) throw errorl
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
            conn.query(sql, offset, (error, rows, fields) => {
                conn.release();
                if (error)
                    console.log(`mainPageGetLists2 에러 발생: ${error}`);
                callback(rows);
            })

        })
        /* 내가 이름 지어주는 걸 완료했으면 */
        /* order by 할 때는 내가 지어준 이름으로! */
        /* ORDER BY bbs_bid DESC LIMIT 30 */

    },
    getTotalNumContent: function (callback) {
        // let conn = this.getConnection()
        connectionPool.getConnection((err, conn) => {
            if (err) throw error
            let sql = `
            SELECT COUNT(*) AS bbs_count FROM bbs 
            where isDeleted=0
            `
            conn.query(sql, (error, result, fields) => {
                conn.release();
                if (error)
                    console.log(`getTotalNumContent 에러 발생: ${error}`);
                callback(result[0]);
            })
        })


    },

    loginUserInfo: function (uid, callback) {
        // let conn = this.getConnection()
        connectionPool.getConnection((err, conn) => {
            let sql = `select uid,
                        pwd, 
                        uname
                        from users where uid like ?`
            conn.query(sql, uid, (error, results, fields) => {
                conn.release()
                if (error)
                    console.log(`getUserInfo 에러 발생: ${error}`);
                callback(results[0]);
            })
        })
    }
}