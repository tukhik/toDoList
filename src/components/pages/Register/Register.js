import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


export default function  Register() {
    
        return (
            <Container>
             <Row className='justify-content-center'>
              <Col xs={7}>
              <Form className='mt-5'>
                <h3 className='text-center'>Register</h3>
                 <Form.Group>
                    <Form.Control type="name"  placeholder="Enter your name" />
                </Form.Group>
                 <Form.Group>
                    <Form.Control type="surname" placeholder="Enter your surname" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group>
                    <Form.Control type="password"placeholder="Enter password" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password"  placeholder="Confirm password" />
                </Form.Group>

                <div className="text-center">
	                <Button 
	                    variant="primary"
	                    >
	                    Register
	                </Button>
	            </div>
                <p className="register">
                    <NavLink
        			 to='/login'      
        				 exact>
        			Already registered? Try to login.
         			</NavLink> 
                </p>
                </Form>
                </Col>
                </Row>
            </Container>

        );
}