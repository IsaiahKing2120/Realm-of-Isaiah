import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { profile } from "./data/portfolio";
import { readPreference, writePreference } from "./lib/storage";
import Icon from "./components/Icon";
import Embers from "./components/Embers";
import Projects, { ProjectModal } from "./components/Projects";
import SkillTree from "./components/SkillTree";
import Journey from "./components/Journey";
import Guide from "./components/Guide";
import CommandMenu from "./components/CommandMenu";
import Modal from "./components/Modal";
import CaseStudy from "./components/CaseStudy";
import CurrentQuests from "./components/CurrentQuests";
import ResumeLinks from "./components/ResumeLinks";
import Terminal from "./components/Terminal";
import { caseStudies, caseStudyPath, pageFromPath } from "./data/caseStudies";
import RealmCore from "./components/RealmCore";
import RecruiterBrief from "./components/RecruiterBrief";
import useRealmEffects from "./lib/useRealmEffects";
const Arcade = lazy(() => import("./components/Arcade"));

const navigation = [
  { id: "work", label: "The Work" },
  { id: "skills", label: "Skill Tree" },
  { id: "journey", label: "Quest Log" },
  { id: "about", label: "About" },
];

function Preferences({ name, onSave, onClose }) {
  const [value, setValue] = useState(name);
  return (
    <Modal
      title="Every traveler has a name."
      eyebrow="MAKE YOURSELF AT HOME"
      onClose={onClose}
      className="preferences-modal"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(value.trim().slice(0, 32));
        }}
      >
        <label htmlFor="traveler-name">What should the realm call you?</label>
        <input
          id="traveler-name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={32}
          placeholder="Your name or adventurer alias"
          autoComplete="nickname"
        />
        <p>
          Saved only in this browser. Leave it blank to stay a mysterious
          traveler.
        </p>
        <button className="button primary" type="submit">
          Settle in <Icon name="arrow" size={18} />
        </button>
      </form>
    </Modal>
  );
}

