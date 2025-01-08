import { removeAuthTokens } from "@/api/user.api";
import { GOOGLE_LOGIN_URL } from "@/constants/socialLogin";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "zustand";
import UserMenuContentButton from "./UserMenuContentButton";


const UserMenuContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    username,
    userRole,
    setUserRole,
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
      setUserRole(null);

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

  const handleAdminPageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/admin/inquiries");
  }

  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutMutation.mutate();
  }

  if (username) {
    return (
      <div className="px-[24px] flex flex-col items-start py-[8px]">
        <UserMenuContentButton
          handleClick={handleMyPageClick}
          text="마이페이지"
        />
        {(userRole && userRole <= 2) && (
          <UserMenuContentButton
            handleClick={handleAdminPageClick}
            text="어드민 페이지"
          />
        )}
        <UserMenuContentButton
          handleClick={handleLogoutClick}
          text={logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
          disabled={logoutMutation.isPending}
        />
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