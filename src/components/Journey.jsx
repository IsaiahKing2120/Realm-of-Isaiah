import { credentials, experience, profile } from '../data/portfolio';
import Icon from './Icon';

export default function Journey() {
  return (
    <section
      id="journey"
      className="section journey-section"
      aria-labelledby="journey-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span>03</span> THE QUEST LOG
          </span>
          <h2 id="journey-title">
            Experience is <em>earned.</em>
          </h2>
        </div>
        <a
          className="text-button"
          href={profile.resume}
          download="Isaiah_King_Resume.pdf"
        >
          The résumé version <Icon name="download" size={17} />
        </a>
      </div>
      <div className="journey-layout">
        <div className="timeline">
          {experience.map((job) => (
            <article
              key={job.title}
              className={`timeline-item ${job.current ? 'current' : ''}`}
            >
              <div className="timeline-marker">
                <span />
              </div>
              <div className="timeline-content">
                <div className="job-meta">
                  <span>{job.date}</span>
                  {job.current && (
                    <span className="current-label">CURRENT QUEST</span>
                  )}
                </div>
                <h3>{job.title}</h3>
                <div className="job-company">{job.company}</div>
                <p>{job.text}</p>
                <div className="job-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="credential-panel">
          <div className="credential-title">
            <Icon name="book" size={22} />
            <span className="eyebrow">KNOWLEDGE COLLECTED</span>
          </div>
          <h3>
            Still a student
            <br />
            <em>of the craft.</em>
          </h3>
          <p>
            Structured learning, hands-on work, and the occasional “why won’t
            this compile?”
          </p>
          <div className="credentials">
            {credentials.map((item) => (
              <div className="credential" key={item.title}>
                <span
                  className={`credential-icon ${item.status === 'In progress' ? 'in-progress' : ''}`}
                >
                  <Icon
                    name={item.status === 'In progress' ? 'book' : 'check'}
                    size={15}
                  />
                </span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.issuer}</p>
                  <small>{item.status}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="credential-note">
            <Icon name="spark" size={15} />
            <span>The next level always has something to teach.</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
