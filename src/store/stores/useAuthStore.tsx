import { create } from 'zustand';

type AuthStore = {
    isAuth: boolean;
    setIsAuth: (isLogin: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth }),
}));


export default useAuthStore;