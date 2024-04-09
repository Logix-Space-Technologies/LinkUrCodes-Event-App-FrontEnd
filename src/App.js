import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';

import CollegeLogin from './components/College/CollegeLogin';
import CollegeHomePage from './components/College/CollegeHomePage';


import AdminHomePage from './components/Admin/AdminHomePage';
import StudentHomePage from './components/Student/StudentHomePage';
import UserHomePage from './components/User/UserHomePage';
import UserLogin from './components/User/UserLogin';
import ViewPublicEvent from './components/Admin/ViewPublicEvent';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/studentlogin' element={<StudentLogin/>}/>

        <Route path='/collegelogin' element={<CollegeLogin/>}/>
        <Route path='/collegehome' element={<CollegeHomePage/>}/>

        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/adminhome' element={<AdminHomePage/>}/>
        <Route path='/studenthome' element={<StudentHomePage/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>

        <Route path='/viewpublicevent' element={<ViewPublicEvent/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
