import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm.js';

class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false
    };



    addTask = (newTask) => {
        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks
        });
    };

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

        this.setState({
            tasks: newTasks
        });
    };

    toggleTask = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }

        this.setState({
            selectedTasks
        });
    };


    removeSelected = () => {
        const { selectedTasks, tasks } = this.state;

        const newTasks = tasks.filter((task) => {
            if (selectedTasks.has(task._id)) {
                return false;
            }
            return true;
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            showConfirm: false
        });

    };

    toggleConfirm = ()=>{
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };




    render() {

        const { tasks, selectedTasks, showConfirm } = this.state;

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
                    <Task 
                    data={task}
                    onToggle = {this.toggleTask}
                    disabled = {!!selectedTasks.size}
                    onDelete = {this.deleteTask}
                    />
                </Col>
            )
        });

        return (
            <div>
                <h2>ToDo List</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                        <NewTask 
                        disabled = {!!selectedTasks.size}
                        onAdd = {this.addTask}
                        />
                        </Col>
                    </Row>

                    <Row>
                    <Col>
                    
                    </Col>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                        >
                            Delete selected
                        </Button>
                        </Col>
                    </Row>

                    <Row>
                        {taskComponents}
                    </Row>
                </Container>

               {showConfirm && 
                <Confirm 
                onClose ={this.toggleConfirm}
                onConfirm ={this.removeSelected}
                count={selectedTasks.size}
                />
            } 
            </div>
        );
    }
}


export default ToDo;