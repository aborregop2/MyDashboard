import { create } from "zustand";

type DarkmodeStore = {
  isDarkmode: boolean;
  setIsDarkmode: (isDarkmode: boolean) => void;
};

const useDarkmodeStore = create<DarkmodeStore>((set) => ({
  isDarkmode: false,
  setIsDarkmode: (isDarkmode) => set({ isDarkmode }),
}));


export default useDarkmodeStore;