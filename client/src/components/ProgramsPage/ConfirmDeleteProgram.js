import React from 'react';

class ConfirmDeleteProgram extends React.Component {

    render() {
        return (
        <div id="aboutModal" className="modal" role="dialog">
        <div className="modal-content">
            <div className="modal-header">
              <center>
                <h3 className="modal-title"><b>Confirm Program Deletion</b></h3>
              </center>
               <button id="modalClose" className="modal-close" onClick={this.props.close}>
                 &times;</button>
            </div>
            <div className="modal-body">
              <p>Do you really want to delete this program?</p>
            </div>
            <div className="modal-footer">
                  <button id="confirm-delete" className="btn btn-danger" onClick={this.props.deleteProgram}>
                  Yes, Delete</button>
                  <button id="deny-delete" className="btn btn-secondary" onClick={this.props.close}>
                  No, Cancel</button>
            </div>
        </div>
        </div>
        );
    }
}

export default ConfirmDeleteProgram;