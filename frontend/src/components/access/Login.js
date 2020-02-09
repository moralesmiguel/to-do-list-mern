import React, { Component } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "./AuthToken"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isAdminUser: false
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = async e => {
        await this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.email === "adminMaster@gmail.com"){
            this.setState({isAdminUser: true})
        }
        const userData = {
            email: this.state.email,
            password: this.state.password,
            isAdminUser: this.state.isAdminUser
        },
        data = new FormData(e.target);

        //Fetching
        (async () => {
            const response = fetch("http://localhost:5000/api/to_do/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            
            const theResponse = await response
                , status = await theResponse.status
                , json = await theResponse.json();

            //If status is 200 it means its ok
            if (status === 200) {
                // Token is added to local storage
                localStorage.setItem("jwtToken", json.token)
                setAuthToken(json.token)
                json["isAdminUser"] = this.state.isAdminUser
                this.props.loginCallback(json)
            }
        })()
    };

    render() {
        
        return (
            <div className="login-section">
                    <div>
                            <h4><strong>Log in</strong></h4>
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        <form noValidate onSubmit={this.onSubmit} >
                            <div>
                                <input onChange={this.onChange} value={this.state.email} id="email" name="email" type="email" />
                                <label htmlFor="email" className="field-label">Email</label>
                            </div>
                            <div>
                                <input onChange={this.onChange} value={this.state.password} id="password" name="password" type="password" />
                                <label htmlFor="password" className="field-label">Password</label>
                            </div>
                            <div>
                                <button type="submit" className="login-button">Login</button>
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}
export default Login;