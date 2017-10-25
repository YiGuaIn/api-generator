import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import routes from '../route/config';
import { ApiByList } from '../utils/api.conf';
class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            // pid: this.props.match.params.id,
            sidebarList: [],
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
        let that = this;
        let param = {pid: that.state.pid};
        fetch(ApiByList, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(function(response){
            return response.json();
        }).then(function(data){
            that.setState({sidebarList: data});
        });
    }
    render(){
        return (
            <Router>
                <div className="api-body">
                    <header className="api-header">
                        <h3>风向接口api-v1</h3>
                        <span onClick={this.goMain}>首页</span>
                    </header>
                    <div className="api-content">
                        <nav className="sidebar">
                            <ul>
                                {
                                    this.state.sidebarList.map((item) => {
                                        return <li key={item.name}>{item.name}</li>
                                    })
                                }
                            </ul>
                        </nav>
                        <section className="detail-content">
                            <header className="config-title">
                                <h3></h3>
                                <div className="config-btns">
                                    <Link to="/main/add">添加</Link>
                                    <Link to="/main/add">删除</Link>
                                    <Link to="/main/add">修改</Link>
                                </div>
                            </header>
                            {
                                setTimeout(() => {
                                    return <Route></Route>
                                }, 500)
                            }
                        </section>
                    </div>
                    <footer></footer>
                </div> 
            </Router> 
        );
    }
}
export default ApiDetail;