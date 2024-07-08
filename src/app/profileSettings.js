import { atomFamily } from 'recoil';

export const UserData = atomFamily({
    key: "UserDataProfileSettings",
    default: (field) => localStorage.getItem(field) ?? ""
})
