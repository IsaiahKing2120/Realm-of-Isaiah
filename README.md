# Realm of Isaiah

## Version 5.1: More Side Quests

Version 5.1 adds a bigger arcade layer to the site without changing what Realm of Isaiah is at its core.

The original Rune Relay mini-game is now joined by three new side quests:

- **Packet Runner** — three routing puzzles
- **Sector Salvage** — a replayable recovery grid
- **Boot Sequence** — three dependency challenges

Each completed quest earns a local badge in the browser. All four games support keyboard and touch controls, and they can be launched from the quest board, command palette, or portfolio terminal.

The arcade code only loads when a game is actually opened, so the main portfolio stays lightweight. Rune Relay keeps its existing saved record, unfinished runs reset when you leave, and completed badges stay saved locally.

Recruiter Mode also continues to keep the side-quest area out of the main reading flow.

To run the quest tests:

`npm run test:quests`

More implementation notes and controls are available in:

`docs/SIDE-QUESTS.md`

---

## What is Realm of Isaiah?

Realm of Isaiah is my personal portfolio and interactive development space.

It highlights my work across:

- systems implementation
- technical support
- software development
- automation
- infrastructure
- game systems
- personal development projects

Version 5 expanded the original React/Vite portfolio into a much more interactive experience while keeping the original site intact underneath it.

The existing project pages, résumé, screenshots, case studies, terminal, and Rune Relay are all still here.

The newer systems, including the Realm core, project atlas, technology explorer, and Recruiter Mode, sit on top of that foundation instead of replacing it.

The goal was simple:

Make the portfolio feel more like entering my digital workspace than scrolling through a résumé.

---

# New Interactive Systems

## Realm Core

The hero now includes a real WebGL artifact built specifically for the site.

It uses:

- faceted geometry
- orbital paths
- digital dust
- depth
- pointer movement
- multiple project modes

Selecting a mode changes the visual tone of the core and also connects it to real projects and technologies from the portfolio.

A still version is always available for visitors who disable motion or cannot run WebGL.

---

## Project Atlas

The Project Atlas turns eight of my existing builds into an interactive spatial map.

Projects can be selected using:

- mouse
- keyboard
- touch

Connections between projects are based on shared tags and technologies.

They are not meant to imply that the applications are technically connected to each other.

Selecting a project opens an inspector with more information and provides access to its existing case study or archive entry.

---

## Physical Project Artwork

Project visuals now have a little more life to them.

Depending on the project, artwork can respond with:

- subtle perspective
- cursor-following lighting
- diagnostic-style scanning effects
- card tilt
- layered depth

The TCG visuals use the existing abstract artwork already in the portfolio. No fake card art was created just to make the section look more impressive.

---

## Technology Evidence Explorer

The skills section is no longer just a collection of technologies.

Visitors can select individual technologies and see where they connect to actual projects or work experience.

Project matches are generated from the tags already attached to each project.

Employment-backed skills still use their existing evidence, and technologies without a real project connection do not suddenly get one.

I wanted this section to answer a more useful question than:

> “Do you know this technology?”

Instead, it shows:

> “Where have you actually used it?”

---

## Recruiter Mode

Recruiter Mode is the fast path through the portfolio.

When enabled, it strips away the heavier visual experience and prioritizes the information someone reviewing me for a role is probably looking for first:

- experience
- technical skills
- credentials
- featured projects
- résumé
- contact information

It also removes the hero WebGL scene and most decorative sections, disables ambient effects, and switches navigation to simpler labels.

The full project evidence is still available on the same site.

Recruiter Mode is saved locally in the browser and can be turned off from the same header at any time.

---

## Command Palette

Press:

`Ctrl + K`

or:

`Cmd + K`

to open the command palette.

It supports dynamic search and keyboard navigation using:

- Arrow Keys
- Home
- End
- Enter
- Escape

You can quickly jump to:

- projects
- résumé
- skills
- experience
- contact
- GitHub
- LinkedIn
- M.O.N.D.A.Y.
- KTD
- games

There is also a visible shortcut button in the header for people who do not know the keyboard command.

---

## Portfolio Terminal

The built-in terminal is still part of the site and now supports several useful commands:

`help`  
`about`  
`projects`  
`skills`  
`experience`  
`resume`  
`contact`  
`github`  
`linkedin`  
`clear`

There are also a few hidden commands for people who like poking around:

`whoami`  
`sudo hire isaiah`  
`developer`  
`unlock realm`

The Konami Code also launches Rune Relay as long as the user is not typing inside a text field or dialog.

Because every respectable developer portfolio needs at least one unnecessary secret.

