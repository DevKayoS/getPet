import './global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './routes/home.tsx'
import { Register } from './routes/register.tsx'
import { Login } from './routes/login.tsx'
import { Profile } from './routes/User/Profile.tsx'
import { MyPets } from './routes/Pets/mypets.tsx'
import { AddPet } from './routes/Pets/addpets.tsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/user/profile',
        element: <Profile/>
      },
      {
        path: "/users/mypets",
        element: <MyPets/>
      },
      {
        path: "/pets/addpet",
        element: <AddPet/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
