import { useState } from 'react';
import { skillBranches } from '../data/portfolio';
import Icon from './Icon';

export default function SkillTree({ onProject, onArcade }) {
  const [selected, setSelected] = useState('dotnet');
  const branch = skillBranches.find((item) =>
    item.nodes.some((node) => node.id === selected),
  );
  const skill = branch.nodes.find((node) => node.id === selected);
  return (
    <section
      id="skills"
      className="section skills-section"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span>02</span> THE SKILL TREE
          </span>
          <h2 id="skills-title">
            Different paths. <em>One builder.</em>
          </h2>
        </div>
        <p>
          My day job and my side projects feed each other.
          <br className="desktop-break" /> Pick a skill to see where I put it to
          work.
        </p>
      </div>
      <div className="skill-layout">
        <div className="skill-map">
          <div className="tree-root">
            <div className="root-diamond">
              <Icon name="gem" size={23} />
            </div>
            <span>ISAIAH KING</span>
          </div>
          <div className="skill-branches">
            {skillBranches.map((item) => (
              <div
                className={`skill-branch branch-${item.id} ${branch.id === item.id ? 'branch-selected' : ''}`}
                key={item.id}
              >
                <div className="branch-heading">
                  <span className="branch-icon">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{item.name}</h3>
                  <small>{item.caption}</small>
                </div>
                <div className="skill-nodes">
                  {item.nodes.map((node) => (
                    <button
                      key={node.id}
                      className={`skill-node ${selected === node.id ? 'selected' : ''}`}
                      aria-pressed={selected === node.id}
                      onClick={() => setSelected(node.id)}
                    >
                      <span className="node-icon">
                        <Icon name={node.icon} size={18} />
                      </span>
                      <span>{node.short}</span>
                      <span className="node-dot" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="map-legend">
            <span>
              <i /> Experience earned
            </span>
            <span>Every branch is still growing.</span>
          </div>
        </div>
        <aside
          className={`skill-detail branch-${branch.id}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="skill-detail-top">
            <span className="eyebrow">SKILL INSPECTOR</span>
            <Icon name="spark" size={16} />
          </div>
          <span className="skill-detail-icon">
            <Icon name={skill.icon} size={32} />
          </span>
          <span className="skill-level">
            <i />
            {skill.level}
          </span>
          <h3>{skill.title}</h3>
          <p>{skill.description}</p>
          <div className="tags">
            {skill.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <div className="skill-evidence">
            <span className="eyebrow">PUT INTO PRACTICE</span>
            {skill.project ? (
              <button
                className="text-button"
                onClick={() => onProject(skill.project)}
              >
                {skill.evidence}
                <Icon name="diagonal" size={16} />
              </button>
            ) : skill.action ? (
              <button className="text-button" onClick={onArcade}>
                {skill.evidence}
                <Icon name="arrow" size={16} />
              </button>
            ) : (
              <a className="text-button" href={`#${skill.target}`}>
                {skill.evidence}
                <Icon name="arrow" size={16} />
              </a>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
