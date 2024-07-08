import React, { useState } from "react";
import { chatAtom, chatDropDownItems } from "../../app/chat";
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ChatDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedChat, setSelectedChat] = useRecoilState(
    chatAtom("selected-chat")
  );
  const setSelectedChatId = useSetRecoilState(chatAtom("selected-chat-id"));

  const chats = useRecoilValueLoadable(chatDropDownItems);

  if (chats.state === "loading") {
    return <div>Loading...</div>;
  }
  if (chats.state === "hasError") {
    return <div>Error loading chat.</div>;
  }

  return (
    <div className="relative inline-block text-left mx-auto my-10">
      <div
        className="w-52 border-2 border-gray-300 bg-slate-600 py-4 text-white rounded-md flex items-center justify-between select-none cursor-pointer shadow-sm"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <span className="flex-1 px-2">
          {selectedChat || "Select Recent Chat"}{" "}
        </span>
        <button className="mr-2">
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      {showDropDown && (
        <div className="absolute mt-2 w-52 rounded-md shadow-lg bg-slate-600 ring-1 ring-black ring-opacity-5 text-white max-h-[10rem] overflow-y-auto">
          <div className="py-1">
            {chats.contents.length > 0 &&
              chats.contents.map((item) => (
                <button
                  key={item.chatid} // Assuming chatid is a unique identifier
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => {
                    setSelectedChat(item.chatTitle);
                    setShowDropDown(false);
                    setSelectedChatId(item.chatid);
                    localStorage.setItem("selectedChat", item.chatid);
                  }}
                >
                  {item.chatTitle}
                </button>
              ))}

            {/* Button for creating a new chat */}
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
              onClick={() => {
                setSelectedChat("New Chat");
                setShowDropDown(false);
                setSelectedChatId("");
                localStorage.setItem("selectedChat", "");
              }}
            >
              New Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDropDown;
