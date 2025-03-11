import {create} from 'zustand';


type Error = {
  error: string,
  setError: (error: string) => void,
};

const useAuthError = create<Error>((set) => ({
  error: "",
  setError: () => set((state) => ({ error: state.error })),
}))

export default useAuthError;
