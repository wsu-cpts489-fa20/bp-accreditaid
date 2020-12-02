import React from 'react';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    uploadFile = (file) => {

        // add file to FormData object
        const fd = new FormData();
        fd.append('doc', file);
    
        // send `POST` request
        fetch("/api/s3", {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    onSubmit = (event) =>{
        console.log(this.fileInput.current.files[0]);
        event.preventDefault()
        this.uploadFile(this.fileInput.current.files[0])
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
          );
    }

    render() {
        return(
            <div>
                CourseFiles

                <form onSubmit={this.handleSubmit}>
                    <input type="file" id="myFile" name="" ref={this.fileInput}></input>
                    <button type="submit"></button> 
                </form>
            </div>
        )
    }
}
export default CourseFiles;