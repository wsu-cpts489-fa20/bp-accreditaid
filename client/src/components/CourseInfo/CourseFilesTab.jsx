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
        console.log("TYPE: "+ type);
        // add file to FormData object
        const fd = new FormData();
        fd.append('file', file);
    
        // send `POST` request
        fetch("/api/s3", {
            method: 'POST',
            body: fd
        })
        .then(res => res.json())
        .then(json => {console.log(json); return json})
        .then((json) => {db_update(file, json.data.VersionId, type)})
        .catch(err => console.error(err))
    }

    upload_single = (file, id, type) => {
        let body = {};
        body[type] = {id: id, name: file.name};
        
        console.log(body);
        fetch("/api/courses/" + this.props.course._id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            method: 'PUT',
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }

    onSubmit = (event,type) =>{
        event.preventDefault()
        this.uploadFile(this.fileInput.current.files[0], this.upload_single, type)
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
          );
    }

    render() {
        return(
            <div>
                CourseFiles

                <form onSubmit={e => this.onSubmit(e, "courseSyllabus")}>
                    <input type="file"  ref={this.fileInput}></input>
                    <button name="courseSyllabus" id="courseSyllabus" type="submit"></button> 
                </form>
            </div>


        )
    }
}
export default CourseFiles;