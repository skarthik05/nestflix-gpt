import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/store/userSlice'
import { LOGO, USER_AVATAR } from '../utils/constants'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {

          dispatch(addUser({uid:user.uid,email:user.email,displayName:user.displayName}))
          navigate("/browse")
        } else {
          // User is signed out
          dispatch(removeUser())
          navigate("/")
          // ...
        }
      });
      return ()=>unsubscribe()
},[])
  const handleSignOut = () => {
    signOut(auth).then(() => { 
    }).catch(() => { })
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-30 flex justify-between">

      <img className='w-44' src={LOGO} alt='logo' />
     { user && <div className='flex p-2'>
        <img className='w-14 h-14 rounded-lg' alt='user-icon' src={USER_AVATAR} />
        <button className='font-semibold text-white mx-2' onClick={handleSignOut}>Sign Out</button>

      </div>}
    </div>
  )
}

export default Header