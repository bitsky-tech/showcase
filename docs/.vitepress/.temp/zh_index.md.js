import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Bridgic 工作流展示","description":"","frontmatter":{"layout":"page","title":"Bridgic 工作流展示","aside":false,"editLink":false,"lastUpdated":false},"headers":[],"relativePath":"zh/index.md","filePath":"zh/index.md"}');
const _sfc_main = { name: "zh/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_WorkflowGrid = resolveComponent("WorkflowGrid");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-ecec05c0><div class="wf-hero" data-v-ecec05c0><h1 class="brand-gradient-text" data-v-ecec05c0>工作流教程</h1><p data-v-ecec05c0>在Bridgic Agent的引导下，人人都可以把自己的日常工作流自动化。</p></div>`);
  _push(ssrRenderComponent(_component_WorkflowGrid, null, null, _parent));
  _push(`<div class="wf-hero-foot" data-v-ecec05c0><p data-v-ecec05c0>这些数据同时以接口形式提供，见 <a href="/zh/api" data-v-ecec05c0>接口说明</a>。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ecec05c0"]]);
export {
  __pageData,
  index as default
};