export default function App({
  pageId = typeof window === "undefined"
    ? "home"
    : pageFromPath(window.location.pathname),
}) {
  const isHome = pageId === "home";
  const homeAnchor = (id) =>
    `${isHome ? "" : import.meta.env.BASE_URL}#${isHome && recruiter && id === "home" ? "main-content" : id}`;
  const [overlay, setOverlay] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [name, setName] = useState("");
  const [motion, setMotion] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [runeKeeper, setRuneKeeper] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  useEffect(() => {
    const saved = readPreference("name", "");
    setName(typeof saved === "string" ? saved.slice(0, 32) : "");
    setMotion(readPreference("motion", true) !== false);
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    setRuneKeeper(readPreference("rune-best", 0) === 5);
    setRecruiter(readPreference("recruiter", false) === true);
  }, []);
  const [copyStatus, setCopyStatus] = useState("");
  const closeOverlay = useCallback(() => setOverlay(null), []);
  const openProject = (id) => {
    setMenuOpen(false);
    if (caseStudies[id]) window.location.assign(caseStudyPath(id));
    else setOverlay({ type: "project", id });
  };
  const openGuide = () => {
    setMenuOpen(false);
    setOverlay({ type: "guide" });
  };
  const openArcade = () => {
    setMenuOpen(false);
    setOverlay({ type: "arcade" });
  };
  const effects = motion && !reducedMotion && !recruiter;
  useRealmEffects(effects);
  const toggleRecruiter = () => {
    setRecruiter((value) => {
      writePreference("recruiter", !value);
      return !value;
    });
    if (isHome)
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = (event) => setReducedMotion(event.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = effects ? "on" : "off";
    document.documentElement.dataset.view = recruiter ? "recruiter" : "realm";
  }, [effects, recruiter]);

  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let position = 0;
    const unlock = (event) => {
      if (
        event.target.closest("input, textarea, [contenteditable], dialog") ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.repeat
      )
        return;
      position =
        event.key === sequence[position]
          ? position + 1
          : event.key === sequence[0]
            ? 1
            : 0;
      if (position === sequence.length) {
        position = 0;
        setCopyStatus("Hidden route discovered. Rune Relay unlocked.");
        setOverlay({ type: "arcade", quest: "runes" });
      }
    };
    window.addEventListener("keydown", unlock);
    return () => window.removeEventListener("keydown", unlock);
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen(false);
        setOverlay((current) =>
          current?.type === "commands" ? null : { type: "commands" },
        );
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = [...document.querySelectorAll("main > section[id]")];
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const marker = Math.min(220, window.innerHeight * 0.3);
      let current = "home";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      });
      setActive(current);
      document.documentElement.dataset.sector = current;
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    const legacy = {
      hero: "home",
      projects: "work",
      showcase: "work",
      "showcase-portfolio": "work",
      skilltree: "skills",
      "skill-tree": "skills",
      "quest-log": "journey",
      quests: "journey",
    };
    const target = legacy[window.location.hash.slice(1)];
    if (target) {
      window.history.replaceState(null, "", `#${target}`);
      document.getElementById(target)?.scrollIntoView();
    }
    scheduleUpdate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!copyStatus) return;
    const timer = setTimeout(() => setCopyStatus(""), 4500);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  const toggleMotion = () => {
    setMotion((value) => {
      writePreference("motion", !value);
      return !value;
    });
  };
  const onAction = (action) => {
    if (action.type === "section") {
      setOverlay(null);
      if (!isHome) {
        window.location.assign(homeAnchor(action.value));
        return;
      }
      requestAnimationFrame(() => {
        const section = document.getElementById(action.value);
        window.history.pushState(null, "", `#${action.value}`);
        section?.scrollIntoView({ behavior: effects ? "smooth" : "instant" });
        const heading = section?.querySelector("h2");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      });
    } else if (action.type === "project") openProject(action.value);
    else if (action.type === "recruiter") {
      toggleRecruiter();
      setOverlay(null);
    } else if (action.type === "easter") {
      setCopyStatus(
        action.value === "hire"
          ? "Permission granted: let’s talk about the next chapter."
          : "Isaiah King. Builder, troubleshooter, and keeper of this realm.",
      );
      setOverlay(null);
    } else if (action.type === "motion") {
      toggleMotion();
      setOverlay(null);
    } else
      setOverlay({
        type: action.type,
        quest: action.type === "arcade" ? action.value : undefined,
      });
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyStatus("Email copied. Let’s talk.");
    } catch {
      setCopyStatus(`Copy this address: ${profile.email}`);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-container">
          <a
            className="brand"
            href={homeAnchor("home")}
            aria-label="Realm of Isaiah, home"
          >
            <span className="brand-mark">
              <span>IK</span>
            </span>
            <span>
              REALM <span className="brand-of">OF</span> ISAIAH
              <small>THE PERSONAL WORLD OF ISAIAH KING</small>
            </span>
          </a>
          <nav
            className={`main-nav ${menuOpen ? "nav-open" : ""}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={homeAnchor(item.id)}
                onClick={() => setMenuOpen(false)}
                className={
                  (isHome ? active === item.id : item.id === "work")
                    ? "active"
                    : ""
                }
                aria-current={
                  isHome && active === item.id ? "location" : undefined
                }
              >
                {recruiter
                  ? {
                      work: "Projects",
                      skills: "Skills",
                      journey: "Experience",
                      about: "About",
                    }[item.id]
                  : item.label}
              </a>
            ))}
            <a
              className="mobile-contact"
              href={homeAnchor("contact")}
              onClick={() => setMenuOpen(false)}
            >
              Let’s connect <Icon name="diagonal" size={16} />
            </a>
          </nav>
          <div className="nav-actions">
            <button
              className="recruiter-toggle"
              aria-pressed={recruiter}
              onClick={toggleRecruiter}
            >
              {recruiter ? "← Realm Mode" : "Recruiter Mode"}
            </button>
            <button
              className="command-trigger"
              onClick={() => {
                setMenuOpen(false);
                setOverlay({ type: "commands" });
              }}
              aria-label="Open quick travel command menu"
            >
              <Icon name="command" size={15} />
              <span>K</span>
            </button>
            <a className="nav-contact" href={homeAnchor("contact")}>
              Let’s connect <Icon name="diagonal" size={15} />
            </a>
            <button
              className="menu-toggle icon-button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-controls="main-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      {!recruiter && isHome && (
        <div className="realm-depth-marker" aria-hidden="true">
          <span>
            REALM /{" "}
            {active === "home"
              ? "ARRIVAL"
              : active === "work"
                ? "ARTIFACTS"
                : active === "skills"
                  ? "CAPABILITIES"
                  : active === "journey"
                    ? "FIELD RECORDS"
                    : active.toUpperCase()}
          </span>
          <i />
        </div>
      )}

      <main id="main-content">
        {recruiter && isHome && <RecruiterBrief />}
        {caseStudies[pageId] ? (
          <CaseStudy id={pageId} onAction={onAction} />
        ) : !isHome ? (
          <section className="section not-found">
            <span className="eyebrow">404 / AN UNCHARTED PATH</span>
            <h1>This quest isn’t on the map.</h1>
            <p>
              Head back to the realm to find the projects, experience, and
              résumé.
            </p>
            <a className="button primary" href={import.meta.env.BASE_URL}>
              Return to the realm <Icon name="arrow" />
            </a>
          </section>
        ) : (
          <>
            <section id="home" className="hero" aria-labelledby="hero-title">
              <div className="hero-landscape">
                <img
                  src={`${import.meta.env.BASE_URL}images/rpg-bg.jpg`}
                  alt=""
                  fetchpriority="high"
                />
              </div>
              <div className="hero-vignette" />
              <Embers enabled={effects} />
              {!recruiter && <RealmCore enabled={effects} />}
              <div className="hero-content page-width">
                <div className="hero-eyebrow">
                  <span className="availability-dot" /> OPEN TO THE NEXT CHAPTER{" "}
                  <span className="hero-line" />
                </div>
                <div className="hero-intro">
                  ISAIAH KING / COMPUTER TECHNICIAN & SOFTWARE DEVELOPER
                </div>
                <h1 id="hero-title">
                  Real-world skills.
                  <br />
                  Otherworldly
                  <br />
                  <em>ambition.</em>
                  <span className="title-star" aria-hidden="true">
                    ✧
                  </span>
                </h1>
                <p className="hero-disciplines">
                  IT Implementation <span>•</span> Systems Support{" "}
                  <span>•</span>
                  <br className="discipline-break" /> Full-Stack Development{" "}
                  <span>•</span> Game Systems
                </p>
                <p className="hero-description">
                  Enterprise deployment. Windows systems. C#/.NET, React, and
                  automation. I turn hands-on IT experience into software people
                  can use.
                </p>
                <div className="hero-buttons">
                  <a className="button primary" href="#work">
                    Explore my work <Icon name="arrow" size={18} />
                  </a>
                  <ResumeLinks />
                </div>
                <button
                  className="traveler-greeting"
                  onClick={() => setOverlay({ type: "preferences" })}
                >
                  {name
                    ? `Good to see you, ${name}.`
                    : "Welcome to the realm, traveler."}
                  <span>
                    Make yourself at home <Icon name="diagonal" size={12} />
                  </span>
                </button>
              </div>
              <div className="realm-coordinate" aria-hidden="true">
                <span className="coordinate-cross">+</span>
                <span>
                  A WORLD IN PROGRESS
                  <br />
                  <b>EST. 2025 / ALWAYS EVOLVING</b>
                </span>
              </div>
              <div className="hero-bottom page-width">
                <div className="hero-facts">
                  <span>
                    <strong>6+ years</strong> in the trenches of IT
                  </span>
                  <i />
                  <span>
                    <strong>Self-taught.</strong> Still learning.
                  </span>
                  <i />
                  <span>
                    <Icon name="pin" size={14} /> Atlanta, Georgia
                  </span>
                </div>
                <a className="scroll-cue" href="#work">
                  SCROLL TO EXPLORE <Icon name="down" size={16} />
                </a>
              </div>
            </section>

            <div className="realm-strip">
              <div className="page-width">
                <span>
                  <Icon name="code" size={17} /> SOFTWARE THAT SERVES
                </span>
                <span className="strip-star">✧</span>
                <span>
                  <Icon name="server" size={17} /> SYSTEMS THAT WORK
                </span>
                <span className="strip-star">✧</span>
                <span>
                  <Icon name="swords" size={17} /> WORLDS WORTH BUILDING
                </span>
                <button onClick={openArcade}>
                  <Icon name="gem" size={17} />{" "}
                  {runeKeeper ? "RUNE KEEPER" : "TAKE A SIDE QUEST"}{" "}
                  <Icon name="diagonal" size={14} />
                </button>
              </div>
            </div>
            <CurrentQuests />
            <Projects onOpen={openProject} />

            <section
              id="demo"
              className="section demo-section"
              aria-labelledby="demo-title"
            >
              <div className="demo-copy">
                <span className="eyebrow">
                  <span>LIVE IN THE REALM</span> M.O.N.D.A.Y. / PREVIEW
                </span>
                <h2 id="demo-title">
                  Don’t just read.
                  <br />
                  <em>Ask your way around.</em>
                </h2>
                <p>
                  Find the build that fits the role. Explore a technical
                  decision. Follow a skill back to the work behind it.
                </p>
                <p className="demo-explanation">
                  This small portfolio simulation shows the interaction I’m
                  building toward with M.O.N.D.A.Y. Its answers come from
                  curated project and career notes.
                </p>
                <a className="text-button" href={caseStudyPath("monday")}>
                  Inside the assistant project <Icon name="arrow" size={17} />
                </a>
              </div>
              <Terminal onAction={onAction} />
            </section>
            <SkillTree onProject={openProject} onArcade={openArcade} />
            <Journey />

            <section
              id="about"
              className="section about-section"
              aria-labelledby="about-title"
            >
              <div className="about-portrait">
                <div className="portrait-frame">
                  <img
                    src={`${import.meta.env.BASE_URL}images/Koji.png`}
                    alt="Illustrated portrait of Isaiah King"
                    width="178"
                    height="166"
                    loading="lazy"
                  />
                </div>
                <span className="eyebrow">ISAIAH KING</span>
                <span>
                  Builder by nature.
                  <br />
                  Adventurer by choice.
                </span>
                <div className="about-coordinates">
                  <Icon name="pin" size={14} /> ATLANTA, GA · EST
                </div>
              </div>
              <div className="about-copy">
                <span className="eyebrow">
                  <span>04</span> THE PERSON BEHIND THE PROJECTS
                </span>
                <h2 id="about-title">
                  I learn by building.
                  <br />
                  <em>Then I build it better.</em>
                </h2>
                <p>
                  I took the hands-on route into tech. Helping someone get back
                  to work, getting a deployment over the finish line, figuring
                  out why a piece of code won’t behave. That’s where I’ve done
                  most of my learning.
                </p>
                <p>
                  These days, I’m bringing those worlds together. The tools I
                  build come from problems I’ve actually run into. The games
                  come from the worlds I can’t stop thinking about. There’s
                  usually another idea in the notebook before the current one is
                  done.
                </p>
                <div className="about-signoff">
                  <span>Stay curious. See it through.</span>
                  <span className="signature">Isaiah.</span>
                </div>
              </div>
            </section>
            <section
              className="side-quest page-width"
              aria-labelledby="side-quest-title"
            >
              <div className="side-quest-icon">
                <Icon name="swords" size={29} />
              </div>
              <div>
                <span className="eyebrow">YOU’VE EARNED A DETOUR</span>
                <h2 id="side-quest-title">
                  Every good adventure has a side quest.
                </h2>
                <p>
                  Four detours. Memory, routing, recovery, and a little systems
                  thinking.
                </p>
              </div>
              <button className="text-button" onClick={openArcade}>
                Explore side quests
                <Icon name="arrow" size={18} />
              </button>
            </section>

            <section
              id="contact"
              className="section contact-section"
              aria-labelledby="contact-title"
            >
              <div className="contact-top">
                <span className="eyebrow">
                  <span>05</span> THE NEXT CHAPTER
                </span>
                <span className="contact-status">
                  <i /> Open to opportunities & good conversations
                </span>
              </div>
              <div className="contact-main">
                <div>
                  <h2 id="contact-title">
                    Got a good quest?
                    <br />
                    <em>Let’s talk.</em>
                  </h2>
                  <p>
                    A role, a collaboration, or an idea you can’t leave alone.
                    <br className="desktop-break" /> I’d like to hear about it.
                  </p>
                </div>
                <a
                  className="contact-circle"
                  href={`mailto:${profile.email}`}
                  aria-label="Email Isaiah King"
                >
                  <Icon name="diagonal" size={43} />
                </a>
              </div>
              <div className="contact-links">
                <div className="email-group">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <button
                    className="icon-button"
                    aria-label="Copy email address"
                    onClick={copyEmail}
                  >
                    <Icon
                      name={
                        copyStatus.startsWith("Email copied") ? "check" : "copy"
                      }
                      size={17}
                    />
                  </button>
                </div>
                <div className="social-links">
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub <Icon name="diagonal" size={16} />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <Icon name="diagonal" size={16} />
                  </a>
                  <ResumeLinks compact />
                </div>
              </div>
              <p className="copy-status" role="status">
                {copyStatus}
              </p>
            </section>
          </>
        )}
      </main>
      <footer className="site-footer page-width">
        <a className="footer-brand" href={homeAnchor("home")}>
          <Icon name="gem" size={18} /> REALM OF ISAIAH
        </a>
        <span>© {new Date().getFullYear()} Isaiah King. Always evolving.</span>
        <button
          onClick={toggleMotion}
          aria-pressed={effects}
          className="effects-toggle"
        >
          <span className={effects ? "effects-dot on" : "effects-dot"} />{" "}
          AMBIENT FX {effects ? "ON" : "OFF"}
          {reducedMotion && (
            <span className="sr-only">
              . Reduced motion is enabled on your device.
            </span>
          )}
        </button>
        <a
          href={homeAnchor("home")}
          className="back-top"
          aria-label="Back to top"
        >
          <Icon name="arrow" size={18} />
        </a>
      </footer>
      <div className="realm-announcement" role="status">
        {copyStatus}
      </div>
      <button
        className="guide-launcher"
        onClick={openGuide}
        aria-label="Open M.O.N.D.A.Y. portfolio guide"
      >
        <span className="launcher-mark">
          <Icon name="spark" size={19} />
        </span>
        <span>
          M.O.N.D.A.Y.<small>YOUR REALM GUIDE</small>
        </span>
        <span className="launcher-dot" />
      </button>
      {overlay?.type === "project" && (
        <ProjectModal
          key={overlay.id}
          id={overlay.id}
          onClose={closeOverlay}
          onGuide={openGuide}
        />
      )}
      {overlay?.type === "guide" && (
        <Guide name={name} onClose={closeOverlay} onAction={onAction} />
      )}
      {overlay?.type === "arcade" && (
        <Suspense
          fallback={
            <div className="realm-announcement" role="status">
              Opening the quest board…
            </div>
          }
        >
          <Arcade
            onClose={closeOverlay}
            initialQuest={overlay.quest}
            onWin={() => setRuneKeeper(true)}
          />
        </Suspense>
      )}
      {overlay?.type === "commands" && (
        <CommandMenu
          onClose={closeOverlay}
          onAction={onAction}
          motion={motion}
          recruiter={recruiter}
        />
      )}
      {overlay?.type === "preferences" && (
        <Preferences
          name={name}
          onClose={closeOverlay}
          onSave={(value) => {
            setName(value);
            writePreference("name", value);
            closeOverlay();
          }}
        />
      )}
    </>
  );
}
