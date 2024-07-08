import { atom, atomFamily } from "recoil";

export const signUpFields = atomFamily({
    key: "SignUpFieldsKey",
    default: (fieldName) => ""
});

export const signInFields=atomFamily({
    key:"signInFields",
    default: (fieldName)=>""
})

export const forgetPasswordEmail=atom({
    key:"forgetPassword",
    default:''
})

export const otpfields=atomFamily({
    key: "otpfields",
    default: (fieldName) => ""
})