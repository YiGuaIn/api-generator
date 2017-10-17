import React, {Component} from 'react';

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
                {
                    this.state.data.map(function(item){  
                        return <div><a>风向接口v1</a></div>;
                    }  
                )}
            </div>   
        );
    }
}
export default FengXiang;
// export default () => <h1>fengxiang</h1>;