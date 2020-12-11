import React from 'react';

class EmailModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '',
        
            sendIcon: "",
            sendText: "Send Email",
            toList: this.props.toList,
            disableSend:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name
        this.setState({ [name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const emailListRegex = /^(([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}),?\s*)+/;

        if(emailListRegex.test(this.state.toList) == false){
            alert("Your email list must be a comma separated list of valid email addresses!");
            return
        }

        let data = {
            toList: this.state.toList,
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
        this.props.close();
    }

    updateToList = (event) => {

        this.setState({toList:event.target.value, disableSend:false})
    }


    render() {
        return (
            <div id="emailModal" className="modal" role="dialog">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Invite to AcreditAid</h3>
                            <button type="button" className="close" onClick={this.props.close} > &times;</button>
                        </div>
                        <div className="modal-body">
                            <center>
                                <form onSubmit={this.handleSubmit}>
                                    <label>To:</label>
                                    <input class="form-control" type="text" value={this.state.toList} pattern="^(([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}),?\s*)+" onChange={this.updateToList} required={true}/>
                                    <small id="emailHelp" class="form-text text-muted">Comma separated list of emails. Ex: "abc@wsu.edu,def@wsu.edu,"</small>
                                    <p />
                                    <label for="subjectinput">
                                        Subject
                                        <input id="subjectinput" className="form-control" type="text" size="40" name="subject" value={this.state.subject} onChange={this.handleChange} required={true}/>
                                    </label>
                                    <p />
                                    <label>Email Body:</label>
                                    <textarea rows="8" className="form-control" name="emailBody" value={this.state.emailBody} onChange={this.handleChange} required={true} />
                                    <p />
                                    <div className="input-group" style={{justifyContent: "center"}}>
                                        <button className="btn btn-color-theme"  style={{width: "40%",fontSize: "32px"}} type="submit" onClick={this.handleSubmit} disabled={this.state.disableSend} >

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