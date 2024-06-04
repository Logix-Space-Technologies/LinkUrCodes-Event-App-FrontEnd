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


import About from './components/Homepage/About';
import Contact from './components/Homepage/Contact';

import CollegeStudentDetails from './components/College/CollegeStudentDetails';
import CollegeAddStudent from './components/College/CollegeAddStudent';
import CollegeAddStudExcel from './components/College/CollegeAddStudExcel';
import CollegeEvents from './components/College/CollegeEvents';
import ViewEvents from './components/User/ViewEvents';
import AddFeedback from './components/User/AddFeedback';
import UserPayment from './components/User/UserPayment';

import AddPublicEvent from './components/Admin/AddPublicEvent';
import AddPrivateEvent from './components/Admin/AddPrivateEvent';

import AdminSearchUser from './components/Admin/AdminSearchUser';
import AdminDeleteUser from './components/Admin/AdminDeleteUser';
import SearchPublicEvent from './components/Admin/SearchPublicEvent';
import RetrivePublicEvents from './components/Admin/RetrivePublicEvents';
import DeletePublicEvent from './components/Admin/DeletePublicEvent';
import AddCollege from './components/Admin/AddCollege';
import ViewCollege from './components/Admin/ViewCollege';
import SearchCollege from './components/Admin/SearchCollege';
import DeleteCollege from './components/Admin/DeleteCollege';
import SearchPrivateEvent from './components/Admin/SearchPrivateEvent';
import DeletePrivateEvent from './components/Admin/DeletePrivateEvent';
import RetrievePrivateEvents from './components/Admin/RetrievePrivateEvents';
import AddStudentCollege from './components/College/AddStudentCollege';
import ViewCollegeStudents from './components/College/ViewCollegeStudents';
import StudentDetails from './components/College/StudentsDetails';
import StudentProfile from './components/Student/StudentProfile';
import StudentEventView from './components/Student/StudentEventView';
import AddStudentFeedback from './components/Student/AddStudentFeedback';
import StudentSessionView from './components/Student/StudentSessionView';
import AddSessionFeedback from './components/Student/AddSessionFeedback';






function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>

        <Route path='/studentlogin' element={<StudentLogin/>}/>
        <Route path='/studentprofile' element={<StudentProfile/>}/>
        <Route path='/studentevents' element={<StudentEventView/>}/>
        <Route path='/studentfeedback' element={<AddStudentFeedback/>}/>
        <Route path='/sessions' element={<StudentSessionView/>}/>
        <Route path='/sessionfeedback' element={<AddSessionFeedback/>}/>

        <Route path='/collegelogin' element={<CollegeLogin/>}/>
        <Route path='/collegehome' element={<CollegeHomePage/>}/>

        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/registeration' element={<UserRegistration/>}/>
        <Route path='/adduserfeedback' element={<AddFeedback/>}/>

        <Route path='/viewevent' element={<ViewEvents/>}/>
        
        <Route path='/adminhome' element={<AdminHomePage/>}/>
        <Route path='/studenthome' element={<StudentHomePage/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/viewuser' element={<ViewUser/>}/>
        <Route path='/payment' element={<UserPayment/>}/>

        <Route path='addpublicevent' element={<AddPublicEvent/>}/>
        <Route path='addprivateevent' element={<AddPrivateEvent/>}/>
        <Route path='/viewpublicevent' element={<ViewPublicEvent/>}/>
        <Route path='/viewprivateevent' element={<ViewPrivateEvent/>}/>

        <Route path='/addcollege' element={<AddCollege/>}/>
        <Route path='/viewcollege' element={<ViewCollege/>}/>
        <Route path='/searchcollege' element={<SearchCollege/>}/>
        <Route path='/deletecollege' element={<DeleteCollege/>}/>

        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>

        <Route path='/collegeprofile' element={<CollegeProfile/>}/>
        <Route path='/collegestudentview' element={<CollegeStudentDetails/>}/>
        <Route path='/collegeaddstudent' element={<CollegeAddStudent/>}/>
        <Route path='/collegeaddstudexcel' element={<CollegeAddStudExcel/>}/>
        <Route path='/collegeevents' element={<CollegeEvents/>}/>
        <Route path='/searchuser' element={<AdminSearchUser/>}/>
        <Route path='/deleteuser' element={<AdminDeleteUser/>}/>
        <Route path='/searchpublicevent' element={<SearchPublicEvent/>}/>
        <Route path='/deletepublicevent' element={<DeletePublicEvent/>}/>
        <Route path='/retrivepublicevent' element={<RetrivePublicEvents/>}/>
        <Route path='/searchprivateevent' element={<SearchPrivateEvent/>}/>
        <Route path='/deleteprivateevent' element={<DeletePrivateEvent/>}/>
        <Route path='/retrieveprivateevent' element={<RetrievePrivateEvents/>}/>
        <Route path='/addstudent' element={<AddStudentCollege/>}/>
        <Route path='/viewcollegestudents' element={<ViewCollegeStudents/>}/>
        <Route path='/studentdetails' element={<StudentDetails/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
