import React from 'react';
import AppMode from '../../AppMode.js';
import DeliverablesForm from './DeliverablesForm.js';
import DeliverablesTable from './DeliverablesTable.js';
import FloatingButton from '../common/FloatingButton.js';
import LabelsForm from "./LabelsForm.js";

class Deliverables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      course: {},
                      labels: ["High", "Medium", "Low"],
                      deliverables: {}
                    };    
    }

    componentDidMount() {
        this.setState({course: this.props.modeParams.course,
                       deliverables: this.props.modeParams.course.courseDeliverables
                      });
    }

    updateCourseState = (field, value) =>{
        let newCourse = this.state.course
        newCourse[field] = value
        this.setState({
            course: newCourse
        })
    }

    addDeliverable = async (newData) => {
        let body = {};
        body["courseDeliverables"] = this.state.course.courseDeliverables;
        newData["deliverableCourseID"] = this.state.course._id;
        if(!body["courseDeliverables"])
            body["courseDeliverables"] = [];
        body["courseDeliverables"].push(newData);

        console.log(body);
        this.setState({deliverables: body.courseDeliverables});
        await fetch("/api/courses/" + this.state.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if(res.status == 200){
                return res.text();
            }
            throw res;
        })
        .then(json => console.log(json))
        .then(()=> {this.updateCourseState("courseDeliverables", body["courseDeliverables"])})
        .catch(err => console.error(err));
        this.props.changeMode(AppMode.DELIVERABLES);
    }

    updateLabels = (newLabels) => {
        this.setState({labels: newLabels});
        this.props.changeMode(AppMode.DELIVERABLES);
    }

    render() {
        switch(this.props.mode) {
            case AppMode.DELIVERABLES:
                return (
                    <>
                        <button className="btn btn-primary" id="edit-labels-button"
                            onClick={() => this.props.changeMode(AppMode.DELIVERABLES_EDITLABELS)}>
                            Edit Work Sample Labels
                        </button>
                        <DeliverablesTable
                            deliverables={this.state.deliverables}
                            labels={this.state.labels}
                        />
                        <FloatingButton
                            id="add-deliverable-button"
                            handleClick={() => this.props.changeMode(AppMode.DELIVERABLES_LOGDELIVERABLE)}
                        />
                    </>
                );
            case AppMode.DELIVERABLES_EDITLABELS:
                return (
                    <LabelsForm
                        updateLabels={this.updateLabels}
                        labels={this.state.labels}
                    />
                );
            case AppMode.DELIVERABLES_LOGDELIVERABLE:
                return (
                    <DeliverablesForm
                        saveDeliverable={this.addDeliverable} 
                        labels={this.state.labels}
                    />
                );
        }

    }

}

export default Deliverables;