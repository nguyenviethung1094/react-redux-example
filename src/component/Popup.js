import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileData, updateProfileTemp, updateProfileInvoiceTemp, updateProfile } from '../store/actions'
import { Button, Modal, ModalHeader, ModalBody, Input, Toast, ToastHeader, ToastBody } from 'reactstrap';
import checkPhoneNumber from '../utils/checkPhone'
import checkStoreName from '../utils/checkName'
import UploadImage from './uploadImg'
import { checkUniqueName } from '../service'


class Popup extends Component {
  constructor () {
    super()
    this.address = [
      {
        city: 'HCM',
        district: ['dist1', 'dist2', 'dist3']
      },
      {
        city: 'HN',
        district: ['distA', 'distB', 'distC']
      }
    ]
    this.state = {
      modal: false,
      toast: false,
      toastName: false
    }
  }

  componentWillMount () {
    this.props.getProfileDataAction()
  }
  
  toggle = () => {
    let { modal } = this.state
    this.setState({modal: !modal})
  }
  toggleToast (value) {
    let { toast } = this.state
    if (value) this.setState({toast: value})
    else this.setState({toast: !toast})
  }
  toggleToastName (value) {
    let { toastName } = this.state
    if (value) this.setState({toastName: value})
    else this.setState({toastName: !toastName})
  }

  onInputChange = (e) => {
    this.props.updateAction(e.target.name, e.target.value)
  }

  onInputInvoiceChange = (e) => {
    this.props.updateInvoiceAction(e.target.name, e.target.value)
  }
  
  submit () {
    const { profileTemp } = this.props
    if (!checkPhoneNumber(profileTemp.phone)) {
      this.toggleToast(true)
      return
    }
    checkUniqueName(profileTemp.name)
    .then((res) => {
       if (!!res.data) {
        this.toggleToastName(true)
        return
       }
       this.props.updateProfileAction(profileTemp);
       this.toggle()
    })
  }

  render () {
    const {className, profileTemp} = this.props;
    
    const {modal, toast, toastName} = this.state;
    let currCity = this.address.filter((e) => e.city === profileTemp.city)
    return (
    <div>
      <Button color="secondary" onClick={this.toggle}>Edit Profile</Button>

      <Modal isOpen={modal} toggle={this.toggle} className={className}>
        <ModalHeader toggle={this.toggle}>Edit Store Profile</ModalHeader> 
        <ModalBody>
          <div className='row'>
            <div className='col-5 store-img'>
              <h4>Store image</h4>
              <UploadImage />
            </div>
            <div className='col-7'>
              <h4>Basic Info.</h4>
              <p>Store name</p>
              <Input onChange={this.onInputChange} name='name' type='text' value={profileTemp.name} className='input-full' />
              <Toast isOpen={toastName}>
                <ToastHeader icon="danger" toggle={()=>this.toggleToastName()}>Error</ToastHeader>
                <ToastBody>
                  This name is already use or empty
                </ToastBody>
              </Toast>
              <p>Store Address</p>
              <Input onChange={this.onInputChange} name='address' type='text' placeholder='Address' value={profileTemp.address} className='input-half' />
              <Input onChange={this.onInputChange} type='select' value={profileTemp.district} name='district'>
                <option value=''>District</option>
                {
                  !!currCity && !!currCity.length && !!currCity[0].district && !!currCity[0].district.length && currCity[0].district.map((e) => {
                      return <option value={e}>{e}</option>
                  })
                }
              </Input>
              <Input onChange={this.onInputChange} value={profileTemp.city} type='select' name='city'>
                <option value=''>City</option>
                {
                  !!this.address && !!this.address.length && this.address.map((e) => {
                      return <option value={e.city}>{e.city}</option>
                  })
                }
              </Input>
              <p>Phone #</p>
              <Input onChange={this.onInputChange} name='phone' type='text' value={profileTemp.phone} className='input-full' />
              <Toast isOpen={toast}>
                <ToastHeader  icon="danger" toggle={()=>this.toggleToast()}>Error</ToastHeader>
                <ToastBody>
                  Your Phone number is invalid!
                </ToastBody>
              </Toast>
              <h4>Red Invoice info.</h4>
              <p>Company name</p>
              <Input onChange={this.onInputInvoiceChange} name='name' type='text' value={profileTemp.redInvoice.name} className='input-full' />
              <p>Company Address</p>
              <Input onChange={this.onInputInvoiceChange} name='address' type='text' placeholder='Address' value={profileTemp.redInvoice.address} className='input-half' />
              <Input onChange={this.onInputInvoiceChange} type='select' value={profileTemp.redInvoice.district} name='district'>
                <option value=''>District</option>
                  {
                    !!currCity && !!currCity.length && !!currCity[0].district && !!currCity[0].district.length && currCity[0].district.map((e) => {
                      return <option value={e}>{e}</option>
                    })
                  }
              </Input>
              <Input onChange={this.onInputInvoiceChange} type='select' value={profileTemp.redInvoice.city} name='city'>
                <option value=''>City</option>
                {
                  !!this.address && !!this.address.length && this.address.map((e) => {
                      return <option value={e.city}>{e.city}</option>
                  })
                }
              </Input>
              <p>MST</p>
              <Input onChange={this.onInputInvoiceChange} name='taxCode' type='text' value={profileTemp.redInvoice.taxCode} className='input-full' />
              <Button color="primary" onClick={()=>this.submit()}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
    )
  }
}


const mapStateToProps = ({ global }) => ({
  loading: global.ui.loading,
  profileTemp: global.data.profileTemp
});

const mapDispatchToProps = {
  getProfileDataAction: getProfileData,
  updateAction: updateProfileTemp,
  updateInvoiceAction: updateProfileInvoiceTemp,
  updateProfileAction: updateProfile
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);