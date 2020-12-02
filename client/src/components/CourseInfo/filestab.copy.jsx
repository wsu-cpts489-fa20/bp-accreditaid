import React from 'react';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    deleteFile = (id, name) => {

    }

    uploadFile = (file) => {

        // add file to FormData object
        const fd = new FormData();
        fd.append('file', file);
    
        // send `POST` request
        fetch("/api/s3", {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    onSubmit = (event) =>{
        console.log(this.fileInput.current.files[0]);
        event.preventDefault()
        this.uploadFile(this.fileInput.current.files[0])
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
          );
    }

    render() {

        let courseSyllabus = this.props.course.courseSyllabus
        let courseRoster = this.props.course.courseRoster
        let courseSchedule = this.props.course.courseSchedule

        const SyllabusDiv = (<div>
            <h4> Course Syllabus</h4>
            this.props.course.courseSyllabus.id
        </div>)

        const ScheduleDiv = (<div>
                    <h4> Course Schedule</h4>
                    this.props.course.courseSchedule.id
                </div>)

        const RosterDiv = (<div>
                    <h4> Course Roster</h4>
                    this.props.course.courseRoster.id
                </div>)        

        if(courseSyllabus == undefined){
            SyllabusDiv = (<div>
                <h4>Course Syllabus</h4>
                <form onSubmit={this.onSubmit}>
                    <input type="file" id="myFile" name="file" ref={this.fileInput}></input>
                    <button type="submit">Upload</button> 
                </form>
                
            </div>) 
        }

        if(courseSchedule == undefined){
            ScheduleDiv = (<div>
                <h4>Course Syllabus</h4>
                <form onSubmit={this.onSubmit}>
                    <input type="file" id="myFile" name="file" ref={this.fileInput}></input>
                    <button type="submit">Upload</button> 
                </form>
                
            </div>) 
        }

        if(courseRoster == undefined){
            RosterDiv = (<div>
                <h4>Course Syllabus</h4>
                <form onSubmit={this.onSubmit}>
                    <input type="file" id="myFile" name="file" ref={this.fileInput}></input>
                    <button type="submit">Upload</button> 
                </form>
                
            </div>) 
        }
        

        return(
            <div>
                CourseFiles
                <div>
                    

                </div>

            </div>


        )
    }
}
export default CourseFiles;