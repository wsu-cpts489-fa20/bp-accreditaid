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
                                    <div className="d-flex">
                                        <input id={"indicator-" + this.props.id} value={this.state.indicator} name="indicator" onChange={this.handleChange} type="text" className="form-control todo-list-input" placeholder="Add a performance indicator"/>
                                        <button type="button" className="btn btn-primary btn-alt-color-theme" onClick={this.addIndicator}>Add</button>
                                    </div>
                                    <div>
                                        <ol className="indicators-list">
                                        {this.props.performanceIndicators.map((value, index) => {
                                            return <li key={index}>{value} <i className="fa fa-minus fa-lg" onClick={() => this.removeIndicator(value)}></i></li>
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