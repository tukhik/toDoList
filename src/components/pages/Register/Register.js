import React, { useState } from 'react';
import {Form, Button, Container, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {register} from '../../../store/actions';
import styles from './registerStyle.module.css';



const Register = (props) => {
    const [ inputValues, setInputValues ] = useState({
        name: '',
        surname: '',
        password: '',
        confirmPassword: '',
        inputEmail: '',
    });

    const [ inputsIsValid, setInputsIsValid ] = useState({
        password: null,
        inputEmail: null,
        name: null,
        surname: null,
        confirmPassword: null,
    });

    const handleChange = ({target: {name, value}}) => {
        setInputValues({
            ...inputValues,
            [name]: value
        });
        validator(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errorArr = Object.values(inputsIsValid);
        const errorExist = !errorArr.every(el => el === null);
        const inputValuesArr = Object.values(inputValues);
        const inputValuesEmpty = inputValuesArr.some(el => el === '');

        if(!errorExist && inputValuesEmpty){
            setInputsIsValid({
                password: (inputValues.password === '' ? 'Password is required' : null),
                inputEmail: (inputValues.inputEmail === '' ? 'Email is required' : null),
                name: (inputValues.name === '' ? 'Name is required' : null),
                surname: (inputValues.surname === '' ? 'Surname is required' : null),
                confirmPassword: (inputValues.confirmPassword === '' ? 'confirm password is required' : null),
            })
            return;
        }
        if(!errorExist && !inputValuesEmpty){
            let sendData = {
                email: inputValues.inputEmail,
                password: inputValues.password,
                confirmPassword: inputValues.confirmPassword,
                name: inputValues.name,
                surname: inputValues.surname, 
            }
            props.register(sendData);
        };
    };

    const validator = (name, value) => {
        let notiication = null;
        if(value.trim() === '') {
            notiication = 'field is required';
        }
        if(name === 'inputEmail' && !(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(value)){
            notiication = 'Please entet valid email';
        }
        if((name === 'password' || name === 'confirmPassword') && value.trim() !== '') {
            if(value.length < 6){
                notiication = 'password should more then 6 charackters';
            };
        }
        if(name === 'confirmPassword' && value !== inputValues.password) {
            notiication = "Password doesn't match";
        }
        setInputsIsValid({
            ...inputsIsValid,
            [name]: notiication
        });
    }

    return (
        <div className={styles.main}>
        <Container className="signin">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h3 className={styles.heading}>Register</h3>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.formBasicName}
                                name="name" 
                                type="text" 
                                placeholder="Your name" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.surname}
                                name="surname" 
                                type="text" 
                                placeholder="Your surname" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.surname}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputEmail}
                                name="inputEmail" 
                                type="email" 
                                placeholder="email" 
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputEmail}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.password}
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.password}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.confirmPassword}
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.confirmPassword}
                            </Form.Text>
                        </Form.Group>
                         <div className="text-center">
                        <Button variant="primary" onClick={handleSubmit}>
                            Sign in
                        </Button>
                        </div>
                        <Link to='/login'>You have account? Login now!</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    );
};


const mapDispatchToProps = {
    register
};


export default connect(null, mapDispatchToProps)(Register);