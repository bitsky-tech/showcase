import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"邮件自动回复","description":"","frontmatter":{},"headers":[],"relativePath":"zh/workflows/mail-reply.md","filePath":"zh/workflows/mail-reply.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "zh/workflows/mail-reply.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="邮件自动回复" tabindex="-1">邮件自动回复 <a class="header-anchor" href="#邮件自动回复" aria-label="Permalink to &quot;邮件自动回复&quot;">​</a></h1><p>根据规则自动分类和回复常见邮件。</p><div class="tip custom-block"><p class="custom-block-title">适用场景</p><p>重复问法高度集中的收件箱：售后咨询、报名确认、资料索取。<strong>不适合</strong>需要承诺、报价、涉及合同的往来。</p></div><h2 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5B%E7%9B%91%E5%90%AC%E6%96%B0%E9%82%AE%E4%BB%B6%5D%20--%3E%20B%5B%E6%84%8F%E5%9B%BE%E5%88%86%E7%B1%BB%5D%0A%20%20B%20--%3E%20C%7B%E5%91%BD%E4%B8%AD%E5%B7%B2%E7%9F%A5%E6%84%8F%E5%9B%BE%3F%7D%0A%20%20C%20--%20%E5%90%A6%20--%3E%20D%5B%E8%BD%AC%E4%BA%BA%E5%B7%A5%5D%0A%20%20C%20--%20%E6%98%AF%20--%3E%20E%7B%E7%BD%AE%E4%BF%A1%E5%BA%A6%E8%B6%B3%E5%A4%9F%3F%7D%0A%20%20E%20--%20%E5%90%A6%20--%3E%20F%5B%E7%94%9F%E6%88%90%E8%8D%89%E7%A8%BF%E5%BE%85%E7%A1%AE%E8%AE%A4%5D%0A%20%20E%20--%20%E6%98%AF%20--%3E%20G%5B%E5%A5%97%E7%94%A8%E6%A8%A1%E6%9D%BF%E7%94%9F%E6%88%90%E5%9B%9E%E5%A4%8D%5D%0A%20%20G%20--%3E%20H%5B%E5%8F%91%E9%80%81%5D%0A%20%20F%20--%3E%20I%5B%E9%80%9A%E7%9F%A5%E8%B4%9F%E8%B4%A3%E4%BA%BA%5D%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h2><ol><li><strong>监听</strong> —— 订阅新邮件事件，或按间隔轮询</li><li><strong>分类</strong> —— 判定意图并给出置信度</li><li><strong>分流</strong> —— 高置信度自动回复；低置信度生成草稿；未命中转人工</li><li><strong>生成</strong> —— 套用模板并填充变量</li><li><strong>留痕</strong> —— 记录每封邮件的处置结果与依据</li></ol><h2 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>intents</code></td><td>意图与模板映射</td><td>必填</td></tr><tr><td><code>auto_send_threshold</code></td><td>自动发送的置信度门槛</td><td><code>0.9</code></td></tr><tr><td><code>allowlist</code></td><td>允许自动回复的发件域</td><td>空（全部走草稿）</td></tr><tr><td><code>signature</code></td><td>回复签名</td><td>可选</td></tr><tr><td><code>quiet_hours</code></td><td>静默时段不自动发送</td><td><code>22:00-08:00</code></td></tr></tbody></table><h2 id="处置记录" tabindex="-1">处置记录 <a class="header-anchor" href="#处置记录" aria-label="Permalink to &quot;处置记录&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;message_id&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;&lt;CAF=8a91@mail.example.com&gt;&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;intent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;资料索取&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;confidence&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">0.94</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;action&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;auto_sent&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;template&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;materials_v3&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;handled_at&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2026-08-11T09:12:44+08:00&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">默认保守</p><p><code>allowlist</code> 默认为空，也就是<strong>默认只生成草稿不自动发送</strong>。这是刻意的：自动发错一封邮件的代价，远高于人工确认一次的成本。确认规则稳定后再逐步放开域名。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/workflows/mail-reply.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mailReply = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mailReply as default
};
