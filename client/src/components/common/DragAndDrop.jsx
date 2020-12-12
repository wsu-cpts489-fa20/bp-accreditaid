import React, { Component } from 'react'

// Drag and Drop input component
class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {drag: false, counter: 0, errorMessage: ""};
        this.inputRef = React.createRef();
    }

    // Handle Drag event. Blank
    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // Handle DragEnter event of when file entered the box.
    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({drag: true, counter: this.state.counter + 1});
        }
        else {
            this.setState({counter: this.state.counter + 1});
        }
    }

    // Handle DragLeave event of when file exited the box.
    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var counter = this.state.counter - 1;
        if (counter === 0) {
            this.setState({drag: false, counter: counter});
        }
        else {
            this.setState({counter: counter});
        }
    }

    // Handle when file was dropped onto the box. Call parent Upload.
    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length == 1) {
            this.inputRef.current.files = e.dataTransfer.files;
            this.props.UploadFile(this.inputRef.current.files);
            e.dataTransfer.clearData();
            this.setState({counter: 0});
        }
        else if(e.dataTransfer.files.length > 1) {
            this.setState({errorMessage: "You can only upload one file at a time!"});
            setTimeout(() => this.setState({errorMessage: ""}), 2000);
        }
    }

    renderMessage = () => {
        if (this.state.errorMessage) {
            return (<span>{this.state.errorMessage} </span>);
        }
        else 
        {
            return(<label for="file"><strong>Choose a file</strong><span class="drag-and-drop-box_dragndrop"> or drag it here</span>.</label>);
        }
    }

    render() {
        var outerClass = "drag-and-drop-outer";
        if (this.state.drag)
        {
            outerClass = "drag-and-drop-outer drag-and-drop-box-dragged";
        }

        if (this.state.errorMessage !== "")
        {
            outerClass = "drag-and-drop-outer drag-and-drop-outer-error"
        }
        return (
        <div className={this.props.className}>
            <div className={outerClass} draggable={true} onDragOver={this.handleDrag} onDrop={this.handleDrop}
                 onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut}>
                <div className="drag-and-drop-box-input">
                    <svg className="drag-and-drop-box-icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43">
                        <path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path>
                    </svg>
                    {this.renderMessage()}
                    <input id="file" ref={this.inputRef} onChange={(e) =>this.props.UploadFile(this.inputRef.current.files)} className="form-control-file" type="file" name="file" style={{display: "none"}} ></input>
                </div>
            </div>
        </div>
        )
    }
}
export default DragAndDrop