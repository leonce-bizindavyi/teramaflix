import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '@/styles/fonts.module.css'

function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const initialValues = {
    mail: "",
    password: ""
  }


  const handleShowPassword = async (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }
  const handleForgetPassword = () => {
    router.push('/changePassword')
  }
  const handleLogin = async (data) => {
    setLoading(true)
    const response = await fetch(`/api/login/${data.mail}/${data.password}`);
    if (response.ok) {
      const data = await response.json();
      if (data) {
        localStorage.setItem('token', data.token)
        if (data.admin === 1) {
          router.push('/dashboard')
        } else if (data.admin === 0) {
          router.push('/')
        }
      }
    }
    else {
      const data = await response.json();
      if (data.message === "Email invalide") {
        setErrmail(data.message)
      } else {
        setErrpass(data.message)
      }

      console.log(`Erreur : ${response.status}${response.statusText} `);
    }
    setLoading(false)
  }
  const validationSchema = Yup.object().shape({
    mail: Yup.string().required("You must input a mail !").email("Invalid email address!"),
    password: Yup.string()
      .required("You must input a password !")
  })
  return (
    <>
      <div className="flex flex-col items-center justify-center   h-max lg:flex-row bg-no-repeat lg:bg-repeat bg-[url('/logo/loginwall.jpg')] bg-contain bg-bottom  lg:bg-left bg-white font-quicksand">
        <div className="image w-[100%] lg:w-[50%] h-max  lg:h-screen flex justify-center items-center">
        <Image src={`/logo/TeramaFlixpic.png`} width={280} height={280} className="  object-cover w-[180px] sm:w-[280px]  h-[180px] sm:h-[280px] mt-3" alt=""/>
      <Image src={`/logo/TeramaFlixnam.png`} width={280} height={280} className=" hidden lg:block   object-cover  mt-3" alt=""/>
        </div>
        <div className="w-[90%] h-[60%] sm:h-[45%] lg:w-[30%] lg:h-screen shadow-lg shadow-blue-300  flex justify-center items-center  rounded-lg mt-3">
          <div className="flex lg:justify-center flex-col items-center space-y-2 w-full h-full lg:h-[400px] bg-gray-100  mx-2 my-2 rounded-lg  ">
            <h1 className='text-[1.5rem] sm:text-[3rem] lg:text-[2rem] text-blue-500 font-semibold'>Login</h1>

            <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema} >
              <Form>
                <div className='loginContainer  relative flex flex-col justify-center items-center space-y-4 w-full h-full'>
                  {/* <!--debut email--> */}
                  <div className='flex flex-col space-y-2'>
                    <h2 className="text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Email</h2>
                    <div className="flex flex-row px-1 bg-white space-x-1 justify-center w-max items-center shadow-lg ring shadow-blue-500 hover:ring-blue-500 rounded-xl overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 text-slate-500 font-bold">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      <Field type="email" name="mail" id="emailid" placeholder="Your email"
                        className=" rounded-xl sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64 p-3 text-md sm:text-xl lg:text-sm font-semibold text-slate-600 focus:outline-none" />
                    </div>
                    <ErrorMessage name="mail" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span" />
                  </div>

                  {/* <!--fin email-->
              
              <!--debut password--> */}
                  <div className='flex flex-col space-y-2'>
                    <h2 className=" text-xl sm:text-3xl lg:text-lg text-slate-600  font-semibold">Password</h2>
                    <div className="flex flex-row relative  px-1 bg-white space-x-1 justify-center w-max items-center shadow-lg ring shadow-blue-500 hover:ring-blue-500 rounded-xl overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6  text-lg font-semibold text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                      <Field type={showPassword ? "text" : "password"} name="password" id="password_field" placeholder="Your password"
                        className=" rounded-xl sm:h-20 lg:h-10 h-12  w-64 sm:w-[27rem] lg:w-64   
                      p-3 font-semibold text-md sm:text-xl lg:text-sm   focus:outline-none"/>
                      {!showPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500" id="show_password" name="eye_show ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={handleShowPassword} className="sm:w-8 w-6 lg:w-6 sm:h-8 h-6 lg:h-6 absolute right-2 cursor-pointer hover:text-blue-500  text-slate-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      }
                    </div>
                    <ErrorMessage name="password" className='text-red-800 text-xs sm:text-xl  lg:text-xs' component="span" />
                  </div>
                  {/* <!--fin password-->
              <!--debut forget password and remember me--> */}
                  <div className="flex    mt-3">
                    <div className="flex-col space-y-3 w-[100%]">
                      <div className='flex flex-row justify-center space-x-2'>
                        <input type="checkbox" className=" checked:bg-blue-500" />
                        <span className="text-md sm:text-2xl lg:text-sm font-semibold ">Remember me</span>
                      </div>
                      <span onClick={handleForgetPassword} className="text-md sm:text-2xl  lg:text-sm font-semibold text-blue-500 cursor-pointer">forget password ?</span>
                    </div>
                  </div>
                  {/* <!--fin forget password and remember me-->
            <!--debut boutton valider--> */}
                  <div className="flex ">
                    <button type="submit"
                      className={`bg-purple-600 hover:bg-purple-700 text-white text-lg sm:text-2xl  lg:text-sm font-bold rounded-lg w-64 h-8 sm:h-10 lg:h-8 ${loading ? 'animate-pulse' : ''}`}

                      disabled={loading}
                    >
                      {loading ? 'Signing...' : 'Sign in'}
                    </button>
                  </div>
                  {/* <!--fin boutton valider--> */}
                </div>

              </Form>
            </Formik>
            {/* <!--debut haven't account and create it--> */}
            <div className="flex  space-x-5">
              <span className="font-semibold  text-md sm:text-2xl lg:text-sm">Haven{"'"}t an account?</span>
              <Link href="/signup"> <span className="font-semibold text-md sm:text-2xl lg:text-sm text-blue-500  cursor-pointer">Create an account</span></Link>
            </div>
            <Link href="/">
              <div className="p-3 mb-5 grid grid-cols-2 place-items-center -space-x-1 md:space-x-0 lg:-space-x-1">
                <div className='text-blue-700 font-semibold'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                  </svg>
                </div>
                <div className='mt-2'>
                  <span className='text-blue-700 font-semibold text-md lg:text-lg'>Home</span>
                </div>
              </div>
            </Link>
            {/* <!--fin haven't account and create it--> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login