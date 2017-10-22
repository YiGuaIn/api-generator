var fs = require('fs');
var path = require('path');
var filePath = path.resolve('.', 'public', 'docs');
var apiPath = filePath + '/api.json';
var buf = Buffer.alloc(1024);

var Client = require('mongodb').MongoClient;
var service = 'mongodb://localhost:27017/admin';

Client.connect(service, (err, db) => {
    console.log('连接成功...');
});

fs.open(apiPath, 'a+', (err, fd) => {
    if (err) {
        return console.error(err);
    }
    readFile(apiPath);  
});

function readFile(file, encode = 'utf8'){
    var readBuf = fs.createReadStream(file, 'UTF8');
    var data = '';
    readBuf.on('data', function(chunk){
        data += chunk;
        console.log(data);
    });
    readBuf.on('end', function(){
        writeData(file, data, {"name":"yiguanyu", "sex": "man"});
    })
}

function writeData(file, oldData, newData = {"title":"lihai"}, type=3, encode = 'utf8'){
    oldData = JSON.parse(oldData);   
    if(oldData !== ''){
        switch(type){
            case 1:
                for(let item of oldData.api){
                    if(item.title === newData.title){
                        return;
                    }
                }
                oldData.api.push(newData);
                break;
            case 2:
                oldData.api.map((item, index) => {
                    if(item.title === newData.title){
                        oldData.api[index] = newData;
                    } 
                })
                break;
            case 3:
                oldData.api.map((item,index) => {
                    if(item.title === newData.title){    
                        oldData.api.splice(index, 1);
                    } 
                })
                break;
            default: 
                return;
        } 
        
    }else{
        oldData = {"api":[]};
    }
    var writeBuf = fs.createWriteStream(file);
    writeBuf.write(JSON.stringify(oldData), encode);
    writeBuf.end();
    writeBuf.on('finish', function(){
        console.log('write ok...');
    })
}

function readByte(fd, buf, start, end){
    fs.read(fd, buf, start, end, 0, function (err, bytes) {
        if (err) {
            console.log(err);
        }
        console.log(bytes + "  字节被读取");

        // 仅输出读取的字节
        if (bytes > 0) {
            js = buf.slice(0, bytes).toString();
            console.log(JSON.parse(js).title);
        }
        
        fs.close(fd, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("文件关闭成功");
        })
    });
}