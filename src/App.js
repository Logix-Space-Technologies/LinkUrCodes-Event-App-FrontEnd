import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';
import UserLogin from './components/User/UserLogin';
import AdminHomePage from './components/Admin/AdminHomePage';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/studentlogin' element={<StudentLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/adminhome' element={<AdminHomePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
