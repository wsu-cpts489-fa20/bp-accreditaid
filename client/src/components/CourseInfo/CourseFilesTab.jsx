import React from 'react';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
    }

    deleteInDatabase = (type) =>{
        let body = {};
        body[type] = null;
        console.log("body = " + body)
        
        console.log(body);
        fetch("/api/courses/" + this.props.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    deleteFile = (id, name, db_update, type) => {
        fetch(("/api/s3?id=" + id + "&name=" + name), {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => console.log("json res " +json))
        .then(() => {db_update(type)})
        .then(()=> {this.props.updateCourseState(type, null)})
        .catch(err => console.error(err));
    }

    uploadFile = (file, db_update, type) => {
        console.log("TYPE: "+ type);
        // add file to FormData object
        const fd = new FormData();
        fd.append('file', file);
    
        // send `POST` request
        fetch("/api/s3", {
            method: 'POST',
            body: fd
        })
        .then(function(res) {
            if(res.status == 200){
                return res.json();
            }
            throw res;
        })
        .then(json => {console.log(json); return json})
        .then((json) => {db_update(file, json.data.VersionId, type)})
        .catch(err => console.error(err))
    }

    upload_single = (file, id, type) => {
        console.log("upload_single has been called");
        let body = {};
        body[type] = {id: id, name: file.name};
        
        console.log(body);
        fetch("/api/courses/" + this.props.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.props.updateCourseState(type, body[type])})
        .catch(err => console.error(err));
        
    }


    onSubmit = (event,type) =>{
        console.log("on sumbit!")
        event.preventDefault()
        console.log("file");
        console.log("files array" + event.target.files);
        this.uploadFile(event.target['file'].files[0], this.upload_single, type)
        alert(
            `Selected file - ${event.target.files[0].name}`
          );
    }

    render() {

        let courseSyllabus = this.props.course.courseSyllabus
        let courseRoster = this.props.course.courseRoster
        let courseSchedule = this.props.course.courseSchedule

        var SyllabusDiv =(<div>
            <h4>Course Syllabus</h4>
            <form onSubmit={e => this.onSubmit(e, "courseSyllabus")}>
                <input className="form-control-file"  type="file"  name="file" ></input>
                <button  className="btn btn-success" name="courseSyllabus" type="submit">Upload</button> 
            </form>
            
        </div>)  

        var ScheduleDiv =(<div>
            <h4>Course Schedule</h4>
            <form onSubmit={e => this.onSubmit(e, "courseSchedule")}>
                <input className="form-control-file"  type="file"  name="file" ></input>
                <button className="btn btn-success" name="courseSchedule" type="submit">Upload</button> 
            </form>
            
        </div>) 

        var RosterDiv =(<div>
            <h4>Course Roster</h4>
            <form onSubmit={e => this.onSubmit(e, "courseRoster")}>
                <input className="form-control-file" type="file"  name="file" ></input>
                <button className="btn btn-success" name="courseRoster" type="submit">Upload</button> 
            </form>
            
        </div>)       

        if(courseSyllabus != null){
            SyllabusDiv = (<div>
                <h4> Course Syllabus</h4>
                    <a href={"/api/s3?id=" + courseSyllabus.id + "&name=" + courseSyllabus.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
                    <button onClick={()=>{this.deleteFile(courseSyllabus.id, courseSyllabus.name, this.deleteInDatabase, "courseSyllabus")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    
            </div>)
        }

        if(courseSchedule != null){
            ScheduleDiv =  (<div>
                <h4> Course Schedule</h4>
                <a href={"/api/s3?id=" + courseSchedule.id + "&name=" + courseSchedule.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
                    <button onClick={()=>{this.deleteFile(courseSchedule.id, courseSchedule.name, this.deleteInDatabase, "courseSchedule")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
            </div>)
        }

        if(courseRoster != null){
            RosterDiv = (<div>
                <h4> Course Roster</h4>
                <a href={"/api/s3?id=" + courseRoster.id + "&name=" + courseRoster.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
                    <button onClick={()=>{this.deleteFile(courseRoster.id, courseRoster.name, this.deleteInDatabase, "courseRoster")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
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