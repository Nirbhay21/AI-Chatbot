import { useState } from "react";
import type { ChatMode } from "../types";
import dropDownIcon from "../assets/icons/drop_down_icon.svg"

interface DropupMenuProps {
  setOption: (option: "text" | "image") => void;
  selectedOption: ChatMode;
}

const DropupMenu = ({ setOption, selectedOption }: DropupMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectOptionAndClose = (option: ChatMode) => {
    setOption(option);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {(isOpen) && (
        <ul className="bottom-7 -left-1.5 absolute bg-[#80609F]/15 dark:bg-[#151315] backdrop-blur-xl p-2 border border-[#80609F]/35 rounded-lg dark:text-white">
          <li className="hover:bg-white/50 dark:hover:bg-white/5 py-0.5 pr-6 pl-2 rounded-sm text-black dark:text-white cursor-pointer" onClick={() => selectOptionAndClose("text")}>Text</li>
          <li className="hover:bg-white/50 dark:hover:bg-white/5 py-0.5 pr-6 pl-2 rounded-sm text-black dark:text-white cursor-pointer" onClick={() => selectOptionAndClose("image")}>Image</li>
        </ul>
      )}
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="capitalize">{selectedOption}</h4>
        <img src={dropDownIcon} alt="Drop Down Icon" className={`mt-px w-3 h-3 transition-transform duration-300 dark:invert ${(isOpen) ? "rotate-x-180" : ""}`} />
      </div>
    </div>
  )
}

export default DropupMenu