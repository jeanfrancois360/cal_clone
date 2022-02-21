import Image from 'next/image';
import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Confirmation = () => {
  return (
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
              <p className="text-green-600">4:30pm</p>
            </div>
          </div>
          <div>
            <form action="#">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-bold">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="name" className="font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mt-4">
                <p className="font-bold">+ Additional Guests</p>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="notes" className="font-bold">
                  Additional notes
                </label>
                <textarea
                  name="notes"
                  className="px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                  cols={30}
                  rows={3}
                  placeholder="please share anything that will help prepare for our meeting."
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-black rounded"
                >
                  Confirm
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold bg-gray-100 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
