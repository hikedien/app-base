import React, { useState, useEffect, Component, PureComponent, useCallback } from 'react';
import { useDispatch, connect, useSelector, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import Axios from 'axios';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';
import * as Icon from 'react-feather';
import { AlertTriangle, Check, User, Lock, FileText, Shield, Globe, MessageSquare, Power, Search, X, Bell, Menu, Home, List, PlusCircle, Gift, ArrowUp, Disc, Circle, ChevronRight, ChevronDown, Sun } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
export { toast } from 'react-toastify';
import { FormattedMessage, injectIntl, IntlProvider, useIntl } from 'react-intl';
export { FormattedMessage } from 'react-intl';
import { createBrowserHistory } from 'history';
import sessionStorage from 'redux-persist/es/storage/session';
import { useHistory, Link, Router, Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { FormGroup, Label, DropdownMenu, DropdownItem, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Navbar as Navbar$1, Button, Badge, Input, Row, Col, Media, Card, CardHeader, CardTitle, CardBody, Nav, TabContent, TabPane, Collapse, Modal, ModalBody } from 'reactstrap';
export { Button } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';
import Hammer from 'react-hammerjs';
import { object, string, ref } from 'yup';
import { Field, Formik, Form, FastField } from 'formik';
import Flatpickr from 'react-flatpickr';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import styled from 'styled-components';
import SweetAlert from 'react-bootstrap-sweetalert';
import TopBarProgress from 'react-topbar-progress-indicator';
import Ripples from 'react-ripples';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'prismjs/themes/prism-tomorrow.css';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
const trimValue = value => {
  return value ? value.trim() : '';
};
const bytesToMb = bytes => {
  return Math.round(bytes / Math.pow(1024, 2), 2);
};
const trimObjectValues = (object, excludeKeys = []) => {
  if (!object) {
    return;
  }

  Object.keys(object).forEach(key => {
    if (excludeKeys.indexOf(key) >= 0) {
      return;
    }

    switch (typeof object[key]) {
      case 'string':
        object[key] = trimValue(object[key]);
        break;

      case 'object':
        trimObjectValues(object[key]);
    }
  });
  return object;
};
const toastError = message => {
  toast.error( /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-1 p-0"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    size: 24
  })), /*#__PURE__*/React.createElement("p", {
    className: "mx-1 my-0"
  }, message)));
};
const toastSuccess = message => {
  toast.success( /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-1 p-0"
  }, /*#__PURE__*/React.createElement(Check, {
    size: 24
  })), /*#__PURE__*/React.createElement("p", {
    className: "mx-1 my-0"
  }, message)));
};

var index = {
  __proto__: null,
  generateUUID: generateUUID,
  trimValue: trimValue,
  bytesToMb: bytesToMb,
  trimObjectValues: trimObjectValues,
  toastError: toastError,
  toastSuccess: toastSuccess
};

const AppId = {
  APP_NO1: 'APP_NO1',
  INSURANCE_APP: 'INSURANCE_APP',
  SUPPLEMENT_APP: 'SUPPLEMENT_APP',
  ELITE_APP: 'ELITE_APP'
};

const API_BASE_URL = 'https://apisit.inon.vn';
const API_LOGIN_URL = '/api/authenticate';
const API_LOGOUT_URL = '/api/authenticate';
const API_CHANGE_PASSWORD = '/api/change-password';
const API_REGISTER = '/nth/onboarding/api/authenticate/register';
const API_GET_USER = '/nth/user/api/users';
const API_USER_SETTINGS = '/nth/user/api/user-settings';
const API_UPDATE_USER_INFO = '/nth/user/api/update-user-info';
const API_GET_NAV_CONFIGS = '/nth/accesscontrol/api/roles';
const API_GET_USER_ROLES = '/nth/accesscontrol/api/user-group-roles';
const API_CREATE_PASSWORD = '/nth/onboarding/api/authenticate/create-new-password';
const API_GET_USER_BY_REGISTER_TOKEN = '/nth/onboarding/api/authenticate/get-partner';
const API_COMPLETE_INFO = '/nth/onboarding/api/authenticate/complete-info';
const API_FORGOT_PASSWORD = '/api/authenticate/forgot-password';
const API_RESET_PASSWORD = '/api/authenticate/reset-password';
const API_EMAIL_SUGGESTION = '/nth/user/api/authenticate/email-suggestion';
const API_R_200 = 200;
const API_GET_CITIES_BY_COUNTRY = '/nth/datacollection/api/citiesbycountry';
const API_GET_DISTRICTS_BY_CITY = '/nth/datacollection/api/districtsbycity';
const API_GET_WARDS_BY_CITY = '/nth/datacollection/api/wardsbydistrict';
const API_GET_BANKS = '/nth/datacollection/api/allBanks';
const API_UPLOAD_FILE = '/nth/file/api/upload';
const API_GET_FILE = '/nth/file/api/file';
const MAX_MOBILE_WIDTH = 768;
const MAX_TABLET_WIDTH = 1024;
const REMEMBER_ME_TOKEN = 'rememberMe';
const VN_COUNTRY_CODE = 192;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*])).{8,}$/gm;
const PHONE_REGEX = /\b(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const PERSONAL_ID_REGEX = /^(\d{9}|\d{12})$/;
const CITIZEN_INDENTIFY_REGEX = /^(\d{12})$/;
const PASSPORT_REGEX = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
const NAME_REGEX = /^([ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếềìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý0-9A-Za-z_ ])+$/g;
const AUTHORITIES = {
  VIEW: 'view',
  EDIT: 'edit',
  APPROVE: 'approve',
  CREATE: 'create'
};
const API_TIME_OUT = 70000;
const MAX_FILE_SIZE = 5;
const CONTACT_PHONE = '0899.300.800';
const SESSION_TIMEOUT = 15;
const LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
const USER_TYPE = {
  KD: 'KD',
  HTKD: 'HTKD'
};
const GENDER_OPTIONS = [{
  value: 'MALE',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.gender.male"
  })
}, {
  value: 'FEMALE',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.gender.female"
  })
}, {
  value: 'OTHER',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.gender.other"
  })
}];
const IC_TYPES_OPTIONS = [{
  value: 'HC',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.icType.passport"
  })
}, {
  value: 'CMND',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.icType.personalID"
  })
}, {
  value: 'CCCD',
  label: /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.icType.citizenIdentify"
  })
}];
const getExternalAppUrl = (appId, url) => {
  switch (appId) {
    case AppId.APP_NO1:
      return `${window.location.origin}/${url}?redirectUrl=${url}`;

    case AppId.INSURANCE_APP:
      return `${window.location.origin}/insurance${url}?redirectUrl=${url}`;

    case AppId.SUPPLEMENT_APP:
      return `${window.location.origin}/supplement${url}?redirectUrl=${url}`;

    case AppId.ELITE_APP:
      return `${window.location.origin}/elite${url}?redirectUrl=${url}`;
  }
};
const getContextPath = appId => {
  switch (appId) {
    case AppId.APP_NO1:
      return '';

    case AppId.INSURANCE_APP:
      return 'insurance';

    case AppId.SUPPLEMENT_APP:
      return 'supplement';

    case AppId.ELITE_APP:
      return 'elite';
  }
};
const getPropObject = (obj, prop) => {
  if (!obj) {
    return null;
  }

  return prop.split('.').reduce((r, e) => {
    return r ? r[e] : null;
  }, obj);
};
const USER_ROLE = {
  ADMIN: 'AD.IO',
  KD: 'KD.IO',
  HTKD: 'HTKD.IO',
  KT: 'KT.IO',
  VH: 'VH.IO',
  DTL1: 'L1.DT',
  DTL2: 'L2.DT',
  DTL3: 'L3.DT',
  DTL4: 'L4.DT',
  DTL5: 'L5.DT',
  DTLX: 'LX.DT',
  BH: 'BH',
  BTBH: 'BTBH',
  HTDT: 'HT.DT'
};
const IMAGE = {
  LOGO: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Logo.svg?alt=media&token=e2aad749-912d-45c3-969b-060528c6c7ef',
  LOGO_NO_TEXT: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/logo-no-text.svg?alt=media&token=e2383562-e9d0-4b31-80fa-58a3fc47b1bd',
  LOGO_TEXT: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/logo-text.svg?alt=media&token=52459968-57b8-4b21-9af2-febdd7a7650d',
  NAV_ICON_1: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-1.png?alt=media&token=0ccdb6bc-09da-43a3-b18f-56d2598e542b',
  NAV_ICON_2: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-2.png?alt=media&token=def3402b-65f0-458b-b4f8-e9c6d8d3bb09',
  NAV_ICON_3: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-3.png?alt=media&token=1ce1a25c-b095-4f80-8987-3ae9b977e3a8',
  NAV_ICON_4: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-4.png?alt=media&token=549432c1-9dd6-4d0a-948a-3f2de513d238',
  NAV_ICON_5: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-5.png?alt=media&token=659d7162-783c-42ed-af7a-d05d0a3be595',
  BUY_INSURANCE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Vector.png?alt=media&token=56bac236-f494-4643-81f1-11611229e62e',
  LOGO_WHITE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/LogoWhite.png?alt=media&token=8289e81f-7b3f-41cd-b5dc-5220bbe8d203',
  LANDING_PAGE_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Signup-01%203%20(1).png?alt=media&token=19aca74e-c81f-40e2-a00d-a91b7ee9f27a',
  LANDING_PAGE_2_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/BG-step5-02%201.png?alt=media&token=2902f404-802a-4c4a-89f5-39a4cd72ab44',
  LANDING_PAGE_TABLET_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Bg-ipad(doc)-05.png?alt=media&token=2a140f47-3de6-4a08-9eed-5e2e26e57252',
  DOWNLOAD_APP_IOS: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-03.png?alt=media&token=c9a13eca-3fe6-40d0-ac1d-df417b95385d',
  DOWNLOAD_APP_ANDROID: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-01.png?alt=media&token=b2aefa9d-d464-41d3-9fd0-b374ed0dca93'
};

var appConfigs = {
  __proto__: null,
  API_BASE_URL: API_BASE_URL,
  API_LOGIN_URL: API_LOGIN_URL,
  API_LOGOUT_URL: API_LOGOUT_URL,
  API_CHANGE_PASSWORD: API_CHANGE_PASSWORD,
  API_REGISTER: API_REGISTER,
  API_GET_USER: API_GET_USER,
  API_USER_SETTINGS: API_USER_SETTINGS,
  API_UPDATE_USER_INFO: API_UPDATE_USER_INFO,
  API_GET_NAV_CONFIGS: API_GET_NAV_CONFIGS,
  API_GET_USER_ROLES: API_GET_USER_ROLES,
  API_CREATE_PASSWORD: API_CREATE_PASSWORD,
  API_GET_USER_BY_REGISTER_TOKEN: API_GET_USER_BY_REGISTER_TOKEN,
  API_COMPLETE_INFO: API_COMPLETE_INFO,
  API_FORGOT_PASSWORD: API_FORGOT_PASSWORD,
  API_RESET_PASSWORD: API_RESET_PASSWORD,
  API_EMAIL_SUGGESTION: API_EMAIL_SUGGESTION,
  API_R_200: API_R_200,
  API_GET_CITIES_BY_COUNTRY: API_GET_CITIES_BY_COUNTRY,
  API_GET_DISTRICTS_BY_CITY: API_GET_DISTRICTS_BY_CITY,
  API_GET_WARDS_BY_CITY: API_GET_WARDS_BY_CITY,
  API_GET_BANKS: API_GET_BANKS,
  API_UPLOAD_FILE: API_UPLOAD_FILE,
  API_GET_FILE: API_GET_FILE,
  MAX_MOBILE_WIDTH: MAX_MOBILE_WIDTH,
  MAX_TABLET_WIDTH: MAX_TABLET_WIDTH,
  REMEMBER_ME_TOKEN: REMEMBER_ME_TOKEN,
  VN_COUNTRY_CODE: VN_COUNTRY_CODE,
  PASSWORD_REGEX: PASSWORD_REGEX,
  PHONE_REGEX: PHONE_REGEX,
  PERSONAL_ID_REGEX: PERSONAL_ID_REGEX,
  CITIZEN_INDENTIFY_REGEX: CITIZEN_INDENTIFY_REGEX,
  PASSPORT_REGEX: PASSPORT_REGEX,
  NAME_REGEX: NAME_REGEX,
  AUTHORITIES: AUTHORITIES,
  API_TIME_OUT: API_TIME_OUT,
  MAX_FILE_SIZE: MAX_FILE_SIZE,
  CONTACT_PHONE: CONTACT_PHONE,
  SESSION_TIMEOUT: SESSION_TIMEOUT,
  LOGIN_STATUS: LOGIN_STATUS,
  USER_TYPE: USER_TYPE,
  GENDER_OPTIONS: GENDER_OPTIONS,
  IC_TYPES_OPTIONS: IC_TYPES_OPTIONS,
  getExternalAppUrl: getExternalAppUrl,
  getContextPath: getContextPath,
  getPropObject: getPropObject,
  USER_ROLE: USER_ROLE,
  IMAGE: IMAGE
};

let history = createBrowserHistory({
  basename: ''
});
const setBaseHistory = appHistory => {
  history = appHistory;
};

class AuthService {}

AuthService.login = user => {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.getUserInfo = (username, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  };
  return HttpClient.get(`${API_GET_USER}/${username}`, {
    headers
  });
};

AuthService.getUserByRegisterToken = registerToken => {
  return HttpClient.get(`${API_GET_USER_BY_REGISTER_TOKEN}/${registerToken}`);
};

AuthService.compeleteInfo = user => {
  return HttpClient.post(`${API_COMPLETE_INFO}`, user);
};

AuthService.logout = user => {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.createPassword = (password, registerToken) => {
  return HttpClient.post(API_CREATE_PASSWORD, {
    password,
    registerToken
  });
};

AuthService.register = user => {
  return HttpClient.post(API_REGISTER, user);
};

AuthService.checkLoginByToken = () => {
  return HttpClient.get(API_LOGIN_URL);
};

AuthService.getSuggestionEmail = username => {
  return HttpClient.get(`${API_EMAIL_SUGGESTION}/${username}`);
};

AuthService.forgotPassword = (username, email) => {
  return HttpClient.post(API_FORGOT_PASSWORD, {
    username,
    email
  });
};

AuthService.resetPassword = (password, resetToken) => {
  return HttpClient.post(API_RESET_PASSWORD, {
    password,
    resetToken
  });
};

AuthService.updateUserInfo = user => {
  return HttpClient.put(API_UPDATE_USER_INFO, user);
};

AuthService.changePassword = value => {
  return HttpClient.post(API_CHANGE_PASSWORD, value);
};

AuthService.changeUserSetting = value => {
  return HttpClient.put(API_USER_SETTINGS, value);
};

AuthService.updateAvatar = async (user, file) => {
  const formData = new FormData();
  formData.append('fileInfo', new Blob([JSON.stringify({
    userId: user.id,
    docType: 'AVATAR'
  })], {
    type: 'application/json'
  }));
  formData.append('file', file);
  const res = await HttpClient.post(API_UPLOAD_FILE, formData, {
    headers: {
      'Content-Type': undefined
    }
  });

  if (res.status === 200) {
    return HttpClient.defaults.baseURL + API_GET_FILE + '?fileCode=' + res.data.code;
  }

  return '';
};

const LOGIN_ACTION = 'LOGIN_ACTION';
const LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
const LOGOUT_ACTION = 'LOGOUT_ACTION';
const SAVE_REGISTER_TOKEN = 'SAVE_REGISTER_TOKEN';
const SAVE_RESET_PASSWORD_TOKEN = 'SAVE_RESET_PASSWORD_TOKEN';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
let sessionTimeOut = null;
const checkLoginStatus = (authToken, redirectUrl) => {
  return async (dispatch, getState) => {
    try {
      let response = await AuthService.checkLoginByToken();
      const {
        username
      } = getState().auth.user;

      if (response.status === API_R_200 && username) {
        response = await AuthService.getUserInfo(getState().auth.user.username, authToken);
        dispatch({
          type: LOGIN_ACTION,
          payload: {
            authToken,
            user: response.data || {}
          }
        });
        const {
          appId
        } = getState().customizer;
        history.push(redirectUrl || window.location.pathname.replace(`/${getContextPath(appId)}/`, '/'));
        setSessionTimeout();
      } else {
        dispatch({
          type: LOGOUT_ACTION
        });
      }
    } catch (error) {
      dispatch({
        type: LOGOUT_ACTION
      });
    }
  };
};
const loginAction = user => {
  return async (dispatch, getState) => {
    user.rememberMe = user.isRemeberMe;
    let response = await AuthService.login(user);

    if (response.status === API_R_200) {
      const authToken = response.data.id_token;
      response = await AuthService.getUserInfo(user.username, authToken);

      if (user.isRemeberMe) {
        localStorage.setItem(REMEMBER_ME_TOKEN, JSON.stringify({
          username: user.username,
          name: response.data.fullName
        }));
      }

      const {
        userSettings
      } = response.data;

      if (userSettings) {
        localStorage.setItem('language', userSettings.language.toLowerCase());
      }

      dispatch({
        type: LOGIN_ACTION,
        payload: {
          authToken,
          user: response.data || []
        }
      });

      if (getState().customizer.appId !== AppId.APP_NO1) {
        window.location.href = getExternalAppUrl(AppId.APP_NO1, '/');
      } else {
        history.push('/');
      }
    } else {
      dispatch({
        type: LOGOUT_ACTION
      });
    }
  };
};
const setSessionTimeout = () => {
  return dispatch => {
    clearTimeout(sessionTimeOut);
    sessionTimeOut = setTimeout(() => {
      toastError( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.sesionExpired"
      }));
      dispatch(logoutAction());
    }, SESSION_TIMEOUT * 60 * 1000);
  };
};
const clearSessionTimeOut = () => {
  clearTimeout(sessionTimeOut);
};
const createPassword = password => {
  return async (dispatch, getState) => {
    try {
      const response = await AuthService.createPassword(password, getState().auth.register.token);

      if (response.status === 200 && response.data) {
        history.push('/complete-information');
      }
    } catch (error) {}
  };
};
const register = values => {
  return async () => {
    try {
      const res = await AuthService.register(trimObjectValues(values));

      if (res.status === 200 && res.data) {
        toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
          id: "register.registerSuccess"
        }));
        history.push('/login');
      }
    } catch (error) {}
  };
};
const compeleteInfo = user => {
  return async (dispatch, getState) => {
    try {
      user.registerToken = getState().auth.register.token;
      const response = await AuthService.compeleteInfo(user);

      if (response.status === 200 && response.data) {
        toastSuccess('Hoàn tất đăng ký thành công');
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const saveRegisterToken = registerToken => {
  return async dispatch => {
    const response = await AuthService.getUserByRegisterToken(registerToken);

    if (response.status === 200 && response.data) {
      dispatch({
        type: SAVE_REGISTER_TOKEN,
        payload: {
          token: registerToken,
          user: response.data
        }
      });
    } else {
      history.push('/');
    }
  };
};
const saveResetPasswordToken = token => {
  return dispatch => {
    dispatch({
      type: SAVE_RESET_PASSWORD_TOKEN,
      payload: token
    });
  };
};
const forgotPassword = ({
  username,
  email
}) => {
  return async (dispatch, getState) => {
    try {
      const response = await AuthService.forgotPassword(username, email);

      if (response.status === 200 && response.data) {
        toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
          id: "forgotPassword.successfull"
        }));
        dispatch({
          type: SAVE_RESET_PASSWORD_TOKEN,
          payload: ''
        });
        history.push('/');
      }
    } catch (error) {}
  };
};
const resetPassword = password => {
  return async (dispatch, getState) => {
    try {
      const response = await AuthService.resetPassword(password, getState().auth.resetPasswordToken);

      if (response.status === 200 && response.data) {
        toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
          id: "createPassword.resetSuccessFul"
        }));
        dispatch({
          type: SAVE_RESET_PASSWORD_TOKEN,
          payload: ''
        });
        history.push('/');
      }
    } catch (error) {}
  };
};
const logoutAction = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT_ACTION
    });
    clearSessionTimeOut();
  };
};
const updateUserInfo = (user, avatarImage) => {
  return async dispatch => {
    if (avatarImage) {
      const url = await AuthService.updateAvatar(user, avatarImage);
      user.userSettings.avatar = url || user.userSettings.avatar;
    }

    const res = await AuthService.updateUserInfo(user);

    if (res.status === 200) {
      dispatch({
        type: UPDATE_USER_INFO,
        payload: res.data
      });
      toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.updateInfo.success"
      }));
      history.push('/');
    }
  };
};
const changePassword = ({
  oldPassword,
  newPassword
}) => {
  return async dispatch => {
    const res = await AuthService.changePassword({
      oldPassword,
      newPassword
    });

    if (res.status === 200) {
      toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "changePassword.success"
      }));
      history.push('/');
    }
  };
};
const changeLanguageSetting = (lang, callBack) => {
  return async (dispatch, getState) => {
    const {
      userSettings = {}
    } = getState().auth.user;
    const value = { ...userSettings,
      language: lang.toUpperCase()
    };
    const res = await AuthService.changeUserSetting(value);

    if (res.status === 200) {
      callBack();
      toastSuccess( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "generalInfo.changeLanguage.success"
      }));
      history.push('/');
    }
  };
};

const SHOW_LOADING_BAR = 'SHOW_LOADING_BAR';
const HIDE_LOADING_BAR = 'HIDE_LOADING_BAR';
const SHOW_CONFIRM_ALERT = 'SHOW_CONFIRM_ALERT';
const HIDE_CONFIRM_ALERT = 'HIDE_CONFIRM_ALERT';
const showConfirmAlert$1 = configs => {
  return dispatch => dispatch({
    type: SHOW_CONFIRM_ALERT,
    payload: configs
  });
};
const hideConfirmAlert = () => {
  return dispatch => dispatch({
    type: HIDE_CONFIRM_ALERT
  });
};

const HttpClient = Axios.create({
  timeout: API_TIME_OUT,
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  })),
  invalidate: async (config, request) => {
    if (request.clearCacheEntry) {
      await config.store.removeItem(config.uuid);
    }
  }
});
HttpClient.defaults.headers['Content-Type'] = 'application/json';
const setUpHttpClient = (store, apiBaseUrl) => {
  let deviceId = localStorage.getItem('deviceId');
  let language = localStorage.getItem('language');

  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
  }

  if (!language) {
    localStorage.setItem('language', 'vi');
  }

  HttpClient.defaults.baseURL = apiBaseUrl || API_BASE_URL;
  HttpClient.interceptors.request.use(config => {
    const token = store.getState().auth.authToken;
    language = localStorage.getItem('language');

    if (token) {
      store.dispatch(setSessionTimeout());
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.deviceId = deviceId;
    config.headers['Accept-Language'] = language;

    if (!config.isBackgroundRequest) {
      store.dispatch({
        type: SHOW_LOADING_BAR,
        payload: ''
      });
    }

    return config;
  });
  HttpClient.interceptors.response.use(response => {
    store.dispatch({
      type: HIDE_LOADING_BAR,
      payload: ''
    });
    return response;
  }, e => {
    store.dispatch({
      type: HIDE_LOADING_BAR,
      payload: ''
    });

    if (!e.response) {
      return e;
    }

    switch (e.response.status) {
      case 403:
        toastError(e.response.data.message);
        store.dispatch({
          type: 'LOGOUT_ACTION'
        });

      case 400:
      case 500:
        toastError(e.response.data.message);
    }

    return e.response;
  });
};

const themeConfig = {
  appId: '',
  layout: "vertical",
  theme: "light",
  sidebarCollapsed: false,
  navbarColor: "default",
  navbarType: "floating",
  footerType: "static",
  disableCustomizer: true,
  hideScrollToTop: false,
  disableThemeTour: false,
  menuTheme: "primary",
  direction: "ltr",
  showLoading: false
};

const customizerReducer = (state = { ...themeConfig
}, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return { ...state,
        theme: action.theme
      };

    case 'SET_APP_ID':
      return { ...state,
        appId: action.appId
      };

    case 'COLLAPSE_SIDEBAR':
      return { ...state,
        sidebarCollapsed: action.value
      };

    case 'CHANGE_NAVBAR_COLOR':
      return { ...state,
        navbarColor: action.color
      };

    case 'CHANGE_NAVBAR_TYPE':
      return { ...state,
        navbarType: action.style
      };

    case 'CHANGE_FOOTER_TYPE':
      return { ...state,
        footerType: action.style
      };

    case 'CHANGE_MENU_COLOR':
      return { ...state,
        menuTheme: action.style
      };

    case 'HIDE_SCROLL_TO_TOP':
      return { ...state,
        hideScrollToTop: action.value
      };

    default:
      return state;
  }
};

const authInitialState = {
  authToken: '',
  user: '',
  loginStatus: '',
  register: {
    user: {},
    token: ''
  },
  resetPasswordToken: ''
};
const authReducers = (state = { ...authInitialState
}, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      {
        return { ...state,
          ...action.payload,
          loginStatus: LOGIN_STATUS.SUCCESS
        };
      }

    case LOGOUT_ACTION:
      {
        return { ...authInitialState
        };
      }

    case LOGIN_FAIL_ACTION:
      {
        return { ...state,
          loginStatus: LOGIN_STATUS.FAIL
        };
      }

    case SAVE_REGISTER_TOKEN:
      {
        return { ...state,
          register: action.payload
        };
      }

    case SAVE_RESET_PASSWORD_TOKEN:
      {
        return { ...state,
          resetPasswordToken: action.payload
        };
      }

    case UPDATE_USER_INFO:
      {
        return { ...state,
          user: action.payload
        };
      }

    default:
      return state;
  }
};

const mapRoleListToNavConfigs = (roleList = []) => {
  if (!roleList.length) {
    return [];
  }

  roleList = roleList.filter(item => item.order < 1000);
  const mapRoles = new Map();
  roleList.forEach(role => {
    const listRole = mapRoles.get(role.parentId);
    const itemNav = mapRoleToNavItem(role);

    if (listRole) {
      listRole.push(itemNav);
      mapRoles.set(role.parentId, listRole);
    } else {
      mapRoles.set(role.parentId, [itemNav]);
    }
  });
  const parentList = mapRoles.get(null);
  return parentList.map(item => {
    item.children = mapRoles.get(item.id + '');
    return item;
  });
};

const mapRoleToNavItem = role => {
  const IconTag = Icon[role.icon];
  const item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = `menu.${role.keyLang}`;
  item.icon = /*#__PURE__*/React.createElement(IconTag, {
    size: 20
  });
  item.navLink = role.menuPath;

  if (role.isHighlight) {
    item.badge = 'primary';
    item.badgeText = 'new';
  }

  return item;
};

