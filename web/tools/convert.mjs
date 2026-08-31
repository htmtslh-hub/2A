// Chuyển Agentic.dc.html (Claude Design canvas) -> TSX + CSS cho Next.js.
// Dùng parse5 dựng cây DOM thật, không regex trên HTML.
import { parseFragment } from 'parse5';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, '../../_src/Agentic.dc.html');
const OUT_DIR = resolve(HERE, '../src/generated');

const raw = readFileSync(SRC, 'utf8');

/* ---------- 1. tách <style> trong helmet ---------- */
const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('không tìm thấy khối <style>');
const designCss = styleMatch[1];

/* ---------- 2. tách markup giữa </helmet> và </x-dc> ---------- */
const bodyStart = raw.indexOf('</helmet>') + '</helmet>'.length;
const bodyEnd = raw.indexOf('</x-dc>');
if (bodyEnd < 0) throw new Error('không tìm thấy </x-dc>');
let markupHtml = raw.slice(bodyStart, bodyEnd);

/* ---------- 2b. nối nút mua vào thanh toán thật ----------
   Trong bản thiết kế, các nút mua chỉ chuyển tab (goPricing / goCta) vì chưa có
   backend. Ở đây thay bằng handler thật. Mỗi mục phải khớp đúng một lần —
   không khớp thì dừng, để không âm thầm mất nút mua khi thiết kế đổi. */
const REWIRE = [
  {
    what: 'nút "Mua giao diện này" ở trang chi tiết',
    // <button onClick="{{ goPricing }}" …>{{ t.dBuy }}
    find: /(<button onClick=")\{\{ goPricing \}\}("[^>]*>\s*\{\{ t\.dBuy \}\})/,
    replace: '$1{{ buyDetail }}$2',
  },
  {
    what: 'nút CTA của từng gói trong bảng giá',
    // <button onClick="{{ goCta }}" …>{{ tr.cta }}
    find: /(<button onClick=")\{\{ goCta \}\}("[^>]*>\s*\{\{ tr\.cta \}\})/,
    replace: '$1{{ tr.onCta }}$2',
  },
];

for (const r of REWIRE) {
  const before = markupHtml;
  markupHtml = markupHtml.replace(r.find, r.replace);
  if (markupHtml === before) {
    throw new Error(`convert: không tìm thấy ${r.what} để nối vào thanh toán`);
  }
}

/* ---------- 3. tiện ích ---------- */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
// thuộc tính boolean: JSX cần dạng trần (bare) mới thành true
const BOOL_ATTRS = new Set(['muted', 'loop', 'playsinline', 'controls', 'autoplay', 'disabled', 'checked', 'readonly', 'required', 'hidden', 'selected', 'multiple', 'novalidate', 'open', 'reversed', 'async', 'defer']);

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function jsxAttrName(name) {
  const MAP = {
    class: 'className',
    for: 'htmlFor',
    playsinline: 'playsInline',
    readonly: 'readOnly',
    maxlength: 'maxLength',
    autocomplete: 'autoComplete',
    tabindex: 'tabIndex',
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    srcset: 'srcSet',
    crossorigin: 'crossOrigin',
    novalidate: 'noValidate',
  };
  if (MAP[name]) return MAP[name];
  if (name.startsWith('data-') || name.startsWith('aria-')) return name;
  if (name.includes(':')) return name;
  if (name.includes('-')) return camel(name); // stroke-width -> strokeWidth
  return name;
}

/* -- biểu thức {{ ... }} : thêm tiền tố v. cho biến ngoài phạm vi vòng lặp -- */
const LITERALS = new Set(['true', 'false', 'null', 'undefined']);
function expr(code, scope) {
  const src = code.trim();
  const m = src.match(/^([A-Za-z_$][\w$]*)/);
  if (!m) return src;
  const root = m[1];
  if (LITERALS.has(root) || scope.has(root)) return src;
  return 'vm.' + src;
}

const hasTpl = (s) => /\{\{[\s\S]*?\}\}/.test(s);

