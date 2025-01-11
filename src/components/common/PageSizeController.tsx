'use client'

import { createContext, useEffect } from 'react';
import { createStore, useStore } from 'zustand';
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuthStore } from "@/stores/auth.stores";

import { ThemeProvider } from "@material-tailwind/react";
import useDebounce from '@/hooks/useDebounce';
import SpinnerLoading from './SpinnerLoading';


interface IPageSizeControllerStore {
  pageWidth: number;
  setPageWidth: (width: number) => void;
}

const pageSizeControllerStore = createStore<IPageSizeControllerStore>((set) => ({
  pageWidth: 0,
  setPageWidth: (width) => set({ pageWidth: width }),
}));

export const pageSizeControllerStoreContext = createContext(pageSizeControllerStore);


const PageSizeController = ({ children }: { children: React.ReactNode }) => {
  const {
    authenticationAttempted
  } = useStore(useAuthStore);
  const { setPageWidth } = useStore(pageSizeControllerStore);

  const setWidthDebounceCallback = useDebounce(() => {
    setPageWidth(window.innerWidth);
  }, 100);


  useEffect(() => {
    const handleResize = () => {
      setWidthDebounceCallback();
    }

    setPageWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen w-full'>
        <NavBar />
        {/* <div style={{ width: `${pageWidth}px`, margin: 'auto', flexGrow: 1}}>
          { authenticationAttempted ? children : <div>Loading...</div> }
        </div> */}
        <div className="grow mx-auto sm:w-[360px] md:w-[480px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1200px]">
          { authenticationAttempted ? children : <SpinnerLoading /> }
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default PageSizeController;