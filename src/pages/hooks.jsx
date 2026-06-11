import React from "react";
import { useState } from "react";
import Form from "./form.jsx";

function Hooks() {
  const [count, setCount] = useState(0);
  const handleIncrimante = () => {
    setCount(count + 2);
  };
  const handleDecrimante = () => {
    setCount(count - 1);
  };

  //   form modul

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <section className=" w-full h-full bg-gray-800 mt-20">
        {modal && <Form handleModal={handleModal} />}
        <div className=" bg-amber-200 mt-40">
          <h1 className="text-red-600">
            Counting :
            <span className=" text-green-400 ml-2 text-4xl">{count}</span>{" "}
          </h1>
          <button
            type="button"
            onClick={handleIncrimante}
            className="bg-green-800 px-3 py-3 m-3 rounded-3xl text-amber-100"
          >
            Incrimante +
          </button>
          <button
            type="button"
            onClick={handleDecrimante}
            className="bg-red-500 px-3 py-3 rounded-3xl hover:text-white"
          >
            Decrimante
          </button>

          <button
            type="button"
            onClick={handleModal}
            className="bg-green-500 p-2 ml-4"
          >
            Toggle Form
          </button>
        </div>
      </section>
    </>
  );
}

export default Hooks;

// import React from 'react'
// import {useState} from 'react'
// // import Form from "./Form"

// const Hooks=()=>{
//     const [count, setCount]=useState(0);
//     const handleIncrement=()=>{
//         setCount(count+2);
//     }
//     const handleDecrement=()=>{
//         setCount(count-1);
//     }

//     // const [modal,setModal]=useState(false);
//     // const handleModal=()=>{
//     //     setModal(!modal);
//     // }

//     return(
//         <div className='p-24'>
//         {/* {modal && <Form handleModal={handleModal}/>}  */}

//     <h1 className="text-2xl font-bold pb-7">Counting:{count}</h1>

//     <button type="button" onClick={handleIncrement} className="bg-blue-500 p-2">
//       Increment
//     </button>
// <button type="button" onClick={handleDecrement} className="bg-red-500 p-2 ml-4">
//       Decrement
//     </button>
//     {/* <button type="button" onClick={handleModal} className="bg-green-500 p-2 ml-4">
//       Toggle Form
//     </button> */}
//                 </div>
//     )
// }
// export default Hooks
