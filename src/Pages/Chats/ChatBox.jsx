import { useEffect, useRef } from "react";
import { chatAtom } from "../../app/chat";
import "./Chatbox.css";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
  useRecoilStateLoadable,
} from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { selectedAiModel } from "../../app/userData";
import axios from "axios";

const ChatBox = () => {
  const modelName = useRecoilValue(selectedAiModel);
  const [selectedChat, setSelectedChat] = useRecoilStateLoadable(
    chatAtom("selected-chat-id")
  );
  const [userchatLoadable, setChatState] = useRecoilStateLoadable(
    chatAtom(selectedChat.contents)
  );
  if (userchatLoadable.state === "loading" || selectedChat.state == "loading") {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  if (
    userchatLoadable.state === "hasError" ||
    selectedChat.state == "hasError"
  ) {
    return <div>Error loading chat.</div>; // Handle error state if needed
  }

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userchatLoadable.contents]);

  const userchat = userchatLoadable.contents;
  console.log("Chat content is ",userchat)
  async function handleDelete() {
    const res =await axios.delete(
      "http://localhost:3000/api/v1/user/delete_chat",
      {
        chatId: chatId,
      },
      {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      }
    );
  }
  // setChatState([]);


  async function fetchChats() {
    if (selectedChat.contents == "") return;
    const recentChats = await axios.get(
      "http://localhost:3000/api/v1/user/get_chat",
      {
        params: { chatId: selectedChat.contents },
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return recentChats.data;
  }
  useEffect(() => {
    async function setData() {
      const data = await fetchChats();
      console.log(data?.messages);
      setChatState(data.messages);
    }
    setData();
  }, [selectedChat.contents]);

  return (
    <div className="border-[1px] border-gray-300 h-[40rem] mx-2 my-4 rounded-lg overflow-y-scroll scroll-container overflow-x-hidden">
      <div className="border-b-[1px] my-4 px-4 py-2 flex items-center justify-between">
        Ai Model Namae :{modelName.toUpperCase()}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDelete}
            className="hover:text-red-300 transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {Array.isArray(userchat) &&
        userchat.map((item, index) => (
          <div
            key={index}
            className={`my-4 py-2 mx-4 w-[56%] md:w-[50%] lg:w-[40%] px-4 border-[1px] border-gray-300 ${
              item.isUser
                ? "ml-auto text-right bg-slate-300 dark:bg-gray-200 select-none"
                : "mr-auto text-left bg-blue-100 "
            } rounded-lg dark:text-gray-600 overflow-x-auto scroll-container`}
          >
            <p className="antialiased ">{item.message}</p>
          </div>
        ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatBox;
