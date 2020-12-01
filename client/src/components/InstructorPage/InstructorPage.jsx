import React from 'react';
import CourseTable from "./CourseTable.jsx";

class InstructorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const url = '/api/courses?courseEmail=' + this.props.userObj.id;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'GET'}); 
        if (res.status != 200) {
            const msg = await res.text();
            this.setState({errorMsg: msg});
        } else {
            const msg = await res.json();
            let courses = JSON.parse(msg);
            this.setState({errorMsg: ""});
            this.setState({courses: courses})
        }
    }

    render() {
        return(
        <div>
            <CourseTable 
                        courses={this.state.courses}
                        changeMode={this.props.changeMode}
                        menuOpen={this.props.menuOpen} /> 
        </div>)
    }
}

export default InstructorPage;