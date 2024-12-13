import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRoute, RouterProvider, Route } from 'react-router-dom'


import App from './App.jsx'
import NewPost from './components/NewPost.jsx'

const router = createBrowserRoute([
  {
    element: <App />,
    children: [
      {
        path: '/'
      },
      {
        path: '/newPost',
        element: <NewPost />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)
