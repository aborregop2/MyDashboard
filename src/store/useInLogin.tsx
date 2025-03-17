import {create} from 'zustand';


type InLoginStore = {
    inLogin: boolean;
    setInLogin: (inLogin: boolean) => void;
};


const useInLogin = create<InLoginStore>((set) => ({
    inLogin: false,
    setInLogin: (inLogin) => set({ inLogin }),
}));

export default useInLogin;