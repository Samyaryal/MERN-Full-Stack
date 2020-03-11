import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert } from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
const Register = ({setAlert, register, isAuthenticated})  => {
    const [formData, setFormData ] = useState({//same as this.setsate and setting the initial phase
       firstname: '',
       lastname: '',
       email: '',
       password: '',
       password2: ''
    });
    const {firstname, lastname, email, password, password2} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value }); // make a copy of formdata USUNG spread operator 
    const onSubmit=  async e => {
        e.preventDefault();
        if(password !== password2){
          setAlert('Passwords do not match', 'danger'); //danger is alert type that change that color
        }else{
          register({firstname, lastname, email, password});
      }
    };
    if(isAuthenticated) {
      return <Redirect to = "/dashboard" />
    }
    return ( 
      <Fragment>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1 className="large text-primary">Create Account</h1>
          <form className ="form" onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
              <label htmlFor="firstName">First Name</label>
              <input
              type='firstname'
              placeholder='First Name'
              name='firstname'
              value={firstname}
              onChange={e => onChange(e)}
              />   
            </div>
            <div className='form-group'>
              <label htmlFor="lastName">Last Name</label>
              <input
              type='lastname'
              placeholder='Last Name'
              name='lastname'
              value={lastname}
              onChange={e => onChange(e)}
              />  
            </div>
            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              />             
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password</label>
              <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="confirm-password">Confirm-Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
            </div>
            <input type='submit' className='btn btn-primary' value ='Register' />
           </form>
            <div className='my-1'>         
              <small>Already Have an Account?<Link to="/login">Sign In</Link></small> 
            </div>   
        </div>
      </div>
      </Fragment>
  );
};
Register.propTypes ={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}; 
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated }); // checking if isauthenticated is valid 
export default connect(mapStateToProps, {setAlert, register} ) (Register); //any state that we wanna map like alert, profile put as a firt parameter and second one is an onj with any action we wanna use
