import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"All workflows","description":"","frontmatter":{},"headers":[],"relativePath":"en/workflows/index.md","filePath":"en/workflows/index.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "en/workflows/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_WorkflowGrid = resolveComponent("WorkflowGrid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="all-workflows" tabindex="-1">All workflows <a class="header-anchor" href="#all-workflows" aria-label="Permalink to &quot;All workflows&quot;">​</a></h1><p>Every workflow below is also served as an API. Card order matches the desktop app.</p>`);
  _push(ssrRenderComponent(_component_WorkflowGrid, null, null, _parent));
  _push(`<h2 id="where-this-comes-from" tabindex="-1">Where this comes from <a class="header-anchor" href="#where-this-comes-from" aria-label="Permalink to &quot;Where this comes from&quot;">​</a></h2><p>This page and the home page both read <code>api/workflows.en.json</code> — the same payload an API consumer gets, so the pages and the API cannot disagree. See the <a href="/en/api">API reference</a>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/workflows/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
