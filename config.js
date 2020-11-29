const dt = require('dotenv').config();
let db_name = "MeteoDB";

if(dt.error) throw dt.error;

module.exports = {
    link: 'mongodb+srv://' + process.env.DB_USER + ':'
    + process.env.DB_PASS + process.env.DB_ADDR + db_name + '?retryWrites=true&w=majority',
    name: db_name,
    addr: process.env.DB_ADDRESS
};