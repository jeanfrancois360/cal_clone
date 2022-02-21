import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

import { signIn } from '../redux/actions/auth';
import { AppState } from '../redux/types';
import InputField from '../components/common/InputField';
import MsgText from '../components/common/MsgText';
import Link from 'next/link';
import { Snackbar } from '@mui/material';
import { clearErrors } from '../redux/actions/errors';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const Login = () => {
  const dispatch = useDispatch();
  const { message, isAuth } = useSelector(
    (state: AppState) => state.auth,
    shallowEqual
  );
  const { isLoading } = useSelector((state: AppState) => state.loader);
  const { error } = useSelector((state: AppState) => state.error, shallowEqual);
  const [logMessage, setLogMessage] = useState('');
  const [logError, setLogError] = useState('');
  const [open, setOpen] = useState(false);

  const handleLogin = (values: { password: string; email: string }) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (open) {
      setOpen(!open);
    }
    setLogMessage(message);
  }, [message, open]);
  useEffect(() => {
    if (open) {
      setOpen(!open);
    }
    setLogError(error);
  }, [error, open]);

  useEffect(() => {
    if (open) {
      setOpen(!open);
    }
    if (isAuth) {
      Router.push('/bookings');
    }
  }, [isAuth, open]);
  return (
    <>
      {logError && (
        <Snackbar
          open={!open}
          autoHideDuration={4000}
          key={'right'}
          onClose={() => setOpen(!open)}
        >
          <Alert
            onClose={() => {
              setOpen(!open);
              dispatch(clearErrors());
            }}
            severity="error"
            sx={{ width: '100%' }}
          >
            {logError}
          </Alert>
        </Snackbar>
      )}
      {logMessage && (
        <Snackbar
          open={!open}
          autoHideDuration={4000}
          key={'right'}
          onClose={() => setOpen(!open)}
        >
          <Alert
            onClose={() => {
              setOpen(!open);
              dispatch(clearErrors());
            }}
            severity="success"
            sx={{ width: '100%' }}
          >
            {logMessage}
          </Alert>
        </Snackbar>
      )}

      <div className="flex items-center justify-center w-screen h-screen bg-secondary">
        <div className="flex flex-col justify-center items-center min-h-[50vh] w-[50vw]">
          <span className="mt-5 text-2xl font-bold text-center">Cal.com</span>
          <span className="my-5 text-2xl font-bold text-center">
            Sign in to your account
          </span>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
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
                className="flex flex-col justify-start px-10 pb-5 pt-10 items-start min-h-[38vh] w-[30vw]  rounded-sm border-secondary bg-white shadow-md"
              >
                <>
                  <InputField
                    label="Email address"
                    type="text"
                    name="email"
                    inputClasses="mb-5"
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChange={handleChange('email')}
                  />
                  {touched.email && errors.email && (
                    <MsgText text={errors.email} textColor="danger" />
                  )}
                </>
                <>
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    isPassword={true}
                    url="#"
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                    inputClasses="mb-5"
                  />
                  {touched.password && errors.password && (
                    <MsgText text={errors.password} textColor="danger" />
                  )}
                </>
                <button
                  type="submit"
                  className={`w-full px-3 py-2 rounded-sm ${
                    !isValid ? 'bg-gray-300' : 'bg-primary'
                  } text-white`}
                  disabled={!isValid}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress size={25} style={{ color: 'white' }} />
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            )}
          </Formik>

          <div className="flex flex-row mt-5">
            <span>{`Don't have an account?`}</span>
            <Link href="/">
              <a className="font-bold">Create account</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
