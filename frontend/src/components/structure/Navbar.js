import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
class Navbar extends Component {
    constructor(props){
        super(props);
        this.isAdminUser = this.props.isAdminUser;
        this.isLoggedIn = this.props.isLoggedIn;
        this.user_id = this.props.user_id;
        this.original_user_id = this.props.original_user_id
        this.state = {
            userList: []
        }
        this.switchUserCallback = this.props.switchUserCallback;

        if (this.isAdminUser){
            if (this.isLoggedIn){
                (async () => {
                    const response = fetch("http://localhost:5000/api/to_do/auth/users", {
                        method: 'GET'
                    })
                    const theResponse = await response
                        , status = await theResponse.status
                        , json = await theResponse.json();
    
                    if (status !== 200) {
                        console.log("Error fetching user list.")
                    }
                    await this.setState({
                        userList: json
                    })
                })()
            }
        }
    }
    
    render() {
        var links;
        var adminDropdown;

        if( this.props.isLoggedIn ){
            //Log out button will only appear if user is logged in
            links = <Link to="/logout"><div className="logout-text"><i className="fas fa-sign-out-alt fa-3x"></i>Log Out</div></Link>
            // adminDropdown will only show for user adminMaster@gmail.com which is the admin user
            if( this.props.isAdminUser ){
                adminDropdown = <Dropdown className="admin-dropdown">
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Switch User
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onSelect={(event) => this.switchUserCallback(event)} eventKey={this.props.original_user_id} key={this.props.original_user_id}>
                                        <strong>Me</strong>
                                    </Dropdown.Item>
                                    
                                    {this.state.userList.map((item, index, state) => 
                                        { 
                                            if(this.props.original_user_id !== this.state.userList[index]._id){
                                                return (<Dropdown.Item onSelect={(event) => this.switchUserCallback(event)} eventKey={this.state.userList[index]._id} key={this.state.userList[index]._id} style={{}}>
                                                    {this.state.userList[index].name}
                                                </Dropdown.Item>)
                                            }
                                        }
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
            }
        } else {
            //When not logged in register and login button are visible
            links = <>
                    <Link to="/register"><button className="register-button">Register</button></Link>
                    <Link to="/login"><button className="login-button">Log In</button></Link>
                    </>
        }
        
        return (
            <div>
            <div className="main-card">
                <h1>To-Do List</h1>
                        {links}
            </div>
            {adminDropdown}
            </div>
        );
    }
}

export default Navbar;