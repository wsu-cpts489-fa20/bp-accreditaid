import React from 'react';
import AppMode from '../../AppMode.js';

class DeliverablesTable extends React.Component {

    getHeader = () => {
        let studentWorkSamples = this.props.labstudentWorkSamplesels;
        let headers = []
        headers.push(<th>Name</th>);
        headers.push(<th>Description</th>);
        headers.push(<th>Work Sample Labels</th>)
        headers.push(<th>Completion</th>)
        headers.push(<th>View/Edit...</th>);
        return headers;
    }

    displayStudentWorkSamples = (studentWorkSamples) => {
        let result = []
        if (studentWorkSamples.length == 0) {
            result.push(<td>N/A</td>);
        } else {
            let labelString = "";
            for (let i = 0; i < studentWorkSamples.length - 1; i++) {
                labelString = labelString + studentWorkSamples[i].importance + ", "
            }
            labelString = labelString + studentWorkSamples[studentWorkSamples.length - 1].importance;
            result.push(<td>{labelString}</td>)
        }
        return result;
    }

    renderTable = () => {
        let table = [];
        let deliverables = [...this.props.deliverables];
        for (let p = 0; p < deliverables.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{deliverables[p].deliverableName}</td>
                    <td>{deliverables[p].description}</td>
                    {this.displayStudentWorkSamples(deliverables[p].studentWorkSamples)}
                    <td>0%</td>
                    <td>
                        <button 
                            id={"deliverable-edit-" + p}
                            onClick={this.props.menuOpen ? null : () => 
                            this.editDeliverable(p)}>
                            <span className="fa fa-eye"></span>
                        </button>
                    </td>
                </tr>
            );
        }
        return table;

    }

    editDeliverable = (p) => {
        this.props.editDeliverableIndex(p);
    }

    render() {
        return (
        <div>
            <table id="deliverables-table" className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                    {this.getHeader()}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.deliverables).length === 0 ? 
                    <tr>
                    <td colSpan="4" style={{fontStyle: "italic"}}>No deliverables added yet</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }

}

export default DeliverablesTable;