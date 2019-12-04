import {fakeRequest} from '../service'
export const GLOGAL_ACTIONS = {
  UPDATE_APP_LOADING: "UPDATE_APP_LOADING",
  GET_PROFILE_DATA: "GET_PROFILE_DATA",
  UPDATE_PROFILE_TEMP_DATA: "UPDATE_PROFILE_TEMP_DATA",
  UPDATE_PROFILE_INVOICE_TEMP_DATA: "UPDATE_PROFILE_INVOICE_TEMP_DATA",
  CHANGE_IMAGE: "CHANGE_IMAGE"
};

export const updateAppLoading = payload => (dispatch) => {
  dispatch({
    type: GLOGAL_ACTIONS.UPDATE_APP_LOADING,
    payload,
  });
};


export const updateProfileTemp = (key, value) => (dispatch) => {
  dispatch({
    type: GLOGAL_ACTIONS.UPDATE_PROFILE_TEMP_DATA,
    payload: {key, value},
  });
};

export const updateProfileInvoiceTemp = (key, value) => (dispatch) => {
  dispatch({
    type: GLOGAL_ACTIONS.UPDATE_PROFILE_INVOICE_TEMP_DATA,
    payload: {key, value},
  });
};

export const changeImage = (file, url) => (dispatch) => {
  dispatch({
    type: GLOGAL_ACTIONS.CHANGE_IMAGE,
    payload: {file, url},
  });
};

export const updateProfile = () => (dispatch, getState) => {
  const state = getState()
  fakeRequest(state.global.data.profileTemp)
  .then((res) => {
    dispatch({
      type: GLOGAL_ACTIONS.GET_PROFILE_DATA,
      payload: res.data,
    });
  })
};

export const getProfileData = () => (dispatch) => {
  let request = {
      id: '1',
      logo: require('../logo.png'),
      name: 'KOI THE',
      address: '123',
      district: 'dist1',
      city: 'HCM',
      phone: '0979158561',
      redInvoice: {
        name: 'KOI THE',
        address: '123',
        district: 'dist1',
        city: 'HCM',
        taxCode: 'P123456'
      }
  }
  fakeRequest(request)
  .then((res) => {
    dispatch({
      type: GLOGAL_ACTIONS.GET_PROFILE_DATA,
      payload: res.data,
    });
  })
};


