import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './funnel.css'

async function start() {
  const path = window.location.pathname
  let moduleName = 'App'
  let props = {}
  if (path.startsWith('/shelters/') && path !== '/shelters/') moduleName = 'ShelterPage'
  else if (path.startsWith('/shelters')) moduleName = 'SheltersPage'
  else if (path.startsWith('/plans')) moduleName = 'OffgridPage'
  else if (path.startsWith('/tools')) moduleName = 'ToolsPage'
  else if (path.startsWith('/packages')) moduleName = 'PackagesPage'
  else if (path.startsWith('/supported')) { moduleName = 'OfferingPage'; props = { kind: 'supported' } }
  else if (path.startsWith('/guided')) { moduleName = 'OfferingPage'; props = { kind: 'guided' } }
  else if (path.startsWith('/offgrid')) moduleName = 'OffgridSystemsPage'
  else if (path.startsWith('/privacy')) moduleName = 'PrivacyPage'
  else if (path.startsWith('/project')) moduleName = 'ProjectPage'
  else if (path.startsWith('/free-plans')) moduleName = 'PlanRequestPage'

  const pages = {
    App: () => import('./App.jsx'),
    ShelterPage: () => import('./ShelterPage.jsx'),
    SheltersPage: () => import('./SheltersPage.jsx'),
    OffgridPage: () => import('./OffgridPage.jsx'),
    ToolsPage: () => import('./ToolsPage.jsx'),
    PackagesPage: () => import('./PackagesPage.jsx'),
    OfferingPage: () => import('./OfferingPage.jsx'),
    OffgridSystemsPage: () => import('./OffgridSystemsPage.jsx'),
    PrivacyPage: () => import('./PrivacyPage.jsx'),
    ProjectPage: () => import('./ProjectPage.jsx'),
    PlanRequestPage: () => import('./PlanRequestPage.jsx'),
  }
  const { default: Component } = await pages[moduleName]()
  const root = document.getElementById('root')
  const app = <StrictMode><Component {...props}/></StrictMode>
  if (root.hasChildNodes() && !(window.location.search && ['ProjectPage', 'PlanRequestPage'].includes(moduleName))) hydrateRoot(root, app)
  else createRoot(root).render(app)
}

start()
