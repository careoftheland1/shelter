import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const routes = [
  ['/', 'App.jsx'],
  ['/plans/', 'OffgridPage.jsx'],
  ['/shelters/', 'SheltersPage.jsx'],
  ['/shelters/four-walls/', 'ShelterPage.jsx'],
  ['/shelters/courtyard/', 'ShelterPage.jsx'],
  ['/shelters/long-house/', 'ShelterPage.jsx'],
  ['/tools/', 'ToolsPage.jsx'],
  ['/packages/', 'PackagesPage.jsx'],
  ['/supported/', 'OfferingPage.jsx', { kind: 'supported' }],
  ['/guided/', 'OfferingPage.jsx', { kind: 'guided' }],
  ['/offgrid/', 'OffgridSystemsPage.jsx'],
  ['/privacy/', 'PrivacyPage.jsx'],
  ['/project/', 'ProjectPage.jsx'],
  ['/free-plans/', 'PlanRequestPage.jsx'],
]

const dist = resolve('dist')
const manifest = JSON.parse(await readFile(resolve(dist, '.vite/manifest.json'), 'utf8'))
const assets = new Map(Object.entries(manifest).filter(([, value]) => value.file).map(([key, value]) => [`/${key}`, `/${value.file}`]))
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })

try {
  for (const [path, moduleName, props = {}] of routes) {
    globalThis.location = { pathname: path, search: '', hash: '' }
    globalThis.window = { location: globalThis.location, matchMedia: () => ({ matches: false }) }
    const { default: Component } = await vite.ssrLoadModule(`/src/${moduleName}`)
    let markup = renderToString(createElement(Component, props))
    markup = markup.replace(/\/src\/assets\/[^"'\s<>]+/g, asset => assets.get(asset) || asset)
    if (markup.includes('/src/assets/')) throw new Error(`Unmapped asset in ${path}`)

    const file = resolve(dist, path.slice(1), 'index.html')
    const html = await readFile(file, 'utf8')
    if (!html.includes('<div id="root"></div>')) throw new Error(`Missing root in ${file}`)
    await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`))
    if (!/<h1\b/i.test(markup) || markup.length < 500) throw new Error(`Missing page content in ${path}`)
    process.stdout.write(`Prerendered ${path}\n`)
  }
} finally {
  await vite.close()
}
