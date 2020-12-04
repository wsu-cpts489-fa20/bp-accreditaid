import React from 'react';

class CourseMaterialsTab extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.course.courseMaterials.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.course.courseMaterials[p].name}</td>
                    <td>
                    <a href={"/api/s3?id=" + this.props.course.courseMaterials[p].id + "&name=" + this.props.course.courseMaterials[p].name} className="btn btn-primary" > 
                        <i className="fa fa-download"></i> Download</a>
                    </td>
                    <td>
                    <button onClick={()=>{this.props.deleteFile(this.props.course.courseMaterials[p].id, this.props.course.courseMaterials[p].name, 
                        this.props.deleteInDatabase_array, "courseMaterials", p)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                    </td>
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
        console.log(type);
        this.props.uploadFile(event.target['file'].files[0], this.props.upload_array, type)
    }

    render() {
        return (
        <div>
            <form onSubmit={e => this.onSubmit(e, "courseMaterials")}>
                <input className="form-control-file" type="file"  name="file" ></input>
                <button className="btn btn-success" name="courseMaterials" type="submit">Upload</button> 
            </form>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Material Name</th>
                    <th>Download</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.course.courseMaterials === null || this.props.course.courseMaterials.length === 0 ? 
                    <tr>
                    <td colSpan="3" style={{fontStyle: "italic"}}>No Materials Uploaded</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }
}
export default CourseMaterialsTab;