import React, { Component } from 'react'

// Drag and Drop input component
class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        var buttonText = "Upload";
        if (props.buttonText != null)
        {
            buttonText = props.buttonText;
        }
        this.state = {drag: false, buttonText: buttonText, counter: 0};
        this.dropRef = React.createRef();
        this.inputRef = React.createRef();
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

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

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.inputRef.current.dataTransfer.files = e.dataTransfer.files;
            e.dataTransfer.clearData();
            this.setState({counter: 0});
        }
    }

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('drop', this.handleDrop)
    }

    Upload = (e) => {
        e.preventDefault();
        this.props.Upload(this.inputRef.current.dataTransfer.files);
    }

    onTargetClick = () => {
        this.inputRef.current.click();
    }

    render() {
        return (
        <div>
            <div className="drag-and-drop-outer" draggable={true} onDragOver={this.handleDrag} onDrop={this.handleDrop}
                 onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut} onClick={this.onTargetClick}
                style={{display: 'inline-block', position: 'relative', height: 300, width: 300, cursor: "pointer", border: 'solid black 1px'}}
                ref={this.dropRef}>
                <input ref={this.inputRef} className="form-control-file" type="file"  name="file" style={{display: "none"}} ></input>
                <div>Drag and drop file here or click to browse for it.</div>
                {this.state.drag &&
                    <div 
                        style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0, 
                        right: 0,
                        zIndex: 9999,
                        height: "inherit",
                        width: "inherit"
                        }}
                    >
                        <div 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                        >
                        </div>
                    </div>
                }
            </div>
            <button  className="btn btn-color-theme" name="courseSyllabus" type="button" onClick={this.Upload}>{this.state.buttonText}</button> 
        </div>
        )
    }
}
export default DragAndDrop