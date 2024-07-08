import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatAtom } from "../../app/chat";
import { selectedAiModel } from "../../app/userData";

const ChatInput = ({ atom }) => {
  const [value, setValue] = useRecoilState(atom);
  const modelName = useRecoilValue(selectedAiModel);
  const chatId=useRecoilValue(chatAtom('selected-chat-id'))
  const selectedChat = useRecoilValue(chatAtom('selected-chat-id'))
  const [userChat, setUserChat] = useRecoilState(chatAtom(selectedChat));

  console.log(modelName)
  const handleSendMessage = async () => {
    if (value.trim() === "") return;
    setValue("");
    setUserChat((prevVal) => {
      return [
        ...prevVal,
        {
          isUser: true,
          message: value,
        },
      ];
    });
    const url = new URL("http://localhost:3000/api/v1/user/generateMessage");

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        aiModel: modelName,
        message: value
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
        ChatId: chatId || '',
      },
    });

    if (response.status == 200) {
      // localStorage.setItem('chatId', data.chatId);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMessage = "";
      let lastIndex = userChat.length;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiMessage += decoder.decode(value, { stream: true });

        setUserChat((prevVal) => {
          let prevvalues = [...prevVal];
          const newmsgobj = {
            isUser: false,
            message: aiMessage,
          };
          prevvalues[lastIndex + 1] = newmsgobj;
          return prevvalues;
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-2 bg-gray-300 rounded-lg">
      <textarea
        type="text"
        placeholder="Type Here...."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-300 p-4  rounded-t-md block w-[100%]  text-black font-Playwrite outline-none resize-none scroll-container"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-4 rounded-md ml-4"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
