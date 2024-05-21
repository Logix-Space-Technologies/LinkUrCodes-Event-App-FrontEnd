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
import ViewUser from './components/Admin/ViewUser';

import ViewPublicEvent from './components/Admin/ViewPublicEvent';
import ViewPrivateEvent from './components/Admin/ViewPrivateEvent';

import CollegeProfile from './components/College/CollegeProfile';
import UserRegistration from './components/User/UserRegistration';

import SearchEvent from './components/User/SearchEvent';

import About from './components/Homepage/About';
import Contact from './components/Homepage/Contact';

import CollegeStudentDetails from './components/College/CollegeStudentDetails';
import CollegeAddStudent from './components/College/CollegeAddStudent';
import CollegeAddStudExcel from './components/College/CollegeAddStudExcel';
import CollegeEvents from './components/College/CollegeEvents';
import ViewEvents from './components/User/ViewEvents';
import AddPublicEvent from './components/Admin/AddPublicEvent';
import AddPrivateEvent from './components/Admin/AddPrivateEvent';





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
        {/* <Route path='/searchevent' element={<SearchEvent/>}/> */}

        <Route path='/viewevent' element={<ViewEvents/>}/>
        
        <Route path='/adminhome' element={<AdminHomePage/>}/>
        <Route path='/studenthome' element={<StudentHomePage/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/viewuser' element={<ViewUser/>}/>

        <Route path='addpublicevent' element={<AddPublicEvent/>}/>
        <Route path='addprivateevent' element={<AddPrivateEvent/>}/>
        <Route path='/viewpublicevent' element={<ViewPublicEvent/>}/>
        <Route path='/viewprivateevent' element={<ViewPrivateEvent/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/collegeprofile' element={<CollegeProfile/>}/>
        <Route path='/collegestudentview' element={<CollegeStudentDetails/>}/>
        <Route path='/collegeaddstudent' element={<CollegeAddStudent/>}/>
        <Route path='/collegeaddstudexcel' element={<CollegeAddStudExcel/>}/>
        <Route path='/collegeevents' element={<CollegeEvents/>}/>



      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
