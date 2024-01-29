import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'

function App() {
  const user = localStorage.getItem('user')


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate  replace to={'/login'} />} />
      {/* <Route path='/:id' element={user ? <TaskEdit /> : <Navigate  replace to={'/login'} />} /> */}
      <Route path='/login' element={user ? <Navigate replace to={'/'} /> : <Login />} />
      <Route path='/signup' element={user ? <Navigate replace to={'/'} /> : <Signup />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
