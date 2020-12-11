import React from 'react';
import ViewDeliverable from './ViewDeliverable.jsx';
class CourseDeliverablesTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ViewDeliverable: false,
            deliverableInformation: null,
            openDeliverableIndex: null
        }
    }

    openDeliverable = (deliverableToView, index) => {
        this.setState({deliverableInformation: deliverableToView});
        this.setState({openDeliverableIndex: index});
        this.setState({ViewDeliverable : true});
        console.log("Opening Deliverable");
    }

    closeDeliverable = () => {
        this.setState({ViewDeliverable : false});
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
        console.log(deliverableToCalculate.studentWorkSamples);
        //check to see work sample complition
        for(let i = 0; i < deliverableToCalculate.studentWorkSamples.length; i++)
        {
            if(deliverableToCalculate.studentWorkSamples[i].file != null)
            {
                completeMaterial += 1;
            }
            totalMaterial += 1;
        }
        console.log("total items = " + totalMaterial);
        console.log("complete items = " + completeMaterial);
        return (completeMaterial / totalMaterial) * 100;
    }

    renderTable = () => {
        let table = [];
        for (let p = 0; p < this.props.course.courseDeliverables.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.course.courseDeliverables[p].deliverableName}</td>
                    <td>                   
                    <button onClick={()=>this.openDeliverable(this.props.course.courseDeliverables[p], p)} className="btn btn-danger" > View </button>
                    </td>
                    <td>  
                    {this.getDeliverablePercentage(this.props.course.courseDeliverables[p])}%
                    </td>                
                </tr> 
            );
        }
        return table;
    }

    render() {
        console.log(this.state.ViewDeliverable);
        return (
        <div>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                    <th>Deliverable Name</th>
                    <th>View</th>
                    <th>Progress</th>
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
            <ViewDeliverable 
                userObj={this.props.userObj}
                close={() => this.closeDeliverable()}
                course={this.props.course}
                deliverable={this.state.deliverableInformation}
                index={this.state.openDeliverableIndex}
                deleteFile={this.props.deleteFile}
                uploadFile={this.props.uploadFile}
                upload_prompt={this.props.upload_prompt}
                deleteInDatabase_prompt={this.props.deleteInDatabase_prompt}
                upload_workSample={this.props.upload_workSample}
                deleteInDatabase_workSample={this.props.deleteInDatabase_workSample}
            />: null}
        </div>
        );
    }

}
export default CourseDeliverablesTab;