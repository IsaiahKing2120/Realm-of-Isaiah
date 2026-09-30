export const profile = {
  name: 'Isaiah King',
  email: 'isaiahking2120@gmail.com',
  github: 'https://github.com/IsaiahKing2120',
  resume: `${import.meta.env.BASE_URL}resume/IKING.pdf`,
};

export const projects = [
  {
    id: 'monday',
    number: '01',
    title: 'M.O.N.D.A.Y.',
    category: 'Software & tools',
    subtitle: 'A personal assistant, with a purpose.',
    status: 'In development',
    description:
      'Bringing conversation, local tools, and everyday development into one personal workspace.',
    tags: ['C# / .NET 9', 'ASP.NET Core', 'SQLite'],
    challenge:
      'I wanted an assistant that could work alongside me: understand a request, inspect a project, and help me get something done on my own machine.',
    approach:
      'The application separates conversation from tool execution. A local web interface and VS Code companion connect to a .NET core, with SQLite keeping conversation and task history.',
    built: [
      'Conversation through Ollama and cloud model APIs',
      'Local system tools and project inspection',
      'Review steps for commands and file changes',
      'Edit backups, action records, and an undo workflow',
    ],
    next: 'Make the desktop workflow more dependable, then introduce a limited public assistant experience here in the realm.',
    note: 'The portfolio guide is a separate, curated preview. It does not connect to my computer or execute system commands.',
  },
  {
    id: 'toolkit',
    number: '02',
    title: 'KTD Technician Toolkit',
    category: 'Software & tools',
    subtitle: 'From the workbench to the whole shop.',
    status: 'In development',
    description:
      'A portable diagnostic toolkit growing into a practical workspace for technicians, repair shops, and MSPs.',
    tags: ['C# / .NET', 'PowerShell', 'Windows'],
    challenge:
      'Working on devices every day means repeating the same checks and piecing together results. I wanted a tool that makes those checks consistent and the results useful.',
    approach:
      'A portable diagnostic engine produces technician-readable reports. The wider application is being built around intake, jobs, inventory, and the day-to-day work of a repair shop.',
    built: [
      '20+ automated diagnostic checks',
      'Hardware, storage, and operating-system health checks',
      'Encryption and security-agent checks',
      'Readable reports for a technician’s workflow',
    ],
    next: 'Finish business setup, staff roles, ticketing, invoicing, and the owner’s licensing dashboard as a connected shop workflow.',
    note: 'The diagnostic illustration on this site uses sample results. No checks run against a visitor’s device.',
  },
  {
    id: 'tcg',
    number: '03',
    title: 'TCG Shop & Rules Engine',
    category: 'Game development',
    subtitle: 'Build the shop. Play the cards.',
    status: 'In development',
    description:
      'A shop simulation and original card-game systems, built as separate parts of one growing world.',
    tags: ['C# / .NET 9', 'Game systems', 'Persistence'],
    challenge:
      'A card shop needs an economy that feels alive. A card game needs rules that hold up when effects, combat, and turn order start interacting.',
    approach:
      'The solution separates shop, economy, cards, rules, and persistence. That keeps the store simulation and card-game rules distinct while giving both room to expand.',
    built: [
      'Inventory, pricing, and customer purchasing',
      'Store progression and persistence',
      'Turn flow, combat, and deck validation',
      'Automated builds and tests for rule changes',
    ],
    next: 'Keep expanding playable formats, refine the rules interactions, and bring more of the shop’s daily loop into the interface.',
    note: 'The card artwork here is an abstract project illustration, not a screenshot of the game.',
  },
  {
    id: 'ground-zero',
    number: '04',
    title: 'Ground Zero',
    category: 'Game development',
    subtitle: 'A playground for gameplay systems.',
    status: 'Prototype',
    description:
      'An Unreal Engine sandbox for health UI, timing, and Blueprint/C++ gameplay workflows.',
    tags: ['Unreal Engine 5', 'C++', 'Blueprints'],
    repo: 'https://github.com/IsaiahKing2120/Ground-Zero-Shattered-Realm',
    challenge:
      'Learn how small gameplay systems fit together inside a larger game.',
    approach:
      'Prototype individual behaviors in a sandbox, then iterate on their feedback and integration.',
    built: [
      'Gameplay systems exploration',
      'Health-interface experiments',
      'Blueprint and C++ practice',
    ],
    next: 'Keep developing a stronger foundation for original game mechanics.',
  },
  {
    id: 'e-plant',
    number: '05',
    title: 'e-Plant Shopping',
    category: 'Web development',
    subtitle: 'A little storefront, a lot of state.',
    status: 'Learning project',
    description:
      'A responsive React storefront with product browsing, cart interactions, and reusable components.',
    tags: ['React', 'JavaScript', 'CSS'],
    repo: 'https://github.com/IsaiahKing2120/e-Plant-Shopping',
    challenge: 'Turn a product catalog into a coherent shopping flow.',
    approach:
      'Build the product interface around reusable components and predictable cart state.',
    built: [
      'Product listings',
      'Shopping-cart flow',
      'Responsive component layouts',
    ],
    next: 'Apply these component and state patterns to more involved applications.',
  },
  {
    id: 'redux',
    number: '06',
    title: 'Commerce / Redux',
    category: 'Web development',
    subtitle: 'Making shared state make sense.',
    status: 'Learning project',
    description:
      'An exercise in fetching, storing, and rendering product data with Redux Toolkit.',
    tags: ['React', 'Redux Toolkit', 'JavaScript'],
    repo: 'https://github.com/IsaiahKing2120/E-Commerce-Data-Rendering-using-Redux-Toolkit',
    challenge: 'Keep product data consistent across a React interface.',
    approach:
      'Use a centralized store and explicit state updates to connect data with the view.',
    built: [
      'Product-data rendering',
      'Redux Toolkit state management',
      'React component integration',
    ],
    next: 'Carry the same approach into larger interfaces with shared application state.',
  },
  {
    id: 'event-planner',
    number: '07',
    title: 'Event Planner',
    category: 'Web development',
    subtitle: 'Small details. Better plans.',
    status: 'Learning project',
    description:
      'A lightweight React project focused on event forms, validation, and straightforward state patterns.',
    tags: ['React', 'Forms', 'JavaScript'],
    repo: 'https://github.com/IsaiahKing2120/Event-planner',
    challenge: 'Make event information easy to enter and work with.',
    approach:
      'Keep form handling and interface state small, understandable, and close to the user’s task.',
    built: [
      'Event-entry forms',
      'Input validation',
      'Basic React state patterns',
    ],
    next: 'Continue refining approachable, usable form experiences.',
  },
  {
    id: 'realm',
    number: '08',
    title: 'Realm of Isaiah',
    category: 'Web development',
    subtitle: 'You’re already on the adventure.',
    status: 'You are here',
    description:
      'My corner of the internet: part portfolio, part field journal, and a little bit of an RPG.',
    tags: ['React', 'Vite', 'CSS'],
    repo: 'https://github.com/IsaiahKing2120/Realm-of-Isaiah',
    challenge:
      'Build a professional home for my work without losing the personality that makes it mine.',
    approach:
      'Combine a readable portfolio with optional exploration: a skill tree, project stories, a local guide, and a small rune game.',
    built: [
      'Responsive project showcase',
      'Interactive skill tree and career timeline',
      'Keyboard command menu and portfolio guide',
      'Rune Relay mini-game and saved preferences',
    ],
    next: 'Add deeper project walkthroughs and a carefully scoped M.O.N.D.A.Y. connection.',
  },
];

