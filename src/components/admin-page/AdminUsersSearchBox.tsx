'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


const AdminUsersSearchBox = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState(searchParams.get('search') || '');

  const createQueryString = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (message.trim() === '') {
      params.delete('search')
    } else {
      params.set('search', message)
    }

    return params.toString()
  }

  const handleSearchWithKeywordsKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      router.push(pathname + "?" + createQueryString())      
    }
  };

  return (
    <div className="bg-white rounded-full py-[12px] px-[20px] flex items-center">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="bg-transparent text-black outline-none grow"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleSearchWithKeywordsKeyDown}
      />
    </div>
  )
}

export default AdminUsersSearchBox;