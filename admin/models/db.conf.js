let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apis', { useMongoClient: true });

let db = mongoose.connection;
db.on('error', function(err){
    console.log(err);
})
db.on('open', function(data){
    console.log('已连接数据库...');
})

module.exports = mongoose;