import { useState } from "react";
import { bootMissions } from "../data/quests";
export default function BootSequence({ onWin }) {
  const [level, setLevel] = useState(0),
    [done, setDone] = useState([]),
    [retries, setRetries] = useState(0),
    [message, setMessage] = useState(
      "Dispatch a job whose dependencies are complete.",
    );
  const mission = bootMissions[level],
    won = done.length === mission.jobs.length;
  const name = (id) => mission.jobs.find((job) => job.id === id).label;
  const dispatch = (job) => {
    if (won || done.includes(job.id)) return;
    const waiting = job.needs.filter((id) => !done.includes(id));
    if (waiting.length) {
      setRetries((n) => n + 1);
      setMessage(
        `${job.label} is waiting for: ${waiting.map(name).join(", ")}. ${job.note}`,
      );
      return;
    }
    const next = [...done, job.id];
    setDone(next);
    if (next.length === mission.jobs.length) {
      setMessage(
        level === 2
          ? "Three systems online. System Architect badge earned."
          : "Sequence complete. All dependencies satisfied.",
      );
      if (level === 2) onWin();
    } else setMessage(`${job.label} complete. ${job.note}`);
  };
  const reset = (next) => {
    setLevel(next);
    setDone([]);
    setRetries(0);
    setMessage("Dispatch a job whose dependencies are complete.");
  };
  return (
    <div className="quest-game">
      <p>
        Put the jobs in a valid order. Each job tells you what must finish
        first. Independent jobs can run in either order. This is a puzzle, not a
        live system console.
      </p>
      <div className="quest-stats">
        <span>
          SYSTEM <strong>{level + 1} / 3</strong>
        </span>
        <span>
          JOBS{" "}
          <strong>
            {done.length} / {mission.jobs.length}
          </strong>
        </span>
        <span>
          BLOCKED ATTEMPTS <strong>{retries}</strong>
        </span>
      </div>
      <h3 className="boot-title">{mission.title}</h3>
      <p className="boot-context">{mission.context}</p>
      <div className="boot-jobs" role="group" aria-label="Dispatch jobs">
        {mission.jobs.map((job) => (
          <button
            key={job.id}
            className={done.includes(job.id) ? "job-complete" : ""}
            aria-disabled={done.includes(job.id)}
            onClick={() => dispatch(job)}
          >
            <span className="job-state" aria-hidden="true">
              {done.includes(job.id) ? "✓" : "›"}
            </span>
            <span>
              <strong>{job.label}</strong>
              <small>
                {done.includes(job.id)
                  ? "Complete"
                  : job.needs.length
                    ? `Needs: ${job.needs.map(name).join(" + ")}`
                    : "No dependencies"}
              </small>
            </span>
          </button>
        ))}
      </div>
      <div className="boot-log">
        <span className="eyebrow">EXECUTION ORDER</span>
        {done.length ? (
          <ol>
            {done.map((id) => (
              <li key={id}>{name(id)}</li>
            ))}
          </ol>
        ) : (
          <p>No jobs dispatched yet.</p>
        )}
      </div>
      <p className={`quest-feedback ${won ? "success" : ""}`} role="status">
        {message}
      </p>
      <div className="quest-actions">
        {won && (
          <button
            className="button primary"
            onClick={() => reset(level === 2 ? 0 : level + 1)}
          >
            {level === 2 ? "Boot again" : "Next system"}
          </button>
        )}
        <button className="button secondary" onClick={() => reset(level)}>
          Reset sequence
        </button>
      </div>
    </div>
  );
}
