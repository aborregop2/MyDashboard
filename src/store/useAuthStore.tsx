import { create } from 'zustand';

type User = {
    email: string;
    role: string;
};

type UserStore = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const useAuthStore = create<UserStore>((set) => ({
    user: (() => {
        const storedUser = localStorage.getItem('userStorage');
        return storedUser ? JSON.parse(storedUser) : null;
    })(),
    setUser: (user) => {
        if (user) {
            localStorage.setItem('userStorage', JSON.stringify(user));
        } else {
            localStorage.removeItem('userStorage');
        }
        set({ user });
    },
}));

export default useAuthStore;