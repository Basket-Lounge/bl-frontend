'use client'

import { AllGamesStore, AllGamesStoreContext } from "@/stores/games.stores";

const allGamesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AllGamesStoreContext.Provider value={AllGamesStore}>
      {children}
    </AllGamesStoreContext.Provider>
  );
}

export default allGamesLayout;