export const skillBranches = [
  {
    id: 'systems',
    name: 'Systems & support',
    icon: 'server',
    caption: 'Where I work.',
    nodes: [
      {
        id: 'deployment',
        title: 'Windows deployment',
        short: 'Deployment',
        level: 'On the job',
        icon: 'monitor',
        description:
          'Image, configure, and validate Windows devices for State of Georgia agencies, including drivers, firmware, and BitLocker.',
        tools: ['MDT', 'SCCM', 'PXE', 'Windows 11'],
        evidence: 'Computer Technician · ProLogic ITS',
        target: 'journey',
      },
      {
        id: 'support',
        title: 'Troubleshooting',
        short: 'Support',
        level: 'On the job',
        icon: 'wrench',
        description:
          'Work from the symptom to the cause across hardware, Microsoft 365, accounts, peripherals, and restaurant technology. Validate the fix and leave a useful handoff.',
        tools: ['Microsoft 365', 'Entra ID', 'POS', 'Remote support'],
        evidence: 'IT Support Lead · KFC',
        target: 'journey',
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure',
        short: 'Infrastructure',
        level: 'On the job',
        icon: 'network',
        description:
          'Hands-on enterprise storage implementation, post-change validation, and troubleshooting across connectivity, hardware, and configuration.',
        tools: ['Pure Storage', 'TCP/IP', 'DNS', 'DHCP'],
        evidence: 'Implementation Engineer · Translucent Services',
        target: 'journey',
      },
    ],
  },
  {
    id: 'software',
    name: 'Software & tools',
    icon: 'code',
    caption: 'What I build.',
    nodes: [
      {
        id: 'dotnet',
        title: 'C# & .NET',
        short: 'C# / .NET',
        level: 'Building with it',
        icon: 'code',
        description:
          'Build modular applications with clear responsibilities, persistent data, and interfaces that connect to useful tools.',
        tools: ['C#', '.NET 9', 'ASP.NET Core', 'SQLite'],
        evidence: 'Explore M.O.N.D.A.Y.',
        project: 'monday',
      },
      {
        id: 'frontend',
        title: 'Web interfaces',
        short: 'React / Web',
        level: 'Building with it',
        icon: 'layout',
        description:
          'Turn application ideas into responsive interfaces with components, state, forms, and a focus on clear interactions.',
        tools: ['React', 'JavaScript', 'HTML', 'CSS'],
        evidence: 'Explore the portfolio build',
        project: 'realm',
      },
      {
        id: 'automation',
        title: 'Scripting & automation',
        short: 'Automation',
        level: 'Building with it',
        icon: 'terminal',
        description:
          'Make repetitive checks repeatable. Write tools that collect useful information and turn it into readable output.',
        tools: ['PowerShell', 'Python', 'Bash', 'Git'],
        evidence: 'Explore KTD Technician Toolkit',
        project: 'toolkit',
      },
    ],
  },
  {
    id: 'games',
    name: 'Game development',
    icon: 'swords',
    caption: 'What pulls me forward.',
    nodes: [
      {
        id: 'rules',
        title: 'Game rules & systems',
        short: 'Rules engines',
        level: 'Building with it',
        icon: 'layers',
        description:
          'Model card interactions, combat, deck validation, and shop economies as systems that can be extended and tested.',
        tools: ['C#', '.NET', 'Unit tests', 'Persistence'],
        evidence: 'Explore the TCG project',
        project: 'tcg',
      },
      {
        id: 'unreal',
        title: 'Unreal & C++',
        short: 'Unreal / C++',
        level: 'Actively exploring',
        icon: 'swords',
        description:
          'Prototype gameplay behaviors and feedback while learning how C++ and Blueprints work together in Unreal Engine.',
        tools: ['C++', 'Unreal Engine 5', 'Blueprints'],
        evidence: 'Explore Ground Zero',
        project: 'ground-zero',
      },
      {
        id: 'loops',
        title: 'Interactive experiences',
        short: 'Game loops',
        level: 'Actively exploring',
        icon: 'gem',
        description:
          'Experiment with the small loops that make an interaction satisfying: clear goals, readable feedback, and a reason to try again.',
        tools: ['State machines', 'Input', 'Feedback', 'React'],
        evidence: 'Play Rune Relay',
        action: 'arcade',
      },
    ],
  },
];

