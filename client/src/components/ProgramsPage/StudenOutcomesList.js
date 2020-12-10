import { set } from 'mongoose';
import React from 'react';
import CSVReader from 'react-csv-reader';
import PerformanceIndicator from './PerformanceIndicator.js';

class StudentOutcomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {outcome: "", data: null, fileInfo: null};
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

    prepareFile = (data, fileInfo) => {
        this.setState({data: [...data], fileInfo: fileInfo});
    }


    importData = () => {
        var outcomes = {};

        for(var i = 0; i < this.state.data.length; i++) 
        {
            if (this.state.data[i].length > 1)
            {
                let performanceIndicators = [];
                for (var j = 1; j < this.state.data[i].length; j++)
                {
                    if (this.state.data[i][j] == "")
                    {
                        continue;
                    }

                    performanceIndicators.push(this.state.data[i][j]);
                }
                outcomes[this.state.data[i][0]] = performanceIndicators;
            }
            else if (this.state.data[i].length == 0)
            {
                outcomes[this.state.data[i][0]] = [];
            }
        }

        this.props.outcomesChanged(outcomes);
    }

    render() {
        return (
            <div className="page-content page-container" id="StudentOutcomesList">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-12">
                            <div className="card px-3">
                                <div>
                                    <h4>Student Outcomes</h4>
                                    {this.props.userObj.accountType == "College Admin" ?
                                        <div className="d-flex">
                                            <input id="outcomes-input" value={this.state.outcome} name="outcome" onChange={this.handleChange} type="text" className="form-control todo-list-input" placeholder="Add a student outcome"/>
                                            <button id="add-outcome" type="button" className="btn btn-alt-color-theme" onClick={this.addOutcome}>Add</button>
                                        </div>
                                     : null}    
                                    <div>
                                        <ol className="outcomes-list">
                                        {Object.keys(this.props.studentOutcomes).map((key, index) => {
                                            return  <li key={key}> 
                                                        <div className="outcomes-div">
                                                            <div className="outcome-div" id={"outcome-" + index}>{key}</div>
                                                            {this.props.userObj.accountType == "College Admin" ?
                                                                <i id={"outcome-" + index + "-delete"} className="fa fa-minus fa-2x" onClick={() => this.removeOutcome(key)}></i>
                                                            : null}      
                                                        </div>
                                                        <PerformanceIndicator id={index} outcome={key} performanceIndicators={this.props.studentOutcomes[key]} userObj={this.props.userObj} indicatorsChanged={this.indicatorsChanged}/>
                                                    </li>
                                        })}
                                        </ol>
                                    </div>
                                    {this.props.userObj.accountType == "College Admin" ?
                                        <div className="import-csv">
                                            <CSVReader
                                                cssClass="csv-reader-input"
                                                label="Select CSV with student outcomes and performance indicators"
                                                onFileLoaded={this.prepareFile}
                                                inputId="upload-csv"
                                            />
                                            <button id="upload-csv" type="button" className="btn btn-alt-color-theme" onClick={this.importData}>Import data</button>
                                        </div>
                                    : null}
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