const getNativgationConfig = (appId, navConfigs) => {
  if (!navConfigs) {
    navConfigs = [...navigationConfig];
  } else {
    navConfigs = mapRoleListToNavConfigs(navConfigs);
  }

  return navConfigs.map(item => {
    item.isExternalApp = item.appId !== appId;

    if (item.children) {
      item.children.map(child => child.isExternalApp = child.appId !== appId);

      if (item.children.length === 1) {
        item.navLink = item.children[0].navLink;
      } else {
        item.type = 'collapse';
      }
    }

    return item;
  });
};

class NavBarService {}

NavBarService.getNativagtion = () => {
  return HttpClient.get(API_GET_NAV_CONFIGS, {
    params: {
      uuid: generateUUID()
    },
    isBackgroundRequest: true
  });
};

NavBarService.getUserGroupRole = groupId => {
  return HttpClient.get(`${API_GET_USER_ROLES}/${groupId}`, {
    params: {
      uuid: generateUUID()
    },
    isBackgroundRequest: true
  });
};

const LOAD_NATIVGATION = 'LOAD_NATIVGATION';
const LOAD_USER_ROLE = 'LOAD_USER_ROLE';
const goBackHomePage = () => {
  return async (dispatch, getState) => {
    const {
      appId
    } = getState().customizer;

    if (appId === AppId.APP_NO1) {
      history.push('/');
    } else {
      window.location.href = getExternalAppUrl(AppId.APP_NO1, '/');
    }
  };
};

const initialState = {
  navConfigs: [],
  roles: [],
  userRoles: []
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NATIVGATION:
      return { ...state,
        navConfigs: action.payload.navConfigs,
        roles: action.payload.roles
      };

    case LOAD_USER_ROLE:
      return { ...state,
        userRoles: action.payload
      };

    default:
      return state;
  }
};

const DEFAULT_CONFIRM_ALERT = {
  title: '',
  isShow: false,
  content: '',
  onConfirm: () => {},
  onCancel: () => {}
};
const initialState$1 = {
  loading: new Set(),
  isLoading: false,
  confirmAlert: { ...DEFAULT_CONFIRM_ALERT
  }
};

const uiReducer = (state = initialState$1, action) => {
  switch (action.type) {
    case SHOW_LOADING_BAR:
      return { ...state,
        isLoading: true,
        loading: state.loading.add(action.payload)
      };

    case HIDE_LOADING_BAR:
      state.loading.delete(action.payload);
      return { ...state,
        isLoading: !!state.loading.size
      };

    case SHOW_CONFIRM_ALERT:
      return { ...state,
        confirmAlert: {
          isShow: true,
          ...state.confirmAlert,
          ...action.payload
        }
      };

    case HIDE_CONFIRM_ALERT:
      return { ...state,
        confirmAlert: { ...DEFAULT_CONFIRM_ALERT
        }
      };

    default:
      return state;
  }
};

const rootReducer = appReducer => combineReducers({
  customizer: customizerReducer,
  ui: uiReducer,
  auth: persistReducer({
    storage: sessionStorage,
    key: 'root',
    blacklist: ['loginStatus']
  }, authReducers),
  navbar: navbarReducer,
  app: appReducer
});

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.onSuggestionItemClick = (item, e) => {
      if (this.props.onSuggestionClick) {
        this.props.onSuggestionClick(item, e);
      }

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
    };

    this.onSuggestionItemHover = index => {
      this.setState({
        activeSuggestion: index
      });
    };

    this.onChange = e => {
      const userInput = e.currentTarget.value;
      this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput
      });

      if (e.target.value < 1) {
        this.setState({
          showSuggestions: false
        });
      }
    };

    this.onInputClick = e => {
      e.stopPropagation();
    };

    this.onKeyDown = e => {
      const {
        activeSuggestion,
        showSuggestions,
        userInput
      } = this.state;
      const filterKey = this.props.filterKey;
      let suggestionList = ReactDOM.findDOMNode(this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < this.filteredData.length - 1) {
          this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              this.onSuggestionItemClick(this.filteredData[activeSuggestion], e);
              this.setState({
                userInput: this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (this.props.onKeyDown !== undefined && this.props.onKeyDown !== null && this.props.onKeyDown) {
        this.props.onKeyDown(e, userInput);
      }
    };

    this.renderGroupedSuggestion = arr => {
      const {
        filterKey,
        customRender
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;

      let renderSuggestion = (item, i) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: e => onSuggestionItemClick(item, e),
            onMouseEnter: () => {
              this.onSuggestionItemHover(this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map((item, i) => {
        return renderSuggestion(item, i);
      });
    };

    this.renderUngroupedSuggestions = () => {
      const {
        filterKey,
        suggestions,
        customRender,
        suggestionLimit
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;
      this.filteredData = [];
      let sortSingleData = suggestions.filter(i => {
        let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);
      this.filteredData.push(...sortSingleData);
      return sortSingleData.length ? sortSingleData.map((suggestion, index) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: e => onSuggestionItemClick(suggestion, e),
            onMouseEnter: () => this.onSuggestionItemHover(this.filteredData.indexOf(suggestion))
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      }) : /*#__PURE__*/React.createElement("li", {
        className: "suggestion-item no-result"
      }, /*#__PURE__*/React.createElement(AlertTriangle, {
        size: 15
      }), ' ', /*#__PURE__*/React.createElement("span", {
        className: "align-middle ml-50"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: 'common.noResults'
      })));
    };

    this.renderSuggestions = () => {
      const {
        filterKey,
        grouped,
        filterHeaderKey,
        suggestions
      } = this.props;
      const {
        renderUngroupedSuggestions,
        state: {
          userInput
        }
      } = this;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        this.filteredData = [];
        return suggestions.map(suggestion => {
          let sortData = suggestion.data.filter(i => {
            let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);
          this.filteredData.push(...sortData);
          return /*#__PURE__*/React.createElement(React.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React.createElement(AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    this.clearInput = val => {
      if (this.props.clearInput && !val) {
        this.setState({
          userInput: ''
        });
      }
    };

    this.handleExtenalClick = e => {
      let {
        container
      } = this.refs;
      const {
        target
      } = e;

      if (target !== container && !container.contains(target)) {
        this.setState({
          showSuggestions: false
        });
        if (this.props.externalClick) this.props.externalClick(e);
      }
    };

    this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    this.filteredData = [];
    document.body.addEventListener('click', this.handleExtenalClick);
  }

  componentDidUpdate(prevProps, prevState) {
    let textInput = ReactDOM.findDOMNode(this.input);
    let {
      autoFocus,
      onSuggestionsShown,
      clearInput
    } = this.props;

    if (textInput !== null && autoFocus) {
      textInput.focus();
    }

    if (this.props.defaultSuggestions && prevState.showSuggestions === false && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }

    if (clearInput === false && this.state.userInput.length) {
      this.setState({
        userInput: ''
      });
    }

    if (onSuggestionsShown && this.state.showSuggestions) {
      onSuggestionsShown(this.state.userInput);
    }

    if (this.props.defaultSuggestions && prevState.focused === false && this.state.focused === true) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  }

  render() {
    const {
      onChange,
      onKeyDown,
      state: {
        showSuggestions,
        userInput,
        openUp
      }
    } = this;
    let suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: el => this.suggestionList = el,
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React.createElement(FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: e => {
        onChange(e);

        if (this.props.onChange) {
          this.props.onChange(e);
        }
      },
      onKeyDown: e => onKeyDown(e),
      value: userInput,
      className: `vx-autocomplete-search ${this.props.className ? this.props.className : ''}`,
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: el => {
        return this.input = el;
      },
      onFocus: e => {
        this.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: e => {
        if (this.props.onBlur) this.props.onBlur(e);
        this.setState({
          focused: false
        });
      }
    }), /*#__PURE__*/React.createElement(Label, null, this.props.placeholder), suggestionsListComponent));
  }

}
Autocomplete.propTypes = {
  suggestions: PropTypes.array.isRequired,
  filterKey: PropTypes.string.isRequired,
  filterHeaderKey: PropTypes.string,
  placeholder: PropTypes.string,
  suggestionLimit: PropTypes.number,
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func
};

const UserDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  const onClickLogout = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "navbar.logout"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "navbar.logout.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(logoutAction());
      }
    }));
  };

  return /*#__PURE__*/React.createElement(DropdownMenu, {
    right: true
  }, /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/account-info')
  }, /*#__PURE__*/React.createElement(User, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/change-password')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/terms-and-condition')
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.termAndCondition"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/privacy-policy')
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.privacyPolicy"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/language')
  }, /*#__PURE__*/React.createElement(Globe, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.language"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/contact')
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.contact"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    onClick: onClickLogout
  }, /*#__PURE__*/React.createElement(Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "navbar.logout"
  }))));
};

class NavbarUser extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      navbarSearch: false,
      suggestions: []
    };

    this.handleNavbarSearch = () => {
      this.setState({
        navbarSearch: !this.state.navbarSearch
      });
    };

    this.getCountryCode = locale => {
      const countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };

    this.onSuggestionItemClick = item => {
      if (!item.isExternalApp) {
        history.push(`${item.menuPath}`);
      } else {
        window.location.href = item.navLinkExternal;
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roles !== this.props.roles) {
      const suggestions = this.props.roles.map(item => {
        item.name = this.props.intl.formatMessage({
          id: `menu.${item.keyLang}`
        });
        item.isExternalApp = item.appId !== this.props.appId;
        item.navLinkExternal = getExternalAppUrl(item.appId, item.menuPath);
        return item;
      });
      this.setState({
        suggestions
      });
    }
  }

  render() {
    let {
      userSettings,
      userDetails,
      ...user
    } = this.props.user;
    userSettings = userSettings || {};
    userDetails = userDetails || {};
    return /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React.createElement(NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React.createElement(NavLink, {
      className: "nav-link-search pt-2"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "name",
      onSuggestionClick: this.onSuggestionItemClick,
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: () => {
        this.setState({
          navbarSearch: false
        });
      },
      onKeyDown: e => {
        if (e.keyCode === 27 || e.keyCode === 13) {
          this.setState({
            navbarSearch: false
          });
          this.props.handleAppOverlay('');
        }
      },
      customRender: (item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
        const IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: e => onSuggestionItemClick(item, e),
          onMouseEnter: () => onSuggestionItemHover(filteredData.indexOf(item))
        }, /*#__PURE__*/React.createElement("div", {
          className: "d-flex align-items-center"
        }, /*#__PURE__*/React.createElement(IconTag, {
          size: 17
        }), /*#__PURE__*/React.createElement("div", {
          className: "ml-2"
        }, item.name)));
      },
      onSuggestionsShown: userInput => {
        if (this.state.navbarSearch) {
          this.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React.createElement(X, {
      size: 24,
      onClick: e => {
        e.stopPropagation();
        this.setState({
          navbarSearch: false
        });
        this.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React.createElement(Bell, {
      size: 21
    }))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "user-name text-bold-600"
    }, user.fullName)), /*#__PURE__*/React.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React.createElement("img", {
      src: userSettings.avatar || '',
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React.createElement(UserDropdown, null)));
  }

}

var NavbarUser$1 = injectIntl(NavbarUser);

const ThemeNavbar = props => {
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React.createElement(Navbar$1, {
    className: classnames('header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow', {
      'navbar-light': props.navbarColor === 'default' || !colorsArr.includes(props.navbarColor),
      'navbar-dark': colorsArr.includes(props.navbarColor),
      'bg-primary': props.navbarColor === 'primary' && props.navbarType !== 'static',
      'bg-danger': props.navbarColor === 'danger' && props.navbarType !== 'static',
      'bg-success': props.navbarColor === 'success' && props.navbarType !== 'static',
      'bg-info': props.navbarColor === 'info' && props.navbarType !== 'static',
      'bg-warning': props.navbarColor === 'warning' && props.navbarType !== 'static',
      'bg-dark': props.navbarColor === 'dark' && props.navbarType !== 'static',
      'd-none': props.navbarType === 'hidden' && !props.horizontal,
      'floating-nav': props.navbarType === 'floating' && !props.horizontal || !navbarTypes.includes(props.navbarType) && !props.horizontal,
      'navbar-static-top': props.navbarType === 'static' && !props.horizontal,
      'fixed-top': props.navbarType === 'sticky' || props.horizontal,
      scrolling: props.horizontal && props.scrolling
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React.createElement(NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React.createElement(NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React.createElement(Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React.createElement("ul", {
    className: "nav navbar-nav d-none d-xl-flex bookmark-icons"
  }, Array(5).fill(0).map((_, index) => /*#__PURE__*/React.createElement(NavItem, {
    key: index
  }, /*#__PURE__*/React.createElement("img", {
    className: "img-fluid",
    src: IMAGE[`NAV_ICON_${index + 1}`]
  })))))), /*#__PURE__*/React.createElement(NavbarUser$1, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    appId: props.appId,
    authToken: props.authToken,
    user: props.user,
    roles: props.roles,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles,
    authToken: state.auth.authToken
  };
};

var Navbar = connect(mapStateToProps, {
  logoutAction
})(ThemeNavbar);

function getWindowDimensions() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

const Footer = props => {
  const {
    width
  } = useWindowDimensions();
  const history = useHistory();
  const dispatch = useDispatch();
  const appId = useSelector(state => state.customizer.appId);

  const goToPage = (e, navLink) => {
    e.preventDefault();

    if (appId === AppId.INSURANCE_APP) {
      history.push(navLink);
    } else {
      window.location.href = getExternalAppUrl(AppId.INSURANCE_APP, navLink);
    }
  };

  const onClickBackHome = e => {
    e.preventDefault();
    dispatch(goBackHomePage());
  };

  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': width < MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light footer-mobile text-center', {
      'd-none': width >= MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(Home, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "menu.home"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, '/contracts')
  }, /*#__PURE__*/React.createElement(List, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "menu.contract"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "position-relative w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, '/buy-insurance')
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.BUY_INSURANCE,
    className: "buy-insurance",
    alt: ""
  }), /*#__PURE__*/React.createElement(PlusCircle, {
    style: {
      visibility: 'hidden'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "menu.buyInsurance"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(Gift, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "menu.promotion"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => history.push('/contact')
  }, /*#__PURE__*/React.createElement(MessageSquare, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.contact"
  }))))), props.hideScrollToTop === false ? /*#__PURE__*/React.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    className: "btn-icon scroll-top d-none d-md-block"
  }, /*#__PURE__*/React.createElement(ArrowUp, {
    size: 15
  }))) : null);
};

const changeTheme = theme => {
  return dispatch => dispatch({
    type: "CHANGE_THEME",
    theme
  });
};
const setAppId = appId => {
  return dispatch => dispatch({
    type: "SET_APP_ID",
    appId
  });
};
const collapseSidebar = value => {
  return dispatch => dispatch({
    type: "COLLAPSE_SIDEBAR",
    value
  });
};
const changeNavbarColor = color => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_COLOR",
    color
  });
};
const changeNavbarType = style => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_TYPE",
    style
  });
};
const changeFooterType = style => {
  return dispatch => dispatch({
    type: "CHANGE_FOOTER_TYPE",
    style
  });
};
const changeMenuColor = style => {
  return dispatch => dispatch({
    type: "CHANGE_MENU_COLOR",
    style
  });
};
const hideScrollToTop = value => {
  return dispatch => dispatch({
    type: "HIDE_SCROLL_TO_TOP",
    value
  });
};

