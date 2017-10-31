let Category = require('../models/common.model').Category;
let Apis = require('../models/common.model').Apis;

exports.addCategory = function(req, res, next){
    if(req.body.name == null || req.body.name === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Category.addApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, msg: '新增失败...'}
            }else{
                res.status = 506;
                resData = {code: 506, data: data, msg: '添加成功...'}
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.delCategory = function(req, res, next){
    if(req.body.name == null || req.body.name === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Category.deleteApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '删除失败...'}
            }else{
                res.status = 506;
                resData = {code: 506, data: data}
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.updateCategory = function(req, res, next){
    console.log(req.body);
    if(req.body._id == null || req.body._id === 'undefined' || req.body.name == "" || req.body.name === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Category.updateApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '更新失败...'}
            }else{
                res.status = 506;
                resData = {code: 506, data: data}
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.queryCategory = function(req, res, next){
    if(req.body.pid == "" || req.body.pid === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Category.queryApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '找不到数据...'}
            }else{
                res.status = 200;
                resData = data
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.categoryList = function(req, res, next){
    Category.apiList(req.body, function(err, data){
        if(err){
            res.status = 505;
            resData = {code: 505, errmsg: '更新失败...'}
        }else{
            res.status = 506;
            resData = data
        }
        res.send(resData);
        res.end();
    });
}

exports.addApi = function(req, res, next){
    if(req.body == null || req.body === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        Apis.addApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                data = {code: 505, errmsg: '新增失败...'}
            }else{
                res.status = 200;
                data = {code: 200, msg: 'sucess'}
            }
            res.send(data);
            res.end();
        });
    }
}

exports.delApi = function(req, res, next){
    if(req.body.id == null || req.body.id === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Apis.delApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '删除失败...'}
            }else{
                res.status = 200;
                resData = {code: 200, data: data}
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.updateApi = function(req, res, next){
    if(req.body.pid == null || req.body.pid === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Apis.updateApi(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '更新失败...'}
            }else{
                res.status = 200;
                resData = {code: 200, data: data}
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.queryApi = function(req, res, next){
    if(req.body.name == "" || req.body.name === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        let resData = null;
        Apis.queryApi(req.body, function(err, data){
            console.log(err);
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '更新失败...'}
            }else{
                res.status = 506;
                resData = {code:200, data: data};
            }
            res.send(resData);
            res.end();
        });
    }
}
exports.apiList = function(req, res, next){
    if(req.body.pid == "" || req.body.pid === 'undefined'){
        res.status = 405;
        res.send({code: 405, errmsg: '参数不能为空...'});
        res.end();
    }else{
        Apis.apiList(req.body, function(err, data){
            if(err){
                res.status = 505;
                resData = {code: 505, errmsg: '更新失败...'}
            }else{
                res.status = 506;
                resData = {code: 200, data: data};
            }
            res.send(resData);
            res.end();
        });
    }
}