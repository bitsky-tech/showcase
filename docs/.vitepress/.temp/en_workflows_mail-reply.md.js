import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Automatic email replies","description":"","frontmatter":{},"headers":[],"relativePath":"en/workflows/mail-reply.md","filePath":"en/workflows/mail-reply.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "en/workflows/mail-reply.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="automatic-email-replies" tabindex="-1">Automatic email replies <a class="header-anchor" href="#automatic-email-replies" aria-label="Permalink to &quot;Automatic email replies&quot;">​</a></h1><p>Automatically classify and reply to common emails based on rules.</p><div class="tip custom-block"><p class="custom-block-title">When to use it</p><p>Inboxes where the same few questions dominate: support enquiries, signup confirmations, requests for materials. <strong>Not</strong> for anything involving commitments, quotes or contracts.</p></div><h2 id="flow" tabindex="-1">Flow <a class="header-anchor" href="#flow" aria-label="Permalink to &quot;Flow&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5BWatch%20for%20new%20mail%5D%20--%3E%20B%5BClassify%20intent%5D%0A%20%20B%20--%3E%20C%7BKnown%20intent%3F%7D%0A%20%20C%20--%20no%20--%3E%20D%5BHand%20to%20a%20human%5D%0A%20%20C%20--%20yes%20--%3E%20E%7BConfident%20enough%3F%7D%0A%20%20E%20--%20no%20--%3E%20F%5BDraft%20for%20review%5D%0A%20%20E%20--%20yes%20--%3E%20G%5BFill%20template%5D%0A%20%20G%20--%3E%20H%5BSend%5D%0A%20%20F%20--%3E%20I%5BNotify%20owner%5D%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h2><ol><li><strong>Watch</strong> — subscribe to new-mail events, or poll on an interval</li><li><strong>Classify</strong> — determine intent with a confidence score</li><li><strong>Route</strong> — high confidence auto-replies; low confidence drafts; unknown goes to a human</li><li><strong>Generate</strong> — fill the matching template</li><li><strong>Record</strong> — log the outcome and the reason for every message</li></ol><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Option</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>intents</code></td><td>Intent-to-template mapping</td><td>required</td></tr><tr><td><code>auto_send_threshold</code></td><td>Confidence required to send automatically</td><td><code>0.9</code></td></tr><tr><td><code>allowlist</code></td><td>Sender domains eligible for auto-reply</td><td>empty (everything drafts)</td></tr><tr><td><code>signature</code></td><td>Reply signature</td><td>optional</td></tr><tr><td><code>quiet_hours</code></td><td>No automatic sending during this window</td><td><code>22:00-08:00</code></td></tr></tbody></table><h2 id="disposition-record" tabindex="-1">Disposition record <a class="header-anchor" href="#disposition-record" aria-label="Permalink to &quot;Disposition record&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;message_id&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&lt;CAF=8a91@mail.example.com&gt;&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;intent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;materials_request&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;confidence&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0.94</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;action&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;auto_sent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;template&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;materials_v3&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;handled_at&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2026-08-11T09:12:44+08:00&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">Conservative by default</p><p><code>allowlist</code> is empty by default, meaning <strong>nothing is sent automatically — everything becomes a draft</strong>. That is deliberate: the cost of one wrong email going out is far higher than the cost of a human confirming once. Open up domains gradually, once the rules have proven stable.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/workflows/mail-reply.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mailReply = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mailReply as default
};