const SidebarHeader = props => {
  const {
    toggleSidebarMenu,
    activeTheme,
    collapsed,
    toggle,
    sidebarVisibility,
    menuShadow
  } = props;
  const dispatch = useDispatch();

  const onClickHome = () => {
    dispatch(goBackHomePage());
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "navbar-header"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav navbar-nav flex-row"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item my-auto mr-auto cursor-pointer",
    onClick: onClickHome
  }, /*#__PURE__*/React.createElement("img", {
    className: "img-fluid logo-img",
    src: IMAGE.LOGO_NO_TEXT,
    alt: "logo"
  }), /*#__PURE__*/React.createElement("img", {
    className: "img-fluid logo-text",
    src: IMAGE.LOGO_TEXT,
    alt: "logo"
  })), /*#__PURE__*/React.createElement("li", {
    className: "nav-item nav-toggle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-link modern-nav-toggle"
  }, collapsed === false ? /*#__PURE__*/React.createElement(Disc, {
    onClick: () => {
      toggleSidebarMenu(true);
      toggle();
    },
    className: classnames('toggle-icon icon-x d-none d-xl-block font-medium-4', {
      'text-primary': activeTheme === 'primary',
      'text-success': activeTheme === 'success',
      'text-danger': activeTheme === 'danger',
      'text-info': activeTheme === 'info',
      'text-warning': activeTheme === 'warning',
      'text-dark': activeTheme === 'dark'
    }),
    size: 20,
    "data-tour": "toggle-icon"
  }) : /*#__PURE__*/React.createElement(Circle, {
    onClick: () => {
      toggleSidebarMenu(false);
      toggle();
    },
    className: classnames('toggle-icon icon-x d-none d-xl-block font-medium-4', {
      'text-primary': activeTheme === 'primary',
      'text-success': activeTheme === 'success',
      'text-danger': activeTheme === 'danger',
      'text-info': activeTheme === 'info',
      'text-warning': activeTheme === 'warning',
      'text-dark': activeTheme === 'dark'
    }),
    size: 20
  }), /*#__PURE__*/React.createElement(X, {
    onClick: sidebarVisibility,
    className: classnames('toggle-icon icon-x d-block d-xl-none font-medium-4', {
      'text-primary': activeTheme === 'primary',
      'text-success': activeTheme === 'success',
      'text-danger': activeTheme === 'danger',
      'text-info': activeTheme === 'info',
      'text-warning': activeTheme === 'warning',
      'text-dark': activeTheme === 'dark'
    }),
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    className: classnames('shadow-bottom', {
      'd-none': menuShadow === false
    })
  }));
};

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: this.props.activePath
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };

    this.flag = true;
    this.parentArray = [];
    this.childObj = {};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.childObj.navLink && this.childObj.collapsed) {
        this.props.collapsedMenuPaths(this.childObj.navLink);
      }

      if (this.props.activePath === this.childObj.navLink && !this.props.parentArr.includes(this.parentArray[0])) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
        this.props.parentArr.push(this.parentArray);
      } else if (this.props.parentArr.includes(this.parentArray)) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
      }
    }
  }

  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    return /*#__PURE__*/React.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(child => {
      const CustomAnchorTag = child.isExternalApp ? `a` : Link;

      if (!this.parentArray.includes(item.id) && this.flag) {
        this.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        this.props.collapsedMenuPaths(child.navLink);
      }

      if (this.props.activeItemState === child.navLink) {
        this.childObj = child;
        this.props.parentArr.push(this.parentArray);
        this.flag = false;
      }

      if (child.permissions && child.permissions.includes(this.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React.createElement("li", {
          key: child.id,
          className: classnames({
            hover: this.props.hoverIndex === child.id,
            'has-sub': child.type === 'collapse',
            open: child.type === 'collapse' && activeGroup.includes(child.id),
            'sidebar-group-active': this.props.currentActiveGroup.includes(child.id),
            active: this.props.activeItemState === child.navLink && child.type === 'item' || item.parentOf && item.parentOf.includes(this.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: e => {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (this.props.deviceWidth <= 1200 && child.type === 'item') {
              this.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
          className: classnames({
            'd-flex justify-content-between': child.type === 'collapse'
          }),
          to: child.navLink && child.type === 'item' ? child.navLink : '',
          href: this.props.getItemLink(child),
          onMouseEnter: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: e => {
            return child.type === 'collapse' ? e.preventDefault() : '';
          },
          target: child.newTab ? '_blank' : undefined
        }, /*#__PURE__*/React.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React.createElement(FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React.createElement(Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : '', child.type === 'collapse' ? /*#__PURE__*/React.createElement(ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ''), child.children ? this.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : '');
      } else if (child.navLink === this.props.activePath && !child.permissions.includes(this.props.currentUser)) {
        return this.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  }

}

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    this.handleGroupClick = (id, parent = null, type = '') => {
      let open_group = this.state.activeGroups;
      let active_group = this.state.currentActiveGroup;
      let temp_arr = this.state.tempArr;

      if (type === 'item' && parent === null) {
        active_group = [];
        temp_arr = [];
      } else if (type === 'item' && parent !== null) {
        active_group = [];

        if (temp_arr.includes(parent)) {
          temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
        } else {
          temp_arr = [];
          temp_arr.push(parent);
        }

        active_group = temp_arr.slice(0);
      } else if (type === 'collapse' && parent === null) {
        temp_arr = [];
        temp_arr.push(id);
      } else if (type === 'collapse' && parent !== null) {
        if (active_group.includes(parent)) {
          temp_arr = active_group.slice(0);
        }

        if (temp_arr.includes(id)) {
          temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
        } else {
          temp_arr.push(id);
        }
      } else {
        temp_arr = [];
      }

      if (type === 'collapse') {
        if (!open_group.includes(id)) {
          let temp = open_group.filter(function (obj) {
            return active_group.indexOf(obj) === -1;
          });

          if (temp.length > 0 && !open_group.includes(parent)) {
            open_group = open_group.filter(function (obj) {
              return !temp.includes(obj);
            });
          }

          if (open_group.includes(parent) && active_group.includes(parent)) {
            open_group = active_group.slice(0);
          }

          if (!open_group.includes(id)) {
            open_group.push(id);
          }
        } else {
          open_group.splice(open_group.indexOf(id), 1);
        }
      }

      if (type === 'item') {
        open_group = active_group.slice(0);
      }

      this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    this.initRender = parentArr => {
      this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    this.getItemLink = item => {
      return item.isExternalApp ? getExternalAppUrl(item.appId, item.navLink) : '';
    };

    this.parentArr = [];
    this.collapsedPath = null;
  }

  componentDidMount() {
    this.initRender(this.parentArr[0] || []);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath || prevProps.navConfigs !== this.props.navConfigs) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  }

  render() {
    const menuItems = this.props.navConfigs.map(item => {
      const CustomAnchorTag = item.isExternalApp ? `a` : Link;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React.createElement("li", {
          className: "navigation-header",
          key: `group-header-${item.groupTitle}`
        }, /*#__PURE__*/React.createElement("span", null, item.groupTitle));
      }

      let renderItem = /*#__PURE__*/React.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: this.state.activeGroups.includes(item.id),
          'sidebar-group-active': this.state.currentActiveGroup.includes(item.id),
          hover: this.props.hoverIndex === item.id,
          active: this.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(this.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: e => {
          e.stopPropagation();

          if (item.type === 'item') {
            this.props.handleActiveItem(item.navLink);
            this.handleGroupClick(item.id, null, item.type);

            if (this.props.deviceWidth <= 1200 && item.type === 'item') {
              this.props.toggleMenu();
            }
          } else {
            this.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: this.getItemLink(item),
        className: `d-flex ${item.badgeText ? 'justify-content-between' : 'justify-content-start'}`,
        onMouseEnter: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: e => {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React.createElement(Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React.createElement(ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: this.handleGroupClick,
        activeGroup: this.state.activeGroups,
        handleActiveItem: this.props.handleActiveItem,
        activeItemState: this.props.activeItemState,
        handleSidebarMouseEnter: this.props.handleSidebarMouseEnter,
        activePath: this.props.activePath,
        hoverIndex: this.props.hoverIndex,
        initRender: this.initRender,
        parentArr: this.parentArr,
        triggerActive: undefined,
        currentActiveGroup: this.state.currentActiveGroup,
        getItemLink: this.getItemLink,
        permission: this.props.permission,
        currentUser: this.props.currentUser,
        redirectUnauthorized: this.redirectUnauthorized,
        collapsedMenuPaths: this.props.collapsedMenuPaths,
        toggleMenu: this.props.toggleMenu,
        deviceWidth: this.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        this.collapsedPath = item.navLink;
        this.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(this.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === this.props.activePath && !item.permissions.includes(this.props.currentUser.role)) {
        return this.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, menuItems);
  }

}

class Sidebar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
        this.checkDevice();
      }
    };

    this.checkDevice = () => {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function (query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        this.setState({
          ScrollbarTag: "div"
        });
      } else {
        this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    this.changeActiveIndex = id => {
      if (id !== this.state.activeIndex) {
        this.setState({
          activeIndex: id
        });
      } else {
        this.setState({
          activeIndex: null
        });
      }
    };

    this.handleSidebarMouseEnter = id => {
      if (id !== this.state.hoveredMenuItem) {
        this.setState({
          hoveredMenuItem: id
        });
      } else {
        this.setState({
          hoveredMenuItem: null
        });
      }
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let {
      toggleSidebarMenu,
      visibilityState,
      sidebarHover,
      toggle,
      color,
      sidebarVisibility,
      activeTheme,
      collapsed,
      activePath,
      sidebarState,
      currentLang,
      permission,
      currentUser,
      collapsedMenuPaths
    } = this.props;
    let {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag
    } = this.state;

    let scrollShadow = (container, dir) => {
      if (container && dir === "up" && container.scrollTop >= 100) {
        this.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        this.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: e => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames(`main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: () => sidebarHover(false),
      onMouseLeave: () => sidebarHover(true)
    }, /*#__PURE__*/React.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath
    }), /*#__PURE__*/React.createElement(ScrollbarTag, Object.assign({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: container => scrollShadow(container, "down"),
      onScrollUp: container => scrollShadow(container, "up"),
      onYReachStart: () => menuShadow === true && this.setState({
        menuShadow: false
      })
    }), /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: () => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React.createElement(SideMenuContent, {
      setActiveIndex: this.changeActiveIndex,
      activeIndex: activeIndex,
      hoverIndex: hoveredMenuItem,
      handleSidebarMouseEnter: this.handleSidebarMouseEnter,
      activeItemState: activeItem,
      handleActiveItem: this.handleActiveItem,
      activePath: activePath,
      lang: currentLang,
      permission: permission,
      currentUser: currentUser,
      collapsedMenuPaths: collapsedMenuPaths,
      toggleMenu: sidebarVisibility,
      deviceWidth: this.props.deviceWidth,
      navConfigs: this.props.navConfigs
    }))))));
  }

}

const mapStateToProps$1 = state => {
  return {
    currentUser: state.auth,
    appId: state.customizer.appId,
    navConfigs: state.navbar.navConfigs
  };
};

var Sidebar$1 = connect(mapStateToProps$1)(Sidebar);

class Layout extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      sidebarState: this.props.customizer.sidebarCollapsed,
      layout: this.props.customizer.theme,
      collapsedContent: this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    this.collapsedPaths = [];
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
      }
    };

    this.handleCustomizer = bool => {
      this.setState({
        customizer: bool
      });
    };

    this.handleCollapsedMenuPaths = item => {
      let collapsedPaths = this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        this.collapsedPaths = collapsedPaths;
      }
    };

    this.toggleSidebarMenu = val => {
      this.setState({
        sidebarState: !this.state.sidebarState,
        collapsedContent: !this.state.collapsedContent
      });
    };

    this.sidebarMenuHover = val => {
      this.setState({
        sidebarState: val
      });
    };

    this.handleSidebarVisibility = () => {
      if (this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', () => {
            if (this.state.sidebarHidden) {
              this.setState({
                sidebarHidden: !this.state.sidebarHidden
              });
            }
          });
        }

        this.setState({
          sidebarHidden: !this.state.sidebarHidden
        });
      }
    };

    this.handleCurrentLanguage = lang => {
      this.setState({
        currentLang: lang
      });
    };

    this.handleAppOverlay = value => {
      if (value.length > 0) {
        this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        this.setState({
          appOverlay: false
        });
      }
    };

    this.handleAppOverlayClick = () => {
      this.setState({
        appOverlay: false
      });
    };
  }

  componentDidMount() {
    this.mounted = true;
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        direction
      }
    } = this.props;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = theme;
      let dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        sidebarCollapsed
      }
    } = this.props;
    let layout = theme;

    if (this.mounted) {
      if (layout === 'dark') {
        document.body.classList.remove('semi-dark-layout');
        document.body.classList.add('dark-layout');
      }

      if (layout === 'semi-dark') {
        document.body.classList.remove('dark-layout');
        document.body.classList.add('semi-dark-layout');
      }

      if (layout !== 'dark' && layout !== 'semi-dark') {
        document.body.classList.remove('dark-layout', 'semi-dark-layout');
      }

      if (prevProps.customizer.sidebarCollapsed !== this.props.customizer.sidebarCollapsed) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        });
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && !this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(false);
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const appProps = this.props.customizer;
    const menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.location.pathname,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: '',
      deviceWidth: this.state.width
    };
    const navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      appId: this.props.appId,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    const footerProps = {
      appId: this.props.appId,
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(`wrapper vertical-layout theme-${appProps.menuTheme}`, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React.createElement(Navbar, navbarProps), /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper pb-4 pb-md-0"
    }, this.props.children)), /*#__PURE__*/React.createElement(Footer, footerProps), /*#__PURE__*/React.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  }

}

const mapStateToProps$2 = state => {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = connect(mapStateToProps$2, {
  changeTheme,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(Layout);

const LOAD_NATIVGATION$1 = 'LOAD_NATIVGATION';
const LOAD_USER_ROLE$1 = 'LOAD_USER_ROLE';
const loadNavtigation = appId => {
  return async dispatch => {
    const res = await NavBarService.getNativagtion();
    const roles = res.data || [];
    const navConfigs = getNativgationConfig(appId, roles);
    dispatch({
      type: LOAD_NATIVGATION$1,
      payload: {
        navConfigs,
        roles
      }
    });
  };
};
const loadUserRoles = () => {
  return async (dispatch, getState) => {
    const {
      groupId
    } = getState().auth.user;

    if (!groupId) {
      return;
    }

    const res = await NavBarService.getUserGroupRole(groupId);

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_ROLE$1,
        payload: res.data
      });
    }
  };
};
const goBackHomePage$1 = () => {
  return async (dispatch, getState) => {
    const {
      appId
    } = getState().customizer;

    if (appId === AppId.APP_NO1) {
      history.push('/');
    } else {
      window.location.href = getExternalAppUrl(AppId.APP_NO1, '/');
    }
  };
};

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locale: this.props.locale,
      messages: this.props.appMessage[this.props.locale]
    };
  }

  render() {
    const {
      children
    } = this.props;
    const {
      locale,
      messages
    } = this.state;
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: language => {
          localStorage.setItem('language', language);
          this.setState({
            locale: language,
            messages: this.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React.createElement(IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "vi"
    }, children));
  }

}

var login = "Login";
var register$1 = "Register";
var forgotPassword$1 = "Forgot password";
var setting = "Setting";
var messages_en = {
	"commom.error.requireField": "You must enter {fieldName}",
	"common.gender.male": "Male",
	"common.gender.female": "Female",
	"common.gender.other": "Other",
	"common.icType.personalID": "Identity Card",
	"common.icType.citizenIdentify": "Identification",
	"common.icType.passport": "Passport",
	"common.icType.CMND": "Identity Card",
	"common.icType.CCCD": "Identification",
	"common.icType.HC": "Passport",
	"common.home": "Home",
	"common.backHome.confirmMessage": "Do you want to go back to home page?",
	"common.saveChanges": "Save Changes",
	"common.saveChanges.confirmMessage": "Do you want to save the changes?",
	"common.cancel": "Cancel",
	"common.ok": "Ok",
	"common.noResults": "No results",
	"common.sesionExpired": "Your session has expired, please relogin!",
	login: login,
	"login.firstWelcome": "Welcome to InOn X!",
	"login.logedWelcome": "Hi,",
	"login.username": "Username *",
	"login.username.required": "You must enter your username",
	"login.username.invalid": "Username is invalid",
	"login.password": "Password *",
	"login.password.required": "You must enter your password",
	"login.rememberMe": "Remember me",
	"login.notMe": "Not me",
	"login.fail": "Username or password was incorrect",
	"login.sayHi": "Hi, {name}",
	register: register$1,
	"register.fullname": "Full name *",
	"register.fullname.required": "You must enter your full name",
	"register.fullname.invalid": "Your full name can not enter special charater",
	"register.email": "Email*",
	"register.email.required": "You must enter your email address",
	"register.email.invalid": "You must enter your valid email address",
	"register.phoneNumber": "Phone number *",
	"register.phoneNumber.invalid": "You must enter your valid phone number",
	"register.phoneNumber.required": "You must enter your phone number",
	"register.refCode": "Referal code",
	"register.refCode.invalid": "Referal code is invalid",
	"register.mustAppcepted": "Your must accept our terms and conditions",
	"register.registerSuccess": "Partner registration request is being processed. Please check email to complete.Thank you!",
	"register.agreeWith": "I agree to",
	"register.policyAndCondition": "Terms and Condition",
	"register.useService": "use service",
	forgotPassword: forgotPassword$1,
	"forgotPassword.verify": "Verify",
	"forgotPassword.username": "Username*",
	"forgotPassword.username.required": "You must enter username",
	"forgotPassword.email": "Email registration*",
	"forgotPassword.email.required": "You must enter email registration",
	"forgotPassword.successfull": "Your reset password link has sent to your email",
	"forgotPassword.fail": "Your phone number or email is incorrect",
	"forgotPassword.notFoundEmailSuggestion": "Not found any email with your username",
	"forgotPassword.yourEmailIs": "Your email is",
	"menu.home": "Home",
	"menu.user": "User Management",
	"menu.contract": "Contract",
	"menu.buyInsurance": "Buy Insurance",
	"menu.contractManagement": "Contract Management",
	"menu.personalContracts": "Personal Contracts",
	"menu.partnerContracts": "Parnter Contracts",
	"menu.allContracts": "All Contracts",
	"menu.account": "Account",
	"menu.createAccount": "Create Account",
	"menu.accountManagement": "Account Management",
	"menu.insuranceFeeManagement": "Insurance Fee",
	"menu.systemFee": "System Fee",
	"menu.personalFee": "Personal Fee",
	"menu.lxPartnerFee": "LX Partner Fee",
	"menu.partnerFee": "Partner Fee",
	"menu.allFee": "All Fee",
	"menu.bonusManagement": "Bonus Mangement",
	"menu.systemBonus": "System Bonus",
	"menu.personalBonus": "Personal Bonus",
	"menu.partnerBonus": "Partner Bonus",
	"menu.lxPartnerBonus": "LX Partner Bonus",
	"menu.allBonus": "All Bonus",
	"menu.insuranceCertificate": "Insurance Certification",
	"menu.insuranceCertificate.newImport": "New Import",
	"menu.insuranceCertificate.newExport": "New Export",
	"menu.insuranceCertificate.wrongImport": "Wrong Import",
	"menu.insuranceCertificate.wrongExport": "Wrong Export",
	"menu.debt": "Debt",
	"menu.createDebt": "Create Debt",
	"menu.debtManagement": "Debt Management",
	"menu.permissionGoup": "Permission Group",
	"menu.creatPermissionGoup": "Create Permision Group",
	"menu.permissionGoupManagement": "Permission Group Management",
	"menu.insuranceMotobike": "Motobike Insurance",
	"menu.insuranceCar": "Car Insurance",
	"menu.approveOpenAccount": "Account Approval",
	"menu.promotion": "Promotion",
	"navbar.language.vi": "Vietnamese",
	"navbar.language.en": "English",
	"navbar.logout": "Logout",
	"navbar.logout.confirmMessage": "Do you want to logout?",
	"footer.copyRight": "© 2020 InOn - All rights reserved",
	"footer.companySlogan": "Leading insurance provider in Vietnam",
	setting: setting,
	"setting.accountInformation": "Account Information",
	"setting.changePassword": "Change password",
	"setting.change": "Change",
	"setting.partnerCode": "Partner code",
	"setting.referralCode": "Referal code",
	"setting.accountCode": "Account code",
	"setting.personalSetting": "Personal Settings",
	"setting.generalInformation": "General Information",
	"setting.notification": "Notification",
	"setting.deviceManagement": "Device Management",
	"setting.language": "Language",
	"setting.termAndCondition": "Terms & condition",
	"setting.general": "General",
	"setting.privacyPolicy": "Privacy Policy",
	"setting.frequentlyAsked": "Frequently Asked",
	"setting.contact": "Contact",
	"setting.feedback": "Feedback",
	"setting.share": "Share",
	"setting.status.COMPLETE": "Your account had completed information",
	"setting.status.UNCOMPLETE": "Account need additional information",
	"setting.gender.M": "Male",
	"setting.gender.F": "FeMale",
	"setting.gender.O": "Others",
	"setting.call": "Call",
	"setting.call.confirmMessage": "Would you like to call {phoneNumber}?",
	"setting.sendEmail": "Send mail",
	"setting.updateInfo.success": "Update account infomation successfully!",
	"setting.updateInfo.confirmMessage": "Do you want to change account infomation?",
	"setting.updateInfo.imageTypeInvalid": "Invalid file upload!",
	"setting.updateInfo.imageExceedSize": "Uploaded file exceed the allowed size ({size}MB)!",
	"changePassword.newPassword": "New Password",
	"changePassword.newPassword.required": "You must enter new password",
	"changePassword.newPassword.invalid": "New password is invalid",
	"changePassword.oldPassword": "Old password",
	"changePassword.oldPassword.required": "You must enter old password",
	"changePassword.oldPassword.invalid": "Old password is invalid",
	"changePassword.confirmPassword.required": "You must re-enter your new password",
	"changePassword.passwordMustMatch": "Password must match",
	"changePassword.confirmMessage": "Do you want to change your password?",
	"changePassword.success": "Change password successfully!",
	"generalInfo.changeLanguage.confirmMessage": "Do you want to change language?",
	"generalInfo.changeLanguage.success": "Change language successfully!",
	"generalInfo.policy.1": "1. CÁC LOẠI DỮ LIỆU CÁ NHÂN CHÚNG TÔI SẼ THU THẬP VÀ XỬ LÝ",
	"generalInfo.policy.1.1": "1.1  Thông tin cá nhân và thông tin liên lạc chi tiết, ví dụ chức vụ, họ tên, thông tin liên lạc chi tiết và lịch sử liên lạc chi tiết; thông tin tài liệu du lịch; ngày sinh, giới tính và/hoặc tuổi của bạn; quốc tịch, bản sao giấy tờ nhận dạng bạn (nếu có liên quan đến sản phẩm hoặc dịch vụ);",
	"generalInfo.policy.1.2": "1.2  Thông tin chi tiết về người thụ hưởng, ví dụ chủ hợp đồng bảo hiểm và người thụ hưởng của các sản phẩm hoặc dịch vụ của chúng tôi;",
	"generalInfo.policy.1.3": "1.3  Các thành viên trong gia đình (nếu có liên quan đến sản phẩm hoặc dịch vụ);",
	"generalInfo.policy.1.4": "1.4  Hồ sơ liên lạc của bạn với chúng tôi, chẳng hạn như lịch sử các cuộc gọi của bạn đến số điện thoại của trung tâm dịch vụ khách hàng của chúng tôi và, nếu bạn liên lạc với chúng tôi bằng các dịch vụ trực tuyến hoặc qua ứng dụng điện thoại thông minh của chúng tôi, các chi tiết như dữ liệu vị trí điện thoại di động, địa chỉ IP và địa chỉ MAC;",
	"generalInfo.policy.1.5": "1.5  Sản phẩm và dịch vụ, bạn đã mua từ chúng tôi, cũng như những sản phẩm bạn quan tâm và đã nắm giữ và các phương thức thanh toán liên quan được bạn sử dụng;",
	"generalInfo.policy.1.6": "1.6  Việc sử dụng các sản phẩm và dịch vụ của chúng tôi, các yêu cầu bồi thường bảo hiểm và tình trạng thanh toán các yêu cầu bồi thường này (và các chi tiết khác liên quan đến vấn đề này);",
	"generalInfo.policy.1.7": "1.7  Phân tích dữ liệu tiếp thị sản phẩm hoặc dịch vụ được thực hiện riêng cho bạn, bao gồm lịch sử liên lạc và thông tin về việc bạn có mở các tài liệu này hay nhấp vào đường link liên kết;",
	"generalInfo.policy.2": "2. CÁCH THỨC CHÚNG TÔI THU THẬP DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.2.1": "2.1  Trực tiếp từ bạn và bất kỳ thông tin nào từ các thành viên gia đình, cộng sự hoặc người thụ hưởng sản phẩm và dịch vụ;",
	"generalInfo.policy.2.2": "2.2  Thông tin về bạn được tạo ra khi bạn sử dụng các sản phẩm và dịch vụ của chúng tôi;",
	"generalInfo.policy.2.3": "2.3  Từ một nhà môi giới hoặc một bên trung gian khác (ví dụ: đại lý, nhà phân phối, đối tác kinh doanh), các bên mà chúng tôi có hợp tác để cung cấp sản phẩm hoặc dịch vụ hoặc cung cấp báo giá cho bạn;",
	"generalInfo.policy.2.4": "2.4  Các công ty đối tác liên kết với InOn, nếu bạn đã từng đăng ký mua hoặc đã mua sản phẩm từ các công ty này;",
	"generalInfo.policy.2.5": "2.5  Cookie, dịch vụ định vị, địa chỉ IP khi bạn truy cập trang mạng hoặc ứng dụng di động của chúng tôi hoặc khi bạn điền vào biểu mẫu Liên hệ với chúng tôi trong trang mạng hoặc ứng dụng của chúng tôi;",
	"generalInfo.policy.2.6": "2.6  Các bên thứ ba như công ty bảo hiểm, đại lý, nhà cung cấp, tổ chức tài chính, cá nhân y tế, tòa án hoặc hồ sơ thông tin đã được công bố công khai;",
	"generalInfo.policy.2.7": "2.7  Bảng câu hỏi và thông tin liên lạc chi tiết khi bạn tham gia khảo sát, hội nghị nhà đầu tư, các buổi hội thảo hoặc khi bạn cập nhật thông tin liên lạc của bạn với chúng tôi trên trang mạng của chúng tôi;",
	"generalInfo.policy.2.8": "2.8  Từ các nguồn khác như Cơ quan phòng chống gian lận, tổ chức tham chiếu tín dụng, người cho vay khác và các thông tin đã được công bố công khai (ví dụ: danh bạ điện thoại, phương tiện truyền thông xã hội, các trang mạng, các bài báo), các tổ chức thu hồi nợ, các tổ chức khác để hỗ trợ phòng ngừa và phát hiện tội phạm, cảnh sát và các cơ quan thực thi pháp luật;",
	"generalInfo.policy.2.9": "2.9  Chúng tôi mua thông tin về bạn hoặc khách hàng nói chung từ các bên thứ ba bao gồm thông tin nhân khẩu học, chi tiết các phương tiện đi lại, lịch sử yêu cầu bồi thường, thông tin về gian lận, danh sách quảng cáo tiếp thị, thông tin đã được công bố công khai và thông tin khác để giúp cải thiện sản phẩm và dịch vụ của chúng tôi.",
	"generalInfo.policy.3": "3. CHÍNH SÁCH COOKIE",
	"generalInfo.policy.3.1": "3.1   Trang mạng của chúng tôi sử dụng cookie để phân biệt bạn với những người dùng khác. Điều này giúp chúng tôi cung cấp cho bạn trải nghiệm tốt khi bạn sử dụng trang mạng và cũng cho phép chúng tôi cải thiện trang mạng của mình. Cookie là một tệp nhỏ gồm các chữ cái và số mà chúng tôi lưu trữ trên trình duyệt hoặc ổ cứng máy tính của bạn. Cookie chứa thông tin được lưu trữ trên ổ cứng máy tính của bạn. Bạn có khả năng chấp nhận hoặc từ chối cookie bằng cách sửa đổi cài đặt trong trình duyệt của bạn. Nếu bạn muốn làm điều này, xin vui lòng xem mục trợ giúp trong trình duyệt của bạn.",
	"generalInfo.policy.3.2": "3.2   Chúng tôi sử dụng các loại cookie sau:",
	"generalInfo.policy.3.2.1": "3.2.1    Cookie cần thiết cho trang mạng, đây là các cookie cần phải có để phục vụ hoạt động của trang  mạng của chúng tôi. Ví dụ, các cookie cho phép bạn đăng nhập vào trang mạng của chúng tôi một cách an toàn;",
	"generalInfo.policy.3.2.2": "3.2.2    Cookie phân tích/quản lý hoạt động: các cookie này cho phép chúng tôi nhận ra và đếm số lượng người dùng truy cập vào trang mạng của chúng tôi và theo dõi cách người dùng truy cập di huyển xung quanh trang mạng của chúng tôi khi họ đang sử dụng nó. Điều này giúp chúng tôi cải thiện cách thức hoạt động của trang mạng, ví dụ, cải tiến để giúp người dùng tìm kiếm những thứ họ cần một cách dễ dàng;",
	"generalInfo.policy.3.2.3": "3.2.3    Cookie chức năng: chúng được sử dụng để nhận ra bạn khi bạn quay lại trang mạng của chúng tôi. Điều này cho phép chúng tôi cá nhân hóa nội dung của chúng tôi cho bạn, chào bạn bằng tên và ghi nhớ sở thích của bạn (ví dụ: lựa chọn ngôn ngữ hoặc khu vực của bạn).",
	"generalInfo.policy.3.3": "3.3   Bằng cách tiếp tục sử dụng trang mạng của chúng tôi, bạn chấp nhận chúng tôi sử dụng các loại cookie như đã nêu ở trên.",
	"generalInfo.policy.4": "4. CÁCH THỨC VÀ LÝ DO CHÚNG TÔI SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.4.1": "4.1  Chúng tôi, InOn và các đối tác kinh doanh sẽ sử dụng dữ liệu cá nhân bạn cung cấp cho chúng tôi, cùng với các thông tin khác, cho các mục đích sau:",
	"generalInfo.policy.4.1.1": "<table class='table table-bordered info-item-table'><thead><tr><td>Mục đích</td><td>Cơ sở pháp lý</td></tr></thead><tbody><tr><td>Quản lý các sản phẩm và dịch vụ của chúng tôi, bao gồm cho phép chúng tôi thực hiện nghĩa vụ của chúng tôi với bạn và cung cấp mọi dịch vụ liên quan như đã thảo luận với bạn trước khi bạn mua sản phẩm hoặc dịch vụ.</td><td rowspan='2'>Cần thiết cho việc thực hiện hợp đồng của chúng tôi với bạn hoặc để thực hiện các bước trước khi ký hợp đồng với bạn.&nbsp;</td></tr><tr><td>Thực hiện kiểm tra bằng cách thông qua các tổ chức như tổ chức tín dụng, công ty hỗ trợ tìm kiếm hoặc thông tin đã được công bố công khai (xem thêm nội dung trình bày trong Phần “Kiểm tra tham khảo”).</td></tr><tr><td>Cung cấp dịch vụ khách hàng – như trả lời thắc mắc của bạn hoặc thông báo cho bạn biết các thay đổi.</td><td rowspan='3'>Cần thiết cho việc thực hiện hợp đồng của chúng tôi với bạn. Sau khi hợp đồng chúng tôi ký với bạn hoàn tất, đây là lợi ích hợp pháp của chúng tôi trong việc duy trì và phát triển mối quan hệ của chúng tôi với bạn.</td></tr><tr><td>Tự động ra quyết định hoặc tạo hồ sơ cá nhân của bạn (xem thêm nội dung trình bày trong Phần “Chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động hoặc tạo hồ sơ cá nhân của bạn”).</td></tr><tr><td>Lưu giữ thông tin của bạn và thực hiện các công việc quản lý nội bộ khác.</td></tr><tr><td>Tuân thủ với các yêu cầu pháp quy hoặc pháp lý khác.</td><td>Tuân thủ với các nghĩa vụ pháp lý của chúng tôi.</td></tr><tr><td>Thiết kế và cung cấp cho bạn các sản phẩm và dịch vụ bảo hiểm và tài chính liên quan.</td><td rowspan='2'>Lợi ích chính đáng của chúng tôi trong việc thiết kế và cải tiến sản phẩm, cung cấp dịch vụ giá trị gia tăng, phát triển kinh doanh và hiểu rõ hơn về cách sử dụng sản phẩm của chúng tôi.&nbsp;</td></tr><tr><td>Tiến hành nghiên cứu và phân tích thống kê (bao gồm cả việc sử dụng các công nghệ mới).</td></tr></tbody></table>",
	"generalInfo.policy.4.2": "4.2  Ngoài ra, chúng tôi, <b>InOn</b> và các đối tác kinh doanh của chúng tôi, sẽ sử dụng dữ liệu cá nhân bạn cung cấp cho chúng tôi, cùng với các thông tin khác, để gửi cho bạn các ưu đãi tiếp thị trực tiếp bằng phương tiện điện tử và phi điện tử bao gồm qua đường bưu điện, cũng như gửi cho bạn thông tin giới thiệu các sản phẩm và dịch vụ từ các bên thứ ba đã được chọn lọc kỹ lưỡng. Cơ sở pháp lý chúng tôi trình bày bên trên được xây dựng dựa trên sự đồng thuận với bạn.",
	"generalInfo.policy.4.3": "4.3  Chúng tôi chia sẽ dữ liệu cá nhân của bạn với ai và tại sao:",
	"generalInfo.policy.4.3.1": "4.3.1  Chúng tôi sẽ chia sẻ thông tin cá nhân và sức khỏe của bạn trong nội bộ <b>InOn</b> và với các đối tác kinh doanh tài chính/sức khỏe và các bên thứ ba cung cấp dịch vụ cho chúng tôi (bao gồm nhưng không giới hạn các công ty bảo hiểm, luật sư, ngân hàng, kế toán, tổ chức tài chính, bên ủy thác và các nhà cung cấp dịch vụ là bên thứ ba khác cung cấp dịch vụ quản lý, viễn thông, máy tính, thanh toán, in ấn, mua lại hoặc các dịch vụ khác để cho phép chúng tôi thực hiện hoạt động kinh doanh), các công ty thẩm định hóa đơn y tế, các công ty thẩm định yêu cầu bồi thường, hiệp hội và hiệp đoàn trong cùng ngành, các bên đồng sở hữu hợp đồng bảo hiểm hoặc khoản đầu tư, cố vấn chuyên nghiệp, nhà nghiên cứu, tổ chức tham chiếu tín dụng, tổ chức thu hồi nợ, tổ chức tài chính/y tế và các bên đối tác để thực hiện các mục đích được nêu trong Phần “Cách thức và lý do chúng tôi sử dụng dữ liệu cá nhân của ban”. Nếu bạn có chung hợp đồng bảo hiểm với người khác, thì người đó cũng có thể nhận được dữ liệu cá nhân của bạn. Nếu được yêu cầu, chúng tôi cũng có thể chuyển dữ liệu cá nhân của bạn cho các cơ quan phòng chống tội phạm tài chính, bất kỳ cơ quan lập pháp, tư pháp hoặc hành pháp nào khác.",
	"generalInfo.policy.4.3.2": "4.3.2  Chúng tôi có thể xử lý dữ liệu cá nhân của bạn ở một quốc gia khác ngoài quốc gia mà bạn cư trú. Trong phạm vi chúng tôi chuyển dữ liệu cá nhân của bạn, chúng tôi sẽ sử dụng các biện pháp bảo vệ phù hợp và tuân thủ luật pháp của quốc gia nơi dữ liệu cá nhân của bạn được chuyển đến. Khi bạn yêu cầu, chúng tôi sẽ cung cấp cho bạn chi tiết các biện pháp bảo vệ dữ liệu mà chúng tôi đang sử dụng.",
	"generalInfo.policy.4.4": "4.4  Chúng tôi lưu trữ dữ liệu cá nhân của bạn trong một khoảng thời gian nhất định",
	"generalInfo.policy.4.4.1": "4.4.1   Dữ liệu cá nhân của bạn sẽ được lưu trữ khi bạn (hoặc đồng sở hữu hợp đồng bảo hiểm với bạn) là khách hàng của chúng tôi và trong khoảng thời gian sáu năm sau khi kết thúc mối quan hệ khách hàng hoặc lâu hơn nếu pháp luật yêu cầu. Có thể có những trường hợp cụ thể khi chúng tôi cần lưu giữ dữ liệu cá nhân của bạn lâu hơn (chẳng hạn như khi có tranh chấp xảy ra).",
	"generalInfo.policy.5": "5. KIỂM TRA THAM KHẢO",
	"generalInfo.policy.5.1": "5.1  Đối với một số sản phẩm nhất định, chúng tôi có thể sử dụng các tổ chức tham chiếu tín dụng, công ty  hỗ trợ tìm kiếm, cơ quan phòng chống tội phạm tài chính hoặc thông tin có sẵn công khai để giúp chúng tôi kiểm tra danh tính của bạn, cũng như để tránh gian lận và rửa tiền; điều này có thể bao gồm kiểm tra các địa chỉ hiện tại hoặc trước đây của bạn. Những kết quả này có thể được ghi lại để tham khảo trong tương lai.",
	"generalInfo.policy.5.2": "5.1  Những kết quả kiểm tra này cũng có thể được sử dụng cho một nhà đầu tư, chủ sở hữu hợp đồng chung hoặc người mà bạn đồng ý cung cấp dữ liệu cá nhân của mình. Nếu chúng tôi mất liên lạc với bạn, chúng tôi có thể sử dụng các tổ chức này để xác minh địa chỉ của bạn nhằm giúp chúng tôi liên lạc với bạn.",
	"generalInfo.policy.5.3": "5.3  Mọi việc chuyển dữ liệu cá nhân của bạn sẽ luôn được thực hiện an toàn.",
	"generalInfo.policy.6": "6. CHÚNG TÔI CÓ THỂ SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN ĐỂ ĐƯA RA QUYẾT ĐỊNH TỰ ĐỘNG HOẶC TẠO HỒ SƠ CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.6.1": "6.1  Chúng tôi, InOn, Đối tác kinh doanh và Đối tác tiếp thị của chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động ảnh hưởng đến bạn hoặc tạo hồ sơ cá nhân khác cho bạn (ví dụ: hồ sơ tiếp thị).",
	"generalInfo.policy.7": "7. SỬ DỤNG DỮ LIỆU CÁ NHÂN NHẠY CẢM CỦA BẠN",
	"generalInfo.policy.7.1": "7.1  Đối với một số sản phẩm hoặc dịch vụ nhất định, chúng tôi sẽ cần xử lý dữ liệu cá nhân nhạy cảm của bạn, chẳng hạn như thông tin liên quan đến sức khỏe, di truyền, định danh sinh trắc học và khuynh hướng giới tính. Trong phạm vi chúng tôi cần sự đồng ý rõ ràng của bạn để xử lý loại dữ liệu cá nhân này theo cách được mô tả trong Phần “Cách thức và lý do chúng tôi sử dụng dữ liệu cá nhân của bạn” , “Kiểm tra tham khảo” và “Chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động hoặc tạo hồ sơ cá nhân của bạn”, chúng tôi sẽ cung cấp chi tiết về điều này khi chúng tôi thu thập các thông tin này từ bạn và xin nhận được sự chấp thuận của bạn.",
	"generalInfo.policy.8": "8. QUYỀN KIỂM SOÁT DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.8.1": "8.1  Khi nói đến cách chúng tôi sử dụng dữ liệu cá nhân của bạn, bạn có quyền theo quy định của pháp luật Việt Nam.",
	"generalInfo.policy.8.2": "8.2  Trong khi đó, nếu bạn hiện đang cư trú tại Châu Âu, các quyền bổ sung theo Quy định bảo vệ dữ liệu chung (GDPR) có thể được áp dụng. Như vậy, bạn có thể:",
	"generalInfo.policy.8.2.1": "8.2.1  Yêu cầu một bản sao dữ liệu cá nhân của bạn miễn phí (chúng tôi có thể tính phí yêu cầu của bạn nếu không có cơ sở rõ ràng hoặc bị lạm dụng quá mức);",
	"generalInfo.policy.8.2.2": "8.2.2  Trong một số trường hợp nhất định, chúng tôi sẽ chuyển dữ liệu cá nhân của bạn sang một tổ chức khác theo yêu cầu của bạn;",
	"generalInfo.policy.8.2.3": "8.2.3  Yêu cầu chúng tôi điều chỉnh bất cứ dữ liệu cá nhân nào bị sai hoặc không đầy đủ;",
	"generalInfo.policy.8.2.4": "8.2.4  Yêu cầu chúng tôi xóa dữ liệu cá nhân của bạn nếu không còn cần thiết cho các mục đích được nêu trong Phần “Các loại dữ liệu cá nhân chúng tôi sẽ thu thập và xử lý” hoặc nếu không có cơ sở pháp lý nào khác để xử lý dữ liệu;",
	"generalInfo.policy.8.2.5": "8.2.5  Giới hạn cách chúng tôi sử dụng dữ liệu cá nhân của bạn hoặc rút lại sự đồng ý (bao gồm cả việc đồng ý cho phép đưa ra quyết định tự động dựa trên dữ liệu cá nhân) mà bạn đã chấp thuận cho phép chúng tôi xử lý dữ liệu cá nhân của bạn;",
	"generalInfo.policy.8.2.6": "8.2.6  Phản đối chúng tôi sử dụng dữ liệu cá nhân của bạn để tiếp thị trực tiếp (bao gồm cả việc tạo lập hồ sơ cá nhân của bạn) hoặc xử lý dữ liệu khác dựa trên lợi ích hợp pháp;",
	"generalInfo.policy.8.2.7": "8.2.7  Khiếu nại với cơ quan bảo vệ dữ liệu hoặc cơ quan quản lý độc lập khác về cách chúng tôi sử dụng dữ liệu cá nhân của bạn.",
	"generalInfo.policy.8.3": "8.3  Nếu bạn muốn thực hiện các quyền của mình hoặc muốn giải thích về các quyền này, bạn có thể liên lạc với chúng tôi trong phần Liên hệ.",
	"generalInfo.policy.8.4": "8.4  Nếu bạn cần nói chuyện với chúng tôi, chúng tôi sẽ chuyển yêu cầu của bạn cho Người Kiểm Soát Dữ Liệu (8.4.1)  cá nhân của bạn là InOn Chúng tôi có thể theo dõi hoặc ghi lại các cuộc gọi hoặc bất kỳ liên lạc nào khác mà chúng tôi có với bạn. Điều này có thể là để đào tạo, bảo mật hoặc để giúp chúng tôi kiểm tra chất lượng.",
	"generalInfo.policy.8.4.1": "8.4.1  Người Kiểm Soát Dữ Liệu – Cá nhân, pháp nhân, cơ quan nhà nước, các cơ quan hoặc tổ chức khác, riêng rẻ hoặc cùng nhau, xác định mục đích và cách thức xử lý dữ liệu cá nhân.",
	"generalInfo.policy.9": "9.  THAY MẶT NGƯỜI KHÁC CUNG CẤP DỮ LIỆU CÁ NHÂN CỦA HỌ",
	"generalInfo.policy.9.1": "9.1  Khi bạn cung cấp cho chúng tôi dữ liệu cá nhân về người khác (hoặc nhiều người khác), bạn nên được chỉ định và ủy quyền bởi người đó để hành động thay họ. Điều này bao gồm cung cấp sự đồng ý để:",
	"generalInfo.policy.9.1.1": "9.1.1  Chúng tôi xử lý dữ liệu cá nhân của họ và dữ liệu cá nhân nhạy cảm (như chúng tôi đã giải thích trong các Phần ở trên);",
	"generalInfo.policy.9.1.2": "9.1.1  Bạn sẽ nhận được các thông báo bảo vệ thông tin thay mặt họ.",
	"generalInfo.policy.9.2": "9.2  Nếu vì bất kỳ lý do nào bạn quan tâm đến việc liệu bạn có được phép cung cấp cho chúng tôi thông tin về người khác hay không, vui lòng liên hệ với chúng tôi theo địa chỉ thư điện tử bên dưới trước khi gửi cho chúng tôi bất cứ thông tin gì.",
	"generalInfo.policy.10": "10. TIẾP THỊ TRỰC TIẾP",
	"generalInfo.policy.10.1": "10.1  Chúng tôi, <b>InOn</b>, đối tác kinh doanh của chúng tôi, và đối tác tiếp thị vẫn sẽ gửi cho bạn thông tin qua hình thức các bài đăng về các sản phẩm và dịch vụ của InOn và các bên thứ ba được lựa chọn cẩn thận.",
	"generalInfo.policy.10.2": "10.2  Ngoài ra, theo thời gian, chung tôi InOn mong muốn gởi thông tin chi tiết về sản phẩm, dịch vụ và các ưu đãi đặc biệt cho bạn qua các phương tiện điện tử. Chúng tôi sẽ chỉ làm điều này nếu bạn đồng ý cho chúng tôi liên lạc với bạn bằng phương tiện điện tử.",
	"generalInfo.policy.10.3": "10.3  Và nếu bạn thay đổi ý định và/hoặc bạn muốn từ chối nhận tiếp thị trực tiếp phi điện tử, thì bạn cứ cho chúng tôi biết. Chỉ cần sử dụng một trong các tùy chọn trong mục Liên hệ với chúng tôi.",
	"generalInfo.policy.11": "11. LIÊN HỆ VỚI CHÚNG TÔI",
	"generalInfo.policy.11.1": "11.1  Nếu bạn muốn thực hiện các quyền của mình trong Phần “Quyền kiểm soát dữ liệu cá nhân của bạn” hoặc nếu bạn yêu cầu bất kỳ thông tin nào theo thông báo này, bạn có thể liên hệ với chúng tôi theo nhiều cách khác nhau.",
	"generalInfo.policy.11.1.1": "11.1.1  Gọi cho đường dây nóng của chúng tôi: <b>0582.33.55.88</b>",
	"generalInfo.policy.11.1.2": "11.1.2  Gửi thư điện tử cho chúng tôi theo địa chỉ: <b>lienhe@inon.vn</b>",
	"generalInfo.policy.11.1.3": "11.1.3  Hoặc liên hệ trực tiếp với chúng tôi tại văn phòng: <b>Tầng 6 – P611, Tòa nhà MD Complex, số 68 Nguyễn Cơ Thạch, Phường Cầu Diễn, Quận Nam Từ Liêm, Thành Phố Hà Nội.</b>",
	"generalInfo.terms.1": "1. CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG",
	"generalInfo.terms.1.1": "1.1  Trang thông tin điện tử này <b>(www.inon.vn) do Công Ty TNHH NPG NAM PHONG - Đơn vị chủ quản của Hệ thống và Thương hiệu InOn (sau đây gọi tắt là “InOn”)</b> hoàn toàn sở hữu và điều hành.",
	"generalInfo.terms.1.2": "1.2  Việc sử dụng trang thông tin điện tử này phụ thuộc vào các điều khoản và điều kiện cụ thể sau: (A) các điều khoản và điều kiện được nêu dưới đây và (B) mọi điều khoản và điều kiện bổ sung cụ thể tùy từng thời điểm để điều chỉnh việc sử dụng, và truy cập vào một số mục của trang thông tin điện tử này (và các điều khoản bổ sung đó sẽ có hiệu lực ràng buộc khi chúng được đăng tải trên trang thông tin điện tử này) <b>(\"Điều Khoản và Điều Kiện\")</b>.",
	"generalInfo.terms.1.3": "1.3  Khi sử dụng trang thông tin điện tử này, bạn đã đồng ý với các Điều Khoản và Điều Kiện, và sự đồng ý của bạn cùng với các Điều Khoản và Điều Kiện sẽ cấu thành một hợp đồng có giá trị ràng buộc về pháp lý giữa bạn và <b>InOn</b>. Vì thế, bạn vui lòng đọc kỹ các Điều Khoản và Điều Kiện của trang thông tin điện tử này.",
	"generalInfo.terms.2": "2. CÁC HẠN CHẾ VÀ SỬ DỤNG CÁC THÔNG TIN TÀI LIỆU",
	"generalInfo.terms.2.1": "2.1  Trừ khi được <b>InOn</b> đồng ý bằng văn bản một cách khác đi, bạn sẽ không sao chép, sao lại, tái bản, đưa lên mạng, công bố, chuyển, tạo liên kết đến hoặc phân phối dưới bất cứ hình thức nào các thông tin và/hoặc tài liệu đã được đăng tải trên trang thông tin điện tử này.",
	"generalInfo.terms.2.2": "2.2  Bạn có thể tải xuống các thông tin và/hoặc tài liệu được đăng tải trên trang thông tin điện tử này để bạn sử dụng, nhưng luôn luôn với điều kiện là bạn không dỡ bỏ các thông tin về bản quyền và/hoặc các quyền khác của <b>InOn</b> gắn với các thông tin và/hoặc tài liệu đó.",
	"generalInfo.terms.2.3": "2.3  Bạn không được phát tán, sửa đổi, chuyển đi, sử dụng lại, công bố, tạo liên kết hoặc sử dụng các nội dung của trang thông tin điện tử này, bao gồm, nhưng không giới hạn bởi, cả các thông tin bằng chữ, các hình ảnh, các tập tin âm thanh và/hoặc các đoạn phim, cho các mục đích kinh doanh và/hoặc công cộng, khi chưa có sự cho phép bằng văn bản của InOn.",
	"generalInfo.terms.3": "3. THỜI GIAN HOẠT ĐỘNG",
	"generalInfo.terms.3.1": "3.1 Trang thông tin điện tử này hoạt động 24 giờ mỗi ngày và 7 ngày mỗi tuần. Tuy nhiên, <b>InOn</b> bảo lưu quyền ngắt hệ thống để bảo trì khi cần thiết. <b>InOn</b> sẽ cố gắng để lên kế hoạch và thông báo về việc hệ thống không thể sử dụng được bằng cách đưa một thông báo trên mạng trực tuyến. <b>InOn</b> không chịu trách nhiệm đối với bất cứ thiệt hại và/hoặc mất mát nào do việc hệ thống bị ngắt trong trường hợp này.",
	"generalInfo.terms.4": "4. TÀI KHOẢN NGƯỜI SỬ DỤNG",
	"generalInfo.terms.4.1": "4.1  Bạn sẽ đăng ký và được cung cấp một Tên Truy Cập Tài Khoản và Mật khẩu để có thể mua bảo hiểm trên trang thông tin điện tử này. Bạn sẽ giữ bí mật Tên Truy Cập Tài Khoản và Mật khẩu này vào mọi thời điểm, và sẽ bảo đảm rằng Tên Truy Cập Tài Khoản và Mật khẩu này của bạn sẽ không bị tiết lộ theo bất cứ cách thức nào cho bất kỳ ai.",
	"generalInfo.terms.4.2": "4.2  <b>InOn</b> sẽ không chịu trách nhiệm về bất cứ giao dịch không được phép nào do việc Tên Truy Cập Tài Khoản và/hoặc Mật khẩu bị sử dụng sai và/hoặc sử dụng mà không được phép. Bạn phải lập tức thông báo cho <b>InOn</b> bất cứ trường hợp nào mà Tên Truy Cập Tài Khoản và/hoặc Mật khẩu của bạn bị sử dụng sai và/hoặc sử dụng mà không được phép. Bạn chịu trách nhiệm hoàn toàn về việc bảo mật Tên Truy Cập Tài Khoản và Mật khẩu và đối với bất cứ việc truy cập nào sử dụng Tên Truy Cập Tài Khoản và/hoặc Mật khẩu của bạn.",
	"generalInfo.terms.5": "5. BẢN QUYỀN VÀ NHÃN HIỆU",
	"generalInfo.terms.5.1": "5.1  Mọi nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này là tài sản của <b>InOn</b> và các đối tác khác (nếu có).",
	"generalInfo.terms.5.2": "5.2  Không có điều gì trên trang thông tin điện tử này có thể được hiểu là, dù là ngầm định hay cách khác, cho phép sử dụng hoặc bất cứ quyền sử dụng nào liên quan đến bất cứ nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này khi chưa có sự đồng ý bằng văn bản của <b>InOn</b> hoặc bên thứ ba sở hữu các nhãn hiệu hoặc tên thương mại đặt trên trang thông tin điện tử này.",
	"generalInfo.terms.5.3": "5.3  Bạn hoàn toàn không được sử dụng bất cứ nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này hoặc bất cứ nội dung nào khác có trên trang thông tin điện tử này, trừ các trường hợp được quy định trong các Điều Khoản và Điều Kiện.",
	"generalInfo.terms.5.4": "5.4  Các hình ảnh đặt trên trang thông tin điện tử này là tài sản của <b>InOn</b> hoặc được <b>InOn</b> sử dụng theo sự đồng ý của chủ sở hữu.",
	"generalInfo.terms.5.5": "5.5  Trừ khi được cho phép cụ thể, bạn không được sử dụng bất cứ hình ảnh nào đặt trên trang thông tin điện tử này, bạn cũng không được ủy quyền cho bất cứ người nào sử dụng bất cứ hình ảnh nào đặt trên trang thông tin điện tử này. Bất cứ việc sử dụng không được phép nào đối với các hình ảnh này có thể vi phạm luật tác quyền, luật nhãn hiệu, luật về quyền riêng tư và luật xuất bản, và các quy định về thông tin khác.",
	"generalInfo.terms.6": "6. QUY ĐỊNH VỀ QUYỀN RIÊNG TƯ",
	"generalInfo.terms.6.1": "6.1   Xin đọc kỹ CHÍNH SÁCH VỀ QUYỀN RIÊNG TƯ TRÊN INTERNET của chúng tôi. Chính sách này giải thích rõ những thông tin nào <b>InOn</b> có thể thu thập từ bạn trên trang thông tin điện tử của chúng tôi và cách thức chúng tôi sẽ sử dụng và bảo vệ các thông tin của bạn. Chúng tôi sẽ không thu thập bất cứ thông tin xác định danh tính cá nhân nào trên trang thông tin điện tử của chúng tôi trừ khi bạn cung cấp các thông tin đó cho chúng tôi.",
	"generalInfo.terms.7": "7. LIÊN KẾT ĐẾN CÁC TRANG WEB KHÁC",
	"generalInfo.terms.7.1": "7.1  Trang thông tin điện tử này liên kết đến các trang thông tin điện tử khác không do <b>InOn</b> quản lý hoặc điều khiển. <b>InOn</b> sẽ không chịu trách nhiệm về nội dung của các trang thông tin điện tử đó.",
	"generalInfo.terms.7.2": "7.2  Việc liên kết đến bất cứ trang thông tin điện tử nào như thế không có nghĩa là <b>InOn</b> đã chấp thuận hoặc tán thành đối với các trang thông tin điện tử đó, hoặc với nội dung của các trang thông tin điện tử đó, hoặc các sản phẩm và dịch vụ trên các trang thông tin điện tử đó.",
	"generalInfo.terms.8": "8. AN NINH CỦA TRANG WEB",
	"generalInfo.terms.8.1": "8.1  Bạn sẽ không xâm phạm hoặc cố gắng xâm phạm an ninh của trang thông tin điện tử này, bao gồm, nhưng không giới hạn, các hành vi dưới đây:",
	"generalInfo.terms.8.1.1": "8.1.1  Truy cập thông tin hoặc nối vào một máy chủ hoặc tài khoản mà bạn không được phép truy cập.",
	"generalInfo.terms.8.1.2": "8.1.2  Cố gắng thăm dò, kiểm tra hoặc thử nghiệm điểm yếu của một hệ thống hoặc hệ thống mạng để vi phạm an ninh hoặc biện pháp nhận dạng mà không được <b>InOn</b> cho phép bằng văn bản.",
	"generalInfo.terms.8.1.3": "8.1.3  Cố gắng can thiệp vào dịch vụ cung cấp cho bất cứ người sử dụng nào, máy chủ hoặc hệ thống mạng nào, bằng cách phát tán vi rút hoặc mã độc lên trang thông tin điện tử, làm quá tải hoặc gây ra hiện tượng thư rác (spamming) trên trang thông tin điện tử;",
	"generalInfo.terms.8.1.4": "8.1.4  Thay đổi thông tin của phần tiêu đề (header) của bộ giao thức điều khiển truyền vận (TCP/IP) hoặc bất cứ phần thông tin nào của phần tiêu đề (header) trong bất cứ thư điện tử hay nhóm thông tin được đăng tải.",
	"generalInfo.terms.8.2": "8.2  Bạn không sử dụng trang thông tin điện tử này cho bất cứ mục đích bất hợp pháp nào.",
	"generalInfo.terms.8.3": "8.3  Bạn phải đảm bảo rằng tất cả các thông tin được đưa lên trang thông tin điện tử này là đầy đủ, chính xác, có thật, phù hợp và nhất quán với các tài liệu chứa đựng các thông tin này. Vi phạm điều này sẽ dẫn đến việc chậm trễ trong quy trình xử lý hoặc các thông tin điện tử được đưa lên bị loại bỏ. Bạn phải chịu trách nhiệm đối với toàn bộ chi phí phát sinh do việc đưa thông tin giả mạo hoặc sai.",
	"generalInfo.terms.8.4": "8.4  Bạn sẽ không tấn công hoặc cố gắng tấn công hoặc làm hại trang thông tin điện tử này bằng bất cứ hình thức hay phương tiện nào như các công cụ tấn công, vi-rút và chương trình máy tính có chứa các mã có thể gây hỏng máy tính. Bất cứ cố gắng nào để thực hiện các hành vi như vậy đều khiến bạn phải chịu sự truy tố theo quy định của pháp luật hiện hành.",
	"generalInfo.terms.9": "9. KHÔNG CHỊU TRÁCH NHIỆM",
	"generalInfo.terms.9.1": "9.1  Mặc dù <b>InOn</b> thực hiện mọi sự cẩn trọng khi cung cấp dịch vụ tại trang thông tin điện tử, <b>InOn</b> không cam kết rằng trang thông tin điện tử này sẽ hoạt động không có lỗi hoặc hoàn toàn không có vi-rút, worms, Trojan horses hoặc các mã độc hại khác.",
	"generalInfo.terms.9.2": "9.2  <b>InOn</b> không chấp nhận bất cứ trách nhiệm nào, và sẽ không chịu trách nhiệm về bất cứ thiệt hại nào xảy ra cho thiết bị máy tính hoặc các tài sản khác của bạn do việc bạn truy cập vào, sử dụng, hoặc xem lướt qua trang thông tin điện tử này hoặc việc bạn tải xuống bất cứ tài liệu, dữ liệu, các thông tin bằng chữ, các hình ảnh, các đoạn video, hoặc các tập tin âm thanh nào từ trang thông tin điện tử này hoặc phát sinh liên quan đến việc chậm thực hiện, lỗi, thiếu sót, bị gián đoạn, lỗi, vi-rút máy tính, chậm trễ trong hoạt động hoặc truyền dữ liệu, hoặc lỗi hệ thống hoặc đường truyền.",
	"generalInfo.terms.9.3": "9.3  <b>InOn</b> cũng từ chối mọi trách nhiệm đối với:",
	"generalInfo.terms.9.3.1": "9.3.1  Bất cứ tổn thất nào hoặc không có khả năng lấy lại các dữ liệu hoặc thông tin vì bất cứ lý do gì và bao gồm việc không chuyển được, việc sử dụng không đúng mục đích hoặc việc chuyển sai do kết quả của bất cứ sự gián đoạn, ngưng hoặc chấm dứt dịch vụ trên trang thông tin điện tử này; ",
	"generalInfo.terms.9.3.2": "9.3.2  Bất cứ sự sai sót của các thông tin hoặc nguồn tài nguyên có sẵn, nhận được hoặc được chuyển thông qua trang thông tin điện tử;",
	"generalInfo.terms.9.3.3": "9.3.3  Bất cứ trục trặc, khuyết điểm hoặc sai sót của trang thông tin điện tử này; ",
	"generalInfo.terms.9.3.4": "9.3.4  Bất cứ sự chậm trễ hoặc không có khả năng trong việc cung cấp dịch vụ của <b>InOn</b> tại trang thông tin điện tử này theo các Điều Khoản và Điệu Kiện do bất cứ khuyết điểm hoặc hỏng hóc về điện tử, cơ khí, hệ thống, xử lý dữ liệu hoặc viễn thông, thiên tai, xáo trộn dân sự hoặc bất cứ sự kiện nào nằm ngoài sự kiểm soát của <b>InOn</b>.",
	"generalInfo.terms.10": "10. MIỄN TRỪ TRÁCH NHIỆM",
	"generalInfo.terms.10.1": "10.1  Trong bất cứ trường hợp nào, <b>InOn</b> cũng không chịu trách nhiệm về bất cứ thiệt hại, tổn thất hoặc chi phí, bao gồm nhưng không giới hạn, thiệt hại trực tiếp, đặc biệt hoặc do hệ quả của, hoặc tổn thất kinh tế phát sinh từ hoặc có liên quan hoặc có thể quy cho:",
	"generalInfo.terms.10.1.1": "10.1.1  Bất cứ việc truy cập, sử dụng hoặc không thể truy cập hoặc sử dụng trang thông tin điện tử hoặc dịch vụ này, hoặc tin cậy vào những thông tin trên trang thông tin điện tử này.",
	"generalInfo.terms.10.1.2": "10.1.2  Bất cứ sự hỏng hóc, sai sót, bỏ sót, gián đoạn hoặc chậm trễ trong việc truyền dữ liệu;",
	"generalInfo.terms.10.1.3": "10.1.3  Bất cứ vi-rút máy tính hoặc hoặc các mã độc hại, hoặc các đoạn mã, chương trình hay một lệnh riêng lẻ bằng ngôn ngữ lập trình mà kết quả là một chuỗi lệnh bằng ngôn ngữ máy tính (macro) mang tính chất làm hỏng hoặc phá hủy khác có thể ảnh hưởng đến các thiết bị, chương trình máy tính hoặc các tài sản khác của bạn.",
	"generalInfo.terms.11": "11. BỒI THƯỜNG",
	"generalInfo.terms.11.1": "11.1 Bằng việc truy cập vào trang thông tin điện tử này, bạn đồng ý bồi thường cho <b>InOn</b>, giữ cho <b>InOn</b> khỏi mọi thiệt hại và bảo vệ <b>InOn</b> khỏi bất cứ khiếu nại, hành động hoặc đòi hỏi, bao gồm nhưng không giới hạn các chi phí pháp lý và kế toán hợp lý, được cho là hoặc là kết quả của việc bạn sử dụng trang thông tin điện tử này hoặc dịch vụ tại trang thông tin điện tử này, hoặc do việc bạn vi phạm các Điều Khoản và Điều Kiện.",
	"generalInfo.terms.12": "12. CHẤM DỨT",
	"generalInfo.terms.12.1": "12.1  <b>InOn</b> bảo lưu quyền, theo quyết định riêng của <b>InOn</b>, chấm dứt dịch vụ trên trang thông tin điện tử này vào bất cứ thời điểm nào, có hoặc không có lý do hoặc chấm dứt quyền truy cập vào trang thông tin điện tử này của bạn mà không cần báo trước và không cần lý do. Bằng việc truy cập vào trang thông tin điện tử này, bạn được coi là từ bỏ quyền được <b>InOn</b> thông báo về việc chấm dứt này, nếu có.",
	"generalInfo.terms.12.2": "12.2  <b>InOn</b> không chịu trách nhiệm về bất cứ thiệt hại, mất mát hoặc chí phí phát sinh theo bất cứ cách thức nào, từ hoặc do việc chấm dứt dịch vụ trên trang thông tin điện tử này.",
	"generalInfo.terms.13": "13. SỬA ĐỔI",
	"generalInfo.terms.13.1": "13.1  <b>InOn</b> có thể thay đổi và thay thế nội dung các Điều Khoản và Điều Kiện này và/hoặc quy định thêm các điều kiện và điều khoản mới vào bất cứ thời điểm nào mà không cần báo trước cho bạn. Bằng việc sử dụng trang thông tin điện tử này, bạn được coi là từ bỏ quyền được thông báo hoặc chấp thuận bất cứ sửa đổi, thay đổi hoặc bổ sung nào với các Điều Khoản và Điều Kiện, nếu có.",
	"generalInfo.terms.13.2": "13.2  Các thay đổi sẽ có hiệu lực vào ngày đầu tiên được đưa lên trang thông tin điện tử này. Nếu bạn tiếp tục sử dụng trang thông tin điện tử sau thời gian đó, bạn được xem là đã chấp nhận các thay đổi.",
	"generalInfo.terms.14": "14. LUẬT ĐIỀU CHỈNH VÀ CƠ QUAN XỬ LÝ TRANH CHẤP",
	"generalInfo.terms.14.1": "14.1  Sự thỏa thuận giữa bạn và <b>InOn</b> trong các Điều Khoản và Điều Kiện này được điều chỉnh và giải thích theo pháp luật Việt Nam.",
	"generalInfo.terms.14.2": "14.2  Trong trường hợp có tranh chấp giữa bạn và <b>InOn</b> phát sinh từ hoặc có liên quan đến sự thỏa thuận này (“Tranh Chấp”), mỗi Bên nỗ lực tối đa để thảo luận các vấn đề với mục đích giải quyết Tranh Chấp thông qua biện pháp hòa giải.",
	"generalInfo.terms.14.3": "14.3  Nếu Tranh Chấp không được giải quyết trong vòng ba mươi (30) ngày kể từ ngày Tranh Chấp phát sinh, Tranh Chấp đó sẽ được phân xử chung thẩm bởi Trung tâm Trọng tài Quốc tế Việt Nam (bên cạnh Phòng Thương Mại và Công Nghiệp Việt Nam) (“VIAC”) bởi một (01) trọng tài viên theo quy tắc tố tụng trọng tài của VIAC có hiệu lực tại thời điểm xảy ra Tranh Chấp và ngôn ngữ trọng tài được sử dụng là tiếng Việt.",
	"createPassword.title": "CREATE PASSWORD *",
	"createPassword.password.required": "You must enter your password",
	"createPassword.password.invalid": "You password is invalid",
	"createPassword.enterThePassword": "Enter the password *",
	"createPassword.passwordMustMatch": "Password must match",
	"createPassword.condition.1": "- At least 8 characters long",
	"createPassword.condition.2": "- Include upper and lower case characters",
	"createPassword.condition.3": "- Include numeric and special characters",
	"createPassword.continutes": "CONTINUTE",
	"createPassword.done": "DONE",
	"createPassword.resetSuccessFul": "Change password successful!",
	"provideNewPassword.title": "PROVIDE A NEW PASSWORD",
	"provideNewPassword.continutes": "DONE",
	"provideNewPassword.password": "Enter your new password *",
	"provideNewPassword.enterThePassword": "Enter a new password *",
	"completeInformation.idType": "Type of identification*",
	"completeInformation.idType.required": "You must choose type of indentification",
	"completeInformation.nbrPer": "Identification number*",
	"completeInformation.nbrPer.required": "You must enter infor number",
	"completeInformation.nbrPer.invalid": "You Indenetication number is invalid",
	"completeInformation.dateOfBirth": "Date of birth",
	"completeInformation.dateOfBirth.required": "You must enter date of birth",
	"completeInformation.address": "Address*",
	"completeInformation.address.required": "You must enter address",
	"completeInformation.gif": "Referal code",
	"completeInformation.branch": "Branch*",
	"completeInformation.branch.required": "You must enter branch",
	"completeInformation.accountNbr": "Account number*",
	"completeInformation.accountNbr.required": "You must enter account number",
	"completeInformation.personalInfo": "Passport*",
	"completeInformation.gender": "Gender",
	"completeInformation.province": "City*",
	"completeInformation.province.required": "You must select your city",
	"completeInformation.district": "District*",
	"completeInformation.district.required": "You must select your district",
	"completeInformation.ward": "Wards*",
	"completeInformation.ward.required": "You must select your ward",
	"completeInformation.bank": "Bank*",
	"completeInformation.bank.required": "Bạn phải chọn Ngân hàng*",
	"completeInformation.back": "BACK",
	"completeInformation.done": "DONE"
};

var login$1 = "Đăng nhập";
var register$2 = "Đăng ký";
var forgotPassword$2 = "Quên mật khẩu";
var setting$1 = "Cài đặt";
var messages_vi = {
	"commom.error.requireField": "Bạn phải nhập {fieldName}",
	"common.gender.male": "Nam",
	"common.gender.female": "Nữ",
	"common.gender.other": "Khác",
	"common.icType.personalID": "Chứng minh nhân dân",
	"common.icType.citizenIdentify": "Căn cước công dân",
	"common.icType.passport": "Hộ chiếu",
	"common.icType.CMND": "Chứng minh nhân dân",
	"common.icType.CCCD": "Căn cước công dân",
	"common.icType.HC": "Hộ chiếu",
	"common.home": "Trang chủ",
	"common.backHome.confirmMessage": "Bạn có muốn quay lại trang chủ không?",
	"common.saveChanges": "Lưu thay đổi",
	"common.saveChanges.confirmMessage": "Bạn có muốn lưu thay đổi?",
	"common.cancel": "Hủy",
	"common.ok": "Đồng ý",
	"common.noResults": "Không có kết quả",
	"common.sesionExpired": "Phiên làm việc của bạn đã hết hạn, bạn vui lòng đăng nhập lại!",
	login: login$1,
	"login.firstWelcome": "Chào mừng bạn đến với InOn X!",
	"login.logedWelcome": "Xin chào,",
	"login.username": "Tên tài khoản *",
	"login.username.required": "Bạn phải nhập tên tài khoản",
	"login.username.invalid": "Tên tài khoản không hợp lệ",
	"login.password": "Mật khẩu *",
	"login.password.required": "Bạn phải nhập mật khẩu",
	"login.rememberMe": "Ghi nhớ tôi",
	"login.notMe": "Không phải tôi",
	"login.fail": "Tài khoản hoặc mật khẩu của bạn không chính xác",
	"login.sayHi": "Xin chào, {name}",
	register: register$2,
	"register.fullname": "Họ và tên *",
	"register.email": "Email*",
	"register.fullname.invalid": "Tên của bạn không thể chứa ký tự đặc biệt",
	"register.fullname.required": "Bạn phải nhập họ và tên",
	"register.email.required": "Bạn phải nhập địa chỉ email",
	"register.email.invalid": "Địa chỉ email không hợp lệ",
	"register.phoneNumber": "Số điện thoại *",
	"register.phoneNumber.required": "Bạn phải nhập số điện thoại",
	"register.phoneNumber.invalid": "Số điện thoại không hợp lệ",
	"register.refCode": "Mã giới thiệu",
	"register.refCode.invalid": "Mã giới thiệu không hợp lệ",
	"register.mustAppcepted": "Bạn phải đồng ý điều khoản và điều kiện của chúng tôi",
	"register.registerSuccess": "Đề nghị đăng ký của đối tác đang được xử lý.Vui lòng kiểm tra email để hoàn thành.Xin cảm ơn!",
	"register.agreeWith": "Tôi đồng ý với",
	"register.policyAndCondition": "Điều khoản và Điều kiện",
	"register.useService": "sử dụng dịch vụ.",
	forgotPassword: forgotPassword$2,
	"forgotPassword.verify": "Xác thực",
	"forgotPassword.username": "Tên tài khoản *",
	"forgotPassword.username.required": "Bạn phải nhập tên tài khoản",
	"forgotPassword.email": "Email đăng ký *",
	"forgotPassword.email.required": "Bạn phải nhập email đăng ký",
	"forgotPassword.successfull": "Link thay đổi password đã được gửi đến email của bạn!",
	"forgotPassword.fail": "Số điện thoại hoặc Email của bạn không chính xác",
	"forgotPassword.notFoundEmailSuggestion": "Không tìm thấy email với tên đăng nhập của bạn",
	"forgotPassword.yourEmailIs": "Email của bạn là",
	"menu.home": "Trang chủ",
	"menu.user": "Tài khoản",
	"menu.contract": "Hợp đồng",
	"menu.buyInsurance": "Mua bảo hiểm",
	"menu.contractManagement": "Quản lý hợp đồng",
	"menu.personalContracts": "Hợp đồng cá nhân",
	"menu.partnerContracts": "Hợp đồng đối tác",
	"menu.allContracts": "Tất cả hợp đồng",
	"menu.account": "Tài khoản",
	"menu.createAccount": "Tạo mới tài khoản",
	"menu.accountManagement": "Quản lý tài khoản",
	"menu.insuranceFeeManagement": "Quản lý Tỷ lệ phí",
	"menu.systemFee": "Phí của hệ thống",
	"menu.personalFee": "Phí của cá nhân",
	"menu.lxPartnerFee": "Phí của vãng lai",
	"menu.partnerFee": "Phí của đối tác",
	"menu.allFee": "Phí của tất cả",
	"menu.bonusManagement": "Quản lý điểm thưởng",
	"menu.systemBonus": "Điểm thưởng hệ thống",
	"menu.personalBonus": "Điểm thưởng cá nhân",
	"menu.partnerBonus": "Điểm thưởng đối tác",
	"menu.lxPartnerBonus": "Điểm thưởng vãng lai",
	"menu.allBonus": "Điểm thưởng tất cả",
	"menu.insuranceCertificate": "Giấy chứng nhân BH",
	"menu.insuranceCertificate.newImport": "Nhập mới",
	"menu.insuranceCertificate.newExport": "Xuất mới",
	"menu.insuranceCertificate.wrongImport": "Nhập sai hỏng",
	"menu.insuranceCertificate.wrongExport": "Xuất sai hỏng",
	"menu.debt": "Công nợ",
	"menu.createDebt": "Tạo mới công nợ",
	"menu.debtManagement": "Quản lý công nợ",
	"menu.permissionGoup": "Nhóm quyền",
	"menu.creatPermissionGoup": "Tạo mới nhóm quyền",
	"menu.permissionGoupManagement": "Quản lý nhóm quyền",
	"menu.insuranceMotobike": "Bảo hiểm xe máy",
	"menu.insuranceCar": "Bảo hiểm ô tô",
	"menu.approveOpenAccount": "Phê duyệt mở tài khoản",
	"menu.promotion": "Khuyến mại",
	"navbar.language.vi": "Tiếng Việt",
	"navbar.language.en": "Tiếng Anh",
	"navbar.logout": "Đăng xuất",
	"navbar.logout.confirmMessage": "Bạn có muốn đăng xuất tài khoản?",
	"footer.copyRight": "©2020 InOn - Đã đăng ký bản quyền",
	"footer.companySlogan": "Nhà cung cấp bảo hiểm hàng đầu Việt Nam",
	setting: setting$1,
	"setting.accountInformation": "Thông tin tài khoản",
	"setting.changePassword": "Thay đổi mật khẩu",
	"setting.change": "Thay đổi",
	"setting.partnerCode": "Mã đối tác",
	"setting.accountCode": "Mã tài khoản",
	"setting.referralCode": "Mã giới thiệu",
	"setting.personalSetting": "Cài đặt Cá nhân",
	"setting.generalInformation": "Thông tin chung",
	"setting.notification": "Thông báo",
	"setting.deviceManagement": "Quản lý thiết bị",
	"setting.language": "Ngôn ngữ",
	"setting.termAndCondition": "Điều khoản & Điều kiện",
	"setting.general": "Chung",
	"setting.privacyPolicy": "Chính sách bảo mật",
	"setting.frequentlyAsked": "Câu hỏi thường gặp",
	"setting.contact": "Liên hệ",
	"setting.feedback": "Góp ý, báo lỗi",
	"setting.share": "Chia sẻ",
	"setting.status.COMPLETE": "Tài khoản đã hoàn thiện thông tin",
	"setting.status.UNCOMPLE": "Tài khoản cần bổ sung thông tin",
	"setting.gender.M": "Name",
	"setting.gender.F": "Nữ",
	"setting.gender.O": "Khác",
	"setting.call": "Gọi điện",
	"setting.call.confirmMessage": "Bạn có muốn gọi đến số {phoneNumber}?",
	"setting.sendEmail": "Gửi mail",
	"setting.updateInfo.success": "Thay đổi thông tin thành công!",
	"setting.updateInfo.confirmMessage": "Bạn có muốn thay đổi thông tin tài khoản?",
	"setting.updateInfo.imageTypeInvalid": "File tải lên không hợp lệ!",
	"setting.updateInfo.imageExceedSize": "File tải lên vượt quá dung lượng cho phép ({size}MB)!",
	"changePassword.newPassword": "Mật khẩu mới",
	"changePassword.newPassword.required": "Bạn phải nhập mật khẩu mới",
	"changePassword.newPassword.invalid": "Mật khẩu mới không hợp lệ",
	"changePassword.oldPassword": "Mật khẩu cũ",
	"changePassword.oldPassword.required": "Bạn phải nhập mật khẩu cũ",
	"changePassword.oldPassword.invalid": "Mật khẩu cũ không hợp lệ",
	"changePassword.confirmPassword.required": "Bạn phải nhập lại mật khẩu mới",
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp",
	"changePassword.confirmMessage": "Bạn có muốn thay đổi mật khẩu?",
	"changePassword.success": "Thay đổi mật khẩu thành công!",
	"generalInfo.changeLanguage.confirmMessage": "Bạn có muốn thay đổi ngôn ngữ?",
	"generalInfo.changeLanguage.success": "Thay đổi ngôn ngữ thành công!",
	"generalInfo.policy.1": "1. CÁC LOẠI DỮ LIỆU CÁ NHÂN CHÚNG TÔI SẼ THU THẬP VÀ XỬ LÝ",
	"generalInfo.policy.1.1": "1.1  Thông tin cá nhân và thông tin liên lạc chi tiết, ví dụ chức vụ, họ tên, thông tin liên lạc chi tiết và lịch sử liên lạc chi tiết; thông tin tài liệu du lịch; ngày sinh, giới tính và/hoặc tuổi của bạn; quốc tịch, bản sao giấy tờ nhận dạng bạn (nếu có liên quan đến sản phẩm hoặc dịch vụ);",
	"generalInfo.policy.1.2": "1.2  Thông tin chi tiết về người thụ hưởng, ví dụ chủ hợp đồng bảo hiểm và người thụ hưởng của các sản phẩm hoặc dịch vụ của chúng tôi;",
	"generalInfo.policy.1.3": "1.3  Các thành viên trong gia đình (nếu có liên quan đến sản phẩm hoặc dịch vụ);",
	"generalInfo.policy.1.4": "1.4  Hồ sơ liên lạc của bạn với chúng tôi, chẳng hạn như lịch sử các cuộc gọi của bạn đến số điện thoại của trung tâm dịch vụ khách hàng của chúng tôi và, nếu bạn liên lạc với chúng tôi bằng các dịch vụ trực tuyến hoặc qua ứng dụng điện thoại thông minh của chúng tôi, các chi tiết như dữ liệu vị trí điện thoại di động, địa chỉ IP và địa chỉ MAC;",
	"generalInfo.policy.1.5": "1.5  Sản phẩm và dịch vụ, bạn đã mua từ chúng tôi, cũng như những sản phẩm bạn quan tâm và đã nắm giữ và các phương thức thanh toán liên quan được bạn sử dụng;",
	"generalInfo.policy.1.6": "1.6  Việc sử dụng các sản phẩm và dịch vụ của chúng tôi, các yêu cầu bồi thường bảo hiểm và tình trạng thanh toán các yêu cầu bồi thường này (và các chi tiết khác liên quan đến vấn đề này);",
	"generalInfo.policy.1.7": "1.7  Phân tích dữ liệu tiếp thị sản phẩm hoặc dịch vụ được thực hiện riêng cho bạn, bao gồm lịch sử liên lạc và thông tin về việc bạn có mở các tài liệu này hay nhấp vào đường link liên kết;",
	"generalInfo.policy.2": "2. CÁCH THỨC CHÚNG TÔI THU THẬP DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.2.1": "2.1  Trực tiếp từ bạn và bất kỳ thông tin nào từ các thành viên gia đình, cộng sự hoặc người thụ hưởng sản phẩm và dịch vụ;",
	"generalInfo.policy.2.2": "2.2  Thông tin về bạn được tạo ra khi bạn sử dụng các sản phẩm và dịch vụ của chúng tôi;",
	"generalInfo.policy.2.3": "2.3  Từ một nhà môi giới hoặc một bên trung gian khác (ví dụ: đại lý, nhà phân phối, đối tác kinh doanh), các bên mà chúng tôi có hợp tác để cung cấp sản phẩm hoặc dịch vụ hoặc cung cấp báo giá cho bạn;",
	"generalInfo.policy.2.4": "2.4  Các công ty đối tác liên kết với InOn, nếu bạn đã từng đăng ký mua hoặc đã mua sản phẩm từ các công ty này;",
	"generalInfo.policy.2.5": "2.5  Cookie, dịch vụ định vị, địa chỉ IP khi bạn truy cập trang mạng hoặc ứng dụng di động của chúng tôi hoặc khi bạn điền vào biểu mẫu Liên hệ với chúng tôi trong trang mạng hoặc ứng dụng của chúng tôi;",
	"generalInfo.policy.2.6": "2.6  Các bên thứ ba như công ty bảo hiểm, đại lý, nhà cung cấp, tổ chức tài chính, cá nhân y tế, tòa án hoặc hồ sơ thông tin đã được công bố công khai;",
	"generalInfo.policy.2.7": "2.7  Bảng câu hỏi và thông tin liên lạc chi tiết khi bạn tham gia khảo sát, hội nghị nhà đầu tư, các buổi hội thảo hoặc khi bạn cập nhật thông tin liên lạc của bạn với chúng tôi trên trang mạng của chúng tôi;",
	"generalInfo.policy.2.8": "2.8  Từ các nguồn khác như Cơ quan phòng chống gian lận, tổ chức tham chiếu tín dụng, người cho vay khác và các thông tin đã được công bố công khai (ví dụ: danh bạ điện thoại, phương tiện truyền thông xã hội, các trang mạng, các bài báo), các tổ chức thu hồi nợ, các tổ chức khác để hỗ trợ phòng ngừa và phát hiện tội phạm, cảnh sát và các cơ quan thực thi pháp luật;",
	"generalInfo.policy.2.9": "2.9  Chúng tôi mua thông tin về bạn hoặc khách hàng nói chung từ các bên thứ ba bao gồm thông tin nhân khẩu học, chi tiết các phương tiện đi lại, lịch sử yêu cầu bồi thường, thông tin về gian lận, danh sách quảng cáo tiếp thị, thông tin đã được công bố công khai và thông tin khác để giúp cải thiện sản phẩm và dịch vụ của chúng tôi.",
	"generalInfo.policy.3": "3. CHÍNH SÁCH COOKIE",
	"generalInfo.policy.3.1": "3.1   Trang mạng của chúng tôi sử dụng cookie để phân biệt bạn với những người dùng khác. Điều này giúp chúng tôi cung cấp cho bạn trải nghiệm tốt khi bạn sử dụng trang mạng và cũng cho phép chúng tôi cải thiện trang mạng của mình. Cookie là một tệp nhỏ gồm các chữ cái và số mà chúng tôi lưu trữ trên trình duyệt hoặc ổ cứng máy tính của bạn. Cookie chứa thông tin được lưu trữ trên ổ cứng máy tính của bạn. Bạn có khả năng chấp nhận hoặc từ chối cookie bằng cách sửa đổi cài đặt trong trình duyệt của bạn. Nếu bạn muốn làm điều này, xin vui lòng xem mục trợ giúp trong trình duyệt của bạn.",
	"generalInfo.policy.3.2": "3.2   Chúng tôi sử dụng các loại cookie sau:",
	"generalInfo.policy.3.2.1": "3.2.1    Cookie cần thiết cho trang mạng, đây là các cookie cần phải có để phục vụ hoạt động của trang  mạng của chúng tôi. Ví dụ, các cookie cho phép bạn đăng nhập vào trang mạng của chúng tôi một cách an toàn;",
	"generalInfo.policy.3.2.2": "3.2.2    Cookie phân tích/quản lý hoạt động: các cookie này cho phép chúng tôi nhận ra và đếm số lượng người dùng truy cập vào trang mạng của chúng tôi và theo dõi cách người dùng truy cập di huyển xung quanh trang mạng của chúng tôi khi họ đang sử dụng nó. Điều này giúp chúng tôi cải thiện cách thức hoạt động của trang mạng, ví dụ, cải tiến để giúp người dùng tìm kiếm những thứ họ cần một cách dễ dàng;",
	"generalInfo.policy.3.2.3": "3.2.3    Cookie chức năng: chúng được sử dụng để nhận ra bạn khi bạn quay lại trang mạng của chúng tôi. Điều này cho phép chúng tôi cá nhân hóa nội dung của chúng tôi cho bạn, chào bạn bằng tên và ghi nhớ sở thích của bạn (ví dụ: lựa chọn ngôn ngữ hoặc khu vực của bạn).",
	"generalInfo.policy.3.3": "3.3   Bằng cách tiếp tục sử dụng trang mạng của chúng tôi, bạn chấp nhận chúng tôi sử dụng các loại cookie như đã nêu ở trên.",
	"generalInfo.policy.4": "4. CÁCH THỨC VÀ LÝ DO CHÚNG TÔI SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.4.1": "4.1  Chúng tôi, <b>InOn</b> và các đối tác kinh doanh sẽ sử dụng dữ liệu cá nhân bạn cung cấp cho chúng tôi, cùng với các thông tin khác, cho các mục đích sau:",
	"generalInfo.policy.4.1.1": "<table class='table table-bordered info-item-table'><thead><tr><td>Mục đích</td><td>Cơ sở pháp lý</td></tr></thead><tbody><tr><td>Quản lý các sản phẩm và dịch vụ của chúng tôi, bao gồm cho phép chúng tôi thực hiện nghĩa vụ của chúng tôi với bạn và cung cấp mọi dịch vụ liên quan như đã thảo luận với bạn trước khi bạn mua sản phẩm hoặc dịch vụ.</td><td rowspan='2'>Cần thiết cho việc thực hiện hợp đồng của chúng tôi với bạn hoặc để thực hiện các bước trước khi ký hợp đồng với bạn.&nbsp;</td></tr><tr><td>Thực hiện kiểm tra bằng cách thông qua các tổ chức như tổ chức tín dụng, công ty hỗ trợ tìm kiếm hoặc thông tin đã được công bố công khai (xem thêm nội dung trình bày trong Phần “Kiểm tra tham khảo”).</td></tr><tr><td>Cung cấp dịch vụ khách hàng – như trả lời thắc mắc của bạn hoặc thông báo cho bạn biết các thay đổi.</td><td rowspan='3'>Cần thiết cho việc thực hiện hợp đồng của chúng tôi với bạn. Sau khi hợp đồng chúng tôi ký với bạn hoàn tất, đây là lợi ích hợp pháp của chúng tôi trong việc duy trì và phát triển mối quan hệ của chúng tôi với bạn.</td></tr><tr><td>Tự động ra quyết định hoặc tạo hồ sơ cá nhân của bạn (xem thêm nội dung trình bày trong Phần “Chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động hoặc tạo hồ sơ cá nhân của bạn”).</td></tr><tr><td>Lưu giữ thông tin của bạn và thực hiện các công việc quản lý nội bộ khác.</td></tr><tr><td>Tuân thủ với các yêu cầu pháp quy hoặc pháp lý khác.</td><td>Tuân thủ với các nghĩa vụ pháp lý của chúng tôi.</td></tr><tr><td>Thiết kế và cung cấp cho bạn các sản phẩm và dịch vụ bảo hiểm và tài chính liên quan.</td><td rowspan='2'>Lợi ích chính đáng của chúng tôi trong việc thiết kế và cải tiến sản phẩm, cung cấp dịch vụ giá trị gia tăng, phát triển kinh doanh và hiểu rõ hơn về cách sử dụng sản phẩm của chúng tôi.&nbsp;</td></tr><tr><td>Tiến hành nghiên cứu và phân tích thống kê (bao gồm cả việc sử dụng các công nghệ mới).</td></tr></tbody></table>",
	"generalInfo.policy.4.2": "4.2  Ngoài ra, chúng tôi, <b>InOn</b> và các đối tác kinh doanh của chúng tôi, sẽ sử dụng dữ liệu cá nhân bạn cung cấp cho chúng tôi, cùng với các thông tin khác, để gửi cho bạn các ưu đãi tiếp thị trực tiếp bằng phương tiện điện tử và phi điện tử bao gồm qua đường bưu điện, cũng như gửi cho bạn thông tin giới thiệu các sản phẩm và dịch vụ từ các bên thứ ba đã được chọn lọc kỹ lưỡng. Cơ sở pháp lý chúng tôi trình bày bên trên được xây dựng dựa trên sự đồng thuận với bạn.",
	"generalInfo.policy.4.3": "4.3  Chúng tôi chia sẽ dữ liệu cá nhân của bạn với ai và tại sao:",
	"generalInfo.policy.4.3.1": "4.3.1  Chúng tôi sẽ chia sẻ thông tin cá nhân và sức khỏe của bạn trong nội bộ <b>InOn</b> và với các đối tác kinh doanh tài chính/sức khỏe và các bên thứ ba cung cấp dịch vụ cho chúng tôi (bao gồm nhưng không giới hạn các công ty bảo hiểm, luật sư, ngân hàng, kế toán, tổ chức tài chính, bên ủy thác và các nhà cung cấp dịch vụ là bên thứ ba khác cung cấp dịch vụ quản lý, viễn thông, máy tính, thanh toán, in ấn, mua lại hoặc các dịch vụ khác để cho phép chúng tôi thực hiện hoạt động kinh doanh), các công ty thẩm định hóa đơn y tế, các công ty thẩm định yêu cầu bồi thường, hiệp hội và hiệp đoàn trong cùng ngành, các bên đồng sở hữu hợp đồng bảo hiểm hoặc khoản đầu tư, cố vấn chuyên nghiệp, nhà nghiên cứu, tổ chức tham chiếu tín dụng, tổ chức thu hồi nợ, tổ chức tài chính/y tế và các bên đối tác để thực hiện các mục đích được nêu trong Phần “Cách thức và lý do chúng tôi sử dụng dữ liệu cá nhân của ban”. Nếu bạn có chung hợp đồng bảo hiểm với người khác, thì người đó cũng có thể nhận được dữ liệu cá nhân của bạn. Nếu được yêu cầu, chúng tôi cũng có thể chuyển dữ liệu cá nhân của bạn cho các cơ quan phòng chống tội phạm tài chính, bất kỳ cơ quan lập pháp, tư pháp hoặc hành pháp nào khác.",
	"generalInfo.policy.4.3.2": "4.3.2  Chúng tôi có thể xử lý dữ liệu cá nhân của bạn ở một quốc gia khác ngoài quốc gia mà bạn cư trú. Trong phạm vi chúng tôi chuyển dữ liệu cá nhân của bạn, chúng tôi sẽ sử dụng các biện pháp bảo vệ phù hợp và tuân thủ luật pháp của quốc gia nơi dữ liệu cá nhân của bạn được chuyển đến. Khi bạn yêu cầu, chúng tôi sẽ cung cấp cho bạn chi tiết các biện pháp bảo vệ dữ liệu mà chúng tôi đang sử dụng.",
	"generalInfo.policy.4.4": "4.4  Chúng tôi lưu trữ dữ liệu cá nhân của bạn trong một khoảng thời gian nhất định",
	"generalInfo.policy.4.4.1": "4.4.1   Dữ liệu cá nhân của bạn sẽ được lưu trữ khi bạn (hoặc đồng sở hữu hợp đồng bảo hiểm với bạn) là khách hàng của chúng tôi và trong khoảng thời gian sáu năm sau khi kết thúc mối quan hệ khách hàng hoặc lâu hơn nếu pháp luật yêu cầu. Có thể có những trường hợp cụ thể khi chúng tôi cần lưu giữ dữ liệu cá nhân của bạn lâu hơn (chẳng hạn như khi có tranh chấp xảy ra).",
	"generalInfo.policy.5": "5. KIỂM TRA THAM KHẢO",
	"generalInfo.policy.5.1": "5.1  Đối với một số sản phẩm nhất định, chúng tôi có thể sử dụng các tổ chức tham chiếu tín dụng, công ty  hỗ trợ tìm kiếm, cơ quan phòng chống tội phạm tài chính hoặc thông tin có sẵn công khai để giúp chúng tôi kiểm tra danh tính của bạn, cũng như để tránh gian lận và rửa tiền; điều này có thể bao gồm kiểm tra các địa chỉ hiện tại hoặc trước đây của bạn. Những kết quả này có thể được ghi lại để tham khảo trong tương lai.",
	"generalInfo.policy.5.2": "5.1  Những kết quả kiểm tra này cũng có thể được sử dụng cho một nhà đầu tư, chủ sở hữu hợp đồng chung hoặc người mà bạn đồng ý cung cấp dữ liệu cá nhân của mình. Nếu chúng tôi mất liên lạc với bạn, chúng tôi có thể sử dụng các tổ chức này để xác minh địa chỉ của bạn nhằm giúp chúng tôi liên lạc với bạn.",
	"generalInfo.policy.5.3": "5.3  Mọi việc chuyển dữ liệu cá nhân của bạn sẽ luôn được thực hiện an toàn.",
	"generalInfo.policy.6": "6. CHÚNG TÔI CÓ THỂ SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN ĐỂ ĐƯA RA QUYẾT ĐỊNH TỰ ĐỘNG HOẶC TẠO HỒ SƠ CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.6.1": "6.1  Chúng tôi, <b>InOn</b>, Đối tác kinh doanh và Đối tác tiếp thị của chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động ảnh hưởng đến bạn hoặc tạo hồ sơ cá nhân khác cho bạn (ví dụ: hồ sơ tiếp thị).",
	"generalInfo.policy.7": "7. SỬ DỤNG DỮ LIỆU CÁ NHÂN NHẠY CẢM CỦA BẠN",
	"generalInfo.policy.7.1": "7.1  Đối với một số sản phẩm hoặc dịch vụ nhất định, chúng tôi sẽ cần xử lý dữ liệu cá nhân nhạy cảm của bạn, chẳng hạn như thông tin liên quan đến sức khỏe, di truyền, định danh sinh trắc học và khuynh hướng giới tính. Trong phạm vi chúng tôi cần sự đồng ý rõ ràng của bạn để xử lý loại dữ liệu cá nhân này theo cách được mô tả trong Phần “Cách thức và lý do chúng tôi sử dụng dữ liệu cá nhân của bạn” , “Kiểm tra tham khảo” và “Chúng tôi có thể sử dụng dữ liệu cá nhân của bạn để đưa ra quyết định tự động hoặc tạo hồ sơ cá nhân của bạn”, chúng tôi sẽ cung cấp chi tiết về điều này khi chúng tôi thu thập các thông tin này từ bạn và xin nhận được sự chấp thuận của bạn.",
	"generalInfo.policy.8": "8. QUYỀN KIỂM SOÁT DỮ LIỆU CÁ NHÂN CỦA BẠN",
	"generalInfo.policy.8.1": "8.1  Khi nói đến cách chúng tôi sử dụng dữ liệu cá nhân của bạn, bạn có quyền theo quy định của pháp luật Việt Nam.",
	"generalInfo.policy.8.2": "8.2  Trong khi đó, nếu bạn hiện đang cư trú tại Châu Âu, các quyền bổ sung theo Quy định bảo vệ dữ liệu chung (GDPR) có thể được áp dụng. Như vậy, bạn có thể:",
	"generalInfo.policy.8.2.1": "8.2.1  Yêu cầu một bản sao dữ liệu cá nhân của bạn miễn phí (chúng tôi có thể tính phí yêu cầu của bạn nếu không có cơ sở rõ ràng hoặc bị lạm dụng quá mức);",
	"generalInfo.policy.8.2.2": "8.2.2  Trong một số trường hợp nhất định, chúng tôi sẽ chuyển dữ liệu cá nhân của bạn sang một tổ chức khác theo yêu cầu của bạn;",
	"generalInfo.policy.8.2.3": "8.2.3  Yêu cầu chúng tôi điều chỉnh bất cứ dữ liệu cá nhân nào bị sai hoặc không đầy đủ;",
	"generalInfo.policy.8.2.4": "8.2.4  Yêu cầu chúng tôi xóa dữ liệu cá nhân của bạn nếu không còn cần thiết cho các mục đích được nêu trong Phần “Các loại dữ liệu cá nhân chúng tôi sẽ thu thập và xử lý” hoặc nếu không có cơ sở pháp lý nào khác để xử lý dữ liệu;",
	"generalInfo.policy.8.2.5": "8.2.5  Giới hạn cách chúng tôi sử dụng dữ liệu cá nhân của bạn hoặc rút lại sự đồng ý (bao gồm cả việc đồng ý cho phép đưa ra quyết định tự động dựa trên dữ liệu cá nhân) mà bạn đã chấp thuận cho phép chúng tôi xử lý dữ liệu cá nhân của bạn;",
	"generalInfo.policy.8.2.6": "8.2.6  Phản đối chúng tôi sử dụng dữ liệu cá nhân của bạn để tiếp thị trực tiếp (bao gồm cả việc tạo lập hồ sơ cá nhân của bạn) hoặc xử lý dữ liệu khác dựa trên lợi ích hợp pháp;",
	"generalInfo.policy.8.2.7": "8.2.7  Khiếu nại với cơ quan bảo vệ dữ liệu hoặc cơ quan quản lý độc lập khác về cách chúng tôi sử dụng dữ liệu cá nhân của bạn.",
	"generalInfo.policy.8.3": "8.3  Nếu bạn muốn thực hiện các quyền của mình hoặc muốn giải thích về các quyền này, bạn có thể liên lạc với chúng tôi trong phần Liên hệ.",
	"generalInfo.policy.8.4": "8.4  Nếu bạn cần nói chuyện với chúng tôi, chúng tôi sẽ chuyển yêu cầu của bạn cho Người Kiểm Soát Dữ Liệu (8.4.1)  cá nhân của bạn là InOn Chúng tôi có thể theo dõi hoặc ghi lại các cuộc gọi hoặc bất kỳ liên lạc nào khác mà chúng tôi có với bạn. Điều này có thể là để đào tạo, bảo mật hoặc để giúp chúng tôi kiểm tra chất lượng.",
	"generalInfo.policy.8.4.1": "8.4.1  Người Kiểm Soát Dữ Liệu – Cá nhân, pháp nhân, cơ quan nhà nước, các cơ quan hoặc tổ chức khác, riêng rẻ hoặc cùng nhau, xác định mục đích và cách thức xử lý dữ liệu cá nhân.",
	"generalInfo.policy.9": "9.  THAY MẶT NGƯỜI KHÁC CUNG CẤP DỮ LIỆU CÁ NHÂN CỦA HỌ",
	"generalInfo.policy.9.1": "9.1  Khi bạn cung cấp cho chúng tôi dữ liệu cá nhân về người khác (hoặc nhiều người khác), bạn nên được chỉ định và ủy quyền bởi người đó để hành động thay họ. Điều này bao gồm cung cấp sự đồng ý để:",
	"generalInfo.policy.9.1.1": "9.1.1  Chúng tôi xử lý dữ liệu cá nhân của họ và dữ liệu cá nhân nhạy cảm (như chúng tôi đã giải thích trong các Phần ở trên);",
	"generalInfo.policy.9.1.2": "9.1.1  Bạn sẽ nhận được các thông báo bảo vệ thông tin thay mặt họ.",
	"generalInfo.policy.9.2": "9.2  Nếu vì bất kỳ lý do nào bạn quan tâm đến việc liệu bạn có được phép cung cấp cho chúng tôi thông tin về người khác hay không, vui lòng liên hệ với chúng tôi theo địa chỉ thư điện tử bên dưới trước khi gửi cho chúng tôi bất cứ thông tin gì.",
	"generalInfo.policy.10": "10. TIẾP THỊ TRỰC TIẾP",
	"generalInfo.policy.10.1": "10.1  Chúng tôi, <b>InOn</b>, đối tác kinh doanh của chúng tôi, và đối tác tiếp thị vẫn sẽ gửi cho bạn thông tin qua hình thức các bài đăng về các sản phẩm và dịch vụ của InOn và các bên thứ ba được lựa chọn cẩn thận.",
	"generalInfo.policy.10.2": "10.2  Ngoài ra, theo thời gian, chung tôi <b>InOn</b> mong muốn gởi thông tin chi tiết về sản phẩm, dịch vụ và các ưu đãi đặc biệt cho bạn qua các phương tiện điện tử. Chúng tôi sẽ chỉ làm điều này nếu bạn đồng ý cho chúng tôi liên lạc với bạn bằng phương tiện điện tử.",
	"generalInfo.policy.10.3": "10.3  Và nếu bạn thay đổi ý định và/hoặc bạn muốn từ chối nhận tiếp thị trực tiếp phi điện tử, thì bạn cứ cho chúng tôi biết. Chỉ cần sử dụng một trong các tùy chọn trong mục Liên hệ với chúng tôi.",
	"generalInfo.policy.11": "11. LIÊN HỆ VỚI CHÚNG TÔI",
	"generalInfo.policy.11.1": "11.1  Nếu bạn muốn thực hiện các quyền của mình trong Phần “Quyền kiểm soát dữ liệu cá nhân của bạn” hoặc nếu bạn yêu cầu bất kỳ thông tin nào theo thông báo này, bạn có thể liên hệ với chúng tôi theo nhiều cách khác nhau.",
	"generalInfo.policy.11.1.1": "11.1.1  Gọi cho đường dây nóng của chúng tôi: <b>0582.33.55.88</b>",
	"generalInfo.policy.11.1.2": "11.1.2  Gửi thư điện tử cho chúng tôi theo địa chỉ: <b>lienhe@inon.vn</b>",
	"generalInfo.policy.11.1.3": "11.1.3  Hoặc liên hệ trực tiếp với chúng tôi tại văn phòng: <b>Tầng 6 – P611, Tòa nhà MD Complex, số 68 Nguyễn Cơ Thạch, Phường Cầu Diễn, Quận Nam Từ Liêm, Thành Phố Hà Nội.</b>",
	"generalInfo.terms.1": "1. CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG",
	"generalInfo.terms.1.1": "1.1  Trang thông tin điện tử này <b>(www.inon.vn) do Công Ty TNHH NPG NAM PHONG - Đơn vị chủ quản của Hệ thống và Thương hiệu InOn (sau đây gọi tắt là “InOn”)</b> hoàn toàn sở hữu và điều hành.",
	"generalInfo.terms.1.2": "1.2  Việc sử dụng trang thông tin điện tử này phụ thuộc vào các điều khoản và điều kiện cụ thể sau: (A) các điều khoản và điều kiện được nêu dưới đây và (B) mọi điều khoản và điều kiện bổ sung cụ thể tùy từng thời điểm để điều chỉnh việc sử dụng, và truy cập vào một số mục của trang thông tin điện tử này (và các điều khoản bổ sung đó sẽ có hiệu lực ràng buộc khi chúng được đăng tải trên trang thông tin điện tử này) <b>(\"Điều Khoản và Điều Kiện\")</b>.",
	"generalInfo.terms.1.3": "1.3  Khi sử dụng trang thông tin điện tử này, bạn đã đồng ý với các Điều Khoản và Điều Kiện, và sự đồng ý của bạn cùng với các Điều Khoản và Điều Kiện sẽ cấu thành một hợp đồng có giá trị ràng buộc về pháp lý giữa bạn và <b>InOn</b>. Vì thế, bạn vui lòng đọc kỹ các Điều Khoản và Điều Kiện của trang thông tin điện tử này.",
	"generalInfo.terms.2": "2. CÁC HẠN CHẾ VÀ SỬ DỤNG CÁC THÔNG TIN TÀI LIỆU",
	"generalInfo.terms.2.1": "2.1  Trừ khi được <b>InOn</b> đồng ý bằng văn bản một cách khác đi, bạn sẽ không sao chép, sao lại, tái bản, đưa lên mạng, công bố, chuyển, tạo liên kết đến hoặc phân phối dưới bất cứ hình thức nào các thông tin và/hoặc tài liệu đã được đăng tải trên trang thông tin điện tử này.",
	"generalInfo.terms.2.2": "2.2  Bạn có thể tải xuống các thông tin và/hoặc tài liệu được đăng tải trên trang thông tin điện tử này để bạn sử dụng, nhưng luôn luôn với điều kiện là bạn không dỡ bỏ các thông tin về bản quyền và/hoặc các quyền khác của <b>InOn</b> gắn với các thông tin và/hoặc tài liệu đó.",
	"generalInfo.terms.2.3": "2.3  Bạn không được phát tán, sửa đổi, chuyển đi, sử dụng lại, công bố, tạo liên kết hoặc sử dụng các nội dung của trang thông tin điện tử này, bao gồm, nhưng không giới hạn bởi, cả các thông tin bằng chữ, các hình ảnh, các tập tin âm thanh và/hoặc các đoạn phim, cho các mục đích kinh doanh và/hoặc công cộng, khi chưa có sự cho phép bằng văn bản của InOn.",
	"generalInfo.terms.3": "3. THỜI GIAN HOẠT ĐỘNG",
	"generalInfo.terms.3.1": "3.1 Trang thông tin điện tử này hoạt động 24 giờ mỗi ngày và 7 ngày mỗi tuần. Tuy nhiên, <b>InOn</b> bảo lưu quyền ngắt hệ thống để bảo trì khi cần thiết. <b>InOn</b> sẽ cố gắng để lên kế hoạch và thông báo về việc hệ thống không thể sử dụng được bằng cách đưa một thông báo trên mạng trực tuyến. <b>InOn</b> không chịu trách nhiệm đối với bất cứ thiệt hại và/hoặc mất mát nào do việc hệ thống bị ngắt trong trường hợp này.",
	"generalInfo.terms.4": "4. TÀI KHOẢN NGƯỜI SỬ DỤNG",
	"generalInfo.terms.4.1": "4.1  Bạn sẽ đăng ký và được cung cấp một Tên Truy Cập Tài Khoản và Mật khẩu để có thể mua bảo hiểm trên trang thông tin điện tử này. Bạn sẽ giữ bí mật Tên Truy Cập Tài Khoản và Mật khẩu này vào mọi thời điểm, và sẽ bảo đảm rằng Tên Truy Cập Tài Khoản và Mật khẩu này của bạn sẽ không bị tiết lộ theo bất cứ cách thức nào cho bất kỳ ai.",
	"generalInfo.terms.4.2": "4.2  <b>InOn</b> sẽ không chịu trách nhiệm về bất cứ giao dịch không được phép nào do việc Tên Truy Cập Tài Khoản và/hoặc Mật khẩu bị sử dụng sai và/hoặc sử dụng mà không được phép. Bạn phải lập tức thông báo cho <b>InOn</b> bất cứ trường hợp nào mà Tên Truy Cập Tài Khoản và/hoặc Mật khẩu của bạn bị sử dụng sai và/hoặc sử dụng mà không được phép. Bạn chịu trách nhiệm hoàn toàn về việc bảo mật Tên Truy Cập Tài Khoản và Mật khẩu và đối với bất cứ việc truy cập nào sử dụng Tên Truy Cập Tài Khoản và/hoặc Mật khẩu của bạn.",
	"generalInfo.terms.5": "5. BẢN QUYỀN VÀ NHÃN HIỆU",
	"generalInfo.terms.5.1": "5.1  Mọi nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này là tài sản của <b>InOn</b> và các đối tác khác (nếu có).",
	"generalInfo.terms.5.2": "5.2  Không có điều gì trên trang thông tin điện tử này có thể được hiểu là, dù là ngầm định hay cách khác, cho phép sử dụng hoặc bất cứ quyền sử dụng nào liên quan đến bất cứ nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này khi chưa có sự đồng ý bằng văn bản của <b>InOn</b> hoặc bên thứ ba sở hữu các nhãn hiệu hoặc tên thương mại đặt trên trang thông tin điện tử này.",
	"generalInfo.terms.5.3": "5.3  Bạn hoàn toàn không được sử dụng bất cứ nhãn hiệu hàng hóa, nhãn hiệu dịch vụ, tên thương mại, lô-gô, biểu tượng và tên miền đặt trên trang thông tin điện tử này hoặc bất cứ nội dung nào khác có trên trang thông tin điện tử này, trừ các trường hợp được quy định trong các Điều Khoản và Điều Kiện.",
	"generalInfo.terms.5.4": "5.4  Các hình ảnh đặt trên trang thông tin điện tử này là tài sản của <b>InOn</b> hoặc được <b>InOn</b> sử dụng theo sự đồng ý của chủ sở hữu.",
	"generalInfo.terms.5.5": "5.5  Trừ khi được cho phép cụ thể, bạn không được sử dụng bất cứ hình ảnh nào đặt trên trang thông tin điện tử này, bạn cũng không được ủy quyền cho bất cứ người nào sử dụng bất cứ hình ảnh nào đặt trên trang thông tin điện tử này. Bất cứ việc sử dụng không được phép nào đối với các hình ảnh này có thể vi phạm luật tác quyền, luật nhãn hiệu, luật về quyền riêng tư và luật xuất bản, và các quy định về thông tin khác.",
	"generalInfo.terms.6": "6. QUY ĐỊNH VỀ QUYỀN RIÊNG TƯ",
	"generalInfo.terms.6.1": "6.1   Xin đọc kỹ CHÍNH SÁCH VỀ QUYỀN RIÊNG TƯ TRÊN INTERNET của chúng tôi. Chính sách này giải thích rõ những thông tin nào <b>InOn</b> có thể thu thập từ bạn trên trang thông tin điện tử của chúng tôi và cách thức chúng tôi sẽ sử dụng và bảo vệ các thông tin của bạn. Chúng tôi sẽ không thu thập bất cứ thông tin xác định danh tính cá nhân nào trên trang thông tin điện tử của chúng tôi trừ khi bạn cung cấp các thông tin đó cho chúng tôi.",
	"generalInfo.terms.7": "7. LIÊN KẾT ĐẾN CÁC TRANG WEB KHÁC",
	"generalInfo.terms.7.1": "7.1  Trang thông tin điện tử này liên kết đến các trang thông tin điện tử khác không do <b>InOn</b> quản lý hoặc điều khiển. <b>InOn</b> sẽ không chịu trách nhiệm về nội dung của các trang thông tin điện tử đó.",
	"generalInfo.terms.7.2": "7.2  Việc liên kết đến bất cứ trang thông tin điện tử nào như thế không có nghĩa là <b>InOn</b> đã chấp thuận hoặc tán thành đối với các trang thông tin điện tử đó, hoặc với nội dung của các trang thông tin điện tử đó, hoặc các sản phẩm và dịch vụ trên các trang thông tin điện tử đó.",
	"generalInfo.terms.8": "8. AN NINH CỦA TRANG WEB",
	"generalInfo.terms.8.1": "8.1  Bạn sẽ không xâm phạm hoặc cố gắng xâm phạm an ninh của trang thông tin điện tử này, bao gồm, nhưng không giới hạn, các hành vi dưới đây:",
	"generalInfo.terms.8.1.1": "8.1.1  Truy cập thông tin hoặc nối vào một máy chủ hoặc tài khoản mà bạn không được phép truy cập.",
	"generalInfo.terms.8.1.2": "8.1.2  Cố gắng thăm dò, kiểm tra hoặc thử nghiệm điểm yếu của một hệ thống hoặc hệ thống mạng để vi phạm an ninh hoặc biện pháp nhận dạng mà không được <b>InOn</b> cho phép bằng văn bản.",
	"generalInfo.terms.8.1.3": "8.1.3  Cố gắng can thiệp vào dịch vụ cung cấp cho bất cứ người sử dụng nào, máy chủ hoặc hệ thống mạng nào, bằng cách phát tán vi rút hoặc mã độc lên trang thông tin điện tử, làm quá tải hoặc gây ra hiện tượng thư rác (spamming) trên trang thông tin điện tử;",
	"generalInfo.terms.8.1.4": "8.1.4  Thay đổi thông tin của phần tiêu đề (header) của bộ giao thức điều khiển truyền vận (TCP/IP) hoặc bất cứ phần thông tin nào của phần tiêu đề (header) trong bất cứ thư điện tử hay nhóm thông tin được đăng tải.",
	"generalInfo.terms.8.2": "8.2  Bạn không sử dụng trang thông tin điện tử này cho bất cứ mục đích bất hợp pháp nào.",
	"generalInfo.terms.8.3": "8.3  Bạn phải đảm bảo rằng tất cả các thông tin được đưa lên trang thông tin điện tử này là đầy đủ, chính xác, có thật, phù hợp và nhất quán với các tài liệu chứa đựng các thông tin này. Vi phạm điều này sẽ dẫn đến việc chậm trễ trong quy trình xử lý hoặc các thông tin điện tử được đưa lên bị loại bỏ. Bạn phải chịu trách nhiệm đối với toàn bộ chi phí phát sinh do việc đưa thông tin giả mạo hoặc sai.",
	"generalInfo.terms.8.4": "8.4  Bạn sẽ không tấn công hoặc cố gắng tấn công hoặc làm hại trang thông tin điện tử này bằng bất cứ hình thức hay phương tiện nào như các công cụ tấn công, vi-rút và chương trình máy tính có chứa các mã có thể gây hỏng máy tính. Bất cứ cố gắng nào để thực hiện các hành vi như vậy đều khiến bạn phải chịu sự truy tố theo quy định của pháp luật hiện hành.",
	"generalInfo.terms.9": "9. KHÔNG CHỊU TRÁCH NHIỆM",
	"generalInfo.terms.9.1": "9.1  Mặc dù <b>InOn</b> thực hiện mọi sự cẩn trọng khi cung cấp dịch vụ tại trang thông tin điện tử, <b>InOn</b> không cam kết rằng trang thông tin điện tử này sẽ hoạt động không có lỗi hoặc hoàn toàn không có vi-rút, worms, Trojan horses hoặc các mã độc hại khác.",
	"generalInfo.terms.9.2": "9.2  <b>InOn</b> không chấp nhận bất cứ trách nhiệm nào, và sẽ không chịu trách nhiệm về bất cứ thiệt hại nào xảy ra cho thiết bị máy tính hoặc các tài sản khác của bạn do việc bạn truy cập vào, sử dụng, hoặc xem lướt qua trang thông tin điện tử này hoặc việc bạn tải xuống bất cứ tài liệu, dữ liệu, các thông tin bằng chữ, các hình ảnh, các đoạn video, hoặc các tập tin âm thanh nào từ trang thông tin điện tử này hoặc phát sinh liên quan đến việc chậm thực hiện, lỗi, thiếu sót, bị gián đoạn, lỗi, vi-rút máy tính, chậm trễ trong hoạt động hoặc truyền dữ liệu, hoặc lỗi hệ thống hoặc đường truyền.",
	"generalInfo.terms.9.3": "9.3  <b>InOn</b> cũng từ chối mọi trách nhiệm đối với:",
	"generalInfo.terms.9.3.1": "9.3.1  Bất cứ tổn thất nào hoặc không có khả năng lấy lại các dữ liệu hoặc thông tin vì bất cứ lý do gì và bao gồm việc không chuyển được, việc sử dụng không đúng mục đích hoặc việc chuyển sai do kết quả của bất cứ sự gián đoạn, ngưng hoặc chấm dứt dịch vụ trên trang thông tin điện tử này; ",
	"generalInfo.terms.9.3.2": "9.3.2  Bất cứ sự sai sót của các thông tin hoặc nguồn tài nguyên có sẵn, nhận được hoặc được chuyển thông qua trang thông tin điện tử;",
	"generalInfo.terms.9.3.3": "9.3.3  Bất cứ trục trặc, khuyết điểm hoặc sai sót của trang thông tin điện tử này; ",
	"generalInfo.terms.9.3.4": "9.3.4  Bất cứ sự chậm trễ hoặc không có khả năng trong việc cung cấp dịch vụ của <b>InOn</b> tại trang thông tin điện tử này theo các Điều Khoản và Điệu Kiện do bất cứ khuyết điểm hoặc hỏng hóc về điện tử, cơ khí, hệ thống, xử lý dữ liệu hoặc viễn thông, thiên tai, xáo trộn dân sự hoặc bất cứ sự kiện nào nằm ngoài sự kiểm soát của <b>InOn</b>.",
	"generalInfo.terms.10": "10. MIỄN TRỪ TRÁCH NHIỆM",
	"generalInfo.terms.10.1": "10.1  Trong bất cứ trường hợp nào, <b>InOn</b> cũng không chịu trách nhiệm về bất cứ thiệt hại, tổn thất hoặc chi phí, bao gồm nhưng không giới hạn, thiệt hại trực tiếp, đặc biệt hoặc do hệ quả của, hoặc tổn thất kinh tế phát sinh từ hoặc có liên quan hoặc có thể quy cho:",
	"generalInfo.terms.10.1.1": "10.1.1  Bất cứ việc truy cập, sử dụng hoặc không thể truy cập hoặc sử dụng trang thông tin điện tử hoặc dịch vụ này, hoặc tin cậy vào những thông tin trên trang thông tin điện tử này.",
	"generalInfo.terms.10.1.2": "10.1.2  Bất cứ sự hỏng hóc, sai sót, bỏ sót, gián đoạn hoặc chậm trễ trong việc truyền dữ liệu;",
	"generalInfo.terms.10.1.3": "10.1.3  Bất cứ vi-rút máy tính hoặc hoặc các mã độc hại, hoặc các đoạn mã, chương trình hay một lệnh riêng lẻ bằng ngôn ngữ lập trình mà kết quả là một chuỗi lệnh bằng ngôn ngữ máy tính (macro) mang tính chất làm hỏng hoặc phá hủy khác có thể ảnh hưởng đến các thiết bị, chương trình máy tính hoặc các tài sản khác của bạn.",
	"generalInfo.terms.11": "11. BỒI THƯỜNG",
	"generalInfo.terms.11.1": "11.1 Bằng việc truy cập vào trang thông tin điện tử này, bạn đồng ý bồi thường cho <b>InOn</b>, giữ cho <b>InOn</b> khỏi mọi thiệt hại và bảo vệ <b>InOn</b> khỏi bất cứ khiếu nại, hành động hoặc đòi hỏi, bao gồm nhưng không giới hạn các chi phí pháp lý và kế toán hợp lý, được cho là hoặc là kết quả của việc bạn sử dụng trang thông tin điện tử này hoặc dịch vụ tại trang thông tin điện tử này, hoặc do việc bạn vi phạm các Điều Khoản và Điều Kiện.",
	"generalInfo.terms.12": "12. CHẤM DỨT",
	"generalInfo.terms.12.1": "12.1  <b>InOn</b> bảo lưu quyền, theo quyết định riêng của <b>InOn</b>, chấm dứt dịch vụ trên trang thông tin điện tử này vào bất cứ thời điểm nào, có hoặc không có lý do hoặc chấm dứt quyền truy cập vào trang thông tin điện tử này của bạn mà không cần báo trước và không cần lý do. Bằng việc truy cập vào trang thông tin điện tử này, bạn được coi là từ bỏ quyền được <b>InOn</b> thông báo về việc chấm dứt này, nếu có.",
	"generalInfo.terms.12.2": "12.2  <b>InOn</b> không chịu trách nhiệm về bất cứ thiệt hại, mất mát hoặc chí phí phát sinh theo bất cứ cách thức nào, từ hoặc do việc chấm dứt dịch vụ trên trang thông tin điện tử này.",
	"generalInfo.terms.13": "13. SỬA ĐỔI",
	"generalInfo.terms.13.1": "13.1  <b>InOn</b> có thể thay đổi và thay thế nội dung các Điều Khoản và Điều Kiện này và/hoặc quy định thêm các điều kiện và điều khoản mới vào bất cứ thời điểm nào mà không cần báo trước cho bạn. Bằng việc sử dụng trang thông tin điện tử này, bạn được coi là từ bỏ quyền được thông báo hoặc chấp thuận bất cứ sửa đổi, thay đổi hoặc bổ sung nào với các Điều Khoản và Điều Kiện, nếu có.",
	"generalInfo.terms.13.2": "13.2  Các thay đổi sẽ có hiệu lực vào ngày đầu tiên được đưa lên trang thông tin điện tử này. Nếu bạn tiếp tục sử dụng trang thông tin điện tử sau thời gian đó, bạn được xem là đã chấp nhận các thay đổi.",
	"generalInfo.terms.14": "14. LUẬT ĐIỀU CHỈNH VÀ CƠ QUAN XỬ LÝ TRANH CHẤP",
	"generalInfo.terms.14.1": "14.1  Sự thỏa thuận giữa bạn và <b>InOn</b> trong các Điều Khoản và Điều Kiện này được điều chỉnh và giải thích theo pháp luật Việt Nam.",
	"generalInfo.terms.14.2": "14.2  Trong trường hợp có tranh chấp giữa bạn và <b>InOn</b> phát sinh từ hoặc có liên quan đến sự thỏa thuận này (“Tranh Chấp”), mỗi Bên nỗ lực tối đa để thảo luận các vấn đề với mục đích giải quyết Tranh Chấp thông qua biện pháp hòa giải.",
	"generalInfo.terms.14.3": "14.3  Nếu Tranh Chấp không được giải quyết trong vòng ba mươi (30) ngày kể từ ngày Tranh Chấp phát sinh, Tranh Chấp đó sẽ được phân xử chung thẩm bởi Trung tâm Trọng tài Quốc tế Việt Nam (bên cạnh Phòng Thương Mại và Công Nghiệp Việt Nam) (“VIAC”) bởi một (01) trọng tài viên theo quy tắc tố tụng trọng tài của VIAC có hiệu lực tại thời điểm xảy ra Tranh Chấp và ngôn ngữ trọng tài được sử dụng là tiếng Việt.",
	"createPassword.title": "TẠO MẬT KHẨU *",
	"createPassword.password.required": "Bạn phải nhập mật khẩu",
	"createPassword.password.invalid": "Mật khẩu của bạn không hợp lệ",
	"createPassword.enterThePassword": "Nhập lại mật khẩu *",
	"createPassword.passwordMustMatch": "Mật khẩu phải trùng khớp",
	"createPassword.condition.1": "- Dài ít nhất 8 ký tự",
	"createPassword.condition.2": "- Bao gồm ký tự viết hoa và viết thường",
	"createPassword.condition.3": "- Bao gồm ký tự số và ký tự đặc biệt",
	"createPassword.continutes": "TIẾP TỤC",
	"createPassword.done": "HOÀN THÀNH",
	"createPassword.resetSuccessFul": "Thay đổi mật khẩu thành công!",
	"provideNewPassword.title": "CẤP MẬT KHẨU MỚI",
	"provideNewPassword.continutes": "THỰC HIỆN",
	"provideNewPassword.password": "Nhập mật khẩu mới *",
	"provideNewPassword.enterThePassword": "Nhập lại mật khẩu mới *",
	"createPassword.enterThePassword.required": "Bạn phải nhập mật khẩu mới",
	"completeInformation.idType": "Loại giấy tờ tùy thân *",
	"completeInformation.idType.required": "Bạn phải chọn loại giấy tờ tùy thân",
	"completeInformation.nbrPer": "Số giấy tờ tuỳ thân *",
	"completeInformation.nbrPer.required": "Bạn phải nhập số giấy tờ tuỳ thân",
	"completeInformation.nbrPer.invalid": "Số giấy tờ tùy thân không hợp lệ",
	"completeInformation.dateOfBirth": "Ngày sinh",
	"completeInformation.dateOfBirth.required": "Bạn phải nhập ngày sinh",
	"completeInformation.address": "Địa chỉ*",
	"completeInformation.address.required": "Bạn phải nhập địa chỉ",
	"completeInformation.gif": "Mã giới thiệu",
	"completeInformation.branch": "Chi nhánh*",
	"completeInformation.branch.required": "Bạn phải nhập chi nhánh",
	"completeInformation.accountNbr": "Số tài khoản*",
	"completeInformation.accountNbr.required": "Bạn phải nhập số tài khoản",
	"completeInformation.personalInfo": "Hộ chiếu*",
	"completeInformation.gender": "Giới tính",
	"completeInformation.province": "Tỉnh/Thành Phố*",
	"completeInformation.province.required": "Bạn phải chọn Tỉnh/Thành Phố",
	"completeInformation.district": "Quận/Huyện*",
	"completeInformation.district.required": "Bạn phải chọn Quận/Huyện",
	"completeInformation.ward": "Phường/Xã*",
	"completeInformation.ward.required": "Bạn phải chọn Phường/Xã",
	"completeInformation.bank": "Ngân hàng*",
	"completeInformation.bank.required": "Bạn phải chọn Ngân hàng",
	"completeInformation.back": "Quay lại",
	"completeInformation.done": "Hoàn thành"
};

const BaseFormGroup = ({
  fieldName,
  errors,
  touched,
  messageId,
  type,
  disabled,
  isRequired: _isRequired = true
}) => {
  const onBlur = (e, form) => {
    form.handleBlur(e);
    let {
      value
    } = e.target;
    value = value.trim();
    form.setFieldValue(fieldName, value);
  };

  return /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: messageId
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: fieldName
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    className: `form-control ${_isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) && 'is-invalid'}`
  }, field, {
    type: type,
    disabled: disabled,
    value: field.value,
    placeholder: msg,
    onBlur: e => onBlur(e, form)
  }))), _isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, getPropObject(errors, fieldName)) : null, /*#__PURE__*/React.createElement(Label, null, msg))));
};

const DatePicker = props => /*#__PURE__*/React.createElement(FormGroup, {
  className: "form-label-group position-relative"
}, /*#__PURE__*/React.createElement(Flatpickr, props), /*#__PURE__*/React.createElement(Label, null, props.placeholder), props.errors && props.touched && getPropObject(props.errors, props.fieldName) && getPropObject(props.touched, props.fieldName) ? /*#__PURE__*/React.createElement("div", {
  className: "text-danger"
}, getPropObject(props.errors, props.fieldName)) : null);

const BaseFormDatePicker = ({
  fieldName,
  errors,
  touched,
  messageId,
  value,
  options,
  intl,
  onChange,
  disabled,
  isRequired: _isRequired = true
}) => {
  const defaultOptions = {
    dateFormat: 'm/d/Y'
  };
  return /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Field, {
    name: fieldName
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(DatePicker, {
    className: `form-control position-relative ${!disabled ? 'bg-white' : ''} ${_isRequired && errors[fieldName] && touched[fieldName] && 'is-invalid'}`,
    placeholder: intl.formatMessage({
      id: messageId
    }),
    fieldName: fieldName,
    notRequired: !_isRequired,
    errors: errors,
    disabled: disabled,
    touched: touched,
    value: field.value,
    options: options || defaultOptions,
    onChange: date => {
      form.setFieldValue(fieldName, date[0]);

      if (onChange) {
        onChange(date);
      }
    }
  })));
};

var BaseFormDatePicker$1 = injectIntl(BaseFormDatePicker);

const Select = props => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e, actions) => {
    if (props.onChange) {
      props.onChange(e, actions);
    }

    if (props.isMulti) {
      setInputValue(e ? e.map(item => item.value).join() : '');
    } else {
      setInputValue(e ? e.value : '');
    }
  };

  const onFocus = e => {
    if (props.onFocus) {
      props.onFocus(e);
    }

    setIsFocused(true);
  };

  const onBlur = e => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setIsFocused(false);
  };

  const SelectComponent = useCallback(componentProps => {
    switch (props.type) {
      case 'creatable':
        return /*#__PURE__*/React.createElement(CreatableSelect, componentProps);

      case 'async':
        return /*#__PURE__*/React.createElement(AsyncSelect, componentProps);

      default:
        return /*#__PURE__*/React.createElement(ReactSelect, componentProps);
    }
  }, [props]);
  return /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(SelectComponent, Object.assign({}, props, {
    isDisabled: props.disabled,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    theme: theme => ({ ...theme,
      colors: { ...theme.colors,
        primary: '#338955'
      }
    })
  })), props.required ? getPropObject(props.errors, props.fieldName) && getPropObject(props.touched, props.fieldName) ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, getPropObject(props.errors, props.fieldName)) : null : '', /*#__PURE__*/React.createElement("input", {
    className: "d-none",
    placeholder: props.placeholder,
    value: inputValue
  }), inputValue ? /*#__PURE__*/React.createElement(Label, {
    className: classnames({
      'text-primary': isFocused
    })
  }, props.placeholder) : '');
};

const BaseFormGroupSelect = ({
  fieldName,
  errors,
  touched,
  messageId,
  options,
  defaultValue,
  isRequired: _isRequired = true,
  isAsync,
  disabled,
  onChange,
  loadOptions,
  type,
  defaultOptions
}) => {
  const intl = useIntl();
  return /*#__PURE__*/React.createElement(Field, {
    name: fieldName
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Select, {
    placeholder: intl.formatMessage({
      id: messageId
    }),
    className: `${_isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) && 'is-invalid'}`,
    type: type,
    classNamePrefix: "Select",
    fieldName: fieldName,
    required: _isRequired,
    value: options.find(item => item.value === field.value),
    defaultValue: defaultValue,
    disabled: disabled,
    errors: errors,
    isAsync: isAsync,
    loadOptions: loadOptions,
    defaultOptions: defaultOptions,
    touched: touched,
    options: options,
    onChange: e => {
      form.setFieldValue(fieldName, e.value);

      if (onChange) {
        onChange(e);
      }
    }
  }));
};

class DataColetionService {
  static async getCitiesByCountry(countryId, locale) {
    const res = await HttpClient.get(API_GET_CITIES_BY_COUNTRY, {
      params: {
        countryId
      },
      isBackgroundRequest: true
    });

    if (res.status === 200) {
      return mapDataToSelectOptions(res.data, locale);
    }

    return [];
  }

  static async getDistrictByCity(cityId, locale) {
    const res = await HttpClient.get(API_GET_DISTRICTS_BY_CITY, {
      params: {
        cityId
      },
      isBackgroundRequest: true
    });

    if (res.status === 200) {
      return mapDataToSelectOptions(res.data, locale);
    }

    return [];
  }

  static async getWardsByDistrict(districtId, locale) {
    const res = await HttpClient.get(API_GET_WARDS_BY_CITY, {
      params: {
        districtId
      },
      isBackgroundRequest: true
    });

    if (res.status === 200) {
      return mapDataToSelectOptions(res.data, locale);
    }

    return [];
  }

  static async getAllBanks(locale) {
    const res = await HttpClient.get(API_GET_BANKS, {
      isBackgroundRequest: true
    });

    if (res.status === 200) {
      return mapDataToSelectOptions(res.data, locale);
    }

    return [];
  }

}
const mapDataToSelectOptions = (data, lang) => {
  return data.map(item => ({
    value: item.id + '',
    id: item.id,
    label: item[lang === 'vi' ? 'vn' : 'en'] || item.vn
  }));
};

const useCityList = countryCode => {
  const [cities, setCities] = useState([]);
  const {
    locale
  } = useIntl();
  useEffect(() => {
    if (!countryCode) {
      return;
    }

    loadCitiesByCountry(countryCode);
  }, [countryCode]);

  const loadCitiesByCountry = async code => {
    const data = await DataColetionService.getCitiesByCountry(code, locale);
    setCities(data);
    return data;
  };

  return {
    cities,
    loadCitiesByCountry
  };
};
const useDistrictList = cityCode => {
  const [districts, setDistricts] = useState([]);
  const {
    locale
  } = useIntl();
  useEffect(() => {
    if (!cityCode) {
      return;
    }

    loadDitrictsByCity(cityCode);
  }, [cityCode]);

  const loadDitrictsByCity = async code => {
    const data = await DataColetionService.getDistrictByCity(code, locale);
    setDistricts(data);
    return data;
  };

  return {
    districts,
    loadDitrictsByCity
  };
};
const useWardList = districtCode => {
  const [wards, setWards] = useState([]);
  const {
    locale
  } = useIntl();
  useEffect(() => {
    if (!districtCode) {
      return;
    }

    loadWardsByDistrict(districtCode);
  }, [districtCode]);

  const loadWardsByDistrict = async code => {
    const data = await DataColetionService.getWardsByDistrict(code, locale);
    setWards(data);
    return data;
  };

  return {
    wards,
    loadWardsByDistrict
  };
};
const useBankList = () => {
  const [banks, setBanks] = useState([]);
  const {
    locale
  } = useIntl();
  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    setBanks(await DataColetionService.getAllBanks(locale));
  };

  return {
    banks,
    loadBanks
  };
};

const validationSchema = object().shape({
  fullName: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname.required"
  })).matches(NAME_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname.invalid"
  })),
  icType: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })),
  icNumber: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })).when('icType', {
    is: 'CMND',
    then: string().matches(PERSONAL_ID_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }).when('icType', {
    is: 'CCCD',
    then: string().matches(CITIZEN_INDENTIFY_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }).when('icType', {
    is: 'HC',
    then: string().matches(PASSPORT_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }),
  dateOfBirth: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  email: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.invalid"
  })),
  userDetails: object().shape({
    address: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.address.required"
    })),
    city: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.province.required"
    })),
    ward: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.ward.required"
    })),
    district: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.district.required"
    }))
  })
});

const UserAccountTab = () => {
  let {
    userDetails = {},
    userSettings = {},
    ...user
  } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const {
    cities
  } = useCityList(VN_COUNTRY_CODE);
  const {
    districts,
    loadDitrictsByCity
  } = useDistrictList(null);
  const {
    wards,
    loadWardsByDistrict
  } = useWardList(null);
  const {
    banks
  } = useBankList();
  const [avatar, setAvatar] = useState({
    url: userSettings.avatar,
    file: null
  });
  useEffect(() => {
    if (userDetails && userDetails.city) {
      loadDitrictsByCity(userDetails.city);
      loadWardsByDistrict(userDetails.district);
    }
  }, []);

  const onChangeAvatar = e => {
    const validTypeExtension = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'HEIF', 'HEVC', 'heic'];
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const fileType = file.type.split('/').pop().toLowerCase();

    if (validTypeExtension.indexOf(fileType) < 0) {
      toastError( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.updateInfo.imageTypeInvalid"
      }));
      return;
    }

    if (bytesToMb(file.size) >= MAX_FILE_SIZE) {
      toastError( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.updateInfo.imageExceedSize",
        values: {
          size: MAX_FILE_SIZE
        }
      }));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setAvatar({
        url: reader.result,
        file
      });
    };
  };

  const onSubmit = async values => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.accountInformation"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.updateInfo.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(updateUserInfo(trimObjectValues(values), avatar.file));
      }
    }));
  };

  const onClickBackHome = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  const onChangeCity = async (id, setFieldValue) => {
    loadDitrictsByCity(id);
    setFieldValue('userDetails.district', '');
  };

  const onChangeDistrict = async (id, setFieldValue) => {
    loadWardsByDistrict(id);
    setFieldValue('userDetails.ward', '');
  };

  return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Media, {
    className: "mb-2"
  }, /*#__PURE__*/React.createElement(Media, {
    className: "mr-2 my-25"
  }, /*#__PURE__*/React.createElement(Media, {
    className: "users-avatar-shadow rounded",
    object: true,
    src: avatar.url,
    alt: "user profile image",
    height: "84",
    width: "84"
  })), /*#__PURE__*/React.createElement(Media, {
    className: "mt-2",
    body: true
  }, /*#__PURE__*/React.createElement(Media, {
    className: "font-medium-1 text-bold-600",
    style: {
      textTransform: 'uppercase'
    },
    tag: "p",
    heading: true
  }, user.fullName), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountCode"
  }), " : ", user.userCode), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-wrap"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    tag: "label",
    className: "mr-1 mt-2",
    color: "primary",
    outline: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "file",
    name: "file",
    id: "uploadImg",
    onChange: onChangeAvatar,
    hidden: true,
    accept: "image/*"
  }), /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.change"
  })))))), /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Formik, {
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    initialValues: { ...user,
      userDetails,
      userSettings
    }
  }, ({
    errors,
    touched,
    values,
    setFieldValue
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    disabled: true,
    messageId: "register.fullname",
    fieldName: "fullName",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "3"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.idType",
    fieldName: "icType",
    disabled: true,
    options: IC_TYPES_OPTIONS,
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "3"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.nbrPer",
    fieldName: "icNumber",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "6"
  }, /*#__PURE__*/React.createElement(BaseFormDatePicker$1, {
    disabled: true,
    messageId: "completeInformation.dateOfBirth",
    fieldName: "dateOfBirth",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.gender",
    fieldName: "gender",
    disabled: true,
    options: GENDER_OPTIONS,
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    disabled: true,
    messageId: "register.phoneNumber",
    fieldName: "phoneNumber",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    md: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "register.email",
    fieldName: "email",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.address",
    fieldName: "userDetails.address",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.province",
    fieldName: "userDetails.city",
    options: cities,
    onChange: ({
      id
    }) => onChangeCity(id, setFieldValue),
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.district",
    fieldName: "userDetails.district",
    options: districts,
    onChange: ({
      id
    }) => onChangeDistrict(id, setFieldValue),
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.ward",
    fieldName: "userDetails.ward",
    options: wards,
    errors: errors,
    touched: touched
  }))), values.userType === USER_TYPE.KD ? /*#__PURE__*/React.createElement(Row, {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.bank",
    fieldName: "userDetails.bankName",
    options: banks,
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.branch",
    fieldName: "userDetails.bankBranch",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.accountNbr",
    fieldName: "userDetails.bankAccount",
    errors: errors,
    touched: touched
  }))) : '', /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end  mt-2",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })), /*#__PURE__*/React.createElement(Button.Ripple, {
    className: "ml-2",
    type: "submit",
    color: "primary"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.saveChanges`
  })))))), /*#__PURE__*/React.createElement(Row, null)));
};

const formSchema = object().shape({
  oldPassword: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "changePassword.oldPassword.required"
  })).matches(PASSWORD_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "changePassword.oldPassword.invalid"
  })),
  newPassword: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "changePassword.newPassword.required"
  })).matches(PASSWORD_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "changePassword.newPassword.invalid"
  })),
  passwordConfirmation: string().oneOf([ref('newPassword'), null], /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  })).required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "changePassword.confirmPassword.required"
  }))
});

