import {
  credentials,
  experience,
  profile,
  skillBranches,
} from "../data/portfolio";
import { caseStudies, featuredIds, caseStudyPath } from "../data/caseStudies";
import ResumeLinks from "./ResumeLinks";
export default function RecruiterBrief() {
  return (
    <section className="recruiter-brief section" aria-labelledby="brief-title">
      <span className="eyebrow">RECRUITER MODE / THE SHORT VERSION</span>
      <h1 id="brief-title">
        Isaiah King <em>IT + software development.</em>
      </h1>
      <p>
        Enterprise deployment, technical support, automation, and modular
        software. Atlanta, Georgia.
      </p>
      <div className="brief-actions">
        <ResumeLinks />
        <a className="button secondary" href={`mailto:${profile.email}`}>
          Email Isaiah
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </div>
      <div className="brief-grid">
        <div>
          <h3>Experience</h3>
          {experience.map((job) => (
            <a key={job.title} href="#journey">
              <strong>{job.title}</strong>
              <span>{job.company}</span>
              <small>{job.date}</small>
            </a>
          ))}
        </div>
        <div>
          <h3>Skills & credentials</h3>
          {skillBranches.map((branch) => (
            <p key={branch.id}>
              <strong>{branch.name}</strong>
              <br />
              {branch.nodes.map((node) => node.short).join(" · ")}
            </p>
          ))}
          {credentials.map((item) => (
            <p key={item.title}>
              {item.title} <small>({item.status})</small>
            </p>
          ))}
        </div>
        <div>
          <h3>Featured evidence</h3>
          {featuredIds.map((id) => (
            <a key={id} href={caseStudyPath(id)}>
              <strong>{caseStudies[id].shortTitle} ↗</strong>
              <span>{caseStudies[id].summary}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="brief-note">
        Full project details, skills, and employment history remain below.
        Switch Recruiter Mode off to return to the Realm experience.
      </p>
    </section>
  );
}