export const experience = [
  {
    date: 'JUN 2026 — PRESENT',
    title: 'Computer Technician',
    company: 'ProLogic ITS · State of Georgia',
    current: true,
    text: 'Deploying and validating agency devices. Imaging, hardware repair, encryption checks, asset tracking, and dependable handoffs.',
    tags: ['MDT / SCCM', 'Windows 11', 'BitLocker'],
  },
  {
    date: 'SEP 2025 — JAN 2026',
    title: 'Implementation Engineer',
    company: 'Translucent Services · Pure Storage contractor',
    text: 'Installed and expanded enterprise storage systems, resolved deployment issues, and documented post-change validation.',
    tags: ['Enterprise storage', 'Implementation', 'Validation'],
  },
  {
    date: 'SEP 2022 — JUL 2025',
    title: 'IT Support Lead',
    company: 'KFC',
    text: 'Led escalated support for restaurant technology, from Windows and account issues to POS, payment devices, and vendor coordination.',
    tags: ['Tier 2 support', 'POS systems', 'Team support'],
  },
  {
    date: 'DEC 2019 — SEP 2022',
    title: 'Help Desk Technician',
    company: 'Del Taco',
    text: 'Supported workstations, applications, peripherals, and store connectivity through remote troubleshooting and hardware replacement.',
    tags: ['Help desk', 'Remote support', 'Networking'],
  },
];

export const credentials = [
  {
    title: 'Google IT Support',
    issuer: 'Professional Certificate',
    status: 'Completed',
  },
  { title: 'CompTIA ITF+', issuer: 'IT fundamentals', status: 'Completed' },
  {
    title: 'IBM Full Stack Developer',
    issuer: 'Professional Certificate',
    status: 'In progress',
  },
];
