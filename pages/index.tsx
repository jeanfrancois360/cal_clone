import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import MsgText from "@components/MsgText";

interface ServerSideProps {
  csrfToken: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Login = ({ csrfToken }: ServerSideProps) => {
  const router = useRouter();
  const [logMessage, setLogMessage] = useState("");
  const [logError, setLogError] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/private";

  const handleLogin = async (values: { password: string; email: string }) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
      setIsLoading(false);
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      setIsLoading(false);
      return;
    }
    console.log("login-details: ", values);
  };

  return (
    <>
      {logError && (
        <Snackbar open={!open} autoHideDuration={4000} key={"right"} onClose={() => setOpen(!open)}>
          <Alert
            onClose={() => {
              setOpen(!open);
              setLogError("");
            }}
            severity="error"
            sx={{ width: "100%" }}>
            {logError}
          </Alert>
        </Snackbar>
      )}
      {logMessage && (
        <Snackbar open={!open} autoHideDuration={4000} key={"right"} onClose={() => setOpen(!open)}>
          <Alert
            onClose={() => {
              setOpen(!open);
              setLogError("");
            }}
            severity="success"
            sx={{ width: "100%" }}>
            {logMessage}
          </Alert>
        </Snackbar>
      )}

      <div className="flex items-center justify-center w-screen h-screen bg-secondary">
        <div className="flex flex-col justify-center items-center min-h-[50vh] w-[50vw]">
          <span className="mt-5 text-2xl font-bold text-center">Cal.com...</span>
          <span className="my-5 text-2xl font-bold text-center">Sign in to your account</span>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}>
            {({ values, handleChange, handleSubmit, errors, handleBlur, touched, isValid }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start px-10 pb-5 pt-10 items-start min-h-[38vh] w-[30vw]  rounded-sm border-secondary bg-white shadow-md">
                <>
                  <div className="mt-1">
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
                </>

                <>
                  <div className="mt-3">
                    <label htmlFor="name" className="font-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onBlur={handleBlur("password")}
                      onChange={handleChange("password")}
                      className="w-full px-3 py-2 mb-2 border rounded focus:outline-none focus:shadow-outline"
                    />
                    {touched.password && errors.password && (
                      <MsgText text={errors.password} textColor="danger" />
                    )}
                  </div>
                </>
                <button
                  type="submit"
                  className={`w-full px-3 py-2 mt-4 rounded-sm ${
                    !isValid ? "bg-gray-300" : "bg-primary"
                  } text-white`}
                  disabled={!isValid}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress size={25} style={{ color: "white" }} />
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            )}
          </Formik>

          <div className="flex flex-row mt-5">
            <span className="mr-2">{`Don't have an account?`}</span>
            <Link href="/register">
              <a className="font-bold">Create account</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
