# API

Workflow data is served as static JSON. No authentication, and directly fetchable cross-origin (`access-control-allow-origin: *`).

## Endpoints

| Purpose | URL |
|---|---|
| Endpoint index | `https://showcase.bridgic.ai/api/index.json` |
| Workflows (Chinese) | `https://showcase.bridgic.ai/api/workflows.zh.json` |
| Workflows (English) | `https://showcase.bridgic.ai/api/workflows.en.json` |

Clients **hardcode only `index.json`** and discover the rest from its response:

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

## Fields

Fields map one-to-one onto the desktop app's `MarketCard`, so no transformation is needed.

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Stable identifier, identical across languages |
| `name` | `string` | Card title |
| `desc` | `string` | Card description |
| `domain` | `string` | Category tag |
| `status` | `'verified' \| 'new'` | `verified` shows the verified badge |
| `path` | `string` | Repo-relative path to this site's detail page |

## Full response

```json
{
  "lang": "en",
  "workflows": [
    {
      "id": "xiaohongshu",
      "name": "Xiaohongshu content scraper",
      "desc": "Automatically collect posts and engagement data for selected Xiaohongshu topics",
      "domain": "Browser automation",
      "status": "verified",
      "path": "en/workflows/xiaohongshu"
    }
  ]
}
```

## Contract

- **`path` is repo-relative, not an absolute URL.** Clients join `base + path`, so switching domain or CDN means changing one client constant
- **Array order is meaningful.** It drives card order and matches the desktop app — do not re-sort alphabetically
- **Both languages must share the same `id` set in the same order**; only the copy differs. A check script in the repo enforces this
- **Adding a field is safe** — clients should ignore unknown fields. Renaming or removing one is breaking

## Caching

| Layer | Behaviour |
|---|---|
| Client | Use `cache: 'no-cache'` — revalidate every read, 304 when unchanged |
| Primary CDN | `max-age=600`, not configurable. Edits take up to 10 minutes to appear |
| Mirror | Purged automatically after every publish |

Query-string busting such as `?v=2` **does not work** — the query is stripped from the cache key.

## Fetching

```ts
const index = await fetch('https://showcase.bridgic.ai/api/index.json', {
  cache: 'no-cache',
}).then((r) => {
  // A missing path returns an HTML 404, so check res.ok before parsing
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
})

const lang = navigator.language.startsWith('zh') ? 'zh' : 'en'
const data = await fetch(`https://showcase.bridgic.ai/${index.endpoints.workflows[lang]}`, {
  cache: 'no-cache',
}).then((r) => r.json())

console.log(data.workflows)
```
