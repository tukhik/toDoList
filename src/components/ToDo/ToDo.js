import React, {Component} from 'react';
import styles from './todo.module.css';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Form, Card, Button, FormControl, InputGroup } from 'react-bootstrap';


class ToDo extends Component {
	state = {
		inputValue: '',
		tasks: [],
		selectedTasks: new Set()
		
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

    toggleTask=(taskID)=>{
        const selectedTasks = new Set(this.state.selectedTasks);
        if(selectedTasks.has(taskID)){
            selectedTasks.delete(taskID);
        }else {
            selectedTasks.add(taskID)
        }
        this.setState({selectedTasks})
    }

removeSelected = ()=>{
    const {selectedTasks, tasks} = this.state;
    const newTasks = tasks.filter((task)=>{
        if(selectedTasks.has(task._id)){
            return false
        } else{
            return true
        }
    })
    this.setState({
        tasks: newTasks,
        selectedTasks: new Set()
    })
}

hundleKeyDown = (event)=>{
    if(event.key ==="Enter"){
        this.addTask()
    }
}

     	 





	render() {
        const { tasks, inputValue, selectedTasks } = this.state;

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
                   <input type ="checkbox" onChange={()=>this.toggleTask(task._id)} />
					<Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and
                  </Card.Text>
                            <Button
                                variant="danger"
                                onClick={() => this.deleteTask(task._id)}
                                disabled = {!!selectedTasks.size}
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
                                    onKeyDown = {this.hundleKeyDown}
                                    value={inputValue}
                                    onChange={this.handleChange}
                                    disabled = {!!selectedTasks.size}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTask}
                                        disabled = {!!selectedTasks.size}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Button
                                variant="danger"
                                onClick = {this.removeSelected}
                                disabled = {!selectedTasks.size}
                                
                            >
                                Delete Select
                  </Button>
                    <Row>
                        {taskComponents}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ToDo;