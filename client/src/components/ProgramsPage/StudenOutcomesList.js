import React from 'react';

class StudentOutcomesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {outcome: ""};
    }

    addOutcome = () => {
        if (this.props.studentOutcomes.includes(this.state.outcome) || this.state.outcome == "")
        {
            return;
        }

        let outcomes = [...this.props.studentOutcomes];
        outcomes.push(this.state.outcome);

        this.props.outcomesChanged(outcomes);
    }

    removeOutcome = (outcome) => {
        let outcomes = [...this.props.studentOutcomes];
        const index = outcomes.indexOf(outcome);
        if (index > -1) {
            outcomes.splice(index, 1);
            this.props.outcomesChanged(outcomes);
        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
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
                                        <input value={this.state.outcome} name="outcome" onChange={this.handleChange} type="text" className="form-control todo-list-input" placeholder="Add a student outcome"/>
                                        <button type="button" className="btn btn-primary btn-alt-color-theme" onClick={this.addOutcome}>Add</button>
                                    </div>
                                    <div>
                                        <ul className="outcomes-list">
                                        {this.props.studentOutcomes.map((value, index) => {
                                            return <li key={index}>{value} <i className="fa fa-minus fa-lg" onClick={() => this.removeOutcome(value)}></i></li>
                                        })}
                                        </ul>
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