import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Competitor price monitor","description":"","frontmatter":{},"headers":[],"relativePath":"en/workflows/price-monitor.md","filePath":"en/workflows/price-monitor.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "en/workflows/price-monitor.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="competitor-price-monitor" tabindex="-1">Competitor price monitor <a class="header-anchor" href="#competitor-price-monitor" aria-label="Permalink to &quot;Competitor price monitor&quot;">​</a></h1><p>Monitor competitor-site prices and send alerts when they change.</p><div class="tip custom-block"><p class="custom-block-title">When to use it</p><p>Tens to a few hundred SKUs on pages with stable markup. Past a thousand SKUs, prefer an official API or a data vendor.</p></div><h2 id="flow" tabindex="-1">Flow <a class="header-anchor" href="#flow" aria-label="Permalink to &quot;Flow&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5BScheduled%20trigger%5D%20--%3E%20B%5BOpen%20each%20product%20page%5D%0A%20%20B%20--%3E%20C%5BExtract%20current%20price%5D%0A%20%20C%20--%3E%20D%5BCompare%20with%20last%20snapshot%5D%0A%20%20D%20--%3E%20E%7BChange%20over%20threshold%3F%7D%0A%20%20E%20--%20yes%20--%3E%20F%5BSend%20alert%5D%0A%20%20E%20--%20no%20--%3E%20G%5BStore%20snapshot%20only%5D%0A%20%20F%20--%3E%20G%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h2><ol><li><strong>Load list</strong> — read the product URLs to watch</li><li><strong>Extract</strong> — read the price, handling both sale and struck-through prices</li><li><strong>Compare</strong> — diff against the previous snapshot and compute the delta</li><li><strong>Alert</strong> — push to Feishu or email once the threshold is crossed</li><li><strong>Record</strong> — always store a snapshot, alert or not, so the trend stays auditable</li></ol><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Option</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>urls</code></td><td>Product page URLs</td><td>required</td></tr><tr><td><code>selector</code></td><td>Price element selector</td><td>auto-detected</td></tr><tr><td><code>threshold</code></td><td>Relative change that triggers an alert</td><td><code>0.05</code></td></tr><tr><td><code>schedule</code></td><td>Check frequency</td><td><code>0 */6 * * *</code></td></tr><tr><td><code>notify</code></td><td>Alert channel</td><td><code>feishu</code></td></tr></tbody></table><h2 id="snapshot" tabindex="-1">Snapshot <a class="header-anchor" href="#snapshot" aria-label="Permalink to &quot;Snapshot&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;url&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;https://example.com/p/1001&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;price&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">299.0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;currency&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;CNY&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;previous&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">329.0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;change&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">-0.0912</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;checked_at&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2026-08-11T06:00:00+08:00&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">Where price extraction breaks</p><p>Sale periods insert extra price elements — list price, final price, price-after-coupon. Auto-detection picks the primary displayed price; during big sales, set <code>selector</code> explicitly and spot-check the results.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/workflows/price-monitor.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const priceMonitor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  priceMonitor as default
};
