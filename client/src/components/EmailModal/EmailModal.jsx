import { response } from 'express';
import React from 'react';

class EmailModal extends React.Component {

    constructor(props) {
        console.log("Opened email modal");
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name
        this.setState({ [name]: event.target.value });
    }

    handleSubmit(event) {
        let data = {
            toList: "micah.priddis@wsu.edu",
            emailSubject: this.state.subject,
            emailBody: this.state.emailBody
        }
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
                }).then(response => response.json())
                  .then(data => console.log)// parses JSON response into native JavaScript objects

        event.preventDefault();
    }


    render() {
        return (
            <div id="emailModal" className="modal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Invite Instructors</h3>
                            <button className="modal-close" onClick={this.props.close} />
                        </div>
                        <div className="modal-body">
                            <center>
                                <form onSubmit={this.handleSubmit}>
                                    <label for="subjectinput">
                                        Subject:
                                        <input id="subjectinput" className="form-control" type="text" name="subject" value={this.state.subject} onChange={this.handleChange} required />
                                    </label>
                                    <p />
                                    <label>Email body</label>
                                    <textarea className="form-control" name="emailBody" value={this.state.emailBody} onChange={this.handleChange} required />
                                    <p />
                                    <input text="Send Email" className="btn btn-primary btn-color-theme" type="submit" value="Submit" onClick={this.handleSubmit} />
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