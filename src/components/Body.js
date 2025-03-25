import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { useDispatch } from 'react-redux'
import {addUser, removeUser} from '../utils/store/userSlice'

const Body = () => {
const dispatch = useDispatch()
useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {

          dispatch(addUser({uid:user.uid,email:user.email,displayName:user.displayName}))
        } else {
          // User is signed out
          dispatch(removeUser())
          // ...
        }
      });
},[])

    const appRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        { path: '/browse', element: <Browse /> }
    ])


    return (
        <div>
            <RouterProvider router={appRoutes} />
        </div>
    )
}

export default Body
