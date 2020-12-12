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

    caclulateTotalSOs = (courseSOsToCalculate) => {
        let totalSOs = 0;
        let deliverables = courseSOsToCalculate.courseDeliverables;
        for(let i = 0; i < deliverables.length; i++)
        {
            totalSOs += deliverables[i].SOs.length;
        }
        return totalSOs;
    }

    getDeliverablePercentage = (deliverableToCalculate) => {
        //combination of work samples that have been completed and the prompt if it is completed
        let completeMaterial = 0;
        //our total to divide by. we start at one for the prompt.
        let totalMaterial = 1;
        //first check if the prompt is complete
        if(deliverableToCalculate.prompt != null)
        {
            completeMaterial += 1;
        }
        //check to see work sample complition
        for(let i = 0; i < deliverableToCalculate.studentWorkSamples.length; i++)
        {
            if(deliverableToCalculate.studentWorkSamples[i].file != null)
            {
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
        for(let deliverableCount = 0; deliverableCount < deliverables.length; deliverableCount++)
        {
            totalDeliverables += 1;
            //this is the given deliverable for a course that we need to calculate its % complete
            totalDeliverablePercentage += this.getDeliverablePercentage(deliverables[deliverableCount]);
        }
        //finally we can calculate how complete all our deliverables are for the course
        //protect from divide by 0 error
        if(totalDeliverables == 0){
            deliverablesComplition = 100;
        }
        else{
            deliverablesComplition = totalDeliverablePercentage / totalDeliverables;
        }
        // ------------ CALCULATE DELIVERABLES % END ------------ //
        // ------------ CALCULATE SYLUBUS, ROSTER, SCHEDUAL, MATERIALS, and READINGS % START ------------ //
        let completeCourseInfo = 0;
        let courseInfoCompletion = 0;
        if(courseToCalculate.courseSyllabus != null)
        {
            completeCourseInfo += 1;
        }
        if(courseToCalculate.courseSchedule != null)
        {
            completeCourseInfo += 1;
        }
        if(courseToCalculate.courseRoster != null)
        {
            completeCourseInfo += 1;
        }
        if(courseToCalculate.courseReadings.length != 0 && courseToCalculate.courseReadings != undefined)
        {
            completeCourseInfo += 1;
        }
        if(courseToCalculate.courseMaterials.length != 0 && courseToCalculate.courseMaterials != undefined)
        {
            completeCourseInfo += 1;
        }
        //finally get the total % completed of the courseInfo
        courseInfoCompletion = (completeCourseInfo / 5) * 100;
        // ------------ CALCULATE SYLUBUS, ROSTER, SCHEDUAL, MATERIALS, and READINGS % END ------------ //
        // ------------ Finally ready to calculate total course completion ------------ //
        courseComplition = (deliverablesComplition + courseInfoCompletion) / 2;
        return courseComplition;
    }

    setRowColor = (completion) => {
        console.log(completion);
        let rowColor = "";
        if(completion == 0)
        {
            rowColor = "#981e32";
        }
        else if(completion == 100)
        {
            rowColor = "green";
        }
        else
        {
            rowColor = "yellow";
        }
        return rowColor;
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.courses.length; ++p) {
            let courseComplition = this.calculateCourseComplition(this.props.courses[p]);
            table.push(
                <tr key={p} bgcolor={this.setRowColor(courseComplition)}>
                    <td>{this.props.courses[p].courseName}</td>
                    <td>{this.props.courses[p].courseNumber}</td>
                    <td>{this.props.courses[p].coursePrefix}</td>
                    <td>{this.props.courses[p].courseCredits}</td>
                    <td>{this.props.courses[p].coursePrerequisites}</td>
                   
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
                    <td>{courseComplition}%</td>
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
