import React, { Component } from "react";
import Cat from "../../img/cat.jpg"

class Landing extends Component {
    constructor(props) {
        super(props)
        this.isLoggedIn = this.props.isLoggedIn
    }

    render() {
        return (
            <div>
                <img src={Cat} className="image-cat" alt="cat holding cleaning supplies"/>
            </div>
        );
    }
}
export default Landing;