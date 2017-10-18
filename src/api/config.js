import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import routes from '../route/config';

class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [1,2,3,4,5],
            apiData: {
                title: '/add',
                descript: '这是一个添加用户接口',
                address: 'https://192.168.11.116:8000/fx/api/v1/add',
                method: 'POST',
                requestParam: [{
                    field: 'username',
                    desc: '必填',
                    type: 'string',
                    remark: '用户名'
                },{
                    field: 'password',
                    desc: '必填',
                    type: 'string',
                    remark: '密码'
                }]
                ,
                responeParam: [{
                    field: 'state',
                    type: 'int',
                    desc: '状态码'
                },{
                    field: 'data',
                    type: 'object',
                    desc: '返回的数据'
                }]
            }
        }
        this.goMain = this.goMain.bind(this);
    }
    goMain(){
        this.props.history.push('/api');
    }
    componentWillMount(){

    }
    render(){
        return (
            <div className="api-body">
                <header className="api-header">
                    <h3>配置接口</h3>
                    <span onClick={this.goMain}>首页</span>
                </header>
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
                                <ul>
                                    <li>
                                        <input className="param-input" placeholder="字段名"/>
                                        <input className="param-input" placeholder="描述"/>
                                        <input className="param-input" placeholder="数据类型"/>
                                        <input className="param-input"  placeholder="备注"/>
                                    </li>
                                </ul>
                            <span className="add-icon">增加</span>
                            </div>
                            <div className="config-item">
                                <span>响应参数：</span>
                                <ul>
                                    <li>
                                        <input className="param-input" placeholder="字段名"/>
                                        <input className="param-input" placeholder="描述"/>
                                        <input className="param-input" placeholder="数据类型"/>
                                        <input className="param-input"  placeholder="备注"/>
                                    </li>
                                </ul>
                                <span className="add-icon">增加</span>
                            </div>
                        </form>
                    </section>
                </div>
                <footer></footer>
            </div>  
        );
    }
}
export default ApiDetail;