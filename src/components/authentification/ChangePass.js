import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

function ChangePass() {
  const [email, setEmail] = useState('')
  const [errmail, setErrMail] = useState("")
  const [sended, setSended] = useState(false)
  const router = useRouter()
  const sendLink = async () => {
    if (email !== "") {
      const addData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: email
        })
      };
      setErrMail('')
      const res = await fetch(`/api/changePass`, addData);
      const response = await res.json();

      console.log("mess:", response.response);
      if (response.response.message !== "success") {
        if (response.response.message == "validationError") {
          response.response.data.issues.map(err => {
            if (err.path == 'userMail') setErrMail(err.message)
          })
        }
        if (response.response.data == "errorMail") {
          setErrMail(response.response.error)
        }
        return;
      } else {
        setSended(true)
        console.log("inside");
        router.push('/waitchngpass')
      }


    }
    else {
      setErrMail("The mail must be completed")
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

            <div className="max-w-md mx-auto ">
              <div className=' flex justify-center h-28 w-full '>
                <Image src={`/logo/TeramaFlixpic.png`} width={280} height={280} alt="logo" className="w-28 h-full" />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="bg-white  rounded flex flex-col justify-center">
                    <h2 className="text-2xl text-center font-bold mb-6">Find your account</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-bold mb-2" for="email">
                        Email
                      </label>
                      <input name="mail" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email"
                        type="email" placeholder="enter your email" />
                      <span className="">  </span>
                    </div>
                    <button onClick={sendLink} name="changemod" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded text-sm focus:outline-none focus:shadow-outline" type="submit">
                      Send Link
                    </button>
                  </div>
                </div>
                <div className="pt-6 text-base leading-6  sm:text-sm sm:leading-7">
                  <p>Return to   <Link href="/login" className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">Log in !</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePass