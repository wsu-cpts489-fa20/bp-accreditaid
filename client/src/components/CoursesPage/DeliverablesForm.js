import React from 'react';
import AppMode from '../../AppMode.js';

class DeliverablesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      deliverableName: "",
                      prompt: "",
                      performanceIndicators: [],
                    };    
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value}); 
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
                                size="50" 
                                maxLength="50"
                                onChange={this.handleChange}
                            />
                        </label>
                        <p></p>
                        <label>
                            Deliverable Prompt:
                            <input
                                id="course-number"
                                className="form-control form-text form-center"
                                name="courseNumber"
                                value={this.state.courseNumber}
                                type="number"
                                placeholder="Number"
                                required={true}
                                onChange={this.handleChange}
                                min="0" 
                                max="999"
                            />
                        </label>
                        <p></p>
                        <label>
                            Performance Indicators:
                            <input
                                id="course-prefix"
                                className="form-control form-text form-center"
                                name="coursePrefix"
                                value={this.state.coursePrefix}
                                type="text"
                                placeholder="Prefix"
                                required={true}
                                size="10" 
                                maxLength="10"
                                onChange={this.handleChange}
                            />
                        </label>
                    </center>
                </form>
            </div>
        );
    }

}

export default DeliverablesForm;