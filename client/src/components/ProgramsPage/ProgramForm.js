import React from 'react';
import ConfirmDeleteProgram from './ConfirmDeleteProgram.js';
import AppMode from '../../AppMode.js';
import StudentOutcomesList from './StudenOutcomesList.js';

class ProgramForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.mode === AppMode.PROGRAMS_LOGPROGRAM) {
      //If logging a new program, the starting state is a default program with
      this.state = {
                    _id: "",
                    name:  "", 
                    department: "",
                    college: "",
                    credits: "",
                    oldName: "",
                    studentOutcomes: {},
                    faIcon: "fa fa-save",
                    btnLabel: "Save Program Data"}
    } else {
      //if editing an existing program, the starting state is the program's
      //current data
      let thisProgram = {...this.props.startData};
      // delete thisProgram.id;
      thisProgram.oldName = thisProgram.name.slice(0);
      thisProgram.faIcon = "fa fa-edit";
      thisProgram.btnLabel = "Update Program Data";
      this.state = thisProgram;
    }
  }
  
  
  handleChange = (event) => {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
  }


  //handleSubmit -- When the user clicks on the button to save/update the
  //program, start the spinner and invoke the parent component's saveProgram
  //method to do the actual work. Note that saveProgram is set to the correct
  //parent method based on whether the user is logging a new program or editing
  //an existing program.
  handleSubmit = (event) => {
      //start spinner
      this.setState({faIcon: "fa fa-spin fa-spinner",
                      btnLabel: (this.props.mode === AppMode.PROGRAMS_LOGPROGRAM ? 
                                  "Saving..." : "Updating...")});
      //Prepare current program data to be saved
      let programData = {};
      let localName = ""
      if(this.props.mode === AppMode.PROGRAMS_LOGPROGRAM)
      {
        localName = this.state.name;
      }
      else
      {
        localName = this.state.oldName;
      }
      programData.name = this.state.name;
      programData.department = this.state.department;
      programData.college = this.state.college;
      programData.credits = this.state.credits;
      programData.studentOutcomes = this.state.studentOutcomes;
      delete programData.faIcon;
      delete programData.btnLabel;
      //call saveProgram on 1 second delay to show spinning icon
      setTimeout(this.props.saveProgram,1000, localName, programData); 
      event.preventDefault(); 
      }

  //deleteProgram -- Triggered when the user clicks on the "Yes, Delete"
  //button in the Confirm Delete dialog box. It executes the deletion and
  //closes the dialog box.
  deleteProgram = () => {
    this.props.deleteProgram();
    this.setState({showConfirmDelete: false});
  }


  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given program. The id paam is the unique property that 
  //identifies the program. Set the state variable representing the id
  //of the program to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  confirmDelete = (id) => {
    this.props.setDeleteId(id);
    this.setState({showConfirmDelete: true});
  }

  openCourses = () => {
    this.props.changeMode(AppMode.COURSES);
  }

  outcomesChanged = (outcomes) => {
    this.setState({studentOutcomes: outcomes});
  } 
  
  render() {
    return (
      <div id="program-div" className="padded-page">
        <form onSubmit={this.handleSubmit}>
          <center>
            <label>
              Name:
              <input id="program-name" name="name" className="form-control form-center" type="text"
                value={this.state.name} onChange={this.handleChange} required={true}
                placeholder="Program name" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              Department:
              <input id="program-department" name="department" className="form-control form-center" type="text"
                value={this.state.department} onChange={this.handleChange} required={true}
                placeholder="Program department" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              College:
              <input id="program-college" name="college" className="form-control form-center" type="text"
                value={this.state.college} onChange={this.handleChange} required={true}
                placeholder="Program college" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              # Credits:
              <input id="program-credits" name="credits" className="form-control form-center" type="number"
                value={this.state.credits} onChange={this.handleChange} required={true}
                placeholder="0" min="0" max="999" />
            </label>
            <p></p>
            <StudentOutcomesList studentOutcomes={this.state.studentOutcomes} outcomesChanged={this.outcomesChanged}/>
            <p></p>
            {this.props.mode === AppMode.PROGRAMS_EDITPROGRAM ? 
              <button id="edit-courses" type="button" style={{width: "40%",fontSize: "36px"}} 
                className="btn btn-primary btn-color-theme"
                onClick={() => this.openCourses()}>
                  <span className="fa fa-times">Edit Courses</span></button>
              : null}
            <p></p>
            <button id="submit-changes" type="submit" style={{width: "40%",fontSize: "36px"}} 
              className="btn btn-primary btn-color-theme">
                <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
            </button>
            {this.props.mode === AppMode.PROGRAMS_EDITPROGRAM ?
              <button id="delete-program" type="button" style={{width: "40%",fontSize: "36px"}} 
                className="btn btn-primary btn-color-theme"
                onClick={this.props.menuOpen ? null : () => 
                this.confirmDelete(this.state._id)}>
                  <span className="fa fa-times">Delete Program</span></button>
              : null}
          </center>
        </form>
        {this.state.showConfirmDelete ?
          <ConfirmDeleteProgram 
            close={() => this.setState({showConfirmDelete: false})} 
            deleteProgram={this.deleteProgram} /> : null}
      </div>
    );
  }
}

export default ProgramForm;