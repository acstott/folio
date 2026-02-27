# folio

A TypeScript monorepo with a React + Webpack dev server app (`apps/web`) and an API proxy setup for local development

## Requirements

- Node.js 20+ (recommended)
- npm 9+ (workspaces)
- Docker + docker compose

## Repo structure

```
folio/
├─ apps/
│  └─ web/
│     ├─ public/
│     │  └─ index.html
│     ├─ src/
│     │  └─ index.tsx
│     ├─ tsconfig.json
│     ├─ webpack.config.ts
│     └─ package.json
├─ package.json
├─ package-lock.json (optional)
└─ README.md
```

## Screenshot

![Card Layout](./assets/card-layout.png)

> Notes:
> - `apps/web/webpack.config.ts` is authored as an **ES module** (uses `import ...`), so `require()` is not used
> - `webpack.config.ts` narrows `mode` to valid webpack values (`development | production | none`)

## Getting started

Install dependencies from the repo root:

```bash
npm install
```

## Running the web app (dev)

From the repo root:

```bash
npm run web:dev
```

This runs the `apps/web` workspace dev server (Webpack Dev Server) on:

- http://localhost:3000

### API proxy

The dev server proxies API requests to the backend:

- Requests starting with `/api` → `http://localhost:4000`

This is configured in `apps/web/webpack.config.ts` under `devServer.proxy`

## Useful scripts

From the repo root:

```bash
npm run web:dev
```

Common additions you may want:

- `npm -w web run build`
- `npm -w web run lint`
- `npm -w web run test`

## Webpack config highlights (apps/web)

- **Entry:** `./src/index.tsx`
- **Output:** `apps/web/dist/bundle.js`
- **Dev server:** port **3000**, HMR enabled, SPA routing (`historyApiFallback: true`)
- **TypeScript:** `ts-loader` using `apps/web/tsconfig.json`
- **HTML:** `html-webpack-plugin` using `./public/index.html`


---

## License

MIT
