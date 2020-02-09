import React from 'react';
import setAuthToken from "./AuthToken";

class Logout extends React.Component {
    constructor(props){
        super(props)
        this.logoutCallback = this.props.logoutCallback

        localStorage.removeItem("jwtToken")
        setAuthToken(false)
        this.logoutCallback({message: "Logged out"})
    }

    render(){
        return <></>
    }
}

export default Logout;