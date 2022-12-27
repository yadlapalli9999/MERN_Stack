import React from 'react';
import '../styles/RegisterStyle.css'
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Register = ()=>{
    const onfinishHandler = (values)=>{
       console.log(values)
    }
    return(
       <>
         <div className='form-container'>
            <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
                <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type='text' required/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email' required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password' required/>
                </Form.Item>
                <p>Already have an account <Link to="/login">here</Link></p>
                <Button type='submit' className='btn btn-primary'>Register</Button>
            </Form>
         </div>
       </>
    )
}

export default Register;