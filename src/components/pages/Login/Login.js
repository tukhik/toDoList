import React, {useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const requiredErrorMessage = 'Field is required';


export default function  Login() {

const [values, setValues] = useState({
    email: '',
    password: ''
});

const [errors, setErrors] = useState({
    email: null,
    password: null
});


const handleChange = ({target: {name, value}})=>{

  if(!value){
    setErrors({
        ...errors,
        [name]: requiredErrorMessage
    });
  }
  else {
    setErrors({
        ...errors,
        [name]: null
    }); 
  }

  if(name==='email' && value){
      const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if(!emailReg.test(value)){
        setErrors({
            ...errors,
            email: 'Invalid email'
        }); 
      }
  }

   if(name==='password' && value){
   	if(value.length < 6){
   		setErrors({
            ...errors,
            email: 'Invalid email'
        }); 
   	}
   }


  setValues({
        ...values,
        [name]: value
  });

};


    
        return (
            <Container>
             <Row className='justify-content-center'>
              <Col xs={7}>
              <Form className='mt-5'>
                <h3 className='text-center'>Log in</h3>

                 <Form.Group>
                     <Form.Control  type="email" 
                     name = "email" 
                     placeholder="Enter email"
                     value={values.name}
                     onChange={handleChange} 
                    />
                    <Form.Text className="text-danger">
                        {errors.name}
                    </Form.Text>
                 </Form.Group>

                <Form.Group>
                   <Form.Control type="password"  
                   name="password" 
                   placeholder="Enter password" 
                    value={values.name}
                     onChange={handleChange} 
                   />
                    <Form.Text className="text-danger">
                        {errors.name}
                    </Form.Text>
                </Form.Group>
                <div className="text-center">
	                <Button 
	                    variant="primary"
	                    /*onClick = {handleSubmit}*/
	                    >
	                    Login
	                </Button>
                </div>
                <p className="register">
                    <NavLink
        			 to='/register'      
        				 exact>
        			Don't have account yet? Register now!
         			</NavLink> 
                </p>
                </Form>
                </Col>
                </Row>
            </Container>

        );
}