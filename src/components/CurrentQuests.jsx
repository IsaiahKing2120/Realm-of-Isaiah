import { caseStudies, caseStudyPath, featuredIds } from "../data/caseStudies";
import Icon from "./Icon";

export default function CurrentQuests() {
  return (
    <aside
      className="current-quests page-width"
      aria-labelledby="current-quests-title"
    >
      <div className="current-quests-heading">
        <span className="quest-beacon" />
        <h2 id="current-quests-title">CURRENT QUESTS</h2>
        <span>On my workbench</span>
      </div>
      <div className="quest-cards">
        {featuredIds.map((id) => (
          <a key={id} href={caseStudyPath(id)}>
            <span>
              <strong>{caseStudies[id].shortTitle}</strong>
              <small>{caseStudies[id].current}</small>
            </span>
            <Icon name="diagonal" size={18} />
          </a>
        ))}
      </div>
    </aside>
  );
}
