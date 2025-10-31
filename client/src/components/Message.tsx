import type { ChatMessage } from "../features/chat/chatSlice"
import userIcon from "../assets/icons/user_icon.svg"
import moment from "moment";
import Markdown from "react-markdown";
import { useEffect } from "react";
import Prism from "prismjs";

interface MessageProps {
  message: ChatMessage;
}

const Message = ({ message }: MessageProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [message.content]);

  

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex justify-end items-start space-x-2 my-4">
          <div className="flex flex-col space-y-2 bg-slate-50 dark:bg-[#57317C]/30 px-4 p-2 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-gray-400 text-xs dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={userIcon} alt="User Icon" className="rounded-full w-8" />
        </div>
      ) : (
        <div className="inline-flex flex-col space-y-2 bg-primary/20 dark:bg-[#57317C]/30 my-4 px-4 p-2 border border-[#80609F]/30 rounded-md max-w-2xl">
          {(message.isImage) ? (
            <img src={message.content} alt="Generated Image" className="mt-2 rounded-md w-full max-w-md" />
          ) : (
            <div className="text-sm dark:text-primary reset-tw">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
          <span className="text-gray-400 text-xs dark:text-[#B1A6C0]">{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default Message