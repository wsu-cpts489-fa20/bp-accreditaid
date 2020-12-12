import React from 'react';
import DragAndDrop from '../common/DragAndDrop';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (files, type) =>{
        this.props.uploadFile(files[0], this.props.upload_single, type)
    }

    render() {

        let courseSyllabus = this.props.course.courseSyllabus
        let courseRoster = this.props.course.courseRoster
        let courseSchedule = this.props.course.courseSchedule

        var SyllabusDiv =(<div>
            <h4>Course Syllabus</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <DragAndDrop className="course-files" UploadFile={(e) => this.onSubmit(e, "courseSyllabus")} />
            : null }
        </div>)

        var ScheduleDiv =(<div>
            <h4>Course Schedule</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <DragAndDrop className="course-files" UploadFile={(e) => this.onSubmit(e, "courseSchedule")} />
            : null }
        </div>)

        var RosterDiv =(<div>
            <h4>Course Roster</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <DragAndDrop className="course-files" UploadFile={(e) => this.onSubmit(e, "courseRoster")} />
            : null }
        </div>)

        if(courseSyllabus != null){
            SyllabusDiv = (<div>
                <h4> Course Syllabus</h4>
                    <a href={"/api/s3?id=" + courseSyllabus.id + "&name=" + courseSyllabus.name} className="btn btn-alt-color-theme" > <i className="fa fa-download"></i> Download</a>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <button onClick={()=>{this.props.deleteFile(courseSyllabus.id, courseSyllabus.name, this.props.deleteInDatabase_single, "courseSyllabus")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    : null }
            </div>)
        }

        if(courseSchedule != null){
            ScheduleDiv =  (<div>
                <h4> Course Schedule</h4>
                    <a href={"/api/s3?id=" + courseSchedule.id + "&name=" + courseSchedule.name} className="btn btn-alt-color-theme" > <i className="fa fa-download"></i> Download</a>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <button onClick={()=>{this.props.deleteFile(courseSchedule.id, courseSchedule.name, this.props.deleteInDatabase_single, "courseSchedule")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    : null }
            </div>)
        }

        if(courseRoster != null){
            RosterDiv = (<div>
                <h4> Course Roster</h4>
                    <a href={"/api/s3?id=" + courseRoster.id + "&name=" + courseRoster.name} className="btn btn-alt-color-theme" > <i className="fa fa-download"></i> Download</a>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <button onClick={()=>{this.props.deleteFile(courseRoster.id, courseRoster.name, this.props.deleteInDatabase_single, "courseRoster")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    : null }
            </div>)   
        }
        return(
            <div>
                <h3>CourseFiles</h3>
                <hr></hr>
                {SyllabusDiv} 
                <p/>
                <hr></hr>
                {RosterDiv} 
                <p/>
                <hr></hr>
                {ScheduleDiv}
            </div>


        )
    }
}
export default CourseFiles;