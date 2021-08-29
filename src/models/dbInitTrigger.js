const tr = require('./dbInit')

// 망할 비동기 ㅜㅜ
// mysql2 쓰려면 이것도 프로미스로 만들어줘야 함
// tr.getConnection(
//     tr.CreateTableUsers(() => {
//         tr.insertTableUsers(() => { });
//     })
// );

// tr.getConnection(
//     tr.CreateTableBBS(() => {
//         tr.insertTableBBS(() => { });
//     })
// )

// tr.getConnection(
//     tr.CreateTableReply(() => {
//         tr.insertTableReply(() => { });
//     })
// )

// Promise.all([
//     tr.CreateTableUsers(),
//     tr.insertTableUsers(),
//     tr.CreateTableBBS(),
//     tr.insertTableBBS(),
//     tr.CreateTableReply(),
//     tr.insertTableReply(),
// ]).then(() => { console.log('DB successfully initialized'); })

tr.CreateTableUsers()
    .then(() => { tr.insertTableUsers() })
    .then(console.log('Users successfully initialized'))
tr.CreateTableBBS()
    .then(() => { tr.insertTableBBS() })
    .then(console.log('BBS successfully initialized'))
tr.CreateTableReply()
    .then(() => { tr.insertTableReply() })
    .then(console.log('Reply successfully initialized'))