import React from 'react';

function Privacy() {
  return (
    <>
      <div className="ml-0 sm:ml-64  px-4 md:px-10 lg:px-0 " id="containerAccount">
        <div className="dark:bg-medium dark:shadow-medium dark:shadow-lg dark:ring-1 dark:ring-medium dark:border-2 dark:border-slate-600 p-6 sm:px-10 md:px-0 2xl:px-6 xl:px-2 lg:px-0 shadow-blue-500 shadow-lg bg-white md:-ml-8 lg:ml-14 xl:ml-32 ml-0 lg:w-2/3 w-full rounded-md -mt-6 mb-4 sm:mb-6 sm:mt-[1rem] md:mt-4 md:mb-4 lg:mt-[1.4rem] lg:mb-4 ring-1 ring-blue-600/50">
          <div className="dark:text-white text-center text-xl text-blue-600 mb-8 font-bold font-serif">Manage what you share on TeramaFlix</div>
          <div className="md:flex mb-8">
            <div className="py-4 md:flex-col">
              <label htmlFor="" className="dark:text-white ml-6 text-lg font-semibold font-serif text-blue-700">Playlists and <span className="dark:text-white md:px-6 font-semibold font-serif text-blue-700">subscriptions</span></label>
            </div>
            <div className="md:flex-col py-5">
              <div className="flex-row mb-10">
                <div className="flex-row">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="dark:text-white ml-3 text-sm font-medium text-gray-900 text-purple-700">Keep all my saved playlists private</span>
                  </label>
                </div>
                <div className="dark:text-white flex-row text-sm px-14">Playlists created by others won&apos;t appear on your channel. Playlists created by you have separate, individual privacy settings.</div>
              </div>
              <div className="flex-row">
                <div className="flex-row">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="dark:text-white ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 text-purple-700">Keep all my subscriptions private</span>
                  </label>
                </div>
                <div className="dark:text-white flex-row text-sm px-14">Your subscriptions won&apos;t be visible to others, unless you use features that make them public.</div>
              </div>
            </div>
          </div>
          <div className="md:flex">
            <div className="py-2 md:flex-col">
              <label htmlFor="" className="dark:text-white font-semibold ml-6 text-lg font-serif text-blue-700">Ads on <span className="dark:text-white md:px-6 font-semibold font-serif text-blue-700">TeramaFlix</span></label>
            </div>
            <div className="md:flex-col py-5">
              <div className="dark:text-white flex-row text-sm md:px-14">You may see ads on TeramaFlix based on general factors, like the topic of a video. The ads you see mayalso depend on your choices on My Ad Center. To learn more about how ads work for family accounts with kids, visit the Google for Families Help Center.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Privacy;