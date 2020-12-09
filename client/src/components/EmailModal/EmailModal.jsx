import React from 'react';

class EmailModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '',
        
            sendIcon: "",
            sendText: "Send Email",
            disableSend:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        console.log("Opened email modal");
    }

    handleChange(event) {
        const name = event.target.name
        this.setState({ [name]: event.target.value });
    }

    handleSubmit(event) {
        let data = {
            toList: this.props.toList,
            emailSubject: this.state.subject,
            emailBody: this.state.emailBody
        }
        this.setState({sendIcon:"spinner-border spinner-border-sm",
                        sendText:"Sending... ",
                        disableSend:true
                    })
                // Default options are marked with *
        fetch("/email", {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
        event.preventDefault();
        this.props.close();
    }


    render() {
        return (
            <div id="emailModal" className="modal" role="dialog">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Invite Instructors</h3>
                            <button type="button" className="close" onClick={this.props.close} > &times;</button>
                        </div>
                        <div className="modal-body">
                            <center>
                                <form onSubmit={this.handleSubmit}>
                                    <label>To:</label>
                                    <input class="form-control" type="text" value={this.props.toList} readonly />
                                    <p />
                                    <label for="subjectinput">
                                        Subject
                                        <input id="subjectinput" className="form-control" type="text" name="subject" value={this.state.subject} onChange={this.handleChange} required />
                                    </label>
                                    <p />
                                    <label>Email body</label>
                                    <textarea rows="8" className="form-control" name="emailBody" value={this.state.emailBody} onChange={this.handleChange} required />
                                    <p />
                                    <div className="input-group">
                                        <button className="btn btn-color-theme" type="submit" onClick={this.handleSubmit} disabled={this.state.disableSend} >

                                            {this.state.sendText}
                                            
                                            <span class={this.state.sendIcon} role="status" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                       
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailModal;