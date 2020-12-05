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

    deleteInDatabase_single = (type) =>{
        let body = {};
        body[type] = null;
        console.log("body = " + body)
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    deleteInDatabase_array = (type, index) =>{
        let body = {};
        body[type] = this.state.course[type];
        console.log("body = " + body)
        body[type].splice(index, 1);
        console.log("body = " + body)
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    deleteInDatabase_prompt = (deliverableIndex) => {
        console.log("upload_prompt has been called");
        let body = {};
        body["courseDeliverables"] = this.state.course["courseDeliverables"];
        console.log(body);
        console.log("index = " + deliverableIndex)
        body["courseDeliverables"][deliverableIndex]["prompt"] = null;
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState("courseDeliverables", body["courseDeliverables"])})
        .catch(err => console.error(err));
        
    }

    deleteInDatabase_workSample = (deliverableIndex, workSampleIndex) => {
        console.log("upload_prompt has been called");
        let body = {};
        body["courseDeliverables"] = this.state.course["courseDeliverables"];
        console.log(body);
        console.log("index = " + deliverableIndex)
        body["courseDeliverables"][deliverableIndex]["studentWorkSamples"][workSampleIndex]["file"] = null;
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState("courseDeliverables", body["courseDeliverables"])})
        .catch(err => console.error(err));
        
    }

    deleteFile = (id, name, db_update, type, index, index2) => {
        fetch(("/api/s3?id=" + id + "&name=" + name), {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => console.log("json res " +json))
        .then(() => {db_update(type, index)})
        .then(()=> {this.updateCourseState(type, null)})
        .catch(err => console.error(err));
    }

    uploadFile = (file, db_update, type, index) => {
        console.log("TYPE: "+ type);
        // add file to FormData object
        const fd = new FormData();
        fd.append('file', file);
    
        // send `POST` request
        fetch("/api/s3", {
            method: 'POST',
            body: fd
        })
        .then(function(res) {
            if(res.status == 200){
                return res.json();
            }
            throw res;
        })
        .then(json => {console.log(json); return json})
        .then((json) => {db_update(file, json.data.VersionId, type, index)})
        .catch(err => console.error(err))
    }

    upload_single = (file, id, type) => {
        console.log("upload_single has been called");
        let body = {};
        body[type] = {id: id, name: file.name};
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState(type, body[type])})
        .catch(err => console.error(err));
        
    }

    upload_array = (file, id, type) => {
        console.log("upload_array has been called");
        let body = {};
        body[type] = this.state.course[type];
        if(!body[type])
            body[type] = [];
        body[type].push({id: id, name: file.name});
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState(type, body[type])})
        .catch(err => console.error(err));
        
    }

    upload_prompt = (file, id, deliverableIndex) => {
        console.log("upload_prompt has been called");
        let body = {};
        body["courseDeliverables"] = this.state.course["courseDeliverables"];
        console.log(body);
        console.log("index = " + deliverableIndex)
        body["courseDeliverables"][deliverableIndex]["prompt"] = {id: id, name: file.name};
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState("courseDeliverables", body["courseDeliverables"])})
        .catch(err => console.error(err));
        
    }

    upload_workSample = (file, id, deliverableIndex, workSampleIndex) => {
        console.log("upload_prompt has been called");
        let body = {};
        body["courseDeliverables"] = this.state.course["courseDeliverables"];
        console.log(body);
        console.log("index = " + deliverableIndex)
        body["courseDeliverables"][deliverableIndex]["studentWorkSamples"][workSampleIndex]["file"] = {id: id, name: file.name};
        
        console.log(body);
        fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState("courseDeliverables", body["courseDeliverables"])})
        .catch(err => console.error(err));
        
    }

    //editProgram -- Given an object newData containing updated data on an
    //existing program, update the current user's program in the database. 
    //toggle the mode back to AppMode.PROGRAMS since the user is done editing the
    //program. 
    editCourse = async (newData) => {
        this.setState({course: newData});
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
            // await this.fetchData();
        }
    }

    async fetchData() {
        const url = '/api/courses/' + this.state.course._id;
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
            let course = JSON.parse(msg);
            this.setState({errorMsg: ""});
            this.setState({course: course})
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
                            deleteFile={this.deleteFile}
                            deleteInDatabase_single={this.deleteInDatabase_single}
                            deleteInDatabase_array={this.deleteInDatabase_array}
                            uploadFile={this.uploadFile}
                            upload_single={this.upload_single}
                            upload_array={this.upload_array}
                            upload_prompt={this.upload_prompt}
                            deleteInDatabase_prompt={this.deleteInDatabase_prompt}
                            upload_workSample={this.upload_workSample}
                            deleteInDatabase_workSample={this.deleteInDatabase_workSample}

                        />
            </div>    
        </div>
        )
    }
}
export default CourseInfo;