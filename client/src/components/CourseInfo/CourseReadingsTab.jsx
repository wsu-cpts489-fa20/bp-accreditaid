import React from 'react';

class CourseReadingsTab extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.course.courseReadings.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.course.courseReadings[p].name}</td>
                    <td>
                    <a href={"/api/s3?id=" + this.props.course.courseReadings[p].id + "&name=" + this.props.course.courseReadings[p].name} className="btn btn-primary" > 
                        <i className="fa fa-download"></i> Download</a>
                    </td>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <td>
                        <button onClick={()=>{this.props.deleteFile(this.props.course.courseReadings[p].id, this.props.course.courseReadings[p].name, 
                            this.props.deleteInDatabase_array, "courseReadings", p)}} className="btn btn-color-theme" ><i className="fa fa-trash"/> Delete </button>
                        </td>
                    : null }
                </tr> 
            );
        }
        return table;
    }

    onSubmit = (event,type) =>{
        console.log("on sumbit!")
        event.preventDefault()
        console.log("file");
        console.log("files array" + event.target.files);
        this.props.uploadFile(event.target['file'].files[0], this.props.upload_array, type)
    }

    render() {
        return (
        <div>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <form onSubmit={e => this.onSubmit(e, "courseReadings")}>
                    <input className="form-control-file" type="file"  name="file" ></input>
                    <button className="btn btn-color-theme" name="courseReadings" type="submit">Upload</button> 
                </form>
            : null }
            <table id="courses-table" className="table table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>Material Name</th>
                    <th>Download</th>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <th>Delete</th>
                    : null }
                    </tr>
                </thead>
                <tbody>
                    {this.props.course.courseReadings === null || this.props.course.courseReadings.length === 0 ? 
                    <tr>
                    <td colSpan="3" style={{fontStyle: "italic"}}>No Readings Uploaded</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }
}
export default CourseReadingsTab;