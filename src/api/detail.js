import React, {Component} from 'react';
import { ApiByList } from '../utils/api.conf';

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            pid: this.props.match.params.id,
            sidebarList: [],
            currentApi: {
                name: '',
                des: '',
                url: '',
                method: '',
                req: [],
                res: []
            }
        }
        this.goMain = this.goMain.bind(this);
        this.look = this.look.bind(this);
    }
    goMain(){
        this.props.history.push('/api');
    }
    look(name){
        let api = this.state.sidebarList.find((item, index) => (item.name.indexOf(name) >= 0));
        this.setState({currentApi:api});
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
            console.log(data);
            if(data.code !== 200)
            {
                alert(data.code);
                return;
            }
            if(data.data.length <= 0){
                window.confirm("没有找到接口，请到配置接口添加...");
                that.props.history.push('/api');
                return;
            }
            if(data.data != null && typeof(data) !== 'undefined'){
                window.localStorage.setItem('data', JSON.stringify(data.data));
            }
            that.setState({sidebarList: data.data, currentApi: data.data[0]});
        });
    }
    render(){
        return (
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
                                    return <li key={item._id} onClick={this.look.bind(this, item.name)}>{item.name}</li>
                                })
                            }
                        </ul>
                    </nav>
                    <section className="detail">
                    <header className="api-title">
                        <h3>{this.state.currentApi.name}</h3>
                    </header>
                    <div className="doc-detail">
                        <div className="api-item">
                            <span className="sub-title">接口描述</span>
                            <p className="sub-content">{this.state.currentApi.desc}</p>
                        </div>
                        <div className="api-item">
                            <span className="sub-title">请求地址</span>
                            <p className="sub-content">{this.state.currentApi.url}</p>
                        </div>
                        <div className="api-item">
                            <span className="sub-title">请求方法</span>
                            <p className="sub-content">{this.state.currentApi.method}</p>
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
                                        this.state.currentApi.req.map((item) => {
                                            return <tr key={item.field}>
                                                <td>{item.field}</td>
                                                <td>{item.fieldname}</td>
                                                <td>{item.datatype}</td>
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
                                        this.state.currentApi.res.map((item) => {
                                            return <tr key={item.field}>
                                                <td>{item.field}</td>
                                                <td>{item.fieldname}</td>
                                                <td>{item.datatype}</td>
                                                <td>{item.remark}</td>
                                            </tr>;
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="api-item">
                                <span className="sub-title">调试接口</span>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
                <footer></footer>
            </div>
        );
    }
}
export default Detail;