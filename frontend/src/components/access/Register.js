import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            administratorFlag: false
        }
    }

    // State updated when values change
    onChange = async e => {
        await this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            administratorFlag: this.state.administratorFlag
        };
        (async () => {
            // Fetch
            const response = fetch("http://localhost:5000/api/to_do/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            window.location = '/login'
        })()
    };

    render() {
        
        return (
            <div className="container">
                    <div>
                            <h4><strong>Register below</strong></h4>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        <form noValidate id="registerUserForm" onSubmit={this.onSubmit}>
                            <div><input onChange={this.onChange} id="name" type="text"/>
                                <label htmlFor="name" className="field-label">Name</label>
                            </div>
                            <div>
                                <input onChange={this.onChange} value={this.state.email} id="email" type="email" />
                                <label htmlFor="email" className="field-label">Email</label>
                            </div>
                            <div>
                                <input onChange={this.onChange} value={this.state.password} id="password" type="password" />
                                <label htmlFor="password" className="field-label">Password</label>
                                <p className="indication-text">Password must be at least six characters long</p>
                            </div>
                            <div>
                                <input onChange={this.onChange} value={this.state.password2} id="password2" type="password" />
                                <label htmlFor="password2" className="field-label">Confirm Password</label>
                            </div>
                            <div>
                                <button type="submit" className="signup-button">Sign up</button>
                            </div>
                        </form>
                    </div>
            </div>
        );
    }
}
export default Register;