import { create } from 'zustand';

type LoginStore = {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
};

const useLoginStore = create<LoginStore>((set) => ({
    isLogin: false,
    setIsLogin: (isLogin) => set({ isLogin }),
}));


export default useLoginStore;