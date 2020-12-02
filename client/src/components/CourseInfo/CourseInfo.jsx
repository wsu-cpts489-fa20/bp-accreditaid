import React from 'react';
import CourseReadingsTab from "./CourseReadingsTab.jsx";
import CourseMaterialsTab from "./CourseMaterialsTab.jsx";
import CourseDeliverablesTab from "./CourseDeliverablesTab.jsx";
import CourseFilesTab from "./CourseFilesTab.jsx";
import CoursesForm from "../CoursesPage/CoursesForm.js"

class CourseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: CoursesForm,
            tabClasses: ["nav-link active", "nav-link", "nav-link", "nav-link", "nav-link"],
            course: this.props.modeParams.course
        };
        console.log(this.props);
    }

    updateCourseState = (field, value) =>{
        let newCourse = this.state.course
        newCourse[field] = value
        this.setState({
            course: newCourse
        })
    }

    //editProgram -- Given an object newData containing updated data on an
    //existing program, update the current user's program in the database. 
    //toggle the mode back to AppMode.PROGRAMS since the user is done editing the
    //program. 
    editCourse = async (newData) => {
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
        } else {
            this.setState({errorMsg: msg});
            await this.fetchData();
        }
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

        const ActiveTab = this.state.activeTab;
        return(
        <div>
            <div id="navigation-div">
                <button className="btn btn-link" onClick={()=>{this.props.changeMode(this.props.modeParams.prevMode)}} ><span className="fa fa-arrow-left"></span> Back </button>
                
                <h2>{this.props.modeParams.course.courseName}</h2>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a className={this.state.tabClasses[0]}  onClick={()=>{this.changeTab(CoursesForm,0)}} href="#">Course Overview</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[1]} onClick={()=>{this.changeTab(CourseMaterialsTab,1)}}  href="#">Materials</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[2]} onClick={()=>{this.changeTab(CourseReadingsTab,2)}}  href="#">Readings</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[3]} onClick={()=>{this.changeTab(CourseDeliverablesTab,3)}}  href="#">Deliverables</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[4]} onClick={()=>{this.changeTab(CourseFilesTab,4)}}  href="#">Course Files</a>
                    </li>
                </ul>
            </div>

            <div>
            <ActiveTab
                            mode={this.props.mode}
                            course={this.state.course}
                            startData={this.state.course} 
                            saveCourse={this.editCourse}
                            instructor={true}
                            updateCourseState={this.updateCourseState}
                        />
            </div>    
        </div>
        )
    }
}
export default CourseInfo;