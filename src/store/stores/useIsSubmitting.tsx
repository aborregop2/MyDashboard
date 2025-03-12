import { create } from "zustand";

type IsSubmittingStore = {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const useIsSubmitting = create<IsSubmittingStore>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));


export default useIsSubmitting;