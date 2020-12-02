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

    renderIndicators = () => {
        const indicators = []
        for (let i = 0; i < this.state.performanceIndicators.length; ++i) {
            indicators.push(
                <>
                    <label>
                        <input
                            id="performance-indicators"
                            className="form-control form-text form-center"
                            name="performanceIndicators"
                            value={this.state.performanceIndicators[i]}
                            type="text"
                            placeholder="Enter Indicator"
                            required={true}
                            size="41" 
                            maxLength="50"
                            onChange={this.handleChange}
                        />
                    </label>
                    <br></br>
                </>
            );
        }
        console.log(indicators);
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
                        Performance Indicators:
                        <br/>
                        <button onClick={this.addIndicator}
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            style={{height: "30px", width: "10%", borderRadius: "15px", fontSize: "16px",
                                marginTop: "10px", marginBottom: "15px"}}>
                            Add Indicator
                        </button>
                        <br/>
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