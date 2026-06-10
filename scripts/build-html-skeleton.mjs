#!/usr/bin/env bun
import { readFile, writeFile, readdir, access } from "node:fs/promises";
import { resolve, dirname, join, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { exit, argv } from "node:process";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const TEMPLATE_PATH = join(
  ROOT,
  ".claude/skills/md-to-medical-html/templates/skeleton.html.tmpl",
);
const HTML_ROOT = join(ROOT, "Types-of-headache/html-files");

/**
 * Parse command-line style arguments into a plain options object.
 *
 * Processes only arguments that start with `--`. An argument of the form
 * `--key` becomes `opts.key = true`; `--key=value` becomes `opts.key = "value"`.
 *
 * @param {string[]} args - Array of command-line arguments (e.g. process.argv.slice(2)).
 * @return {Object<string, string|true>} An object mapping option names to their values (`true` for flags, string for `--key=value`).
 */
function parseArgs(args) {
  const opts = {};
  for (const a of args) {
    if (!a.startsWith("--")) continue;
    const eq = a.indexOf("=");
    if (eq === -1) {
      opts[a.slice(2)] = true;
    } else {
      opts[a.slice(2, eq)] = a.slice(eq + 1);
    }
  }
  return opts;
}

/**
 * Ensure that the given option keys are present in the opts object and abort if any are missing.
 *
 * If one or more keys are missing, prints an error listing the missing options and the usage,
 * then exits the process with code 2.
 *
 * @param {Object} opts - Mapping of option names to their values.
 * @param {string[]} keys - List of option names that must be defined on `opts`.
 */
function required(opts, keys) {
  const missing = keys.filter((k) => opts[k] === undefined);
  if (missing.length > 0) {
    console.error(`Missing required options: ${missing.join(", ")}`);
    console.error(USAGE);
    exit(2);
  }
}

const USAGE = `
Usage:
  bun scripts/build-html-skeleton.mjs \\
    --page=<PageName> \\
    --category=<Category> \\
    --emoji='<emoji>' \\
    --hero='<c1>,<c2>,<c3>' \\
    --prefix=<page-prefix> \\
    --sections=<N> \\
    --title='<full title>' \\
    --subtitle='<hero sub>' \\
    --tags='<tag1>,<tag2>,...' \\
    --section-titles='<t1>,<t2>,...'

Optional:
  --active-bg='#hex'           Light bg color for active nav (defaults: hero c3 + 80% white)
  --mermaid-primary='#hex'     Mermaid node fill (default: active-bg)
  --mermaid-text='#hex'        Mermaid text color (default: hero c1)
  --mermaid-border='#hex'      Mermaid border color (default: hero c2)
  --mermaid-line='#hex'        Mermaid edge color (default: #546e7a)
  --lang=ja                    HTML lang
  --year=2026                  Footer year
  --force                      Overwrite existing file and skip color-collision check
  --dry-run                    Print to stdout instead of writing
`;

/**
 * Produce a lighter hex color by mixing the input color toward white.
 *
 * @param {string} hex - Input hex color in 3- or 6-digit form, with or without a leading `#` (e.g. `#abc` or `aabbcc`). If the input is not a valid 3- or 6-digit hex, the function returns `#f5f5f5`.
 * @param {number} [amount=0.8] - Mix factor in the range 0–1 that determines how far each RGB channel moves toward 255; `0` leaves the color unchanged, `1` turns it white.
 * @returns {string} A 6-digit lowercase hex color string prefixed with `#` representing the lightened color, or `#f5f5f5` for invalid input.
 */
function lightenHex(hex, amount = 0.8) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#f5f5f5";
  // 3 桁表記（#abc）は各桁を 2 倍に展開して 6 桁へ正規化してから解析する。
  const hex6 =
    m[1].length === 3
      ? m[1]
          .split("")
          .map((c) => c + c)
          .join("")
      : m[1];
  const n = parseInt(hex6, 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

/**
 * Scan the HTML output root and collect hero-gradient hex colors found in existing pages.
 *
 * Recursively searches HTML_ROOT for .html files and, for each file containing a
 * `.hero{background:linear-gradient(135deg,...)}` fragment, extracts hex tokens
 * matching `#[0-9a-fA-F]{3,8}` from the gradient and records them.
 *
 * @returns {Array<{file: string, hexes: string[]}>} An array of objects where `file` is the file path and `hexes` is the list of extracted hex color strings in lowercase.
async function collectExistingHeroColors() {
  const collected = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        await walk(p);
      } else if (e.name.endsWith(".html")) {
        const txt = await readFile(p, "utf8");
        const m = /\.hero\{background:linear-gradient\(135deg,([^)]+)\)/.exec(
          txt,
        );
        if (m) {
          const hexes = m[1].match(/#[0-9a-fA-F]{3,8}/g) || [];
          collected.push({ file: p, hexes: hexes.map((h) => h.toLowerCase()) });
        }
      }
    }
  }
  await walk(HTML_ROOT);
  return collected;
}

/**
 * Render a comma-separated list of tags as newline-separated `<span class="hero-tag">` elements indented by four spaces.
 * @param {string} tagsCsv - Comma-separated tag values; may contain extra whitespace.
 * @returns {string} A string containing one `<span class="hero-tag">TAG</span>` per non-empty tag, joined with `\n`. An empty string if `tagsCsv` is falsy or contains no tags.
 */
function renderHeroTags(tagsCsv) {
  if (!tagsCsv) return "";
  return tagsCsv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `    <span class="hero-tag">${t}</span>`)
    .join("\n");
}

/**
 * Render sidebar navigation links from a comma-separated titles string or generate default section labels.
 *
 * @param {string|undefined} titles - Comma-separated section titles; if falsy, default labels "セクション 1" … are used.
 * @param {number} count - Number of section links to produce; the list is padded with or truncated to this length.
 * @returns {string} Newline-separated HTML anchor elements like `<a class="nav-a" href="#sN"><span class="n-num">N</span>Title</a>` for each section.
 */
function renderSidebarLinks(titles, count) {
  const list = titles
    ? titles
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : Array.from({ length: count }, (_, i) => `セクション ${i + 1}`);
  if (list.length !== count) {
    console.error(
      `Warning: --sections=${count} but --section-titles has ${list.length} entries; padding/truncating.`,
    );
    while (list.length < count) list.push(`セクション ${list.length + 1}`);
    list.length = count;
  }
  return list
    .map(
      (t, i) =>
        `  <a class="nav-a" href="#s${i + 1}"><span class="n-num">${
          i + 1
        }</span>${t}</a>`,
    )
    .join("\n");
}

/**
 * Substitute template placeholders with values from a mapping.
 *
 * Placeholders must be of the form `{{KEY}}` where `KEY` contains only
 * uppercase letters, digits, and underscores. Every placeholder found in
 * `tpl` must have a corresponding property in `vars`; if a placeholder is
 * missing, the function logs an error and exits the process with code 3.
 *
 * @param {string} tpl - Template string containing `{{KEY}}` placeholders.
 * @param {Object.<string, string>} vars - Mapping from placeholder keys to replacement strings.
 * @returns {string} The template with all placeholders replaced by their corresponding values.
 */
function substitute(tpl, vars) {
  return tpl.replace(/\{\{([A-Z_0-9]+)\}\}/g, (m, k) => {
    if (!(k in vars)) {
      console.error(`Unsubstituted placeholder: {{${k}}}`);
      exit(3);
    }
    return vars[k];
  });
}

/**
 * Determines whether a filesystem path is accessible.
 * @param {string} p - Path to check.
 * @returns {boolean} `true` if the path is accessible, `false` otherwise.
 */
async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate and normalize a comma-separated trio of hero hex colors.
 *
 * Parses `heroOpt` as three comma-separated hex color tokens, trims and lowercases each,
 * validates they are `#rrggbb` or `#rgb` hex formats, and returns the normalized array.
 *
 * @param {string} heroOpt - Comma-separated list of three hex colors (e.g. "#1a237e,#283593,#0277bd").
 * @returns {string[]} An array of three normalized lowercase hex color strings.
 * Logs an error and exits the process with code `2` if the input does not contain exactly three colors
 * or if any color is not a valid hex value.
 */
function parseHeroColors(heroOpt) {
  const colors = heroOpt.split(",").map((s) => s.trim().toLowerCase());
  if (colors.length !== 3) {
    console.error("--hero must be 3 comma-separated hex colors");
    exit(2);
  }
  const isHex = (v) => /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(v);
  if (!colors.every(isHex)) {
    console.error(
      "--hero colors must be valid hex values (e.g. '#1a237e,#283593,#0277bd')",
    );
    exit(2);
  }
  return colors;
}

/**
 * Resolve the output directory and HTML file path for a given category and page, ensuring the result stays under HTML_ROOT.
 *
 * @param {string} category - Category subdirectory name; must be a non-empty string.
 * @param {string} page - Page base name (without the `.html` extension).
 * @returns {{outDir: string, outPath: string}} An object where `outDir` is the absolute directory path for the category and `outPath` is the absolute path to the generated `<page>.html`.
 *
 * On invalid input (empty category) or if the resolved `outPath` would lie outside HTML_ROOT, the function logs an error and terminates the process with exit code 2.
 */
function resolveOutPath(category, page) {
  // 空カテゴリは HTML_ROOT 直下への書き込みを許してしまうため明示的に拒否する。
  if (!category) {
    console.error("Output path must stay within Types-of-headache/html-files");
    exit(2);
  }
  const outDir = resolve(HTML_ROOT, category);
  const outPath = resolve(outDir, `${page}.html`);
  // path.relative で境界判定（OS の区切り文字に依存しない）。
  // 結果が ".." 始まり、または絶対パスなら HTML_ROOT の外を指している。
  const rel = relative(resolve(HTML_ROOT), outPath);
  if (rel === "" || rel.startsWith("..") || isAbsolute(rel)) {
    console.error("Output path must stay within Types-of-headache/html-files");
    exit(2);
  }
  return { outDir, outPath };
}

/**
 * Generate an HTML skeleton from CLI options and write it to the resolved output path.
 *
 * Parses command-line options, validates required fields (including `--hero` colors and that
 * `--sections` is a positive integer), resolves and sanitizes the output path, and enforces
 * overwrite and hero-color-collision policies. Renders the skeleton template with derived
 * variables (hero colors, mermaid colors, sidebar links, etc.). If `--dry-run` is set the
 * rendered HTML is written to stdout; otherwise the category directory is created (if needed)
 * and the file is written to disk, with a console message reporting the written path and line count.
 *
 * Exits the process with code 2 for validation errors (missing/invalid options), 4 when refusing
 * to overwrite an existing file without `--force`, and 5 when the new hero gradient exactly
 * duplicates an existing file's hero colors (unless `--force` is used).
 */
async function main() {
  const opts = parseArgs(argv.slice(2));
  if (opts.help || opts.h) {
    console.log(USAGE);
    return;
  }
  required(opts, [
    "page",
    "category",
    "emoji",
    "hero",
    "prefix",
    "sections",
    "title",
    "subtitle",
    "tags",
    "section-titles",
  ]);

  const heroColors = parseHeroColors(opts.hero);

  const sections = parseInt(opts.sections, 10);
  if (!Number.isFinite(sections) || sections < 1) {
    console.error("--sections must be a positive integer");
    exit(2);
  }

  const { outDir, outPath } = resolveOutPath(opts.category, opts.page);

  if (!opts.force && (await exists(outPath))) {
    console.error(`Refusing to overwrite ${outPath} (use --force)`);
    exit(4);
  }

  if (!opts.force) {
    const existing = await collectExistingHeroColors();
    for (const { file, hexes } of existing) {
      if (file === outPath) continue;
      const overlap = heroColors.filter((c) => hexes.includes(c));
      if (overlap.length === heroColors.length) {
        console.error(
          `Hero gradient ${heroColors.join(",")} duplicates colors in ${file}. Use --force to override.`,
        );
        exit(5);
      }
    }
  }

  const activeBg = opts["active-bg"] || lightenHex(heroColors[2], 0.8);
  const mermaidPrimary = opts["mermaid-primary"] || activeBg;
  const mermaidText = opts["mermaid-text"] || heroColors[0];
  const mermaidBorder = opts["mermaid-border"] || heroColors[1];
  const mermaidLine = opts["mermaid-line"] || "#546e7a";

  const tpl = await readFile(TEMPLATE_PATH, "utf8");
  const rendered = substitute(tpl, {
    LANG: opts.lang || "ja",
    PAGE_TITLE: opts.title,
    HERO_EMOJI: opts.emoji,
    HERO_H1: opts.title,
    HERO_SUB: opts.subtitle,
    HERO_TAGS: renderHeroTags(opts.tags),
    HERO_C1: heroColors[0],
    HERO_C2: heroColors[1],
    HERO_C3: heroColors[2],
    PAGE_PREFIX: opts.prefix,
    ACTIVE_BG: activeBg,
    MERMAID_PRIMARY: mermaidPrimary,
    MERMAID_PRIMARY_TEXT: mermaidText,
    MERMAID_PRIMARY_BORDER: mermaidBorder,
    MERMAID_LINE: mermaidLine,
    SIDEBAR_LINKS: renderSidebarLinks(opts["section-titles"], sections),
    CREATED_YEAR: opts.year || String(new Date().getFullYear()),
  });

  if (opts["dry-run"]) {
    process.stdout.write(rendered);
    return;
  }

  // Ensure category directory exists
  await import("node:fs/promises").then((fs) =>
    fs.mkdir(outDir, { recursive: true }),
  );
  await writeFile(outPath, rendered, "utf8");
  console.log(`Wrote ${outPath} (${rendered.split("\n").length} lines)`);
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
