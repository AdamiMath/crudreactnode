import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import NewPost from './components/NewPost.jsx';
import Login from './components/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { LimiteCaracteresProvider } from './LimiteCaracteresContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/newPost',
        element: <NewPost />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LimiteCaracteresProvider>
      <RouterProvider router={router} />
    </LimiteCaracteresProvider>
  </StrictMode>
);