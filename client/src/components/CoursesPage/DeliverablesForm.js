import React from 'react';
import AppMode from '../../AppMode.js';

class DeliverablesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      deliverableName: "",
                      prompt: "",
                      performanceIndicators: ["High", "Medium", "Low"],
                    };    
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value}); 
    } 

    handleIndicatorChange = (event) => {
        let index = parseInt(event.target.name);
        let indicators = [...this.state.performanceIndicators];
        indicators[index] = event.target.value;
        this.setState({performanceIndicators: indicators});
    }

    handleSubmit = (event) => {
        console.log(this.state);
        event.preventDefault();
    }

    addIndicator = (event) => {
        let indicator = "None";
        this.setState({
          performanceIndicators: [...this.state.performanceIndicators, indicator],
        });
        event.preventDefault();
    }

    deleteIndicator = (index) => {
        let indicators = [...this.state.performanceIndicators];
        indicators.splice(index, 1);
        this.setState({performanceIndicators: indicators});
    }

    renderIndicators = () => {
        const indicators = []
        for (let i = 0; i < this.state.performanceIndicators.length; ++i) {
            let indicatorName = i;
            indicators.push(
                <div style={{display: "flex", justifyContent: "space-around",
                    width: "30%"}}>
                    <label>
                        <input
                            id="performance-indicators"
                            className="form-control form-text form-center"
                            name={indicatorName}
                            value={this.state.performanceIndicators[i]}
                            type="text"
                            placeholder="Enter Indicator"
                            required={true}
                            size="41" 
                            maxLength="50"
                            onChange={this.handleIndicatorChange}
                        />
                    </label>
                    <br></br>
                    <div onClick={() => this.deleteIndicator(i)}
                        style={{paddingTop: "10px"}}>
                        <span class="fa fa-minus-square"></span>
                    </div>
                </div>
            );
        }
        return indicators;
    }

    render() {
        return (
            <div id="deliverables-form">
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <label>
                            Name of Deliverable:
                            <input
                                id="deliverable-name"
                                className="form-control form-text form-center"
                                name="deliverableName"
                                value={this.state.deliverableName}
                                type="text"
                                placeholder="Name"
                                required={true}
                                size="41" 
                                maxLength="50"
                                onChange={this.handleChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Prompt:<br/>
                            <input
                            id="prompt"
                            className="form-control form-text form-center"
                            name="prompt"
                            value={this.state.prompt}
                            type="file"
                            placeholder="Select File"
                            accept="application/pdf" 
                            /*required={true}*/
                            size="75" 
                            onChange={this.handleChange}
                            />
                        </label> 
                        <p></p>
                        <div style={{display: "flex", justifyContent: "space-around", width: "25%"}}>
                            <p style={{paddingTop: "12px"}}>
                                Performance Indicators:
                            </p>
                            <br/>
                            <button onClick={this.addIndicator}
                                className="btn btn-primary btn-color-theme modal-submit-btn"
                                style={{height: "30px", width: "150px", borderRadius: "15px", fontSize: "13px",
                                    marginTop: "10px", marginBottom: "15px"}}>
                                Add Indicator
                            </button>
                        </div>
                        {this.renderIndicators()}
                        <br/>
                        <button role="submit"
                            id="deliverables-submit"
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            style={{marginBottom: "20px", height: "70px", width: "40%"}}>
                            <span className="fa fa-check-square-o"></span>&nbsp;Add Deliverable
                        </button>
                    </center>
                </form>
            </div>
        );
    }

}

export default DeliverablesForm;