// chuỗi chứa {{ }} -> biểu thức JS. Trả { single } nếu toàn chuỗi là một biểu thức.
function interpolate(str, scope) {
  const parts = str.split(/\{\{([\s\S]*?)\}\}/);
  if (parts.length === 1) return JSON.stringify(str);
  if (parts.length === 3 && parts[0] === '' && parts[2] === '') {
    return { single: expr(parts[1], scope) };
  }
  let out = '`';
  parts.forEach((p, i) => {
    if (i % 2 === 0) out += p.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    else out += '${' + expr(p, scope) + '}';
  });
  return out + '`';
}

/* -- CSS inline -> object React -- */
function splitDecls(css) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of css) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

function cssPropKey(prop) {
  if (prop.startsWith('--')) return JSON.stringify(prop);
  const up = (s) => s.replace(/^./, (c) => c.toUpperCase());
  if (prop.startsWith('-webkit-')) return 'Webkit' + up(camel(prop.slice(8)));
  if (prop.startsWith('-moz-')) return 'Moz' + up(camel(prop.slice(5)));
  if (prop.startsWith('-ms-')) return 'ms' + camel(prop.slice(4));
  return camel(prop);
}

function styleProps(css, scope) {
  const props = [];
  for (const decl of splitDecls(css)) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) continue;
    let value;
    if (hasTpl(val)) {
      const it = interpolate(val, scope);
      value = typeof it === 'object' ? it.single : it;
    } else {
      value = JSON.stringify(val);
    }
    props.push(cssPropKey(prop) + ': ' + value);
  }
  return props;
}

/* -- style-hover / style-focus -> lớp CSS.
   Cần !important vì style nền là inline, mà inline thắng mọi lớp thường. -- */
const hoverRules = [];
const hoverSeen = new Map();
// Trả { cls, vars }. `vars` là các khai báo cần đặt vào inline style của phần tử,
// dùng khi giá trị hover phụ thuộc biểu thức {{ }} (CSS tĩnh không biểu diễn được).
function stateClass(css, pseudo, prefix, scope) {
  // Chỉ gộp lại khi giá trị hoàn toàn tĩnh — có {{ }} thì biểu thức phụ thuộc
  // phạm vi biến của phần tử, không được dùng chung.
  const memo = hasTpl(css) ? null : pseudo + '|' + css;
  if (memo && hoverSeen.has(memo)) return hoverSeen.get(memo);

  const cls = prefix + hoverRules.length;
  const decls = [];
  const vars = [];

  for (const d of splitDecls(css)) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    const prop = d.slice(0, i).trim();
    const val = d.slice(i + 1).trim();
    if (!prop) continue;

    if (hasTpl(val)) {
      // giá trị động -> đi qua biến CSS đặt trên chính phần tử
      const varName = '--' + cls + '-' + prop.replace(/[^a-z0-9]+/gi, '-');
      const it = interpolate(val, scope);
      vars.push(JSON.stringify(varName) + ': ' + (typeof it === 'object' ? it.single : it));
      decls.push(prop + ': var(' + varName + ') !important;');
    } else {
      decls.push(prop + ': ' + val + ' !important;');
    }
  }

  if (!decls.length) return null;
  const res = { cls, vars };
  if (memo) hoverSeen.set(memo, res);
  hoverRules.push('.' + cls + pseudo + '{ ' + decls.join(' ') + ' }');
  return res;
}

/* -- văn bản -> JSX -- */
function textToJsx(text, scope) {
  const parts = text.split(/\{\{([\s\S]*?)\}\}/);
  let out = '';
  parts.forEach((p, i) => {
    if (i % 2 === 0) {
      if (!p) return;
      out += p.replace(/[{}]/g, (c) => '{"' + c + '"}');
    } else {
      out += '{' + expr(p, scope) + '}';
    }
  });
  return out;
}

/* ---------- 4. duyệt cây, sinh TSX ---------- */
const attrsOf = (node) => Object.fromEntries((node.attrs || []).map((a) => [a.name, a.value]));

