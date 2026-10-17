import { useState } from "react";
import { createField, neighbors, revealSector } from "../data/quests";
import { moveGridFocus } from "../lib/questControls";
export default function SectorSalvage({ onWin }) {
  const [mines, setMines] = useState(null),
    [opened, setOpened] = useState([]),
    [flags, setFlags] = useState([]),
    [marking, setMarking] = useState(false),
    [phase, setPhase] = useState("play"),
    [scans, setScans] = useState(0),
    [message, setMessage] = useState(
      "Choose any sector. Your first reveal and its neighbors are safe.",
    );
  const reveal = (index, scan = false) => {
    if (phase !== "play") return;
    if (!scan && (flags.includes(index) || opened.includes(index))) return;
    const field = mines || createField(index);
    if (!mines) setMines(field);
    const markers = scan ? flags.filter((n) => n !== index) : flags;
    if (scan) {
      setFlags(markers);
      setScans((n) => n + 1);
    }
    if (field.includes(index)) {
      setPhase("lost");
      setMessage(
        "Corruption hit. The archive is isolated. Start a new field and try another route.",
      );
      return;
    }
    const next = revealSector(index, field, opened, markers);
    setOpened(next);
    if (next.length === 20) {
      setPhase("won");
      setMessage("All 20 safe sectors recovered. Salvager badge earned.");
      onWin();
    } else
      setMessage(
        `${scan ? "Scanner recovered" : "Recovered"} row ${Math.floor(index / 5) + 1}, column ${(index % 5) + 1}. ${next.length} of 20 safe sectors open.`,
      );
  };
  const choose = (index) => {
    if (phase !== "play" || opened.includes(index)) return;
    if (marking) {
      setFlags((items) =>
        items.includes(index)
          ? items.filter((n) => n !== index)
          : [...items, index],
      );
      setMessage(
        flags.includes(index)
          ? "Fault marker removed."
          : "Suspected fault marked. Switch to Reveal to recover sectors.",
      );
    } else reveal(index);
  };
  const scan = () => {
    const cell = mines
      ? Array.from({ length: 25 }, (_, i) => i).find(
          (i) => !mines.includes(i) && !opened.includes(i),
        )
      : 12;
    if (cell !== undefined) reveal(cell, true);
  };
  const reset = () => {
    setMines(null);
    setOpened([]);
    setFlags([]);
    setMarking(false);
    setPhase("play");
    setScans(0);
    setMessage("New archive. Your first reveal and its neighbors are safe.");
  };
  return (
    <div className="quest-game">
      <p>
        Recover all <strong>20 safe sectors</strong> without opening the five
        faults. A number counts faults in its eight neighboring cells. Mark
        suspected faults, or use a safe scan when the clues run out. No guessing
        required.
      </p>
      <div className="quest-stats">
        <span>
          RECOVERED <strong>{opened.length} / 20</strong>
        </span>
        <span>
          MARKED <strong>{flags.length}</strong>
        </span>
        <span>
          SCANS <strong>{scans}</strong>
        </span>
      </div>
      <div className="sector-modes" role="group" aria-label="Sector action">
        <button aria-pressed={!marking} onClick={() => setMarking(false)}>
          Reveal sectors
        </button>
        <button aria-pressed={marking} onClick={() => setMarking(true)}>
          Mark faults
        </button>
      </div>
      <div
        className="salvage-grid"
        role="group"
        aria-label="Archive sectors. Arrow keys move; Enter or Space uses the selected action."
        onKeyDown={(event) => moveGridFocus(event, 5)}
      >
        {Array.from({ length: 25 }, (_, index) => {
          const open = opened.includes(index),
            fault = phase !== "play" && mines?.includes(index),
            flag = flags.includes(index),
            count = mines
              ? neighbors(index).filter((n) => mines.includes(n)).length
              : 0;
          return (
            <button
              key={index}
              data-cell={index}
              className={`sector-tile ${open ? "recovered" : ""} ${fault ? "fault" : ""} ${flag ? "flagged" : ""}`}
              aria-disabled={phase !== "play" || open}
              aria-label={`Row ${Math.floor(index / 5) + 1}, column ${(index % 5) + 1}, ${fault ? "fault" : open ? `${count} neighboring faults` : flag ? "marked fault" : "unexplored"}`}
              onClick={() => choose(index)}
            >
              {fault ? "×" : open ? count || "·" : flag ? "⚑" : "◇"}
            </button>
          );
        })}
      </div>
      <p
        className={`quest-feedback ${phase === "won" ? "success" : ""}`}
        role="status"
      >
        {message}
      </p>
      <div className="quest-actions">
        <button
          className="button primary"
          disabled={phase !== "play"}
          onClick={scan}
        >
          Scan a safe sector
        </button>
        <button className="button secondary" onClick={reset}>
          New field
        </button>
      </div>
      <small className="quest-disclaimer">
        Scans are unlimited and can clear an incorrect marker. Everything is
        fictional; no files are accessed.
      </small>
    </div>
  );
}
