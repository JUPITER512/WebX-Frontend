import axios from "axios";
import { atomFamily,atom, selector } from "recoil";
export const chatAtom=atomFamily({
    key:"ChatAtom",
    default:(fields)=>''
})
export const chatDropDownItems=atom({
    key:"chatDropDownItems",
    default:selector({
        key:"chatDropDownItemsSelector",
        get:async()=>{
            const response = await axios.get(
                "http://localhost:3000/api/v1/user/get_user_chat_ids",
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            return response.data.chatIds 
        }
    })
})
