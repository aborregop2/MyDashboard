import {create} from 'zustand';

type ShowSidebarStore = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
};

const useShowSidebar = create<ShowSidebarStore>((set) => ({
  showSidebar: false,
  setShowSidebar: (showSidebar) => set({ showSidebar }),
}));

export default useShowSidebar;

