import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LoginWrapper } from './components/LoginWrapper.tsx'

import { PageWrapper } from "./components/PageWrapper.tsx"
import "./index.css"
import { About } from './pages/About.tsx'
import { DiaryComponent } from './pages/Diary.tsx'
import { Home } from './pages/Home.tsx'
import { Week } from './pages/Week.tsx'
import "./sentry.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper><LoginWrapper component={Home} /></PageWrapper>,
  },
  {
    path: "/diary",
    element: <PageWrapper><LoginWrapper component={DiaryComponent} /></PageWrapper>,
  },
  {
    path: "/week",
    element: <PageWrapper><LoginWrapper component={Week} /></PageWrapper>,
  },
  {
    path: "/about",
    element: <PageWrapper><About /></PageWrapper>,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
