import React from 'react';
import AppMode from '../../AppMode.js';
import CoursesTable from './CoursesTable.js';
import FloatingButton from '../common/FloatingButton.js';

class Courses extends React.Component {

    render() {
        switch(this.props.mode) {
            case AppMode.COURSES:
                return (
                    <>
                        <CoursesTable/>
                        <FloatingButton
                            handleClick={() => 
                                this.props.changeMode(AppMode.COURSES_LOGCOURSE)}
                            menuOpen={this.props.menuOpen}
                            icon={"fa fa-plus"}
                        />
                    </>
                );
            case AppMode.COURSES_LOGCOURSE:
                return (
                    <>
                    </>
                );
            case AppMode.COURSES_EDITCOURSE:
                return (
                    <>
                    </>
                );
        }
    }
}

export default Courses;