'use client'

import { useState } from "react";


const UserCommentsSearchBox = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="bg-white rounded-full py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="bg-transparent text-black outline-none grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  )
}

export default UserCommentsSearchBox;