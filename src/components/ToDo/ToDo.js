import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';

class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false
    };

    addTask = (newTask) => {
        const tasks = [...this.state.tasks, newTask];

        this.setState({
            tasks,
            openNewTaskModal: false
        });
    };

    deleteTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task) => taskId !== task._id);

        this.setState({
            tasks: newTasks
        });
    };
    onSave = val => {
    console.log('Edited Value -> ', val)
    }

    EditTask = (taskId) => {
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

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id);
        this.setState({
            selectedTasks: new Set(taskIds)
        });
    };

    deSelectAll = () => {
        this.setState({
            selectedTasks: new Set()
        });
    };

    toggleNewTaskModal = ()=>{
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };


    render() {

        const { tasks, selectedTasks, showConfirm, openNewTaskModal } = this.state;

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
                        onToggle={this.toggleTask}
                        disabled={!!selectedTasks.size}
                        onDelete={this.deleteTask}
                        onSave={this.onSave}
                        selected={selectedTasks.has(task._id)}

                    />
                </Col>
            )
        });

        return (
            <div>
                <h2>ToDo List</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <Button
                                variant="primary"
                                onClick={this.toggleNewTaskModal}
                            >
                            Add new Task
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="warning"
                                onClick={this.selectAll}
                            >
                                Select All
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="warning"
                                onClick={this.deSelectAll}
                            >
                                Deselect All
                            </Button>
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
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }
                {
                    openNewTaskModal &&
                    <NewTask
                    onClose = {this.toggleNewTaskModal}
                    onAdd={this.addTask}
                />
                }
            </div>
        );
    }
}

export default ToDo;