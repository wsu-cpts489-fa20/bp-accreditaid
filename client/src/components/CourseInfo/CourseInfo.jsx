import React from 'react';
import CourseOverviewTab from "./CourseOverviewTab.jsx";
import CourseReadingsTab from "./CourseReadingsTab.jsx";
import CourseMaterialsTab from "./CourseMaterialsTab.jsx";
import CourseDeliverablesTab from "./CourseDeliverablesTab.jsx";


class CourseInfo extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            activeTab: CourseOverviewTab,
            tabClasses: ["nav-link active", "nav-link", "nav-link", "nav-link"]
        };
        console.log(this.props);
    }

    changeTab = (newTab, index) => {
        let newTabClasses = ["nav-link", "nav-link", "nav-link", "nav-link"]
        newTabClasses[index] = "nav-link active";
        this.setState({
            activeTab: newTab,
            tabClasses: newTabClasses
        })
    }

    render() {

        const ActiveTab = this.state.activeTab;
        return(
        <div>
            <div id="navigation-div">
                <button className="btn btn-link" onClick={()=>{this.props.changeMode(this.props.modeParams.prevMode)}} ><span className="fa fa-arrow-left"></span> Back </button>
                
                <h2>{this.props.modeParams.course.courseName}</h2>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a className={this.state.tabClasses[0]}  onClick={()=>{this.changeTab(CourseOverviewTab,0)}} href="#">Course Overview</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[1]} onClick={()=>{this.changeTab(CourseMaterialsTab,1)}}  href="#">Materials</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[2]} onClick={()=>{this.changeTab(CourseReadingsTab,2)}}  href="#">Readings</a>
                    </li>
                    <li class="nav-item">
                        <a className={this.state.tabClasses[3]} onClick={()=>{this.changeTab(CourseDeliverablesTab,3)}}  href="#">Deliverables</a>
                    </li>
                </ul>
            </div>

            <div>
                <ActiveTab
                    {...this.props}
                ></ActiveTab>
            </div>    
        </div>
        )
    }
}
export default CourseInfo;