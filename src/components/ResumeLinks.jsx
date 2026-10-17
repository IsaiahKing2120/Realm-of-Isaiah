import { profile } from "../data/portfolio";
import Icon from "./Icon";

export default function ResumeLinks({ compact = false }) {
  return (
    <span className={`resume-links ${compact ? "compact" : ""}`}>
      <a
        className={compact ? "text-button" : "button secondary"}
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
      >
        View résumé <Icon name="diagonal" size={16} />
      </a>
      <a
        className="resume-download icon-button"
        href={profile.resume}
        download="Isaiah_King_Resume.pdf"
        aria-label="Download Isaiah King’s résumé as a PDF"
        title="Download résumé PDF"
      >
        <Icon name="download" size={18} />
      </a>
    </span>
  );
}
