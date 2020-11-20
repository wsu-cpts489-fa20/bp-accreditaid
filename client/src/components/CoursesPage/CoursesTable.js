import React from 'react';
import AppMode from '../../AppMode.js';

class CoursesTable extends React.Component {

    constructor() {
        super();
        this.state = {showConfirm: false};
    }

    editCourse = (id) => {
        this.props.setEditId(id);
        this.props.changeMode(AppMode.COURSES_EDITCOURSE);
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
                    <td>{this.props.courses[p].deliverables}</td>
                    <td>{this.props.courses[p].completion}</td>
                    <td>{this.props.courses[p].courseInstructor}</td>
                    <td>{this.props.courses[p].courseEmail}</td>
                    <td>
                        <button 
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
        return (
        <div>
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Course Name</th>
                    <th>Number</th>
                    <th>Prefix</th>
                    <th>Credits</th>
                    <th>Prerequisites</th>
                    <th>SOs</th>
                    <th>Deliverables</th>
                    <th>Completion</th>
                    <th>Instructor</th>
                    <th>Email</th>
                    <th>View/Edit...</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.courses).length === 0 ? 
                    <tr>
                    <td colSpan="8" style={{fontStyle: "italic"}}>No courses created</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }
}

export default CoursesTable;
