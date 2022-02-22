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
import { AddEvent } from '../../redux/actions/booking';
import { AppState } from '../../redux/types';
import Image from 'next/image';
import MsgText from '../../components/common/MsgText';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Snackbar } from '@mui/material';
import { clearErrors } from '../../redux/actions/errors';
import { SettingsPowerRounded } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Full Name'),
  email: Yup.string().email().required().label('Email'),
  note: Yup.string().label('Additional Note'),
});

const Book = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [booking, setBooking] = useState('');
  const { booking_message } = useSelector((state: AppState) => state.booking);
  const {isLoading} = useSelector((state: AppState) => state.loader);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const selectedDate = localStorage.getItem('date');
    const dayData = moment(selectedDate).format('dddd');
    const newChosenDate = moment(selectedDate).format('MMM Do YYYY');
    const time = localStorage.getItem('time');
    setBooking(`${time}, ${dayData} ${newChosenDate}`);
  });

  const handleConfirmEvent = (values: {
    name: string;
    email: string;
    note: string;
    event_type_id: Number;
    attendees: any;
  }) => {
    const chosenDate = localStorage.getItem('date')
    const data = {...values as any, date: new Date(chosenDate !== null ? chosenDate : "")}
    dispatch(AddEvent(data))
  };

  useEffect(()=>{
    if(booking_message === "booked"){
        router.push('/bookings/success')
    } 
  }, [booking_message])


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
          initialValues={{ name: '', email: '', note: '', event_type_id: 1, attendees: []}}
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
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="note" className="font-bold">
                  Additional note
                </label>
                <textarea
                  value={values.note}
                  onChange={handleChange('note')}
                  onBlur={handleBlur('note')}
                  name='note'
                  className="px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                  cols={30}
                  rows={3}
                  placeholder="please share anything that will help prepare for our meeting."
                />
                 {touched.note && errors.note && (
                  <MsgText text={errors.note} textColor="danger" />
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="px-4 py-2 font-bold text-white bg-black rounded"
                >
                  {isLoading ? (
                      <CircularProgress size={25} style={{ color: 'white' }} />
                  ) : (
                    'Confirm'
                  )}
                  
                </button>
                <button
                  type="submit"
                  onClick={() => router.push('/bookings/create')}
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