import React from 'react';
import AppMode from '../../AppMode.js';

class CourseTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showConfirmDelete: false};
  }

  //renderTable -- render an HTML table displaying the courses logged
  //by the current user and providing buttons to view/edit and delete each Course.
  renderTable = () => {
  let table = [];
  for (let p = 0; p < this.props.courses.length; ++p) {
    table.push(
      <tr key={p}>
        <td>{this.props.courses[p].courseName}</td>
        <td>{this.props.courses[p].courseNumber}</td>
        <td>{this.props.courses[p].coursePrefix}</td>
        <td><button id={"Course-info-" + p} className="btn btn-outline-primary" onClick={()=>{ this.props.changeMode(AppMode.COURSE_INFO, {course: this.props.courses[p], prevMode: AppMode.INSTRUCTOR_DASHBOARD})}}>
              <span className="fa fa-file-text"></span></button></td>
      </tr> 
    );
  }
  return table;
  }

  //render--render the entire Course table with header, displaying a "No
  //courses Logged" message in case the table is empty.
  render() {
    return(
    <div id="courses-table" className="padded-page">
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th> Number</th>
          <th> Prefix</th>
          <th>Course Info</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.courses).length === 0 ? 
          <tr>
          <td colSpan="8" style={{fontStyle: "italic"}}>No courses have been assigned to you.</td>
          </tr> : this.renderTable()
          }
        </tbody>
      </table>
    </div>
    );
  }
}

export default CourseTable;
