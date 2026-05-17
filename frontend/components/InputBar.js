"use client";

import { useState, useRef, useEffect } from "react";
import s from "./InputBar.module.css";

export default function InputBar({ onSend, disabled, streaming, large }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`${s.wrap} ${large ? s.wrapLarge : ""}`}>
      <div className={`${s.bar} ${disabled ? s.barDisabled : ""}`}>
        <textarea
          ref={textareaRef}
          className={s.textarea}
          placeholder="Ask anything…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          className={`${s.sendBtn} ${!value.trim() || disabled ? s.sendBtnOff : ""}`}
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          aria-label="Send"
        >
          {streaming ? (
            /* Stop square */
            <svg viewBox="0 0 20 20" fill="currentColor">
              <rect x="5" y="5" width="10" height="10" rx="2" />
            </svg>
          ) : (
            /* Arrow up */
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 16V4M4 10l6-6 6 6" />
            </svg>
          )}
        </button>
      </div>
      <p className={s.hint}>Shift + Enter for new line</p>
    </div>
  );
}
