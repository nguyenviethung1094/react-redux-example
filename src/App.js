import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAppLoading, getProfileData } from './store/actions'
import logo from './logo.png'
import Popup from './Popup'

class App extends Component {
  render() {
    const { profile } = this.props
    return (
        <section className="container app__main">
          <div className='row headers'>
          <h2>Headers</h2>
        </div>
        <div className='row'>
          <div className='col-2 sidebar'>
            <h2>Sidebar</h2>
          </div>
          <div className='col-10 main-page'>
              <h4>Store Infomation</h4>
              <div className='line'></div>
            <div className='row'>
              <div className='col-4 store-info'>
                <img alt='' src={logo}/>
                <h3>store info</h3>
                <div className='row'>
                  <div className='col-4 title'>Name:</div>
                  <div className='col-8 info'>{profile.name}</div>
                  <div className='col-4 title'>Address:</div>
                  <div className='col-8 info'>{`${profile.address}, ${profile.district}, ${profile.city}`}</div>
                  <div className='col-4 title'>Phone:</div>
                  <div className='col-8 info'>{profile.phone}</div>
                </div>
                <h3>red invoice info</h3>
                <div className='row'>
                  <div className='col-4 title'>Company:</div>
                  <div className='col-8 info'>{profile.redInvoice.name}</div>
                  <div className='col-4 title'>Address:</div>
                  <div className='col-8 info'>{`${profile.redInvoice.address}, ${profile.redInvoice.district}, ${profile.redInvoice.city}`}</div>
                  <div className='col-4 title'>MST:</div>
                  <div className='col-8 info'>{profile.redInvoice.taxCode}</div>
                </div>
                <Popup className='profile-popup'></Popup>
              </div>
              <div className='col-7 store-info message'>
                <h3>Delivery Message</h3>
              </div>
            </div>
          </div>                     
        </div>
        </section>
    );
  }
}
const mapStateToProps = ({ global }) => ({
  loading: global.ui.loading,
  profile: global.data.profile
});
const mapDispatchToProps = {
  updateAppLoadingAction: updateAppLoading,
  getProfileDataAction: getProfileData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
