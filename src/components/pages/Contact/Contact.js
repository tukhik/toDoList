import React, { useState } from 'react';
import {Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './contactStyle.module.css';


const Contact = () => {
    const [ inputValues, setInputValues ] = useState({
        inputName: '',
        inputEmail: '',
        inputText: ''
    });

    const [ inputsIsValid, setInputsIsValid ] = useState({
        inputName: null,
        inputEmail: null,
        inputText: null
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
        const inputValuesEmpty = inputValuesArr.every(el => el === '');

        if(!errorExist && inputValuesEmpty){
            setInputsIsValid({
                inputName: 'field is required',
                inputEmail: 'field is required',
                inputText: 'field is required'
            })
            return;
        }
        if(!errorExist && !inputValuesEmpty){
            fetch('http://localhost:3001/form', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    name: inputValues.inputName, 
                    email: inputValues.inputEmail,
                    message: inputValues.inputText
                })
            })
            .then(async (response) => {
                const data = await response.json();
                if(response.status >=400 && response.status < 600){
                    if(data.error){
                        throw data.error;
                    }
                    else {
                        throw new Error('Something went wrong!');
                    }
                }
                setInputValues({
                    inputName: '',
                    inputEmail: '',
                    inputText: ''
                })

            })
            .catch((error)=>{
               throw new Error('Something went wrong!');
            });
        };
    };

    const validator = (name, value) => {
        if(name === 'inputEmail' && !(new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)).test(value)){
            setInputsIsValid({
                ...inputsIsValid,
                [name]: 'Please entet valid email'
            })
            return;
        }
        if(value.trim() === '') {
            setInputsIsValid({
                ...inputsIsValid,
                [name]: 'is required'
            })
            return;
        }
        setInputsIsValid({
            ...inputsIsValid,
            [name]: null
        })
        
    }

    return (
        <div className={styles.main} >
        <Container className="contact">
            <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6}>
                    <h1 className={styles.heading}>Contact</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                                className="contact-input"
                                onChange={handleChange}
                                value={inputValues.inputName}
                                name="inputName"
                                type="text"
                                placeholder="Enter your name"
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputName}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
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
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Control
                                className="contact-input"
                                name="inputText"
                                as="textarea"
                                rows={3}
                                type="text"
                                placeholder="your message"
                                value={inputValues.inputText}
                                onChange={handleChange}
                                />
                            <Form.Text className="text-danger">
                                {inputsIsValid.inputText}
                            </Form.Text>    
                        </Form.Group>
                         <div className="text-center">
                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        </div>
    )
}
export default Contact;