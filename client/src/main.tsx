import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { RouteObject } from "react-router-dom"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ChatBox from "./components/ChatBox.tsx"
import CreditsPage from "./pages/CreditsPage.tsx"
import CommunityPage from "./pages/CommunityPage.tsx"
import { Provider } from "react-redux"
import { store } from "./app/store.ts"
import LoadingPage from "./pages/LoadingPage.tsx"

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <ChatBox />
      },
      {
        path: "/credits",
        element: <CreditsPage />
      },
      {
        path: "/community",
        element: <CommunityPage />
      }, 
      {
        path: "/loading",
        element: <LoadingPage />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)