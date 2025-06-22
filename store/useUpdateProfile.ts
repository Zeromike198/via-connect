import { create } from 'zustand';

type UpdateProfile = {
  updateProfile: boolean;
  setUpdateProfile: (value: boolean) => void;
};

export const useUpdateProfile = create<UpdateProfile>((set) => ({
  updateProfile: false,
  setUpdateProfile: (value) => set({ updateProfile: value }),
}));
