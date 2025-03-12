import {create } from 'zustand';

type ShowPasswordStore = {
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
};

const useShowPassword = create<ShowPasswordStore>((set) => ({
    showPassword: false,
    setShowPassword: (showPassword) => set({ showPassword }),
}));

export default useShowPassword;