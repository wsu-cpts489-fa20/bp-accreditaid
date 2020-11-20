import React from 'react';
//import AddCourse from './AddCourse.js';

class CoursesTable extends React.Component {

    constructor() {
        super();
        this.state = {
            addCourseDialog : false
        };
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
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        );
    }
}

export default CoursesTable;
