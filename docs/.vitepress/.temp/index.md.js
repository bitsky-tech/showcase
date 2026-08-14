import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext, onMounted } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Bridgic Showcase","description":"","frontmatter":{"layout":"page","title":"Bridgic Showcase","aside":false,"editLink":false,"lastUpdated":false},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const __default__ = { name: "index.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      const zh = (navigator.language || "").toLowerCase().startsWith("zh");
      location.replace(zh ? "/zh/" : "/en/");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-e5069a89><div class="lang-gate" data-v-e5069a89><h1 data-v-e5069a89>Bridgic Showcase</h1><p data-v-e5069a89>Redirecting…</p><noscript data-v-e5069a89><p data-v-e5069a89>Choose a language:</p><p data-v-e5069a89><a href="/zh/" data-v-e5069a89>简体中文</a>  ·  <a href="/en/" data-v-e5069a89>English</a></p></noscript></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5069a89"]]);
export {
  __pageData,
  index as default
};
