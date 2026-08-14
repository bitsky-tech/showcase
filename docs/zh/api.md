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

`path` 指向的页面就是桌面端预览弹窗里嵌的那一页，所以详细说明写在页面正文里，
不再单独作为字段下发。

## 完整响应

```json
{
  "lang": "zh",
  "workflows": [
    {
      "id": "priceMonitor",
      "name": "竞品价格监控",
      "desc": "定时监控竞品网站价格变动并发送告警",
      "domain": "浏览器自动化",
      "status": "verified",
      "path": "zh/workflows/price-monitor"
    }
  ]
}
```

## 约定

- **`path` 是仓库相对路径，不是完整 URL。** 客户端拼 `base + path` —— 这样换域名或换 CDN 只改客户端一个常量
- **数组顺序有意义。** 它决定卡片展示顺序，与桌面端一致，不要按字母重排
- **两种语言各自独立。** 工作流先用一种语言发布、之后再翻译是常态，所以两边的条目集合与顺序都可能不同。同一个 `id` 在两边都存在时，`status` 保证一致
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
