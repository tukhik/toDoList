import React, {Component} from 'react';
import styles from './Task.module.css';
import {Card, Button} from 'react-bootstrap';


class Task extends Component {
  state = {
    selected: false
};
  handleChange=()=>{
    const {data, onToggle} = this.props;
    onToggle(data._id);
    this.setState({
      selected: !this.state.selected,
    })
  }  

  
  render(){
    const task = this.props.data;
    const {disabled, onDelete} = this.props;
    const {selected} = this.state;

    return(
        <Card className={styles.task}>
                   <input type ="checkbox" onChange={this.handleChange} />
          <Card.Body>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and
                  </Card.Text>
                            <Button
                                variant="danger"
                                onClick={() => onDelete(task._id)}
                                disabled = {disabled}
                            >
                            Delete
                  </Button>
           </Card.Body>
        </Card>

    )
  }

}


export default Task;