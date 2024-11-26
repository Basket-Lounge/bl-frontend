'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";


interface IAdminUsersSearchBoxProps {
  pressEnterCallback?: () => void;
}

const AdminUsersSearchBox = ({ pressEnterCallback }: IAdminUsersSearchBoxProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState(searchParams.get('search') || '');

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (message.trim() === '') {
      params.delete('search')
    } else {
      params.set('search', message)
    }

    params.set('page', '1')

    return params.toString()
  }, [message, searchParams])

  const handleSearchWithKeywordsKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      pressEnterCallback && pressEnterCallback();
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