import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';
import styles from './taskStyle.module.css';
import PropTypes from 'prop-types'; 

class Task extends Component{


state = {
    selected: false
};

handleChange = ()=>{
    const {data, onToggle} = this.props;
    onToggle(data._id);
    this.setState({
        selected: !this.state.selected,
    });
};

render(){
const task = this.props.data;
const {disabled, onDelete} = this.props;
const {selected} = this.state;

    return(
        <Card className={`${styles.task} ${selected ? styles.selected: ""}`}>

        <Card.Body>
            <input
                type="checkbox"
                onChange={this.handleChange}
            />
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>
                Some quick example text to build on the card title and
  </Card.Text>
            <Button
                variant="danger"
                disabled={disabled}
                // onClick={() => this.deleteTask(task._id)}
                onClick={() => onDelete(task._id)}

            >
                Delete
            </Button>
        </Card.Body>
    </Card>
    )
}
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Task;