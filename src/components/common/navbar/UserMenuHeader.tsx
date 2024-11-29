import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";


const UserMenuHeader = () => {
  const {
    username,
  } = useStore(useAuthStore);

  if (username) {
    return (
      <div className="p-[24px]">
        <div className="text-white text-[14px] flex flex-col gap-[8px]">
          <span>환영합니다,</span> 
          <span className="text-[16px] font-semibold line-clamp-1">{username}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-[24px]">
      <div className="text-white text-[14px] flex flex-col gap-[8px]">
        <span>환영합니다!</span> 
      </div>
    </div>
  )
}

export default UserMenuHeader;