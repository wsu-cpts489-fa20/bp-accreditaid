import React from 'react';

//Component represents a table showing how each course's PI's have been met.
class EvaluatorView extends React.Component {

    constructor(props){
        super(props)
        this.fetchData();
        this.state = {
            program: {},
            SOPIStructure: {} //SOPIStructure 
        }
        
        
    }

    componentDidMount(){
        this.getSOPIsStructure()

    }


    //this.props.currentProgram is the id of the program object in database
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
        } else {
            const msg = await res.json();
            let program = JSON.parse(msg);
            this.setState({program:program});
            this.getSOPIsStructure()
        }
    }


    //Builds 2nd row of headers, required as there's a variable number of PIs
    buildSubHeaders = () => {
        if(this.state.program.studentOutcomes){
            let header = Object.keys(this.state.program.studentOutcomes)
            return header.map((key, index) => {
                return this.state.program.studentOutcomes[key].map( (pi, subIndex) => {
                    return <th key={"SO" + index + "pi-" + subIndex}>{pi}</th>
                })
               
            })
            
        }
        else{
            return (<div/>)
        }
        
    }

    //Iterates through student outcomes and the pi for each studen outcome in program object. Once we have each PI and corresponding SO,
    // we can iterate through the coures deliverables.
    getSOPIsStructure = () => {
        let localSOPIStructure = this.state.SOPIStructure
        if(this.state.program.studentOutcomes){
            let header = Object.keys(this.state.program.studentOutcomes)
            header.map((key, index) => {
                localSOPIStructure[key] = {}
                this.state.program.studentOutcomes[key].map( (pi, subIndex) => {
                    localSOPIStructure[key][pi] = {PIPrior: false, PITaught: false, PIAssessed: false}
                })
            })
        }
        this.setState({SOPIStructure: localSOPIStructure})
    }

    //Builds the top level of headers of the table. This is required as there are a variable number of student outcomes.
    buildSOHeaders = () => {
        if(this.state.program.studentOutcomes){
            let header = Object.keys(this.state.program.studentOutcomes)
            return header.map((key, index) => {
                return <th colSpan={this.state.program.studentOutcomes[key].length} key={"SO-" +index}>{key}</th>
            })
        }
        else{
            return (<div/>)
        }
        
    }

    buildTable = () => {
        let table = [];

        //For each course. Each course corresponds to a row in the table.
        for (let p = 0; p < this.props.courses.length; ++p) {
            //Creates a copy of the SOPI structure so we can iterate through each PI.
            let PIPTAs =  JSON.parse(JSON.stringify(this.state.SOPIStructure));
            if(!Object.keys(PIPTAs).length){
                return (<div> Loading! </div>)
            }
            let syllabusLink = this.props.courses[p].courseSyllabus != null ? ( "/api/s3?id=" + this.props.courses[p].courseSyllabus.id + "&name=" + this.props.courses[p].courseSyllabus.name) : ""
            
            //For each deliverable attached to a course
            for (let q = 0; q < this.props.courses[p].courseDeliverables.length; ++q) 
            {
                //For each student outcome
                for (let s = 0; s < this.props.courses[p].courseDeliverables[q].SOs.length; ++s) 
                {
                    let SOName = this.props.courses[p].courseDeliverables[q].SOs[s]["SOName"];
                    //For each performance indicator in a student outcome
                    for (let t = 0; t < this.props.courses[p].courseDeliverables[q].SOs[s].PIs.length; ++t) 
                    {
                        let PIName = this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PIName"];
                        if(this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PIPrior"])
                            PIPTAs[SOName][PIName]["PIPrior"] = this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PIPrior"];

                        if(this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PITaught"])    
                            PIPTAs[SOName][PIName]["PITaught"] = this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PITaught"];

                        if(this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PIAssessed"])
                            PIPTAs[SOName][PIName]["PIAssessed"] = this.props.courses[p].courseDeliverables[q].SOs[s].PIs[t]["PIAssessed"];
                    }
                }
            }

            let cells = []

            //For each SO:
            for (let so = 0; so < Object.keys(PIPTAs).length; ++so)
            {
                let SOName = Object.keys(PIPTAs)[so];
                //For each performance indicator in an SO:
                for (let pi = 0; pi < Object.keys(PIPTAs[SOName]).length; ++pi)
                {
                    //Create a cell in the table with 3 words, Prior, Taught, Assesed. The color of each word changes if the value has been checked.
                    let PIName = Object.keys(PIPTAs[SOName])[pi]
                    let pstyle = {color: PIPTAs[SOName][PIName][["PIPrior"]] ? "green" : "red"}
                    let tstyle = {color: PIPTAs[SOName][PIName][["PITaught"]] ? "green" : "red"}
                    let astyle = {color: PIPTAs[SOName][PIName][["PIAssessed"]] ? "green" : "red"}
                    cells.push(
                        <td>
                            <span style={pstyle}>Prior</span>
                            <br></br>
                            <span style={tstyle}>Taught</span>
                            <br></br>
                            <span style={astyle}>Assessed</span>
                        </td>
                    )
                }
            }

            //Push basic course information to row.
            table.push(
                <tr key={p}>
                    <td id={"prefix-" +p}>{this.props.courses[p].coursePrefix + this.props.courses[p].courseNumber }</td>
                    <td>{this.props.courses[p].courseName}</td>
                    <td>{this.props.courses[p].courseEmail}</td>
                    <td><a href={syllabusLink}>Syllabus</a></td>
                    {cells}
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
            <table id="eval-table" className="table table-hover">
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