import { useContext } from "react"
import { pageSizeControllerStoreContext } from "./PageSizeController"
import { useStore } from "zustand";

export default function Footer() {
  const store = useContext(pageSizeControllerStoreContext);
  const pageWidth = useStore(store, (state) => state.pageWidth);

  return (
    <footer className="bg-color1 w-full py-[48px]">
      <div className="flex items-center" style={{ width: `${pageWidth}px`, margin: 'auto' }}>
        <p className="text-white text-[16px] font-medium">© 2021 Basket Lounge</p>
      </div>
    </footer>
  )
}