const ChangePassword = () => {
  const dispatch = useDispatch();

  const onClickSubmit = values => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.changePassword"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "changePassword.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(changePassword(values));
      }
    }));
  };

  const onClickBackHome = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    },
    onSubmit: onClickSubmit,
    validationSchema: formSchema
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form, {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    type: "password",
    messageId: "changePassword.oldPassword",
    fieldName: "oldPassword",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    type: "password",
    messageId: "changePassword.newPassword",
    fieldName: "newPassword",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    type: "password",
    messageId: "createPassword.enterThePassword",
    fieldName: "passwordConfirmation",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.3"
  })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end  mt-2",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    className: "ml-2",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "common.saveChanges"
  }))))));
};

const AccountSettings = props => {
  const [activeTab, setActiveTab] = useState('account-info');
  const history = useHistory();
  useEffect(() => setActiveTab(props.activeTab), [props.activeTab]);
  return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-uppercase"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: 'setting.personalSetting'
  }))), /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement(Nav, {
    tabs: true
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'account-info'
    }),
    onClick: () => {
      history.push('/account-info');
    }
  }, /*#__PURE__*/React.createElement(User, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'change-password'
    }),
    onClick: () => {
      history.push('/change-password');
    }
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React.createElement(TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React.createElement(TabPane, {
    tabId: "account-info"
  }, /*#__PURE__*/React.createElement(UserAccountTab, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "change-password"
  }, /*#__PURE__*/React.createElement(Col, {
    md: "6",
    sm: "11",
    className: "mx-auto"
  }, /*#__PURE__*/React.createElement(ChangePassword, null))))))));
};

