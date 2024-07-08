import { atom, atomFamily, selectorFamily } from "recoil";

export const UserData=atomFamily({
    key:"UserData",
    default: (field) => localStorage.getItem(field) ?? ""
})
export const selectedAiModel=atom({
    key:"selectedAiModel",
    default:'llama3'
})