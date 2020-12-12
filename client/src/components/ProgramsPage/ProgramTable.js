import React from 'react';
import AppMode from '../../AppMode.js';

class ProgramTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showConfirmDelete: false,
      programInfo: {}
    };
  }

  componentDidMount() {

  }

  async fetchProgramData(programID) {
    if (this.props.programs == null || this.props.programs.length == 0) {
      return;
    }
    if(this.state.programInfo[programID] != null)
    {
      return;
    }
    const url = '/api/courses/program/' + programID;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    if (res.status != 200) {
      const msg = await res.text();
      console.log(msg);
    } else {
      const msg = await res.json();
      let localProgramInfo = this.state.programInfo;
      let courses = JSON.parse(msg);
      let totalCourses = courses.length;
      let totalInstructors = this.getTotalInstructors(courses);
      let programCompletion = this.caclualteProgramCompletion(courses);
      let courseInfo = [];
      courseInfo.push(totalCourses);
      courseInfo.push(totalInstructors);
      courseInfo.push(programCompletion);
      localProgramInfo[programID] = courseInfo;
      this.setState({ programInfo: localProgramInfo });
    }
  }

  getTotalInstructors = (coursesToCalculate) => {
    let totalInstructors = [];
    for (let course = 0; course < coursesToCalculate.length; course++) {
      if (!totalInstructors.includes(coursesToCalculate[course].courseInstructor)) {
        totalInstructors.push(coursesToCalculate[course].courseInstructor);
      }
    }
    return totalInstructors.length;
  }

  caclualteProgramCompletion = (coursesToCalculate) => {
    let totalCourses = coursesToCalculate.length;
    let coursesCompletionTotal = 0;
    for (let course = 0; course < coursesToCalculate.length; course++) {
      coursesCompletionTotal += this.calculateCourseComplition(coursesToCalculate[course]);
    }
    return (coursesCompletionTotal / totalCourses);
  }

  getDeliverablePercentage = (deliverableToCalculate) => {
    //combination of work samples that have been completed and the prompt if it is completed
    let completeMaterial = 0;
    //our total to divide by. we start at one for the prompt.
    let totalMaterial = 1;
    //first check if the prompt is complete
    if (deliverableToCalculate.prompt != null) {
      completeMaterial += 1;
    }
    //check to see work sample complition
    for (let i = 0; i < deliverableToCalculate.studentWorkSamples.length; i++) {
      if (deliverableToCalculate.studentWorkSamples[i].file != null) {
        completeMaterial += 1;
      }
      totalMaterial += 1;
    }
    return (completeMaterial / totalMaterial) * 100;
  }

  calculateCourseComplition = (courseToCalculate) => {
    let courseComplition = 0;
    // ------------ CALCULATE DELIVERABLES % START ------------ //
    let deliverables = courseToCalculate.courseDeliverables;
    //running total of deliverable % complition
    let totalDeliverablePercentage = 0;
    //total amount of deliverables
    let totalDeliverables = 0;
    //ending result that gives us how much of our deliverables is completed
    let deliverablesComplition = 0;
    //for each deliverable we need to calculate its % complete
    for (let deliverableCount = 0; deliverableCount < deliverables.length; deliverableCount++) {
      totalDeliverables += 1;
      //this is the given deliverable for a course that we need to calculate its % complete
      totalDeliverablePercentage += this.getDeliverablePercentage(deliverables[deliverableCount]);
    }
    //finally we can calculate how complete all our deliverables are for the course
    //protect from divide by 0 error
    if (totalDeliverables == 0) {
      deliverablesComplition = 100;
    }
    else {
      deliverablesComplition = totalDeliverablePercentage / totalDeliverables;
    }
    // ------------ CALCULATE DELIVERABLES % END ------------ //
    // ------------ CALCULATE SYLUBUS, ROSTER, SCHEDUAL, MATERIALS, and READINGS % START ------------ //
    let completeCourseInfo = 0;
    let courseInfoCompletion = 0;
    if (courseToCalculate.courseSyllabus != null) {
      completeCourseInfo += 1;
    }
    if (courseToCalculate.courseSchedule != null) {
      completeCourseInfo += 1;
    }
    if (courseToCalculate.courseRoster != null) {
      completeCourseInfo += 1;
    }
    if (courseToCalculate.courseReadings.length != 0 && courseToCalculate.courseReadings != undefined) {
      completeCourseInfo += 1;
    }
    if (courseToCalculate.courseMaterials.length != 0 && courseToCalculate.courseMaterials != undefined) {
      completeCourseInfo += 1;
    }
    //finally get the total % completed of the courseInfo
    courseInfoCompletion = (completeCourseInfo / 5) * 100;
    // ------------ CALCULATE SYLUBUS, ROSTER, SCHEDUAL, MATERIALS, and READINGS % END ------------ //
    // ------------ Finally ready to calculate total course completion ------------ //
    courseComplition = (deliverablesComplition + courseInfoCompletion) / 2;
    return courseComplition;
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
      console.log(this.props.programs[p]);  
      this.fetchProgramData(this.props.programs[p]._id);
      let programData = [];
      if(this.state.programInfo[this.props.programs[p]._id] != null)
      {
        programData = this.state.programInfo[this.props.programs[p]._id];
      }
      table.push(
        <tr key={p}>
          <td>{this.props.programs[p].name}</td>
          <td>{this.props.programs[p].department}</td>
          <td>{this.props.programs[p].college}</td>
          <td>{this.props.programs[p].credits}</td>
          <td>{programData[0]}</td>
          <td>{programData[1]}</td>
          <td>{programData[2]} %</td>
          <td><button className="btn btn-color-theme" id={"program-edit-" + p} onClick={this.props.menuOpen ? null : () =>
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
    console.log(this.props)
    return (
      <div id="programs-table">
        <h1></h1>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">College</th>
              <th scope="col">Credits</th>
              <th scope="col">Courses</th>
              <th scope="col">Instructors</th>
              <th scope="col">Completion</th>
              <th scope="col">View/Edit...</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.programs).length === 0 ?
              <tr scope="row">
                <td colSpan="8" style={{ fontStyle: "italic" }}>No programs created</td>
              </tr> : this.renderTable()
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProgramTable;
