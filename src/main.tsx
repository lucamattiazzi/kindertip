import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { LoginWrapper } from './components/LoginWrapper.tsx'
import "./index.css"
import { DiaryComponent } from './pages/Diary.tsx'
import { Home } from './pages/Home.tsx'
import { Trend } from './pages/Trend.tsx'
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
    path: "/trend",
    element: <LoginWrapper component={Trend} />,
  },
  {
    path: "/week",
    element: <LoginWrapper component={Week} />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
