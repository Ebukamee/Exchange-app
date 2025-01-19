import { useEffect } from 'react'
import { auth } from './firesbase/firebase'
import useAuthStore from './Store/userStore'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/login'
import Signup from './Pages/signup'
import './App.css'
import About from './Pages/About'
import RateCalculator from './Pages/Rates'
import Dashboard from './Pages/dashboard'
import { Toaster } from './components/ui/toaster'
import VerifyEmail from './Pages/verify-email'
import UpdatePassword from './Pages/update-Password'
import BankDetails from './Pages/BankDetails'
import { Navigate } from 'react-router-dom'




function App() {
const {  user,subscribeToAuthChanges } = useAuthStore();
useEffect(() => {
 subscribeToAuthChanges()

}, [subscribeToAuthChanges]);

  return (

    <>
      <Routes>
      <Route path='/'element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/giftcard-rates' element={<RateCalculator />} />
       <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/verify-email' element={<VerifyEmail />} />
      <Route path='/forgot-password' element={<UpdatePassword />} />
      <Route path='/bank-details' element={<BankDetails />} />

      { /*<Route path='/create' element={<CreateProjectForm />} />
      <Route path='/post/:id' element={<BlogDetail />} />
      <Route path='/blog' element={<Bloglist />} />
      <Route path='/edit_profile' element={<Edit />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/:id' element={<Profile />} /> */}
   </Routes>
   <Toaster />
    </>
  )
}

export default App
