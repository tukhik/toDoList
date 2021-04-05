import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../../Task/Task';
import NewTask from '../../NewTask/NewTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal';
import Search from '../../Search/Search';
import {connect } from 'react-redux';
import {getTasks, deleteTask, deleteTasks, getUserInfo} from '../../../store/actions';


class ToDo extends Component {
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };


    componentDidMount() {
        this.props.getTasks();
        this.props.getUserInfo();
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            });
            return;
        }

        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        }

        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
                editTask: null
            });
            return;
        }
    }



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
        const { selectedTasks } = this.state;
        this.props.deleteTasks(selectedTasks);
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    selectAll = () => {
       const { tasks } = this.props;
       const taskIds =tasks.map((task)=> task._id);
        this.setState({
            selectedTasks: new Set(taskIds)
        });
    };


    deSelectAll = () => {
        this.setState({
            selectedTasks: new Set()
        });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    };

    handleEdit = (editTask) => {
        this.setState({ editTask });
    };

    handleSaveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }

                const tasks = [...this.state.tasks];
                const foundIndex = tasks.findIndex((task) => task._id === editedTask._id);
                tasks[foundIndex] = editedTask;

                this.setState({
                    tasks,
                    editTask: null
                });

            })
            .catch((error) => {
                throw new Error('Something went wrong!');
            });
    };

    render() {

        const { selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;
        const { tasks } = this.props;

        const taskComponents = tasks.map((task) => {

            return (
                <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                >
                    <Task
                        data={task}
                        onToggle={this.toggleTask}
                        disabled={!!selectedTasks.size}
                        onDelete={this.props.deleteTask}
                        selected={selectedTasks.has(task._id)}
                        onEdit={this.handleEdit}
                    />
                </Col>
            )
        });

        return (
            <div>
            
                <h2 className = "container">ToDo List</h2>
                <Container>
                    <Row>
                        <Col >
                            <Search />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Button className = "col"
                                variant="warning"
                                onClick={this.selectAll}
                            >
                                Select All
                     </Button>

                        </Col>
                        <Col>
                            <Button className = "col"
                                variant="warning"
                                onClick={this.deSelectAll}
                            >
                                Deselect All
                            </Button>
                        </Col>
                        <Col>
                            <Button className = "col"
                                variant="danger"
                                onClick={this.toggleConfirm}
                                disabled={!selectedTasks.size}
                            >
                                Delete selected
                            </Button>
                        </Col>
                          <Col>
                            <Button className = "col"
                                variant="primary"
                                onClick={this.toggleNewTaskModal}
                            >
                                Add new Task
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
                        onClose={this.toggleNewTaskModal}
                    />

                }
                {
                    editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={() => this.handleEdit(null)}
                    />
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess: state.editTasksSuccess,
       
    };
};

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks,
    getUserInfo
 
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);