import React from 'react';
import {connect} from 'react-redux';
import {State} from "../../../interfaces";
import {uploadImage} from '../../../actions/admin/product';

const UploadImage = (props: {
    userId:string;
    token:string;
    uploadImage: Function;
}) => {
    const formData = new FormData(); 

    const onSubmit = () => {
        props.uploadImage(props.userId, props.token, formData);

        const fileInput = document.getElementById("file-input")! as HTMLInputElement;

        fileInput.value = "";
        fileInput.files = null;
    }
    
    return (
        <div className="upload-image">
            <h2>Πρόσθεσε Φωτογραφία Προϊόντος <i className="fas fa-images"></i></h2>

            <form className="admin-form" onSubmit={e => {
                e.preventDefault();

                onSubmit();
            }}>
                <div className="input-group">
                    <label>Φωτογραφία <span className="required">*Υποχρεωτικό</span></label>
                    <input type="file" id="file-input" required={true} onChange={e => {
                        if(e.target.files && e.target.files!.length > 0){
                            formData.set("upload", e.target.files[0]);
                        }
                    }}/>
                </div>

                <button type="submit" className="upload-image-btn btn">Πρόσθεσε την φωτογραφία</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state:State) => ({
    userId: state.admin.user.id,
    token: state.admin.user.token
})

export default connect(mapStateToProps, {uploadImage})(UploadImage);