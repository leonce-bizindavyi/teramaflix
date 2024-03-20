import React from 'react'

function Perform() {
  return (
    <>
      <div className="ml-0 -mt-6  sm:ml-64 sm:mt-[5rem]  md:mt-[4.8rem] lg:mt-[20rem] px-4 md:px-10 lg:px-0 " id="containerAccount">
          <div className="dark:bg-medium dark:shadow-medium dark:shadow-lg dark:ring-1 dark:ring-medium dark:border-2 dark:border-slate-600 p-6 sm:px-10 md:px-0  2xl:px-6 mb-8 sm:mb-[5rem] md:mb-[4.5rem] lg:mb-[2rem]  xl:px-2 lg:px-0 shadow-blue-500 shadow-lg bg-white md:ml-3 lg:ml-14 xl:ml-32 ml-0 lg:w-2/3 w-full   rounded-md lg:-mt-[16.3rem]  ring-1 ring-blue-600/50">
            <div className="dark:text-white text-center text-xl font-bold font-serif text-blue-600 mb-8">Control your video viewing experience</div>
            <div className="flex space-x-10 mb-8">
              <div className="flex-col">
                <label for="" className="dark:text-white font-bold ml-6 text-base text-purple-700">Quality</label>
              </div>
              <div className="flex-col py-2">
                <div className="flex items-center mb-4">
                  <input id="default-radio-1" type="radio"value="" name="default-radio" className="w-4 h-4 cursor-pointer"/>
                  <label for="default-radio-1" className="dark:text-white ml-2 text-sm font-medium text-gray-900">Low quality</label>
              </div>
              <div className="flex items-center mb-4">
                <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 cursor-pointer"/>
                <label for="default-radio-2" className="dark:text-white ml-2 text-sm font-medium text-gray-900">Medium quality</label>
            </div>
              <div className="flex items-center">
                  <input checked id="default-radio-3" type="radio" value="" name="default-radio" className="w-4 h-4 cursor-pointer"/>
                  <label for="default-radio-3" className="dark:text-white ml-2 text-sm font-medium text-gray-900">High quality</label>
              </div>
              </div>
            </div>
            <div className="flex space-x-7 mb-8">
              <div className="flex-col">
                <label for="" className="dark:text-white font-bold ml-6 text-base text-purple-700">Subtitles</label>
              </div>
              <div className="flex-col py-2">
                <div className="flex items-center mb-4">
                  <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="default-checkbox" className="dark:text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Always show captions</label>
                 </div>
                 <div className="flex items-center">
                   <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox" className="dark:text-white ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Include auto-generated captions (when available)</label>
                </div>
              </div>
          </div>
          <div className="flex space-x-5">
            <div className="flex-col">
              <label for="" className="dark:text-white font-bold ml-6 text-base text-purple-700">Browsing</label>
            </div>
            <div className="flex-col py-2">
              <div className="flex-row">
                 <label className="relative fex-col items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer"/>
                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                   <span className="dark:text-white sm:ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Inline playback</span>
               </label>
              </div>
              <div className="dark:text-white flex-row text-sm px-14">Play videos when you hover over them on the Home and Search pages</div>       
               

            </div>
          </div>
          </div> 



      </div>  
    </>
  )
}

export default Perform