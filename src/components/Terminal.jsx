import { useEffect, useId, useRef, useState } from "react";
import { getGuideReply } from "../lib/guide";
import { profile } from "../data/portfolio";
import Icon from "./Icon";

export const demoPrompts = [
  "What has Isaiah built in C#?",
  "Show me his IT experience.",
  "Which project demonstrates system design?",
];

export default function Terminal({ onAction, name = "", autoFocus = false }) {
  const inputId = useId();
  const log = useRef(null);
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const initial = {
    role: "guide",
    text: `Welcome${name ? `, ${name}` : ""}. I can connect Isaiah’s projects, skills, and experience. Try a question below or ask your own.`,
    source: "Portfolio notes",
    actions: [],
  };
  const [messages, setMessages] = useState([initial]);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);
  useEffect(() => {
    if (messages.length > 1)
      log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages]);
  const send = (value) => {
    const question = value.trim().slice(0, 400);
    if (!question) return;
    if (/^\/?clear$/i.test(question)) {
      setMessages([initial]);
      setAnnouncement("Conversation cleared.");
    } else {
      const reply = getGuideReply(question);
      setMessages((items) => [
        ...items.slice(-18),
        { role: "visitor", text: question },
        { role: "guide", ...reply },
      ]);
      setAnnouncement(reply.text);
    }
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  };
  return (
    <div className="monday-terminal">
      <div className="terminal-chrome">
        <span>
          <i />
          <i />
          <i />
        </span>
        <strong>MONDAY / PORTFOLIO TERMINAL</strong>
        <button
          className="terminal-reset"
          onClick={() => send("clear")}
          aria-label="Clear terminal conversation"
        >
          Clear
        </button>
      </div>
      <div className="terminal-mode">
        <span>
          <i /> INTERACTIVE DEMO
        </span>
        <small>Curated portfolio data · Runs in your browser</small>
      </div>
      <div
        className="terminal-log"
        ref={log}
        role="region"
        aria-label="Portfolio terminal conversation"
        tabIndex="0"
      >
        {messages.map((message, index) => (
          <div className={`terminal-message ${message.role}`} key={index}>
            <span className="terminal-role">
              {message.role === "visitor" ? "YOU" : "M.O.N.D.A.Y."}
              <Icon
                name={message.role === "visitor" ? "terminal" : "spark"}
                size={13}
              />
            </span>
            <p>{message.text}</p>
            {message.source && (
              <small className="reply-source">
                <Icon name="book" size={12} /> {message.source}
              </small>
            )}
            {message.actions?.length > 0 && (
              <div className="terminal-actions">
                {message.actions.map((action) =>
                  ["resume", "external"].includes(action.type) ? (
                    <a
                      key={action.label}
                      href={action.href || profile.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {action.label}
                      <Icon name="diagonal" size={14} />
                    </a>
                  ) : (
                    <button key={action.label} onClick={() => onAction(action)}>
                      {action.label}
                      <Icon name="arrow" size={14} />
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="terminal-compose">
        <div className="terminal-prompts" aria-label="Suggested questions">
          {demoPrompts.map((prompt) => (
            <button key={prompt} onClick={() => send(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label className="sr-only" htmlFor={inputId}>
            Ask M.O.N.D.A.Y. about Isaiah’s portfolio
          </label>
          <span aria-hidden="true">›</span>
          <input
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={400}
            autoComplete="off"
            placeholder="Ask about a build, skill, or experience…"
          />
          <button
            type="submit"
            aria-label="Send question"
            disabled={!input.trim()}
          >
            <Icon name="arrow" size={19} />
          </button>
        </form>
        <p className="terminal-disclosure">
          Portfolio simulation. No live model, device access, or external
          requests.
        </p>
      </div>
    </div>
  );
}
