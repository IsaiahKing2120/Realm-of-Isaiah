import { useEffect, useRef, useState } from "react";
import { profile } from "../data/portfolio";
import Icon from "./Icon";
import { caseStudies, featuredIds } from "../data/caseStudies";
import Modal from "./Modal";

export default function CommandMenu({ onClose, onAction, motion, recruiter }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const actions = [
    ...featuredIds.map((id) => ({
      label: caseStudies[id].shortTitle,
      subtitle: "Featured build · case study",
      icon: "code",
      type: "project",
      value: id,
      keywords:
        id === "monday"
          ? "monday assistant"
          : id === "toolkit"
            ? "ktd diagnostics"
            : "games tcg",
    })),
    {
      label: "Explore the workbench",
      subtitle: "Projects & case studies",
      icon: "layers",
      type: "section",
      value: "work",
    },
    {
      label: "Inspect the skill tree",
      subtitle: "Skills & evidence",
      icon: "spark",
      type: "section",
      value: "skills",
    },
    {
      label: "Read the quest log",
      subtitle: "Experience, career & certifications",
      icon: "book",
      type: "section",
      value: "journey",
    },
    {
      label: "Meet the builder",
      subtitle: "A little about Isaiah",
      icon: "gem",
      type: "section",
      value: "about",
    },
    {
      label: "Talk to M.O.N.D.A.Y.",
      subtitle: "Your portfolio guide",
      icon: "terminal",
      type: "guide",
    },
    {
      label: "Play Rune Relay",
      subtitle: "Take a side quest",
      icon: "swords",
      type: "arcade",
      value: "runes",
    },
    {
      label: "Explore side quests",
      subtitle: "Arcade / all four games",
      icon: "swords",
      type: "arcade",
    },
    {
      label: "Play Packet Runner",
      subtitle: "Routing puzzle / network",
      icon: "network",
      type: "arcade",
      value: "packets",
    },
    {
      label: "Play Sector Salvage",
      subtitle: "Grid logic / recovery",
      icon: "search",
      type: "arcade",
      value: "salvage",
    },
    {
      label: "Play Boot Sequence",
      subtitle: "Dependency puzzle / systems",
      icon: "terminal",
      type: "arcade",
      value: "scheduler",
    },
    {
      label: "View résumé",
      subtitle: "Resume / CV / PDF · Isaiah King",
      icon: "download",
      type: "resume",
    },
    {
      label: "Personalize your greeting",
      subtitle: "Set your traveler name",
      icon: "code",
      type: "preferences",
    },
    {
      label: motion ? "Turn ambient effects off" : "Turn ambient effects on",
      subtitle: "Motion & embers",
      icon: "spark",
      type: "motion",
    },
    {
      label: "Get in touch",
      subtitle: `Contact / ${profile.email}`,
      icon: "mail",
      type: "section",
      value: "contact",
    },
    {
      label: "GitHub",
      subtitle: "Code & repositories",
      icon: "github",
      type: "external",
      href: profile.github,
    },
    {
      label: "LinkedIn",
      subtitle: "Professional profile",
      icon: "diagonal",
      type: "external",
      href: profile.linkedin,
    },
    {
      label: recruiter ? "Return to Realm Mode" : "Enable Recruiter Mode",
      subtitle: "Quick view / experience / résumé",
      icon: "layout",
      type: "recruiter",
    },
    ...(["sudo hire isaiah", "whoami", "unlock realm", "developer"].includes(
      query.toLowerCase().trim(),
    )
      ? [
          {
            label: query.toLowerCase().trim(),
            subtitle: "Hidden path discovered",
            icon: "gem",
            type:
              query.toLowerCase().trim() === "unlock realm"
                ? "arcade"
                : "easter",
            value: query.includes("hire") ? "hire" : "identity",
          },
        ]
      : []),
  ];
  const results = actions.filter((item) =>
    `${item.label} ${item.subtitle} ${item.keywords || ""}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <Modal
      title="Where to, traveler?"
      eyebrow="QUICK TRAVEL"
      onClose={onClose}
      className="command-modal"
    >
      <div className="command-search">
        <Icon name="search" size={18} />
        <label className="sr-only" htmlFor="command-search">
          Search site commands
        </label>
        <input
          id="command-search"
          ref={inputRef}
          placeholder="Find a place, project, or side quest…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              document
                .querySelector(".command-results a, .command-results button")
                ?.focus();
            }
            if (event.key === "Enter" && results[0]) {
              event.preventDefault();
              if (["resume", "external"].includes(results[0].type))
                document.querySelector(".command-results a")?.click();
              else onAction(results[0]);
            }
          }}
        />
      </div>
      <div
        className="command-results"
        onKeyDown={(event) => {
          if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
            return;
          const items = [...event.currentTarget.querySelectorAll("a, button")];
          const current = items.indexOf(document.activeElement);
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? items.length - 1
                : (current +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    items.length) %
                  items.length;
          event.preventDefault();
          items[next]?.focus();
        }}
      >
        {results.length ? (
          results.map((item) =>
            ["resume", "external"].includes(item.type) ? (
              <a
                id={item.type === "resume" ? "command-resume" : undefined}
                href={item.href || profile.resume}
                target="_blank"
                rel="noreferrer"
                className="command-item"
                key={item.label}
              >
                <Icon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <Icon name="download" size={16} />
              </a>
            ) : (
              <button
                className="command-item"
                key={item.label}
                onClick={() => onAction(item)}
              >
                <Icon name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <Icon name="arrow" size={16} />
              </button>
            ),
          )
        ) : (
          <p className="command-empty">
            No paths found. Try “projects,” “guide,” or “play.”
          </p>
        )}
      </div>
      <div className="command-footer">
        <span>
          <kbd>Tab</kbd> to explore <kbd>Enter</kbd> to select
        </span>
        <span>
          <kbd>Esc</kbd> to return
        </span>
      </div>
    </Modal>
  );
}
