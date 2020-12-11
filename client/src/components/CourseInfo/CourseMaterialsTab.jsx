import React from 'react';
import DragAndDrop from '../common/DragAndDrop';

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
                    <a href={"/api/s3?id=" + this.props.course.courseMaterials[p].id + "&name=" + this.props.course.courseMaterials[p].name} className="btn btn-alt-color-theme" > 
                        <i className="fa fa-download"></i> Download</a>
                    </td>
                    {this.props.userObj.accountType != "ABET Evaluator" ?
                        <td>
                        <button onClick={()=>{this.props.deleteFile(this.props.course.courseMaterials[p].id, this.props.course.courseMaterials[p].name, 
                            this.props.deleteInDatabase_array, "courseMaterials", p)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
                        </td>
                    : null }
                </tr> 
            );
        }
        return table;
    }

    onSubmit = (files, type) =>{
        this.props.uploadFile(files[0], this.props.upload_array, type)
    }

    render() {
        return (
        <div>
            {this.props.userObj.accountType != "ABET Evaluator" ?
                <DragAndDrop className="material-files" UploadFile={(e) => this.onSubmit(e, "courseMaterials")} />
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