---

# Performance

One of the main goals of Version 5 was adding more interaction without turning the site into something that only runs well on a gaming PC.

No new packages were added.

The WebGL renderer is loaded dynamically and is roughly:

- 3.4 KB uncompressed
- 1.7 KB gzip

The scene uses:

- a small fixed geometry buffer
- 64 dust particles
- three orbital paths
- roughly 30 render updates per second

Pixel ratio is capped at `1.5`.

There are no downloaded 3D models, texture packs, external font calls, or large animation libraries.

The scene only initializes when it is visible and motion is allowed.

Rendering stops when:

- the scene leaves the viewport
- the browser tab becomes hidden
- reduced motion is enabled
- ambient effects are disabled
- Recruiter Mode is active

If WebGL fails or the context is lost, the portfolio falls back to a CSS version of the artifact while keeping all project controls usable.

The site never relies on the 3D scene for access to important information.

---

# Input and Interaction

Pointer-based tilt is only enabled for mouse input.

It uses a single scheduled frame per update and does not block clicks or normal pointer behavior.

Touch devices use explicit selections instead of hover effects or motion sensors.

Scrolling remains completely native.

There are no forced camera sequences or scroll-jacking effects preventing someone from getting to the content they actually came to see.

The environment still changes as you move through the site using:

- section accents
- depth movement
- hero transitions
- desktop location indicators

The effects support the portfolio instead of controlling it.

---

# Mobile

The mobile experience is intentionally different from desktop.

The Realm core moves below the introduction so the page stays readable immediately.

The Project Atlas uses a simpler 2.5D layout instead of introducing another heavy WebGL scene.

The same eight projects are still available and selectable.

On smaller screens, the atlas stacks above its inspector so everything remains easy to reach.

I chose native HTML controls for the atlas because they are:

- faster
- more accessible
- easier to use with touch
- more reliable across devices

The goal was not to recreate the desktop experience exactly.

The goal was to make the mobile version feel like the same site without making a phone fight for its life.

---

# Project Evidence

Technical claims and screenshot sources are documented in:

`docs/PROJECT-EVIDENCE.md`

Each case study includes its current development status.

The public site includes selected screenshots and descriptions, but it does not expose the private source code for featured projects.

The archive still contains smaller public React and Unreal projects with their existing GitHub links.

For private featured projects, the site provides a direct email option for a code walkthrough.

A repository or live demo link should only be added when that project is actually ready to be public.

---

# M.O.N.D.A.Y. Demo

The M.O.N.D.A.Y. section includes an embedded terminal and floating guide that share the same curated response system.

Suggested questions connect areas such as:

- C# development
- IT experience
- system design

back to real evidence already present in the portfolio.

Unknown questions return a clear fallback instead of pretending the system knows something it does not.

The `clear` command resets the local conversation.

This is currently a browser-based portfolio simulation.

It does **not**:

- call an AI model
- access visitor files
- control a desktop
- send visitor questions to a server
- save conversations permanently

Conversation state only exists in component memory.

A future model-backed version would require:

- a separate backend
- a restricted portfolio knowledge source
- request limits
- server-side credentials
- proper security boundaries

GitHub Pages would continue hosting the frontend.

Private API keys will never be placed in client-side code, and the public portfolio will not expose a desktop command service.

---

# Accessibility and Browser Behavior

Accessibility was treated as part of the implementation instead of something added afterward.

Current behavior includes:

- `Ctrl/Cmd + K` keyboard access to the command menu
- native dialogs with focus management
- Escape-to-close behavior
- trigger focus restoration
- keyboard-accessible architecture components
- readable explanation panels
- image captions
- full-size image viewing
- reduced-motion support
- saved ambient-effects preferences
- native project and technology buttons
- visible selection states
- non-WebGL alternatives for important information

The WebGL scene is decorative.

Everything important it represents is also available through normal HTML controls.

The home page and case studies are also pre-rendered so the core portfolio content remains readable without JavaScript.

Interactive features require JavaScript.

Fonts and screenshots are served directly with the site, and the DM Sans license is included in:

`public/fonts`

---

# Built With

Realm of Isaiah continues to use the existing React/Vite foundation.

Version 5 and 5.1 focus on adding more depth and interaction without bloating the project with unnecessary packages.

The philosophy for the site is basically:

**Use the cool thing when the cool thing actually improves the experience.**

If plain HTML, CSS, and JavaScript can do the job better, use that instead.

The portfolio should be memorable because of what it communicates and how it feels to use, not because it throws the largest possible JavaScript bundle at the browser.
