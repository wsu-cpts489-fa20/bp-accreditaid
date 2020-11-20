import React from 'react';
import AppMode from '../../AppMode.js';

class CoursesForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.mode === AppMode.COURSES_LOGCOURSE) {
            this.state = {
                        name: "",
                        courseNumber: "",
                        coursePrefix: "",
                        courseCredits: "",
                        coursePrerequisites: "",
                        courseInstructor: "",
                        courseEmail: "",
                        program: "test",
                        faIcon: "fa fa-save",
                        btnLabel: "Save Course"
                        };
        } else {
            let existingCourse = {...this.props.startData};
            existingCourse.faIcon = "fa fa-edit";
            existingCourse.btnLabel = "Update Course";
            this.state = existingCourse;
        }
    }

    handleSubmit = (event) => {
        this.setState({faIcon: "fa fa-spin fa-spinner",
                btnLabel: (this.props.mode === AppMode.COURSES_LOGCOURSE ? 
                    "Saving..." : "Updating...")});
        let courseData = this.state;
        let localName = this.state.name;
        console.log(localName)
        delete courseData.name;
        delete courseData.faIcon;
        delete courseData.btnLabel;
        console.log(courseData);
        setTimeout(this.props.saveCourse, 1000, localName, courseData); 
        event.preventDefault();
    }

    handleNewCourseChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value}); 
    } 

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <label>
                            Course Name:
                            <input
                            className="form-control form-text form-center"
                            name="name"
                            type="text"
                            placeholder="Name"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Number:
                            <input
                            className="form-control form-text form-center"
                            name="courseNumber"
                            type="text"
                            placeholder="Number"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Prefix:
                            <input
                            className="form-control form-text form-center"
                            name="coursePrefix"
                            type="text"
                            placeholder="Prefix"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Number of Credits:
                            <input
                            className="form-control form-text form-center"
                            name="courseCredits"
                            type="text"
                            placeholder="Credits"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Prerequisites:
                            <input
                            className="form-control form-text form-center"
                            name="coursePrerequisites"
                            type="text"
                            placeholder="Prerequisites"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Name:
                            <input
                            className="form-control form-text form-center"
                            name="courseInstructor"
                            type="text"
                            placeholder="Instructor"
                            required={true}               
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Email: 
                            <input
                            className="form-control form-text form-center"
                            name="courseEmail"
                            type="text"
                            size="35"
                            placeholder="Enter Email Address"
                            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                            required={true}
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <br/>
                        <button role="submit" 
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            style={{marginTop: "15px", marginBottom: "70px"}}>
                            <span className="fa fa-user-plus"></span>&nbsp;Add Course
                        </button>
                    </center>
                </form>
            </div>
        );
    }
}

export default CoursesForm;