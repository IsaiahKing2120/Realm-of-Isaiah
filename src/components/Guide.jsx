import { useEffect, useRef, useState } from 'react';
import { getGuideReply } from '../lib/guide';
import { profile } from '../data/portfolio';
import Icon from './Icon';
import Modal from './Modal';

export default function Guide({ name, onClose, onAction }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'guide',
      text: `Welcome${name ? `, ${name}` : ', traveler'}. I’m your guide to Isaiah’s realm. Looking for a project, a skill, or the story behind the builder?`,
      actions: [],
    },
  ]);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
  }, [messages]);
  const send = (value) => {
    const text = value.trim().slice(0, 400);
    if (!text) return;
    const reply = getGuideReply(text);
    setMessages((items) => [
      ...items.slice(-38),
      { role: 'visitor', text },
      { role: 'guide', ...reply },
    ]);
    setInput('');
    inputRef.current?.focus();
  };
  return (
    <Modal
      title="M.O.N.D.A.Y."
      eyebrow="YOUR GUIDE TO THE REALM"
      onClose={onClose}
      className="guide-modal"
    >
      <div className="guide-status">
        <span>
          <i /> Portfolio guide
        </span>
        <span>Curated answers · No account needed</span>
      </div>
      <div
        className="guide-messages"
        ref={messagesRef}
        role="log"
        aria-label="Conversation with portfolio guide"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((message, index) => (
          <div key={index} className={`guide-message message-${message.role}`}>
            <span className="message-role">
              {message.role === 'guide' ? 'M.O.N.D.A.Y.' : name || 'YOU'}
            </span>
            <p>{message.text}</p>
            {message.actions?.length > 0 && (
              <div className="guide-actions">
                {message.actions.map((item) =>
                  item.type === 'resume' ? (
                    <a
                      key={item.label}
                      href={profile.resume}
                      download="Isaiah_King_Resume.pdf"
                    >
                      {item.label}
                      <Icon name="download" size={14} />
                    </a>
                  ) : (
                    <button key={item.label} onClick={() => onAction(item)}>
                      {item.label}
                      <Icon name="arrow" size={14} />
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="guide-input-area">
        <div className="guide-suggestions">
          {['Show me the projects', 'What is M.O.N.D.A.Y.?', 'Let’s play'].map(
            (prompt) => (
              <button onClick={() => send(prompt)} key={prompt}>
                {prompt}
              </button>
            ),
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <label className="sr-only" htmlFor="guide-input">
            Ask the portfolio guide
          </label>
          <span aria-hidden="true">›</span>
          <input
            id="guide-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={400}
            autoComplete="off"
            placeholder="Ask about the work, the skills, the story…"
          />
          <button
            type="submit"
            className="icon-button"
            disabled={!input.trim()}
            aria-label="Send question"
          >
            <Icon name="arrow" size={20} />
          </button>
        </form>
        <p>
          This preview explores the portfolio. A live M.O.N.D.A.Y. connection is
          on the roadmap.
        </p>
      </div>
    </Modal>
  );
}
