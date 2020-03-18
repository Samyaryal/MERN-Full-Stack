import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes  from 'prop-types';
import {login } from '../../actions/auth';
const Login = ({ login , isAuthenticated }) => {
    const [formData, setFormData ] = useState({//same as this.setsate and setting the initial phase
       email: '',
       password: '',
    });
    const {email, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value }); // make a copy of formdata USUNG spread operator 
    const onSubmit=  async e => {
        e.preventDefault();
        login(email, password);
    };   
    if(isAuthenticated){
      return <Redirect  to="/dashboard" /> //redirect if loggedin
    }
    return (
      <Fragment>
        <div className="wrapper">
          <div className="form-wrapper-sign">
            <h1 className="large text-primary">Sign In</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
                />
              </div>
              <div className='form-group'>
                <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
                />
              </div>
            <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <div className='my-1'>
            <small>Don't have an account? <Link to='/register'>Sign Up</Link></small>
          </div>            
          </div>
        </div>
      </Fragment>       
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated  // checking if isauthenticated is valid 
});
export default connect(mapStateToProps, {login})(Login);

