import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../features/chat/chatSlice";
import { motion, stagger, useAnimate } from "motion/react";
import type { ChatMode } from "../types";
import logo from "../assets/logos/logo_full.svg";
import logoDark from "../assets/logos/logo_full_dark.svg";
import Message from "./Message";
import DropupMenu from "./DropupMenu";
import Checkbox from "./Checkbox";
import stopIcon from "../assets/icons/stop_icon.svg"
import sendIcon from "../assets/icons/send_icon.svg"

const ChatBox = () => {
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const containerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [mode, setMode] = useState<ChatMode>("text");
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const [scope, animate] = useAnimate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    let link = document.getElementById("prism-theme") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = "prism-theme";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = (theme === "dark")
      ? "/prism-themes/prism-vsc-dark-plus.css"
      : "/prism-themes/prism-vs.css";
  }, [theme]);

  useEffect(() => {
    if (isLoading) {
      animate("div", {
        y: [-1.5, 1.5]
      }, {
        duration: 0.3,
        repeat: Infinity,
        delay: stagger(0.1),
        ease: "easeInOut",
        repeatType: "reverse"
      });
    }
  }, [animate, isLoading]);

  useEffect(() => {
    if(containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "auto"
      });
    }
  }, [messages])

  return (
    <div className="flex flex-col flex-1 justify-between m-5 md:m-7 xl:mx-30 max-md:mt-14 2xl:pr-40">

      {/* Chat Messages */}
      <div className="flex-1 mb-5 overflow-y-scroll" ref={containerRef}>
        {(messages.length === 0) && (
          <div className="flex flex-col justify-center items-center space-y-2 h-full text-primary">
            <img src={theme === "dark" ? logo : logoDark} alt="QuickGPT Logo" className="w-full max-w-56 sm:max-w-68" />
            <p className="mt-5 text-4xl text-center text-gray-400 sm:text-6xl dark:text-white">Ask me anything.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}

        {/* Three Dots Loading */}
        {(isLoading) && (
          <div className="flex items-center space-x-1.5 loader" ref={scope}>
            <motion.div className="bg-gray-500 dark:bg-white rounded-full w-1.5 h-1.5"></motion.div>
            <motion.div className="bg-gray-500 dark:bg-white rounded-full w-1.5 h-1.5"></motion.div>
            <motion.div className="bg-gray-500 dark:bg-white rounded-full w-1.5 h-1.5"></motion.div>
          </div>
        )}
      </div>

      {/* Publish image checkbox */}
      {(mode === "image") && (
        <div className="mx-auto mb-3">
          <Checkbox
            id="publish-checkbox"
            label="Publish Generated Image to Community"
            checked={isPublished}
            onChange={setIsPublished}
          />
        </div>
      )}

      {/* Prompt Input Box */}
      <form onSubmit={onSubmit} className="flex items-center space-x-4 bg-primary/20 dark:bg-[#583C79]/35 mx-auto mb-1 p-2.5 pl-5 border border-primary dark:border-[#80609F]/35 rounded-full w-full max-w-2xl">
        <DropupMenu selectedOption={mode} setOption={setMode} />
        <input onChange={(e) => setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your prompt here..." className="flex-1 w-full text-sm outline-none" required />
        <button disabled={isLoading} className="cursor-pointer">
          <img src={(isLoading) ? stopIcon : sendIcon} alt="Send Icon" />
        </button>
      </form>
    </div>
  )
}

export default ChatBox