const TERMS = [{
  id: '1',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }]
}, {
  id: '2',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }]
}, {
  id: '3',
  items: [{
    id: '1'
  }]
}, {
  id: '4',
  items: [{
    id: '1'
  }, {
    id: '2'
  }]
}, {
  id: '5',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }, {
    id: '4'
  }, {
    id: '5'
  }]
}, {
  id: '6',
  items: [{
    id: '1'
  }]
}, {
  id: '7',
  items: [{
    id: '1'
  }, {
    id: '2'
  }]
}, {
  id: '8',
  items: [{
    id: '1',
    items: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }, {
      id: '4'
    }]
  }, {
    id: '2'
  }, {
    id: '3'
  }, {
    id: '4'
  }]
}, {
  id: '9',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3',
    items: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }, {
      id: '4'
    }]
  }]
}, {
  id: '10',
  items: [{
    id: '1',
    items: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }]
  }]
}, {
  id: '11',
  items: [{
    id: '1'
  }]
}, {
  id: '12',
  items: [{
    id: '1'
  }, {
    id: '2'
  }]
}, {
  id: '13',
  items: [{
    id: '1'
  }, {
    id: '2'
  }]
}, {
  id: '14',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }]
}];

const InfoItems = ({
  data,
  type
}) => {
  const intl = useIntl();
  const [state, setState] = useState({
    collapseID: '',
    status: 'Closed'
  });

  const toggleCollapse = collapseID => {
    collapseID = state.collapseID !== collapseID ? collapseID : '';
    setState({ ...state,
      collapseID
    });
  };

  const onEntered = id => {
    if (id === state.collapseID) setState({ ...state,
      status: 'Opened'
    });
  };

  const onEntering = id => {
    if (id === state.collapseID) setState({ ...state,
      status: 'Opening...'
    });
  };

  const onExited = id => {
    if (id === state.collapseID) setState({ ...state,
      status: 'Closed'
    });
  };

  const onExiting = id => {
    if (id === state.collapseID) setState({ ...state,
      status: 'Closing...'
    });
  };

  return data.map(item1 => /*#__PURE__*/React.createElement("div", {
    className: "collapse-margin",
    key: item1.id
  }, /*#__PURE__*/React.createElement(Card, {
    onClick: () => toggleCollapse(item1.id),
    className: classnames({
      'collapse-collapsed': state.status === 'Closed' && state.collapseID === item1.id,
      'collapse-shown': state.status === 'Opened' && state.collapseID === item1.id,
      closing: state.status === 'Closing...' && state.collapseID === item1.id,
      opening: state.status === 'Opening...' && state.collapseID === item1.id
    })
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "p-1"
  }, /*#__PURE__*/React.createElement(CardTitle, {
    className: "lead collapse-title collapsed col-11 p-0\""
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `generalInfo.${type}.${item1.id}`
  })), /*#__PURE__*/React.createElement(ChevronDown, {
    size: 15,
    className: "collapse-icon"
  })), /*#__PURE__*/React.createElement(Collapse, {
    isOpen: item1.id === state.collapseID,
    onEntering: () => onEntering(item1.id),
    onEntered: () => onEntered(item1.id),
    onExiting: () => onExiting(item1.id),
    onExited: () => onExited(item1.id)
  }, /*#__PURE__*/React.createElement(CardBody, null, item1.items.map(item2 => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "ml-1",
    key: item2.id,
    dangerouslySetInnerHTML: {
      __html: intl.formatMessage({
        id: `generalInfo.${type}.${item1.id}.${item2.id}`
      })
    }
  }), item2.items ? item2.items.map(item3 => /*#__PURE__*/React.createElement("p", {
    className: "ml-2",
    key: item3.id,
    dangerouslySetInnerHTML: {
      __html: intl.formatMessage({
        id: `generalInfo.${type}.${item1.id}.${item2.id}.${item3.id}`
      })
    }
  })) : '')))))));
};

