import React from 'react';
import AppMode from '../../AppMode.js';

class CoursesForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.mode === AppMode.COURSES_LOGCOURSE) {
            this.state = {
                        courseName: "",
                        courseNumber: "",
                        coursePrefix: "",
                        courseCredits: "",
                        coursePrerequisites: "",
                        courseSOs: "",
                        courseDeliverables: "",
                        courseInstructor: "",
                        courseEmail: "",
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

    handleNewCourseChange = (event) => {
        this.setState({[event.target.name]: event.target.value});  
    } 

    render() {
        return (
            <div>
                <form onSubmit={() => alert("course added!")}>
                    <center>
                        <label>
                            Course Name:
                            <input
                            className="form-control form-text form-center"
                            name="Name"
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
                            name="Number"
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
                            name="Prefix"
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
                            name="Credits"
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
                            name="Prerequisites"
                            type="text"
                            placeholder="Prerequisites"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course SOs:
                            <input
                            className="form-control form-text form-center"
                            name="SOs"
                            type="text"
                            placeholder="SOs"
                            required={true}                
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Deliverables:
                            <input
                            className="form-control form-text form-center"
                            name="Deliverables"
                            type="text"
                            placeholder="Deliverables"
                            required={true}               
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Name:
                            <input
                            className="form-control form-text form-center"
                            name="Deliverables"
                            type="text"
                            placeholder="Deliverables"
                            required={true}               
                            onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Email: 
                            <input
                            className="form-control form-text form-center"
                            name="accountName"
                            type="email"
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