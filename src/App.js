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

import AddFaculty from './components/Admin/AddFaculty';
import ViewFaculty from './components/Admin/ViewFaculty';
import EventAddSession from './components/Admin/EventAddSession';
import EventSessionView from './components/Admin/EventSessionView';
import CollegeViewSession from './components/College/CollegeViewSession';

import ViewSessionFeedback from './components/Admin/ViewSessionFeedback';
import ViewCompletedPrivateEvents from './components/Admin/ViewCompletedPrivateEvents';
import CompletedPrivateEventSessions from './components/Admin/CompletedPrivateEventSessions';

import StudentProfile from './components/Student/StudentProfile';
import StudentEventView from './components/User/StudentEventView';
import AddStudentFeedback from './components/User/AddStudentFeedback';
import StudentSessionView from './components/User/StudentSessionView';
import AddSessionFeedback from './components/User/AddSessionFeedback';
import ForgotPassword from './components/Student/ForgotPassword';
import UpdatePassword from './components/Student/UpdatePassword';
import FacultyForgotPassword from './components/College/FacultyForgotPassword';
import FacultyUpdatePassword from './components/College/FacultyUpdatePassword';
import MarkAttendence from './components/Admin/MarkAttendence';
import ViewAttendence from './components/Admin/ViewAttendence';
import UpdateFaculty from './components/College/UpdateFaculty';
import ViewEventFeedback from './components/Admin/ViewEventFeedback';
import ForgotUserPassword from './components/User/ForgotUserPassword';
import UpdateUserPassword from './components/User/UpdateUserPassword';
import ViewCompletedPublicEvents from './components/Admin/ViewCompletedPublicEvents';
import ViewAdminLogs from './components/Admin/ViewAdminLogs';
import ViewFacultyLogs from './components/Admin/ViewFacultyLogs';
import ViewUserLogs from './components/Admin/ViewUserLogs';







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
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>

        <Route path='/collegelogin' element={<CollegeLogin/>}/>
        <Route path='/collegehome' element={<CollegeHomePage/>}/>
        <Route path='/forgotfacultypassword' element={<FacultyForgotPassword/>}/>
        <Route path='/updatefacultypassword' element={<FacultyUpdatePassword/>}/>

        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/userprofile' element={<UserProfile/>}/>
        <Route path='/registeration' element={<UserRegistration/>}/>
        <Route path='/adduserfeedback' element={<AddFeedback/>}/>
        <Route path='/forgotuserpassword' element={<ForgotUserPassword/>}/>
        <Route path='/updateuserpassword' element={<UpdateUserPassword/>}/>

        <Route path='/viewevent' element={<ViewEvents/>}/>
        
        <Route path='/adminhome' element={<AdminHomePage/>}/>
        <Route path='/studenthome' element={<StudentHomePage/>}/>
        <Route path='/userhome' element={<UserHomePage/>}/>
        <Route path='/viewuser' element={<ViewUser/>}/>
        <Route path='/payment' element={<UserPayment/>}/>

        <Route path='/addpublicevent' element={<AddPublicEvent/>}/>
        <Route path='/addprivateevent' element={<AddPrivateEvent/>}/>
        <Route path='/viewpublicevent' element={<ViewPublicEvent/>}/>
        <Route path='/viewprivateevent' element={<ViewPrivateEvent/>}/>
        <Route path='/viewcompletedprivateevents' element={<ViewCompletedPrivateEvents/>}/>
        <Route path='/viewcompletedprivateeventsessions' element={<CompletedPrivateEventSessions/>}/>

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
        <Route path='/addfaculty' element={<AddFaculty/>}/>
        <Route path='/viewfaculty' element={<ViewFaculty/>}/>

        <Route path='/eventaddsession' element={<EventAddSession/>}/>
        <Route path='/eventviewsession' element={<EventSessionView/>}/>
        <Route path='/collegeviewsession' element={<CollegeViewSession/>}/>
        <Route path='/viewsessionfeedback' element={<ViewSessionFeedback/>}/>
        <Route path='/markattendence' element={<MarkAttendence/>}/>
        <Route path='/viewattendence' element={<ViewAttendence/>}/>
        <Route path='/updatefaculty' element={<UpdateFaculty/>}/>
        <Route path='/vieweventfeedback' element={<ViewEventFeedback/>}/>
        <Route path='/viewcompletedpublicevents' element={<ViewCompletedPublicEvents/>}/>

        <Route path='/viewadminlogs' element={<ViewAdminLogs/>}/>
        <Route path='/viewfacultylogs' element={<ViewFacultyLogs/>}/>
        <Route path='/viewuserlogs' element={<ViewUserLogs/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
