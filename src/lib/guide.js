import { profile } from "../data/portfolio";

const action = (label, type, value) => ({ label, type, value });
const project = (label, value) => action(label, "project", value);
const section = (label, value) => action(label, "section", value);

export function getGuideReply(input) {
  const question = input.toLowerCase().trim();
  const destinations = {
    about: "about",
    projects: "work",
    skills: "skills",
    experience: "journey",
    contact: "contact",
  };
  if (destinations[question])
    return {
      text: `Open ${question} in the Realm.`,
      source: "Quick travel",
      actions: [section(`Go to ${question}`, destinations[question])],
    };
  if (["github", "linkedin"].includes(question))
    return {
      text: `Isaiah’s ${question === "github" ? "GitHub repositories" : "LinkedIn profile"}.`,
      source: "Verified portfolio links",
      actions: [
        {
          label: `Open ${question === "github" ? "GitHub" : "LinkedIn"}`,
          type: "external",
          href: profile[question],
        },
      ],
    };
  if (question === "help")
    return {
      text: "Commands: about, projects, skills, experience, resume, contact, github, linkedin, clear. You can also ask a natural-language question about the portfolio.",
      source: "Terminal command reference",
      actions: [],
    };
  if (question === "whoami" || question === "developer")
    return {
      text: "Isaiah King. Computer Technician, software developer, and the builder behind this realm. Current process: learn → build → troubleshoot → repeat.",
      source: "Hidden realm note",
      actions: [section("Meet the builder", "about")],
    };
  if (question === "sudo hire isaiah")
    return {
      text: "Permission granted. No elevated privileges required, just a good conversation.",
      source: "Hidden realm note",
      actions: [section("Start the next chapter", "contact")],
    };
  if (question === "unlock realm")
    return {
      text: "A hidden route opens. Four runes. Five rounds. Your move.",
      source: "Side quest discovered",
      actions: [action("Enter Rune Relay", "arcade", "runes")],
    };
  if (
    /\b(run|execute|delete|install|open my|read my|access my|scan my|control my)\b/.test(
      question,
    )
  )
    return {
      text: "This is a portfolio simulation. I can retrieve project notes and point you to evidence, but I cannot run commands, scan devices, access files, or connect to Isaiah’s computer.",
      source: "Demo scope",
      actions: [project("How the local assistant works", "monday")],
    };
  if (
    /system design|architecture|architectural|modular|design decisions/.test(
      question,
    )
  )
    return {
      text: "Start with the TCG Engine for modular system design: card definitions, rules, shop economics, world simulation, and persistence have separate responsibilities. M.O.N.D.A.Y. shows a second angle, separating model conversation from reviewed local tools. Each case study includes an interactive architecture map and design decisions.",
      source: "TCG Engine + M.O.N.D.A.Y. case studies",
      actions: [
        project("Inspect the TCG architecture", "tcg"),
        project("Inspect M.O.N.D.A.Y.", "monday"),
      ],
    };
  if (/c\s*#|c sharp|\.net|dotnet/.test(question))
    return {
      text: "M.O.N.D.A.Y. and the TCG Engine are Isaiah’s flagship C#/.NET builds. M.O.N.D.A.Y. connects conversation, local tools, and SQLite history. The TCG project separates card rules, formats, shop simulation, and persistence. The newer KTD shop workspace uses Electron, Node.js, SQLite, and PowerShell.",
      source: "Featured project source + case studies",
      actions: [
        project("M.O.N.D.A.Y. case study", "monday"),
        project("TCG Engine case study", "tcg"),
      ],
    };
  if (/c\+\+|unreal|ground zero/.test(question))
    return {
      text: "Ground Zero is Isaiah’s Unreal Engine prototype for exploring C++, Blueprints, gameplay behavior, and health-interface feedback. It is an active learning sandbox.",
      source: "Ground Zero project notes",
      actions: [project("Explore Ground Zero", "ground-zero")],
    };
  if (
    /\b(experience|career|job|jobs|work history|prologic|storage|deployment|sccm|mdt|pxe|bitlocker|entra)\b/.test(
      question,
    )
  )
    return {
      text: "Isaiah currently deploys and validates State of Georgia devices at ProLogic ITS using MDT, SCCM, PXE, and Windows 11 Enterprise, including BitLocker checks. Earlier work includes Pure Storage implementation and Tier 2 support for restaurant systems. His résumé also covers Microsoft 365, Active Directory, and Entra ID support.",
      source: "Included résumé · employment history and technical skills",
      actions: [
        section("See experience and accomplishments", "journey"),
        action("View résumé", "resume"),
      ],
    };
  if (/\b(monday|m\.o\.n\.d\.a\.y|assistant)\b/.test(question))
    return {
      text: "M.O.N.D.A.Y. means Modular Omnifunctional Neural Digital Assistant for You. The local C#/.NET prototype pairs replaceable model providers with reviewed tool execution and SQLite conversation history. This website uses curated portfolio answers; a live model or desktop connection is not part of this demo.",
      source: "M.O.N.D.A.Y. case study",
      actions: [project("Read the assistant case study", "monday")],
    };
  if (
    /\b(toolkit|ktd|diagnostic|diagnostics|repair|powershell)\b/.test(question)
  )
    return {
      text: "KTD starts with 20+ automated Windows diagnostic checks. The newer local shop workspace adds repair intake, estimates, invoices, inventory, and four staff roles using Electron, Node.js, and SQLite. The case study includes screenshots from its real training interface. The Windows pilot and connected services still need field validation.",
      source: "KTD v0.8 development build",
      actions: [project("See KTD in the workshop", "toolkit")],
    };
  if (/\b(tcg|card|cards|everbound|null|shop|multiplayer)\b/.test(question))
    return {
      text: "The TCG build combines modular shop simulation with EVERBOUND and a separate NULL//SHIFT prototype. Its EVERBOUND catalog has 1,300 definitions. The four-seat development table is local play with one human and three NPCs; online multiplayer is future work. NULL//SHIFT still has experimental effects.",
      source: "TCG catalog + development-client documentation",
      actions: [project("Explore the card systems", "tcg")],
    };
  if (
    /\b(contact|email|hire|hiring|available|availability|remote|linkedin|work together)\b/.test(
      question,
    )
  )
    return {
      text: `Isaiah is open to IT support, implementation, and development opportunities, including remote work. Reach him at ${profile.email}. You can also find LinkedIn, GitHub, and his résumé in the contact section.`,
      source: "Contact details",
      actions: [section("Connect with Isaiah", "contact")],
    };
  if (/\b(resume|résumé|cv|download)\b/.test(question))
    return {
      text: "View the résumé as a PDF, or use the download icon beside the résumé links to save a copy. It covers systems implementation, support, automation, and development projects.",
      source: "Included résumé PDF",
      actions: [action("View résumé", "resume")],
    };
  if (
    /\b(certification|certifications|certificate|education|google|ibm)\b/.test(
      question,
    )
  )
    return {
      text: "The included résumé lists Google IT Support and CompTIA ITF+. It lists the IBM Full Stack Developer Professional Certificate as in progress.",
      source: "Included résumé · certifications",
      actions: [section("See knowledge collected", "journey")],
    };
  if (
    /\b(skill|skills|stack|language|languages|react|python|automation)\b/.test(
      question,
    )
  )
    return {
      text: "Isaiah works across systems support, software and automation, and game development. His toolset includes Windows deployment, C#/.NET, PowerShell, Python, React, and Unreal/C++. The skill tree connects those skills to projects and employment experience.",
      source: "Skill tree + résumé",
      actions: [section("Explore the skill tree", "skills")],
    };
  if (/packet runner|sector salvage|boot sequence|rune relay/.test(question)) {
    const id = question.includes("packet runner")
      ? "packets"
      : question.includes("sector salvage")
        ? "salvage"
        : question.includes("boot sequence")
          ? "scheduler"
          : "runes";
    return {
      text: "A side quest is ready. Your completed badges stay in this browser; you can leave any time.",
      source: "Realm arcade",
      actions: [action("Launch side quest", "arcade", id)],
    };
  }
  if (/\b(game|games|play|arcade|rune|quests?)\b/.test(question))
    return {
      text: "Four optional detours live here: Rune Relay tests your memory; Packet Runner restores signal routes; Sector Salvage recovers a damaged archive; Boot Sequence challenges you to respect job dependencies. Each awards a badge saved in this browser.",
      source: "Realm of Isaiah · Side quests",
      actions: [action("Open the quest board", "arcade")],
    };
  if (/\b(project|projects|work|build|builds|built|showcase)\b/.test(question))
    return {
      text: "Start with the three featured builds: M.O.N.D.A.Y., KTD Tech Tools, and the TCG Engine. Each has a build story, technical decisions, an architecture map, and a clear development status. Smaller React projects and the Unreal prototype live in the archive.",
      source: "Featured builds + project archive",
      actions: [section("See the featured builds", "work")],
    };
  if (/\b(who|about|isaiah|story|yourself)\b/.test(question))
    return {
      text: "Isaiah King is a Computer Technician and software developer in the Atlanta area. His work combines enterprise deployment, Windows support, useful automation, and game systems. The tools come from hands-on IT work; the games come from a long-running drive to build his own worlds.",
      source: "Professional summary",
      actions: [section("Meet the builder", "about")],
    };
  if (/\b(hello|hi|hey|help|start)\b/.test(question))
    return {
      text: "Ask about Isaiah’s C# projects, IT experience, or system design. I can also help you find his résumé and contact details. Type “clear” to reset this conversation.",
      source: "Portfolio terminal help",
      actions: [section("Explore the work", "work")],
    };
  return {
    text: "That is outside my portfolio notes. Try asking about C# projects, IT experience, system design, or the résumé. For details beyond this demo, reach out to Isaiah directly.",
    source: "No matching portfolio note",
    actions: [section("Contact Isaiah", "contact")],
  };
}
