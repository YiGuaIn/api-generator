let mongoose = global.db;
let Schema = mongoose.Schema;

let apiCategory = new Schema({
    name: String,
    date: {type: Date, default: Date.now }
});

let apis = new Schema({
    pid: {type: Schema.Types.ObjectId, ref: 'category'},
    name: String,
    desc: String,
    url: String,
    method: String,
    req: [{
        field: String,
        fieldname: String,
        datatype: String,
        remark: String
    }],
    res: [{
        field: String,
        fieldname: String,
        datatype: String,
        remark: String
    }],
    date: {type: Date, default: Date.now }
});

apis.statics.addApi = function(obj, cb){
    return this.find({name: obj.name}, function(err, data){
        if(data && data.length > 0){
            return cb(err, {statuCode: 506, msg: '记录已存在...'})
        }
        return this.create(obj, cb);
    }.bind(this));
}
apis.statics.delApi = function(obj, cb){
    console.log(54545);
    return this.findOneAndRemove({_id: mongoose.Types.ObjectId(obj.id)}, cb);
}
apis.statics.updateApi = function(obj, cb){
    return this.findOneAndUpdate({_id: mongoose.Types.ObjectId(obj.id)}, {name: obj.name}, function(err, data){
        if(data){
            return cb(err, {statuCode: 200, msg: 'success'});
        }
        return cb(err, {statuCode: 505, msg: '找不到记录或更新失败...'});
    })
}
apis.static.queryApi = function(obj, cb){
    return this.findOne({name: obj.name}, function(err, data){
        if(data){
            return cb(err, {statuCode: 200, msg: 'success', data: data});
        }
        return cb(err, {statuCode: 505, msg: '找不到记录...'});
    })
}
apis.statics.apiList = function(obj, cb){
    return this.find({pid: mongoose.Types.ObjectId(obj.pid)}, cb);
}

apiCategory.statics.addApi = function(obj, cb){
    return this.find(obj, function(err, data){
        if(data && data.length > 0){
            return cb(err, {statuCode: 506, msg: '记录已存在...'})
        }
        return this.create(obj, cb);
    }.bind(this));
}

apiCategory.statics.deleteApi = function(obj, cb){
    return this.findOneAndRemove({name: obj.name}, function(err, data){
        if(data){
            return cb(err, {statuCode: 200, msg: 'success'});
        }
        return cb(err, {statuCode: 505, msg: '找不到记录或删除失败...'});
    });
}

apiCategory.statics.updateApi = function(obj, cb){
    return this.findOneAndUpdate({_id: mongoose.Types.ObjectId(obj._id)}, {name: obj.name}, function(err, data){
        if(data){
            return cb(err, {statuCode: 200, msg: 'success'});
        }
        return cb(err, {statuCode: 505, msg: '找不到记录或更新失败...'});
    })
}

apiCategory.statics.queryApi = function(obj, cb){
    return this.findOne({name: obj.name}, function(err, data){
        if(data){
            return cb(err, {statuCode: 200, msg: 'success', data: data});
        }
        return cb(err, {statuCode: 505, msg: '找不到记录...'});
    })
}

apiCategory.statics.apiList = function(obj, cb){
    return this.find({}, cb);
}


let Category = mongoose.model('category', apiCategory);
let Apis = mongoose.model('Apis', apis);
exports.Category = Category;
exports.Apis = Apis;