import { useEffect, useState } from "react";
import { projects, profile } from "../data/portfolio";
import { caseStudies, caseStudyPath, featuredIds } from "../data/caseStudies";
import { ProjectArt } from "./Projects";
import Architecture from "./Architecture";
import Terminal from "./Terminal";
import Icon from "./Icon";
import Modal from "./Modal";

export default function CaseStudy({ id, onAction }) {
  const project = projects.find((item) => item.id === id);
  const study = caseStudies[id];
  const [selectedImage, setSelectedImage] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    if (!copyStatus) return;
    const timer = setTimeout(() => setCopyStatus(""), 4500);
    return () => clearTimeout(timer);
  }, [copyStatus]);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${profile.siteUrl}projects/${study.slug}/`,
      );
      setCopyStatus("Project link copied.");
    } catch {
      setCopyStatus(
        "Copy the address from your browser to share this case study.",
      );
    }
  };
  const nextId =
    featuredIds[(featuredIds.indexOf(id) + 1) % featuredIds.length];
  return (
    <article className={`case-study case-${id}`}>
      <header className="case-hero section">
        <a
          className="text-button case-back"
          href={`${import.meta.env.BASE_URL}#work`}
        >
          <Icon name="arrow" size={17} /> All featured builds
        </a>
        <div className="case-hero-grid">
          <div>
            <span className="eyebrow">{study.discipline}</span>
            <p className="case-project-name">{project.title}</p>
            <h1>{study.heading}</h1>
            <p className="case-lede">{study.summary}</p>
            <div className="case-status">
              <i />
              {study.status}
            </div>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="case-hero-actions">
              <a
                className="button primary"
                href={id === "monday" ? "#project-demo" : "#evidence"}
              >
                {id === "monday" ? "Try the portfolio demo" : "See the build"}
                <Icon name="arrow" size={17} />
              </a>
              <button className="text-button" onClick={copyLink}>
                <Icon name="copy" size={15} /> Share case study
              </button>
            </div>
            <p className="case-copy-status" role="status">
              {copyStatus}
            </p>
          </div>
          <div className="case-cover">
            <ProjectArt project={project} />
            <span className="cover-label">PROJECT ILLUSTRATION</span>
          </div>
        </div>
        <dl className="proof-metrics">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
              <dd className="metric-note">{metric.detail}</dd>
            </div>
          ))}
        </dl>
      </header>
      <nav className="case-jump page-width" aria-label="Case study sections">
        <a href="#story">Problem → Build → Result</a>
        <a href="#evidence">Inside the build</a>
        <a href="#architecture">Architecture</a>
        <a href="#status">Status & next steps</a>
      </nav>
      <section
        id="story"
        className="section case-story"
        aria-labelledby="story-title"
      >
        <span className="eyebrow">01 / THE BUILD STORY</span>
        <h2 id="story-title">
          A problem worth <em>working on.</em>
        </h2>
        <div className="story-grid">
          {[
            { title: "Problem", text: project.challenge },
            { title: "Build", text: project.approach },
            { title: "Result", text: study.result },
          ].map((part, index) => (
            <div key={part.title}>
              <span className="story-number">0{index + 1}</span>
              <h3>{part.title}</h3>
              <p>{part.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="evidence"
        className="section evidence-section"
        aria-labelledby="evidence-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / INSIDE THE BUILD</span>
            <h2 id="evidence-title">
              Something you can <em>inspect.</em>
            </h2>
          </div>
          <p>
            {id === "monday"
              ? "Try the curated browser demo, then inspect the design behind the local assistant."
              : "Selected views from the development build. Open an image for a closer look."}
          </p>
        </div>
        {id === "monday" ? (
          <div id="project-demo" className="case-terminal">
            <Terminal onAction={onAction} />
            <div className="terminal-evidence">
              <span className="eyebrow">
                LOCAL CLI / RECORDED SESSION EXCERPT
              </span>
              <pre>
                <code>
                  {
                    "You > show system info\n\nMONDAY > Intent: inspect_system\nMONDAY > Tool: system.info\nMONDAY > Risk: Green\nMONDAY > System information collected."
                  }
                </code>
              </pre>
              <p>
                An excerpt from the local prototype. Machine-specific details
                are omitted.
              </p>
            </div>
          </div>
        ) : (
          <div className="evidence-gallery">
            {study.gallery.map((item) => (
              <figure key={item.src}>
                <button
                  className="screenshot-button"
                  onClick={() => setSelectedImage(item)}
                  aria-label={`Enlarge: ${item.title}`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/projects/${item.src}`}
                    alt={item.alt}
                    loading="lazy"
                    width={item.width || 1440}
                    height={item.height || 1040}
                  />
                  <span>
                    <Icon name="search" size={16} /> Take a closer look
                  </span>
                </button>
                <figcaption>
                  <strong>{item.title}</strong>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
      <section
        id="architecture"
        className="section case-architecture"
        aria-labelledby="architecture-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / HOW IT FITS TOGETHER</span>
            <h2 id="architecture-title">
              Built with <em>clear boundaries.</em>
            </h2>
          </div>
          <p>
            Select a component to see its role and how it connects to the rest
            of the build.
          </p>
        </div>
        <Architecture architecture={study.architecture} />
        <div className="decision-grid">
          {study.decisions.map((decision, index) => (
            <div key={decision.title}>
              <span className="eyebrow">DECISION 0{index + 1}</span>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="status"
        className="section case-status-section"
        aria-labelledby="status-title"
      >
        <span className="eyebrow">04 / CURRENT STATE</span>
        <h2 id="status-title">
          Built so far. <em>Building next.</em>
        </h2>
        <div className="build-status-grid">
          <div>
            <h3>
              <Icon name="check" /> In the development build
            </h3>
            <ul>
              {study.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>
              <Icon name="arrow" /> The next iteration
            </h3>
            <ul>
              {study.next.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="project-boundary">
          <span className="eyebrow">PROTOTYPE SCOPE</span>
          <p>{study.boundary}</p>
        </div>
        <p className="source-note">{study.sourceNote}</p>
        <div className="case-contact">
          <div>
            <h3>Want to go deeper?</h3>
            <p>
              Let’s talk through the code, the tradeoffs, or the next iteration.
            </p>
          </div>
          <a
            className="button primary"
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let’s talk about ${project.title}`)}`}
          >
            Ask about this build
            <Icon name="mail" size={17} />
          </a>
        </div>
      </section>
      <a className="next-case page-width" href={caseStudyPath(nextId)}>
        <span>
          <small className="eyebrow">NEXT FEATURED BUILD</small>
          <strong>{caseStudies[nextId].shortTitle}</strong>
        </span>
        <Icon name="arrow" size={30} />
      </a>
      {selectedImage && (
        <Modal
          title={selectedImage.title}
          eyebrow="FROM THE DEVELOPMENT BUILD"
          onClose={() => setSelectedImage(null)}
          className="screenshot-modal"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/projects/${selectedImage.src}`}
            alt={selectedImage.alt}
          />
          <p>{selectedImage.caption}</p>
          <a
            className="text-button"
            href={`${import.meta.env.BASE_URL}images/projects/${selectedImage.src}`}
            target="_blank"
            rel="noreferrer"
          >
            Open full-size image
            <Icon name="diagonal" size={16} />
          </a>
        </Modal>
      )}
    </article>
  );
}
