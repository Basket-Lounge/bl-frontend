import { create } from "zustand";
import { devtools } from "zustand/middleware";


export type TNotificationSectionType = "unread" | "all";

interface INotificationStore {
  unreadNotificationPaginationPage: number;
  setUnreadNotificationPaginationPage: (page: number) => void;

  allNotificationPaginationPage: number;
  setAllNotificationPaginationPage: (page: number) => void;

  headerUnreadNotificationCount: number;
  setHeaderUnreadNotificationCount: (count: number) => void;
  isHeaderUnreadNotificationCountChanged: boolean;
  setIsHeaderUnreadNotificationCountChanged: (value: boolean) => void;
  
  isMarkingNotificationAsReadClicked: boolean;
  setIsMarkingNotificationAsReadClicked: (value: boolean) => void;

  isSectionChanged: boolean;
  setIsSectionChanged: (value: boolean) => void;

  isPageChanged: boolean;
  setIsPageChanged: (value: boolean) => void;

  currentSection: TNotificationSectionType;
  setCurrentSection: (section: TNotificationSectionType) => void;
}


export const useNotificationStore = create<INotificationStore>()(
  devtools((set) => ({
    unreadNotificationPaginationPage: 1,
    setUnreadNotificationPaginationPage: (page) => {
      if (page < 1) {
        return;
      }
      set(() => ({ unreadNotificationPaginationPage: page }));
    },

    allNotificationPaginationPage: 1,
    setAllNotificationPaginationPage: (page) => {
      if (page < 1) {
        return;
      }
      set(() => ({ allNotificationPaginationPage: page }));
    },

    headerUnreadNotificationCount: 0,
    setHeaderUnreadNotificationCount: (count) => set(() => ({ headerUnreadNotificationCount: count })),
    isHeaderUnreadNotificationCountChanged: false,
    setIsHeaderUnreadNotificationCountChanged: (value) => set(() => ({ isHeaderUnreadNotificationCountChanged: value })),

    isMarkingNotificationAsReadClicked: false,
    setIsMarkingNotificationAsReadClicked: (value) => set(() => ({ isMarkingNotificationAsReadClicked: value })),

    isSectionChanged: false,
    setIsSectionChanged: (value) => set(() => ({ isSectionChanged: value })),

    isPageChanged: false,
    setIsPageChanged: (value) => set(() => ({ isPageChanged: value })),

    currentSection: "all",
    setCurrentSection: (section) => set(() => ({ currentSection: section })),
  }))
)