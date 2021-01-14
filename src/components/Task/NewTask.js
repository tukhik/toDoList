import React, {Component} from 'react';
import {FormControl, InputGroup, Button} from 'react-bootstrap';


export default class NewTask extends Component {


	render(){
		 const {addNewTask} = this.props;

		return (
			  <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Input your task"
                                    onKeyDown = {this.props.hundleKeyDown}
                                    value={this.props.newInput}
                                    onChange={this.props.handleChange}
                                     disabled = {this.props.disabled}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                       
                                        onClick = {() => addNewTask(this.props.newImput)}
                                        
                                         disabled = {this.props.disabled}
                                    >
                                    Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
			)
		}
}