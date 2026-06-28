import { cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { Ext } from "@/components/Ext";
import { GLOSSARY } from "@/lib/glossary/glossary";
import type { GlossaryTerm } from "@/lib/glossary/types";
import Term from "./Term";

/**
 * 既知の専門用語を本文中で自動的に Term ツールチップ化するコンポーネント。
 *
 * `children`（React 子ツリー）を再帰的に走査し、`lib/glossary` の用語の
 * **ページ内初出 1 回**だけを `<Term id>` でラップする。各教育ページは本文ルート
 * （`<main>`）をこれで包むだけで、辞書に載っている全用語へツールチップが付く
 * （hero/sidebar/disclaimer は main の外なので自然に対象外）。
 *
 * 設計上の安全策:
 * - **最長一致優先**（複合語を部分語より先に拾う。例: 大後頭神経 > 後頭神経）。
 * - `<a>` / `Ext`（リンク）/ `code` / `button` 配下、`data-no-glossary` を持つ要素は走査しない
 *   （リンク内ボタン禁止・既存 UI を壊さない）。
 * - 既存の手動 `<Term>` は温存し、その id を「使用済み」として記録する。
 * - 文字列を分割して用語を子要素に保持するだけなので **textContent は不変**
 *   （見出し・表の要素数や文字列を変えず、契約テストを壊さない）。
 * - `MermaidDiagram` のチャートは prop（children ではない）ため自然に対象外。
 *
 * @param children - 走査対象の本文ツリー。
 */
export default function AutoGlossary({ children }: Readonly<{ children: ReactNode }>) {
  const used = new Set<string>();
  return <>{process(children, used)}</>;
}

/** 最長一致のため term 文字数降順に並べ、先頭文字でバケット化する。 */
const SORTED: GlossaryTerm[] = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);
const BY_FIRST_CHAR = new Map<string, GlossaryTerm[]>();
for (const t of SORTED) {
  const c = t.term[0];
  const arr = BY_FIRST_CHAR.get(c);
  if (arr) arr.push(t);
  else BY_FIRST_CHAR.set(c, [t]);
}

/** この要素配下は走査しない（リンク・コード・ボタン・明示オプトアウト）。 */
function shouldSkip(el: ReactElement): boolean {
  if (el.type === Ext) return true;
  if (typeof el.type === "string") {
    if (el.type === "a" || el.type === "code" || el.type === "button") return true;
  }
  const props = el.props as Record<string, unknown> | null;
  if (props?.["data-no-glossary"]) return true;
  return false;
}

function process(node: ReactNode, used: Set<string>): ReactNode {
  if (typeof node === "string") return wrapText(node, used);

  if (Array.isArray(node)) {
    // 静的な子ツリーの変換であり配列の順序は不変なので index key で問題ない。
    return node.map((child, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: 静的ツリー変換・順序不変
      <Fragment key={i}>{process(child, used)}</Fragment>
    ));
  }

  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode; id?: string }>;
    // 既存 Term は温存しつつ id を使用済みに記録する。
    if (el.type === Term) {
      if (el.props.id) used.add(el.props.id);
      return node;
    }
    if (shouldSkip(el)) return node;
    if (el.props.children === undefined) return node;
    return cloneElement(el, undefined, process(el.props.children, used));
  }

  // number / boolean / null / undefined はそのまま。
  return node;
}

/** 文字列を走査し、未使用の既知用語の最初の一致を Term でラップする。 */
function wrapText(text: string, used: Set<string>): ReactNode {
  const out: ReactNode[] = [];
  let buffer = "";
  let key = 0;
  let i = 0;

  while (i < text.length) {
    const candidates = BY_FIRST_CHAR.get(text[i]);
    let matched: GlossaryTerm | undefined;
    if (candidates) {
      for (const t of candidates) {
        if (text.startsWith(t.term, i)) {
          matched = t;
          break; // candidates は長い順なので最初の一致が最長。
        }
      }
    }

    if (!matched) {
      buffer += text[i];
      i += 1;
      continue;
    }

    if (used.has(matched.id)) {
      // 使用済み: 素テキストのまま語末まで前進（内側の短い語の誤マッチを防ぐ）。
      buffer += matched.term;
    } else {
      used.add(matched.id);
      if (buffer) {
        out.push(buffer);
        buffer = "";
      }
      out.push(
        <Term key={`g${key}`} id={matched.id}>
          {matched.term}
        </Term>
      );
      key += 1;
    }
    i += matched.term.length;
  }

  if (buffer) out.push(buffer);
  if (out.length === 0) return text;
  if (out.length === 1 && typeof out[0] === "string") return out[0];
  return out;
}
