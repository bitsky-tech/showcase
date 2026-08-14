import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const _imports_0 = "/assets/new-task.4xUdBFsQ.webp";
const _imports_1 = "/assets/clarify-1.Cdlueipg.webp";
const _imports_2 = "/assets/clarify-2.CSoB5ufB.webp";
const _imports_3 = "/assets/clarify-3.DF9eK4ha.webp";
const _imports_4 = "/assets/check-condition-1.BfH9qhQ6.webp";
const _imports_5 = "/assets/check-condition-2.XyGAYqD1.webp";
const _imports_6 = "/assets/task-req-1.CEaD2PTW.webp";
const _imports_7 = "/assets/task-req-2.CHnTsfbY.webp";
const _imports_8 = "/assets/login-prompt.DY8Sx9jE.webp";
const _imports_9 = "/assets/login-page.9JhAYdGw.webp";
const _imports_10 = "/assets/login-submit.C3dvUy9N.webp";
const __pageData = JSON.parse('{"title":"【教程】自动采集天猫超市商品信息 (WIP)","description":"","frontmatter":{},"headers":[],"relativePath":"zh/workflows/e-commerce-product-scraper.md","filePath":"zh/workflows/e-commerce-product-scraper.md","lastUpdated":1786691240000}');
const _sfc_main = { name: "zh/workflows/e-commerce-product-scraper.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="【教程】自动采集天猫超市商品信息-wip" tabindex="-1">【教程】自动采集天猫超市商品信息 (WIP) <a class="header-anchor" href="#【教程】自动采集天猫超市商品信息-wip" aria-label="Permalink to &quot;【教程】自动采集天猫超市商品信息 (WIP)&quot;">​</a></h1><p>本教程介绍如何使用Bridgic Agent构建自动化工作流，从天猫超市抓取某一类的商品信息，包括自动化获取商品图片。 本教程详细记录了该工作流的构建过程和运行过程。</p><h2 id="成品展示" tabindex="-1">成品展示 <a class="header-anchor" href="#成品展示" aria-label="Permalink to &quot;成品展示&quot;">​</a></h2><h2 id="工作流构建教程" tabindex="-1">工作流构建教程 <a class="header-anchor" href="#工作流构建教程" aria-label="Permalink to &quot;工作流构建教程&quot;">​</a></h2><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><p>请提前准备好你在天猫超市的账号，用于帮助agent登录。</p><h3 id="构建可复用的工作流" tabindex="-1">构建可复用的工作流 <a class="header-anchor" href="#构建可复用的工作流" aria-label="Permalink to &quot;构建可复用的工作流&quot;">​</a></h3><p>先创建第一个可复用（可重跑）的自动化工作流。</p><p>使用“/build”命令开始工作流创建。简洁、准确地描述需求：</p><p><img${ssrRenderAttr("src", _imports_0)} alt="工作流截图new-task.webp" loading="lazy"></p><p>Bridgic Agent对于需求中不明确的描述会主动和你确认（需求澄清）：</p><p><img${ssrRenderAttr("src", _imports_1)} alt="工作流截图clarify-1.webp" loading="lazy"></p><p><img${ssrRenderAttr("src", _imports_2)} alt="工作流截图clarify-2.webp" loading="lazy"></p><p><img${ssrRenderAttr("src", _imports_3)} alt="工作流截图clarify-3.webp" loading="lazy"></p><p>Bridgic Agent会提示你选择或确认任务的验收标准：</p><p><img${ssrRenderAttr("src", _imports_4)} alt="工作流截图check-condition-1.webp" loading="lazy"></p><p><img${ssrRenderAttr("src", _imports_5)} alt="工作流截图check-condition-2.webp" loading="lazy"></p><p>这里来到了很关键的一步：<strong>任务说明书的确认</strong>！你需要仔细阅读这里的描述，确保工作流的描述符合你的需求。如果你发现不符合需求的地方，可以用鼠标选中相应文字并评论它，然后Bridgic Agent会根据你的评论进行相应的修改。</p><p><img${ssrRenderAttr("src", _imports_6)} alt="工作流截图task-req-1.webp" loading="lazy"></p><p>请关注任务说明书中对于“最终交付物”和“验收标准”的描述。</p><p><img${ssrRenderAttr("src", _imports_7)} alt="工作流截图task-req-2.webp" loading="lazy"></p><p>至此任务说明书已经确认。接下来请遵照Bridgic Agent的引导进行操作。</p><p>Bridgic Agent发现天猫超市需要用户登录，所以弹框告知用户来处理：</p><p><img${ssrRenderAttr("src", _imports_8)} alt="工作流截图login-prompt.webp" loading="lazy"></p><p><strong>先不要点击上面这个弹框</strong>。先在右侧浏览器中完成登录（输入账号名和密码，或者用淘宝App扫描二维码）：</p><p><img${ssrRenderAttr("src", _imports_9)} alt="工作流截图login-page.webp" loading="lazy"></p><p>现在可以回到对话中提交前面的登录提示弹框了！</p><p><img${ssrRenderAttr("src", _imports_10)} alt="工作流截图login-submit.webp" loading="lazy"></p><h3 id="运行工作流" tabindex="-1">运行工作流 <a class="header-anchor" href="#运行工作流" aria-label="Permalink to &quot;运行工作流&quot;">​</a></h3><h3 id="调度工作流" tabindex="-1">调度工作流 <a class="header-anchor" href="#调度工作流" aria-label="Permalink to &quot;调度工作流&quot;">​</a></h3><h2 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h2><p>修改工作流</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/workflows/e-commerce-product-scraper.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const eCommerceProductScraper = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  eCommerceProductScraper as default
};
