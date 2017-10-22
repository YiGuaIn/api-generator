import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {CategoryByList} from '../utils/api.conf';
class FengXiang extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
        }
        
    }
    componentWillMount(){
        let req = new Request(CategoryByList, {method: 'POST', body: '{}'})
        let that = this;
        fetch(req).then(function(response){
            return response.json();
        }).then(function(data){
            if(data){
                that.setState({list: data});
            }
        });
    }
    render(){
        return (
            <div className="api-detail">
                <div><Link to="/config">配置接口</Link></div>
                {
                    this.state.list.map(function(item){  
                        return <div key={item._id}><Link to={`/main/${item._id}`}>{item.name}</Link></div>;
                    }  
                )}
            </div>   
        );
    }
}
export default FengXiang;
// export default () => <h1>fengxiang</h1>;