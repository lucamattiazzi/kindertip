import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LoginWrapper } from './components/LoginWrapper.tsx'

import "./index.css"
import { DiaryComponent } from './pages/Diary.tsx'
import { Home } from './pages/Home.tsx'
import { Week } from './pages/Week.tsx'
import "./sentry.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginWrapper component={Home} />,
  },
  {
    path: "/diary",
    element: <LoginWrapper component={DiaryComponent} />,
  },
  {
    path: "/week",
    element: <LoginWrapper component={Week} />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
