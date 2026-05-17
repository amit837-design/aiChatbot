"use client";

import s from "./MessageBubble.module.css";

export default function MessageBubble({ message, streaming }) {
  const isUser = message.role === "user";

  return (
    <div className={`${s.row} ${isUser ? s.rowUser : s.rowAI}`}>
      <div className={`${s.inner} ${isUser ? s.innerUser : s.innerAI}`}>
        {!isUser && (
          <div className={s.aiAvatar}>
            <svg viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeDasharray="4 2"
              />
              <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
        )}

        <div className={`${s.content} ${isUser ? s.contentUser : s.contentAI}`}>
          {/* Show typing dots when streaming but no text yet */}
          {streaming && !message.content ? (
            <div className={s.typingDots}>
              <span />
              <span />
              <span />
            </div>
          ) : (
            <p className={s.text}>
              {message.content}
              {streaming && message.content && <span className={s.cursor} />}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
