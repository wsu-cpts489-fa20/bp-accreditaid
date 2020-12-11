import React from 'react';

class StudentWorkSamplesForm extends React.Component {
    
    constructor(props) {
        super(props);
        var studentWorkSamples = [];
        if (props.studentWorkSamples != null && props.studentWorkSamples.length > 0)
        {
            studentWorkSamples = props.studentWorkSamples;
        }

        this.state = {
            studentWorkSamples: studentWorkSamples,
                     };    
    }

    handleSampleChange = (event) => {
        let index = parseInt(event.target.name);
        let updatedStudentWorkSamples = [...this.state.studentWorkSamples];
        updatedStudentWorkSamples[index] = {"importance": event.target.value, "file": null};
        this.props.updateStudentWorkSamples(updatedStudentWorkSamples);
        this.setState({studentWorkSamples: updatedStudentWorkSamples});
    }

    addSample = (event) => {
        let newStudentWorkSampleName = "None";
        var updatedStudentWorkSamples = [...this.state.studentWorkSamples, {"importance": newStudentWorkSampleName, "file": null}];
        this.setState({
            studentWorkSamples: updatedStudentWorkSamples,
        });
        this.props.updateStudentWorkSamples(updatedStudentWorkSamples);
        event.preventDefault();
    }

    deleteSample = (index) => {
        let updatedStudentWorkSamples = [...this.state.studentWorkSamples];
        updatedStudentWorkSamples.splice(index, 1);
        this.props.updateStudentWorkSamples(updatedStudentWorkSamples);
        this.setState({studentWorkSamples: updatedStudentWorkSamples});
    }

    renderSamples = () => {
        const samples = []
        for (let i = 0; i < this.state.studentWorkSamples.length; ++i) {
            let sampleName = i;
            samples.push(
                <div style={{display: "flex", justifyContent: "space-around",
                    width: "30%"}} id={"sample-" + i}>
                    <sample>
                        <input
                            id={"performance-samples-"+i}
                            className="form-control form-text form-center"
                            name={sampleName}
                            value={this.state.studentWorkSamples[i].importance}
                            type="text"
                            placeholder="Enter Sample Importance"
                            required={true}
                            size="41" 
                            maxLength="50"
                            onChange={this.handleSampleChange}
                        />
                    </sample>
                    <br></br>
                    <div className={"delete-samples"} id={"delete-sample-"+i} onClick={() => this.deleteSample(i)}
                        style={{paddingTop: "10px"}}>
                        <span className="fa fa-minus-square"></span>
                    </div>
                </div>
            );
        }
        return samples;
    }

    render() {
        return(
            <div id="samples-form">
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <div style={{display: "flex", 
                            justifyContent: "space-around", width: "25%"}}>
                            <p style={{paddingTop: "12px"}}>
                                Work Sample Slots:
                            </p>
                            <br/>
                            <button id="add-sample" onClick={this.addSample}
                                className="btn btn-primary btn-color-theme modal-submit-btn"
                                style={{height: "30px", width: "150px", 
                                    borderRadius: "15px", fontSize: "13px",
                                    marginTop: "10px", marginBottom: "15px"}}>
                                Add Sample Slot
                            </button>
                        </div>
                        {this.renderSamples()}
                        <br/>
                    </center>
                </form>
            </div>
        );
    }
    
}

export default StudentWorkSamplesForm;