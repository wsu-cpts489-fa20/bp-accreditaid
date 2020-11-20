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
                      editId: ""
                    };    
    }

    addCourse = async (name, newData) => {
        const url = '/api/courses/' + name;
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
            this.props.changeMode(AppMode.COURSES);
        } else {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.COURSES);
        }
    }

    render() {
        switch(this.props.mode) {
            case AppMode.COURSES:
                return (
                    <>
                        <CoursesTable/>
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
                return (
                    <>
                        <CoursesForm
                            mode={this.props.mode}
                            //startData={this.state.courses[this.state.editId]} 
                            saveCourse={this.editCourse}
                        />
                    </>
                );
        }
    }
}

export default Courses;