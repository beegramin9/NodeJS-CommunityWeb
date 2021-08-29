const mysql = require('mysql2/promise');

const fs = require('fs');
const { callbackify } = require('util');
const { photo } = require('../view/00_template');
let info = fs.readFileSync('./mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);

module.exports = {
    getAllUsersForAdmin: async function (offset) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT uid, uname, tel, email, 
            DATE_FORMAT(regDate, '%y-%m-%d %T') as regDate
            FROM users
            WHERE isDeleted = 0
            ORDER BY regDate desc
            limit 10 OFFSET ?
            `
            let [rows] = await conn.query(sql, offset)
            conn.release()
            return rows
        } catch (error) {
            console.log(`getAllUsersForAdmin 에러 발생: ${error}`);
            return false
        }
    },
    getTotalNumUsers: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
                SELECT COUNT(*) AS users_count FROM users
                WHERE isDeleted = 0 
            `
            let [result] = await conn.query(sql)
            conn.release()
            return result[0]
        } catch (error) {
            console.log(`getTotalNumUsers 에러 발생: ${error}`);
            return false
        }
    },
    newUser: async function (params) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `insert into users (uid, pwd, uname, tel, email, photo)
            values (?,?,?,?,?,?)`
            let [result] = await conn.query(sql, params)
            conn.release()
            return;
        } catch (error) {
            console.log(`newUser 에러 발생: ${error}`);
            return false
        }
    },
    myPageInfo: async function (uname) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            SELECT uid, uname, tel, email ,photo
            FROM users
            WHERE uname = ?
            `
            let [result] = await conn.query(sql, uname)
            conn.release()
            return result[0]
        } catch (error) {
            console.log(`myPageInfo 에러 발생: ${error}`);
            return false
        }
    },
    updateMyInfo: async function (params, photo, uid) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql;
            if (photo) {
                sql = `update users set uname=?, tel=?, email = ?, photo=? where uid = ?`
                params.push(photo)
                params.push(uid)
                console.log('사진 새로 들어감', photo);
            } else {
                sql = `update users set uname=?, tel=?, email = ? where uid = ?`
                params.push(uid)
                console.log('사진 새로 안 들어감', photo);
            }
            let [rows] = await conn.query(sql, params)
            conn.release()
            return;
        } catch (error) {
            console.log(`updateMyInfo 에러 발생: ${error}`);
            return false
        }
    },

    updatePwdUser: async function (params) {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `update users set pwd = ? where uname = ?`
            let [rows] = await conn.query(sql, params)
            conn.release()
            return;
        } catch (error) {
            console.log(`updatePwdUser 에러 발생: ${error}`);
            return false
        }
    }
}