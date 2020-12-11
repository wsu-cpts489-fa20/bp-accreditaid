import React from 'react';
import AppMode from '../../AppMode.js';
import CoursesForm from './CoursesForm.js';
import CoursesTable from './CoursesTable.js';
import FloatingButton from '../common/FloatingButton.js';
import EmailModal from "../EmailModal/EmailModal.jsx"
import Deliverables from "./Deliverables.js";
import EvaluatorView from "./EvaluatorView.jsx";

class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.userObj = "";
        this.state = {
                      deleteId: "",
                      editId: "",
                      courses: [],
                      displayEmailModal: false,
                      toList: [],
                      tabClasses: ["nav-link active", "nav-link", "nav-link", "nav-link", "nav-link"],
                      activeTab:  CoursesTable
                    };    
    }

    componentDidMount() {
        this.fetchData();
        this.userObj = this.props.userObj;
        console.log(this.userObj);
    }

    async fetchData() {
        const url = '/api/courses/program/' + this.props.currentProgram;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'GET'}); 
        if (res.status != 200) {
            const msg = await res.text();
            console.log(msg);
            this.setState({errorMsg: msg});
        } else {
            const msg = await res.json();
            console.log(msg);
            let courses = JSON.parse(msg);
            console.log(courses)
            this.setState({errorMsg: ""});
            for(var i = 0; i < courses.length; i++)
            {
                courses[i].deliverables = 0;
                courses[i].sos = 0;
                courses[i].completion = 0;
                courses[i].selectedForEmail = false;
            }
            console.log(courses)
            // console.log(programs)
            this.setState({courses: courses})
            //console.log(res.json())
            console.log("End fetch data");
        }
    }

    addCourse = async (newData) => {
        const url = '/api/courses/' + newData.courseName;
        delete newData.name;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(newData)}); 
        const msg = await res.text();
        if (res.status != 201) {
            this.setState({errorMsg: msg});
            console.log(msg);
            this.props.changeMode(AppMode.COURSES);
        } else {
            this.setState({errorMsg: msg});
            console.log(msg);
            this.fetchData();
            this.props.changeMode(AppMode.COURSES);
        }
    }

    //editProgram -- Given an object newData containing updated data on an
    //existing program, update the current user's program in the database. 
    //toggle the mode back to AppMode.PROGRAMS since the user is done editing the
    //program. 
    editCourse = async (newData) => {
        console.log(newData);
        const url = '/api/courses/' + newData._id;
        delete newData._id;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(newData)}); 
        const msg = await res.text();
        console.log(msg);
        if (res.status != 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.COURSES);
        } else {
            this.setState({errorMsg: msg});
            await this.fetchData();
            this.props.changeMode(AppMode.COURSES);
        }
    }


    //deleteProgram -- Delete the current user's program uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteCourse = async () => {
        const url = '/api/courses/' + this.deleteId;
        const res = await fetch(url, {method: 'DELETE'}); 
        const msg = await res.text();
        console.log(msg);
        if (res.status != 200) {
            this.setState({errorMsg: "An error occurred when attempting to delete course from database: " 
            + msg});
            this.props.changeMode(AppMode.COURSES);
        } else {
            await this.fetchData();
            this.props.changeMode(AppMode.COURSES);
        }  
    }
 
    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.deleteId = val;
        this.setState({errorMsg: ""});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.editId = val;
        this.setState({errorMsg: ""});
    }

    closeErrorMsg = () => {
        this.setState({errorMsg: ""});
    }

    toggleEmailSelection = (index) =>{
        let localcourses = this.state.courses
        console.log("toggleEmailSelection " + index);

        localcourses[index].selectedForEmail = !localcourses[index].selectedForEmail
        this.setState({courses:localcourses })
        console.log("index" + index + "has been  toggled");
    }   

    getEmails = () => {
        let emailList = "";
        console.log("in get emails");
        console.log(this.state.courses);
        for(var i = 0 ; i < this.state.courses.length; i++){
            if(this.state.courses[i].selectedForEmail){
                emailList += this.state.courses[i].courseEmail + ", "
            }
            console.log(emailList)
        }

        return emailList.substring(0, emailList.length - 2);
    }

    toggleEmailModal = () =>{
        this.setState({displayEmailModal: !this.state.displayEmailModal})
    }

    changeTab = (newTab, index) => {
        let newTabClasses = ["nav-link", "nav-link", "nav-link", "nav-link", "nav-link"]
        newTabClasses[index] = "nav-link active";
        this.setState({
            activeTab: newTab,
            tabClasses: newTabClasses
        })
    }

    render() {
        console.log("Start render");
        console.log(JSON.stringify(this.state.courses));
        console.log("End render");
        let toList = this.getEmails(); 
        var CurrentTab = this.state.activeTab
        switch(this.props.mode) {
            
            case AppMode.COURSES:
                
                return (
                    <>

                        {this.props.userObj.accountType == "College Admin" ? <div>
                        <button onClick={()=>{
                            if(toList == 0){
                                alert("You must select a non-zero amount of instructors first!");
                                return;
                            }
                            this.toggleEmailModal();}} className="btn btn-primary">Email Instructors</button>

                        </div> :<div></div>}

                        {this.state.displayEmailModal ? <EmailModal toList={toList} close={this.toggleEmailModal}></EmailModal> : <div></div>}

                        <ul id="tabs-ul" class="nav nav-tabs">
                            
                            <li class="nav-item">
                                <a className={this.state.tabClasses[0]}  onClick={()=>{this.changeTab(CoursesTable,0)}} id="management-tab" href="#">Management View</a>
                            </li> 
                            <li class="nav-item">
                                <a className={this.state.tabClasses[1]} onClick={()=>{this.changeTab(EvaluatorView,1)}} id="eval-tab" href="#">Evaluator View</a>
                            </li>
                        </ul>

                        <CurrentTab
                            toggleEmailSelected={this.toggleEmailSelection}
                            courses={this.state.courses}
                            setEditId={this.setEditId}
                            changeMode={this.props.changeMode}
                            menuOpen={this.props.menuOpen}
                            currentProgram={this.props.currentProgram}
                            userObj={this.props.userObj}
                        />

                        {this.props.userObj.accountType == "College Admin" ?  
                        
                        <FloatingButton
                            id="create-course-floating-button"
                            handleClick={() => 
                                this.props.changeMode(AppMode.COURSES_LOGCOURSE)}
                            menuOpen={this.props.menuOpen}
                            icon={"fa fa-plus"}
                        /> 
                        :<div></div>}

                    </>
                );
            case AppMode.COURSES_LOGCOURSE:
                return (
                    <>
                        <CoursesForm
                            mode={this.props.mode}
                            userObj={this.userObj}
                            startData={""} 
                            saveCourse={this.addCourse}
                            setDeleteId={this.setDeleteId}
                            deleteCourse={this.deleteCourse}
                            currentProgram={this.props.currentProgram}
                        />
                    </>
                );
            case AppMode.COURSES_EDITCOURSE:
                let thisCourse = {...this.state.courses[this.editId]};
                return (
                    <>
                        <CoursesForm
                            mode={this.props.mode}
                            startData={thisCourse} 
                            saveCourse={this.editCourse}
                            setDeleteId={this.setDeleteId}
                            deleteCourse={this.deleteCourse}
                            currentProgram={this.props.currentProgram}
                        />
                    </>
                );
            case AppMode.DELIVERABLES:
                return (
                    <>
                        <Deliverables
                            editId={this.state.editId}
                        />
                    </>
                );
        }
    }
}

export default Courses;