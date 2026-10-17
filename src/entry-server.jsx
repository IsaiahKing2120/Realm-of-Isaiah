import { renderToString } from "react-dom/server";
import App from "./App";
import { profile } from "./data/portfolio";
import { caseStudies, featuredIds } from "./data/caseStudies";

export const pages = [
  {
    id: "home",
    path: "",
    title: "Isaiah King | IT + Software Development",
    description:
      "Realm of Isaiah: enterprise implementation, systems support, software development, and game systems. Explore M.O.N.D.A.Y., KTD Tech Tools, and the TCG Engine.",
    image: "realm-preview.png",
  },
  ...featuredIds.map((id) => ({
    id,
    path: `projects/${caseStudies[id].slug}/`,
    title: `${caseStudies[id].shortTitle} | Isaiah King`,
    description: caseStudies[id].summary,
    image: `${caseStudies[id].slug}-preview.png`,
  })),
  {
    id: "not-found",
    path: "404.html",
    title: "Page not found | Realm of Isaiah",
    description:
      "Return to Isaiah King’s portfolio to explore projects and experience.",
    image: "realm-preview.png",
  },
];
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function renderPage(page) {
  const url = `${profile.siteUrl}${page.path}`;
  const image = `${profile.siteUrl}images/social/${page.image}`;
  const schema =
    page.id === "home"
      ? {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: page.title,
          url,
          mainEntity: {
            "@type": "Person",
            name: profile.name,
            url: profile.siteUrl,
            jobTitle: "Computer Technician & Software Developer",
            sameAs: [profile.github, profile.linkedin],
            knowsAbout: [
              "IT implementation",
              "Windows systems support",
              "C#",
              ".NET",
              "React",
              "PowerShell",
              "Game systems",
            ],
          },
        }
      : page.id === "not-found"
        ? null
        : {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: caseStudies[page.id].shortTitle,
            description: page.description,
            url,
            image,
            author: {
              "@type": "Person",
              name: profile.name,
              url: profile.siteUrl,
            },
          };
  const head = `
    <title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Realm of Isaiah" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="${escape(page.title)} — Realm of Isaiah" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${escape(page.title)} — Realm of Isaiah" />
    ${page.id === "not-found" ? '<meta name="robots" content="noindex" />' : ""}
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>` : ""}
  `;
  return { html: renderToString(<App pageId={page.id} />), head };
}
