import React, {Component} from 'react';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faStickyNote, faCheck } from '@fortawesome/free-solid-svg-icons';
import {formatDate} from '../../../helpers/utils';
import EditTaskModal from '../../EditTaskModal';
import  {getTask, deleteTask, editTask} from '../../../store/actions';
import {connect} from 'react-redux';

class SingleTask extends Component{
    state={
        openEditModal: false
    };

    componentDidMount(){
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

     componentDidUpdate(prevProps){
        console.log('prevProps', prevProps);
        console.log('this.props', this.props);
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
                openEditModal: false
            })
        }
    }

    deleteTask = ()=>{
        const taskId = this.props.match.params.taskId;
        this.props.deleteTask(taskId, 'single');

    }


    toggleEditModal = ()=>{
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    };

render(){
    const {openEditModal} = this.state;

    const {task, editTask} = this.props;

    return(
     <div className='mt-5'>
     <Container >
     <Row >
     <Col xs={12}>
        {
            task ? 
            <Card className='text-center'>

            <Card.Body>
                <Card.Title>{task.title}</Card.Title>  
                <Card.Text>
                   <b>Description:</b> {task.description}
                </Card.Text>
                <Card.Text>
                  <b>Status:</b> {task.status}
                </Card.Text>
               <Card.Text>
                <b>Date:</b> {formatDate(task.date)}
                </Card.Text>
                <Card.Text>
                <b>Created at:</b> {formatDate(task.created_at)}
                </Card.Text>
            { task.status === 'done' ?
                  <Button
                        className='m-1'
                        variant="success"
                        onClick={() => editTask({
                            status: "active",
                            _id: task._id
                        })}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </Button> :
                   <Button
                        className='m-1'
                        variant="info"
                        onClick={() => editTask({
                            status: "done",
                            _id: task._id,
                        })}
                    >
                        <FontAwesomeIcon icon={faStickyNote} />
                    </Button>
                }
                <Button
                    className='m-1'
                    variant="warning"
                    onClick={this.toggleEditModal}
                     from='single'
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>

                <Button
                className='m-1'
                    variant="danger"
                    onClick={this.deleteTask}
                     from='single'

                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

            </Card.Body>
        </Card> :
            <p>Task data not exists!</p>
        }

        </Col>
        </Row>
        </Container>

        {
            openEditModal &&
            <EditTaskModal
            data={task}
            onClose={this.toggleEditModal}
            from='single'
        />
        }
     </div>
    );
}


};

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess,
    };
};

const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);