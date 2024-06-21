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
import { Dashboard} from './routes/Pets/dashboard.tsx'
import { AddPet } from './routes/Pets/addpets.tsx'
import { PetDetails } from './routes/Pets/petDetails.tsx'

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
        element: <Dashboard/>
      },
      {
        path: "/pets/addpet",
        element: <AddPet/>
      },
      {
        path: "/pets/details/:id",
        element: <PetDetails name={''} age={''} weight={''} coat={''}/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
