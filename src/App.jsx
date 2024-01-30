import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import TaskEdit from './components/TaskEdit/TaskEditModel'
import PasswordReset from './components/PasswordReset/PasswordReset'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout/Layout'
import UserTasks from './components/UserTasks/UserTasks'

function App() {
  const user = localStorage.getItem('user')


  return (
    <BrowserRouter>
    <Routes>
      <Route  element={user ? <Layout /> : <Navigate  replace to={'/login'} />} >
        <Route path='/' element={<Home/>}/>
        <Route path='/user-task' element={<UserTasks/>}/>
      </Route>
      <Route path='/:id' element={user ? <TaskEdit /> : <Navigate  replace to={'/login'} />} />
      <Route path='/login' element={user ? <Navigate replace to={'/'} /> : <Login />} />
      <Route path='/password-reset' element={user ? <Navigate replace to={'/'} /> : <PasswordReset />} />
      <Route path='/signup' element={user ? <Navigate replace to={'/'} /> : <Signup />} />
      <Route path='*' element={<h1>Not found</h1>}/>
    </Routes>
    <ToastContainer />
  </BrowserRouter>
  )
}

export default App
