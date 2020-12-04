import React from 'react';

class ViewDeliverable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolder: false,
      deliverable: this.props.deliverable,
      deliverableSOs: {},

    }
  }

  componentDidMount() {
    this.retriveSoPis();
    
  }

  handleDeliverableSubmit = async (event) => {
    event.preventDefault();
    alert("preform Deliverable Update from instructor");
  }

  retriveSoPis = async () =>{
    //This fetches the course that is linked to the deliverable
    var url = '/api/courses/' + this.state.deliverable.deliverableCourseID;
    var res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: 'GET'}); 
    if (res.status != 200) {
        const msg = await res.text();
        console.log(msg);
        this.setState({errorMsg: msg});
    } else { //success! we are ready to get the SOs and PIs from programs
        const msg = await res.json();
        let course = JSON.parse(msg);
        console.log(course.courseProgram);
        //fetching the program
        url = '/api/programs/' + course.courseProgram;
        res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'GET'}); 
        if (res.status != 200) {
            const msg = await res.text();
            this.setState({errorMsg: msg});
        } else { //suscses! we have our program that has 
            const msg = await res.json();
            let program = JSON.parse(msg);
            console.log(program.studentOutcomes);
            this.setState({deliverableSOs: {...program.studentOutcomes}});
        }
    }
  }


  displaySOPIs = () => {
    var SOPIs = [];
    for (var i = 0; i < this.state.deliverable.SOs.length; i++) {
      SOPIs.push(
        <div>
          <p>{this.state.deliverable.SOs[i].SOName}</p>
          <p>{this.state.deliverable.SOs[i].SOStatus}</p>
        </div>
      );
    }
    return SOPIs;
  }

  render() {
    console.log(this.props.deliverable);
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
              <h4>Student Outcomes and Preformace Indicators</h4>
              <p>{this.displaySOPIs()}</p>             
              <div>
              <h4>Upload student work samples</h4>
              <table id="courses-table" className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                    <th>Name</th>
                    <th>Lable</th>
                    <th>Add file</th>
                    </tr>
                </thead>
                <tbody>
                <td>sample name</td>
                <td>sample status</td>
                <td><a href={"/api/s3?id=" + "coursedeliverable.id" + "&name=" + "coursedeliverable.name"} className="btn btn-primary" > <i className="fa fa-download"></i> Add Sample</a></td>
                </tbody>
            </table>
                
                {/*<button onClick={() => alert("delete student work functionality") } className="btn btn-danger" ><i className="fa fa-trash" /> Delete </button>*/}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewDeliverable;