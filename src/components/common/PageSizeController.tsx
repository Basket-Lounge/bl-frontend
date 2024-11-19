'use client'

import { useCallback, useEffect } from "react";

import { createContext } from 'react';
import { createStore, useStore } from 'zustand';
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuthStore } from "@/stores/auth.stores";

import { ThemeProvider } from "@material-tailwind/react";

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

  return (
    <ThemeProvider>
      <div className='flex flex-col min-h-screen w-full'>
        <NavBar />
        {/* <div style={{ width: `${pageWidth}px`, margin: 'auto', flexGrow: 1}}>
          { authenticationAttempted ? children : <div>Loading...</div> }
        </div> */}
        <div className="grow mx-auto sm:w-[360px] md:w-[480px] lg:w-[768px] xl:w-[1024px] 2xl:w-[1200px]">
          { authenticationAttempted ? children : <div>Loading...</div> }
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default PageSizeController;