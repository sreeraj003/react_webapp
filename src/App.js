import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Homes'
import UserProfile from './components/userProfile';
import AdminDash from './components/adminDash'
import AdminLogin from './components/adminLogin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewUser from './components/viewUser';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={ <Login />}>
          </Route>
          <Route path='/signup' element={<Signup />}>
          </Route>
          <Route path='/home' element={<Home />}>
          </Route>
          <Route path='/userProfile' element={<UserProfile />}>
          </Route>
          <Route path='/logout' element={<Login />}>
          </Route>
          <Route path='/adminLogin' element={<AdminLogin />}>
          </Route>
          <Route path='/admin' element={<AdminDash />}>
          </Route>
          <Route path='/viewUser' element={<ViewUser />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
