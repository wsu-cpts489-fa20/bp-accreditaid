import React from 'react';
import AppMode from '../../AppMode.js';

class CoursesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showConfirm: false};
    }

    editCourse = (id) => {
        this.props.setEditId(id);
        this.props.changeMode(AppMode.COURSE_INFO, {course: this.props.courses[id], prevMode: AppMode.COURSES});
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.courses.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.courses[p].courseName}</td>
                    <td>{this.props.courses[p].courseNumber}</td>
                    <td>{this.props.courses[p].coursePrefix}</td>
                    <td>{this.props.courses[p].courseCredits}</td>
                    <td>{this.props.courses[p].coursePrerequisites}</td>
                    <td>{this.props.courses[p].sos}</td>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <td>
                            <button 
                                id={"deliverables-" + p}
                                onClick={this.props.menuOpen ? null : () => 
                                    this.props.changeMode(AppMode.DELIVERABLES, {course: this.props.courses[p], prevMode: AppMode.COURSES})}>
                                <span className="fa fa-files-o"></span>
                            </button>
                        </td>
                    : null}
                    <td>{this.props.courses[p].completion} %</td>
                    <td>{this.props.courses[p].courseInstructor}</td>
                    <td>{this.props.courses[p].courseEmail}</td>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <td><input type={"checkbox"} onClick={()=>{console.log("Toggled a checkbox!"); this.props.toggleEmailSelected(p)} } /></td>
                    : null}
                    <td>
                        <button 
                            id={"course-edit-" + p}
                            onClick={this.props.menuOpen ? null : () => 
                            this.editCourse(p)}>
                            <span className="fa fa-eye"></span>
                        </button>
                    </td>
                </tr> 
            );
        }
        return table;
    }

    render() {
        console.log("Calling render for coursesTable");
        return (
        <div>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                    <th>Course Name</th>
                    <th>Number</th>
                    <th>Prefix</th>
                    <th>Credits</th>
                    <th>Prerequisites</th>
                    <th>SOs</th>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <th>Deliverables</th>
                    : null}
                    <th>Completion</th>
                    <th>Instructor</th>
                    <th>Email</th>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <th>Invite?</th>
                    : null}
                    <th>View/Edit...</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.courses).length === 0 ? 
                    <tr>
                    <td colSpan="12" style={{fontStyle: "italic"}}>No courses created</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }
}

export default CoursesTable;
