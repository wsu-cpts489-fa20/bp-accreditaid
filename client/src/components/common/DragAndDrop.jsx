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
        this.state = {drag: false, buttonText: buttonText};
        this.dropRef = React.createRef();
        this.inputRef = React.createRef();
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: true})
    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
    }

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false})
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.inputRef.dataTransfer.files = e.dataTransfer.files;
            e.dataTransfer.clearData();
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
        this.props.Upload(this.inputRef.dataTransfer.files);
    }

    render() {
        return (
        <div>
            <div onDrop={this.handleDrop} onDragStart={this.handleDragIn} onDragEnd={this.handleDragOut} onClick={this.inputRef.onClick}
                style={{display: 'inline-block', position: 'relative', height: 300, width: 300 }}
                ref={this.dropRef}>
                <input ref={this.inputRef} className="form-control-file" type="file"  name="file" style={{display: "none"}} ></input>
                {this.state.dragging &&
                    <div 
                        style={{
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba(255,255,255,.8)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0, 
                        right: 0,
                        zIndex: 9999
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
                        <div>Drag and drop file here or click to browse for it.</div>
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