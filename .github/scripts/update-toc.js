#!/usr/bin/env node
/**
 * README.md의 <!-- TOC_START --> ~ <!-- TOC_END --> 사이를 자동 갱신.
 * 최상위 폴더를 '주제'로 보고, 하위 .md 파일을 목차 항목으로 나열한다.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const README = path.join(ROOT, "README.md");

// 스캔 대상 최상위 폴더 (여기 이름이 README에서 섹션 제목이 됨)
const SECTIONS = [
  { dir: "Network", title: "🌐 Network" },
  { dir: "OS", title: "🖥️ OS (운영체제)" },
  { dir: "Algorithm", title: "🧩 Algorithm" },
  { dir: "Frontend", title: "🎨 Frontend" },
];

const IGNORE_DIRS = new Set([".git", ".github", ".obsidian", ".omc", "node_modules"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

// 파일의 첫 제목(# ...) 또는 파일명으로부터 타이틀 추출
function extractTitle(file) {
  const content = fs.readFileSync(file, "utf8");
  const h1 = content.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return path.basename(file, ".md");
}

// GitHub가 읽는 상대경로 링크 — 공백/특수문자는 encodeURI로 처리
function toLink(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  return "./" + rel.split("/").map(encodeURIComponent).join("/");
}

function buildSection({ dir, title }) {
  const absDir = path.join(ROOT, dir);
  if (!fs.existsSync(absDir)) return "";

  const files = walk(absDir).sort();
  if (files.length === 0) return "";

  // 하위 폴더별로 그룹화 (최상위 폴더 기준 1단계 하위를 소그룹으로)
  const groups = new Map();
  for (const file of files) {
    const rel = path.relative(absDir, file);
    const parts = rel.split(path.sep);
    const group = parts.length === 1 ? "_root" : parts[0];
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(file);
  }

  const lines = [`### ${title}`, ""];

  // 루트 직속 파일 먼저
  if (groups.has("_root")) {
    for (const f of groups.get("_root")) {
      lines.push(`- [${extractTitle(f)}](${toLink(f)})`);
    }
    lines.push("");
    groups.delete("_root");
  }

  for (const [group, files] of [...groups.entries()].sort()) {
    lines.push(`#### ${group}`, "");
    for (const f of files) {
      lines.push(`- [${extractTitle(f)}](${toLink(f)})`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function main() {
  const blocks = SECTIONS.map(buildSection).filter(Boolean).join("\n");
  const readme = fs.readFileSync(README, "utf8");

  const start = "<!-- TOC_START -->";
  const end = "<!-- TOC_END -->";
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(readme)) {
    console.error("README.md에 TOC 마커가 없습니다. <!-- TOC_START --> ~ <!-- TOC_END -->를 추가하세요.");
    process.exit(1);
  }

  const replacement = `${start}\n\n${blocks}\n${end}`;
  const updated = readme.replace(pattern, replacement);

  if (updated === readme) {
    console.log("변경 사항 없음");
    return;
  }
  fs.writeFileSync(README, updated);
  console.log("README.md 목차 갱신 완료");
}

main();
