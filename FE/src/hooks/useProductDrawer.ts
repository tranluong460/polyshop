import { create } from "zustand";

interface ProductDrawerStore {
  isOpen: boolean;
  isEdit: boolean;
  onOpen: (isEdit: boolean) => void;
  onClose: () => void;
}

const useProductDrawer = create<ProductDrawerStore>((set) => ({
  isOpen: false,
  isEdit: false,
  onOpen: (isEdit) => set({ isOpen: true, isEdit }),
  onClose: () => set({ isOpen: false }),
}));

export default useProductDrawer;
