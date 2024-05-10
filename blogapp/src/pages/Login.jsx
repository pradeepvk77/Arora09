import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../component/InputField';
import authService from '../service/auth';
import { useDispatch } from 'react-redux';
import { login } from '../reduxstore/reducer/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailref = useRef(null)
  const passwordref = useRef(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = {
      email: emailref.current.value,
      password: passwordref.current.value
    }
    try {
      setError(null)
      setLoading(true)
      await authService.login(newForm)
      const userData = await authService.getCurrentUser();
      dispatch(login(userData));
      // const userData = id;
      // console.log(userData);
      navigate('/home')
    } catch (e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  };



  return (
    <div className="max-w-md mx-auto mt-16 p-4 my-28 bg-gray-500 border border-gray-300 border-opacity-40 bg-opacity-40 rounded-lg shadow-lg shadow-blue-600">
      <h2 className="text-2xl font-bold mb-4 pb-1">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email" type="email" placeholder = "xyz@gamil.com" ref={emailref} />
        <InputField label="Password" type="password" placeholder="*********"  ref={passwordref} />
        <div className='flex'>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Log in</button>
          <div className='loading'>
            {loading ? (<span className="spinner"></span>) : (null)}
          </div>
        </div>
      </form>
      <p className='mt-2 mb-0.5'>don't have account <Link to={'/signup'} className='ml-2 underline'  > Sign up</Link></p>
      {error ? <p className='text-red-500'>!!!{error}</p> : null}
    </div>
  );
};

export default Login;
