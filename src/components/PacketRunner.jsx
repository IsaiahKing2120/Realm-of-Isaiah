import { useState } from "react";
import {
  packetPorts,
  tracePacket,
  scramblePacket,
  directions,
} from "../data/quests";
import { moveGridFocus } from "../lib/questControls";

export default function PacketRunner({ onWin }) {
  const [level, setLevel] = useState(0),
    [rotations, setRotations] = useState(() => scramblePacket(0));
  const [moves, setMoves] = useState(0),
    [solved, setSolved] = useState(false),
    [message, setMessage] = useState(
      "Connect the west entrance to the east exit. Then send the packet.",
    );
  const trace = tracePacket(level, rotations);
  const rotate = (index) => {
    if (solved) return;
    setRotations((items) =>
      items.map((n, i) => (i === index ? (n + 1) % 4 : n)),
    );
    setMoves((n) => n + 1);
    setMessage("Conduit rotated. Lit tiles carry the entrance signal.");
  };
  const send = () => {
    if (solved) return;
    if (trace.won) {
      setSolved(true);
      setMessage(
        level === 2
          ? "All three relays restored. Pathfinder badge earned."
          : "Packet delivered. This relay is online.",
      );
      if (level === 2) onWin();
    } else
      setMessage(
        `Signal interrupted at row ${Math.floor(trace.breakAt / 4) + 1}, column ${(trace.breakAt % 4) + 1}. Check the conduit’s open ends.`,
      );
  };
  const reset = (next) => {
    setLevel(next);
    setRotations(scramblePacket(next));
    setMoves(0);
    setSolved(false);
    setMessage("Fresh relay. Rotate the conduits, then send the packet.");
  };
  const endpoints = [
    [50, 0],
    [100, 50],
    [50, 100],
    [0, 50],
  ];
  return (
    <div className="quest-game">
      <p>
        Rotate a tile a quarter-turn with a click, tap, Enter, or Space. Connect{" "}
        <strong>IN</strong> at the upper left to <strong>OUT</strong> at the
        lower right. You do not need every tile. Arrow keys move between tiles.
      </p>
      <div className="quest-stats">
        <span>
          RELAY <strong>{level + 1} / 3</strong>
        </span>
        <span>
          ROTATIONS <strong>{moves}</strong>
        </span>
      </div>
      <div className="packet-edge">
        <span>IN →</span>
        <small>West entrance / upper-left tile</small>
      </div>
      <div
        className="packet-grid"
        role="group"
        aria-label="Rotate routing conduits"
        onKeyDown={(event) => moveGridFocus(event, 4)}
      >
        {rotations.map((turn, index) => {
          const ports = packetPorts(level, index, turn);
          return (
            <button
              key={index}
              data-cell={index}
              className={`packet-tile ${trace.visited.includes(index) ? "energized" : ""}`}
              aria-disabled={solved}
              aria-label={`Row ${Math.floor(index / 4) + 1}, column ${(index % 4) + 1}, ${ports.map((p) => directions[p]).join(" and ")}${trace.visited.includes(index) ? ", carrying signal" : ""}. Rotate clockwise.`}
              onClick={() => rotate(index)}
            >
              <svg viewBox="0 0 100 100" aria-hidden="true">
                {ports.map((p) => (
                  <line
                    key={p}
                    x1="50"
                    y1="50"
                    x2={endpoints[p][0]}
                    y2={endpoints[p][1]}
                  />
                ))}
                <circle cx="50" cy="50" r="8" />
              </svg>
              <small>
                {Math.floor(index / 4) + 1}.{(index % 4) + 1}
              </small>
            </button>
          );
        })}
      </div>
      <div className="packet-edge">
        <small>East exit / lower-right tile</small>
        <span>→ OUT</span>
      </div>
      <p className={`quest-feedback ${solved ? "success" : ""}`} role="status">
        {message}
      </p>
      <div className="quest-actions">
        {solved ? (
          <button
            className="button primary"
            onClick={() => reset(level === 2 ? 0 : level + 1)}
          >
            {level === 2 ? "Run the route again" : "Next relay"}
          </button>
        ) : (
          <button className="button primary" onClick={send}>
            Send packet
          </button>
        )}
        <button className="button secondary" onClick={() => reset(level)}>
          Reset relay
        </button>
      </div>
      <small className="quest-disclaimer">
        A routing puzzle inside the browser. No packets are sent across a real
        network.
      </small>
    </div>
  );
}
