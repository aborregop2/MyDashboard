import { create } from 'zustand';


type Theme = {
    darkMode: boolean,
    toggleTheme: () => void,
};

const useTheme = create<Theme>((set) => ({
    darkMode: false,
    toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}))

export default useTheme;