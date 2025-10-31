import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import logo from "../assets/logos/logo_full.svg";
import logoDark from "../assets/logos/logo_full_dark.svg";
import searchIcon from "../assets/icons/search_icon.svg"
import binIcon from "../assets/icons/bin_icon.svg"
import galleryIcon from "../assets/icons/gallery_icon.svg"
import diamondIcon from "../assets/icons/diamond_icon.svg"
import themeIcon from "../assets/icons/theme_icon.svg"
import userIcon from "../assets/icons/user_icon.svg"
import logoutIcon from "../assets/icons/logout_icon.svg"
import closeIcon from "../assets/icons/close_icon.svg"
import menuIcon from "../assets/icons/menu_icon.svg"
import { AnimatePresence, motion, type Variants } from "motion/react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/theme/themeSlice";
import { setSelectedChat, type Chat } from "../features/chat/chatSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(
    () => window.innerWidth >= 768
  );
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { chats } = useSelector((state: RootState) => state.chat);

  const childVariants: Variants = {
    initial: {
      opacity: 0,
      filter: "blur(3px)",
    },
    hover: {
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  const openSidebar = (): void => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(true);
      setIsOverlayVisible(true);
    }
  }

  const closeSidebar = (): void => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
      setIsOverlayVisible(false);
    }
  }

  const selectChatAndCloseSidebar = (chat: Chat): void => {
    navigate("/");
    dispatch(setSelectedChat(chat));
    closeSidebar();
  }

  const navigateAndCloseSidebar = (path: string): void => {
    navigate(path);
    closeSidebar();
  }

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
        setIsOverlayVisible(false);
      } else {
        if (isSidebarOpen) {
          setIsOverlayVisible(true);
        }
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  return (
    <>
      {(!isSidebarOpen) && (
        <div className="top-0 right-0 left-0 z-[1] absolute w-full">
          <button onClick={openSidebar}>
            <img src={menuIcon} className="md:hidden mx-4 mt-3 mb-1.5 w-8 h-8 not-dark:invert cursor-pointer" alt="Menu Icon" />
          </button>
        </div>
      )}

      {/* Overlay */}
      <AnimatePresence>
        {(isOverlayVisible) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSidebar}
            className="z-[1] fixed inset-0 bg-black/45"></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isSidebarOpen) && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className={`z-[2] left-0 top-0 bottom-0 md:static absolute ${theme !== "dark" ? "bg-white" : ""} flex flex-col dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 dark:backdrop-blur-3xl p-5 border-[#80609F]/35 border-r min-w-72 h-screen`}>

            {/* {Logo} */}
            <img
              alt="QuickGPT Logo"
              src={theme === "dark" ? logo : logoDark}
              className="w-full max-w-48" />

            {/* New chat Button */}
            <button className="flex justify-center items-center bg-gradient-to-r from-[#A456F7] to-[#3D81F6] mt-10 py-2 rounded-md w-full text-sm text-white cursor-pointer">
              <span className="mr-2 text-xl">+</span>
              <span>New Chat</span>
            </button>

            {/* Search Conversations */}
            <div className="flex items-center gap-2 mt-4 p-3 border border-gray-400 dark:border-white/20 rounded-md">
              <img src={searchIcon} alt="Search Icon" className="w-4 not-dark:invert" />
              <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search Conversations" className="text-xs placeholder:text-gray-400 outline-none" />
            </div>

            {/* Recent Conversations */}
            {(chats.length > 0) && (<p className="mt-4 text-sm">Recent Conversations</p>)}
            <div className="flex-1 space-y-3 mt-3 text-sm overflow-y-scroll">
              {chats.filter((chat) =>
                (chat.messages[0])
                  ? chat.messages[0].content.toLowerCase().includes(search.toLowerCase())
                  : chat.name.toLowerCase().includes(search.toLowerCase())
              ).map((chat) => (
                <motion.div
                  key={chat._id}
                  initial="initial"
                  whileHover="hover"
                  onClick={() => selectChatAndCloseSidebar(chat)}
                  className="group flex justify-between dark:bg-[#57317C]/10 px-4 p-2 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer">
                  <div>
                    <p className="w-full truncate">
                      {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                    </p>
                    <p className="text-gray-500 text-xs dark:text-[#B1A6C0]">{moment(chat.updatedAt).fromNow()}</p>
                  </div>
                  <motion.button
                    variants={childVariants}
                    transition={{ duration: 0.26 }}
                  >
                    <img src={binIcon} alt="Delete Icon" className="w-4 not-dark:invert cursor-pointer" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Community Image */}
            <div
              onClick={() => navigateAndCloseSidebar("/community")}
              className="flex items-center space-x-2 mt-4 p-3 border border-gray-300 dark:border-white/15 rounded-md transition-transform cursor-pointer hover:scale-[1.025]">
              <img src={galleryIcon} alt="Gallery Icon" className="w-4.5 not-dark:invert" />
              <div className="flex flex-col text-sm">
                <p>Community Images</p>
              </div>
            </div>

            {/* Credits Purchase Option */}
            <div
              onClick={() => navigateAndCloseSidebar("/credits")}
              className="flex items-center space-x-2 mt-4 p-3 border border-gray-300 dark:border-white/15 rounded-md transition-transform cursor-pointer hover:scale-[1.025]">
              <img src={diamondIcon} alt="Diamond Icon" className="w-4.5 dark:invert" />
              <div className="flex flex-col text-sm">
                <p>Credits: {user?.credits}</p>
                <p className="text-gray-600 text-xs dark:text-gray-200">Purchase credits to use QuickGPT</p>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex justify-between items-center space-x-2 mt-4 p-3 border border-gray-300 dark:border-white/15 rounded-md">
              <div className="flex items-center space-x-2 text-sm">
                <img src={themeIcon} alt="Theme Icon" className="w-4.5 not-dark:invert" />
                <p>Dark Mode</p>
              </div>
              <label className="inline-flex relative cursor-pointer">
                <input onChange={() => dispatch(toggleTheme())} type="checkbox" className="sr-only peer" checked={theme === "dark"} />
                <div className="bg-gray-400 peer-checked:bg-purple-600 rounded-full w-9 h-5 transition-all"></div>
                <span className="top-1 left-1 absolute bg-white rounded-full w-3 h-3 transition-transform peer-checked:translate-x-4"></span>
              </label>
            </div>

            <motion.div
              initial="initial"
              whileHover="hover"
              className="group flex items-center space-x-3 mt-4 p-3 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer">
              <img src={userIcon} alt="User Icon" className="rounded-full w-7" />
              <p className="flex-1 text-sm dark:text-primary truncate">{user ? user?.name : "Login your account"}</p>
              {user && (
                <motion.button
                  transition={{ duration: 0.26 }}
                  variants={childVariants}
                >
                  <img src={logoutIcon} alt="Logout Icon" className="group-hover:block hidden h-5 not-dark:invert cursor-pointer" />
                </motion.button>
              )}
            </motion.div>

            <button className="md:hidden" onClick={closeSidebar}>
              <img src={closeIcon} alt="Close Icon" className="top-3 right-3 absolute md:hidden w-5 h-5 not-dark:invert cursor-pointer" />
            </button>
          </motion.div >
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar