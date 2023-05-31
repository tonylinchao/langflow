import { LockClosedIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../utils";
import { useContext, useEffect, useRef, useState } from "react";
import { TabsContext } from "../../../contexts/tabsContext";

export default function ChatInput({
  lockChat,
  chatValue,
  sendMessage,
  setChatValue,
  inputRef,
}) {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "inherit"; // Reset the height
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set it to the scrollHeight
    }
  }, [chatValue]);

  const { setDisableCopyPaste } = useContext(TabsContext);

  return (
    <div className="relative">
      <textarea
        onKeyDown={(event) => {
          if (event.key === "Enter" && !lockChat && !event.shiftKey) {
            sendMessage();
          }
        }}
        onBlur={() => {
          setDisableCopyPaste(false);
        }}
        onFocus={() => {
          setDisableCopyPaste(true);
        }}
        rows={1}
        ref={inputRef}
        disabled={lockChat}
        style={{
          resize: "none",
          bottom: `${inputRef?.current?.scrollHeight}px`,
          maxHeight: "150px",
          overflow: `${
            inputRef.current && inputRef.current.scrollHeight > 150
              ? "auto"
              : "hidden"
          }`,
        }}
        value={lockChat ? "Thinking..." : chatValue}
        onChange={(e) => {
          setChatValue(e.target.value);
        }}
        className={classNames(
          lockChat
            ? " bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300"
            : "  bg-white-200 text-black dark:bg-gray-900 dark:text-gray-300",
          "form-input block w-full rounded-md border-gray-300 pr-10 custom-scroll dark:border-gray-600 sm:text-sm"
        )}
        placeholder={"Send a message..."}
      />
      <div className="absolute bottom-0.5 right-3">
        <button disabled={lockChat} onClick={() => sendMessage()}>
          {lockChat ? (
            <LockClosedIcon
              className="h-5 w-5 animate-pulse  text-gray-500 dark:hover:text-gray-300"
              aria-hidden="true"
            />
          ) : (
            <PaperAirplaneIcon
              className="h-5 w-5 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </div>
  );
}
