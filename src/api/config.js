import React, {Component} from 'react';
import * as Api from '../utils/api.conf';

class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.reqData = [];
        this.resData = [];
        this.state = {
            iscgAdd: false,
            iscdUpd: false,
            iscgEdit: false,
            isApiAdd: false,
            isApiEdit: false,
            isEdit: false,
            categoryItem: {_id: '', name: ''},
            categorys: [],
            apis: [],
            updateBtn: false,
            deleteApi: false,
            updateApi: false,
            requestParam:[],
            responseParam: [],
            reqobj: {
                field: '',
                fieldname: '',
                datatype: '',
                remark: ''
            },
            resobj: {
                field: '',
                fieldname: '',
                datatype: '',
                remark: ''
            },
            apiData: {
                pid: '',
                name: '',
                desc: '',
                url: '',
                method: '',
                req:[],
                res: []
            }
        }
        this.setDefault = this.setDefault.bind(this);
        this.goMain = this.goMain.bind(this);
        this.addReqParam = this.addReqParam.bind(this);
        this.delReqParam = this.delReqParam.bind(this);
        this.reqField = this.reqField.bind(this);
        this.reqDesc = this.reqDesc.bind(this);
        this.reqType = this.reqType.bind(this);
        this.reqRemark = this.reqRemark.bind(this);
        this.addResParam = this.addResParam.bind(this);
        this.delResParam = this.delResParam.bind(this);
        this.title = this.title.bind(this);
        this.descript = this.descript.bind(this);
        this.address = this.address.bind(this);
        this.method = this.method.bind(this);
        this.resField = this.resField.bind(this);
        this.resDesc = this.resDesc.bind(this);
        this.resType = this.resType.bind(this);
        this.resRemark = this.resRemark.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.setCategoryName = this.setCategoryName.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteApi = this.deleteApi.bind(this);
        this.updateApi = this.updateApi.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.addApi = this.addApi.bind(this);
        this.getApis = this.getApis.bind(this);
        this.delApi = this.delApi.bind(this);
        this.setUpdateApi = this.setUpdateApi.bind(this);
        this.updApi = this.updApi.bind(this);
        this.cancelUpd = this.cancelUpd.bind(this);
        this.editAddapi = this.editAddapi.bind(this);
        this.editAddcg = this.editAddcg.bind(this);
    }
    setDefault(){
        let def = {
            pid: this.state.apiData.pid,
            name: '',
            desc: '',
            url: '',
            method: '',
            req:[],
            res: []
        }
        let reqobj = {
            field: '',
            fieldname: '',
            datatype: '',
            remark: ''
        }
        let resobj = {
            field: '',
            fieldname: '',
            datatype: '',
            remark: ''
        }
        let categoryItem = Object.assign({}, this.state.categoryItem)
        categoryItem.name = '';
        this.setState({apiData: def, reqobj: reqobj, resobj: resobj, categoryItem: categoryItem});
    }
    componentWillMount(){
        this.getCategory();
    }
    getCategory(){
        let that = this;
        fetch(Api.CategoryByList, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.length <= 0)
            {
                return;
            }
            that.setState({categorys: data});
            let apiData = that.state.apiData;
            apiData.pid = data[0]._id;
            that.getApis();
        });
    }
    getApis(){
        let val = this.state.apiData.pid;
        let that = this;
        fetch(Api.ApiByList, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pid: val})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.code !== 200 || data.data.length < 0)
            {
                console.log(data.code);
                return;
            }
            that.setState({apis: data.data});
        });
    }
    editAddcg(e){
        e.preventDefault();
        this.setState({iscgAdd: true, iscgUpd: false, iscgEdit: true});
    }
    addCategory(){
        this.setState({iscgAdd: false, iscgUpd: false, iscgEdit: false});
        let name = this.state.categoryItem.name;
        if(typeof(name) === 'undefined' || name === ''){
            alert('输入有误...');
            this.refs.papiName.focus();
            return;
        }
        let that = this;
        fetch(Api.CategoryByAdd, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(typeof(data) === 'undefined'){
                return;
            }
            alert(data.msg);
            that.setState({categoryItem: {_id: that.state.categoryItem._id,name: ''}});
            that.getCategory();
        });
    }
    deleteApi(item){
        if(typeof(item) === 'undefined'){
            return;
        }
        let del = window.confirm(`你确定要删除${item.name}吗?`);
        if(!del){
            return;
        }
        let that = this;
        fetch(Api.CategoryByDelete, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: item._id, name: item.name})
        }).then(function(response){
            return response.json();
        }).then(function(data){;
            that.setState({deleteApi: false});
            that.getCategory();
        });
    }
    updateApi(item) {
        this.setState({iscgAdd: false, iscgUpd: true, iscgEdit: true});
        let cur = {_id: item._id, name: item.name};
        this.setState({categoryItem: cur});
    }
    confirmUpdate(){
        this.setState({iscgAdd: false, iscgUpd: false, iscgEdit: false});
        let that = this;
        fetch(Api.CategoryByUpdate, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id: that.state.categoryItem._id, name: that.state.categoryItem.name})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(typeof(data.data) === 'undefined'){
                return;
            }
            alert(data.data.msg);
            that.setState({categoryItem: {_id: that.state.categoryItem._id,name: ''}});
            that.getCategory();
        });
    }
    goMain(){
        this.props.history.push('/api');
    }
    setCategoryName(e){
        var val = e.target.value;
        this.setState({categoryItem: {_id: this.state.categoryItem._id,name: val}});
    }
    title(e){
        let apid = this.state.apiData;
        apid.name = e.target.value;
        this.setState({ apiData: apid});
    }
    descript(e){
        let apid = this.state.apiData;
        apid.desc = e.target.value;
        this.setState({ apiData: apid});
    }
    address(e){
        let apid = this.state.apiData;
        apid.url = e.target.value;
        this.setState({ apiData: apid});
    }
    method(e){
        let apid = this.state.apiData;
        apid.method = e.target.value;
        this.setState({ apiData: apid});
    }
    addReqParam(e){
        e.preventDefault();
        let list = this.state.apiData.req;
        for(let i = 0; i < list.length; i++){
            if(list[i].item.field === this.state.reqobj.field){
                alert('该字段已存在...');
                return;
            }
        }
        var item = this.state.reqobj;
        list.push({elements:
            <tr key={list.length}>
                <td>{item.field}</td>
                <td>{item.fieldname}</td>
                <td>{item.datatype}</td>
                <td>{item.remark}</td>
                <td><span onClick={this.delReqParam.bind(this, item.id)}>删除</span></td>
            </tr>
        , item: Object.assign({}, item)});
        let oList = this.state.apiData
        oList.req = list;
        this.setState({apiData: oList})
    }
    delReqParam(index){
        let list = this.state.apiData.req;
        if(list.length === 1){
            list.splice(0, 1);
        }else{
            list.splice(index, 1);
        }
        let oList = this.state.apiData
        oList.req = list;
        this.setState({apiData: oList})
    }
    reqField(e){
        let oreq = this.state.reqobj;
        oreq.field = e.target.value;
        this.setState({ reqobj: oreq});
    }
    reqDesc(e){
        let oreq = this.state.reqobj;
        oreq.fieldname = e.target.value;
        this.setState({ reqobj: oreq});
    }
    reqType(e){
        let oreq = this.state.reqobj;
        oreq.datatype = e.target.value;
        this.setState({ reqobj: oreq});
    }
    reqRemark(e){
        var val = e.target.value;
        let oreq = this.state.reqobj;
        oreq.remark = val;
        this.setState({ reqobj: oreq});
    }
    addResParam(e){
        e.preventDefault();
        let list = this.state.apiData.res;
        for(let i = 0; i < list.length; i++){
            if(list[i].item.field === this.state.resobj.field){
                alert('该字段已存在...');
                return;
            }
        }
        var item = this.state.resobj;
        list.push({elements:
            <tr key={list.length}>
                <td>{item.field}</td>
                <td>{item.fieldname}</td>
                <td>{item.datatype}</td>
                <td>{item.remark}</td>
                <td><span onClick={this.delResParam.bind(this, item.id)}>删除</span></td>
            </tr>
        , item: Object.assign({}, item)})
        let oList = this.state.apiData
        oList.res = list;
        this.setState({apiData: oList});
    }
    delResParam(index){
        let list = this.state.apiData.res;
        if(list.length === 1){
            list.splice(0, 1);
        }else{
            list.splice(index, 1);
        }
        let oList = this.state.apiData
        oList.res = list;
        this.setState({apiData: oList});
    }
    resField(e){
        let ores = this.state.resobj;
        ores.field = e.target.value;
        this.setState({ resobj: ores});
    }
    resDesc(e){
        let ores = this.state.resobj;
        ores.fieldname = e.target.value;
        this.setState({ resobj: ores});
    }
    resType(e){
        let ores = this.state.resobj;
        ores.datatype = e.target.value;
        this.setState({ resobj: ores});
    }
    resRemark(e){
        let ores = this.state.resobj;
        ores.remark = e.target.value;
        this.setState({ resobj: ores});
    }
    selectChange(e){
        let val= e.target.value;
        let apiData = this.state.apiData;
        apiData.pid = val;
        this.setState({apiData: apiData});
        this.getApis();
    }
    editAddapi(){
        this.setState({isApiAdd: true, isApiEdit: false, isEdit: true});
    }
    addApi(){
        let apiData = this.state.apiData;
        let res = [];
        let req = [];
        apiData.req.forEach(item => {
            req.push(item.item);
        })
        apiData.res.forEach(item => {
            res.push(item.item);
        })
        apiData.req = req;
        apiData.res = res
        let that = this;
        fetch(Api.ApiByAdd, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiData)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.code !== 200)
            {
                return;
            }
            apiData.req = [];
            apiData.res = [];
            that.setState({apiData: apiData});
            that.getApis();
        });
    }
    delApi(item){
        let that = this;
        let del = window.confirm(`你确定要删除${item.name}吗?`);
        if(!del){
            return;
        }
        fetch(Api.ApiByDelete, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: item._id})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.code !== 200)
            {
                return;
            }
            that.getApis();
        });
    }
    setUpdateApi(row){
        this.setState({isApiAdd: false, isApiEdit: true, isEdit: true});
        if(typeof(row) === 'undefined') return;
        let reqlist = [];
        let reslist = [];
        row.res.forEach((item, index) => {
            reslist.push({elements:
                <tr key={index}>
                    <td>{item.field}</td>
                    <td>{item.fieldname}</td>
                    <td>{item.datatype}</td>
                    <td>{item.remark}</td>
                    <td><span onClick={this.delResParam.bind(this, index)}>删除</span></td>
                </tr>
            , item: Object.assign({}, item)})
        })
        row.req.forEach((item, index) => {
            reqlist.push({elements:
                <tr key={index}>
                    <td>{item.field}</td>
                    <td>{item.fieldname}</td>
                    <td>{item.datatype}</td>
                    <td>{item.remark}</td>
                    <td><span onClick={this.delReqParam.bind(this, index)}>删除</span></td>
                </tr>
            , item: Object.assign({}, item)})
        })
        row.req = reqlist;
        row.res = reslist;
        this.setState({apiData: row});
    }
    updApi(e){
        e.preventDefault();
        let that = this;
        let apiData = Object.assign({}, that.state.apiData);
        apiData.req = [];
        apiData.res = [];
        that.state.apiData.req.map(item => apiData.req.push(item.item));
        that.state.apiData.res.map(item => apiData.res.push(item.item))
        fetch(Api.ApiByUpdate, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiData)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.code !== 200)
            {
                return;
            }
            that.setDefault();
            that.setState({isUpdate: false, isEdit: false});
            that.getApis();
        });
    }
    cancelUpd(e){
        e.preventDefault();
        this.setDefault();
        this.setState({isApiAdd: false, isApiEdit: false, isEdit: false, iscgAdd:false, iscgUpd:false, iscgEdit: false});
    }
    render(){
        return (
            <div className="api-body">
                <header className="api-header">
                    <h3>配置接口</h3>
                    <span onClick={this.goMain}>首页</span>
                </header>
                <div className="config-content">
                    <section className="detail-content">
                        <header className="config-title">
                            <h3>添加接口类型</h3>
                            <div className="config-btns">
                                <button onClick={this.editAddcg}>添加</button>
                            </div>
                        </header>
                        <div  className="categorys-body">
                            <div className="api-name">
                                <span>接口名称： </span>
                                <input className="input-name" ref="papiName" type="text" placeholder="输入接口名称" value={this.state.categoryItem.name} onChange={this.setCategoryName} disabled={this.state.iscgEdit ? false : true}/>
                                <button className="confirm" style={{display: this.state.iscgAdd ? 'block': 'none'}} onClick={this.addCategory}>保存接口</button>
                                <button className="confirm" style={{display: this.state.iscgUpd ? 'block': 'none'}} onClick={this.confirmUpdate}>确定修改</button>
                                <button className="confirm" style={{display: this.state.iscgAdd || this.state.iscgUpd ? 'block': 'none'}} onClick={this.cancelUpd}>取消编辑</button>
                            </div>
                            <table className="categorys-table" border="1">
                                <thead>
                                    <tr><th>接口名称</th><th>操作</th></tr>     
                                </thead>
                                <tbody>
                                    {
                                        this.state.categorys.map((item, index) =>(
                                            <tr key={index}>
                                                <td width="200">{item.name}</td>
                                                <td><span onClick={this.updateApi.bind(this, item)}>修改</span><span onClick={this.deleteApi.bind(this, item)}>删除</span></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className="detail-content">
                        <header className="config-title">
                            <h3>接口基本信息</h3>
                            <div className="config-btns">
                                <button onClick={this.editAddapi}>添加</button>
                            </div>
                        </header>
                        <div className="categorys-body">
                            <form>
                                <div className="config-item">
                                    <span>父接口名：</span>
                                    <select ref="papi" onChange={this.selectChange} disabled={this.state.isEdit ? false : true}>
                                        {
                                            this.state.categorys.map((item, index) =>(
                                                <option key={index} value={item._id} label={item.name}></option>
                                            ))
                                        }
                                    </select>
                                    <div className="config-btns" style={{display: this.state.isApiAdd || this.state.isApiEdit ? 'flex' : 'none'}}>
                                        <button onClick={this.addApi} style={{display: this.state.isApiAdd ? 'block' : 'none'}}>保存接口</button>
                                        <button onClick={this.updApi} style={{display: this.state.isApiEdit ? 'block' : 'none'}}>保存修改</button>
                                        <button onClick={this.cancelUpd}>取消修改</button>
                                    </div>
                                </div>
                                <div className="config-item">
                                    <span>接口名称：</span>
                                    <input value={this.state.apiData.name} onChange={this.title} disabled={this.state.isEdit ? false : true}/>
                                </div>
                                <div className="config-item">
                                    <span>接口描述：</span>
                                    <input value={this.state.apiData.desc} onChange={this.descript} disabled={this.state.isEdit ? false : true}/>
                                </div>
                                <div className="config-item">
                                    <span>请求地址：</span>
                                    <input value={this.state.apiData.url} onChange={this.address} disabled={this.state.isEdit ? false : true}/>
                                </div>
                                <div className="config-item">
                                    <span>请求方法：</span>
                                    <input value={this.state.apiData.method} onChange={this.method} disabled={this.state.isEdit ? false : true}/>
                                </div>
                                <div className="config-item">  
                                    <span>请求参数：</span>
                                    <input className="param-input" value={this.state.reqobj.field} onChange={this.reqField} placeholder="字段名" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.reqobj.fieldname} onChange={this.reqDesc} placeholder="描述" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.reqobj.datatype} onChange={this.reqType} placeholder="数据类型" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.reqobj.remark} onChange={this.reqRemark} placeholder="备注" disabled={this.state.isEdit ? false : true}/>
                                    <button className="add-icon" onClick={this.addReqParam} disabled={this.state.isEdit ? false : true}>增加</button>
                                </div>
                                <table className="config-table" border="1">
                                    <thead>
                                        <tr><th>字段</th><th>描述</th><th>数据类型</th><th>备注</th><th>操作</th></tr>     
                                    </thead>
                                    <tbody>
                                        { this.state.apiData.req.map(item => item.elements) }
                                    </tbody>
                                </table>
                                <div className="config-item">
                                    <span>请求参数：</span>
                                    <input className="param-input" value={this.state.resobj.field} onChange={this.resField} placeholder="字段名" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.resobj.fieldname} onChange={this.resDesc} placeholder="描述" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.resobj.datatype} onChange={this.resType} placeholder="数据类型" disabled={this.state.isEdit ? false : true}/>
                                    <input className="param-input" value={this.state.resobj.remark} onChange={this.resRemark} placeholder="备注" disabled={this.state.isEdit ? false : true}/>
                                    <button className="add-icon" onClick={this.addResParam} disabled={this.state.isEdit ? false : true}>增加</button>
                                </div>
                                <table className="config-table" border="1">
                                    <thead>
                                        <tr><th>字段</th><th>描述</th><th>数据类型</th><th>备注</th><th>操作</th></tr>     
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.apiData.res.map(item => item.elements)
                                        }
                                    </tbody>
                                </table>
                            </form>
                            <table className="categorys-table apis-table" border="1">
                                <thead>
                                    <tr><th>接口名称</th><th>操作</th></tr>     
                                </thead>
                                <tbody>
                                    {
                                        this.state.apis.map((item, index) =>(
                                            <tr key={index}>
                                                <td width="200">{item.name}</td>
                                                <td><span onClick={this.setUpdateApi.bind(this, item)}>修改</span><span onClick={this.delApi.bind(this, item)}>删除</span></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                <footer></footer>
            </div>  
        );
    }
}
export default ApiDetail;