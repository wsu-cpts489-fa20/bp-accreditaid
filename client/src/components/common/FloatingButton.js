import React from 'react';

class FloatingButton extends React.Component {
    render() {
      return(
        <div id={this.props.id} className="floatbtn" onClick={this.props.handleClick}>
          <span className="floatbtn-icon fa fa-plus"></span>
        </div>  
      );
    }
}

export default FloatingButton;
