import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"PDF 批量提取器","description":"","frontmatter":{},"headers":[],"relativePath":"zh/workflows/pdf-extract.md","filePath":"zh/workflows/pdf-extract.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "zh/workflows/pdf-extract.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="pdf-批量提取器" tabindex="-1">PDF 批量提取器 <a class="header-anchor" href="#pdf-批量提取器" aria-label="Permalink to &quot;PDF 批量提取器&quot;">​</a></h1><p>从多个 PDF 中提取结构化数据到 Excel。</p><div class="tip custom-block"><p class="custom-block-title">适用场景</p><p>版式<strong>相对固定</strong>的批量文档：发票、报关单、体检报告、对账单。版式完全自由的文档需要先做版面分析，成本高得多。</p></div><h2 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5B%E6%89%AB%E6%8F%8F%E7%9B%AE%E5%BD%95%5D%20--%3E%20B%7B%E5%8F%AF%E9%80%89%E6%96%87%E6%9C%AC%E5%B1%82%3F%7D%0A%20%20B%20--%20%E6%9C%89%20--%3E%20C%5B%E7%9B%B4%E6%8E%A5%E6%8A%BD%E5%8F%96%E6%96%87%E6%9C%AC%5D%0A%20%20B%20--%20%E6%97%A0%20--%3E%20D%5BOCR%20%E8%AF%86%E5%88%AB%5D%0A%20%20C%20--%3E%20E%5B%E6%8C%89%E6%A8%A1%E6%9D%BF%E5%AE%9A%E4%BD%8D%E5%AD%97%E6%AE%B5%5D%0A%20%20D%20--%3E%20E%0A%20%20E%20--%3E%20F%5B%E6%A0%A1%E9%AA%8C%E4%B8%8E%E5%BD%92%E4%B8%80%E5%8C%96%5D%0A%20%20F%20--%3E%20G%7B%E6%A0%A1%E9%AA%8C%E9%80%9A%E8%BF%87%3F%7D%0A%20%20G%20--%20%E6%98%AF%20--%3E%20H%5B%E5%86%99%E5%85%A5%20Excel%5D%0A%20%20G%20--%20%E5%90%A6%20--%3E%20I%5B%E6%A0%87%E8%AE%B0%E5%BE%85%E4%BA%BA%E5%B7%A5%E5%A4%8D%E6%A0%B8%5D%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h2><ol><li><strong>扫描</strong> —— 递归遍历目录，按扩展名过滤</li><li><strong>分流</strong> —— 有文本层的直接抽取，扫描件走 OCR</li><li><strong>定位字段</strong> —— 按模板（关键字锚点 + 相对位置）取值</li><li><strong>校验归一</strong> —— 金额、日期、税号格式校验，单位统一</li><li><strong>落表</strong> —— 一行一文档，校验失败的单独标记</li></ol><h2 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>input_dir</code></td><td>输入目录</td><td>必填</td></tr><tr><td><code>template</code></td><td>字段模板名</td><td>必填</td></tr><tr><td><code>ocr</code></td><td>无文本层时是否 OCR</td><td><code>true</code></td></tr><tr><td><code>output</code></td><td>输出 Excel 路径</td><td><code>./out.xlsx</code></td></tr><tr><td><code>on_invalid</code></td><td>校验失败处理：<code>flag</code> | <code>skip</code></td><td><code>flag</code></td></tr></tbody></table><h2 id="字段模板" tabindex="-1">字段模板 <a class="header-anchor" href="#字段模板" aria-label="Permalink to &quot;字段模板&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">fields</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">:</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">invoice_no</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    anchor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">发票号码</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">right</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    pattern</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&#39;^\\d{8,20}$&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">  - </span><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">name</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">amount</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    anchor</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">价税合计</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    offset</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">right</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#22863A", "--shiki-dark": "#85E89D" })}">    type</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">currency</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">OCR 的准确率边界</p><p>扫描件的数字识别错误主要集中在 <code>0/O</code>、<code>1/l</code>、<code>5/S</code>。金额字段务必开启格式校验，并对校验失败的行保留原图链接以便复核 —— 静默取错值比报错危险得多。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/workflows/pdf-extract.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pdfExtract = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  pdfExtract as default
};
