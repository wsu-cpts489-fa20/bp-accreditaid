import React from 'react';

class ViewDeliverable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolder: false,
      deliverable: props.deliverable,
      deliverableSOs: {},

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
    var SOPIs = [];
    var PIs = [];
    var keys = Object.keys(this.state.deliverableSOs);
    for (var i = 0; i < keys.length; i++) {
      //gets each PI from a given SO
      for (var j = 0; j < this.state.deliverableSOs[keys[i]].length; j++) {
        PIs.push(
            <li><input style={{marginRight: 20}} type="checkbox"/>{this.state.deliverableSOs[keys[i]][j]}</li>
        );
      }
      // add SO to the unordered list
      SOPIs.push(
        <ul className="deliverableList">
          <li><input style={{marginRight: 20}} type="checkbox"/>{keys[i]}</li>
          <ul className="deliverableList-pi">
            {PIs}
          </ul>
        </ul>
      );
      //empty to do another SO
      PIs = [];
    }
    return SOPIs;
  }

  displayNeededWorkSamples = () => {
    var workSamples = [];
    for (var i = 0; i < this.state.deliverable.labels.length; i++) {
              workSamples.push(
                <tr>
                  <td>{"Work Sample " + i}</td>
                  <td className={() => this.getLabelClassName(this.state.deliverable.labels[i])}>{this.state.deliverable.labels[i]}</td>
                  <td><a href={"/api/s3?id=" + "coursedeliverable.id" + "&name=" + "coursedeliverable.name"} className="btn btn-primary" > <i className="fa fa-download"></i> Add Sample</a></td>
                </tr>
              );
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
    console.log(this.props.index)
    let prompt = this.state.deliverable.prompt
    var PromptDiv =(<div>
      <h4>Prompt</h4>
      <form onSubmit={e => this.onSubmit(e, this.props.index)}>
          <input className="form-control-file"  type="file"  name="file" ></input>
          <button  className="btn btn-success" name="prompt" type="submit">Upload</button> 
      </form>
      
    </div>)  

  if(prompt != null){
    PromptDiv = (<div>
        <h4>Prompt</h4>
            <a href={"/api/s3?id=" + prompt.id + "&name=" + prompt.name} className="btn btn-primary" > <i className="fa fa-download"></i> Download</a>
            <button onClick={()=>{this.props.deleteFile(prompt.id, prompt.name, this.props.deleteInDatabase_single, "prompt")}} className="btn btn-danger" ><i className="fa fa-trash"/> Delete </button>
            
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
                    <p>{this.displaySOPIs()}</p>
                    <div>
                      <h4>Upload student work samples</h4>
                      <table id="courses-table" className="table table-hover">
                        <thead className="thead-dark">
                          <tr>
                            <th>Name</th>
                            <th>Label</th>
                            <th>Add file</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.deliverable.labels.length == 0 || this.state.deliverable.labels.length == null ?
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