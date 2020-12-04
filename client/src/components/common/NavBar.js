import React from 'react';
import logo from '../../images/wsu-logo-white.png'
import AppMode from '../../AppMode';

class NavBar extends React.Component {

  getMenuBtnIcon = () => {
      if (this.props.mode === AppMode.PROGRAMS_LOGPROGRAM || 
          this.props.mode === AppMode.PROGRAMS_EDITPROGRAM ||
          this.props.mode === AppMode.COURSES_LOGCOURSE ||
          this.props.mode === AppMode.COURSES_EDITCOURSE ||
          this.props.mode === AppMode.DELIVERABLES ||
          this.props.mode === AppMode.DELIVERABLES_EDITLABELS ||
          this.props.mode === AppMode.DELIVERABLES_LOGDELIVERABLE ||
          this.props.mode === AppMode.COURSES)
          return "fa fa-arrow-left";
      if (this.props.menuOpen)
        return "fa fa-times";
      return "fa fa-bars";
  }

  handleMenuBtnClick = () => {
    if (this.props.mode === AppMode.PROGRAMS_LOGPROGRAM ||
        this.props.mode === AppMode.PROGRAMS_EDITPROGRAM) 
    {
      this.props.changeMode(AppMode.PROGRAMS);
    } 
    else if (this.props.mode === AppMode.COURSES_LOGCOURSE ||
        this.props.mode === AppMode.COURSES_EDITCOURSE) 
    {
      this.props.changeMode(AppMode.COURSES);
    } 
    else if (this.props.mode === AppMode.COURSES) 
    {
      this.props.changeMode(AppMode.PROGRAMS);
    } 
    else if (this.props.mode === AppMode.DELIVERABLES) {
      this.props.changeMode(AppMode.COURSES);
    }
    else if (this.props.mode === AppMode.DELIVERABLES_EDITLABELS || 
        this.props.mode === AppMode.DELIVERABLES_LOGDELIVERABLE) {
      this.props.changeMode(AppMode.DELIVERABLES);
    }
    else if (this.props.mode != AppMode.LOGIN) 
    {
      this.props.toggleMenuOpen();
    }
  }

    
  render() {
    return (
    <div className="navbar">  
    <span className="navbar-items">
      <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
        <span id="menuBtnIcon" className={"sidemenu-btn-icon " + this.getMenuBtnIcon()}>
        </span>
      </button>
      <img className="wsu-logo" src={logo} alt="WSU Logo" height="38px"
      width="38px"/>
      <span className="navbar-title">
        &nbsp;{this.props.title}
      </span>
    </span>
  </div>
); 
}
}

export default NavBar;
