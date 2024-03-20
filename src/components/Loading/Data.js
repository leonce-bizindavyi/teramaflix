import React from 'react'

function Data() {
    return (
        <>
            <div className='grid grid-cols-1 palce-items-center items-center'>
                <div className="imag h-[170px] w-[100%] overflow-hidden rounded">
                    <div className="content-placeholder h-[100%] w-[100%] bg-gray-300 object-cover"></div>
                </div>
                <div>
                    <div className=" flex justify-start space-x-2 ">
                        <div className="content-placeholder ml-15 my-1 h-8 w-12 rounded-full bg-gray-300 lg:h-10 lg:w-10" />
                        <div className="flex flex-col w-24 space-y-2">
                            <div className="right-1 py-2 flex flex-col space-y-1 items-center">
                                <div className="content-placeholder mx-2 lg:w-24 lg:h-5 text-sm font-medium text-gray-300"></div>
                                <div className="content-placeholder mx-2 w-24 h-5 lg:w-24 lg:h-5 text-sm font-medium text-gray-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Data