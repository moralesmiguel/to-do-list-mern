import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import AddForm from './AddForm.js';

class List extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            counter: 1
            ,listItems: []
        };
        this.addItem = this.addItem.bind(this);
        this.textInputRef = React.createRef();
        this.emptyVar = "";
    }
    //Fetch list
    fetchList = async () => {

        const response = fetch(`http://localhost:5000/api/to_do/${this.props.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            },
            body: this.state.user_id
        })
        
        const theResponse = await response
            , status = await theResponse.status
            , json = await theResponse.json();

        if (status === 200) {
            await this.setState({
                listItems: json
                ,counter: json.length + 1
            })
        }
    }

    addItem(){
        (async () => {

            const ToDoData = `user_id=${this.props.user_id}&data=${this.textInputRef.current.value}`

            const response = fetch("http://localhost:5000/api/to_do/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: ToDoData
            })
            
            const   theResponse = await response
                    ,status = await theResponse.status
                    ,json = await theResponse.json();
            
            if (status === 200) {
                this.fetchList();
            }
        })()
    }

    componentDidMount(){
        this.fetchList();
    }

    removeItem = function(id, res){
        if(window.confirm("Are you sure you want to delete this task?")){
            
            (async () => {
                
                const response = fetch(`http://localhost:5000/api/to_do/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'text/html'
                    },
                    body: id
                })
                
                const   theResponse = await response
                        ,status = await theResponse.status
                        ,json = await theResponse.json();
    
                if (status === 200) {
                    this.fetchList();
                }
            })()
        }
    }

    render(){
        const listItems = this.state.listItems.length ? this.state.listItems : [];
        
            return(
                <>
                    <div className="list-container">
                        <ListGroup className="list-block">
                            {listItems.map((item, index, state) => {
                                
                                return(
                                    <>
                                    <ListGroup.Item key={listItems[index]._id}>
                                        <span>{listItems[index].data}</span>
                                        <span>
                                            <a className="deleteTaskButton" href="#" value={listItems[index]._id} onClick={() => this.removeItem(listItems[index]._id)}><i className="fas fa-trash-alt fa-3x"></i>Delete</a>
                                        </span>
                                    </ListGroup.Item>
                                    </>
                                )
                            })}
                        </ListGroup>
                        <AddForm counter={this.state.counter} useRef={this.textInputRef} onClick={() => this.addItem()} value={this.emptyVar} />
                    </div>
                </>
            )
    }
}
export default List;