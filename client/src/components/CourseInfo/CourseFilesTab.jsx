import React from 'react';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    deleteFile = (id, name) => {
        
    }

    uploadFile = (file) => {

        // add file to FormData object
        const fd = new FormData();
        fd.append('file', file);
    
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

                <form onSubmit={this.onSubmit}>
                    <input type="file" id="myFile" name="file" ref={this.fileInput}></input>
                    <button type="submit"></button> 
                </form>
            </div>


        )
    }
}
export default CourseFiles;