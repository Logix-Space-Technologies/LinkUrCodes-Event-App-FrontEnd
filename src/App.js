import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import AdminLogin from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';

import CollegeLogin from './components/College/CollegeLogin';
import CollegeHomePage from './components/College/CollegeHomePage';


import AdminHomePage from './components/Admin/AdminHomePage';

import UserProfile from './components/User/UserProfile';

import StudentHomePage from './components/Student/StudentHomePage';
import UserHomePage from './components/User/UserHomePage';
import UserLogin from './components/User/UserLogin';
import UserRegistration from './components/User/UserRegistration';
import EventView from './components/User/EventView';




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
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/registeration' element={<UserRegistration/>}/>
        <Route path='/eventview' element={<EventView/>}/>
        
        <Route path='/adminhome' element={<AdminHomePage/>}/>
        <Route path='/studenthome' element={<StudentHomePage/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
