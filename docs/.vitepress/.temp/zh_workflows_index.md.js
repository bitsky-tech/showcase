import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"全部工作流","description":"","frontmatter":{},"headers":[],"relativePath":"zh/workflows/index.md","filePath":"zh/workflows/index.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "zh/workflows/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_WorkflowGrid = resolveComponent("WorkflowGrid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="全部工作流" tabindex="-1">全部工作流 <a class="header-anchor" href="#全部工作流" aria-label="Permalink to &quot;全部工作流&quot;">​</a></h1><p>以下工作流同时以接口形式提供，卡片顺序与桌面端一致。</p>`);
  _push(ssrRenderComponent(_component_WorkflowGrid, null, null, _parent));
  _push(`<h2 id="数据来源" tabindex="-1">数据来源 <a class="header-anchor" href="#数据来源" aria-label="Permalink to &quot;数据来源&quot;">​</a></h2><p>本页与首页的卡片都直接读取 <code>api/workflows.zh.json</code>，和接口消费方是同一份数据 —— 页面和接口不会出现「说法不一致」。详见 <a href="/zh/api">接口说明</a>。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/workflows/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