function emit(node, scope, indent) {
  const pad = '  '.repeat(indent);

  if (node.nodeName === '#text') {
    if (!node.value.trim()) return '';
    const jsx = textToJsx(node.value.replace(/\s+/g, ' '), scope);
    return jsx ? pad + jsx + '\n' : '';
  }
  if (node.nodeName === '#comment') {
    return pad + '{/*' + String(node.data).replace(/\*\//g, '* /') + '*/}\n';
  }
  if (node.nodeName === '#documentType') return '';

  const tag = node.nodeName;
  const a = attrsOf(node);
  const kids = node.childNodes || [];
  const realKids = kids.filter((k) => k.nodeName !== '#text' || k.value.trim());

  /* --- sc-for --- */
  if (tag === 'sc-for') {
    const it = interpolate(a.list || '', scope);
    const listExpr = typeof it === 'object' ? it.single : it;
    const asName = a.as || 'item';
    const idxName = asName + '_i';
    const inner = new Set([...scope, asName, idxName]);
    let body;
    if (realKids.length === 1) {
      body = emitWithKey(realKids[0], inner, indent + 3, idxName);
    } else {
      const sub = realKids.map((c) => emit(c, inner, indent + 4)).join('');
      body =
        '  '.repeat(indent + 3) + '<React.Fragment key={' + idxName + '}>\n' +
        sub +
        '  '.repeat(indent + 3) + '</React.Fragment>\n';
    }
    return (
      pad + '{(' + listExpr + ' ?? []).map((' + asName + ': any, ' + idxName + ': number) => (\n' +
      body +
      '  '.repeat(indent + 1) + '))}\n'
    );
  }

  /* --- sc-if --- */
  if (tag === 'sc-if') {
    const it = interpolate(a.value || '', scope);
    const condExpr = typeof it === 'object' ? it.single : it;
    const sub = kids.map((k) => emit(k, scope, indent + 2)).join('');
    return (
      pad + '{(' + condExpr + ') ? (\n' +
      '  '.repeat(indent + 1) + '<>\n' + sub + '  '.repeat(indent + 1) + '</>\n' +
      pad + ') : null}\n'
    );
  }

  /* --- thẻ thường --- */
  const isSlot = tag === 'image-slot';
  const name = isSlot ? 'ImageSlot' : tag;
  const attrParts = [];
  let className = null;
  let styleCss = null;      // nội dung thuộc tính style gốc
  const styleVars = [];     // biến CSS phục vụ hover/focus động

  for (const [rawName, rawVal] of Object.entries(a)) {
    if (rawName.startsWith('hint-')) continue;
    if (rawName === 'data-dc-script') continue;

    if (rawName === 'style-hover' || rawName === 'style-focus') {
      const isHover = rawName === 'style-hover';
      const res = stateClass(rawVal, isHover ? ':hover' : ':focus', isHover ? 'hv' : 'fc', scope);
      if (res) {
        className = className ? className + ' ' + res.cls : res.cls;
        styleVars.push(...res.vars);
      }
      continue;
    }
    if (rawName === 'style') {
      styleCss = rawVal;
      continue;
    }
    if (rawName === 'class') {
      className = className ? rawVal + ' ' + className : rawVal;
      continue;
    }
    if (rawName === 'ref') {
      const it = interpolate(rawVal, scope);
      attrParts.push('ref={' + (typeof it === 'object' ? it.single : it) + '}');
      continue;
    }

    // sự kiện — parse5 hạ chữ thường: onclick, onmouseenter …
    if (/^on[a-z]/i.test(rawName)) {
      const EVT = {
        onclick: 'onClick',
        onmouseenter: 'onMouseEnter',
        onmouseleave: 'onMouseLeave',
        onsubmit: 'onSubmit',
        onchange: 'onChange',
        oninput: 'onInput',
        onfocus: 'onFocus',
        onblur: 'onBlur',
        onkeydown: 'onKeyDown',
      };
      const evt = EVT[rawName.toLowerCase()];
      if (evt) {
        const it = interpolate(rawVal, scope);
        attrParts.push(evt + '={' + (typeof it === 'object' ? it.single : it) + '}');
        continue;
      }
    }

    const jsxName = jsxAttrName(rawName);

    // thuộc tính boolean: HTML cho phép viết `required`, `required=""` hoặc
    // `required="required"` — JSX chỉ hiểu dạng trần là true.
    if (
      BOOL_ATTRS.has(rawName) &&
      (rawVal === '' || rawVal.toLowerCase() === rawName || rawVal.toLowerCase() === 'true')
    ) {
      attrParts.push(jsxName);
      continue;
    }

    if (hasTpl(rawVal)) {
      const it = interpolate(rawVal, scope);
      attrParts.push(jsxName + '={' + (typeof it === 'object' ? it.single : it) + '}');
    } else {
      attrParts.push(jsxName + '=' + JSON.stringify(rawVal));
    }
  }

  const allStyle = [...(styleCss ? styleProps(styleCss, scope) : []), ...styleVars];
  if (allStyle.length) {
    // TS không cho biến CSS (--x) trong CSSProperties, dù React chạy được -> ép kiểu.
    const needsCast = allStyle.some((d) => d.startsWith('"--'));
    attrParts.unshift(
      'style={{ ' + allStyle.join(', ') + ' }' + (needsCast ? ' as React.CSSProperties}' : '}')
    );
  }
  if (className) attrParts.unshift('className=' + JSON.stringify(className));

  const attrStr = attrParts.length ? ' ' + attrParts.join(' ') : '';

  if (VOID.has(tag) || isSlot || realKids.length === 0) {
    return pad + '<' + name + attrStr + ' />\n';
  }
  const sub = kids.map((k) => emit(k, scope, indent + 1)).join('');
  return pad + '<' + name + attrStr + '>\n' + sub + pad + '</' + name + '>\n';
}

// chèn key= vào phần tử gốc bên trong sc-for
function emitWithKey(node, scope, indent, idxName) {
  const out = emit(node, scope, indent);
  const lt = out.indexOf('<');
  if (lt < 0) return out;
  const sp = out.indexOf(' ', lt);
  const gt = out.indexOf('>', lt);
  const at = sp > 0 && sp < gt ? sp : gt;
  return out.slice(0, at) + ' key={' + idxName + '}' + out.slice(at);
}

/* ---------- 5. chạy ---------- */
const frag = parseFragment(markupHtml);
const jsxBody = frag.childNodes.map((n) => emit(n, new Set(), 3)).join('');

const tsx =
  '/* TỰ ĐỘNG SINH từ _src/Agentic.dc.html — chạy `npm run convert` để tạo lại.\n' +
  '   Không sửa tay file này. */\n' +
  '/* eslint-disable @typescript-eslint/no-explicit-any -- biến vòng lặp của sc-for không suy được kiểu */\n' +
  '/* eslint-disable react-hooks/refs -- vm là object thường, quy tắc nhận nhầm mọi truy cập thuộc tính là ref */\n' +
  "'use client';\n" +
  "import React from 'react';\n" +
  "import ImageSlot from '@/components/ImageSlot';\n" +
  "import type { View } from '@/lib/view';\n" +
  '\n' +
  'export default function AgenticMarkup({ vm }: { vm: View }) {\n' +
  '  return (\n' +
  '    <>\n' +
  jsxBody +
  '    </>\n' +
  '  );\n' +
  '}\n';

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, 'markup.tsx'), tsx, 'utf8');
writeFileSync(resolve(OUT_DIR, 'design.css'), designCss.trim() + '\n', 'utf8');
writeFileSync(
  resolve(OUT_DIR, 'hover.css'),
  '/* TỰ ĐỘNG SINH từ thuộc tính style-hover */\n' + hoverRules.join('\n') + '\n',
  'utf8'
);

console.log('markup.tsx :', tsx.split('\n').length, 'dòng');
console.log('design.css :', designCss.split('\n').length, 'dòng');
console.log('hover.css  :', hoverRules.length, 'quy tắc');