const Terms = () => {
  const dispatch = useDispatch();

  const onClickBackHome = () => {
    dispatch(showConfirmAlert({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("div", {
    className: "vx-collapse"
  }, /*#__PURE__*/React.createElement(InfoItems, {
    data: TERMS,
    type: "terms"
  })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })))))));
};

class Radio extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(`vx-radio-con ${this.props.className} vx-radio-${this.props.color}`)
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      defaultChecked: this.props.defaultChecked,
      value: this.props.value,
      disabled: this.props.disabled,
      name: this.props.name,
      onClick: this.props.onClick,
      onChange: this.props.onChange,
      ref: this.props.ref,
      checked: this.props.checked
    }), /*#__PURE__*/React.createElement("span", {
      className: classnames("vx-radio", {
        "vx-radio-sm": this.props.size === "sm",
        "vx-radio-lg": this.props.size === "lg"
      })
    }, /*#__PURE__*/React.createElement("span", {
      className: "vx-radio--border"
    }), /*#__PURE__*/React.createElement("span", {
      className: "vx-radio--circle"
    })), /*#__PURE__*/React.createElement("span", null, this.props.label));
  }

}

const LanguageTab = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [lang, setLang] = useState(localStorage.getItem('language'));

  const onClickBackHome = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  const onClickSaveChange = context => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.language"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "generalInfo.changeLanguage.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(changeLanguageSetting(lang, () => context.switchLanguage(lang)));
      }
    }));
  };

  return /*#__PURE__*/React.createElement(Context.Consumer, null, context => /*#__PURE__*/React.createElement(Row, {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement(Col, {
    className: "mx-auto col-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Radio, {
    label: intl.formatMessage({
      id: 'navbar.language.vi'
    }),
    color: "primary",
    onChange: () => setLang('vi'),
    defaultChecked: context.state.locale === 'vi',
    name: "lang"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/React.createElement(Radio, {
    label: intl.formatMessage({
      id: 'navbar.language.en'
    }),
    color: "primary",
    onChange: () => setLang('en'),
    defaultChecked: context.state.locale === 'en',
    name: "lang"
  }))), /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end mt-3",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })), /*#__PURE__*/React.createElement(Button.Ripple, {
    className: "ml-2",
    onClick: () => onClickSaveChange(context),
    color: "primary"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.saveChanges`
  })))));
};

const POLICIES = [{
  id: '1',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }, {
    id: '4'
  }, {
    id: '5'
  }, {
    id: '6'
  }, {
    id: '7'
  }]
}, {
  id: '2',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }, {
    id: '4'
  }, {
    id: '5'
  }, {
    id: '6'
  }, {
    id: '7'
  }, {
    id: '8'
  }, {
    id: '9'
  }]
}, {
  id: '3',
  items: [{
    id: '1'
  }, {
    id: '2',
    items: [{
      id: '1'
    }, {
      id: '2'
    }]
  }, {
    id: '3'
  }, {
    id: '4'
  }]
}, {
  id: '4',
  items: [{
    id: '1',
    items: [{
      id: '1'
    }]
  }, {
    id: '2'
  }, {
    id: '3',
    items: [{
      id: '1'
    }, {
      id: '2'
    }]
  }, {
    id: '4',
    items: [{
      id: '1'
    }]
  }]
}, {
  id: '5',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }]
}, {
  id: '6',
  items: [{
    id: '1'
  }]
}, {
  id: '7',
  items: [{
    id: '1'
  }]
}, {
  id: '8',
  items: [{
    id: '1'
  }, {
    id: '2',
    items: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }, {
      id: '4'
    }, {
      id: '5'
    }, {
      id: '6'
    }, {
      id: '7'
    }]
  }, {
    id: '3'
  }, {
    id: '4'
  }]
}, {
  id: '9',
  items: [{
    id: '1',
    items: [{
      id: '1'
    }, {
      id: '2'
    }]
  }, {
    id: '2'
  }]
}, {
  id: '10',
  items: [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }]
}, {
  id: '11',
  items: [{
    id: '1',
    items: [{
      id: '1'
    }, {
      id: '2'
    }, {
      id: '3'
    }]
  }]
}];

const Policies = () => {
  const dispatch = useDispatch();

  const onClickBackHome = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement("div", {
    className: "vx-collapse"
  }, /*#__PURE__*/React.createElement(InfoItems, {
    data: POLICIES,
    type: "policy"
  })), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })))))));
};

function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile
  };
}

const ContactTab = () => {
  const {
    isMobile
  } = useDeviceDetect();
  const dispatch = useDispatch();

  const onClickBackHome = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: () => {
        dispatch(goBackHomePage());
      }
    }));
  };

  const onClickCall = () => {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.call"
      }),
      isShow: true,
      content: /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "setting.call.confirmMessage",
        values: {
          phoneNumber: CONTACT_PHONE
        }
      }),
      onConfirm: () => {
        window.open(`tel:0899300800`, '_blank');
      }
    }));
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Col, {
    lg: "4",
    md: "6",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, {
    className: "w-300px mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box-content"
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:lienhe@inon.vn",
    target: "_blank"
  }, "lienhe@inon.vn")), /*#__PURE__*/React.createElement("div", {
    className: "card-btns d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    className: "gradient-light-primary text-white"
  }, /*#__PURE__*/React.createElement("a", {
    className: "text-white",
    href: "mailto:lienhe@inon.vn",
    target: "_blank"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `setting.sendEmail`
  }))))))), /*#__PURE__*/React.createElement(Col, {
    lg: "4",
    md: "6",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, {
    className: "w-300px mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box-content"
  }, /*#__PURE__*/React.createElement("h5", null, CONTACT_PHONE)), /*#__PURE__*/React.createElement("div", {
    className: "card-btns d-flex justify-content-center mt-2"
  }, isMobile ? /*#__PURE__*/React.createElement(Button.Ripple, {
    className: "gradient-light-primary text-white",
    onClick: onClickCall
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `setting.call`
  })) : ''))))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: `common.home`
  })))));
};

const GeneralInfo = props => {
  const [activeTab, setActiveTab] = useState('terms-and-condition');
  const history = useHistory();
  useEffect(() => setActiveTab(props.activeTab), [props.activeTab]);
  return /*#__PURE__*/React.createElement(Row, {
    className: "general-info"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, {
    className: "text-uppercase"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: 'setting.generalInformation'
  }))), /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement(Nav, {
    tabs: true
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'terms-and-condition'
    }),
    onClick: () => {
      history.push('/terms-and-condition');
    }
  }, /*#__PURE__*/React.createElement(FileText, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.termAndCondition"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'privacy-policy'
    }),
    onClick: () => {
      history.push('/privacy-policy');
    }
  }, /*#__PURE__*/React.createElement(Shield, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.privacyPolicy"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'language'
    }),
    onClick: () => {
      history.push('/language');
    }
  }, /*#__PURE__*/React.createElement(Globe, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.language"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'contact'
    }),
    onClick: () => {
      history.push('/contact');
    }
  }, /*#__PURE__*/React.createElement(MessageSquare, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.contact"
  }))))), /*#__PURE__*/React.createElement(TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React.createElement(TabPane, {
    tabId: "terms-and-condition"
  }, /*#__PURE__*/React.createElement(Terms, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "privacy-policy"
  }, /*#__PURE__*/React.createElement(Policies, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "language"
  }, /*#__PURE__*/React.createElement(LanguageTab, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "contact"
  }, /*#__PURE__*/React.createElement(ContactTab, null)))))));
};

class CheckBox extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: `vx-checkbox-con ${this.props.className ? this.props.className : ''} vx-checkbox-${this.props.color}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.defaultChecked,
      checked: this.props.checked,
      value: this.props.value,
      disabled: this.props.disabled,
      onClick: this.props.onClick ? this.props.onClick : null,
      onChange: this.props.onChange ? this.props.onChange : null
    }), /*#__PURE__*/React.createElement("span", {
      className: `vx-checkbox vx-checkbox-${this.props.size ? this.props.size : 'md'}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "vx-checkbox--check"
    }, this.props.icon)), /*#__PURE__*/React.createElement("span", null, this.props.label));
  }

}

const formSchema$1 = object().shape({
  username: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.username.required"
  })),
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.password.required"
  })).matches(PASSWORD_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.invalid"
  }))
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState(null);
  const [isRemeberMe, setIsRemeberMe] = useState(false);
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.auth.loginStatus);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(REMEMBER_ME_TOKEN));

    if (user) {
      setRememberMe(user);
    }
  }, []);

  const onSubmit = (values, actions) => {
    dispatch(loginAction({
      username: trimValue(values.username),
      password: values.password,
      isRemeberMe
    }));
    actions.setSubmitting(false);
  };

  const onClickNotMe = () => {
    localStorage.removeItem(REMEMBER_ME_TOKEN);
    setRememberMe(null);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    enableReinitialize: true,
    initialValues: {
      username: rememberMe ? rememberMe.username : '',
      password: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$1
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement("h4", {
    className: "text-center text-white mb-3"
  }, rememberMe ? /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.sayHi",
    values: {
      name: rememberMe.name
    }
  }) : /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.firstWelcome"
  }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.fail"
  })) : ''), rememberMe ? '' : /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "login.username",
    fieldName: "username",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.password"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastField, {
    name: "password"
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    type: "password",
    className: `form-control ${errors.password && touched.password && 'is-invalid'}`,
    placeholder: msg
  }, field, {
    onChange: e => form.setFieldValue('password', e.target.value)
  }))), errors.password && touched.password ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.password) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "d-flex justify-content-between align-items-center"
  }, rememberMe ? /*#__PURE__*/React.createElement("a", {
    onClick: onClickNotMe
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.notMe"
  })) : /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    label: /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "login.rememberMe"
    }),
    onChange: e => setIsRemeberMe(e.target.checked),
    defaultChecked: isRemeberMe
  }), /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      height: '30px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "float-right"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/forgot-password",
    className: "text-white"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login"
  })))));
};

const formSchema$2 = object().shape({
  fullName: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname.required"
  })).matches(NAME_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname.invalid"
  })),
  email: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.invalid"
  })),
  phoneNumber: string().matches(PHONE_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber.invalid"
  })).required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber.required"
  })),
  refCode: string().length(10, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.refCode.invalid"
  })).matches(PHONE_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.refCode.invalid"
  }))
});

const Register = () => {
  const [isAppcepted, setIsAppcepted] = useState(false);
  const [isNotApccepted, setIsNotAccepted] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();

  const onSubmit = async values => {
    if (!isAppcepted) {
      setIsNotAccepted(true);
      return;
    }

    dispatch(register(values));
  };

  const ontoggleAccepted = checked => {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      refCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$2
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "fullName",
    errors: errors,
    touched: touched,
    messageId: "register.fullname"
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "email",
    errors: errors,
    touched: touched,
    messageId: "register.email"
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "phoneNumber",
    errors: errors,
    touched: touched,
    messageId: "register.phoneNumber"
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "refCode",
    errors: errors,
    touched: touched,
    messageId: "register.refCode"
  }), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    onChange: e => ontoggleAccepted(e.target.checked),
    defaultChecked: isAppcepted
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.agreeWith"
  }), ' ', /*#__PURE__*/React.createElement("a", {
    className: "text-primary"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.policyAndCondition"
  })), ' ', /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.useService"
  }))), isNotApccepted ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.mustAppcepted"
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register"
  }))))));
};

const formSchema$3 = object().shape({
  username: string().matches(PHONE_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.username.invalid"
  })).required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.username.required"
  })),
  email: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.email.required"
  })).email( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.invalid"
  }))
});

const ForgotPassword = () => {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    dispatch(forgotPassword(values));
  };

  const onClickSuggestion = async username => {
    const res = await AuthService.getSuggestionEmail(username);

    if (res.status === 200) {
      setEmailSuggestion(res.data);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$3
  }, ({
    errors,
    touched,
    values
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement("h4", {
    className: "text-center text-white"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword"
  })), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative mt-3"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.username"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "username",
    className: `form-control ${errors.username && touched.username && 'is-invalid'}`,
    placeholder: msg
  }), errors.username && touched.username ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.username) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.email"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastField, {
    name: "email"
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    className: `${errors.email && touched.email && 'is-invalid not-show-icon'}`,
    placeholder: msg
  }, field, {
    onChange: e => form.setFieldValue('email', e.target.value)
  }))), errors.email && touched.email ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.email) : null, values.username ? /*#__PURE__*/React.createElement("div", {
    className: "form-control-position text-primary cursor-pointer",
    onClick: () => onClickSuggestion(values.username)
  }, /*#__PURE__*/React.createElement(Sun, {
    size: 15
  })) : '', /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.verify"
  }))))), /*#__PURE__*/React.createElement(Modal, {
    isOpen: isModalOpen,
    toggle: toggleModal,
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React.createElement(ModalBody, {
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/React.createElement("div", null, !emailSuggestion ? /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.notFoundEmailSuggestion"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.yourEmailIs"
  }), ":", ' ', /*#__PURE__*/React.createElement("b", null, emailSuggestion))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-end"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    color: "primary",
    onClick: toggleModal
  }, "OK"), ' ')))));
};

const formSchema$4 = object().shape({
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.required"
  })).matches(PASSWORD_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.invalid"
  })),
  passwordConfirmation: string().oneOf([ref('password'), null], /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  })).required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.required"
  }))
});

const CreatePassword = ({
  isLanding2
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    isLanding2 ? setRegisterToken() : setResetPassword();
  }, []);

  const onClickContinue = values => {
    if (isLanding2) {
      dispatch(createPassword(values.password));
    } else {
      dispatch(resetPassword(values.password));
    }
  };

  const setRegisterToken = () => {
    const code = new URLSearchParams(document.location.search).get('registerToken');

    if (code) {
      dispatch(saveRegisterToken(code));
      history.push(history.location.pathname);
    }
  };

  const setResetPassword = () => {
    const code = new URLSearchParams(document.location.search).get('resetToken');

    if (code) {
      dispatch(saveResetPasswordToken(code));
      history.push(history.location.pathname);
    }
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: onClickContinue,
    validationSchema: formSchema$4
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: isLanding2 ? 'font-weight-bold' : 'font-weight-bold text-white'
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.title"
  }))), /*#__PURE__*/React.createElement(BaseFormGroup, {
    type: "password",
    messageId: "login.password",
    fieldName: "password",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    type: "password",
    messageId: "createPassword.enterThePassword",
    fieldName: "passwordConfirmation",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: isLanding2 ? 'createPassword.continutes' : 'createPassword.done'
  })))));
};

const LandingHeader = ({
  isLanding2
}) => {
  return /*#__PURE__*/React.createElement(Context.Consumer, null, context => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Link, {
      to: "/"
    }, /*#__PURE__*/React.createElement("img", {
      src: isLanding2 ? IMAGE.LOGO : IMAGE.LOGO_WHITE,
      alt: "logo"
    })), /*#__PURE__*/React.createElement("div", {
      className: "languages d-flex align-items-center ",
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('vi'),
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'vi'
      })
    }, "VIE"), /*#__PURE__*/React.createElement("div", {
      className: "divider mr-1",
      style: {
        height: '15px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('en'),
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  });
};

const LandingFooter = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "ld-footer pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-none d-lg-flex justify-content-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block d-lg-none text-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  })))));
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};
const devices = {
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`
};

let _ = t => t,
    _t;
const PagetStyle = styled.div(_t || (_t = _`
  height: 100%;
  .landing-page {
    background-image: url('${0}');

    @media ${0} {
      background-image: url('${0}');
    }
  }
`), IMAGE.LANDING_PAGE_BG, devices.laptop, IMAGE.LANDING_PAGE_TABLET_BG);

const LandingPage = props => {
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();
  useEffect(() => {
    setActiveTab(props.activeTab || 'login');
  }, [props.activeTab]);

  const TabView = () => {
    switch (activeTab) {
      case 'login':
        return /*#__PURE__*/React.createElement(Login, null);

      case 'register':
        return /*#__PURE__*/React.createElement(Register, null);

      case 'forgot-password':
        return /*#__PURE__*/React.createElement(ForgotPassword, null);

      case 'reset-password':
      case 'provide-new-password':
        return /*#__PURE__*/React.createElement(CreatePassword, null);

      default:
        return '';
    }
  };

  const goToLink = link => history.push(link);

  return /*#__PURE__*/React.createElement(PagetStyle, null, /*#__PURE__*/React.createElement("div", {
    className: "landing-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "position-absolute w-100"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ld-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-1 mb-md-3 mb-xl-5"
  }, /*#__PURE__*/React.createElement(LandingHeader, null)), /*#__PURE__*/React.createElement("div", {
    className: "lg-content-header d-flex cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => goToLink('/login'),
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'login'
    })
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => goToLink('/register'),
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'register'
    })
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lg-content p-2 p-md-4 p-lg-5"
  }, /*#__PURE__*/React.createElement(TabView, null))), /*#__PURE__*/React.createElement(LandingFooter, null)));
};

