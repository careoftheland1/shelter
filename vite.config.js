import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const siteUrl = 'https://shelter.onthe.land'
const routePages = [
  { path: 'plans', title: 'A Building Language for Starting Small — Shelter on the Land', description: 'Begin with one useful room, then grow into courtyards or a long house with a simple building language and free shelter plans.', image: '/social/four-walls.jpg' },
  { path: 'shelters', title: 'Free Shelter Plans — Shelter on the Land', description: 'Explore Four Walls, Courtyard and Long House: free plans for small earthen shelters.', image: '/social/four-walls.jpg' },
  { path: 'tools', title: 'Free Shelter Design Tools — Shelter on the Land', description: 'Arrange rooms with Space It, shape a measured shelter with Shape It and visualize the place with See It.' },
  { path: 'packages', title: 'Plans + Ways of Working — Shelter on the Land', description: 'Use a free Shelter plan or bring your own, then choose focused advice, ongoing guidance or a full custom commission.' },
  { path: 'supported', title: 'Supported — Shelter on the Land', description: 'Pre-construction support for siting, adaptations and preparing a shelter project to build.' },
  { path: 'guided', title: 'Guided — Shelter on the Land', description: 'Work with Shelter from pre-construction decisions through an agreed construction period.' },
  { path: 'project', title: 'Tell us about your build — Shelter on the Land', description: 'Share your land, plans and questions with Shelter in a short project brief.' },
  { path: 'free-plans', title: 'Request free plans — Shelter on the Land', description: 'Request the free Shelter plan set for Four Walls, Courtyard or Long House.', image: '/social/four-walls.jpg' },
  { path: 'offgrid', title: 'Off-Grid Systems for Small Shelters — Shelter on the Land', description: 'Free plans and guides for understandable water, heat, cooking, cooling and sanitation systems that work without the grid or pipe.' },
  { path: 'privacy', title: 'Privacy — Shelter on the Land', description: 'How Shelter on the Land handles website analytics, email correspondence and information shared through linked services.' },
  { path: 'shelters/four-walls', title: 'Four Walls — Free 200 sq ft Shelter Plan', description: 'A free plan for a compact 200 sq ft rammed-earth or lavacrete room: a place to live, work, stay or begin building on the land.', image: '/social/four-walls.jpg' },
  { path: 'shelters/courtyard', title: 'Courtyard — Free 600 sq ft Shelter Plan', description: 'A free plan for three small earthen volumes gathered around protected outdoor rooms, with 600 sq ft of adaptable interior shelter.', image: '/social/courtyard-v2.jpg' },
  { path: 'shelters/long-house', title: 'Long House — Free 1,000 sq ft Shelter Plan', description: 'A free plan for an adaptable long house of repeated earthen rooms, open-air courts and passages shaped to a narrow site.', image: '/social/long-house.jpg' },
]

function replaceMeta(html, page) {
  const canonical = `${siteUrl}/${page.path}/`
  const image = page.image ? `${siteUrl}${page.image}` : `${siteUrl}/thumbnail.jpg`
  return html
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${page.description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`)
}

function staticRoutePages() {
  return {
    name: 'static-route-pages',
    enforce: 'post',
    generateBundle(_, bundle) {
      const entry = bundle['index.html']
      if (!entry || entry.type !== 'asset') return
      for (const page of routePages) {
        this.emitFile({ type: 'asset', fileName: `${page.path}/index.html`, source: replaceMeta(entry.source, page) })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  build: { manifest: true },
  optimizeDeps: { exclude: ['three'] },
  plugins: [react(), staticRoutePages()],
})
