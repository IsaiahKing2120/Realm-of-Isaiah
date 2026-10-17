# Release verification

## Version 5.1 / side quests

The four-game arcade, puzzle invariants, local badge persistence, and launch paths were checked separately. See `SIDE-QUESTS.md` for the scope and `npm run test:quests` for reproducible puzzle tests. The existing portfolio data and static case-study route generator were retained.

## Version 5 / interactive Realm

- Production build and ESLint passed using the existing dependency versions. No new packages were installed in the project.
- Verified real WebGL drawing in headless Chromium, project-mode controls, still/resume, offscreen draw suspension, and live reduced-motion changes.
- Forced unavailable WebGL and context loss: still artifact and case-study controls remained usable.
- Atlas selection, shared-technology evidence, case-study links, archive modal links, and keyboard selection passed.
- C# points to M.O.N.D.A.Y. and TCG, not KTD. PowerShell points to KTD. SCCM retains ProLogic employment evidence.
- All requested command-palette search terms returned actions. Ctrl/Cmd + K, arrow traversal, Enter navigation, and Escape passed.
- Terminal command set, external profile links, clear, hidden commands, and Konami unlock passed.
- Recruiter Mode stopped 3D, showed the professional brief, returned the page to the top, persisted after reload, and fit 320/390/768/1024/1440px widths.
- Touch-emulated atlas selection, project inspection, and modal dismissal passed.
- Automated WCAG A/AA checks found no violations in Recruiter Mode, the standard homepage, or the three case-study pages. Automated checks do not certify full accessibility.
- Runtime page-error collection was empty. Static routes and local resource requests passed. Browser-emulation tests are not a substitute for testing on physical phones or Safari/Firefox.
- Native scrolling is preserved. No production hosting changes were made.

## Preserved systems

- Production build and source lint passed.
- Homepage and three case-study routes passed direct-load and refresh checks on a static server.
- Layout checked at 320, 390, 768, 1024, and 1440 pixels without horizontal overflow.
- Automated WCAG A/AA checks returned no violations on the homepage and three case-study pages. This is an automated check, not a certification of complete accessibility.
- Terminal suggestions, fallback answers, text escaping, and conversation reset passed.
- Archive filters, image enlargement, keyboard focus containment, Escape dismissal, and focus restoration passed.
- Command-menu links, mobile navigation, cross-page guide actions, LinkedIn, and résumé view/download passed.
- Skill evidence links, reduced motion, saved greeting, all five Rune Relay rounds, and retry passed.
- Homepage and case studies remained readable with JavaScript disabled.
- Local built assets and four 1200 × 630 social-preview images were verified.
- No runtime page errors or failed requests were observed in the integration checks.

GitHub Pages publication is performed separately using `npm run deploy`.