const CompleteInforValidate = object().shape({
  icNumber: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.idType.required"
  })).when('icType', {
    is: 'CMND',
    then: string().matches(PERSONAL_ID_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }).when('icType', {
    is: 'CCCD',
    then: string().matches(CITIZEN_INDENTIFY_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }).when('icType', {
    is: 'HC',
    then: string().matches(PASSPORT_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "completeInformation.nbrPer.invalid"
    }))
  }),
  dateOfBirth: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  address: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.address.required"
  })),
  bankName: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.bank.required"
  })),
  bankBranch: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.branch.required"
  })),
  bankNumber: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.accountNbr.required"
  })),
  city: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.province.required"
  })),
  ward: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.ward.required"
  })),
  district: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.district.required"
  })),
  refCode: string().matches(PHONE_REGEX, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.refCode.invalid"
  }))
});

const CompleteInformation = () => {
  const user = useSelector(state => state.auth.register.user);
  const {
    cities
  } = useCityList(VN_COUNTRY_CODE);
  const {
    districts,
    loadDitrictsByCity
  } = useDistrictList(cities[0] ? cities[0].id : null);
  const {
    wards,
    loadWardsByDistrict
  } = useWardList(districts[0] ? districts[0].id : null);
  const {
    banks
  } = useBankList();
  const dispatch = useDispatch();

  const onSubmit = values => {
    dispatch(compeleteInfo(trimObjectValues(values)));
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "completeInfor"
  }, /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      icType: 'CMND',
      icNumber: '',
      dateOfBirth: '',
      gender: 'MALE',
      city: '',
      district: '',
      ward: '',
      address: '',
      refCode: '',
      bankName: '',
      bankBranch: '',
      bankNumber: ''
    },
    validationSchema: CompleteInforValidate,
    onSubmit: onSubmit
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    lg: "3",
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Row, {
    className: "ml-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, user.fullName)), /*#__PURE__*/React.createElement(Row, {
    className: "ml-2  mt-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, user.phoneNumber)), /*#__PURE__*/React.createElement(Row, {
    className: "ml-2  mt-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, "Email*")), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, user.email))), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    lg: "9"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.idType",
    fieldName: "icType",
    options: IC_TYPES_OPTIONS,
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.nbrPer",
    fieldName: "icNumber",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(BaseFormDatePicker$1, {
    messageId: "completeInformation.dateOfBirth",
    fieldName: "dateOfBirth",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.gender",
    fieldName: "gender",
    defaultValue: GENDER_OPTIONS[0],
    options: GENDER_OPTIONS,
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.province",
    fieldName: "city",
    options: cities,
    onChange: ({
      id
    }) => loadDitrictsByCity(id),
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.district",
    fieldName: "district",
    options: districts,
    onChange: ({
      id
    }) => loadWardsByDistrict(id),
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.ward",
    fieldName: "ward",
    options: wards,
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "8"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.address",
    fieldName: "address",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.gif",
    fieldName: "refCode",
    isRequired: false
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroupSelect, {
    messageId: "completeInformation.bank",
    fieldName: "bankName",
    options: banks,
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.branch",
    fieldName: "bankBranch",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.accountNbr",
    fieldName: "bankNumber",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center justify-content-md-end"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/create-password"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.back"
  }))), /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "submit",
    className: "ml-2"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.done"
  }))))))));
};

