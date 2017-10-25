import React, {Component} from 'react';
class ApiDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            pid: this.props.match.params.id,
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
    }
    render(){
        return (
            
            <section className="detail-content">
                <header className="api-title">
                    <h3>{this.state.apiData.title}</h3>
                </header>
                <div className="doc-detail">
                    <div className="api-item">
                        <span className="sub-title">接口描述</span>
                        <p className="sub-content">{this.state.apiData.descript}</p>
                    </div>
                    <div className="api-item">
                        <span className="sub-title">请求地址</span>
                        <p className="sub-content">{this.state.apiData.address}</p>
                    </div>
                    <div className="api-item">
                        <span className="sub-title">请求方法</span>
                        <p className="sub-content">{this.state.apiData.method}</p>
                    </div>
                    <div className="api-item">
                        <span className="sub-title">请求参数</span>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>字段</th>
                                    <th>描述</th>
                                    <th>数据类型</th>
                                    <th>备注</th>
                                </tr>     
                            </thead>
                            <tbody>
                                {
                                    this.state.apiData.requestParam.map((item) => {
                                        return <tr key={item.field}>
                                            <td>{item.field}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.type}</td>
                                            <td>{item.remark}</td>
                                        </tr>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="api-item">
                        <span className="sub-title">响应参数</span>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>字段</th>
                                    <th>描述</th>
                                    <th>数据类型</th>
                                    <th>备注</th>
                                </tr>     
                            </thead>
                            <tbody>
                                {
                                    this.state.apiData.requestParam.map((item) => {
                                        return <tr key={item.field}>
                                            <td>{item.field}</td>
                                            <td>{item.desc}</td>
                                            <td>{item.type}</td>
                                            <td>{item.remark}</td>
                                        </tr>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="api-item">
                        <span className="sub-title">调试接口</span>
                    </div>
                </div>
            </section>
        );
    }
}
export default ApiDetail;