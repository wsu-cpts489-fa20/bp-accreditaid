import React from 'react';

class CourseFiles extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    deleteFile = (id, name, db_update, key, index=0) => {
        fetch(("/api/s3?id=" + id + "&name=" + name), {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err))
        .then(() => {db_update(key, index)});
    }

    uploadFile = (file, db_update, type) => {

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
        .catch(err => console.error(err))
        .then(() => {db_update(file, json.body.VersionId, type)});
    }

    upload_single = (file, id, type) => {
        let body = {};
        body[type] = {id: id, file: file};
        fetch("/api/course/" + this.props.course._id, {
            method: 'PUT',
            body: body
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    onSubmit = (event) =>{
        console.log(this.fileInput.current.files[0]);
        event.preventDefault()
        this.uploadFile(this.fileInput.current.files[0], this.upload_single, event.target.id)
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
          );
    }

    render() {
        return(
            <div>
                CourseFiles

                <form onSubmit={this.onSubmit}>
                    <input type="file" id="courseSyllabus" name="file" ref={this.fileInput}></input>
                    <button type="submit"></button> 
                </form>
            </div>


        )
    }
}
export default CourseFiles;