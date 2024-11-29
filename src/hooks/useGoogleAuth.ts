import { httpClientFormData } from "@/api/http";
import { refreshAccessToken } from "@/api/login.api";
import { useAuthStore } from "@/stores/auth.stores";
import { useState } from "react";
import { useStore } from "zustand";


const useGoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(null);

  const { 
    setUsername, 
    setIsAuthenticated 
  } = useStore(useAuthStore);
  
  const submitGoogleLoginCode = async (code: string) => {
    setIsSignedIn(null);
    setIsLoading(true);
    setIsError(null);

    try {
      await httpClientFormData.post("/dj-rest-auth/google/", { code });
      const data = await refreshAccessToken();

      setUsername(data.username);
      setIsAuthenticated(true);

      setIsSignedIn(true);
    } catch (error) {
      setIsError(true);

      setIsAuthenticated(false);
      setUsername("");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isSignedIn,
    isLoading,
    isError,
    submitGoogleLoginCode
  }
}

export default useGoogleAuth;