import { create } from "zustand";
import PrimeReact from "primereact/api";

type DarkmodeStore = {
  isDarkmode: boolean;
  setIsDarkmode: (isDarkmode: boolean) => void;
};

const useDarkmodeStore = create<DarkmodeStore>((set) => ({
  isDarkmode: localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  
  setIsDarkmode: (isDarkmode) => {
    set({ isDarkmode });
    
    //localStorage.theme = isDarkmode ? 'dark' : 'light';

    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;

    if (themeLink) {
      themeLink.rel = 'stylesheet';
      themeLink.href = isDarkmode ? '../../public/dark-blue.css' : '../../public/light-blue.css';
    }

    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );   

    

    console.log('themeLink', themeLink);
  },

}));

export default useDarkmodeStore;