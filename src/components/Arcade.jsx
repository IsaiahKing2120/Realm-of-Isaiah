import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Icon from "./Icon";
import RuneRelay from "./RuneRelay";
import PacketRunner from "./PacketRunner";
import SectorSalvage from "./SectorSalvage";
import BootSequence from "./BootSequence";
import { quests } from "../data/quests";
import { readPreference, writePreference } from "../lib/storage";
import "../quests.css";

const games = {
  runes: RuneRelay,
  packets: PacketRunner,
  salvage: SectorSalvage,
  scheduler: BootSequence,
};
function readBadges() {
  const saved = readPreference("quest-badges", {});
  return Object.fromEntries(
    quests.map((quest) => [
      quest.id,
      quest.id === "runes"
        ? readPreference("rune-best", 0) === 5
        : saved?.[quest.id] === true,
    ]),
  );
}
export default function Arcade({ onClose, onWin, initialQuest }) {
  const [selected, setSelected] = useState(
    games[initialQuest] ? initialQuest : null,
  );
  const [badges, setBadges] = useState(readBadges);
  const body = useRef(null);
  const quest = quests.find((item) => item.id === selected),
    Game = games[selected];
  const complete = () => {
    const saved = readBadges();
    const next = Object.fromEntries(
      quests.map((item) => [
        item.id,
        badges[item.id] || saved[item.id] || item.id === selected,
      ]),
    );
    writePreference("quest-badges", next);
    setBadges(next);
    if (selected === "runes") onWin();
  };
  useEffect(() => {
    body.current?.focus({ preventScroll: true });
    body.current?.closest("dialog")?.scrollTo({ top: 0 });
  }, [selected]);
  return (
    <Modal
      title={quest?.title || "The Side Quest Board"}
      eyebrow="OPTIONAL DETOURS / LOCAL ARCADE"
      className={`arcade-modal quest-modal ${selected ? `quest-${selected}` : "quest-board-modal"}`}
      onClose={onClose}
    >
      <div
        className="quest-content"
        ref={body}
        tabIndex={-1}
        aria-label={
          quest
            ? `${quest.title} instructions and controls`
            : "Choose a side quest"
        }
      >
        {quest ? (
          <>
            <div className="quest-game-nav">
              <button className="text-button" onClick={() => setSelected(null)}>
                ← Quest board
              </button>
              <span
                className={`quest-badge ${badges[selected] ? "earned" : ""}`}
              >
                <Icon name={badges[selected] ? "check" : "gem"} size={14} />
                {badges[selected] ? quest.badge : "Badge to discover"}
              </span>
            </div>
            <Game onWin={complete} />
          </>
        ) : (
          <>
            <p className="quest-board-intro">
              The work can wait a minute. Restore a relay, recover a lost
              archive, or see how far your memory takes you.
            </p>
            <div className="quest-collection">
              <span className="eyebrow">YOUR COLLECTION</span>
              <strong>
                {Object.values(badges).filter(Boolean).length} / {quests.length}{" "}
                badges
              </strong>
            </div>
            <div className="quest-board-grid">
              {quests.map((item) => (
                <button
                  key={item.id}
                  className={`quest-card ${badges[item.id] ? "completed" : ""}`}
                  onClick={() => setSelected(item.id)}
                >
                  <span className="quest-card-top">
                    <Icon name={item.icon} size={29} />
                    <small>{item.time}</small>
                  </span>
                  <span className="eyebrow">{item.genre}</span>
                  <strong>{item.title}</strong>
                  <span className="quest-card-description">
                    {item.description}
                  </span>
                  <span className="quest-card-footer">
                    {badges[item.id] ? `✓ ${item.badge}` : "Accept quest"}
                    <Icon name="arrow" size={16} />
                  </span>
                </button>
              ))}
            </div>
            <p className="quest-board-note">
              No accounts or leaderboards. Take your time. Badges stay in this
              browser. Leave a quest anytime; unfinished runs restart when
              reopened. Rune Relay’s existing record is preserved.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
