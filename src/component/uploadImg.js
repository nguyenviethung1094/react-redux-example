import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { changeImage } from '../store/actions'
class UploadImage extends Component {
    
    handleChangeImage = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            this.props.handleChangeImage(file, reader.result)
        }
        reader.readAsDataURL(file)
      }

    render () {
        const { profileTemp } = this.props
        return (
            <div className='logo-upload'>
                 <img className='temp-logo' alt='' src={profileTemp.logo}/>
                 <input type='file' style={{display: 'none'}} ref={fileInput => this.fileInput = fileInput} onChange={this.handleChangeImage}/>
                 <Button color="secondary remove" onClick={this.toggle}>Remove</Button>
                 <Button color="secondary upload" onClick={() => this.fileInput.click()}>Upload Image</Button>
            </div>
        )
    }
}


const mapStateToProps = ({ global }) => ({
    profileTemp: global.data.profileTemp
  });
  
  const mapDispatchToProps = {
    handleChangeImage: changeImage
  };
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UploadImage);