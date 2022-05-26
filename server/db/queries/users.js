import { Query } from "../";




// const find = (email) => Query('SELECT * FROM users WHERE email = ?', [email]) //finding someone's email in our database//select statements always return arrray of objects

const find = (column, value) =>Query('SELECT * FROM users WHERE ?? = ?', [column, value])

const insert = (email, password) => Query('INSERT INTO users (email, password) VALUE (?, ?)', [email, password]); 
//^this is good for a few insertions but what if there were 30?
// const insert = (newUser: {email, password}) =>('INSERT INTO users SET ?', newUser)
//^this statement will cause the below entry to...
// {
//     "email": "register@test.com",
//     "password": "$2b$12$XRyRk5Cm5ZDTxVo60r.VJOxqCZ3PbIraa0tdfO7GRCAnBY9tJ/7ju"
//be processed like this..
//INSERT INTO users SET email = "register@test.com", password = "$2b$12$XRyRk5Cm5ZDTxVo60r.VJOxqCZ3PbIraa0tdfO7GRCAnBY9tJ/7ju"
// }




export default {
    find,
    insert
}
