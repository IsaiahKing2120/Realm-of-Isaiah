import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { createServer } from "vite";

const outDir = resolve("dist");
const template = await readFile(resolve(outDir, "index.html"), "utf8");
if (
  !template.includes('<div id="root"></div>') ||
  !template.includes("<!-- page-meta -->")
) {
  throw new Error("Missing build placeholders in index.html.");
}
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  mode: "production",
});
try {
  const { pages, renderPage } = await vite.ssrLoadModule(
    "/src/entry-server.jsx",
  );
  const { profile } = await vite.ssrLoadModule("/src/data/portfolio.js");
  for (const page of pages) {
    const { html, head } = renderPage(page);
    const output = template
      .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
      .replace("<!-- page-meta -->", () => head);
    const destination = resolve(
      outDir,
      page.path.endsWith(".html") ? page.path : `${page.path}index.html`,
    );
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, output);
    console.log(`Built /${page.path}`);
  }
  await writeFile(resolve(outDir, ".nojekyll"), "");
  await writeFile(
    resolve(outDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((page) => page.id !== "not-found")
      .map((page) => `\n  <url><loc>${profile.siteUrl}${page.path}</loc></url>`)
      .join("")}\n</urlset>\n`,
  );
} finally {
  await vite.close();
}
