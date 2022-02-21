import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';

import InputField from '../../components/common/InputField';
import Image from 'next/image';
import MsgText from '../../components/common/MsgText';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  notes: Yup.string().label('Additional Notes'),
});

const Book = () => {
  const router = useRouter();
  const [booking, setBooking] = useState('');
  useEffect(() => {
    const dateData = localStorage.getItem('date');
    const dayData = moment(dateData).format('dddd');
    const newDateData = moment(dateData).format('MMM Do YYYY');
    const time = localStorage.getItem('time');
    setBooking(`${time}, ${dayData} ${newDateData}`);
  });

  const handleConfirmEvent = (values: {
    name: string;
    email: string;
    notes: string;
  }) => {
    console.log(values);
    router.push({
      pathname: '/success',
      query: { date: `${booking}` },
    });
  };
  return (
    <>
      <Head>
        <title>Confirm your 15min with Jean Francois | Cal.com</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className="grid h-screen bg-gray-200 place-items-center">
      <div className="p-8 bg-white border border-gray-300">
        <div className="flex gap-12">
          <div className="pr-32 border-r border-gray-30">
            <div className="my-1">
              <Image
                className="rounded-full shadow-md"
                src={'/images/user.jpg'}
                alt=""
                width={48}
                height={48}
              />
            </div>
            <h4 className="font-bold text-gray-400">Christina Keza</h4>
            <h2 className="mb-4 text-2xl font-bold">15 Min Meeting</h2>
            <div className="flex gap-2 mb-4">
              <AccessTimeIcon color="action" />
              <p className="text-gray-500">15 Minutes</p>
            </div>
            <div className="flex gap-2 mb-4">
              <CalendarTodayIcon color="success" />
              <p className="text-green-600">{booking}</p>
            </div>
          </div>
          <div>
             <Formik
          initialValues={{ name: '', email: '', notes: '' }}
          onSubmit={handleConfirmEvent}
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
            <form action="#">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                />
                 {touched.name && errors.name && (
                 <MsgText text={errors.name} textColor="danger" />
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="name" className="font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                   value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                />
                {touched.email && errors.email && (
                 <MsgText text={errors.email} textColor="danger" />
                )}
              </div>
              <div className="mt-6">
                <p className="font-bold">+ Additional Guests</p>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="notes" className="font-bold">
                  Additional notes
                </label>
                <textarea
                  value={values.notes}
                  onChange={handleChange('notes')}
                  onBlur={handleBlur('notes')}
                  name='notes'
                  className="px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                  cols={30}
                  rows={3}
                  placeholder="please share anything that will help prepare for our meeting."
                />
                 {touched.notes && errors.notes && (
                  <MsgText text={errors.notes} textColor="danger" />
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                   disabled={!isValid}
                  className="px-4 py-2 font-bold text-white bg-black rounded"
                >
                  Confirm
                </button>
                <button
                  type="submit"
                  onClick={() => router.push('/jeanfrancois360/15min')}
                  className="px-4 py-2 font-bold bg-gray-100 rounded"
                >
                  Cancel
                </button>
              </div>
             </form>
          )}
        </Formik>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Book;
