const mysql = require('mysql2/promise');

const fs = require('fs');
const { connect } = require('http2');
let info = fs.readFileSync('../mysql.json', 'utf8');
let config = JSON.parse(info);
const connectionPool = mysql.createPool(config);


module.exports = {
    CreateTableUsers: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            CREATE TABLE if NOT EXISTS users (
                uid VARCHAR(20) NOT NULL PRIMARY KEY,
                pwd CHAR(100) NOT NULL,
                uname VARCHAR(20) NOT NULL unique key,
                tel VARCHAR(20),
                email VARCHAR(20),
                regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
                isDeleted INT DEFAULT 0
            );`
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`CreateTableUsers 에러 발생: ${error}`);
            return false
        }
    },
    insertTableUsers: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            INSERT INTO users (uid, pwd, uname, tel, email)
        VALUES ('admin',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'관리자','010-1100-0101','beegramin9@gmail.com'),
        ('Isa',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'이사','010-1234-0101','Isa274@gmail.com'),
        ('Martin',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'마틴','010-1100-1234','Martin677@gmail.com'),
        ('Paul',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'폴','010-5678-0101','Paul753@gmail.com'),
        ('James',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'제임스','010-1100-5678','James263@gmail.com'),
        ('Ed',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'에드','010-1100-5678','Ed456@gmail.com'),
        ('Shaun',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'션','010-5678-0912','Shaun123@gmail.com'),
        ('Chidi',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'치디','010-0762-0912','Chidi123@gmail.com'),
        ('Gnarl',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'날','010-4568-1357','Gnarl@gmail.com'),
        ('Kristen',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'크리스틴','010-1873-4835','Kristen@gmail.com'),
        ('Annie',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'애니','010-7354-0912','Annie@gmail.com'),
        ('Mickey',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'미키','010-7312-7856','Mickey@gmail.com'),
        ('Britta',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'브리타','010-8731-7217','Britta@gmail.com'),
        ('Josica',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'조시카','010-7865-0912','Josica@gmail.com'),
        ('Martina',"A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='",'마티나','010-0912-1234','Martina@gmail.com')
            `
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`insertTableUsers 에러 발생: ${error}`);
            return false
        }
    },
    CreateTableBBS: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            
            CREATE TABLE bbs (
                bid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                uid VARCHAR(20) not null,
                title VARCHAR(100) NOT NULL,
                content VARCHAR(1000),
                modTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                viewCount INT DEFAULT 0,
                isDeleted INT DEFAULT 0,
                replyCount int default 0,
                foreign key(uid) REFERENCES users(uid)
            ) AUTO_INCREMENT=1001 
            `
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`insertTableUsers 에러 발생: ${error}`);
            return false
        }
    },
    insertTableBBS: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            INSERT INTO bbs (uid, title, content)
            values ('admin','관리자입니다','관리자는 관리관리'),
            ('Isa','한국 빨리 와라','너 덕분에 정말 열심히 산다'),
            ('Martin','내가 성공해서 네덜란드 갈게!','한 3년만 기다려봐... 다시 만날 수 있을거야'),
            ('Paul','내가 유럽에서 몇 명의 폴을 만났을까','또 몇 명을 기억 못할까 ㅋㅋ'),
            ('James','형은 31살처럼 살지 않아','나보다 생각이 더 없는 거 같아'),
            ('Ed','He was my best mate growing up!','Mate! What the fuck!'),
            ('Shaun','Oh, you will find Tahani certified very soon','Did that sound diabolical? Sorry, did not mean it. Old habits die hard.'),
            ('Chidi','Okay, but what the hell is this?','I am done'),
            ('Gnarl','한국 빨리 와라','너 덕분에 정말 열심히 산다'),
            ('Kristen','내가 성공해서 네덜란드 갈게!','한 3년만 기다려봐... 다시 만날 수 있을거야'),
            ('Annie','내가 유럽에서 몇 명의 폴을 만났을까','또 몇 명을 기억 못할까 ㅋㅋ'),
            ('Mickey','형은 31살처럼 살지 않아','나보다 생각이 더 없는 거 같아'),
            ('Britta','He was my best mate growing up!','Mate! What the fuck!'),
            ('Josica','Oh, you will find Tahani certified very soon','Did that sound diabolical? Sorry, did not mean it. Old habits die hard.'),
            ('Martina','Oh, you will find Tahani certified very soon','Did that sound diabolical? Sorry, did not mean it. Old habits die hard.')
            `
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`insertTableUsers 에러 발생: ${error}`);
            return false
        }
    },
    CreateTableReply: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            CREATE TABLE reply (
                rid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                bid INT NOT NULL,
                uid VARCHAR(20) NOT NULL,
                content VARCHAR(100),
                regTime DATETIME DEFAULT CURRENT_TIMESTAMP,
                isMine INT DEFAULT 0,
                NumComments int default 0 not null,
                FOREIGN KEY(bid) REFERENCES bbs(bid),
                FOREIGN KEY(uid) REFERENCES users(uid)
            );`
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`insertTableUsers 에러 발생: ${error}`);
            return false
        }
    },
    insertTableReply: async function () {
        try {
            let conn = await connectionPool.getConnection(async conn => conn)
            let sql = `
            INSERT INTO reply (bid, uid, content)
            values (1001, 'admin','관리자는 관리관리'),
            (1002 ,'Isa','한국 빨리 와라'),
            (1003 ,'Martin','내가 성공해서 네덜란드 갈게!'),
            (1004 ,'Paul','내가 유럽에서 몇 명의 폴을 만났을까'),
            (1005 ,'James','형은 31살처럼 살지 않아'),
            (1006 ,'Ed','He was my best mate growing up!'),
            (1007 ,'Shaun','Oh, you will find Tahani certified very soon'),
            (1008 ,'Chidi','Okay, but what the hell is this?'),
            (1009 ,'Gnarl','한국 빨리 와라'),
            (1010 ,'Kristen','한 3년만 기다려봐... 다시 만날 수 있을거야'),
            (1011 ,'Annie','또 몇 명을 기억 못할까 ㅋㅋ'),
            (1012 ,'Mickey','나보다 생각이 더 없는 거 같아'),
            (1013 ,'Britta','Mate! What the fuck!'),
            (1014 ,'Josica','Did that sound diabolical? Sorry, did not mean it. Old habits die hard.'),
            (1015 ,'Martina','Oh, you will find Tahani certified very soon')
            `
            let [rows] = await conn.query(sql)
            conn.release();
            return;
        } catch (error) {
            console.log(`insertTableUsers 에러 발생: ${error}`);
            return false
        }
    }
}