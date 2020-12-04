import React from 'react';

class ViewDeliverable extends React.Component {
  constructor(props) {
    super(props);
    state = {
        placeHolder: false
    }
  }   
  render() {
    return (  
    <div className="modal" role="dialog">
    <div className="modal-dialog modal-lg"></div>
        <div className="modal-content form-center">
            <div className="modal-header">
              <h3><b>Deliverable details</b></h3>
              <button className="modal-close" 
                       onClick={() => this.props.cancel()}>
                &times;</button>
            </div>
            <div className="modal-body">
            
            </div>
        </div>
    </div>
    );
}
}

export default ViewDeliverable;