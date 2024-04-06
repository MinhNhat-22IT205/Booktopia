import React from 'react'

export default function Spinner() {
  return (
    <div className="flex h-screen ">
      <div className="relative mx-auto my-auto ">
        <div
          className="w-16 h-16 rounded-full absolute
    border-[6px] border-solid border-[#f1eeff]"
        ></div>

        <div
          className="w-16 h-16 rounded-full animate-spin absolute
    border-[6px] border-solid border-[#6c5dd4] border-t-transparent"
        ></div>
      </div>
    </div>
  )
}
