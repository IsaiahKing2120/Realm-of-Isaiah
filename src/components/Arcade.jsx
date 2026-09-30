import { useCallback, useEffect, useRef, useState } from 'react';
import { readPreference, writePreference } from '../lib/storage';
import Icon from './Icon';
import Modal from './Modal';

const runes = [
  { name: 'Ember', icon: 'spark' },
  { name: 'Crystal', icon: 'gem' },
  { name: 'Blade', icon: 'swords' },
  { name: 'Grove', icon: 'leaf' },
];
const chooseRune = () => Math.floor(Math.random() * runes.length);

export default function Arcade({ onClose, onWin }) {
  const [sequence, setSequence] = useState([]);
  const [phase, setPhase] = useState('ready');
  const [lit, setLit] = useState(-1);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [best, setBest] = useState(() =>
    Math.max(0, Math.min(5, Number(readPreference('rune-best', 0)) || 0)),
  );
  const timers = useRef([]);
  const locked = useRef(false);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const schedule = (fn, delay) => {
    timers.current.push(setTimeout(fn, delay));
  };

  useEffect(() => () => clearTimers(), [clearTimers]);
  const showSequence = (next) => {
    clearTimers();
    locked.current = true;
    setSequence(next);
    setPhase('watch');
    setLit(-1);
    setStep(0);
    next.forEach((rune, index) => {
      schedule(() => setLit(rune), 650 + index * 950);
      schedule(() => setLit(-1), 1250 + index * 950);
    });
    schedule(
      () => {
        locked.current = false;
        setPhase('input');
      },
      700 + next.length * 950,
    );
  };
  const press = (rune) => {
    if (phase !== 'input' || locked.current) return;
    setLit(rune);
    schedule(() => setLit(-1), 180);
    if (rune !== sequence[step]) {
      locked.current = true;
      setPhase('lost');
      return;
    }
    if (step + 1 < sequence.length) {
      setStep(step + 1);
      return;
    }
    locked.current = true;
    const score = sequence.length;
    setCompleted(score);
    setStep(score);
    if (score > best) {
      setBest(score);
      writePreference('rune-best', score);
    }
    if (score === 5) {
      setPhase('won');
      onWin();
    } else {
      setPhase('round');
      schedule(() => showSequence([...sequence, chooseRune()]), 950);
    }
  };
  const pressRef = useRef(press);
  pressRef.current = press;
  useEffect(() => {
    const onKey = (event) => {
      if (
        /^[1-4]$/.test(event.key) &&
        !event.repeat &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        event.preventDefault();
        pressRef.current(Number(event.key) - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const restart = () => {
    setCompleted(0);
    showSequence([chooseRune()]);
  };
  const messages = {
    ready: 'A small test of memory. A worthy side quest.',
    watch: 'Watch the runes. Remember the order.',
    input: 'Your turn. Repeat the sequence.',
    round: 'Well played. The pattern grows…',
    lost: 'The runes slipped away. Give it another go.',
    won: 'Quest complete. You are a Rune Keeper.',
  };
  return (
    <Modal
      title="Rune Relay"
      eyebrow="SIDE QUEST / THE ARCADE"
      onClose={onClose}
      className="arcade-modal"
    >
      <div className="arcade-body">
        <p>
          Watch the sequence, then repeat it. Clear five rounds to earn your
          badge. Click, tap, or use keys <kbd>1</kbd> through <kbd>4</kbd>.
        </p>
        <div className="arcade-stats">
          <span>
            ROUND <strong>{sequence.length || 1} / 5</strong>
          </span>
          <span>
            BEST <strong>{best} / 5</strong>
          </span>
        </div>
        <div className="rune-grid">
          {runes.map((rune, index) => (
            <button
              key={rune.name}
              className={`rune rune-${index} ${lit === index ? 'lit' : ''}`}
              onClick={() => press(index)}
              aria-disabled={phase !== 'input'}
              aria-label={`${rune.name}, key ${index + 1}${lit === index ? ', illuminated' : ''}`}
            >
              <span className="rune-key">0{index + 1}</span>
              <Icon name={rune.icon} size={40} />
              <span>{rune.name}</span>
            </button>
          ))}
        </div>
        <span
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {phase === 'watch' && lit >= 0 ? runes[lit].name : ''}
        </span>
        <div className="arcade-message" role="status">
          <Icon
            name={phase === 'won' ? 'gem' : phase === 'lost' ? 'down' : 'spark'}
            size={19}
          />
          <p>{messages[phase]}</p>
        </div>
        <div
          className="round-progress"
          aria-label={`${completed} of 5 rounds completed`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <i className={index < completed ? 'complete' : ''} key={index} />
          ))}
        </div>
        {['ready', 'lost', 'won'].includes(phase) ? (
          <button className="button primary arcade-start" onClick={restart}>
            {phase === 'ready' ? 'Begin the quest' : 'Play again'}
            <Icon name="arrow" size={18} />
          </button>
        ) : (
          <button
            className="text-button replay-sequence"
            onClick={() => showSequence(sequence)}
            disabled={phase !== 'input'}
          >
            Replay this sequence <Icon name="down" size={15} />
          </button>
        )}
        <small className="arcade-note">
          Your best round stays in this browser. No scoreboards, just bragging
          rights.
        </small>
      </div>
    </Modal>
  );
}