const LandingPage2 = props => {
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();
  useEffect(() => {
    setActiveTab(props.activeTab || 'create-password');
  }, [props.activeTab]);

  const TabView = () => {
    switch (activeTab) {
      case 'create-password':
        return /*#__PURE__*/React.createElement("div", {
          className: "col-12 col-md-10 cpl-lg-8 mx-auto"
        }, /*#__PURE__*/React.createElement(CreatePassword, {
          isLanding2: true
        }));

      case 'complete-information':
        return /*#__PURE__*/React.createElement(CompleteInformation, {
          isLanding2: true
        });

      default:
        return '';
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "landing-page",
    style: {
      backgroundImage: `url('${IMAGE.LANDING_PAGE_2_BG}')`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-10 mx-auto mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-main2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-header d-flex justify-content-between  mb-5"
  }, /*#__PURE__*/React.createElement(LandingHeader, {
    isLanding2: true
  })), /*#__PURE__*/React.createElement("div", {
    className: classnames('lg-content p-2 p-md-4 p-lg-5 col-12 mx-auto', {
      'col-lg-6 col-md-8': activeTab !== 'complete-information'
    })
  }, /*#__PURE__*/React.createElement(TabView, null)))), /*#__PURE__*/React.createElement(LandingFooter, null)));
};

const ConfirmAlert = () => {
  const {
    title,
    isShow,
    content,
    onConfirm,
    onCancel,
    confirmBtnText,
    cancelBtnText,
    ...otherConfigs
  } = useSelector(state => state.ui.confirmAlert);
  const dispatch = useDispatch();
  const intl = useIntl();

  const onClickConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    dispatch(hideConfirmAlert());
  };

  const onClickCancel = () => {
    if (onCancel) {
      onCancel();
    }

    dispatch(hideConfirmAlert());
  };

  return /*#__PURE__*/React.createElement(SweetAlert, Object.assign({
    title: title,
    show: isShow,
    showCancel: true,
    reverseButtons: true,
    btnSize: "md",
    cancelBtnBsStyle: "secondary",
    confirmBtnText: confirmBtnText || intl.formatMessage({
      id: 'common.ok'
    }),
    cancelBtnText: cancelBtnText || intl.formatMessage({
      id: 'common.cancel'
    }),
    onConfirm: onClickConfirm,
    onCancel: onClickCancel
  }, otherConfigs), content);
};

const AppRouter = props => {
  const {
    checkLoginStatus,
    appId,
    user,
    loginStatus,
    isAuthentication,
    authToken,
    children,
    loadNavtigation,
    loadUserRoles,
    setAppId,
    history,
    message
  } = props;
  useEffect(() => {
    setAppId(appId);
    const urlParams = new URLSearchParams(document.location.search);
    const code = urlParams.get('code') || authToken;
    const redirectUrl = urlParams.get('redirectUrl');

    if (code && loginStatus !== LOGIN_STATUS.SUCCESS) {
      checkLoginStatus(code, redirectUrl);
    }

    if (authToken) {
      loadNavtigation(appId);
      loadUserRoles();
    }
  }, [authToken]);

  const setMessages = (message = {}) => {
    const newMessage = {};
    Object.keys(message).forEach(key => {
      newMessage[appId + '.' + key] = message[key];
    });
    return newMessage;
  };

  const appMessage = {
    en: { ...messages_en,
      ...setMessages(message.en)
    },
    vi: { ...messages_vi,
      ...setMessages(message.vi)
    }
  };
  const settingRoutes = [{
    path: 'account-info',
    component: AccountSettings
  }, {
    path: 'change-password',
    component: AccountSettings
  }, {
    path: 'terms-and-condition',
    component: GeneralInfo
  }, {
    path: 'privacy-policy',
    component: GeneralInfo
  }, {
    path: 'language',
    component: GeneralInfo
  }, {
    path: 'contact',
    component: GeneralInfo
  }];
  const landingPageRoutes = [{
    path: 'login'
  }, {
    path: 'register'
  }, {
    path: 'forgot-password'
  }, {
    path: 'provide-new-password'
  }, {
    path: 'reset-password'
  }];
  const landingPage2Routes = [{
    path: 'create-password'
  }, {
    path: 'complete-information'
  }];
  return /*#__PURE__*/React.createElement(IntlProviderWrapper, {
    locale: user && user.userSettings ? user.userSettings.language.toLowerCase() : localStorage.getItem('language'),
    appMessage: appMessage
  }, /*#__PURE__*/React.createElement(Router, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    render: props => isAuthentication ? /*#__PURE__*/React.createElement(Layout$1, { ...props,
      appId
    }, /*#__PURE__*/React.createElement(Switch, null, settingRoutes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(item.component, {
        activeTab: item.path
      })
    })), /*#__PURE__*/React.createElement(Route, {
      path: "/",
      render: () => children
    }))) : /*#__PURE__*/React.createElement(Switch, null, landingPageRoutes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(LandingPage, {
        activeTab: item.path
      })
    })), landingPage2Routes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(LandingPage2, {
        activeTab: item.path
      })
    })), appId === AppId.ELITE_APP ? /*#__PURE__*/React.createElement(Route, {
      path: "/",
      render: () => children
    }) : /*#__PURE__*/React.createElement(Redirect, {
      from: "/",
      to: "/login"
    }), /*#__PURE__*/React.createElement(Redirect, {
      from: "/",
      to: "/"
    }))
  }))), /*#__PURE__*/React.createElement(ToastContainer, {
    hideProgressBar: true,
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true
  }), /*#__PURE__*/React.createElement(ConfirmAlert, null));
};

const mapStateToProps$3 = state => {
  return {
    isAuthentication: !!state.auth.authToken,
    authToken: state.auth.authToken,
    loginStatus: state.auth.loginStatus,
    user: state.auth.user
  };
};

var AppRouter$1 = connect(mapStateToProps$3, {
  checkLoginStatus,
  loadNavtigation,
  loadUserRoles,
  loginAction,
  setAppId
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

const LoadingSpinner = () => {
  const {
    isLoading
  } = useSelector(state => state.ui);
  return isLoading ? /*#__PURE__*/React.createElement(TopBarProgress, null) : null;
};

const RippleButton = ({
  rippleColor,
  during,
  block,
  ...rest
}) => /*#__PURE__*/React.createElement(Ripples, {
  color: rippleColor ? rippleColor : "rgba(255, 255, 255, .5)",
  during: during,
  className: `${block ? "d-block" : ""}`
}, /*#__PURE__*/React.createElement(Button, rest));

RippleButton.propTypes = { ...Button.propTypes,
  rippleColor: PropTypes.string,
  during: PropTypes.number
};
Button.Ripple = RippleButton;

const isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

const App = ({
  children,
  appId,
  appReducer,
  message,
  apiBaseUrl,
  history
}) => {
  const middlewares = [thunk, createDebounce()];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer(appReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);
  setBaseHistory(history);
  setUpHttpClient(store, apiBaseUrl);
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React.createElement(LoadingSpinner, null), /*#__PURE__*/React.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    history: history,
    children: children
  })));
};

unregister();

class FallbackSpinner extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "fallback-spinner"
    }, /*#__PURE__*/React.createElement("img", {
      className: "fallback-logo",
      src: IMAGE.LOGO,
      alt: "logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-3 effects"
    })));
  }

}

const SHOW_CONFIRM_ALERT$1 = 'SHOW_CONFIRM_ALERT';
const HIDE_CONFIRM_ALERT$1 = 'HIDE_CONFIRM_ALERT';
const showConfirmAlert$2 = configs => {
  return dispatch => dispatch({
    type: SHOW_CONFIRM_ALERT$1,
    payload: configs
  });
};
const hideConfirmAlert$1 = () => {
  return dispatch => dispatch({
    type: HIDE_CONFIRM_ALERT$1
  });
};

const usePageAuthorities = () => {
  const [authorities, setAuthorities] = useState([]);
  const {
    userRoles,
    roles
  } = useSelector(state => state.navbar);
  const history = useHistory();
  useEffect(() => {
    const roleList = roles.filter(item => history.location.pathname.includes(item.menuPath));

    if (!roleList.length) {
      return;
    }

    roleList.sort((a, b) => a.id - b.id);
    const lastRole = roleList[roleList.length - 1];
    const userRoleList = userRoles.filter(item => item.roleId === lastRole.id);
    const authList = userRoleList.map(item => item.authority);
    setAuthorities(authList);
  }, [userRoles, history.location.pathname]);
  return authorities;
};

export { AppId, Autocomplete as AutoComplete, App as BaseApp, appConfigs as BaseAppConfigs, index as BaseAppUltils, BaseFormDatePicker$1 as BaseFormDatePicker, BaseFormGroup, BaseFormGroupSelect, CheckBox as Checkbox, DatePicker, FallbackSpinner, HttpClient, Radio, Select, goBackHomePage$1 as goBackHomePage, hideConfirmAlert$1 as hideConfirmAlert, showConfirmAlert$2 as showConfirmAlert, useBankList, useCityList, useDeviceDetect, useDistrictList, usePageAuthorities, useWardList, useWindowDimensions };
//# sourceMappingURL=index.modern.js.map
