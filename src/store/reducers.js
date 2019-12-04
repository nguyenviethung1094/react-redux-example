import update from 'react-addons-update';
import { combineReducers } from 'redux';
import { GLOGAL_ACTIONS } from './actions';

const initialState = {
  ui: {
    loading: false
  },
  data: {
    profile : {
      id: '',
      logo: '',
      name: '',
      address: '',
      district: '',
      city: '',
      phone: '',
      redInvoice: {
        name: '',
        address: '',
        district: '',
        city: '',
        taxCode: ''
      }
    },
    profileTemp : {
      id: '',
      logo: '',
      name: '',
      address: '',
      district: '',
      city: '',
      phone: '',
      redInvoice: {
        name: '',
        address: '',
        district: '',
        city: '',
        taxCode: ''
      }
    }
  },
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case GLOGAL_ACTIONS.UPDATE_APP_LOADING:
      return update(state, {
        ui: {
          loading: { $set: action.payload },
        },
      });
      case GLOGAL_ACTIONS.GET_PROFILE_DATA:
        return update(state, {
          data: {
            profile: { $set: action.payload },
            profileTemp: { $set: action.payload }
          },
        });
        case GLOGAL_ACTIONS.UPDATE_PROFILE_TEMP_DATA:
          return update(state, {
            data: {
              profileTemp: {
                [action.payload.key]: { $set:action.payload.value },
              } 
            },
          });
          case GLOGAL_ACTIONS.UPDATE_PROFILE_DATA:
            return update(state, {
              data: {
                profileTemp: {
                  [action.payload.key]: { $set:action.payload.value },
                } 
              },
            });
          case GLOGAL_ACTIONS.UPDATE_PROFILE_INVOICE_TEMP_DATA:
          return update(state, {
            data: {
              profileTemp: {
                redInvoice: {
                  [action.payload.key]: { $set:action.payload.value }
                }
              } 
            },
          });
          case GLOGAL_ACTIONS.CHANGE_IMAGE:
            return update(state, {
              data: {
                profileTemp: {
                  logo: { $set:action.payload.url },
                } 
              },
            });
    default:
      return state;
  }
};

export default combineReducers({
  global
});
