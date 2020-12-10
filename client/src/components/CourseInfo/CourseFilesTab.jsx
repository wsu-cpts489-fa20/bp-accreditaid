import React from 'react';
import DragAndDrop from '../common/DragAndDrop';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
    }

    onSubmit = (files, type) =>{
        console.log("on sumbit!")
        console.log("files array" + files);
        this.props.uploadFile(files[0], this.props.upload_single, type)
        alert(
            `Selected file - ${files[0].name}`
          );
    }

    render() {

        let courseSyllabus = this.props.course.courseSyllabus
        let courseRoster = this.props.course.courseRoster
        let courseSchedule = this.props.course.courseSchedule

        var SyllabusDiv =(<div>
            <h4>Course Syllabus</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <DragAndDrop UploadFile={(e) => this.onSubmit(e, "courseSyllabus")} />
            : null }
            
        </div>)  

        var ScheduleDiv =(<div>
            <h4>Course Schedule</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <form onSubmit={e => this.onSubmit(e, "courseSchedule")}>
                    <input className="form-control-file"  type="file"  name="file" ></input>
                    <button className="btn btn-color-theme" name="courseSchedule" type="submit">Upload</button> 
                </form>
            : null }
            
        </div>) 

        var RosterDiv =(<div>
            <h4>Course Roster</h4>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <form onSubmit={e => this.onSubmit(e, "courseRoster")}>
                    <input className="form-control-file" type="file"  name="file" ></input>
                    <button className="btn btn-color-theme" name="courseRoster" type="submit">Upload</button> 
                </form>
            : null }
            
        </div>)       

        if(courseSyllabus != null){
            SyllabusDiv = (<div>
                <h4> Course Syllabus</h4>
                    <a href={"/api/s3?id=" + courseSyllabus.id + "&name=" + courseSyllabus.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <button onClick={()=>{this.props.deleteFile(courseSyllabus.id, courseSyllabus.name, this.props.deleteInDatabase_single, "courseSyllabus")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    : null }
            </div>)
        }

        if(courseSchedule != null){
            ScheduleDiv =  (<div>
                <h4> Course Schedule</h4>
                    <a href={"/api/s3?id=" + courseSchedule.id + "&name=" + courseSchedule.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <button onClick={()=>{this.props.deleteFile(courseSchedule.id, courseSchedule.name, this.props.deleteInDatabase_single, "courseSchedule")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    : null }
            </div>)
        }

        if(courseRoster != null){
            RosterDiv = (<div>
                <h4> Course Roster</h4>
                    <a href={"/api/s3?id=" + courseRoster.id + "&name=" + courseRoster.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
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