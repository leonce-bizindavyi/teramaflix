import React from 'react'
function ViewAll() {
  return (
    <>
        <div className="bg-white w-52 h-64 mt-6 rounded-lg">
          <div className="w-32 ml-10 py-4">
            <div className="ml-12 mt-20 absolute cursor-pointer border-2 rounded-full border-blue-600 shadow-xl bg-blue-300 hover:bg-white shadow-blue-800" id="plus_romances">
              <svg fill="none" viewBox="0 0 24 24"  strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path  strokeLinecap="round"  strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </div>
          </div>
        </div>
    </>
  )
}

export default ViewAll