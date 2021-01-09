import React, {Component} from 'react';
import styles from './todo.module.css';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Form, Card, Button, FormControl, InputGroup } from 'react-bootstrap';


class ToDo extends Component {
	state = {
		inputValue: '',
		tasks: [],
		selectedTasks: []
		
	};
	handleChange = (event)=>{
		this.setState({
			inputValue: event.target.value
		});
	};
	
 	
	addTask = () => {
        const inputValue = this.state.inputValue.trim();

        if (!inputValue) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: inputValue
        };

       

        const tasks = [...this.state.tasks, newTask];
        this.setState({
            tasks,
            inputValue: ''
        });


    };

 	deleteTask=(taskID)=>{
 		const newTasks = this.state.tasks.filter((tasks)=> taskID!== tasks._id)
        this.setState({tasks: newTasks});
       
    };



    chekedTasks =(taskID)=>{
    	let selectedTasks = [...this.state.selectedTasks];
    	if(selectedTasks.includes(taskID) ){
    		selectedTasks.splice(taskID, 1) ;
       	}else {
    		selectedTasks = [...this.state.selectedTasks, taskID];
    	}
    	this.setState({ selectedTasks }); 
    	console.log("selectedTasks  " + selectedTasks)	
    	console.log("taskID  " + taskID)		
    }


    deleteTasks=(selectedTasks)=>{
    	const newTask = this.state.tasks.map((task)=>{
    		console.log("task._id " + task._id)
    		return task._id
    	})
	this.setState({tasks: newTask});
     	console.log("newTask " + newTask) 
    };

     	
     	 





	render() {
        const { tasks, inputValue } = this.state;

        const taskComponents = tasks.map((task) => {

            return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                >
                    <Card className={styles.task}>
                   <Form.Group controlId="formBasicCheckbox">
				    <Form.Check type="checkbox" label="Check me out"  onClick={() => this.chekedTasks(task._id)}/>
				  </Form.Group>
					<Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and
                  </Card.Text>
                            <Button
                                variant="danger"
                                onClick={() => this.deleteTask(task._id)}
                            >
                                Delete
                  </Button>
                        </Card.Body>
                    </Card>



                </Col>
            )
        });

        return (
            <div>
                <h2>ToDo List</h2>
                <Container>
                    <Row  className="justify-content-center">
                        <Col xs={10}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Input your task"
                                    value={inputValue}
                                    onChange={this.handleChange}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTask}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.deleteTasks}
                                    >
                                        Delete cheked Items
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {taskComponents}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ToDo;