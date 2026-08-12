# 接口

工作流数据以静态 JSON 提供，无需鉴权，可直接跨域请求（`access-control-allow-origin: *`）。

## 端点

| 用途 | 地址 |
|---|---|
| 端点索引 | `https://showcase.bridgic.ai/api/index.json` |
| 工作流（中文） | `https://showcase.bridgic.ai/api/workflows.zh.json` |
| 工作流（英文） | `https://showcase.bridgic.ai/api/workflows.en.json` |

客户端**只需硬编码 `index.json` 一个地址**，其余从响应里发现：

```json
{
  "endpoints": {
    "workflows": {
      "zh": "api/workflows.zh.json",
      "en": "api/workflows.en.json"
    }
  }
}
```

## 字段

字段与桌面端首页卡片的 `MarketCard` 一一对应，无需转换。

| 字段 | 类型 | 说明 |
|---|---|---|
| `id` | `string` | 稳定标识，两种语言一致 |
| `name` | `string` | 卡片标题 |
| `desc` | `string` | 卡片描述 |
| `domain` | `string` | 分类标签 |
| `status` | `'verified' \| 'new'` | `verified` 显示已验证徽章 |
| `path` | `string` | 仓库相对路径，指向本站详情页 |
| `goal` | `string` | 这个工作流要解决什么 |
| `requirement` | `string` | 运行前需要准备什么 |
| `output` | `string` | 跑完会得到什么 |

后三个字段由桌面端的预览弹窗直接渲染，缺一个就会在弹窗里留一行空白 —— 仓库里的
`check:api` 会拦住这种情况。

## 完整响应

```json
{
  "lang": "zh",
  "workflows": [
    {
      "id": "xiaohongshu",
      "name": "小红书内容爬虫",
      "desc": "自动抓取小红书指定话题的笔记内容和互动数据",
      "domain": "浏览器自动化",
      "status": "verified",
      "path": "zh/workflows/xiaohongshu",
      "goal": "采集指定话题下的笔记与互动数据，用于选题调研与爆款归因",
      "requirement": "已保存的小红书登录态；一个或多个话题关键词",
      "output": "含正文、图片数与点赞/收藏/评论数的结构化表格"
    }
  ]
}
```

## 约定

- **`path` 是仓库相对路径，不是完整 URL。** 客户端拼 `base + path` —— 这样换域名或换 CDN 只改客户端一个常量
- **数组顺序有意义。** 它决定卡片展示顺序，与桌面端一致，不要按字母重排
- **两种语言的 `id` 集合与顺序必须一致**，只有文案不同。仓库里有校验脚本保证这一点
- **加字段是安全的**，客户端应忽略未知字段；改名或删字段才是破坏性变更

## 缓存

| 层 | 行为 |
|---|---|
| 客户端 | 建议 `cache: 'no-cache'`，每次向源校验，未变则 304 |
| 主源 CDN | `max-age=600`，无法配置。改动最多 10 分钟可见 |
| 镜像 | 每次发布后自动清缓存 |

`?v=2` 这类 query 破缓存**无效** —— query 会被剥离出 cache key。

## 取数示例

```ts
const index = await fetch('https://showcase.bridgic.ai/api/index.json', {
  cache: 'no-cache',
}).then((r) => {
  // 路径不存在时返回的是 HTML 404，必须先查 res.ok
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
})

const lang = navigator.language.startsWith('zh') ? 'zh' : 'en'
const data = await fetch(`https://showcase.bridgic.ai/${index.endpoints.workflows[lang]}`, {
  cache: 'no-cache',
}).then((r) => r.json())

console.log(data.workflows)
```
