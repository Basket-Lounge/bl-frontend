'use client'

import { useCallback, useEffect, useState } from "react";

import { createContext } from 'react';
import { createStore, useStore } from 'zustand';
import NavBar from "./NavBar";
import Footer from "./Footer";


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
  const store = pageSizeControllerStore;
  const pageWidth = useStore(store, (state) => state.pageWidth);
  const setPageWidth = useStore(store, (state) => state.setPageWidth);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 1200) {
      setPageWidth(1200);
    } else if (window.innerWidth > 1024) {
      setPageWidth(1024);
    } else if (window.innerWidth > 768) {
      setPageWidth(768);
    } else if (window.innerWidth > 480) {
      setPageWidth(480);
    } else if (window.innerWidth > 320) {
      setPageWidth(320);
    }
  }, []);
  
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='flex flex-col min-h-screen w-full'>
      <NavBar />
      <div style={{ width: `${pageWidth}px`, margin: 'auto', flexGrow: 1}}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default PageSizeController;