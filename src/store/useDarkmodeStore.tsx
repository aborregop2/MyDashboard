import { create } from "zustand";

type DarkmodeStore = {
  isDarkmode: boolean;
  setIsDarkmode: (isDarkmode: boolean) => void;
};

const useDarkmodeStore = create<DarkmodeStore>((set) => ({
  isDarkmode: !(localStorage.theme === 'light') || window.matchMedia('(prefers-color-scheme: dark)').matches,
  
  setIsDarkmode: (isDarkmode) => {
    set({ isDarkmode });
    
    localStorage.theme = isDarkmode ? 'dark' : 'light';

    console.log(localStorage.theme)
    console.log(isDarkmode)

    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
    
    
    const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
    if (themeLink) {
      themeLink.remove();
    
      const newLink = document.createElement("link") as HTMLLinkElement
      newLink.id = "theme-link"
      newLink.rel = "stylesheet"
      newLink.href = isDarkmode ? "/dark-blue.css" : "/light-blue.css"
      document.head.appendChild(newLink)
    }

  },

}));

export default useDarkmodeStore;