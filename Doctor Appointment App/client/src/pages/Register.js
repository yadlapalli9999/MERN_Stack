import React from 'react';
import '../styles/RegisterStyle.css';
import axios from 'axios';
import { Form, Input,message } from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const Register = ()=>{
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onFinishHandler = async(values)=>{
        console.log(values)
        try{
            dispatch(showLoading())
           const res = await axios.post(`/api/v1/users/register`,values);
           dispatch(hideLoading())
           if(res.data.success){
            message.success('Register Successfully!')
            navigate('/login')
           }
           else{
            message.error(res.data.message)
           }
        }
        catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('something went wrong')
        } 
    }
    return(
       <>
         <div className="form-container">
            <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
                <h3 className='text-center'>Register Form</h3>
                <Form.Item label="Name" name="name">
                    <Input type="text" required/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type="email" required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required/>
                </Form.Item>
                <p>Already have an account <Link to="/login">here</Link></p>
                <button type="submit" className='btn btn-primary'>Register</button>
            </Form>
         </div>
       </>
    )
}

export default Register;