import { PI } from 'aws-sdk';
import React from 'react';
import DragAndDrop from '../common/DragAndDrop';

class ViewDeliverable extends React.Component {
  constructor(props) {
    super(props);
    this.refArray = [];
    this.state = {
      placeHolder: false,
      deliverable: props.deliverable,
      deliverableSOs: {},
      file: null

    }
  }

  componentDidMount() {
    this.retriveSoPis();
  }

  handleDeliverableSubmit = async (event) => {
    event.preventDefault();
  }

  retriveSoPis = async () => {
    //This fetches the course that is linked to the deliverable
    let url = '/api/courses/' + this.state.deliverable.deliverableCourseID;
    let res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    if (res.status != 200) {
      const msg = await res.text();
      console.log(msg);
      this.setState({ errorMsg: msg });
    } else { //success! we are ready to get the SOs and PIs from programs
      const msg = await res.json();
      let course = JSON.parse(msg);
      //fetching the program
      url = '/api/programs/' + course.courseProgram;
      res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });
      if (res.status != 200) {
        const msg = await res.text();
        this.setState({ errorMsg: msg });
      } else { //suscses! we have our program that has 
        const msg = await res.json();
        let program = JSON.parse(msg);
        this.setState({ deliverableSOs: { ...program.studentOutcomes } });
      }
    }
  }

  togglePI = (SO, PI, type, SOName, PIName) => {
    if(this.props.userObj.accountType == "ABET Evaluator")
    {
      return;
    }

    let localDeliverable = this.state.deliverable;
    if(!SO)
    {
      SO = {SOName: SOName, PIs: []}
      localDeliverable.SOs.push(SO);
    }
    if(!PI)
    {
      PI = {PIName: PIName, PIPrior: false, PITaught: false, PIAssessed: false}
      SO["PIs"].push(PI);
    }
    PI[type] = !PI[type];

    let body = {};
    let deliverables = this.props.course.courseDeliverables;
    deliverables[this.props.index] = localDeliverable
    body["courseDeliverables"] = deliverables;
    
    fetch("/api/courses/" + this.props.course._id, {
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
    .catch(err => console.error(err));

    this.setState({deliverable: localDeliverable})

  }

  displaySOPIs = () => {
    let SOPIs = [];
    let keys = Object.keys(this.state.deliverableSOs);
    for (let i = 0; i < keys.length; i++) {
      //defines table header from SO
      SOPIs.push(
        <thead className="thead-dark">
          <tr>
            <th>{keys[i]}</th>
            <th>Prior Competence Assumed</th>
            <th>Taught in Course</th>
            <th>Assessed in Course</th>
          </tr>
        </thead>
      );
      let SO = this.state.deliverable.SOs.find(obj => {
        return obj.SOName === keys[i]
      })

      //gets each PI from a given SO
      let PIs = [];
      for (let j = 0; j < this.state.deliverableSOs[keys[i]].length; j++) {
        let PI = null
        if(SO)
        {
          PI = SO.PIs.find(obj => {
            return obj.PIName === this.state.deliverableSOs[keys[i]][j]
          })
        }
        let PIPrior = null;
        let PITaught = null;
        let PIAssessed = null;
        if(PI)
        {
          PIPrior = PI.PIPrior;
          PITaught = PI.PITaught;
          PIAssessed = PI.PIAssessed;
        }

        PIs.push(
          <tr>
            <td>{this.state.deliverableSOs[keys[i]][j]}</td>
            <td><input style={{marginRight: 20}} type="checkbox" checked={!!PIPrior} onClick={() => this.togglePI(SO, PI, "PIPrior", keys[i], this.state.deliverableSOs[keys[i]][j])}/></td>
            <td><input style={{marginRight: 20}} type="checkbox" checked={!!PITaught} onClick={() => this.togglePI(SO, PI, "PITaught", keys[i], this.state.deliverableSOs[keys[i]][j])}/></td>
            <td><input style={{marginRight: 20}} type="checkbox" checked={!!PIAssessed} onClick={() => this.togglePI(SO, PI, "PIAssessed", keys[i], this.state.deliverableSOs[keys[i]][j])}/></td>
          </tr>
        );
      }
      SOPIs.push(<tbody>{PIs}</tbody>)
    }
    return SOPIs;
  }

  displayNeededWorkSamples = () => {
    let workSamples = [];
    for (let i = 0; i < this.state.deliverable.studentWorkSamples.length; i++) {
      this.refArray.push(React.createRef())
      if(this.state.deliverable.studentWorkSamples[i].file)
        workSamples.push(
          <tr>
            <td className={this.getLabelClassName(this.state.deliverable.studentWorkSamples[i].importance)}>{this.state.deliverable.studentWorkSamples[i].importance}</td>
            <td>{this.state.deliverable.studentWorkSamples[i].file.name}</td>
            <td><a href={"/api/s3?id=" + this.state.deliverable.studentWorkSamples[i].file.id + "&name=" + this.state.deliverable.studentWorkSamples[i].file.name} className="btn btn-color-theme" > <i className="fa fa-download"></i> Download</a></td>
            {this.props.userObj.accountType != "ABET Evaluator" ?
              <button onClick={()=>{this.props.deleteFile(this.state.deliverable.studentWorkSamples[i].file.id, this.state.deliverable.studentWorkSamples[i].file.name, this.props.deleteInDatabase_workSample, this.props.index, i)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
            : null }
            </tr>
        );
        else
        {
          if(this.props.userObj.accountType != "ABET Evaluator")
            workSamples.push(
              <tr>
                <td className={this.getLabelClassName(this.state.deliverable.studentWorkSamples[i].importance)}>{this.state.deliverable.studentWorkSamples[i].importance}</td>
                <td></td>
                <td><DragAndDrop className="samples-files" UploadFile={(e) => this.onSubmit(e, this.props.upload_workSample, this.props.index, i)} /></td>
              </tr>
            );
          else
            workSamples.push(
              <tr>
                <td className={this.getLabelClassName(this.state.deliverable.studentWorkSamples[i].importance)}>{this.state.deliverable.studentWorkSamples[i].importance}</td>
                <td>No file chosen</td>
                <td></td>
              </tr>
            );
        }
      }

    return workSamples;
  }

  getLabelClassName(label) {
    console.log(label);
    switch(label) {
      case "High":
        return "btn btn-danger samples-label"
      case "Medium":
        return "btn btn-warning samples-label"
      case "Low":
        return "btn btn-primary samples-label"
      default: 
        return ""
    }
  }

  onSubmit = (event,type) =>{
    event.preventDefault();
    this.props.uploadFile(event.target['file'].files[0], this.props.upload_prompt, type)
    alert(
        `Selected file - ${event.target.files[0].name}`
      );
  }

  render() {
    let prompt = this.state.deliverable.prompt
    let PromptDiv =(<div>
      <h4>Prompt</h4>
      {this.props.userObj.accountType != "ABET Evaluator" ?
        <DragAndDrop className="prompt-file" UploadFile={(e) => this.onSubmit(e, this.props.index)} />
      : null }
      
    </div>)  

  if(prompt != null){
    PromptDiv = (<div>
        <h4>Prompt</h4>
            <a href={"/api/s3?id=" + prompt.id + "&name=" + prompt.name} className="btn btn-alt-color-theme" > <i className="fa fa-download"></i> Download</a>
            {this.props.userObj.accountType != "ABET Evaluator" ?
              <button onClick={()=>{this.props.deleteFile(prompt.id, prompt.name, this.props.deleteInDatabase_prompt, this.props.index)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
            : null }
    </div>)
    }
    return (
      <div className="modal" role="dialog">
              <div className="modal-dialog modal-lg"></div>
              <div className="modal-content form-center">
                <div className="modal-header">
                  <h3><b>Deliverable details</b></h3>
                  <button className="modal-close"
                    onClick={() => this.props.close()}>
                    &times;</button>
                </div>
                <div className="modal-body">
                  <form id="deliverablesView" onSubmit={this.handleDeliverableSubmit}>
                  <div className="deliverable-section">
                    <h4>Name</h4>
                    <p style={{fontSize: "x-large"}}>{this.state.deliverable.deliverableName}</p>
                  </div>
                  <div className="deliverable-section">
                    <h4>Description</h4>
                    <p>{this.state.deliverable.description}</p>
                  </div>
                  <div className="deliverable-section"> {PromptDiv} </div>
                  <div className="deliverable-section">
                      <h4>Student Outcomes and Performance Indicators</h4>
                      <div>
                        <table id="courses-table" className="table table-hover">
                          {this.state.deliverableSOs == null || this.state.deliverableSOs.length == 0 ?
                            <tr>
                              <td colSpan="12" style={{ fontStyle: "italic" }}>No Student Outcomes Defined</td>
                            </tr> : this.displaySOPIs()
                          }
                        </table>
                      </div>
                  </div>
                    <div className="deliverable-section">
                      <h4>Upload student work samples</h4>
                      <table id="courses-table" className="table table-hover">
                        <thead className="thead-dark">
                          <tr>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.deliverable.studentWorkSamples == 0 || this.state.deliverable.studentWorkSamples == null ?
                            <tr>
                              <td colSpan="12" style={{ fontStyle: "italic" }}>No Samples To Upload</td>
                            </tr> : this.displayNeededWorkSamples()
                          }
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    );
  }
}

export default ViewDeliverable;