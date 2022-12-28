
import React from 'react';
import '../styles/RegisterStyle.css';
import axios from 'axios';
import { Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';

const Login = ()=>{
    let navigate = useNavigate();
    const onfinishHandler = async(values)=>{
        try{
           const res = await axios.post('/api/v1/users/login',values);
           if(res.data.success){
            localStorage.setItem("token",res.data.token)
              message.success('login successfully')
              navigate('/')
           }
           else{
            message.error(res.data.message)
           }
        }
        catch(error){
            console.log(error)
            message.error('Something went wrong')
        }
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
                <button type='submit' className='btn btn-primary'>Login</button>
            </Form>
         </div>
    )
}

export default Login;