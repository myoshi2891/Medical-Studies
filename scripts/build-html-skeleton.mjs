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

function lightenHex(hex, amount = 0.8) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#f5f5f5";
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 0xff;
  const g = (n >> 8) & 0xff;
  const b = n & 0xff;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

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

function renderHeroTags(tagsCsv) {
  if (!tagsCsv) return "";
  return tagsCsv
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `    <span class="hero-tag">${t}</span>`)
    .join("\n");
}

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

function substitute(tpl, vars) {
  return tpl.replace(/\{\{([A-Z_0-9]+)\}\}/g, (m, k) => {
    if (!(k in vars)) {
      console.error(`Unsubstituted placeholder: {{${k}}}`);
      exit(3);
    }
    return vars[k];
  });
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// hero 3 色を検証して正規化（小文字化）した配列を返す。不正なら exit。
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

// category/page から出力パスを解決し、HTML_ROOT 配下に収まることを検証。
function resolveOutPath(category, page) {
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
