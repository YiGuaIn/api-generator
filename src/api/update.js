import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import routes from '../route/config';

class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.reqData = [];
        this.resData = [];
        this.state = {
            requestParam:[],
            responseParam: [],
            reqField: '',
            reqDesc: '',
            reqType: '',
            reqRemark: '',
            resField: '',
            resDesc: '',
            resType: '',
            resRemark: '',
            apiData: {
                title: '',
                descript: '',
                address: '',
                method: '',
                requestParam:[],
                responseParam: []
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
        this.resField = this.resField.bind(this);
        this.resDesc = this.resDesc.bind(this);
        this.resType = this.resType.bind(this);
        this.resRemark = this.resRemark.bind(this);
    }
    componentWillMount(){
    }
    goMain(){
        this.props.history.push('/api');
    }
    addReqParam(){
        let list = this.state.requestParam;
        for(let i = 0; i < list.length; i++){
            if(list[i].field === this.state.reqField){
                alert('该字段已存在...');
                return;
            }
        }
        var item = {
            id: list.length,
            field: this.state.reqField,
            desc: this.state.reqDesc,
            type: this.state.reqType,
            remark: this.state.reqRemark
        }
        list.push({elements:
            <tr key={list.length}>
                <td>{item.field}</td>
                <td>{item.desc}</td>
                <td>{item.type}</td>
                <td>{item.remark}</td>
                <td><span onClick={this.delReqParam.bind(this, item.id)}>删除</span></td>
            </tr>
        , field: item.field})
        this.setState({requestParam: list})
    }
    delReqParam(index){
        let list = this.state.requestParam;
        if(list.length === 1){
            list.splice(0, 1);
        }else{
            list.splice(index, 1);
        }
        this.setState({requestParam: list});
    }
    reqField(e){
        var val = e.target.value;
        this.setState({ reqField: val })
    }
    reqDesc(e){
        var val = e.target.value;
        this.setState({ reqDesc: val })
    }
    reqType(e){
        var val = e.target.value;
        this.setState({ reqType: val })
    }
    reqRemark(e){
        var val = e.target.value;
        this.setState({ reqRemark: val })
    }
    addResParam(){
        let list = this.state.responseParam;
        for(let i = 0; i < list.length; i++){
            if(list[i].field === this.state.resField){
                alert('该字段已存在...');
                return;
            }
        }
        var item = {
            id: list.length,
            field: this.state.resField,
            desc: this.state.resDesc,
            type: this.state.resType,
            remark: this.state.resRemark
        }
        list.push({elements:
            <tr key={list.length}>
                <td>{item.field}</td>
                <td>{item.desc}</td>
                <td>{item.type}</td>
                <td>{item.remark}</td>
                <td><span onClick={this.delResParam.bind(this, item.id)}>删除</span></td>
            </tr>
        , field: item.field})
        this.setState({responseParam: list})
    }
    delResParam(index){
        let list = this.state.responseParam;
        if(list.length === 1){
            list.splice(0, 1);
        }else{
            list.splice(index, 1);
        }
        this.setState({responseParam: list});
    }
    resField(e){
        var val = e.target.value;
        this.setState({ resField: val })
    }
    resDesc(e){
        var val = e.target.value;
        this.setState({ resDesc: val })
    }
    resType(e){
        var val = e.target.value;
        this.setState({ resType: val })
    }
    resRemark(e){
        var val = e.target.value;
        this.setState({ resRemark: val })
    }
    render(){
        return (
            <div className="api-body">
                <div className="api-content">
                    <section className="detail-content">
                        <header className="config-title">
                            <h3>接口基本信息</h3>
                            <div className="config-btns">
                                <button>添加</button>
                                <button>删除</button>
                                <button>修改</button>
                            </div>
                        </header>
                        <form>
                            <div className="config-item">
                                <span>接口名称：</span>
                                <input />
                            </div>
                            <div className="config-item">
                                <span>接口描述：</span>
                                <input />
                            </div>
                            <div className="config-item">
                                <span>请求地址：</span>
                                <input />
                            </div>
                            <div className="config-item">
                                <span>请求方法：</span>
                                <input />
                            </div>
                            <div className="config-item">  
                                <span>请求参数：</span>
                                <input className="param-input" value={this.state.reqField} onChange={this.reqField} placeholder="字段名"/>
                                <input className="param-input" value={this.state.reqDesc} onChange={this.reqDesc} placeholder="描述"/>
                                <input className="param-input" value={this.state.reqType} onChange={this.reqType} placeholder="数据类型"/>
                                <input className="param-input" value={this.state.reqRemark} onChange={this.reqRemark} placeholder="备注"/>
                                <span className="add-icon" onClick={this.addReqParam}>增加</span>
                            </div>
                            <table className="config-table" border="1">
                                <thead>
                                    <tr><th>字段</th><th>描述</th><th>数据类型</th><th>备注</th><th>操作</th></tr>     
                                </thead>
                                <tbody>
                                    {
                                       this.state.requestParam.map(item => item.elements)
                                    }
                                </tbody>
                            </table>
                            <div className="config-item">
                                <span>请求参数：</span>
                                <input className="param-input" value={this.state.resField} onChange={this.resField} placeholder="字段名"/>
                                <input className="param-input" value={this.state.resDesc} onChange={this.resDesc} placeholder="描述"/>
                                <input className="param-input" value={this.state.resType} onChange={this.resType} placeholder="数据类型"/>
                                <input className="param-input" value={this.state.resRemark} onChange={this.resRemark} placeholder="备注"/>
                                <span className="add-icon" onClick={this.addResParam}>增加</span>
                            </div>
                            <table className="config-table" border="1">
                            <thead>
                                <tr><th>字段</th><th>描述</th><th>数据类型</th><th>备注</th><th>操作</th></tr>     
                            </thead>
                            <tbody>
                                {
                                    this.state.responseParam.map(item => item.elements)
                                }
                            </tbody>
                        </table>
                        </form>
                    </section>
                </div>
                <footer></footer>
            </div>  
        );
    }
}
export default ApiDetail;