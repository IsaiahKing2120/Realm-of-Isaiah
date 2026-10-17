export const quests = [
  {
    id: "runes",
    title: "Rune Relay",
    icon: "gem",
    badge: "Rune Keeper",
    genre: "Memory",
    time: "2–3 min",
    description:
      "Watch the ancient sequence. Repeat it. Survive all five rounds.",
  },
  {
    id: "packets",
    title: "Packet Runner",
    icon: "network",
    badge: "Pathfinder",
    genre: "Routing puzzle",
    time: "3–5 min",
    description:
      "Rotate the broken conduits and carry a signal across three relay stations.",
  },
  {
    id: "salvage",
    title: "Sector Salvage",
    icon: "search",
    badge: "Salvager",
    genre: "Grid logic",
    time: "2–4 min",
    description:
      "Recover a damaged archive. Read nearby fault counts, mark corruption, and scan when you need a clue.",
  },
  {
    id: "scheduler",
    title: "Boot Sequence",
    icon: "terminal",
    badge: "System Architect",
    genre: "Dependency puzzle",
    time: "2–4 min",
    description:
      "Bring three systems online. Dispatch jobs in an order their dependencies can actually support.",
  },
];

export const packetPaths = [
  [0, 1, 5, 6, 10, 9, 13, 14, 15],
  [0, 4, 8, 9, 5, 6, 2, 3, 7, 11, 15],
  [0, 1, 2, 6, 5, 9, 8, 12, 13, 14, 10, 11, 15],
];
export const directions = ["north", "east", "south", "west"];
const directionTo = (from, to) =>
  to === from - 4 ? 0 : to === from + 1 ? 1 : to === from + 4 ? 2 : 3;
export function packetPorts(level, index, turns = 0) {
  const path = packetPaths[level],
    position = path.indexOf(index);
  const ports =
    position < 0
      ? index % 2
        ? [0, 1]
        : [0, 2]
      : [
          position === 0 ? 3 : directionTo(index, path[position - 1]),
          position === path.length - 1
            ? 1
            : directionTo(index, path[position + 1]),
        ];
  return ports.map((port) => (port + turns) % 4);
}
export function tracePacket(level, rotations) {
  let cell = 0,
    entry = 3;
  const visited = [];
  while (!visited.includes(cell)) {
    const ports = packetPorts(level, cell, rotations[cell]);
    if (!ports.includes(entry)) return { visited, won: false, breakAt: cell };
    visited.push(cell);
    const exit = ports.find((port) => port !== entry);
    if (cell === 15 && exit === 1) return { visited, won: true, breakAt: null };
    if (
      (exit === 0 && cell < 4) ||
      (exit === 1 && cell % 4 === 3) ||
      (exit === 2 && cell >= 12) ||
      (exit === 3 && cell % 4 === 0)
    )
      return { visited, won: false, breakAt: cell };
    cell += [-4, 1, 4, -1][exit];
    entry = (exit + 2) % 4;
  }
  return { visited, won: false, breakAt: cell };
}
export function scramblePacket(level) {
  const turns = Array.from(
    { length: 16 },
    (_, index) => (index * 3 + level + 1) % 4,
  );
  // The entrance is always disconnected at the beginning of a station.
  while (packetPorts(level, 0, turns[0]).includes(3))
    turns[0] = (turns[0] + 1) % 4;
  return turns;
}

export function neighbors(index, size = 5) {
  const row = Math.floor(index / size),
    column = index % size,
    result = [];
  for (let y = -1; y <= 1; y++)
    for (let x = -1; x <= 1; x++) {
      const r = row + y,
        c = column + x;
      if ((x || y) && r >= 0 && r < size && c >= 0 && c < size)
        result.push(r * size + c);
    }
  return result;
}
export function createField(first, random = Math.random) {
  const safe = new Set([first, ...neighbors(first)]);
  const candidates = Array.from({ length: 25 }, (_, i) => i).filter(
    (i) => !safe.has(i),
  );
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates.slice(0, 5);
}
export function revealSector(index, mines, opened, flags) {
  const result = new Set(opened),
    queue = [index];
  while (queue.length) {
    const cell = queue.pop();
    if (result.has(cell) || flags.includes(cell) || mines.includes(cell))
      continue;
    result.add(cell);
    const adjacent = neighbors(cell);
    if (!adjacent.some((n) => mines.includes(n))) queue.push(...adjacent);
  }
  return [...result];
}

