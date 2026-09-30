import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/portfolio';
import Icon from './Icon';
import Modal from './Modal';

export default function CommandMenu({ onClose, onAction, motion }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const actions = [
    {
      label: 'Explore the workbench',
      subtitle: 'Projects & case studies',
      icon: 'layers',
      type: 'section',
      value: 'work',
    },
    {
      label: 'Inspect the skill tree',
      subtitle: 'Skills & evidence',
      icon: 'spark',
      type: 'section',
      value: 'skills',
    },
    {
      label: 'Read the quest log',
      subtitle: 'Career & certifications',
      icon: 'book',
      type: 'section',
      value: 'journey',
    },
    {
      label: 'Meet the builder',
      subtitle: 'A little about Isaiah',
      icon: 'gem',
      type: 'section',
      value: 'about',
    },
    {
      label: 'Talk to M.O.N.D.A.Y.',
      subtitle: 'Your portfolio guide',
      icon: 'terminal',
      type: 'guide',
    },
    {
      label: 'Play Rune Relay',
      subtitle: 'Take a side quest',
      icon: 'swords',
      type: 'arcade',
    },
    {
      label: 'Download résumé',
      subtitle: 'PDF · Isaiah King',
      icon: 'download',
      type: 'resume',
    },
    {
      label: 'Personalize your greeting',
      subtitle: 'Set your traveler name',
      icon: 'code',
      type: 'preferences',
    },
    {
      label: motion ? 'Turn ambient effects off' : 'Turn ambient effects on',
      subtitle: 'Motion & embers',
      icon: 'spark',
      type: 'motion',
    },
    {
      label: 'Get in touch',
      subtitle: profile.email,
      icon: 'mail',
      type: 'section',
      value: 'contact',
    },
  ];
  const results = actions.filter((item) =>
    `${item.label} ${item.subtitle}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <Modal
      title="Where to, traveler?"
      eyebrow="QUICK TRAVEL"
      onClose={onClose}
      className="command-modal"
    >
      <div className="command-search">
        <Icon name="search" size={18} />
        <label className="sr-only" htmlFor="command-search">
          Search site commands
        </label>
        <input
          id="command-search"
          ref={inputRef}
          placeholder="Find a place, project, or side quest…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              document
                .querySelector('.command-results a, .command-results button')
                ?.focus();
            }
            if (event.key === 'Enter' && results[0]) {
              event.preventDefault();
              if (results[0].type === 'resume')
                document.getElementById('command-resume')?.click();
              else onAction(results[0]);
            }
          }}
        />
      </div>
      <div className="command-results">
        {results.length ? (
          results.map((item) =>
            item.type === 'resume' ? (
              <a
                id="command-resume"
                href={profile.resume}
                download="Isaiah_King_Resume.pdf"
                className="command-item"
                key={item.label}
              >
                <Icon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <Icon name="download" size={16} />
              </a>
            ) : (
              <button
                className="command-item"
                key={item.label}
                onClick={() => onAction(item)}
              >
                <Icon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <Icon name="arrow" size={16} />
              </button>
            ),
          )
        ) : (
          <p className="command-empty">
            No paths found. Try “projects,” “guide,” or “play.”
          </p>
        )}
      </div>
      <div className="command-footer">
        <span>
          <kbd>Tab</kbd> to explore <kbd>Enter</kbd> to select
        </span>
        <span>
          <kbd>Esc</kbd> to return
        </span>
      </div>
    </Modal>
  );
}
