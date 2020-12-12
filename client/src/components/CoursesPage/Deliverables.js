import React from 'react';
import AppMode from '../../AppMode.js';
import DeliverablesForm from './DeliverablesForm.js';
import DeliverablesTable from './DeliverablesTable.js';
import FloatingButton from '../common/FloatingButton.js';
import App from '../App.js';

class Deliverables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                      course: {},
                      deliverables: [],
                      editDeliverableIndex: null
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

    addOrUpdateDeliverable = async (newData) => {
        let body = {};
        body["courseDeliverables"] = this.state.course.courseDeliverables;
        newData["deliverableCourseID"] = this.state.course._id;
        if(!body["courseDeliverables"])
            body["courseDeliverables"] = [];

        if (this.props.mode === AppMode.DELIVERABLES_EDITDELIVERABLE)
        {
            body["courseDeliverables"][this.state.editDeliverableIndex] = newData;
            this.setState({editDeliverableIndex: null});
        }
        else
        {
            body["courseDeliverables"].push(newData);
        }

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

    setEditDeliverableIndex = (index) => {
        this.setState({editDeliverableIndex: index}, () => this.props.changeMode(AppMode.DELIVERABLES_EDITDELIVERABLE));
    }

    render() {
        if (this.props.mode === AppMode.DELIVERABLES) {
            return (
                <>
                    <DeliverablesTable
                        deliverables={this.state.deliverables}
                        labels={this.state.labels}
                        editDeliverableIndex={this.setEditDeliverableIndex}
                        changeMode={this.props.changeMode}
                    />
                    {this.props.userObj.accountType == "College Admin" ?
                    <FloatingButton
                        id="add-deliverable-button"
                        handleClick={() => this.props.changeMode(AppMode.DELIVERABLES_LOGDELIVERABLE)}
                    />
                    :
                    <div></div>}
                </>
            )
        }
        else if(this.props.mode === AppMode.DELIVERABLES_LOGDELIVERABLE || this.props.mode === AppMode.DELIVERABLES_EDITDELIVERABLE)
        {
            return (
                <DeliverablesForm
                    mode={this.props.mode}
                    delivarable={this.state.deliverables[this.state.editDeliverableIndex]}
                    updateLabels={this.updateLabels}
                    saveDeliverable={this.addOrUpdateDeliverable} 
                />
            );
        }

    }

}

export default Deliverables;