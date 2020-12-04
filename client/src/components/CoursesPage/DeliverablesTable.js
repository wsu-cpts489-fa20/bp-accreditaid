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

    renderRows = () => {
        let rows = []
        for (let p = 0; p < this.props.labels.length; ++p) {
            let label = this.props.labels[p]
            rows.push(
                <td>
                <input type="checkbox" id={label[p]+p}
                    name={label[p]+p} value={label[p]+p}/>
            </td>
            );
        }
        return rows;
    }

    renderTable = () => {
        let table = [];
        let deliverables = [...this.props.deliverables];
        for (let p = 0; p < deliverables.length; ++p) {
            table.push(
                <tr key={p}>
                    <td>{deliverables[p].deliverableName}</td>
                    <td>{deliverables[p].description}</td>
                    {this.renderRows()}
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