import { useState } from 'react'
import Home from './components/Home'
import Start from './components/start'
import Navbar from './components/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/react-todo/",
      element: <Home />,
    },
    {
      path: "/react-todo/start",
      element:<> <Navbar /> <Start /></>,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App
