import React from 'react';
import PerformanceIndicator from './PerformanceIndicator.js';
import PeformanceIndicator from './PerformanceIndicator.js';

class StudentOutcomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {outcome: ""};
    }

    addOutcome = () => {
        if (this.state.outcome in this.props.studentOutcomes || this.state.outcome == "")
        {
            return;
        }

        let outcomes = {...this.props.studentOutcomes};
        outcomes[this.state.outcome] = [];
        this.props.outcomesChanged(outcomes);
        this.setState({outcome: ""});
    }

    removeOutcome = (outcome) => {
        let outcomes = {...this.props.studentOutcomes};
        delete outcomes[outcome];
        this.props.outcomesChanged(outcomes);
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    indicatorsChanged = (outcome, indicators) => {
        let outcomes = {...this.props.studentOutcomes};
        outcomes[outcome] = indicators;
        this.props.outcomesChanged(outcomes);
    }

    render() {
        return (
            <div className="page-content page-container">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-12">
                            <div className="card px-3">
                                <div>
                                    <h4>Student Outcomes</h4>
                                    <div className="d-flex">
                                        <input id="outcomes-input" value={this.state.outcome} name="outcome" onChange={this.handleChange} type="text" className="form-control todo-list-input" placeholder="Add a student outcome"/>
                                        <button id="add-outcome" type="button" className="btn btn-primary btn-alt-color-theme" onClick={this.addOutcome}>Add</button>
                                    </div>
                                    <div>
                                        <ol className="outcomes-list">
                                        {Object.keys(this.props.studentOutcomes).map((key, index) => {
                                            return  <li key={key}> 
                                                        <div className="outcomes-div">
                                                            <div className="outcome-div" id={"outcome-" + index}>{key}</div>
                                                            <i id={"outcome-" + index + "-delete"} className="fa fa-minus fa-2x" onClick={() => this.removeOutcome(key)}></i>
                                                        </div>
                                                        <PerformanceIndicator id={index} outcome={key} performanceIndicators={this.props.studentOutcomes[key]} indicatorsChanged={this.indicatorsChanged}/>
                                                    </li>
                                        })}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentOutcomesList;