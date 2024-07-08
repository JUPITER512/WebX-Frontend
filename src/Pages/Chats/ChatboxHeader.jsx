import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { chatAtom } from "../../app/chat";
import { useRecoilValue } from "recoil";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { selectedAiModel } from "../../app/userData";
import axios from "axios";

const ChatboxHeader = () => {
  const aiModelName = useRecoilValue(selectedAiModel)
  const chatId=useRecoilValue(chatAtom("chat-id")) 
//   const Delte
  
  return (
    <div className="border-b-[1px]  my-4 px-4 py-2 flex justify-between items-center">
      <p>Ai Model Name : {aiModelName.toUpperCase()}</p>
      <button onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className=" hover:text-red-500 transition-colors duration-200" />
      </button>
    </div>
  );
};

export default ChatboxHeader;
