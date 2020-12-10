import React from 'react';
import AppMode from '../../AppMode.js';
import ConfirmDeleteCourse from './ConfirmDeleteCourse.js';

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
                courseInstructor: "",
                courseEmail: "",
                courseProgram: this.props.currentProgram,
                faIcon: "fa fa-save",
                btnLabel: "Save Course"
            };
        } else {
            let existingCourse = { ...this.props.startData };
            existingCourse.faIcon = "fa fa-edit";
            existingCourse.btnLabel = "Update Course";
            this.state = existingCourse;
        }
    }

    handleSubmit = (event) => {
        this.setState({
            faIcon: "fa fa-spin fa-spinner",
            btnLabel: (this.props.mode === AppMode.COURSES_LOGCOURSE ?
                "Saving..." : "Updating...")
        });
        let courseData = this.state;
        delete courseData.faIcon;
        delete courseData.btnLabel;
        console.log(courseData);
        setTimeout(this.props.saveCourse, 1000, courseData);
        event.preventDefault();

        setTimeout(() => {
            this.setState({
                faIcon: "fa fa-edit",
                btnLabel: "Update Course"
            });

        }, 1000);
    }

    handleNewCourseChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    //deleteProgram -- Triggered when the user clicks on the "Yes, Delete"
    //button in the Confirm Delete dialog box. It executes the deletion and
    //closes the dialog box.
    deleteCourse = () => {
        this.props.deleteCourse();
        this.setState({ showConfirmDelete: false });
    }


    //confirmDelete -- Triggered when the user clicks the delete button
    //for a given program. The id paam is the unique property that 
    //identifies the program. Set the state variable representing the id
    //of the program to be deleted and then present a dialog box asking
    //the user to confirm the deletion.
    confirmDelete = (id) => {
        this.props.setDeleteId(id);
        this.setState({ showConfirmDelete: true });
    }

    render() {
        console.log(this.state)
        return (
            <div id="course-form">
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <label>
                            Course Name:
                            <input
                                disabled={this.props.instructor}
                                id="course-name"
                                className="form-control form-text form-center"
                                name="courseName"
                                value={this.state.courseName}
                                type="text"
                                placeholder="Name"
                                required={true}
                                size="50"
                                maxLength="50"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Number:
                            <input
                                disabled={this.props.instructor}
                                id="course-number"
                                className="form-control form-text form-center"
                                name="courseNumber"
                                value={this.state.courseNumber}
                                type="number"
                                placeholder="Number"
                                required={true}
                                onChange={this.handleNewCourseChange}
                                min="0"
                                max="999"
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Prefix:
                            <input
                                disabled={this.props.instructor}
                                id="course-prefix"
                                className="form-control form-text form-center"
                                name="coursePrefix"
                                value={this.state.coursePrefix}
                                type="text"
                                placeholder="Prefix"
                                required={true}
                                size="10"
                                maxLength="10"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Number of Credits:
                            <input
                                disabled={this.props.instructor}
                                id="course-credits"
                                className="form-control form-text form-center"
                                name="courseCredits"
                                value={this.state.courseCredits}
                                type="number"
                                placeholder="Credits"
                                required={true}
                                min="1"
                                max="9"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Course Prerequisites:
                            <input
                                disabled={this.props.instructor}
                                id="course-prereqs"
                                className="form-control form-text form-center"
                                name="coursePrerequisites"
                                value={this.state.coursePrerequisites}
                                type="text"
                                placeholder="Prerequisites"
                                required={true}
                                size="100"
                                maxLength="100"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Name:
                            <input
                                disabled={this.props.instructor}
                                id="course-instructorname"
                                className="form-control form-text form-center"
                                name="courseInstructor"
                                value={this.state.courseInstructor}
                                type="text"
                                placeholder="Instructor"
                                required={true}
                                size="50"
                                maxLength="50"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Instructor Email:
                            <input
                                disabled={this.props.instructor}
                                id="course-instructoremail"
                                className="form-control form-text form-center"
                                name="courseEmail"
                                value={this.state.courseEmail}
                                type="text"
                                size="35"
                                placeholder="Enter Email Address"
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                                required={true}
                                onChange={this.handleNewCourseChange}
                            />
                        </label>

                        <p></p>
                        <label>
                            Semester:
                            <select name="courseSemester" id="select-semester"
                                className="form-control"
                                value={this.state.courseSemester}
                                required={false}
                                onChange={this.handleNewCourseChange}>
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                                <option value="Winter">Winter</option>
                            </select>
                        </label>

                        <p></p>
                        <label>
                            Year:
                            <input
                                id="course-year"
                                className="form-control form-text form-center"
                                name="courseYear"
                                value={this.state.courseYear}
                                type="number"
                                required={false}
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Students:
                            <input
                                id="course-students"
                                className="form-control form-text form-center"
                                name="courseStudents"
                                value={this.state.courseStudents}
                                type="number"
                                required={false}
                                placeholder="Enter number of students"
                                onChange={this.handleNewCourseChange}
                            />
                        </label>
                        <br />
                        <button role="submit"
                            id="course-submit"
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            style={{ marginTop: "15px", marginBottom: "70px" }}>
                            <span className={this.state.faIcon}></span>&nbsp;{this.state.btnLabel}
                        </button>
                        {this.props.mode === AppMode.COURSES_EDITCOURSE ?
                            <button id="delete-course" type="button" style={{ width: "40%", fontSize: "36px" }}
                                className="btn btn-primary btn-color-theme"
                                onClick={this.props.menuOpen ? null : () =>
                                    this.confirmDelete(this.state._id)}>
                                <span className="fa fa-times">Delete Course</span></button>
                            : null}
                    </center>
                </form>
                {this.state.showConfirmDelete ?
                    <ConfirmDeleteCourse
                        close={() => this.setState({ showConfirmCourse: false })}
                        deleteCourse={this.deleteCourse} /> : null}
            </div>
        );
    }
}

export default CoursesForm;