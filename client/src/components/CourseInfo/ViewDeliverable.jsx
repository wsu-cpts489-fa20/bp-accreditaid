import React from 'react';

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
    var url = '/api/courses/' + this.state.deliverable.deliverableCourseID;
    var res = await fetch(url, {
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


  displaySOPIs = () => {
    console.log(this.state.deliverableSOs)
    var SOPIs = [];
    var keys = Object.keys(this.state.deliverableSOs);
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
      //gets each PI from a given SO
      var PIs = [];
      for (let j = 0; j < this.state.deliverableSOs[keys[i]].length; j++) {
        PIs.push(
          <tr>
            <td>{this.state.deliverableSOs[keys[i]][j]}</td>
            <td><input style={{marginRight: 20}} type="checkbox"/></td>
            <td><input style={{marginRight: 20}} type="checkbox"/></td>
            <td><input style={{marginRight: 20}} type="checkbox"/></td>
          </tr>
        );
      }
      SOPIs.push(<tbody>{PIs}</tbody>)
    }
    return SOPIs;
  }

  getFileFromRefArray = (index) => {
    console.log(index);
    // return this.refArray[index].current.files[0];
  }

  displayNeededWorkSamples = () => {
    var workSamples = [];
    for (let i = 0; i < this.state.deliverable.studentWorkSamples.length; i++) {
      this.refArray.push(React.createRef())
      if(this.state.deliverable.studentWorkSamples[i].file)
        workSamples.push(
          <tr>
            <td>{this.state.deliverable.studentWorkSamples[i].importance}</td>
            <td>{this.state.deliverable.studentWorkSamples[i].file.name}</td>
            <td><a href={"/api/s3?id=" + this.state.deliverable.studentWorkSamples[i].file.id + "&name=" + this.state.deliverable.studentWorkSamples[i].file.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a></td>
            <button onClick={()=>{this.props.deleteFile(this.state.deliverable.studentWorkSamples[i].file.id, this.state.deliverable.studentWorkSamples[i].file.name, this.props.deleteInDatabase_workSample, this.props.index, i)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
          </tr>
        );
        else
        {
          workSamples.push(
            <tr>
              <td>{this.state.deliverable.studentWorkSamples[i].importance}</td>
              <td><input ref={this.refArray[i]} id={"workSampleFile-" + i} className="form-control-file" type="file"  name="file"></input></td>
              <td><button className="btn btn-success" name="studentWorkSamples" type="button" 
                onClick={() => this.props.uploadFile(this.refArray[i].current.files[0], this.props.upload_workSample, this.props.index, i)}>Upload</button></td>
            </tr>
          );
        }
      }

    return workSamples;
  }

  getLabelClassName(label) {
    switch(label) {
      case "High":
        return "btn btn-danger"
      case "Medium":
        return "btn btn-warning"
      case "Low":
        return "btn btn-primary"
      default: 
        return ""
    }
  }

  onSubmit = (event,type) =>{
    console.log("on sumbit!")
    event.preventDefault()
    console.log("file");
    console.log("files array" + event.target.files);
    this.props.uploadFile(event.target['file'].files[0], this.props.upload_prompt, type)
    alert(
        `Selected file - ${event.target.files[0].name}`
      );
  }

  render() {
    console.log(this.refArray);
    console.log(this.props.index)
    let prompt = this.state.deliverable.prompt
    var PromptDiv =(<div>
      <h4>Prompt</h4>
      <form onSubmit={e => this.onSubmit(e, this.props.index)}>
          <center><input className="form-control-file"  type="file"  name="file" ></input></center>
          <button  className="btn btn-success" name="prompt" type="submit">Upload</button> 
      </form>
      
    </div>)  

  if(prompt != null){
    PromptDiv = (<div>
        <h4>Prompt</h4>
            <a href={"/api/s3?id=" + prompt.id + "&name=" + prompt.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
            <button onClick={()=>{this.props.deleteFile(prompt.id, prompt.name, this.props.deleteInDatabase_prompt, this.props.index)}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
            
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
                    <h4>Name</h4>
                    <p>{this.state.deliverable.deliverableName}</p>
                    <h4>Description</h4>
                    <p>{this.state.deliverable.description}</p>
                    {PromptDiv}
                    <h4>Student Outcomes and Preformace Indicators</h4>
                    <div>
                      <table id="courses-table" className="table table-hover">
                        {this.state.deliverableSOs == null || this.state.deliverableSOs.length == 0 ?
                          <tr>
                            <td colSpan="12" style={{ fontStyle: "italic" }}>No Student Outcomes Defined</td>
                          </tr> : this.displaySOPIs()
                        }
                      </table>
                    </div>
                    <div>
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
                    <button role="submit"
                      id="Deliverable-submit"
                      className="btn btn-primary btn-color-theme modal-submit-btn"
                      style={{ marginTop: "15px", marginBottom: "70px" }}>
                      <span className="fa fa-user-plus"></span>&nbsp;Update Deliverable
                        </button>
                  </form>
                </div>
              </div>
            </div>
    );
  }
}

export default ViewDeliverable;