import { useId, useState } from "react";
import Icon from "./Icon";

export default function Architecture({ architecture }) {
  const [selected, setSelected] = useState("entry");
  const panelId = useId();
  const node = architecture.nodes.find((item) => item.id === selected);
  return (
    <div className="architecture">
      <p className="architecture-caption">{architecture.caption}</p>
      <div
        className="architecture-map"
        role="group"
        aria-label="Explore architecture components"
      >
        <svg
          className="architecture-lines"
          viewBox="0 0 900 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M150 82H450H750M450 82V222H150M450 222H750" />
          <circle cx="450" cy="82" r="5" />
          <circle cx="450" cy="222" r="5" />
        </svg>
        {architecture.nodes.map((item, index) => (
          <button
            key={item.id}
            className={`architecture-node node-${item.id} ${selected === item.id ? "selected" : ""}`}
            aria-pressed={selected === item.id}
            aria-controls={panelId}
            onClick={() => setSelected(item.id)}
          >
            <span className="node-number">0{index + 1}</span>
            <Icon name={item.icon} size={23} />
            <strong>{item.label}</strong>
            <small>{item.subtitle}</small>
          </button>
        ))}
      </div>
      <div
        id={panelId}
        className="architecture-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <span className="eyebrow">INSIDE THE SYSTEM</span>
          <h4>{node.label}</h4>
        </div>
        <div>
          <p>{node.detail}</p>
          <small>{node.connections}</small>
        </div>
      </div>
    </div>
  );
}
