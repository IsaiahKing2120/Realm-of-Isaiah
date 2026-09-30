# Realm of Isaiah

The personal world of Isaiah King. A portfolio for software, systems, and game development, with a little room for adventure.

## Run it

Install Node.js 22 or newer. On Windows, double-click `START-WEBSITE.bat`, or use a terminal:

```sh
npm ci
npm run dev
```

Open the local address Vite prints. The site uses `/Realm-of-Isaiah/` as its base path, matching the existing GitHub Pages repository.

## Build and check

```sh
npm run lint
npm run build
npm run preview
```

`dist/` is the production website. A ready-built copy is included in the release archive. Serve it over HTTP with `npm run preview`; opening `index.html` directly as a local file does not support the module and base-path setup.

## Publish to the existing GitHub Pages site

From an authenticated checkout of `IsaiahKing2120/Realm-of-Isaiah`:

```sh
npm ci
npm run deploy
```

The `predeploy` script runs the production build first. The deploy script publishes `dist/` to the `gh-pages` branch using the existing hosting approach. In GitHub Pages settings, the publishing source should be that branch’s root.

To transfer this release into an existing checkout, replace its `src/` and `public/` directories with the ones in this archive, and copy the root configuration files. Keep your checkout’s `.git` directory. Then install the updated dependencies with `npm ci`. The original uploaded archive remains your backup.

If you later move to a custom domain or another repository, update the base in `vite.config.js` and the canonical/social URLs in `index.html` together.

## Inside the realm

- **The workbench:** eight projects, category filters, and individual project breakdowns. Includes current development work, prototypes, and smaller learning projects.
- **The skill tree:** nine selectable skills across systems, software, and game development. Each skill links to related work or experience.
- **The quest log:** a career timeline and certificates, aligned with the included résumé. The IBM Full Stack Developer certificate remains marked in progress, as listed in that PDF.
- **M.O.N.D.A.Y.:** a portfolio guide with curated answers and navigation actions. It can point visitors to projects, skills, work history, the résumé, contact details, or the arcade.
- **Rune Relay:** a five-round memory game with mouse, touch, and number-key input, a replay option, and a saved Rune Keeper badge.
- **Quick travel:** `Ctrl+K` or `Cmd+K` opens the command menu. Escape closes dialogs. Tab moves between available actions.
- **Personal touches:** an optional traveler name, saved motion preferences, animated embers, and the original landscape and portrait.

The original full-screen name gate is replaced by an optional greeting. Visitors can get straight to the work.

## Edit the content

| File                        | What it controls                                                               |
| --------------------------- | ------------------------------------------------------------------------------ |
| `src/data/portfolio.js`     | Projects, skill descriptions, experience, certificates, email, and résumé path |
| `src/App.jsx`               | Main page layout, introduction, about copy, contact details, and preferences   |
| `src/styles.css`            | Typography, color, component styles, responsive layouts, and motion            |
| `src/lib/guide.js`          | The portfolio guide’s curated answers and navigation actions                   |
| `src/components/Arcade.jsx` | Rune Relay rules and interaction                                               |
| `public/resume/IKING.pdf`   | The downloadable résumé supplied with the project                              |
| `public/images/`            | Original landscape and portrait                                                |
| `index.html`                | Page title, description, sharing metadata, favicon, and no-script fallback     |

Update the content and the résumé together when experience or certifications change.

## M.O.N.D.A.Y.’s next chapter

The portfolio guide works entirely in the browser. It is a separate preview, not the desktop assistant, and it does not execute commands, inspect the visitor’s computer, or call a model provider. Its label and fallback responses make that boundary clear.

The guide’s conversation UI lives in `src/components/Guide.jsx`; its response logic is isolated in `src/lib/guide.js`. A future integration can replace that response layer with a server endpoint while keeping the interface. The server should own provider credentials and return plain-text replies plus a small allowlist of portfolio navigation actions. Add loading, cancellation, and failure states when connecting that endpoint.

GitHub Pages hosts static files, so a live connection needs a separate backend. Keep the public assistant limited to portfolio questions and explicitly chosen public tools; local desktop controls belong in the private desktop application. No credentials or API keys belong in browser environment variables or this repository.

## Interaction and privacy

Email links open the visitor’s email application. The copy button copies the public contact address, with a readable fallback if clipboard access is unavailable.

The site uses no analytics, trackers, external fonts, or remote assistant calls. The traveler name, effects preference, and best rune score are stored only in the visitor’s browser under `realm:` keys. Guide messages live in memory and clear when the dialog closes. The site still works when browser storage is unavailable.

Motion respects the operating system’s reduced-motion preference. Dialogs use native modal behavior, keyboard focus containment, Escape dismissal, and focus restoration. Project details and primary navigation are available without playing the game.

## Typography and assets

DM Sans is self-hosted through `@fontsource-variable/dm-sans`, under its bundled SIL Open Font License. Display headings use the system serif stack. The landscape, illustrated portrait, and résumé are retained from the supplied source. Project panels are lightweight interface illustrations, with sample output identified as such.
