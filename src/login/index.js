import React, {Component} from 'react';

class ApiView extends Component {
    constructor(props){
        super(props);
        this.render = this.render.bind(this); 
        this.login = this.login.bind(this);
        this.handlerUserName = this.handlerUserName.bind(this);
        this.handlerPassrod = this.handlerPassrod.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }
    handlerUserName(event){
        this.setState({username: event.target.value})
    }
    handlerPassrod(event){
        this.setState({password: event.target.value})
    }
    login(){
        let user = this.state;
        if(user == null) return;
        if(user.username === 'admin' && user.password === '123456'){
            // console.log(this.props);
            this.props.history.push('/api');
        }
    }
    render() {
        return (
            <div className="login-contain">
                <div className="form-item">
                    <label>用户名</label>
                    <input placeholder="用户名" onChange={this.handlerUserName} value={this.state.username}/>
                </div>
                <div className="form-item">
                    <label>密码</label>
                    <input placeholder="密码" onChange={this.handlerPassrod} value={this.state.password}/>
                </div>
                <button onClick={this.login} className="login-btn" type="submit">登 录</button>
            </div>
        )
    }
}

export default ApiView;
