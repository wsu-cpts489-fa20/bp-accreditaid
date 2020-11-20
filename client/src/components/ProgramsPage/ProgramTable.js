import React from 'react';
import AppMode from '../../AppMode.js';

class ProgramTable extends React.Component {

  constructor() {
    super();
    this.state = {showConfirmDelete: false};
  }

  //editProgram -- Triggered when the user clicks the edit button for a given
  //program. The id param is the unique property that identifies the program.
  //Set the state variable representing the id of the program to be edited and
  //then switch to the PROGRAMS_EDITPROGRAM mode to allow the user to edit the
  //chosen program.
  editProgram = (index) => {
    this.props.setCurrentProgram(this.props.programs[index]._id, index)
    this.props.changeMode(AppMode.PROGRAMS_EDITPROGRAM);
  }

  //renderTable -- render an HTML table displaying the programs logged
  //by the current user and providing buttons to view/edit and delete each program.
  renderTable = () => {
  let table = [];
  for (let p = 0; p < this.props.programs.length; ++p) {
    table.push(
      <tr key={p}>
        <td>{this.props.programs[p].name}</td>
        <td>{this.props.programs[p].department}</td>
        <td>{this.props.programs[p].college}</td>
        <td>{this.props.programs[p].credits}</td>
        <td>{this.props.programs[p].courses}</td>
        <td>{this.props.programs[p].instructors}</td>
        <td>{this.props.programs[p].completion} %</td>
        <td><button onClick={this.props.menuOpen ? null : () => 
          this.editProgram(p)}>
              <span className="fa fa-eye"></span></button></td>
      </tr> 
    );
  }
  return table;
  }

  //render--render the entire program table with header, displaying a "No
  //Programs Logged" message in case the table is empty.
  render() {
    return(
    <div id="programs-table" className="padded-page">
      <h1></h1>
      <table className="table table-hover">
        <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>College</th>
          <th>Credits</th>
          <th>Courses</th>
          <th>Instructors</th>
          <th>Completion</th>
          <th>View/Edit...</th>
        </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.programs).length === 0 ? 
          <tr>
          <td colSpan="8" style={{fontStyle: "italic"}}>No programs created</td>
          </tr> : this.renderTable()
          }
        </tbody>
      </table>
    </div>
    );
  }
}

export default ProgramTable;
