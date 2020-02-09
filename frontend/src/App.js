import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';

import Navbar from "./components/structure/Navbar"
import Landing from "./components/structure/Landing"
import Login from './components/access/Login'
import Logout from './components/access/Logout'
import Register from './components/access/Register'
import List from './components/structure/List'
import SimpleStorage from "react-simple-storage"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            isAdminUser: true,
            name: "",
            user_id: null,
            original_user_id: null
        }
        var currentTime = new Date()
        currentTime = currentTime.toISOString()
        console.log("Welcome to my to-do list... please login in or register. " + currentTime)
    }

    // State if successful login
    loginCallback = async (result) => {
        await this.setState({
                    isLoggedIn: true,
                    isAdminUser: result.isAdminUser,
                    name: result.name,
                    user_id: result.user_id,
                    original_user_id: result.user_id
                });
    }

    // State when logged out
    logoutCallback = async (result) => {
        await this.setState({
            isLoggedIn: false,
            isAdminUser: false,
            name: null,
            user_id: null,
            original_user_id: null,
        });
        //Goes to login screen
        window.location = "/login"
    }

    switchUserCallback = async (user_id) =>{
        const response = fetch(`http://localhost:5000/api/to_do/auth/${user_id}`, {
            method: 'GET'
        })

        const theResponse = await response
            , status = await theResponse.status
            , json = await theResponse.json();

        // Failure fetching
        if (status !== 200) {
            console.log("Error switching user.")
            return false;
        }

        await this.setState({
            name: json.name
            ,user_id: json._id
        });
        let result = {
            name: json.name
            ,user_id: json._id
        }
    }
    
    render(){
        var currentTime = new Date()
        currentTime = currentTime.toISOString()
        return (
            <Router>
                <SimpleStorage parent={this} />
                <div className="App">
                    <Navbar isLoggedIn={this.state.isLoggedIn} isAdminUser={this.state.isAdminUser} user_id={this.state.user_id}  original_user_id={this.state.original_user_id} switchUserCallback={this.switchUserCallback} key={currentTime} />
                    <Switch>
                        <Route exact path="/"
                            render={(props) => <Landing {...props} isLoggedIn={this.state.isLoggedIn} />}
                            />

                        <Route path="/list"
                            render={(props) => ( !this.state.isLoggedIn ? <Redirect to="/login" /> : <List {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} key={currentTime} />)} />

                        <Route exact path="/login" 
                            render={(props) => (this.state.isLoggedIn ? 
                            <Redirect to="/list" /> : (<Login {...this.props} isLoggedIn={this.state.isLoggedIn} loginCallback={this.loginCallback} />))} />

                        <Route exact path="/logout" 
                            render={ (props) => (<Logout {...this.props} isLoggedIn={this.state.isLoggedIn} logoutCallback={this.logoutCallback} />)}
                            />
                        
                        <Route exact path="/register"
                            render={(props) => (this.state.isLoggedIn ? 
                            <Redirect to="/list" /> : (<Register {...this.props} isLoggedIn={this.state.isLoggedIn} loginCallback={this.loginCallback} />))} />
                        

                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
