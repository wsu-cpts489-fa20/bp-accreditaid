import React from 'react';
import ConfirmDeleteProgram from './ConfirmDeleteProgram.js';
import AppMode from '../../AppMode.js';

class ProgramForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.mode === AppMode.PROGRAMS_LOGPROGRAM) {
      //If logging a new program, the starting state is a default program with
      this.state = {name:  "", 
                    department: "",
                    college: "",
                    credits: "",
                    faIcon: "fa fa-save",
                    btnLabel: "Save Program Data"}
    } else {
      //if editing an existing program, the starting state is the program's
      //current data
      let thisProgram = {...this.props.startData};
      // delete thisProgram.id;
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
      programData.department = this.state.department;
      programData.college = this.state.college;
      programData.credits = this.state.credits;
      delete programData.faIcon;
      delete programData.btnLabel;
      //call saveProgram on 1 second delay to show spinning icon
      setTimeout(this.props.saveProgram,1000,this.state.name, programData); 
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
  
  render() {
    return (
      <div className="padded-page">
        <form onSubmit={this.handleSubmit}>
          <center>
            <label>
              Name:
              <input name="name" className="form-control form-center" type="text"
                value={this.state.name} onChange={this.handleChange} required={true}
                placeholder="Program name" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              Department:
              <input name="department" className="form-control form-center" type="text"
                value={this.state.department} onChange={this.handleChange} required={true}
                placeholder="Program department" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              College:
              <input name="college" className="form-control form-center" type="text"
                value={this.state.college} onChange={this.handleChange} required={true}
                placeholder="Program college" size="50" maxLength="50" />
            </label>
            <p></p>

            <label>
              # Credits:
              <input name="credits" className="form-control form-center" type="number"
                value={this.state.credits} onChange={this.handleChange} required={true}
                placeholder="0" min="0" max="999" />
            </label>
            <p></p>

            <p></p>
            <button type="submit" style={{width: "40%",fontSize: "36px"}} 
              className="btn btn-primary btn-color-theme">
                <span className={this.state.faIcon}/>&nbsp;{this.state.btnLabel}
            </button>
            <button type="button" style={{width: "40%",fontSize: "36px"}} 
              className="btn btn-primary btn-color-theme"
              onClick={this.props.menuOpen ? null : () => 
              this.confirmDelete(this.state.name)}>
                <span className="fa fa-times">Delete Program</span></button>
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