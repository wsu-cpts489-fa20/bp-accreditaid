import React from 'react';
import ViewDeliverable from './ViewDeliverable.jsx';

class CourseDeliverablesTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ViewDeliverable: false
        }
    }

    openDeliverable = () => {
        this.setState({ViewDeliverable : true});
    }

    closeDeliverable = () => {
        this.setState({ViewDeliverable : false});
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.course.courseDeliverables.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.course.courseDeliverables[p].deliverableName}</td>
                    <td>
                    <a href={"/api/s3?id=" + this.props.course.courseDeliverables[p].id + "&name=" + this.props.course.courseDeliverables[p].name} className="btn btn-primary" > 
                        <i className="fa fa-download"></i> Download</a>
                    </td>
                    <td>
                    <button onClick={()=>{this.openDeliverable()}} className="btn btn-danger" ><i className="fa fa-trash"/> View </button>
                    </td>
                </tr> 
            );
        }
        return table;
    }

    render() {
        return (
        <div>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    <th>Deliverable Name</th>
                    <th>Prompt</th>
                    <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.course.courseDeliverables === null || this.props.course.courseDeliverables.length === 0 ? 
                    <tr>
                    <td colSpan="3" style={{fontStyle: "italic"}}>No Deliverables Found for course</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
            {this.state.ViewDeliverable ?  
            <ViewDeliverable close={this.closeDeliverable()}/>: null}
        </div>
        );
    }

}
export default CourseDeliverablesTab;