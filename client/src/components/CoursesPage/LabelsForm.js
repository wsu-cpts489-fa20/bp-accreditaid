import React from 'react';

class LabelsForm extends React.Component {
    
    constructor(props) {
        super(props);
        var labels = []
        if (props.labels != null && props.labels.length > 0)
        {
            labels = props.labels;
        }

        this.state = {
                        labels: labels,
                     };    
    }

    handleLabelChange = (event) => {
        let index = parseInt(event.target.name);
        let updatedLabels = [...this.state.labels];
        updatedLabels[index] = event.target.value;
        this.props.updateLabels(updatedLabels);
        this.setState({labels: updatedLabels});
    }

    addLabel = (event) => {
        let newLabel = "None";
        var updatedLabels = [...this.state.labels, newLabel];
        this.setState({
          labels: updatedLabels,
        });
        this.props.updateLabels(updatedLabels);
        event.preventDefault();
    }

    deleteLabel = (index) => {
        let updatedLabels = [...this.state.labels];
        updatedLabels.splice(index, 1);
        this.props.updateLabels(updatedLabels);
        this.setState({labels: updatedLabels});
    }

    renderLabels = () => {
        const labels = []
        for (let i = 0; i < this.state.labels.length; ++i) {
            let labelName = i;
            labels.push(
                <div style={{display: "flex", justifyContent: "space-around",
                    width: "30%"}} id={"label-" + i}>
                    <label>
                        <input
                            id={"performance-labels-"+i}
                            className="form-control form-text form-center"
                            name={labelName}
                            value={this.state.labels[i]}
                            type="text"
                            placeholder="Enter Label"
                            required={true}
                            size="41" 
                            maxLength="50"
                            onChange={this.handleLabelChange}
                        />
                    </label>
                    <br></br>
                    <div className={"delete-label"} id={"delete-label-"+i} onClick={() => this.deleteLabel(i)}
                        style={{paddingTop: "10px"}}>
                        <span className="fa fa-minus-square"></span>
                    </div>
                </div>
            );
        }
        return labels;
    }

    render() {
        return(
            <div id="labels-form">
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <div style={{display: "flex", 
                            justifyContent: "space-around", width: "25%"}}>
                            <p style={{paddingTop: "12px"}}>
                                Work Sample Labels:
                            </p>
                            <br/>
                            <button id="add-label" onClick={this.addLabel}
                                className="btn btn-primary btn-color-theme modal-submit-btn"
                                style={{height: "30px", width: "150px", 
                                    borderRadius: "15px", fontSize: "13px",
                                    marginTop: "10px", marginBottom: "15px"}}>
                                Add Label
                            </button>
                        </div>
                        {this.renderLabels()}
                        <br/>
                    </center>
                </form>
            </div>
        );
    }
    
}

export default LabelsForm;