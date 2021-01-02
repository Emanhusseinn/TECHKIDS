import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Signin from './component/login';
import registrate from './component/registrate';
import Personalprofile from './component/profile/profile';
import editProfile from './component/profile/editProfile';
import lessons from './pages/Lessons';
import Exercises from './pages/Exercises';
import HTMLcourse from './component/HtmlCourse/HTMLcourse';
import CSScourse from './component/CSSCourse/CSScourse';
import ProtectedRoute from './protectedroutes/ProtectedRoute';
import errorimg from "./protectedroutes/404img";
import pic from './component/profile/profilePicChanger';
import Navbar from './component/Navbar/Navbar'
import CSSex3 from './component/CSS/inputQuestions/CSSex3'
import CSSex4 from './component/CSS/inputQuestions/CSSex4'
import Addcorsecard from './component/teacher/Addcorsecard';
import card from './component/teacher/card-display';
import firrrre from './teacherSide/form'
import teacherpage from './teacherSide/matierialsPage'
import EditMatreals from './teacherSide/edit'


function App() {
//
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Switch>
          <ProtectedRoute path='/lessons' component={lessons} isAuth={localStorage.length > 0} />
          <ProtectedRoute path='/exercises' component={Exercises} isAuth={localStorage.length > 0} />
          <Route exact path="/" component={Home} />
          <Route exact path="/htmlCourse" component={HTMLcourse} />
          <ProtectedRoute exact path="/cssCourse" component={CSScourse} isAuth={localStorage.length > 0} />
          <Route path="/errorimg" component={errorimg} />
          {/* <ProtectedRoute path="/account/" component={Personalprofile} isAuth={localStorage.length > 0} /> */}
          <Route exact path="/edit/:id" component={editProfile} />
          <Route exact path="/pic/:id" component={pic} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/registrate" component={registrate} />
          <Route exact path="/CSS/ex3" component={CSSex3} />
          <Route exact path="/CSS/ex4" component={CSSex4} />
          <Route  path="/teacher/addcard" component={Addcorsecard} />
          <Route  path="/teacher/card" component={card} />
          <ProtectedRoute path="/account/:id" component={Personalprofile} isAuth={localStorage.length > 0} />
          <Route  path="/firrrre" component={firrrre} />
          <Route path="/teachersM" component={teacherpage} />
          <Route path="/EditMatreals/:id" component={EditMatreals} /> 
          <Exercises />
        </Switch>
      </BrowserRouter>
    </>
  );

};

export default App; 