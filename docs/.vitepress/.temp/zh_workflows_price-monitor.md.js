import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSuspense, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"竞品价格监控","description":"","frontmatter":{},"headers":[],"relativePath":"zh/workflows/price-monitor.md","filePath":"zh/workflows/price-monitor.md","lastUpdated":1786518511000}');
const _sfc_main = { name: "zh/workflows/price-monitor.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Mermaid = resolveComponent("Mermaid");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="竞品价格监控" tabindex="-1">竞品价格监控 <a class="header-anchor" href="#竞品价格监控" aria-label="Permalink to &quot;竞品价格监控&quot;">​</a></h1><p>定时监控竞品网站价格变动并发送告警。</p><div class="tip custom-block"><p class="custom-block-title">适用场景</p><p>SKU 数量在几十到几百、竞品页面结构稳定的场景。上千 SKU 建议改用官方接口或数据服务。</p></div><h2 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h2>`);
  ssrRenderSuspense(_push, {
    default: () => {
      _push(ssrRenderComponent(_component_Mermaid, {
        id: "mermaid-14",
        class: "mermaid",
        graph: "graph%20TD%0A%20%20A%5B%E5%AE%9A%E6%97%B6%E8%A7%A6%E5%8F%91%5D%20--%3E%20B%5B%E9%80%90%E4%B8%AA%E6%89%93%E5%BC%80%E5%95%86%E5%93%81%E9%A1%B5%5D%0A%20%20B%20--%3E%20C%5B%E6%8F%90%E5%8F%96%E5%BD%93%E5%89%8D%E4%BB%B7%E6%A0%BC%5D%0A%20%20C%20--%3E%20D%5B%E4%B8%8E%E4%B8%8A%E6%AC%A1%E5%BF%AB%E7%85%A7%E6%AF%94%E5%AF%B9%5D%0A%20%20D%20--%3E%20E%7B%E5%8F%98%E5%8A%A8%E8%B6%85%E8%BF%87%E9%98%88%E5%80%BC%3F%7D%0A%20%20E%20--%20%E6%98%AF%20--%3E%20F%5B%E5%8F%91%E9%80%81%E5%91%8A%E8%AD%A6%5D%0A%20%20E%20--%20%E5%90%A6%20--%3E%20G%5B%E4%BB%85%E5%86%99%E5%85%A5%E5%BF%AB%E7%85%A7%5D%0A%20%20F%20--%3E%20G%0A"
      }, null, _parent));
    },
    fallback: () => {
      _push(` Loading... `);
    },
    _: 1
  });
  _push(`<h2 id="步骤" tabindex="-1">步骤 <a class="header-anchor" href="#步骤" aria-label="Permalink to &quot;步骤&quot;">​</a></h2><ol><li><strong>加载清单</strong> —— 读取待监控的商品 URL 列表</li><li><strong>提取价格</strong> —— 按选择器取价，兼容促销价与划线价</li><li><strong>比对</strong> —— 与上一次快照对比，计算变动幅度</li><li><strong>告警</strong> —— 超过阈值时推送到飞书或邮件</li><li><strong>留痕</strong> —— 无论是否告警都写入快照，便于回溯趋势</li></ol><h2 id="配置项" tabindex="-1">配置项 <a class="header-anchor" href="#配置项" aria-label="Permalink to &quot;配置项&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td><code>urls</code></td><td>商品页地址列表</td><td>必填</td></tr><tr><td><code>selector</code></td><td>价格元素选择器</td><td>自动探测</td></tr><tr><td><code>threshold</code></td><td>触发告警的变动比例</td><td><code>0.05</code></td></tr><tr><td><code>schedule</code></td><td>检查频率</td><td><code>0 */6 * * *</code></td></tr><tr><td><code>notify</code></td><td>告警渠道</td><td><code>feishu</code></td></tr></tbody></table><h2 id="快照格式" tabindex="-1">快照格式 <a class="header-anchor" href="#快照格式" aria-label="Permalink to &quot;快照格式&quot;">​</a></h2><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">{</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;url&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;https://example.com/p/1001&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;price&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">299.0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;currency&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;CNY&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;previous&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">329.0</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;change&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">-0.0912</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">  &quot;checked_at&quot;</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "--shiki-light": "#032F62", "--shiki-dark": "#9ECBFF" })}">&quot;2026-08-11T06:00:00+08:00&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="warning custom-block"><p class="custom-block-title">价格提取的脆弱点</p><p>促销期页面常会插入额外的价格元素（划线价、到手价、券后价）。自动探测取的是「主展示价」，大促期间建议显式指定 <code>selector</code> 并抽查核对。</p></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/workflows/price-monitor.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const priceMonitor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  priceMonitor as default
};
