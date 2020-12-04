import React from 'react';
import AppMode from '../../AppMode.js';

class DeliverablesTable extends React.Component {

    getHeader = () => {
        let labels = this.props.labels;
        let headers = []
        headers.push(<th>Name</th>);
        headers.push(<th>Description</th>);
        for (let i = 0; i < labels.length; i++) {
            headers.push(<th>{labels[i]}</th>);
        }
        headers.push(<th>View/Edit...</th>);
        return headers;
    }

    renderTable = () => {
        console.log(this.props.deliverables);
        let table = [];
        for (let p = 0; p < this.props.deliverables.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{this.props.deliverables[p].deliverableName}</td>
                    <td>{this.props.deliverables[p].description}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
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

    render() {
        return (
        <div>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-light">
                    <tr>
                    {this.getHeader()}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.deliverables).length === 0 ? 
                    <tr>
                    <td colSpan={this.props.labels.length + 3} style={{fontStyle: "italic"}}>No deliverables added yet</td>
                    </tr> : this.renderTable()
                    }
                </tbody>
            </table>
        </div>
        );
    }

}

export default DeliverablesTable;