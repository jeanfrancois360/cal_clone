import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import moment from 'moment';

const Success = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    const dateData = localStorage.getItem('date');
    const day = dateData !== null ? moment(dateData).format('dddd') : '';
    const date =
      dateData !== null ? moment(dateData).format('MMM Do YYYY') : '';
    const timeData = localStorage.getItem('time');
    const time = timeData !== null ? timeData : '';
    setDate(`${day}, ${date}`);
    setTime(time);
  });

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-secondary'>
      <div className='w-[40%] min-h-[60%] border-2 border-secondary bg-white flex flex-col justify-center items-center py-10'>
        <CheckCircleRoundedIcon
          className='text-green-500 '
          style={{ width: 75, height: 75 }}
        />
        <span className='text-base font-bold'>This meeting is scheduled</span>
        <span className='text-center'>
          We emailed you and the other attendees a calendar invitation with all
          <br />
          the details.
        </span>
        <div className='h-px w-[90%] mx-auto bg-primary my-5' />
        <div className='flex flex-row justify-between items-start w-[90%] mb-5'>
          <span className='text-base font-semibold w-[40%] -mt-2'>What</span>
          <span>
            15 Min Meeting between Jean Francois and Kalisa John
          </span>
        </div>
        <div className='flex flex-row  items-start w-[90%] mb-5'>
          <span className='-mt-2 text-base font-semibold w-[30%]'>When</span>
          <span>
            {date} <br />
            {time} - 15mins
            <span className='text-gray-400'>(Africa/Kigali)</span>
          </span>
        </div>
        <div className='h-px w-[90%] mx-auto bg-primary my-5' />
        <div className='w-[90%] flex flex-row justify-between items-center'>
          <span className='text-base font-semibold '>Add to calender</span>
          <button
            className='flex items-center justify-center w-12 h-12 border-2 border-primary'
            type='button'
          >
            <Image src='/images/google.png' width={25} height={25} />
          </button>
        </div>
        <div className='h-px w-[90%] mx-auto bg-primary my-5' />
        <span className='mb-5 text-gray-400'>
          Create your booking link with Cal.com
        </span>
        <div className='w-[90%] h-[2.5rem] flex flex-row border-2 border-primary'>
          <input
            type='text'
            className='h-full w-[70%] px-3 py-2 border-0 outline-none focus:outline-none'
            placeholder='mjeanfrancois360@gmail.com'
          />
          <button className='w-[30%] h-full bg-primary text-white flex justify-center items-center px-3 py-2'>
            Try it for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
