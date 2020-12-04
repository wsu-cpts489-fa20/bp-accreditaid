import React from 'react';
import AppMode from '../../AppMode.js';

class DeliverablesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                        name: "",
                        description: "",
                        faIcon: "fa fa-check-square-o"
                     };    
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleSubmit = (event) => {
        this.setState({faIcon: "fa fa-spin fa-spinner"});
        let deliverableData = {};
        deliverableData.deliverableName = this.state.name;
        deliverableData.description = this.state.description;
        setTimeout(this.props.saveDeliverable, 1000, deliverableData);
        event.preventDefault();
        setTimeout(()=>{
            this.setState({faIcon: "fa fa-check-square-o"});}, 1000); 
    }

    render() {
        return (
            <div id="deliverables-form">
                <form onSubmit={this.handleSubmit}>
                    <center>
                        <label>
                            Name:
                            <input 
                                id="deliverable-name" 
                                name="name" 
                                className="form-control form-center" 
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange} 
                                required={true}
                                placeholder="Deliverable Name" 
                                size="41" 
                                maxLength="50" 
                            />
                        </label>
                        <p></p>
                        <label>
                            Description:
                            <textarea 
                                id="deliverable-description" 
                                name="description"
                                className="form-control form-center" 
                                type="text"
                                value={this.state.description}
                                onChange={this.handleChange}
                                required={true}
                                placeholder="Deliverable Description"
                                rows="6" 
                                cols="75" 
                            />
                        </label>
                        <p></p>
                        <br/>
                        <button role="submit"
                            id="deliverables-submit"
                            className="btn btn-primary btn-color-theme modal-submit-btn"
                            style={{marginBottom: "20px", height: "70px", width: "40%"}}>
                            <span className={this.state.faIcon}></span>&nbsp;Add Deliverable
                        </button>
                    </center>
                </form>
            </div>
        );
    }

}

export default DeliverablesForm;