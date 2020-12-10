import React from 'react';
import NavBar from './common/NavBar.js';
import SideMenu from './common/SideMenu.js';
import ModeBar from './common/ModeBar.js';
import CreateEditAccountDialog from './LoginPage/CreateEditAccountDialog.js'
import LoginPage from './LoginPage/LoginPage.js';
import AppMode from "./../AppMode.js"
import Rounds from './RoundsPage/Rounds.js';
import Courses from './CoursesPage/Courses.js';
import Deliverables from './CoursesPage/Deliverables.js';
import Programs from './ProgramsPage/Programs.js'
import AboutBox from './common/AboutBox.js';
import InstructorPage from "./InstructorPage/InstructorPage.jsx"
import CourseInfoPage from "./CourseInfo/CourseInfo.jsx"

const modeTitle = {};
modeTitle[AppMode.LOGIN] = "Welcome to AcreditAid";
modeTitle[AppMode.ROUNDS] = "My Rounds";
modeTitle[AppMode.ROUNDS_LOGROUND] = "Log New Round";
modeTitle[AppMode.ROUNDS_EDITROUND] = "Edit Round";
modeTitle[AppMode.PROGRAMS] = "Programs";
modeTitle[AppMode.PROGRAMS_LOGPROGRAM] = "Create New Program";
modeTitle[AppMode.PROGRAMS_EDITPROGRAM] = "Edit Program";
modeTitle[AppMode.COURSES] = "Courses";
modeTitle[AppMode.COURSES_LOGCOURSE] = "Log New Course";
modeTitle[AppMode.COURSES_EDITCOURSE] = "Edit Course";
modeTitle[AppMode.DELIVERABLES] = "Deliverables";
modeTitle[AppMode.DELIVERABLES_EDITDELIVERABLE] = "View/Edit the Deliverable";
modeTitle[AppMode.DELIVERABLES_LOGDELIVERABLE] = "Create New Deliverable";

const modeToPage = {};
modeToPage[AppMode.LOGIN] = LoginPage;
modeToPage[AppMode.ROUNDS] = Rounds;
modeToPage[AppMode.ROUNDS_LOGROUND] = Rounds;
modeToPage[AppMode.ROUNDS_EDITROUND] = Rounds;
modeToPage[AppMode.COURSES] = Courses;
modeToPage[AppMode.COURSES_LOGCOURSE] = Courses;
modeToPage[AppMode.COURSES_EDITCOURSE] = Courses;
modeToPage[AppMode.DELIVERABLES] = Deliverables;
modeToPage[AppMode.DELIVERABLES_EDITDELIVERABLE] = Deliverables;
modeToPage[AppMode.DELIVERABLES_LOGDELIVERABLE] = Deliverables;
modeToPage[AppMode.PROGRAMS] = Programs
modeToPage[AppMode.PROGRAMS_LOGPROGRAM] = Programs
modeToPage[AppMode.PROGRAMS_EDITPROGRAM] = Programs
modeToPage[AppMode.INSTRUCTOR_DASHBOARD] = InstructorPage
modeToPage[AppMode.COURSE_INFO] = CourseInfoPage


class App extends React.Component {

  constructor() {
    super();
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false,
                  authenticated: false,
                  userObj: {displayName: "", profilePicURL: ""},
                  editAccount: false,
                  showEditAccountDialog: false,
                  statusMsg: "",
                  showAboutDialog: false,
                  currentProgram: "",
                  currentProgramId: 0
                 };
  }

  //componentDidMount
  componentDidMount() {
    if (!this.state.authenticated) { 
      //Use /auth/test route to (re)-test authentication and obtain user data
      fetch("/auth/test")
        .then((response) => response.json())
        .then((obj) => {
          if (obj.isAuthenticated) {

            let usermode = AppMode.PROGRAMS;
            switch(obj.user.accountType){
              case "Instructor":
                usermode = AppMode.INSTRUCTOR_DASHBOARD
                break
              case "College Admin":
                usermode = AppMode.PROGRAMS
                break
              case "ABET Evaluator":
                usermode = AppMode.PROGRAMS
                break

              default:
                usermode = AppMode.INSTRUCTOR_DASHBOARD
            }
            
            this.setState({
              userObj: obj.user,
              authenticated: true,
              mode: usermode//We're authenticated so can get into the app.
            });
          }
        }
      )
    } 
  }

  handleChangeMode = (newMode, modeParams) => {
    this.setState(
      {
        mode: newMode,
        modeParams: modeParams
      });
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  setUserId = (Id) => {
    this.setState({userId: Id,
                   authenticated: true});
  }

  showEditAccount = () => {
    this.setState({showEditAccountDialog: true});

  }

  cancelEditAccount = () => {
    this.setState({showEditAccountDialog: false});
  }

  //editAccountDone -- called after successful edit or
  //deletion of user account. msg contains the status
  //message and deleted indicates whether an account was
  //edited (deleted == false) or deleted (deleted == true)
  editAccountDone = (msg, deleted) => {
    if (deleted) {
      this.setState({showEditAccountDialog: false,
                     statusMsg: msg,
                     mode: AppMode.LOGIN});
      } else {
        this.setState({showEditAccountDialog: false,
          statusMsg: msg});
      }
  }

  closeStatusMsg = () => {
    this.setState({statusMsg: ""});
  }

  setCurrentProgram = (newProgram, Id) => {
    this.setState({currentProgram: newProgram, currentProgramId: Id});
  }

  render() {
    const ModePage = modeToPage[this.state.mode];
    return (
      <div className="padded-page">
        {this.state.showAboutDialog ? 
          <AboutBox close={() => this.setState({showAboutDialog: false})}/> : null}
        {this.state.statusMsg != "" ? <div className="status-msg">
              <span>{this.state.statusMsg}</span>
              <button className="modal-close" onClick={this.closeStatusMsg}>
                  <span className="fa fa-times"></span></button></div> : null}
        {this.state.showEditAccountDialog ? 
            <CreateEditAccountDialog 
              create={false} 
              userId={this.state.userObj.id} 
              done={this.editAccountDone} 
              cancel={this.cancelEditAccount}/> : null}
        <NavBar 
          title={modeTitle[this.state.mode]} 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}/>
          <SideMenu 
            menuOpen = {this.state.menuOpen}
            mode={this.state.mode}
            toggleMenuOpen={this.toggleMenuOpen}
            changeMode={this.handleChangeMode}
            displayName={this.state.userObj.displayName}
            profilePicURL={this.state.userObj.profilePicURL}
            localAccount={this.state.userObj.authStrategy === "local"}
            editAccount={this.showEditAccount}
            logOut={() => this.handleChangeMode(AppMode.LOGIN)}
            showAbout={() => {this.setState({showAboutDialog: true})}}
            userType={this.state.userObj.accountType}/>
          <ModePage 
            menuOpen={this.state.menuOpen}
            mode={this.state.mode}
            modeParams={this.state.modeParams}
            changeMode={this.handleChangeMode}
            userObj={this.state.userObj}
            refreshOnUpdate={this.refreshOnUpdate}
            setCurrentProgram={this.setCurrentProgram}
            currentProgram={this.state.currentProgram}
            currentProgramId={this.state.currentProgramId}/>
      </div>
    );  
  }
}

export default App;