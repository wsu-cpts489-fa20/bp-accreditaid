import React from 'react';
import AppMode from '../../AppMode.js';
import CoursesForm from './CoursesForm.js';
import CoursesTable from './CoursesTable.js';
import FloatingButton from '../common/FloatingButton.js';

class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      deleteId: "",
                      editId: "",
                      courses: []
                    };    
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const url = '/api/courses/all/' + "test";
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
            }
            console.log(courses)
            // console.log(programs)
            this.setState({courses: courses})
            //console.log(res.json())
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
            this.props.changeMode(AppMode.PROGRAMS);
        } else {
            this.setState({errorMsg: msg});
            await this.fetchData();
            this.props.changeMode(AppMode.PROGRAMS);
        }
    }


    //deleteProgram -- Delete the current user's program uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteCourse = async () => {
        const url = '/api/courses/' + this.deleteId;
        const res = await fetch(url, {method: 'DELETE'}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: "An error occurred when attempting to delete program from database: " 
            + msg});
            this.props.changeMode(AppMode.PROGRAMS);
        } else {
            await this.fetchData();
            this.props.changeMode(AppMode.PROGRAMS);
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

    render() {
        switch(this.props.mode) {
            case AppMode.COURSES:
                return (
                    <>
                        <CoursesTable
                            courses={this.state.courses}
                            setEditId={this.setEditId}
                            changeMode={this.props.changeMode}
                            menuOpen={this.props.menuOpen}
                        />
                        <FloatingButton
                            handleClick={() => 
                                this.props.changeMode(AppMode.COURSES_LOGCOURSE)}
                            menuOpen={this.props.menuOpen}
                            icon={"fa fa-plus"}
                        />
                    </>
                );
            case AppMode.COURSES_LOGCOURSE:
                return (
                    <>
                        <CoursesForm
                            mode={this.props.mode}
                            startData={""} 
                            saveCourse={this.addCourse}
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
                        />
                    </>
                );
        }
    }
}

export default Courses;