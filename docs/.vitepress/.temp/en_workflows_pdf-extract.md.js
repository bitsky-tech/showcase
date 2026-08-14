import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"PDF batch extractor","description":"","frontmatter":{},"headers":[],"relativePath":"en/workflows/pdf-extract.md","filePath":"en/workflows/pdf-extract.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "en/workflows/pdf-extract.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pdf-batch-extractor" tabindex="-1">PDF batch extractor <a class="header-anchor" href="#pdf-batch-extractor" aria-label="Permalink to &quot;PDF batch extractor&quot;">​</a></h1><p>Extract structured data from multiple PDFs into Excel.</p><div class="tip custom-block"><p class="custom-block-title">When to use it</p><p>Documents with a <strong>fairly fixed</strong> layout: invoices, customs forms, lab reports, statements. Free-form documents need layout analysis first, which costs far more.</p></div><h2 id="flow" tabindex="-1">Flow <a class="header-anchor" href="#flow" aria-label="Permalink to &quot;Flow&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5BScan%20directory%5D%20--%3E%20B%7BHas%20a%20text%20layer%3F%7D%0A%20%20B%20--%20yes%20--%3E%20C%5BExtract%20text%20directly%5D%0A%20%20B%20--%20no%20--%3E%20D%5BRun%20OCR%5D%0A%20%20C%20--%3E%20E%5BLocate%20fields%20by%20template%5D%0A%20%20D%20--%3E%20E%0A%20%20E%20--%3E%20F%5BValidate%20and%20normalise%5D%0A%20%20F%20--%3E%20G%7BValid%3F%7D%0A%20%20G%20--%20yes%20--%3E%20H%5BWrite%20to%20Excel%5D%0A%20%20G%20--%20no%20--%3E%20I%5BFlag%20for%20review%5D%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h2><ol><li><strong>Scan</strong> — walk the directory, filtering by extension</li><li><strong>Split</strong> — text-layer PDFs are extracted directly; scans go through OCR</li><li><strong>Locate fields</strong> — by template: a keyword anchor plus a relative position</li><li><strong>Validate</strong> — check amount, date and tax-id formats; normalise units</li><li><strong>Write out</strong> — one row per document, invalid rows flagged separately</li></ol><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Option</th><th>Description</th><th>Default</th></tr></thead><tbody><tr><td><code>input_dir</code></td><td>Input directory</td><td>required</td></tr><tr><td><code>template</code></td><td>Field template name</td><td>required</td></tr><tr><td><code>ocr</code></td><td>OCR when no text layer exists</td><td><code>true</code></td></tr><tr><td><code>output</code></td><td>Output Excel path</td><td><code>./out.xlsx</code></td></tr><tr><td><code>on_invalid</code></td><td>On validation failure: <code>flag</code> | <code>skip</code></td><td><code>flag</code></td></tr></tbody></table><h2 id="field-template" tabindex="-1">Field template <a class="header-anchor" href="#field-template" aria-label="Permalink to &quot;Field template&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">fields</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">invoice_no</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    anchor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Invoice No.</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">right</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    pattern</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;^\\d{8,20}$&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">amount</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    anchor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">Total</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">right</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">currency</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">The limits of OCR accuracy</p><p>On scans, digit errors cluster on <code>0/O</code>, <code>1/l</code> and <code>5/S</code>. Always enable format validation for amount fields, and keep a link to the source image on flagged rows — silently recording a wrong number is far more dangerous than failing loudly.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/workflows/pdf-extract.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pdfExtract = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pdfExtract as default
};
