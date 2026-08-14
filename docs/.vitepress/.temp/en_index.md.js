import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Bridgic Showcase","description":"","frontmatter":{"layout":"page","title":"Bridgic Showcase","aside":false,"editLink":false,"lastUpdated":false},"headers":[],"relativePath":"en/index.md","filePath":"en/index.md"}');
const _sfc_main = { name: "en/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_WorkflowGrid = resolveComponent("WorkflowGrid");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-60dbc2d2><div class="wf-hero" data-v-60dbc2d2><h1 class="brand-gradient-text" data-v-60dbc2d2>Workflow Tutorials</h1><p data-v-60dbc2d2>Hand repetitive work to an agent. Every workflow here can be imported straight into the Bridgic desktop app.</p></div>`);
  _push(ssrRenderComponent(_component_WorkflowGrid, null, null, _parent));
  _push(`<div class="wf-hero-foot" data-v-60dbc2d2><p data-v-60dbc2d2>The same data is served as an API — see the <a href="/en/api" data-v-60dbc2d2>API reference</a>.</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-60dbc2d2"]]);
export {
  __pageData,
  index as default
};
