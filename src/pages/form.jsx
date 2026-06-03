import React from 'react'
import { IoMdClose } from "react-icons/io";
function Form({handleModal}) {
  return (
    <div className="flex flex-col gap-4 p-4 border-2rounded-md w-[20rem]">
<IoMdClose onClick={handleModal} className="self-end text-2xl cursor-pointer" />
        <input type="text" placeholder='Enter your name' className='border-2 border-gray-300 p-2 rounded-md' />
        <input type="email" placeholder='Enter your email' className='border-2 border-gray-300 p-2 rounded-md' />
        <textarea placeholder='Enter your message' className='border-2 border-gray-300 p-2 rounded-md'></textarea>
       <div className='flex fl-row gap-3.5'> <button type="submit" className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
       {/* <button type="button" onClick={handleModal} className='bg-red-500 text-white p-2 rounded-md ml-4 cursor-pointer' >
         Close
       </button> */}
       </div>
       
        

    </div>
  )
}

export default Form