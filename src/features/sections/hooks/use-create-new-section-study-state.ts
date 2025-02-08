import { create } from "zustand";

type Props = {
  isOpen: boolean;
  setOpen: (prevState: boolean) => void;
  setClose: () => void;
};

export const useCreateNewSectionStudyState = create<Props>((set) => ({
  isOpen: false,
  setOpen: (prevState) => set({ isOpen: prevState }),
  setClose: () => set({ isOpen: false }),
}));
