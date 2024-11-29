import { removeAuthTokens } from "@/api/user.api";
import { GOOGLE_LOGIN_URL } from "@/constants/socialLogin";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "zustand";


const UserMenuContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    username,
    setUsername,
    setIsAuthenticated,
    setUserId,
  } = useStore(useAuthStore);

  const logoutMutation = useMutation({
    mutationFn: () => {
      return removeAuthTokens();
    },
    onSuccess: () => {
      setUsername(null);
      setIsAuthenticated(false);
      setUserId(null);

      if (pathname !== "/") {
        router.push("/");
      } else {
        router.refresh();
      }
    }
  })

  const handleMyPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/my-page/account-settings");
  }

  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutMutation.mutate();
  }

  if (username) {
    return (
      <div className="px-[24px] flex flex-col items-start py-[8px]">
        <button
          onClick={handleMyPageClick}
          className="text-white text-[16px] font-medium py-[16px]"
        >
          마이페이지
        </button>
        <button
          onClick={handleLogoutClick}
          className="text-white text-[16px] font-medium py-[16px]"
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    )
  }

  return (
    <div className="px-[24px] flex flex-col items-start py-[24px]">
      <Link href={GOOGLE_LOGIN_URL}>
        <span className="text-white text-[16px] font-medium py-[16px]">
          로그인
        </span>
      </Link>
    </div>
  )
}

export default UserMenuContent;