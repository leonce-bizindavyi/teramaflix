import React from 'react'

function Payment() {
  return (
    <>
      <div class="ml-0 py-52 sm:ml-64  sm:py-80 px-4 md:px-10 lg:px-0" id="containerAccount">{/* <!--debut Payments--> */}
        <div class="dark:shadow-slate-700 dark:shadow-lg dark:bg-medium dark:ring-1 dark:ring-medium dark:border-2 dark:border-slate-600 flex flex-col p-2 sm:px-10 md:px-0  2xl:px-6   xl:px-2 lg:px-0 shadow-indigo-500 shadow-lg bg-gray-200 md:ml-5 lg:ml-14 xl:ml-32 ml-0 lg:w-2/3 w-full   rounded-md -mt-60  ring-1 ring-indigo-600/50">
          <p class="dark:text-white py-2 px-2 font-bold text-xl">Status</p>
          <div class="dark:bg-slate-700 bg-white">
            <p class="dark:text-white py-2 px-4 font-bold ">Incomplete monetization rules </p>
            <p class="dark:text-white py-2 px-4 text-sm">Your account can&apos;t earn money because it does no complete our <span class="dark:text-white text-blue-500 cursor-pointer">monetization rules for partners</span></p>
            <div class="py-5 px-4">
              <button type="button" class="dark:bg-gradient-to-r dark:from-slate-500 dark:via-slate-600 dark:to-slate-700 dark:hover:bg-gradient-to-br dark:shadow-medium px-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">See account eligibility</button>
            </div> 
          </div>
          <p class="dark:text-white py-4 px-2 font-bold text-xl">Tools to try </p>
          <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-3 lg:space-y-0">
            <div class="dark:bg-slate-700 bg-white w-[100%]">
              <p class="dark:text-white py-2 px-4 font-bold">In-Stream Ads</p>
              <p class="dark:text-white py-2 px-4 text-sm">Short Ads you can include in your videos to make money. </p>
              <div class="flex space-x-8 py-2 px-4">
                <div>
                  <p class="dark:text-white text-gray-500 font-bold">Ideal for</p>
                  <p class="dark:text-white py-2 text-sm">Imported videos</p>
                  <p class="dark:text-white py-2 text-sm">Ad-compatible content </p>
                </div>
                <div>
                  <p class="dark:text-white text-gray-500 font-bold">Eligibility</p>
                  <p class="dark:text-white text-sm py-2">1,000 followers </p>
                  <p class="dark:text-white text-sm">And</p>
                  <p class="dark:text-white text-sm">A total of 60,000 eligible minutes viewed in the last 60 days </p>
                  <p class="dark:text-white text-sm">And</p>
                  <p class="dark:text-white text-sm">5 active videos on your account</p>
                </div>
              </div><br/>
              <div class="py-8 px-4">
                <button type="button" class="dark:bg-gradient-to-r dark:from-slate-500 dark:via-slate-600 dark:to-slate-700 dark:hover:bg-gradient-to-br dark:shadow-medium px-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Learn more</button>
              </div>
            </div>
            <div class="dark:bg-slate-700 bg-white w-[100%]">
              <p class="dark:text-white py-2 px-4 font-bold">Subscriptions</p>
              <p class="dark:text-white py-1 px-4 text-sm">Create a Subscriptions for your account and earn monthly income.  Choose a monthly price, offer exclusive benefits and grow the community of people who subscribe to support you.  Learn more about how subscriptions can support your content</p>
                <div class="flex space-x-4 py-2 px-4">
                  <div>
                    <p class="dark:text-white text-gray-500 font-bold">Ideal for</p>
                    <p class="dark:text-white py-2 text-sm">Designers and brands with many active subscribers</p>
                    <p class="dark:text-white py-2 text-sm">Designers and brands with added value to offer to subscribers</p>
                  </div>
                  <div>
                    <p class="dark:text-white text-gray-500 font-bold">Eligibility</p>
                    <p class="dark:text-white py-2 text-sm">Currently by invitation only</p>
                  </div>
                </div>
                <div class="py-8 px-4">
                  <button type="button" class="dark:bg-gradient-to-r dark:from-slate-500 dark:via-slate-600 dark:to-slate-700 dark:hover:bg-gradient-to-br dark:shadow-medium px-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Learn more</button>
                </div>
              </div>
            </div>
          </div>
        </div>

              {/* <!--fin Payments--> */}
    </>
  )
}

export default Payment
