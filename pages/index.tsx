import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MsgText from '../components/common/MsgText'

import { signUp } from '../redux/actions/auth';
import { AppState } from '../redux/types';

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
            .required()
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            )
            .label("Password"),

});

const Register = () => {
  const dispatch = useDispatch();
  const { message, isLoading, isAuth } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { error } = useSelector((state: AppState) => state.error, shallowEqual);
  const [logMessage, setLogMessage] = useState('');
  const [logError, setLogError] = useState('');

  useEffect(() => {
    setLogMessage(message);
  }, [message]);
  useEffect(() => {
    setLogError(error);
  }, [error]);

  useEffect(() => {
    if (isAuth) {
      Router.push('/');
    }
  }, [isAuth]);

  // All form methods
  const handleSignup = (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    dispatch(signUp(values));
  };



  return (
    <>
      <div className='flex items-center justify-center w-screen h-screen bg-secondary'>
        <div className='w-[80%] min-h-[60%] flex justify-between items-start flex-row'>
          <div className='flex flex-col justify-start items-start min-h-full w-[50%]'>
            <span className='text-lg font-medium'>Cal.com</span>
            <p className='text-xl font-semibold mt-6'>
              You're one step away from simpler scheduling.
            </p>
            <p className='my-2 max-w-[450px] text-xs font-medium text-gray-500'>
              " I love being able to use a tool that just works, and that is
              open source. As a developer, I love being empowered to contribute
              to a tool that I use reguraly"
            </p>
            <div className='flex flex-row items-center justify-around'>
              <div className='flex items-center justify-center p-1'>
                <Image className='rounded-full shadow-md' src={'/images/user.jpg'} width={45} height={45} />
              </div>

              <div className='flex flex-col items-start justify-center mx-3 mt-2'>
                <p className='font-medium'>
                  Cassidy Williams
                  <span className='text-blue-500'>@cassidoo</span>
                </p>
                <span className='my-2 text-xs font-medium text-gray-400'>
                  Director of Developer Experience at Netilify
                </span>
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between items-start h-full w-[50%] border-2 border-gray bg-white'>
            <div className='w-full h-[80%] p-5 flex flex-col justify-start items-start'>
              <span className='text-sm font-bold'>
                Start your 14-day free trial
              </span>
              <span className='text-xs font-semibold text-gray-500'>
                <span className='text-gray-700'>No credit card required.</span> Try all pro features for 14 days.
              </span>
              <span className='mb-2 text-xs font-semibold text-gray-500'>
                Upgrade at any time to Pro for $12/month.
              </span>
               <div className="flex items-center w-full">
                    <div className="border-[0.025rem] border-gray-400 w-[48%] h-[0.025rem]" />
                    <KeyboardArrowDownIcon className="text-gray-400" />
                    <div className="border-[0.025rem] border-gray-400 w-[48%] h-[0.025rem]" />
                  </div>
              <Formik
                initialValues={{ username: '', email: '', password: '' }}
                onSubmit={handleSignup}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  handleBlur,
                  touched,
                  isValid,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className='flex flex-col justify-start pb-5 pt-10 items-start min-h-[38vh] w-full'
                  >
                    <>
                      <div className='flex flex-row w-full'>
                        <div className='font-bold text-xs text-gray-400 w-[20%] border-gray my-3 border-y-2 border-l-2 px-3 py-2 appearance-none leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm flex justify-center items-center'>
                          cal.com/
                        </div>
                        <input
                          type='text'
                          name='username'
                          placeholder='username'
                          value={values.username}
                          onBlur={handleBlur('username')}
                          onChange={handleChange('username')}
                          className={`border-gray my-3 border-2 px-3 py-2 appearance-none text-black leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm w-[80%]`}
                        />
                      </div>
                      {touched.username && errors.username && (
                        <MsgText
                            text={errors.username}
                            textColor="danger"
                        />
                      )}
                    </>
                    <>
                    <input
                         type='email'
                        name='email'
                        placeholder='Email'
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChange={handleChange('email')}
                          className={`border-gray my-3 border-2 px-3 py-2 appearance-none text-black leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm w-full`}
                        />
                      {touched.email && errors.email && (
                        <MsgText
                            text={errors.email}
                            textColor="danger"
                        />        
                      )}
                    </>

                    <>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChange={handleChange('password')}
                          className={`border-gray my-3 border-2 px-3 py-2 appearance-none text-black leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm w-full`}
                        />
        
                      {touched.password && errors.password && (
                        <MsgText
                            text={errors.password}
                            textColor="danger"
                        />
                      )}
                    </>

                    <button
                      type='submit'
                      className={`w-full my-2 px-3 py-2 rounded-sm  ${
                        !isValid ? 'bg-gray-300' : 'bg-primary'
                      } text-white`}
                      disabled={!isValid}
                    >
                      {isLoading ? (
                        <div className='flex items-center justify-center'>
                          <CircularProgress
                            size={25}
                            style={{ color: 'white' }}
                          />
                          <span className='ml-2'>Sign up for free</span>
                        </div>
                      ) : (
                        'Sign up for free'
                      )}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
            <div className='w-full h-[20%] bg-secondary border-t-2 border-gray px-5 py-3'>
              <p className='text-xs text-gray-500 font-semibold'>
                By sigining up, you agree to our
                <span className='mx-1 font-semibold text-black'>
                  Terms of services
                </span>
                and
                <span className='mx-1 font-semibold text-black'>
                  Privacy Policy
                </span>
              </p>
              <p className="text-xs font-semibold">
                Need help?
                <a href='#' className='mx-1 font-semibold text-black'>
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed left-[40%] bottom-10 shadow-2xl'>
        {logError && (
          <button
            type='button'
            onClick={() => setLogError('')}
            className='flex items-center justify-center w-full h-full'
          >
            <Alert severity='error'>{logError}</Alert>
          </button>
        )}
        {logMessage && (
          <button
            type='button'
            onClick={() => setLogMessage('')}
            className='flex items-center justify-center w-full h-full'
          >
            <Alert severity='success'>{logMessage}</Alert>
          </button>
        )}
      </div>
    </>
  );
};

export default Register;
