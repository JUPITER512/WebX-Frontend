import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import { chatAtom } from "../../app/chat";
import { selectedAiModel } from "../../app/userData";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import ChatDropDown from "./ChatDropDown";

const Chats = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-600 w-full rounded-lg pt-10 dark:text-gray-100">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center font-Playwrite ">
        Chats
      </h2>
      <div className="w-full h-full flex flex-col">
        <ChatDropDown/>
        <div className="flex-grow">
          <ChatBox />
        </div>
        <div className="w-full relative">
          <ChatInput atom={chatAtom("chat-input")} />
        </div>
      </div>
    </div>
  );
};

export default Chats;
