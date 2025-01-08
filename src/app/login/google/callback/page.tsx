'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import ErrorHandler from "@/components/common/error/ErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth.stores";
import { useStore } from "zustand";
import { getAuthTokens } from "@/api/user.api";
import Typed from "typed.js";


const GoogleCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const loadingTextRef = useRef<HTMLParagraphElement>(null);

  const { 
    setUsername, 
    setUserId,
    setIsAuthenticated 
  } = useStore(useAuthStore);
  
  const submitCodeMutation = useMutation({
    mutationFn: (code: string) => {
      return getAuthTokens(code);
    },
    onSuccess: (data) => {
      setUsername(data.user.username);
      setUserId(data.user.pk);
      setIsAuthenticated(true);
      router.push("/");
    },
  })


  useEffect(() => {
    if (!loadingTextRef.current) return;

    const typed = new Typed(loadingTextRef.current!, {
      strings: [
        '구글 로그인 중...',
        '구글 로그인 중',
      ],
      typeSpeed: 50,
      backDelay: 1500,
      showCursor: false,
      loop: true,
    });

    return () => {
      typed.destroy();
    }
  }, [submitCodeMutation.isPending]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !submitCodeMutation.isPending) {
      submitCodeMutation.mutate(code);
    }
  }, [searchParams]);

  if (submitCodeMutation.isPending) {
    return (
      <div>
        <p className="text-[24px] font-semibold" ref={loadingTextRef} />
      </div>
    )
  }

  if (submitCodeMutation.isError) {
    return (
      <ErrorHandler 
        error={submitCodeMutation.error as AxiosError} 
        reset={() => router.push("/")} 
      />
    )
  }

  return (
    <div>
      <h3 className="text-[24px] font-semibold">구글 로그인 페이지 입니다.</h3>
    </div>
  )
}

export default GoogleCallbackPage;