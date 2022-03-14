import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Backdrop, CircularProgress, Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as Yup from "yup";

import MsgText from "@components/common/MsgText";

// Form validation
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Full Name"),
  email: Yup.string().email().required().label("Email"),
  note: Yup.string().label("Additional Note"),
});

// Event interface
interface IEvent {
  name: string;
  email: string;
  attendees?: string[];
  note?: string;
  eventType: number;
  date: any;
  time?: string;
}

const Book = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { eventTypeId, date, time } = router.query;

  const getEventType = async () => {
    const { data } = await axios.get(`/api/event-types/quick-chat`);
    return data;
  };

  const { data: event_types, isLoading: isLoadingFetch } = useQuery("event_types", getEventType);

  const handleBookEvent = async (data: IEvent) => {
    const { data: response } = await axios.post("/api/events/create", data);
    return response.data;
  };

  const {
    mutate,
    isLoading: isLoadingCreate,
    error,
  } = useMutation(handleBookEvent, {
    onSuccess: () => {
      setSuccessMsg("Event booked successfully");
      router.replace({ pathname: "/success" });
    },
    onError: () => {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = `${error.message}`;
      }
      setErrorMsg(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const handleConfirmEvent = (values: { name: string; email: string; note: string; attendees: string[] }) => {
    mutate({
      ...values,
      date: new Date(`${date}`),
      time: `${time}`,
      eventType: Number(event_types.data.id),
    });
  };

  return (
    <>
      <Head>
        <title>Confirm your 15min with Jean Francois | Cal.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid h-screen bg-gray-200 place-items-center">
        <div className="p-8 bg-white border border-gray-300">
          <div className="flex gap-12">
            <div className="pr-32 border-r border-gray-30">
              <div className="my-1">
                <Image
                  className="rounded-full shadow-md"
                  src={"/images/user.jpg"}
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
                <p className="text-green-600">{date}</p>
              </div>
            </div>
            <div>
              <Formik
                initialValues={{ name: "", email: "", note: "", attendees: ["john@gmail.com"] }}
                onSubmit={handleConfirmEvent}
                validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors, handleBlur, touched, isValid }) => (
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
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                      />
                      {touched.name && errors.name && <MsgText text={errors.name} textColor="danger" />}
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
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                      />
                      {touched.email && errors.email && <MsgText text={errors.email} textColor="danger" />}
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
                        onChange={handleChange("note")}
                        onBlur={handleBlur("note")}
                        name="note"
                        className="px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                        cols={30}
                        rows={3}
                        placeholder="please share anything that will help prepare for our meeting."
                      />
                      {touched.note && errors.note && <MsgText text={errors.note} textColor="danger" />}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="px-4 py-2 font-bold text-white bg-black rounded">
                        {isLoadingCreate ? (
                          <CircularProgress size={25} style={{ color: "white" }} />
                        ) : (
                          "Confirm"
                        )}
                      </button>
                      <button
                        type="submit"
                        onClick={() => router.push("/jeanfrancois/quick-chat")}
                        className="px-4 py-2 font-bold bg-gray-100 rounded">
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
