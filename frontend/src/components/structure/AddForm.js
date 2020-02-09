import React, { Component } from "react";

class AddForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    // State updated when value is changed
    handleChange(event) {
        this.setState({value: event.target.value});
        event.stopPropagation();
    }

    // Submit triggers onClick
    handleSubmit() {
        this.props.onClick();
        this.setState({value: ""});
    }

    render(){
        return(
            <form noValidate id="taskForm" onSubmit={e => { e.preventDefault(); this.handleSubmit();}}>
                    <label htmlFor="task" className="add-label">What do I need to do today?</label>
                    <input ref={this.props.useRef} onChange={this.handleChange} required type="text" placeholder="I should..." value={(this.state.value)} />
                    <a className="addTaskButton" href="#" onClick={() => this.handleSubmit()}><i className="far fa-calendar-plus fa-3x"></i>{this.props.counter}</a>
            </form>
        )
    }
}
export default AddForm;