export const bootMissions = [
  {
    title: "Bench to handoff",
    context:
      "A simplified workstation deployment. Protect the existing data before changing the device.",
    jobs: [
      {
        id: "handoff",
        label: "Hand off device",
        needs: ["verify"],
        note: "Only a validated workstation leaves the bench.",
      },
      {
        id: "drivers",
        label: "Install drivers",
        needs: ["image"],
        note: "The new operating system needs its device drivers.",
      },
      {
        id: "inventory",
        label: "Inventory device",
        needs: [],
        note: "Identify the machine before changing anything.",
      },
      {
        id: "verify",
        label: "Validate workstation",
        needs: ["drivers", "encrypt"],
        note: "Check both hardware support and encryption.",
      },
      {
        id: "image",
        label: "Apply OS image",
        needs: ["backup"],
        note: "A verified backup comes before a destructive operation.",
      },
      {
        id: "encrypt",
        label: "Configure encryption",
        needs: ["image"],
        note: "Configure protection on the installed system.",
      },
      {
        id: "backup",
        label: "Verify backup",
        needs: ["inventory"],
        note: "Know which device and data you are protecting.",
      },
    ],
  },
  {
    title: "Ship the build",
    context:
      "A miniature release pipeline. Independent checks can run in either order, but packaging waits for both.",
    jobs: [
      {
        id: "publish",
        label: "Release artifact",
        needs: ["package"],
        note: "Release the tested package, not the working folder.",
      },
      {
        id: "test",
        label: "Run tests",
        needs: ["compile"],
        note: "Exercise the compiled build.",
      },
      {
        id: "deps",
        label: "Install dependencies",
        needs: ["source"],
        note: "Use the checked-out dependency manifest.",
      },
      {
        id: "package",
        label: "Package release",
        needs: ["lint", "test"],
        note: "Both quality gates must pass.",
      },
      {
        id: "source",
        label: "Check out source",
        needs: [],
        note: "Every release begins with a known source revision.",
      },
      {
        id: "compile",
        label: "Compile application",
        needs: ["deps"],
        note: "Compilation needs the project dependencies.",
      },
      {
        id: "lint",
        label: "Check source quality",
        needs: ["deps"],
        note: "This can happen before or after compilation.",
      },
    ],
  },
  {
    title: "One more turn",
    context:
      "Resolve one fictional turn in a game simulation. Presentation and saving both depend on the resolved state.",
    jobs: [
      {
        id: "save",
        label: "Save resolved state",
        needs: ["resolve"],
        note: "Persist the result rather than a half-finished turn.",
      },
      {
        id: "input",
        label: "Collect player action",
        needs: ["load"],
        note: "Actions need the current world state.",
      },
      {
        id: "render",
        label: "Render feedback",
        needs: ["resolve"],
        note: "Show the effects of the completed turn.",
      },
      {
        id: "next",
        label: "Begin next turn",
        needs: ["save", "render"],
        note: "The player needs feedback and a saved result.",
      },
      {
        id: "load",
        label: "Load world state",
        needs: [],
        note: "Establish the current board and actors.",
      },
      {
        id: "resolve",
        label: "Resolve interactions",
        needs: ["validate"],
        note: "Apply legal actions to the game state.",
      },
      {
        id: "validate",
        label: "Validate action",
        needs: ["input"],
        note: "Check legality before applying an action.",
      },
    ],
  },
];
