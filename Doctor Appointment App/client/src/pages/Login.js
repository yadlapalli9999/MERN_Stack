
import React from 'react';
import '../styles/RegisterStyle.css'
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Login = ()=>{
    const onfinishHandler = (values)=>{
        console.log(values)
     }
    return(
        <div className='form-container'>
            <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
                <h3 className='text-center'>Login Form</h3>
               
                <Form.Item label="Email" name="email">
                    <Input type='email' required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password' required/>
                </Form.Item>
                <p>Don`t have an account <Link to="/register">here</Link></p>
                <Button type='submit' className='btn btn-primary'>Login</Button>
            </Form>
         </div>
    )
}

export default Login;