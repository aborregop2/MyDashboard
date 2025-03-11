import {create} from 'zustand';

type Login = {
  loged: boolean,
  toggle: () => void,
};

const useLogInStore = create<Login>((set) => ({
  loged: false,
  toggle: () => set((state) => ({ loged: !state.loged })),
}))

export default useLogInStore;