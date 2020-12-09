import React from 'react';

class EvaluatorView extends React.Component {

    constructor(props){
        super(props)
        this.fetchData();
        this.state = {
            program: {},
            SOPIStructure: {}
        }
    }

    componentDidMount(){
        
    }

    fetchData = async () => {
        const url = '/api/programs/' + this.props.currentProgram;
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'GET'}); 
        if (res.status != 200) {
            const msg = await res.text();
            console.log(msg);
        } else {
            const msg = await res.json();
            console.log(msg);
            let program = JSON.parse(msg);
            console.log(program)
            this.setState({program:program});

        }
    }



    buildSubHeaders = () => {
        let SOPIStructure = this.state.SOPIStructure
        if(this.state.program.studentOutcomes){
            let header = Object.keys(this.state.program.studentOutcomes)
            return header.map((key, index) => {
                return this.state.program.studentOutcomes[key].map( (pi, subIndex) => {
                    SOPIStructure[key][pi] = {PIPrior: false, PITaught: false, PIAssessed: false}
                    this.setState({SOPIStructure: SOPIStructure})
                    return <th key={"SO" + index + "pi-" + subIndex}>{pi}</th>
                })
               
            })
            
        }
        else{
            return (<div/>)
        }
        
    }

    buildSOHeaders = () => {
        let SOPIStructure = this.state.SOPIStructure
        if(this.state.program.studentOutcomes){
            let header = Object.keys(this.state.program.studentOutcomes)
            return header.map((key, index) => {
                SOPIStructure[key] = {}
                this.setState({SOPIStructure: SOPIStructure})
                return <th colSpan={this.state.program.studentOutcomes[key].length} key={"SO-" +index}>{key}</th>
            })
        }
        else{
            return (<div/>)
        }
        
    }

    getPerformanceIndicators = () => {

    }

    buildTable = () => {
        
        let table = [];
        for (let p = 0; p < this.props.courses.length; ++p) {
            let syllabusLink = this.props.courses[p].courseSyllabus != null ? ( "/api/s3?id=" + this.props.courses[p].courseSyllabus.id + "&name=" + this.props.courses[p].courseSyllabus.name) : ""
            table.push(
                <tr key={p}>
                    <td>{this.props.courses[p].coursePrefix + this.props.courses[p].courseNumber }</td>
                    <td>{this.props.courses[p].courseName}</td>
                    <td>{this.props.courses[p].courseEmail}</td>
                    <td><a href={syllabusLink}>Syllabus</a></td>

                </tr> 
            );
        }
        return table;
    }

    render() {

        const divStyle={
            overflowX: 'scroll'
          };


        let SOHeaders = <div></div>
        return (
        <div style={divStyle}>
            <table id="courses-table" className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th colSpan="4">Course Information</th>
                        {this.buildSOHeaders()}
                    </tr>
                    <tr>
                        <th>Course #</th>
                        <th>Course Title</th>
                        <th>Coordinator</th>
                        <th>Syllabus</th>
                        {this.buildSubHeaders()}
                    </tr>
                </thead>
                <tbody>
                    {this.buildTable()}
                </tbody>
            </table>
        </div>
        )
    }
}

export default EvaluatorView;