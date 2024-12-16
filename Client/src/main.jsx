import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'


import App from './App.jsx'
import NewPost from './components/NewPost.jsx'
import { LimiteCaracteresProvider } from './LimiteCaracteresContext.jsx'

const router = createBrowserRouter([
      {
        path: '/',
        element: <App />
      },
      {
        path: '/newPost',
        element: <NewPost />
      }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LimiteCaracteresProvider>
      <RouterProvider router={router} />
    </LimiteCaracteresProvider>
  </StrictMode>,
)
