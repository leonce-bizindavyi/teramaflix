import React from 'react'
import { useState, useEffect, useContext } from 'react'
import bcrypt from 'bcryptjs/dist/bcrypt';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionContext } from '../context/Auth';
import { useRouter } from 'next/router';

function Account() {
  const router = useRouter()
  const Auth = useContext(SessionContext);
  const [nom, setNom] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [errors, setErrors] = useState({})
  const [statusPass, setStatusPass] = useState(false);
  const [statusCpass, setStatusCpass] = useState(false);

  const updated = () => {
    toast.success('Updated Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleChangeStatusPass = (e) => {
    e.preventDefault();
    setStatusPass(!statusPass);
  }
  const handleChangeStatusCpass = (e) => {
    e.preventDefault();
    setStatusCpass(!statusCpass);
  }
  useEffect(() => {
    if (Auth.session) {
      const fetchUser = async () => {
        try {
          if (Auth.session.ID != " ") {
            handleUpdate();
          }
        } catch (error) {
          console.log('Error fetching user:', error);
        }
      };
      fetchUser();

      async function handleUpdate() {
        const response = await fetch(`/api/update/${Auth.session.ID}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            const result = data.results[0];
            setNom(result[0].PageName);
            setMail(result[0].Mail);
          } else {
            console.log('No data to display!!');
          }
        } else {
          console.log('Error in your request');
        }
      }
    }
  }, [Auth.session]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    const errors = {};
    if (!nom.trim()) {
      errors.nom = 'complete this field';
    }
    if (!password.trim()) {
      errors.password = 'complete this field';
    }
    if (password !== cpassword) {
      errors.cpassword = 'unmatched passwords';
    }
    if (!mail.trim()) {
      errors.mail = 'complete this field';
    } else if (!isValidEmail(mail)) {
      errors.mail = 'invalid email';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      let pass = event.target.password.value
      const saltRounds = 10
      bcrypt.hash(pass, saltRounds, async (error, hash) => {
        if (error) {
          console.log("error")
        }
        else {
          try {
            const response = await fetch('/api/updateUser', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: Auth.session.ID,
                nom: event.target.nom.value,
                mail: event.target.mail.value,
                password: hash
              })
            })
            const data = await response.json()
            if (response.ok) {
              if (data.success) {
                updated();
                setPassword('')
                setCpassword('')
                localStorage.setItem('token', data.token)
                setTimeout(() => {
                  router.reload()
                }, 3000);
              } else {
                console.error('update failed');
              }
            }
            else {
              console.log('Error updating user:', response.status, response.statusText);
            }
          }
          catch (error) {
            console.error(error.message)
          }
        }
      })

    }
  }
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <form className="dark:bg-medium ml-0 px-5 sm:ml-[14rem] -mt-[1.5rem] sm:mt-[4.5rem] lg:mt-[1rem] lg:mb-3 " onSubmit={handleSubmit} id="containerAccount">
        <div className="dark:bg-medium dark:shadow-lg dark:shadow-medium dark:border-2 dark:border-slate-600 relative shadow-blue-500 shadow-lg  rounded-md mb-[3rem] sm:mb-[4rem] lg:mb-[0.8rem] dark:ring-1 dark:ring-medium ring-1 ring-blue-600/50 sm:w-[20rem] lg:w-[28rem] h-[33rem]  sm:mx-auto  lg:ml-[19rem]">
          <div className="dark:bg-medium grid grid-cols-1 gap-y-[2rem]  place-items-center  ">

            <div className="mt-[2rem]  flex  justify-center">
              <div className='relative'>
                <label htmlFor="first name and last name" className="dark:text-white flex justify-center text-sm text-blue-700 font-bold font-serif ">First Name And Last Name</label>
                <input type="text" value={nom} id='first name and last name' name="nom" onChange={(e) => setNom(e.target.value)} className=" dark:shadow-md dark:shadow-medium  dark:focus:outline-slate-700  mt-1 shadow-blue-500 font-serif  text-center shadow-md rounded-lg focus:outline-blue-600 focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-2 bg-gray-100  py-2 -pr-5 w-[14rem] sm:w-72 md:w-48 xl:w-60 " />
                {errors.nom && <span className="dark:text-white absolute whitespace-nowrap font-serif font-semibold text-red-700  animate-pulse grid place-items-start -mt-5 ml-3 sm:ml-[4rem] md:right-[1.5rem] lg:ml-[3rem]">{errors.nom}</span>}
              </div>
            </div>

            <div className="  flex  justify-center">
              <div className="relative">
                <label htmlFor="password" className="dark:text-white flex justify-center text-sm text-blue-700 font-bold font-serif">Password</label>
                <input type={statusPass ? "text" : "password"} placeholder="password" name="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className="dark:shadow-md dark:shadow-medium   dark:focus:outline-slate-700 shadow-blue-500 font-serif mt-1  text-center shadow-md rounded-lg focus:outline-blue-600 focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-2 bg-gray-100 py-2 -pr-5 w-[14rem] sm:w-72 md:w-48 xl:w-60 " />
                {errors.password && <span className="dark:text-white absolute whitespace-nowrap font-serif font-semibold text-red-700  animate-pulse grid place-items-start -mt-5 ml-3 sm:ml-[4rem] md:right-[1.5rem] lg:ml-[3rem]">{errors.password}</span>}
                {
                  !statusPass ? (
                    <button className="absolute right-1 top-7" onClick={handleChangeStatusPass}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dark:text-slate-700 w-7 h-7 text-blue-700 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    </button>
                  ) :

                    (
                      <button className="absolute right-1 top-7" onClick={handleChangeStatusPass}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dark:text-slate-700 w-7 h-7 text-blue-700 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    )
                }

              </div>
            </div>

            <div className="  flex  justify-center   ">
              <div className="relative">
                <label htmlFor="confirm password" className="dark:text-white flex justify-center text-sm text-blue-700 font-bold font-serif">Confirm Password</label>
                <input type={statusCpass ? "text" : "password"} name="cpassword" id='confirm password' value={cpassword} placeholder="confirm password" onChange={(e) => setCpassword(e.target.value)} className="dark:shadow-md dark:shadow-medium  dark:focus:outline-slate-700 shadow-blue-500 font-serif mt-1  text-center shadow-md rounded-lg focus:outline-blue-600 focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-2 bg-gray-100  py-2 -pr-5 w-[14rem] sm:w-72 md:w-48 xl:w-60 " />
                {errors.cpassword && <span className="dark:text-white absolute whitespace-nowrap font-serif font-semibold text-red-700  animate-pulse grid place-items-start -mt-5 ml-3 sm:ml-[4rem] md:right-[1.5rem] lg:ml-[3rem]">{errors.cpassword}</span>}
                {
                  !statusCpass ? (
                    <button className="absolute right-1 top-7" onClick={handleChangeStatusCpass}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dark:text-medium w-7 h-7 text-blue-700 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    </button>
                  ) :

                    (
                      <button className="absolute right-1 top-7" onClick={handleChangeStatusCpass}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="dark:text-medium w-7 h-7 text-blue-700 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    )
                }
              </div>
            </div>

            <div className="  flex  justify-center   ">
              <div className="relative">
                <label htmlFor="email" className="dark:text-white flex justify-center text-sm text-blue-700 font-bold font-serif">Email</label>
                <input type="mail" name="mail" value={mail} id='email' onChange={(e) => setMail(e.target.value)} className="dark:shadow-md dark:shadow-medium dark:focus:outline-slate-700 shadow-blue-500 font-serif mt-1  text-center shadow-md rounded-lg focus:outline-blue-600 focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-2 bg-gray-100 py-2 -pr-5 w-[14rem] sm:w-72 md:w-48 xl:w-60 " />
                {errors.mail && <span className="dark:text-white absolute whitespace-nowrap font-serif font-semibold text-red-700  animate-pulse grid place-items-start -mt-5 ml-3 sm:ml-[4rem] md:right-[1.5rem] lg:ml-[3rem]">{errors.mail}</span>}
              </div>
            </div>
            <div className='mt-[1rem]'>
              <div className="dark:bg-slate-700 dark:hover:bg-slate-600 dark:shadow-lg dark:shadow-dark-slate-600 bg-blue-600 w-[8rem] grid place-items-center hover:bg-blue-900 shadow-lg shadow-blue-500 rounded-lg h-[3rem]">
                <button type='submit' className='text-2xl text-white font-serif'>Update</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Account