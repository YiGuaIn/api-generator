import React, {Component} from 'react';
import * as Api from '../utils/api.conf';

class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.reqData = [];
        this.resData = [];
        this.state = {
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
        this.showDialog = this.showDialog.bind(this);
        this.setCategoryName = this.setCategoryName.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.deleteApi = this.deleteApi.bind(this);
        this.updateApi = this.updateApi.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.addApi = this.addApi.bind(this);
        this.getApis = this.getApis.bind(this);
        this.delApi = this.delApi.bind(this);
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
    showDialog(type){
        switch(type){
            case 11:
                this.setState({updateApi: false, updateBtn: false});
                this.setState({deleteApi: !this.state.deleteApi});
                break;
            case 12:
                this.setState({deleteApi: false});
                this.setState({updateApi: !this.state.updateApi, updateBtn: !this.state.updateBtn});
                break;
            case 21:
                break;
            case 22:
                break;
            default:
                break;
        }
    }
    addCategory(){
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
        }).then(function(data){
            console.log(data);
            that.setState({deleteApi: false});
            that.getCategory();
        });
    }
    updateApi(item) {
        this.setState({updateApi: false});
        let cur = {_id: item._id, name: item.name};
        this.setState({categoryItem: cur});
    }
    confirmUpdate(){
        this.setState({updateBtn: false});
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
            that.setState({deleteApi: false})
            that.setState({updateeApi: false})
            if(typeof(data.data) === 'undefined'){
                return;
            }
            that.setState({categoryItem: {_id: that.state.categoryItem._id,name: ''}});
            alert(data.data.msg);
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
    addReqParam(){
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
    addResParam(){
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
        console.log(apiData);
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
    delApi(id){
        let that = this;
        fetch(Api.ApiByDelete, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
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
                                <div>
                                    <button onClick={this.addCategory}>添加</button>
                                </div> 
                                <div>
                                    <button onClick={this.showDialog.bind(this, 12)}>修改</button>
                                    <ul style={{display: this.state.updateApi ? 'block': 'none'}}>
                                        {
                                            this.state.categorys.map((item, index) => {
                                                return <li key={index} onClick={this.updateApi.bind(this, item)}>{item.name}</li>
                                            })
                                        }
                                    </ul>
                                </div> 
                                <div>
                                    <button onClick={this.showDialog.bind(this, 11)}>删除</button>
                                    <ul style={{display: this.state.deleteApi ? 'block': 'none'}}>
                                        {
                                            this.state.categorys.map((item, index) => {
                                                return <li key={index} onClick={this.deleteApi.bind(this, item)}>{item.name}</li>
                                            })
                                        }
                                    </ul>
                                </div> 
                            </div>
                        </header>
                        <div  className="categorys-body">
                            <div className="api-name">
                                <span>接口名称： </span>
                                <input className="input-name" ref="papiName" type="text" placeholder="输入接口名称" value={this.state.categoryItem.name} onChange={this.setCategoryName}/>
                                <button className="confirm" style={{display: this.state.updateBtn ? 'block': 'none'}} onClick={this.confirmUpdate}>确定修改</button>
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
                                                <td><span onClick={this.delResParam}>修改</span><span onClick={this.delResParam}>删除</span></td>
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
                                <button onClick={this.addApi}>添加</button>
                            </div>
                        </header>
                        <div className="categorys-body">
                            <form>
                                <div className="config-item">
                                    <span>父接口名：</span>
                                    <select ref="papi" onChange={this.selectChange}>
                                        {
                                            this.state.categorys.map((item, index) =>(
                                                <option key={index} value={item._id} label={item.name}></option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="config-item">
                                    <span>接口名称：</span>
                                    <input value={this.state.apiData.name} onChange={this.title}/>
                                </div>
                                <div className="config-item">
                                    <span>接口描述：</span>
                                    <input value={this.state.apiData.desc} onChange={this.descript}/>
                                </div>
                                <div className="config-item">
                                    <span>请求地址：</span>
                                    <input value={this.state.apiData.url} onChange={this.address}/>
                                </div>
                                <div className="config-item">
                                    <span>请求方法：</span>
                                    <input value={this.state.apiData.method} onChange={this.method}/>
                                </div>
                                <div className="config-item">  
                                    <span>请求参数：</span>
                                    <input className="param-input" value={this.state.reqobj.field} onChange={this.reqField} placeholder="字段名"/>
                                    <input className="param-input" value={this.state.reqobj.fieldname} onChange={this.reqDesc} placeholder="描述"/>
                                    <input className="param-input" value={this.state.reqobj.datatype} onChange={this.reqType} placeholder="数据类型"/>
                                    <input className="param-input" value={this.state.reqobj.remark} onChange={this.reqRemark} placeholder="备注"/>
                                    <span className="add-icon" onClick={this.addReqParam}>增加</span>
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
                                    <input className="param-input" value={this.state.resobj.field} onChange={this.resField} placeholder="字段名"/>
                                    <input className="param-input" value={this.state.resobj.fieldname} onChange={this.resDesc} placeholder="描述"/>
                                    <input className="param-input" value={this.state.resobj.datatype} onChange={this.resType} placeholder="数据类型"/>
                                    <input className="param-input" value={this.state.resobj.remark} onChange={this.resRemark} placeholder="备注"/>
                                    <span className="add-icon" onClick={this.addResParam}>增加</span>
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
                                                <td><span onClick={this.delResParam}>修改</span><span onClick={this.delApi.bind(this, item._id)}>删除</span></td>
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