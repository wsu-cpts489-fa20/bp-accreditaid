import React from 'react';

class ConfirmDeleteCourse extends React.Component {

    render() {
        return (
        <div id="aboutModal" className="modal" role="dialog">
        <div className="modal-content">
            <div className="modal-header">
              <center>
                <h3 className="modal-title"><b>Confirm Course Deletion</b></h3>
              </center>
               <button id="modalClose" className="modal-close" onClick={this.props.close}>
                 &times;</button>
            </div>
            <div className="modal-body">
              <p>Do you really want to delete this course?</p>
            </div>
            <div className="modal-footer">
                  <button className="btn btn-danger" onClick={this.props.deleteCourse}>
                  Yes, Delete</button>
                  <button className="btn btn-secondary" onClick={this.props.close}>
                  No, Cancel</button>
            </div>
        </div>
        </div>
        );
    }
}

export default ConfirmDeleteCourse;