import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ErrorPage from './components/Errorpage';
import App from './App';
import Carousel from './components/Carousel/Carousel';
import MainBody from './MainBody';
import ProgressContainer from './components/ProgressBar/ProgressContainer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <MainBody/>,
      },
      {
        path: "carousel",
        element: <Carousel />,
      },
      {
        path: "progressbar",
        element: <ProgressContainer />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />  
  </React.StrictMode>,
)
