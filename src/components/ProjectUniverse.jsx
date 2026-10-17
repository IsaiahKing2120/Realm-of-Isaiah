import { useId, useState } from "react";
import { projects } from "../data/portfolio";
import { caseStudies, caseStudyPath } from "../data/caseStudies";
import Icon from "./Icon";

const locations = [
  [26, 21],
  [73, 24],
  [49, 47],
  [78, 71],
  [15, 66],
  [34, 83],
  [65, 88],
  [48, 10],
];
const shared = (a, b) => a.tags.filter((tag) => b.tags.includes(tag));
export default function ProjectUniverse({ onOpen }) {
  const [selected, setSelected] = useState("monday");
  const [hovered, setHovered] = useState(null);
  const panel = useId();
  const current = projects.find((item) => item.id === selected);
  const focus = hovered || selected;
  const connections = projects.filter(
    (item) => item.id !== current.id && shared(current, item).length,
  );
  return (
    <div className="project-universe">
      <div className="universe-heading">
        <span className="eyebrow">
          PROJECT ATLAS / {projects.length} BUILDS
        </span>
        <p>Select an artifact. Follow a shared technology.</p>
      </div>
      <div className="universe-layout">
        <div
          className="constellation"
          role="group"
          aria-label="Project constellation"
        >
          <div className="universe-orbit orbit-one" aria-hidden="true" />
          <div className="universe-orbit orbit-two" aria-hidden="true" />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {projects.flatMap((a, i) =>
              projects
                .slice(i + 1)
                .map((b, k) =>
                  shared(a, b).length ? (
                    <line
                      key={`${a.id}-${b.id}`}
                      x1={locations[i][0]}
                      y1={locations[i][1]}
                      x2={locations[i + k + 1][0]}
                      y2={locations[i + k + 1][1]}
                      className={
                        a.id === focus || b.id === focus ? "linked" : ""
                      }
                    />
                  ) : null,
                ),
            )}
          </svg>
          {projects.map((project, i) => (
            <button
              key={project.id}
              className={`project-node node-${project.id} ${selected === project.id ? "selected" : ""}`}
              style={{
                "--x": `${locations[i][0]}%`,
                "--y": `${locations[i][1]}%`,
              }}
              aria-pressed={selected === project.id}
              aria-controls={panel}
              onClick={() => setSelected(project.id)}
              onPointerEnter={() => setHovered(project.id)}
              onPointerLeave={() => setHovered(null)}
            >
              <span className="node-object">
                <Icon
                  name={
                    project.category === "Game development"
                      ? "swords"
                      : project.category === "Web development"
                        ? "code"
                        : project.id === "monday"
                          ? "spark"
                          : "server"
                  }
                  size={22}
                />
              </span>
              <span>
                {caseStudies[project.id]?.shortTitle || project.title}
              </span>
              <small>BUILD {project.number}</small>
            </button>
          ))}
          <span className="atlas-coordinate" aria-hidden="true">
            IK / PERSONAL SYSTEMS MAP
          </span>
        </div>
        <div
          className="universe-inspector"
          id={panel}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="eyebrow">
            ARTIFACT {current.number} / {current.status}
          </span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <div className="tags">
            {current.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="universe-connections">
            <span className="eyebrow">SHARED TECHNOLOGIES</span>
            {connections.length ? (
              connections.map((item) => (
                <button key={item.id} onClick={() => setSelected(item.id)}>
                  {item.title}
                  <small>{shared(current, item).join(" · ")}</small>
                </button>
              ))
            ) : (
              <p>A distinct stack in this project collection.</p>
            )}
          </div>
          {caseStudies[current.id] ? (
            <a className="button primary" href={caseStudyPath(current.id)}>
              Enter case study <Icon name="arrow" size={16} />
            </a>
          ) : (
            <button
              className="button primary"
              onClick={() => onOpen(current.id)}
            >
              Inspect the build <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="atlas-note">
        Lines represent matching technologies in the project notes, not
        integrations between applications.
      </p>
    </div>
  );
}
