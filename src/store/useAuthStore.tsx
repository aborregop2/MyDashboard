import { create } from 'zustand';


//TODO: localstorage
//TODO: dark de tailwind
type User = {
    email: string;
    role: string;
};

type UserStore = {
    user: User | null,
    setUser: (user: User | null) => void;
};

const useAuthStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));


export default useAuthStore;