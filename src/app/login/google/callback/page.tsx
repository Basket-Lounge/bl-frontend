'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useGoogleAuth from "@/hooks/useGoogleAuth";


const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    isError,
    isLoading,
    isSignedIn,
    submitGoogleLoginCode
  } = useGoogleAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      submitGoogleLoginCode(code);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn]);

  return (
    <div>
      {isLoading && <p>로그인 중...</p>}
      {(!isLoading && !isError && !isSignedIn) && <p>구글 로그인 리다이렉트 페이지 입니다</p>}
      {(!isLoading && isError) && <p>로그인 중 오류가 발생했습니다.</p>}
      {(!isLoading && isSignedIn) && <p>홈페이지로 리다이렉팅 중...</p>}
    </div>
  )
}

export default GoogleCallbackPage;