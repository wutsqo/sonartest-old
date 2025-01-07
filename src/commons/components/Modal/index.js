import React from 'react'

const Modal = props => {
  if (!props.isShow) return <></>

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/[0.3] z-10 p-8 sm:p-0">
      <div
        id="putih"
        className="flex flex-col justify-between gap-6 sm:h-[30%] w-full sm:w-[30%] bg-white rounded-lg shadow-xl p-5"
      >
        <h2 className="text-lg font-bold m-0 sm:mt-4">{props.title}</h2>
        <div className="flex flex-col justify-between items-center gap-5 h-full">
          <p>{props.text ? props.text : 'Apakah anda yakin?'}</p>
          <div className="flex justify-evenly items-center gap-5 sm:w-3/4">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
