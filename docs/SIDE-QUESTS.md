# Side quests / version 5.1

## The quest board

The homepage's side-quest section and strip open a shared board. Ctrl/Cmd + K can launch a named game directly. The M.O.N.D.A.Y. portfolio terminal also recognizes the four game titles. The existing Konami shortcut still opens Rune Relay.

| Quest          | Goal                                    | Badge            |
| -------------- | --------------------------------------- | ---------------- |
| Rune Relay     | Repeat the pattern through five rounds  | Rune Keeper      |
| Packet Runner  | Restore all three signal routes         | Pathfinder       |
| Sector Salvage | Reveal all 20 safe sectors in one field | Salvager         |
| Boot Sequence  | Complete three job dependency puzzles   | System Architect |

Rune Relay retains its four rune controls and number keys 1–4. Packet Runner rotates tiles clockwise with click, tap, Enter, or Space. It illuminates connected tiles and reports where a transmitted signal stops. Not every tile is required to reach the exit.

Sector Salvage has five faults on a 5×5 grid. The first revealed sector and its immediate neighbors are safe. Numbers count adjacent faults. Reveal/Mark controls work identically on touch and desktop. The scanner always uncovers a safe sector and can clear an incorrect marker, so a player never has to guess to finish. A new field is generated at the first reveal of each run. Faults and device/network operations are entirely fictional.

Boot Sequence uses three authored dependency graphs. A job becomes valid only when all of its prerequisites are complete. Independent jobs can be dispatched in either order. Failed attempts show what is missing without wiping progress. The scenarios are simplified puzzles, not operational runbooks.

Both grids support arrow-key movement and Home/End within a row. Native buttons remain reachable with Tab. Escape closes the arcade and restores focus. The sticky dialog header keeps Close available while scrolling. Motion preferences continue to apply.

## Persistence and performance

- Badges use the existing defensive preference storage helper and remain local to this browser.
- Existing `realm:rune-best` records are honored. New badges use `realm:quest-badges`.
- Storage failure leaves games playable and earned badges available in memory for the open session.
- Leaving or closing a game resets its unfinished run. No account, leaderboard, analytics, or server is involved.
- React lazy loading keeps the arcade and its CSS out of the initial page bundle. The arcade module is approximately 20 KB before compression, plus approximately 6 KB CSS.
- Games are event-driven. Only the existing Rune Relay sequence uses short timers, which are canceled when leaving it.

## Code map

- `src/components/Arcade.jsx`: board, game selection, local badges, shared dialog.
- `src/components/RuneRelay.jsx`: preserved memory game, separated from its dialog shell.
- `src/components/PacketRunner.jsx`, `SectorSalvage.jsx`, `BootSequence.jsx`: new games.
- `src/data/quests.js`: catalog, routing definitions and traversal, grid reveal logic, job dependencies.
- `src/lib/questControls.js`: shared keyboard navigation for both grids.
- `src/quests.css`: arcade styles, loaded with the arcade.
- `tests/quests.test.mjs`: solvable routes, safe first reveals, flood behavior, achievable dependency graphs.

## Verification

`npm run lint`, `npm run test:quests`, and `npm run build` validate the release locally. Puzzle tests cover all first-click positions across 30 seeded grid variations, all relay solutions, and every dependency graph.

Browser checks exercised all four completion paths, invalid routing, blocked jobs, alternative valid job ordering, marked sectors, scanner completion, fault loss, reset, badge persistence, legacy Rune Relay records, storage failure, keyboard navigation, and palette/terminal launches. Layouts were checked at 320, 390, 768, and 1440 pixels. Automated accessibility checks of the board and three new games found no WCAG A/AA violations; this is not a certification of complete accessibility.
