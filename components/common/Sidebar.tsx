import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// MUI IMPORTS
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import BackpackRoundedIcon from '@mui/icons-material/BackpackRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

// COMPONENTS IMPORTS
import CustomItem from './CustomItem';

const Sidebar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  return (
    <div className='h-screen w-[20%] border-r-2 border-secondary flex flex-col justify-between items-start bg-white'>
      <div className='flex flex-col justify-around w-full'>
        <span className='mx-2 my-3 text-base font-bold cursor-pointer'>
          Cal.com
        </span>
        <div className='mx-5'>
          <ul className='w-full'>
            <CustomItem
              url='/'
              imagePath={
                <AttachmentOutlinedIcon
                  width={20}
                  height={20}
                  className='-rotate-45'
                />
              }
              text='Event Types'
            />
            <CustomItem
              url='/bookings'
              imagePath={<BackpackRoundedIcon width={20} height={20} />}
            text='Bookings'
            />
            <CustomItem
              url='#'
              imagePath={<AccessTimeRoundedIcon width={20} height={20} />}
            text='Availability'
            />
            <CustomItem
              url='#'
              imagePath={
                <IntegrationInstructionsOutlinedIcon width={20} height={20} />
              }
            text='Integrations'
            />
            <CustomItem
              url='#'
              imagePath={<SettingsIcon width={20} height={20} />}
            text='Settings'
            />
          </ul>
        </div>
      </div>
      <div className='flex flex-col items-center w-full'>
        {isLoggingOut && (
          <button
            className='w-[80%] px-3 py-2 bg-secondary'
            onClick={() => {
              localStorage.removeItem('token');
              setIsLoggingOut(false);
              router.push('/');
            }}
          >
            Logout
          </button>
        )}
        <div
          className='w-[80%] cursor-pointer hover:bg-secondary mx-auto mb-5 rounded  py-3  flex flex-row items-center justify-between px-3'
          onClick={() => setIsLoggingOut(!isLoggingOut)}
        >
          <div className='flex items-center justify-center w-8 h-8 rounded-full cursor-pointer'>
            <Image src='/images/user.png' width={32} height={32} />
          </div>
          <div className='flex flex-col items-center justify-center w-[50%]'>
            <span className='text-xs'>jeanfrancois360</span>
            <span className='text-xs'>cal.com/jeanfrancois360</span>
          </div>
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <KeyboardArrowUpRoundedIcon
              width={12}
              height={12}
              className='cursor-pointer'
            />
            <KeyboardArrowDownRoundedIcon
              width={12}
              height={12}
              className='cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
