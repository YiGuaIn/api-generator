import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class FengXiang extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [1,2,3,4,5]
        }
    }
    componentWillMount(){

    }
    render(){
        return (
            <div className="api-detail">
                <div><Link to="/config">配置接口</Link></div>
                {
                    this.state.data.map(function(item){  
                        return <div key={item}><Link to={`/main/1`}>风向接口v1</Link></div>;
                    }  
                )}
            </div>   
        );
    }
}
export default FengXiang;
// export default () => <h1>fengxiang</h1>;