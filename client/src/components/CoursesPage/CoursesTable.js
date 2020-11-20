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

    confirmDelete = () => {
        this.props.deleteCourse();
        this.setState({showConfirm: false});
    }

    toggleConfirm = (id) => {
        this.props.setDeleteId(id);
        this.setState(prevState => ({showConfirm: !prevState.showConfirm}));
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.courses.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.courses[p].name}</td>
                    <td>{this.props.courses[p].number}</td>
                    <td>{this.props.courses[p].prefix}</td>
                    <td>{this.props.courses[p].credits}</td>
                    <td>{this.props.courses[p].prerequisites}</td>
                    <td>{this.props.courses[p].sos}</td>
                    <td>{this.props.courses[p].deliverables}</td>
                    <td>{this.props.courses[p].instructor}</td>
                    <td>{this.props.courses[p].email}</td>
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
                    <th>Instructor</th>
                    <th>Email</th>
                    <th>View/Edit...</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="10" style={{fontStyle: "italic"}}>
                            No courses added
                        </td>
                    </tr> 
                </tbody>
            </table>
        </div>
        );
    }
}

export default CoursesTable;
