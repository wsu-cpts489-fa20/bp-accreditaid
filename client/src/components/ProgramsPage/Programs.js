//Programs -- A parent component for the app's "programs" mode.
//Manages the programs data for the current user and conditionally renders the
//appropriate program mode page based on App's mode, which is passed in as a prop.

import React from 'react';
import AppMode from '../../AppMode.js';
import ProgramTable from './ProgramTable.js';
import ProgramForm from './ProgramForm.js';
import FloatingButton from '../common/FloatingButton.js';
import EmailModal from "../EmailModal/EmailModal.jsx"

class Programs extends React.Component {

    //Initialize a Programs object based on local storage
    constructor() {
        super();
        this.deleteId = "";
        this.editId = "";
        this.state = {errorMsg: "", programs: [], isEmailModalDisplayed:false};           
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const url = '/api/programs/';
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'GET'}); 
        if (res.status != 200) {
            const msg = await res.text();
            this.setState({errorMsg: msg});
        } else {
            const msg = await res.json();
            let programs = JSON.parse(msg);
            this.setState({errorMsg: ""});
            this.setState({programs: programs})
        }
    }

    //addProgram -- Given an object newData containing a new program, use the 
    //server POST route to add the new program to the database. If the add is
    //successful, call on the refreshOnUpdate() method to force the parent
    //App component to refresh its state from the database and re-render itself,
    //allowing the change to be propagated to the Programs table. Then switch
    //the mode back to AppMode.PROGRAMS since the user is done adding a program.
    addProgram = async (name, newData) => {
        const url = '/api/programs/' + name;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'POST',
            body: JSON.stringify(newData)}); 
        const msg = await res.text();
        if (res.status != 201) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.PROGRAMS);
        } else {
            this.setState({errorMsg: msg});
            await this.fetchData();
            this.props.changeMode(AppMode.PROGRAMS);
        }
    }

    //editProgram -- Given an object newData containing updated data on an
    //existing program, update the current user's program in the database. 
    //toggle the mode back to AppMode.PROGRAMS since the user is done editing the
    //program. 
    editProgram = async (name, newData) => {
        const url = '/api/programs/' + name;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(newData)}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: msg});
            this.props.changeMode(AppMode.PROGRAMS);
        } else {
            this.setState({errorMsg: msg});
            await this.fetchData();
            this.props.changeMode(AppMode.PROGRAMS);
        }
    }


    //deleteProgram -- Delete the current user's program uniquely identified by
    //this.state.deleteId, delete from the database, and reset deleteId to empty.
    deleteProgram = async () => {
        const url = '/api/programs/' + this.deleteId;
        const res = await fetch(url, {method: 'DELETE'}); 
        const msg = await res.text();
        if (res.status != 200) {
            this.setState({errorMsg: "An error occurred when attempting to delete program from database: " 
            + msg});
            this.props.changeMode(AppMode.PROGRAMS);
        } else {
            await this.fetchData();
            this.props.changeMode(AppMode.PROGRAMS);
        }  
    }
 
    //setDeleteId -- Capture in this.state.deleteId the unique id of the item
    //the user is considering deleting.
    setDeleteId = (val) => {
        this.deleteId = val;
        this.setState({errorMsg: ""});
    }

    //setEditId -- Capture in this.state.editId the unique id of the item
    //the user is considering editing.
    setEditId = (val) => {
        this.editId = val;
        this.setState({errorMsg: ""});
    }

    closeErrorMsg = () => {
        this.setState({errorMsg: ""});
    }

    toggleEmailModal = () => {
        this.setState({
            isEmailModalDisplayed: !this.state.isEmailModalDisplayed
        })
    }
    
    //render -- Conditionally render the Programs mode page as either the programs
    //table, the programs form set to obtain a new program, or the program form set
    //to edit an existing program.
    render() {
        switch(this.props.mode) {
            case AppMode.PROGRAMS:
                return (
                    <>
                    <div style={{padding: "56px 8px 0"}}>
                    {this.state.errorMsg != "" ? 
                    <div className="status-msg">
                        <span>{this.state.errorMsg}</span>
                        <button className="modal-close" onClick={this.closeErrorMsg}>
                          <span className="fa fa-times"></span>
                        </button>
                    </div>: null}
                    {this.props.userObj.accountType == "College Admin" ? 
                    <div>
                        <button className="btn btn-color-theme" onClick={this.toggleEmailModal} >Invite Evaluators</button>
                        {this.state.isEmailModalDisplayed ? <EmailModal close={this.toggleEmailModal}></EmailModal> : <div/>}
                        </div> :
                    <div/> }
                    </div>
                    
                    <ProgramTable 
                        programs={this.state.programs}
                        setCurrentProgram={this.props.setCurrentProgram}
                        changeMode={this.props.changeMode}
                        menuOpen={this.props.menuOpen} /> 

                    {this.props.userObj.accountType == "College Admin" ? 
                    
                    <FloatingButton
                        id={"create-program-floating-button"}
                        handleClick={() => 
                        this.props.changeMode(AppMode.PROGRAMS_LOGPROGRAM)}
                        menuOpen={this.props.menuOpen}
                        icon={"fa fa-plus"} /> : <div/> }

                    </>
                );
            case AppMode.PROGRAMS_LOGPROGRAM:
                return (
                    <ProgramForm
                        mode={this.props.mode}
                        startData={""} 
                        saveProgram={this.addProgram} 
                        setDeleteId={this.setDeleteId}
                        userObj={this.props.userObj}
                        deleteProgram={this.deleteProgram}/>
                );
            case AppMode.PROGRAMS_EDITPROGRAM:
                let thisProgram = {...this.state.programs[this.props.currentProgramId]};
                return (
                    <ProgramForm
                        mode={this.props.mode}
                        startData={thisProgram} 
                        saveProgram={this.editProgram} 
                        setDeleteId={this.setDeleteId}
                        deleteProgram={this.deleteProgram}
                        userObj={this.props.userObj}
                        changeMode={this.props.changeMode}/>
                );
        }
    }

}   

export default Programs;
