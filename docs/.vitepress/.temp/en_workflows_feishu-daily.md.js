import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Feishu daily report generator","description":"","frontmatter":{},"headers":[],"relativePath":"en/workflows/feishu-daily.md","filePath":"en/workflows/feishu-daily.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "en/workflows/feishu-daily.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="feishu-daily-report-generator" tabindex="-1">Feishu daily report generator <a class="header-anchor" href="#feishu-daily-report-generator" aria-label="Permalink to &quot;Feishu daily report generator&quot;">​</a></h1><p>Summarize team Feishu messages into a structured daily report and post it back to the group.</p><div class="tip custom-block"><p class="custom-block-title">When to use it</p><p>Teams spread across several groups where message volume is high but conclusions are scarce. It replaces &quot;someone reads the backlog every evening and writes a summary&quot;.</p></div><h2 id="flow" tabindex="-1">Flow <a class="header-anchor" href="#flow" aria-label="Permalink to &quot;Flow&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20LR%0A%20%20A%5BScheduled%20trigger%5D%20--%3E%20B%5BFetch%20messages%5D%0A%20%20B%20--%3E%20C%5BGroup%20by%20person%20and%20topic%5D%0A%20%20C%20--%3E%20D%5BModel%20summary%5D%0A%20%20D%20--%3E%20E%5BBuild%20structured%20report%5D%0A%20%20E%20--%3E%20F%5BPost%20to%20chat%5D%0A%20%20E%20--%3E%20G%5BArchive%20to%20doc%5D%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h2><ol><li><strong>Trigger</strong> — fires at a fixed time on weekdays</li><li><strong>Fetch</strong> — messages in the window for the configured chats, including thread replies</li><li><strong>Group</strong> — by author and topic, dropping reactions and attachment-only noise</li><li><strong>Summarize</strong> — the model extracts progress, blockers and pending decisions</li><li><strong>Publish</strong> — post the report back and archive a copy</li></ol><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Option</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>chat_ids</code></td><td>Chats to summarize</td><td>required</td></tr><tr><td><code>window</code></td><td>Time window</td><td><code>24h</code></td></tr><tr><td><code>schedule</code></td><td>Trigger time (cron)</td><td><code>0 19 * * 1-5</code></td></tr><tr><td><code>sections</code></td><td>Report sections</td><td><code>Progress,Blockers,Decisions</code></td></tr><tr><td><code>archive_doc</code></td><td>Archive destination</td><td>optional</td></tr></tbody></table><h2 id="output" tabindex="-1">Output <a class="header-anchor" href="#output" aria-label="Permalink to &quot;Output&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;date&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2026-08-11&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;sections&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;Progress&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Integration testing done, entering regression&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Mobile at 10% rollout&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;Blockers&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Payment callback certificate still awaiting approval&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">],</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">    &quot;Decisions&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: [</span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;Whether to freeze scope this week&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">]</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  },</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;message_count&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">342</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;participants&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">11</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">Permissions first</p><p>The bot must already be a member of each target chat <strong>and</strong> hold read-history permission. With send-only permission the fetch returns nothing.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/workflows/feishu-daily.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const feishuDaily = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  feishuDaily as default
};
