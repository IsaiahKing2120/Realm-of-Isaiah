export const caseStudies = {
  monday: {
    slug: "monday",
    shortTitle: "M.O.N.D.A.Y.",
    heading: "An assistant that can move from conversation to action.",
    discipline: "LOCAL ASSISTANT / C# & .NET",
    status: "Local prototype · active development",
    summary:
      "A modular personal assistant that pairs a conversation layer with local tools, persistent history, and explicit review before higher-risk actions.",
    current: "Building local conversation and system tooling",
    metrics: [
      {
        value: "2",
        label: "model provider adapters",
        detail: "Ollama and an OpenAI-compatible endpoint.",
      },
      {
        value: "3",
        label: "local tool types",
        detail:
          "System information, workspace inspection, and approved process execution in the archived CLI build.",
      },
      {
        value: "SQLite",
        label: "conversation history",
        detail: "History persists between local sessions.",
      },
    ],
    result:
      "The local prototype can route a request into a system tool or a model conversation, with history stored in SQLite. The browser demo below shows a small, curated version of the interaction.",
    built: [
      "A C# host with separate Core, Actions, Memory, and App projects.",
      "Replaceable model providers and persisted conversation history.",
      "Read-only system information and workspace inspection tools.",
      "Risk levels and a review boundary around process execution.",
    ],
    next: [
      "Make active-workspace discovery more reliable.",
      "Refine the local web workspace and VS Code integration.",
      "Expand tool coverage while keeping review and recovery clear.",
    ],
    boundary:
      "The terminal on this site is a portfolio simulation. It retrieves curated answers locally; it does not run a model, read your files, or connect to my computer. The desktop assistant requires its own local setup and model configuration.",
    decisions: [
      {
        title: "Keep conversation separate from execution.",
        text: "The model adapter returns a response; local tools own execution. A provider change should not require rewriting the system-information or workspace tools.",
      },
      {
        title: "Persist the useful context.",
        text: "Conversation history lives behind a store interface, with SQLite handling the local persistence. The UI can evolve without taking ownership of the database.",
      },
      {
        title: "Make actions inspectable.",
        text: "Tool descriptors carry a name, a description, and a risk level. A process command has a different review path from a read-only system query.",
      },
    ],
    architecture: {
      caption:
        "Core request flow in the archived CLI prototype. The web workspace is the next interface around these responsibilities.",
      nodes: [
        {
          id: "entry",
          label: "Conversation",
          subtitle: "Monday.App",
          icon: "terminal",
          detail:
            "The host accepts a request and routes conversational input separately from explicit tool commands.",
          connections: "Routes to model adapters or the tool review boundary.",
        },
        {
          id: "policy",
          label: "Tool review",
          subtitle: "Core interfaces",
          icon: "check",
          detail:
            "Descriptors and risk levels make the requested action visible before execution. Higher-risk process execution requires a different path from read-only tools.",
          connections:
            "Receives a tool request; dispatches an approved action.",
        },
        {
          id: "tools",
          label: "Local tools",
          subtitle: "Monday.Actions",
          icon: "wrench",
          detail:
            "System information, workspace inspection, and approved executable calls live in independent tool classes.",
          connections: "Returns structured action results to the host.",
        },
        {
          id: "models",
          label: "Model adapters",
          subtitle: "Ollama / cloud",
          icon: "spark",
          detail:
            "A shared chat interface supports a local Ollama model or an OpenAI-compatible endpoint. Credentials and model setup belong to the local application.",
          connections: "Exchanges conversation messages with the host.",
        },
        {
          id: "store",
          label: "Local history",
          subtitle: "Monday.Memory / SQLite",
          icon: "server",
          detail:
            "Conversation storage and action records belong to the memory layer rather than the interface.",
          connections: "Stores and retrieves the host’s conversation history.",
        },
      ],
    },
    gallery: [],
    sourceNote:
      "Technical details are grounded in the v0.2.0 CLI source and the project description in my résumé. Later interface work remains in development.",
  },
  toolkit: {
    slug: "ktd-tech-tools",
    shortTitle: "KTD Tech Tools",
    heading: "From one workstation check to the whole repair workflow.",
    discipline: "TECHNICIAN TOOLS / DESKTOP SOFTWARE",
    status: "v0.8 development build · Windows pilot",
    summary:
      "A portable Windows diagnostic toolkit growing into a local repair-shop workspace, with jobs, estimates, inventory, invoices, and staff access in one place.",
    current: "Connecting diagnostics with repair-shop operations",
    metrics: [
      {
        value: "20+",
        label: "automated checks",
        detail:
          "Windows hardware, operating system, storage, encryption, and security checks.",
      },
      {
        value: "4",
        label: "staff roles",
        detail: "Owner, administrator, technician, and front desk.",
      },
      {
        value: "2",
        label: "separate workspaces",
        detail:
          "Live operations and fictional training data use separate databases.",
      },
    ],
    result:
      "The local shop build connects intake, repair status, estimates, inventory, and invoices. The screenshots below were captured from its actual training workspace. Windows diagnostic execution and the installed desktop workflow still need field validation.",
    built: [
      "Portable PowerShell diagnostics with HTML/JSON reports.",
      "Local repair intake, assignment, status history, and technician notes.",
      "Estimates, approval records, invoice lines, and confirmed payment records.",
      "Role-based staff access, stock movements, and a separate training workspace.",
    ],
    next: [
      "Validate the installer and elevated diagnostics on Windows devices.",
      "Harden licensing, connected services, and update delivery.",
      "Field-test shop workflows before a wider release.",
    ],
    boundary:
      "The screenshots contain fictional training records. Recording an external payment is not the same as processing a card. Hosted intake, messaging, payment providers, and the owner service require separate configuration and end-to-end validation.",
    decisions: [
      {
        title: "Keep the shop usable locally.",
        text: "The desktop shell opens a loopback HTTP service. Core repair operations and a SQLite database live on the workstation, so the interface does not need a remote service for every action.",
      },
      {
        title: "Separate the interface from the records.",
        text: "The renderer calls business operations through an API. Ticket revisions, inventory changes, and monetary values are handled by the core rather than by UI state alone.",
      },
      {
        title: "Give practice its own workspace.",
        text: "Training records and simulated payments are kept apart from live operations. That creates a place to learn the workflow without altering a shop’s actual jobs.",
      },
    ],
    architecture: {
      caption:
        "Local shop architecture. Hosted services are an additional integration path, separate from this workstation flow.",
      nodes: [
        {
          id: "entry",
          label: "Staff workspace",
          subtitle: "Electron / web UI",
          icon: "layout",
          detail:
            "The desktop presents the repair queue, estimates, invoices, and stock screens in an isolated browser window.",
          connections:
            "Calls the local HTTP API; does not access SQLite directly.",
        },
        {
          id: "policy",
          label: "Local API",
          subtitle: "Node / loopback",
          icon: "network",
          detail:
            "The HTTP service owns local sessions, request validation, and routing into business operations.",
          connections: "Connects the renderer to the operations core.",
        },
        {
          id: "tools",
          label: "Shop operations",
          subtitle: "Jobs / stock / billing",
          icon: "wrench",
          detail:
            "Business operations check staff roles, ticket revisions, stock quantities, and payment records.",
          connections:
            "Uses SQLite transactions and attaches diagnostic evidence to jobs.",
        },
        {
          id: "models",
          label: "Diagnostics",
          subtitle: "PowerShell / Windows",
          icon: "terminal",
          detail:
            "The scanner runs on the intended Windows workstation and returns HTML/JSON evidence. Imported USB reports are attached explicitly to a job.",
          connections: "Returns diagnostic evidence to the repair workflow.",
        },
        {
          id: "store",
          label: "Local records",
          subtitle: "SQLite / backups",
          icon: "server",
          detail:
            "Job, customer, stock, and invoice records live in a local database. The training workspace uses a separate database.",
          connections: "Persists operations and their audit history.",
        },
      ],
    },
    gallery: [
      {
        src: "ktd-overview.webp",
        alt: "KTD Shop training dashboard showing four fictional repair jobs and shop navigation.",
        title: "The working shop dashboard",
        caption:
          "Actual v0.8 development UI, running locally with fictional training records. Counts describe the sample workspace.",
      },
      {
        src: "ktd-queue.webp",
        alt: "KTD Shop repair queue with fictional devices, job statuses, and customer records.",
        title: "A queue a technician can work from",
        caption:
          "Actual repair-queue interface. Customer names and devices are fictional; no real shop records are shown.",
      },
    ],
    sourceNote:
      "Architecture and screenshots come from the v0.8 development source. The original diagnostic toolkit and the newer Electron shop workspace are different parts of the same project.",
  },
  tcg: {
    slug: "tcg-engine",
    shortTitle: "TCG Engine",
    heading: "A card-game world built to keep expanding.",
    discipline: "GAME SYSTEMS / C# & .NET",
    status: "Playable prototypes · active development",
    summary:
      "A modular card-shop simulation, an expandable EVERBOUND rules engine, and the separate NULL//SHIFT prototype. Cards, formats, customers, and commerce have distinct responsibilities.",
    current: "Expanding card rules, formats, and shop simulation",
    metrics: [
      {
        value: "1,300",
        label: "EVERBOUND card definitions",
        detail:
          "Counted in the archived curated card catalog. Content size is not a claim that every interaction is complete.",
      },
      {
        value: "4",
        label: "seats at the local table",
        detail:
          "The development client supports one human seat and three local NPC opponents.",
      },
      {
        value: "2",
        label: "separate card systems",
        detail: "EVERBOUND and the experimental NULL//SHIFT engine.",
      },
    ],
    result:
      "The project has separate card, rules, economy, shop, world, and persistence modules, a browser development client, and rule-focused test projects. The catalog and card renderer give the systems a visible surface while deeper interactions keep evolving.",
    built: [
      "A data-driven EVERBOUND catalog and reusable card-rendering system.",
      "Turn flow, stack/priority, combat, and format validation modules.",
      "A local four-seat table, plus an EVERBOUND Standard CLI mode.",
      "A separate NULL//SHIFT sector-control prototype and store-simulation modules.",
    ],
    next: [
      "Expand executable NULL//SHIFT effects beyond its current prototype actions.",
      "Refine targeting, combat feedback, and interaction coverage.",
      "Connect more formats to the shop loop; networked multiplayer remains future work.",
    ],
    boundary:
      "The four-seat table is local play with NPCs, not four connected online players. NULL//SHIFT is experimental: some defined card types are not yet executable. The catalog screenshot shows the real UI with catalog data, not a running multiplayer match.",
    decisions: [
      {
        title: "Give each system a clear responsibility.",
        text: "Cards describe content. Rules resolve play. Shop and economy modules handle inventory, pricing, and purchasing. A visual redesign should not require rebuilding combat or pricing logic.",
      },
      {
        title: "Let formats reuse the same foundations.",
        text: "EVERBOUND formats can share casting, turn flow, and combat while applying different deck rules. NULL//SHIFT has its own sector-control model instead of forcing a different game into the same rules.",
      },
      {
        title: "Make the interface a client of the rules.",
        text: "The ASP.NET development client exposes a place to inspect cards and exercise the systems. The renderer keeps names, costs, and rules as live text separate from the illustrations.",
      },
    ],
    architecture: {
      caption:
        "Conceptual map of the source modules. The two card engines remain distinct; the shop and world systems form a separate simulation layer.",
      nodes: [
        {
          id: "entry",
          label: "Development client",
          subtitle: "ASP.NET / browser / CLI",
          icon: "layout",
          detail:
            "The browser cockpit and console application are entry points for inspecting content and exercising the game systems.",
          connections: "Calls card, rules, and simulation modules.",
        },
        {
          id: "policy",
          label: "Card catalog",
          subtitle: "Definitions / formats",
          icon: "layers",
          detail:
            "The EVERBOUND catalog contains 1,300 authored definitions. Format validation controls which decks and cards can be used together.",
          connections:
            "Supplies card identities and format data to play and commerce.",
        },
        {
          id: "tools",
          label: "Game rules",
          subtitle: "EVERBOUND / NULL//SHIFT",
          icon: "swords",
          detail:
            "EVERBOUND resolves turns, priority, and combat. NULL//SHIFT models directives and sector control in its own project.",
          connections: "Produces game-state changes for the client.",
        },
        {
          id: "models",
          label: "Shop & world",
          subtitle: "Customers / economy",
          icon: "gem",
          detail:
            "Shop, economy, events, and world modules model inventory, purchasing, pricing, and progression.",
          connections: "Uses card identities and persists simulation progress.",
        },
        {
          id: "store",
          label: "Persistence",
          subtitle: "Saved state",
          icon: "server",
          detail:
            "Persistence is separated from the game’s presentation so stored state is not owned by the browser UI.",
          connections: "Preserves the simulation’s state across sessions.",
        },
      ],
    },
    gallery: [
      {
        src: "tcg-catalog.webp",
        width: 1040,
        height: 980,
        alt: "The actual Cornerdeck catalog interface with three sample cards from the development build.",
        title: "The real card-catalog interface",
        caption:
          "Captured from the development client’s actual renderer with three sample catalog fixtures. This UI capture does not run the rules engine.",
      },
    ],
    sourceNote:
      "Details come from the playable-formats source archive, the curated catalog, and the development-client documentation. No online multiplayer or production-readiness claim is implied.",
  },
};

export const featuredIds = ["monday", "toolkit", "tcg"];
export const caseStudyPath = (id) =>
  `${import.meta.env.BASE_URL}projects/${caseStudies[id].slug}/`;
export const pageFromPath = (pathname) =>
  featuredIds.find(
    (id) =>
      pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") ===
      caseStudyPath(id).replace(/\/$/, ""),
  ) ||
  (pathname === import.meta.env.BASE_URL ||
  pathname === `${import.meta.env.BASE_URL}index.html`
    ? "home"
    : "not-found");
