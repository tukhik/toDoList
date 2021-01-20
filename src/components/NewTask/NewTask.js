import React, {Component} from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types'; 

class NewTask extends Component{
    state = {
        title: '',
        //description: ''
    };

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.addTask();
        }
    };

    handleSubmit = ()=>{
        const title = this.state.title.trim();
        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title,
        };

        this.props.onAdd(newTask);
        this.setState({
            title: '',
        });
    };

    render(){
        const {title} = this.state;
        const {disabled} = this.props;

        return(
            <InputGroup className="mb-3">
            <FormControl
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                disabled={disabled}
            />
            <InputGroup.Append>
                <Button
                    variant="outline-primary"
                    onClick={this.handleSubmit}
                    disabled={disabled}
                >
                    Add
                </Button>
            </InputGroup.Append>
        </InputGroup>
        );
    }
}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default NewTask;