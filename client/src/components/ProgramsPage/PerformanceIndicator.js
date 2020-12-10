import React from 'react';

class PerformanceIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {indicator: ""};
    }

    addIndicator = () => {
        if (this.props.performanceIndicators.includes(this.state.indicator) || this.state.indicator == "")
        {
            return;
        }

        let indicators = [...this.props.performanceIndicators];
        indicators.push(this.state.indicator);
        this.props.indicatorsChanged(this.props.outcome, indicators);
        this.setState({indicator: ""});
    }

    removeIndicator = (indicator) => {
        let indicators = [...this.props.performanceIndicators];
        const index = indicators.indexOf(indicator);
        if (index > -1) {
            indicators.splice(index, 1);
            this.props.indicatorsChanged(this.props.outcome, indicators);
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
                                    {this.props.userObj.accountType == "College Admin" ?
                                        <div className="d-flex">
                                            <input id={"outcome-" + this.props.id + "-indicator-input"} value={this.state.indicator} name="indicator" onChange={this.handleChange} type="text" className="form-control todo-list-input" placeholder="Add a performance indicator"/>
                                            <button id={"add-" + this.props.id + "-indicator"} type="button" className="btn btn-alt-color-theme" onClick={this.addIndicator}>Add</button>
                                        </div>
                                    : null}
                                    <div>
                                        <ol className="indicators-list">
                                        {this.props.performanceIndicators.map((value, index) => {
                                            return <li key={index}>
                                                        <div className="indicator-element-div">
                                                            <div className="indicators-div" id={"outcome-" + this.props.id + "-indicator-" + index}>{value}</div>
                                                            {this.props.userObj.accountType == "College Admin" ?
                                                                <i id={"outcome-" + this.props.id + "-indicator-" + index + "-delete"} className="fa fa-minus fa-lg" onClick={() => this.removeIndicator(value)}></i>
                                                            : null}
                                                        </div>
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

export default PerformanceIndicator;