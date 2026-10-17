import { useState } from "react";
import { projects } from "../data/portfolio";
import { caseStudies, caseStudyPath, featuredIds } from "../data/caseStudies";
import Icon from "./Icon";
import Modal from "./Modal";
import ProjectUniverse from "./ProjectUniverse";

export function ProjectArt({ project }) {
  if (project.id === "monday")
    return (
      <div className="project-art art-monday" aria-hidden="true">
        <div className="art-topline">
          <span>MONDAY / PERSONAL WORKSPACE</span>
          <span className="small-dot" />
        </div>
        <div className="monday-orbit">
          <i />
          <i />
          <i />
          <div className="monday-core">
            <Icon name="spark" size={32} />
          </div>
        </div>
        <div className="mini-command">
          <span>›</span> A little less friction. A lot more doing.<b>_</b>
        </div>
        <span className="art-caption">CONVERSATION → ACTION</span>
      </div>
    );
  if (project.id === "toolkit")
    return (
      <div className="project-art art-toolkit" aria-hidden="true">
        <div className="diagnostic-window">
          <div className="diagnostic-head">
            <Icon name="terminal" size={15} />
            <span>KTD / WORKSTATION REPORT</span>
            <span>•••</span>
          </div>
          <div className="diagnostic-body">
            <div className="diagnostic-score">
              <span>20+</span>
              <small>AUTOMATED CHECKS</small>
            </div>
            {[
              "System health",
              "Storage & hardware",
              "Security & encryption",
            ].map((row, i) => (
              <div className="diagnostic-row" key={row}>
                <span>{row}</span>
                <span className={i === 2 ? "sample-warn" : "sample-pass"}>
                  {i === 2 ? "REVIEW" : "PASS"}
                  <i />
                </span>
              </div>
            ))}
            <div className="diagnostic-bottom">
              <span>PORTABLE. PRACTICAL. BUILT FOR THE BENCH.</span>
            </div>
          </div>
        </div>
        <span className="art-caption">
          SAMPLE REPORT / PROJECT ILLUSTRATION
        </span>
      </div>
    );
  if (project.id === "tcg")
    return (
      <div className="project-art art-tcg" aria-hidden="true">
        <div className="card-orbit" />
        <div className="playing-card card-back">
          <span>THE REALM</span>
          <Icon name="swords" size={58} />
          <span>STRATEGY</span>
        </div>
        <div className="playing-card card-front">
          <div className="card-corners">
            III <Icon name="gem" size={14} />
          </div>
          <div className="card-sigil">
            <Icon name="spark" size={55} />
          </div>
          <span>EVERBOUND</span>
          <small>A WORLD IN EVERY HAND</small>
          <div className="card-lines">
            <i />
            <i />
          </div>
        </div>
        <span className="art-caption">GAME SYSTEMS / WORLDS IN PROGRESS</span>
      </div>
    );
  const icons = {
    "ground-zero": "swords",
    "e-plant": "leaf",
    redux: "layers",
    "event-planner": "calendar",
    realm: "gem",
  };
  return (
    <div
      className={`project-art art-archive art-${project.id}`}
      aria-hidden="true"
    >
      <span className="archive-number">{project.number}</span>
      <div className="archive-sigil">
        <Icon name={icons[project.id]} size={46} />
      </div>
      <span className="art-caption">{project.tags.join(" / ")}</span>
    </div>
  );
}

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState("All archived work");
  const archive = projects.filter(
    (project) => !featuredIds.includes(project.id),
  );
  const filters = ["All archived work", "Game development", "Web development"];
  const visible =
    filter === "All archived work"
      ? archive
      : archive.filter((project) => project.category === filter);
  return (
    <section
      id="work"
      className="section work-section"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span>01</span> FEATURED BUILDS
          </span>
          <h2 id="work-title">
            Three builds. <em>A lot of ground covered.</em>
          </h2>
        </div>
        <p>
          Useful tools, deliberate systems, and worlds in progress. Here’s the
          thinking behind the work.
        </p>
      </div>
      <ProjectUniverse onOpen={onOpen} />
      <div className="featured-builds">
        {featuredIds.map((id) => {
          const project = projects.find((item) => item.id === id);
          const study = caseStudies[id];
          return (
            <article key={id} className={`featured-build featured-${id}`}>
              <a
                className="featured-art"
                href={caseStudyPath(id)}
                aria-label={`Read the ${project.title} case study`}
              >
                <ProjectArt project={project} />
                <span className="featured-art-label">
                  BUILD {project.number} <Icon name="diagonal" size={18} />
                </span>
              </a>
              <div className="featured-copy">
                <div className="featured-topline">
                  <span className="eyebrow">{project.category}</span>
                  <span className="featured-status">
                    <i /> In development
                  </span>
                </div>
                <h3>
                  <a href={caseStudyPath(id)}>{project.title}</a>
                </h3>
                <p>{study.summary}</p>
                <div className="featured-proof">
                  {study.metrics.slice(0, 2).map((metric) => (
                    <span key={metric.label}>
                      <strong>{metric.value}</strong>
                      {metric.label}
                    </span>
                  ))}
                </div>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a
                  className="text-button featured-link"
                  href={caseStudyPath(id)}
                >
                  Read the case study <Icon name="arrow" size={18} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
      <details className="project-archive">
        <summary>
          <span>
            <span className="eyebrow">THE ARCHIVE</span>
            <strong>More from the workbench</strong>
            <small>
              React projects, an Unreal prototype, and the realm itself.
            </small>
          </span>
          <span className="archive-count">
            05 <Icon name="down" size={20} />
          </span>
        </summary>
        <div className="archive-content">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter archived projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="projects-grid" aria-live="polite">
            {visible.map((project) => (
              <article className="project-card" key={project.id}>
                <button
                  className="project-art-button"
                  onClick={() => onOpen(project.id)}
                  aria-label={`Explore ${project.title}`}
                >
                  <ProjectArt project={project} />
                  <span className="art-open">
                    <Icon name="diagonal" />
                  </span>
                </button>
                <div className="project-info">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>
                    <button onClick={() => onOpen(project.id)}>
                      {project.title}
                    </button>
                  </h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="text-button project-link"
                    onClick={() => onOpen(project.id)}
                  >
                    Explore the project <Icon name="diagonal" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </details>
    </section>
  );
}

export function ProjectModal({ id, onClose, onGuide }) {
  const project = projects.find((item) => item.id === id);
  if (!project) return null;
  return (
    <Modal
      title={project.title}
      eyebrow={`${project.category} / ${project.status}`}
      onClose={onClose}
      className="project-modal"
    >
      <ProjectArt project={project} />
      <div className="project-detail">
        <p className="project-subtitle">{project.subtitle}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="detail-columns">
          <div>
            <h3>The idea</h3>
            <p>{project.challenge}</p>
          </div>
          <div>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>
        <h3>What’s in the build</h3>
        <ul className="built-list">
          {project.built.map((item) => (
            <li key={item}>
              <Icon name="check" size={16} />
              {item}
            </li>
          ))}
        </ul>
        <div className="next-step">
          <span className="eyebrow">NEXT ON THE QUEST</span>
          <p>{project.next}</p>
        </div>
        {project.note && <p className="detail-note">{project.note}</p>}
        <div className="detail-actions">
          {project.repo && (
            <a
              className="button primary"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
            >
              View source <Icon name="github" size={18} />
            </a>
          )}
          {project.id === "monday" && (
            <button className="button primary" onClick={onGuide}>
              Meet the portfolio guide <Icon name="arrow" size={18} />
            </button>
          )}
          <a
            className="button secondary"
            href="mailto:isaiahking2120@gmail.com?subject=Let%E2%80%99s%20talk%20about%20your%20projects"
          >
            Ask me about it <Icon name="mail" size={18} />
          </a>
        </div>
      </div>
    </Modal>
  );
}
