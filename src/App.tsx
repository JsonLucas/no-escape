import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth();
  return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            {isAuthenticated && <>
              <Route path='/home' element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </>}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
  )
}

export default App
