import React, {Component} from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import Home from '../layout/Home';

class RouteURL extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLoading: true
        }
    }
    componentDidMount(){
        this.setState({isShowLoading : false});
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if(accessTokenAuth){
        //     if (jwtDecode(accessTokenAuth).exp < Date.now() / 1000) {
        //         storage.removeStorageToken();
        //         window.location.href = "/login";
        //         return false;
        //     }
        //     return true;
        // }else{
        //     let currentRouteName = window.location.pathname;
        //     if(currentRouteName!=='/login'){
        //         window.location.href = "/login";
        //         return false;
        //     }
        //     return true;
        // }
        return true;
    }

    render() {
        return (
                this.state.isShowLoading ? 
                    <div className="lds-spinner">
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                : <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route this path="/home" component={Home} />
                    </Switch>
                </BrowserRouter>
        );
    }
}

export default RouteURL;