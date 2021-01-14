function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var redux = require('redux');
var createDebounce = _interopDefault(require('redux-debounced'));
var thunk = _interopDefault(require('redux-thunk'));
var react = require('redux-persist/integration/react');
var reduxPersist = require('redux-persist');
var Axios = _interopDefault(require('axios'));
var axiosExtensions = require('axios-extensions');
var Icon = require('react-feather');
var reactToastify = require('react-toastify');
var reactIntl = require('react-intl');
var history$1 = require('history');
var sessionStorage = _interopDefault(require('redux-persist/es/storage/session'));
var reactRouterDom = require('react-router-dom');
var classnames = _interopDefault(require('classnames'));
var reactstrap = require('reactstrap');
var PerfectScrollbar = _interopDefault(require('react-perfect-scrollbar'));
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));
var ScrollToTop = _interopDefault(require('react-scroll-up'));
var Hammer = _interopDefault(require('react-hammerjs'));
var Yup = require('yup');
var formik = require('formik');
var Flatpickr = _interopDefault(require('react-flatpickr'));
var ReactSelect = _interopDefault(require('react-select'));
var AsyncSelect = _interopDefault(require('react-select/async'));
var CreatableSelect = _interopDefault(require('react-select/creatable'));
var styled = _interopDefault(require('styled-components'));
var SweetAlert = _interopDefault(require('react-bootstrap-sweetalert'));
var TopBarProgress = _interopDefault(require('react-topbar-progress-indicator'));
var Ripples = _interopDefault(require('react-ripples'));
require('react-perfect-scrollbar/dist/css/styles.css');
require('react-toastify/dist/ReactToastify.css');
require('prismjs/themes/prism-tomorrow.css');

var generateUUID = function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
var trimValue = function trimValue(value) {
  return value ? value.trim() : '';
};
var bytesToMb = function bytesToMb(bytes) {
  return Math.round(bytes / Math.pow(1024, 2), 2);
};
var trimObjectValues = function trimObjectValues(object, excludeKeys) {
  if (excludeKeys === void 0) {
    excludeKeys = [];
  }

  if (!object) {
    return;
  }

  Object.keys(object).forEach(function (key) {
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
var toastError = function toastError(message) {
  reactToastify.toast.error( /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-1 p-0"
  }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
    size: 24
  })), /*#__PURE__*/React__default.createElement("p", {
    className: "mx-1 my-0"
  }, message)));
};
var toastSuccess = function toastSuccess(message) {
  reactToastify.toast.success( /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-1 p-0"
  }, /*#__PURE__*/React__default.createElement(Icon.Check, {
    size: 24
  })), /*#__PURE__*/React__default.createElement("p", {
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

var AppId = {
  APP_NO1: 'APP_NO1',
  INSURANCE_APP: 'INSURANCE_APP',
  SUPPLEMENT_APP: 'SUPPLEMENT_APP',
  ELITE_APP: 'ELITE_APP'
};

var API_BASE_URL = 'https://apisit.inon.vn';
var API_LOGIN_URL = '/api/authenticate';
var API_LOGOUT_URL = '/api/authenticate';
var API_CHANGE_PASSWORD = '/api/change-password';
var API_REGISTER = '/nth/onboarding/api/authenticate/register';
var API_GET_USER = '/nth/user/api/users';
var API_USER_SETTINGS = '/nth/user/api/user-settings';
var API_UPDATE_USER_INFO = '/nth/user/api/update-user-info';
var API_GET_NAV_CONFIGS = '/nth/accesscontrol/api/roles';
var API_GET_USER_ROLES = '/nth/accesscontrol/api/user-group-roles';
var API_CREATE_PASSWORD = '/nth/onboarding/api/authenticate/create-new-password';
var API_GET_USER_BY_REGISTER_TOKEN = '/nth/onboarding/api/authenticate/get-partner';
var API_COMPLETE_INFO = '/nth/onboarding/api/authenticate/complete-info';
var API_FORGOT_PASSWORD = '/api/authenticate/forgot-password';
var API_RESET_PASSWORD = '/api/authenticate/reset-password';
var API_EMAIL_SUGGESTION = '/nth/user/api/authenticate/email-suggestion';
var API_R_200 = 200;
var API_GET_CITIES_BY_COUNTRY = '/nth/datacollection/api/citiesbycountry';
var API_GET_DISTRICTS_BY_CITY = '/nth/datacollection/api/districtsbycity';
var API_GET_WARDS_BY_CITY = '/nth/datacollection/api/wardsbydistrict';
var API_GET_BANKS = '/nth/datacollection/api/allBanks';
var API_UPLOAD_FILE = '/nth/file/api/upload';
var API_GET_FILE = '/nth/file/api/file';
var MAX_MOBILE_WIDTH = 768;
var MAX_TABLET_WIDTH = 1024;
var REMEMBER_ME_TOKEN = 'rememberMe';
var VN_COUNTRY_CODE = 192;
var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*])).{8,}$/gm;
var PHONE_REGEX = /\b(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
var PERSONAL_ID_REGEX = /^(\d{9}|\d{12})$/;
var CITIZEN_INDENTIFY_REGEX = /^(\d{12})$/;
var PASSPORT_REGEX = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
var NAME_REGEX = /^([ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếềìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý0-9A-Za-z_ ])+$/g;
var AUTHORITIES = {
  VIEW: 'view',
  EDIT: 'edit',
  APPROVE: 'approve',
  CREATE: 'create'
};
var API_TIME_OUT = 70000;
var MAX_FILE_SIZE = 5;
var CONTACT_PHONE = '0899.300.800';
var SESSION_TIMEOUT = 15;
var LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
var USER_TYPE = {
  KD: 'KD',
  HTKD: 'HTKD'
};
var GENDER_OPTIONS = [{
  value: 'MALE',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.gender.male"
  })
}, {
  value: 'FEMALE',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.gender.female"
  })
}, {
  value: 'OTHER',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.gender.other"
  })
}];
var IC_TYPES_OPTIONS = [{
  value: 'HC',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.icType.passport"
  })
}, {
  value: 'CMND',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.icType.personalID"
  })
}, {
  value: 'CCCD',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.icType.citizenIdentify"
  })
}];
var getExternalAppUrl = function getExternalAppUrl(appId, url) {
  switch (appId) {
    case AppId.APP_NO1:
      return window.location.origin + "/" + url + "?redirectUrl=" + url;

    case AppId.INSURANCE_APP:
      return window.location.origin + "/insurance" + url + "?redirectUrl=" + url;

    case AppId.SUPPLEMENT_APP:
      return window.location.origin + "/supplement" + url + "?redirectUrl=" + url;

    case AppId.ELITE_APP:
      return window.location.origin + "/elite" + url + "?redirectUrl=" + url;
  }
};
var getContextPath = function getContextPath(appId) {
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
var getPropObject = function getPropObject(obj, prop) {
  if (!obj) {
    return null;
  }

  return prop.split('.').reduce(function (r, e) {
    return r ? r[e] : null;
  }, obj);
};
var USER_ROLE = {
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
var IMAGE = {
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var history = history$1.createBrowserHistory({
  basename: ''
});
var setBaseHistory = function setBaseHistory(appHistory) {
  history = appHistory;
};

var AuthService = function AuthService() {};

AuthService.login = function (user) {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.getUserInfo = function (username, authToken) {
  var headers = {
    Authorization: "Bearer " + authToken
  };
  return HttpClient.get(API_GET_USER + "/" + username, {
    headers: headers
  });
};

AuthService.getUserByRegisterToken = function (registerToken) {
  return HttpClient.get(API_GET_USER_BY_REGISTER_TOKEN + "/" + registerToken);
};

AuthService.compeleteInfo = function (user) {
  return HttpClient.post("" + API_COMPLETE_INFO, user);
};

AuthService.logout = function (user) {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.createPassword = function (password, registerToken) {
  return HttpClient.post(API_CREATE_PASSWORD, {
    password: password,
    registerToken: registerToken
  });
};

AuthService.register = function (user) {
  return HttpClient.post(API_REGISTER, user);
};

AuthService.checkLoginByToken = function () {
  return HttpClient.get(API_LOGIN_URL);
};

AuthService.getSuggestionEmail = function (username) {
  return HttpClient.get(API_EMAIL_SUGGESTION + "/" + username);
};

AuthService.forgotPassword = function (username, email) {
  return HttpClient.post(API_FORGOT_PASSWORD, {
    username: username,
    email: email
  });
};

AuthService.resetPassword = function (password, resetToken) {
  return HttpClient.post(API_RESET_PASSWORD, {
    password: password,
    resetToken: resetToken
  });
};

AuthService.updateUserInfo = function (user) {
  return HttpClient.put(API_UPDATE_USER_INFO, user);
};

AuthService.changePassword = function (value) {
  return HttpClient.post(API_CHANGE_PASSWORD, value);
};

AuthService.changeUserSetting = function (value) {
  return HttpClient.put(API_USER_SETTINGS, value);
};

AuthService.updateAvatar = function (user, file) {
  try {
    var formData = new FormData();
    formData.append('fileInfo', new Blob([JSON.stringify({
      userId: user.id,
      docType: 'AVATAR'
    })], {
      type: 'application/json'
    }));
    formData.append('file', file);
    return Promise.resolve(HttpClient.post(API_UPLOAD_FILE, formData, {
      headers: {
        'Content-Type': undefined
      }
    })).then(function (res) {
      return res.status === 200 ? HttpClient.defaults.baseURL + API_GET_FILE + '?fileCode=' + res.data.code : '';
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var LOGIN_ACTION = 'LOGIN_ACTION';
var LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
var LOGOUT_ACTION = 'LOGOUT_ACTION';
var SAVE_REGISTER_TOKEN = 'SAVE_REGISTER_TOKEN';
var SAVE_RESET_PASSWORD_TOKEN = 'SAVE_RESET_PASSWORD_TOKEN';
var UPDATE_USER_INFO = 'UPDATE_USER_INFO';
var sessionTimeOut = null;
var checkLoginStatus = function checkLoginStatus(authToken, redirectUrl) {
  return function (dispatch, getState) {
    try {
      var _temp3 = _catch(function () {
        return Promise.resolve(AuthService.checkLoginByToken()).then(function (response) {
          var username = getState().auth.user.username;

          var _temp = function () {
            if (response.status === API_R_200 && username) {
              return Promise.resolve(AuthService.getUserInfo(getState().auth.user.username, authToken)).then(function (_AuthService$getUserI) {
                response = _AuthService$getUserI;
                dispatch({
                  type: LOGIN_ACTION,
                  payload: {
                    authToken: authToken,
                    user: response.data || {}
                  }
                });
                var appId = getState().customizer.appId;
                history.push(redirectUrl || window.location.pathname.replace("/" + getContextPath(appId) + "/", '/'));
                setSessionTimeout();
              });
            } else {
              dispatch({
                type: LOGOUT_ACTION
              });
            }
          }();

          if (_temp && _temp.then) return _temp.then(function () {});
        });
      }, function () {
        dispatch({
          type: LOGOUT_ACTION
        });
      });

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var loginAction = function loginAction(user) {
  return function (dispatch, getState) {
    try {
      user.rememberMe = user.isRemeberMe;
      return Promise.resolve(AuthService.login(user)).then(function (response) {
        var _temp4 = function () {
          if (response.status === API_R_200) {
            var authToken = response.data.id_token;
            return Promise.resolve(AuthService.getUserInfo(user.username, authToken)).then(function (_AuthService$getUserI2) {
              response = _AuthService$getUserI2;

              if (user.isRemeberMe) {
                localStorage.setItem(REMEMBER_ME_TOKEN, JSON.stringify({
                  username: user.username,
                  name: response.data.fullName
                }));
              }

              var userSettings = response.data.userSettings;

              if (userSettings) {
                localStorage.setItem('language', userSettings.language.toLowerCase());
              }

              dispatch({
                type: LOGIN_ACTION,
                payload: {
                  authToken: authToken,
                  user: response.data || []
                }
              });

              if (getState().customizer.appId !== AppId.APP_NO1) {
                window.location.href = getExternalAppUrl(AppId.APP_NO1, '/');
              } else {
                history.push('/');
              }

              setSessionTimeout();
            });
          } else {
            dispatch({
              type: LOGOUT_ACTION
            });
          }
        }();

        if (_temp4 && _temp4.then) return _temp4.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var setSessionTimeout = function setSessionTimeout() {
  return function (dispatch) {
    clearTimeout(sessionTimeOut);
    sessionTimeOut = setTimeout(function () {
      toastError( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.sesionExpired"
      }));
      dispatch(logoutAction());
    }, SESSION_TIMEOUT * 60 * 1000);
  };
};
var clearSessionTimeOut = function clearSessionTimeOut() {
  clearTimeout(sessionTimeOut);
};
var createPassword = function createPassword(password) {
  return function (dispatch, getState) {
    try {
      var _temp6 = _catch(function () {
        return Promise.resolve(AuthService.createPassword(password, getState().auth.register.token)).then(function (response) {
          if (response.status === 200 && response.data) {
            history.push('/complete-information');
          }
        });
      }, function () {});

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var register = function register(values) {
  return function () {
    try {
      var _temp8 = _catch(function () {
        return Promise.resolve(AuthService.register(trimObjectValues(values))).then(function (res) {
          if (res.status === 200 && res.data) {
            toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "register.registerSuccess"
            }));
            history.push('/login');
          }
        });
      }, function () {});

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var compeleteInfo = function compeleteInfo(user) {
  return function (dispatch, getState) {
    try {
      var _temp10 = _catch(function () {
        user.registerToken = getState().auth.register.token;
        return Promise.resolve(AuthService.compeleteInfo(user)).then(function (response) {
          if (response.status === 200 && response.data) {
            toastSuccess('Hoàn tất đăng ký thành công');
            history.push('/');
          }
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var saveRegisterToken = function saveRegisterToken(registerToken) {
  return function (dispatch) {
    try {
      return Promise.resolve(AuthService.getUserByRegisterToken(registerToken)).then(function (response) {
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
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var saveResetPasswordToken = function saveResetPasswordToken(token) {
  return function (dispatch) {
    dispatch({
      type: SAVE_RESET_PASSWORD_TOKEN,
      payload: token
    });
  };
};
var forgotPassword = function forgotPassword(_ref) {
  var username = _ref.username,
      email = _ref.email;
  return function (dispatch, getState) {
    try {
      var _temp12 = _catch(function () {
        return Promise.resolve(AuthService.forgotPassword(username, email)).then(function (response) {
          if (response.status === 200 && response.data) {
            toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "forgotPassword.successfull"
            }));
            dispatch({
              type: SAVE_RESET_PASSWORD_TOKEN,
              payload: ''
            });
            history.push('/');
          }
        });
      }, function () {});

      return Promise.resolve(_temp12 && _temp12.then ? _temp12.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var resetPassword = function resetPassword(password) {
  return function (dispatch, getState) {
    try {
      var _temp14 = _catch(function () {
        return Promise.resolve(AuthService.resetPassword(password, getState().auth.resetPasswordToken)).then(function (response) {
          if (response.status === 200 && response.data) {
            toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "createPassword.resetSuccessFul"
            }));
            dispatch({
              type: SAVE_RESET_PASSWORD_TOKEN,
              payload: ''
            });
            history.push('/');
          }
        });
      }, function () {});

      return Promise.resolve(_temp14 && _temp14.then ? _temp14.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var logoutAction = function logoutAction() {
  return function (dispatch) {
    try {
      dispatch({
        type: LOGOUT_ACTION
      });
      clearSessionTimeOut();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var updateUserInfo = function updateUserInfo(user, avatarImage) {
  return function (dispatch) {
    try {
      var _temp17 = function _temp17() {
        return Promise.resolve(AuthService.updateUserInfo(user)).then(function (res) {
          if (res.status === 200) {
            dispatch({
              type: UPDATE_USER_INFO,
              payload: res.data
            });
            toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "setting.updateInfo.success"
            }));
            history.push('/');
          }
        });
      };

      var _temp18 = function () {
        if (avatarImage) {
          return Promise.resolve(AuthService.updateAvatar(user, avatarImage)).then(function (url) {
            user.userSettings.avatar = url || user.userSettings.avatar;
          });
        }
      }();

      return Promise.resolve(_temp18 && _temp18.then ? _temp18.then(_temp17) : _temp17(_temp18));
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var changePassword = function changePassword(_ref2) {
  var oldPassword = _ref2.oldPassword,
      newPassword = _ref2.newPassword;
  return function (dispatch) {
    try {
      return Promise.resolve(AuthService.changePassword({
        oldPassword: oldPassword,
        newPassword: newPassword
      })).then(function (res) {
        if (res.status === 200) {
          toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
            id: "changePassword.success"
          }));
          history.push('/');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var changeLanguageSetting = function changeLanguageSetting(lang, callBack) {
  return function (dispatch, getState) {
    try {
      var _getState$auth$user$u = getState().auth.user.userSettings,
          userSettings = _getState$auth$user$u === void 0 ? {} : _getState$auth$user$u;

      var value = _extends({}, userSettings, {
        language: lang.toUpperCase()
      });

      return Promise.resolve(AuthService.changeUserSetting(value)).then(function (res) {
        if (res.status === 200) {
          callBack();
          toastSuccess( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
            id: "generalInfo.changeLanguage.success"
          }));
          history.push('/');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var SHOW_LOADING_BAR = 'SHOW_LOADING_BAR';
var HIDE_LOADING_BAR = 'HIDE_LOADING_BAR';
var SHOW_CONFIRM_ALERT = 'SHOW_CONFIRM_ALERT';
var HIDE_CONFIRM_ALERT = 'HIDE_CONFIRM_ALERT';
var showConfirmAlert$1 = function showConfirmAlert(configs) {
  return function (dispatch) {
    return dispatch({
      type: SHOW_CONFIRM_ALERT,
      payload: configs
    });
  };
};
var hideConfirmAlert = function hideConfirmAlert() {
  return function (dispatch) {
    return dispatch({
      type: HIDE_CONFIRM_ALERT
    });
  };
};

var HttpClient = Axios.create({
  timeout: API_TIME_OUT,
  adapter: axiosExtensions.throttleAdapterEnhancer(axiosExtensions.cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  })),
  invalidate: function (config, request) {
    try {
      var _temp2 = function () {
        if (request.clearCacheEntry) {
          return Promise.resolve(config.store.removeItem(config.uuid)).then(function () {});
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }
});
HttpClient.defaults.headers['Content-Type'] = 'application/json';
var setUpHttpClient = function setUpHttpClient(store, apiBaseUrl) {
  var deviceId = localStorage.getItem('deviceId');
  var language = localStorage.getItem('language');

  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
  }

  if (!language) {
    localStorage.setItem('language', 'vi');
  }

  HttpClient.defaults.baseURL = apiBaseUrl || API_BASE_URL;
  HttpClient.interceptors.request.use(function (config) {
    var token = store.getState().auth.authToken;
    language = localStorage.getItem('language');

    if (token) {
      store.dispatch(setSessionTimeout());
      config.headers.Authorization = "Bearer " + token;
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
  HttpClient.interceptors.response.use(function (response) {
    store.dispatch({
      type: HIDE_LOADING_BAR,
      payload: ''
    });
    return response;
  }, function (e) {
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

var themeConfig = {
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

var customizerReducer = function customizerReducer(state, action) {
  if (state === void 0) {
    state = _extends({}, themeConfig);
  }

  switch (action.type) {
    case 'CHANGE_THEME':
      return _extends({}, state, {
        theme: action.theme
      });

    case 'SET_APP_ID':
      return _extends({}, state, {
        appId: action.appId
      });

    case 'COLLAPSE_SIDEBAR':
      return _extends({}, state, {
        sidebarCollapsed: action.value
      });

    case 'CHANGE_NAVBAR_COLOR':
      return _extends({}, state, {
        navbarColor: action.color
      });

    case 'CHANGE_NAVBAR_TYPE':
      return _extends({}, state, {
        navbarType: action.style
      });

    case 'CHANGE_FOOTER_TYPE':
      return _extends({}, state, {
        footerType: action.style
      });

    case 'CHANGE_MENU_COLOR':
      return _extends({}, state, {
        menuTheme: action.style
      });

    case 'HIDE_SCROLL_TO_TOP':
      return _extends({}, state, {
        hideScrollToTop: action.value
      });

    default:
      return state;
  }
};

var authInitialState = {
  authToken: '',
  user: '',
  loginStatus: '',
  register: {
    user: {},
    token: ''
  },
  resetPasswordToken: ''
};
var authReducers = function authReducers(state, action) {
  if (state === void 0) {
    state = _extends({}, authInitialState);
  }

  switch (action.type) {
    case LOGIN_ACTION:
      {
        return _extends({}, state, action.payload, {
          loginStatus: LOGIN_STATUS.SUCCESS
        });
      }

    case LOGOUT_ACTION:
      {
        return _extends({}, authInitialState);
      }

    case LOGIN_FAIL_ACTION:
      {
        return _extends({}, state, {
          loginStatus: LOGIN_STATUS.FAIL
        });
      }

    case SAVE_REGISTER_TOKEN:
      {
        return _extends({}, state, {
          register: action.payload
        });
      }

    case SAVE_RESET_PASSWORD_TOKEN:
      {
        return _extends({}, state, {
          resetPasswordToken: action.payload
        });
      }

    case UPDATE_USER_INFO:
      {
        return _extends({}, state, {
          user: action.payload
        });
      }

    default:
      return state;
  }
};

var mapRoleListToNavConfigs = function mapRoleListToNavConfigs(roleList) {
  if (roleList === void 0) {
    roleList = [];
  }

  if (!roleList.length) {
    return [];
  }

  roleList = roleList.filter(function (item) {
    return item.order < 1000;
  });
  var mapRoles = new Map();
  roleList.forEach(function (role) {
    var listRole = mapRoles.get(role.parentId);
    var itemNav = mapRoleToNavItem(role);

    if (listRole) {
      listRole.push(itemNav);
      mapRoles.set(role.parentId, listRole);
    } else {
      mapRoles.set(role.parentId, [itemNav]);
    }
  });
  var parentList = mapRoles.get(null);
  return parentList.map(function (item) {
    item.children = mapRoles.get(item.id + '');
    return item;
  });
};

var mapRoleToNavItem = function mapRoleToNavItem(role) {
  var IconTag = Icon[role.icon];
  var item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = "menu." + role.keyLang;
  item.icon = /*#__PURE__*/React__default.createElement(IconTag, {
    size: 20
  });
  item.navLink = role.menuPath;

  if (role.isHighlight) {
    item.badge = 'primary';
    item.badgeText = 'new';
  }

  return item;
};

var getNativgationConfig = function getNativgationConfig(appId, navConfigs) {
  if (!navConfigs) {
    navConfigs = [].concat(navigationConfig);
  } else {
    navConfigs = mapRoleListToNavConfigs(navConfigs);
  }

  return navConfigs.map(function (item) {
    item.isExternalApp = item.appId !== appId;

    if (item.children) {
      item.children.map(function (child) {
        return child.isExternalApp = child.appId !== appId;
      });

      if (item.children.length === 1) {
        item.navLink = item.children[0].navLink;
      } else {
        item.type = 'collapse';
      }
    }

    return item;
  });
};

var NavBarService = function NavBarService() {};

NavBarService.getNativagtion = function () {
  return HttpClient.get(API_GET_NAV_CONFIGS, {
    params: {
      uuid: generateUUID()
    },
    isBackgroundRequest: true
  });
};

NavBarService.getUserGroupRole = function (groupId) {
  return HttpClient.get(API_GET_USER_ROLES + "/" + groupId, {
    params: {
      uuid: generateUUID()
    },
    isBackgroundRequest: true
  });
};

var LOAD_NATIVGATION = 'LOAD_NATIVGATION';
var LOAD_USER_ROLE = 'LOAD_USER_ROLE';
var goBackHomePage = function goBackHomePage() {
  return function (dispatch, getState) {
    try {
      var appId = getState().customizer.appId;

      if (appId === AppId.APP_NO1) {
        history.push('/');
      } else {
        window.location.href = getExternalAppUrl(AppId.APP_NO1, '/');
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var initialState = {
  navConfigs: [],
  roles: [],
  userRoles: []
};

var navbarReducer = function navbarReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case LOAD_NATIVGATION:
      return _extends({}, state, {
        navConfigs: action.payload.navConfigs,
        roles: action.payload.roles
      });

    case LOAD_USER_ROLE:
      return _extends({}, state, {
        userRoles: action.payload
      });

    default:
      return state;
  }
};

var DEFAULT_CONFIRM_ALERT = {
  title: '',
  isShow: false,
  content: '',
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {}
};
var initialState$1 = {
  loading: new Set(),
  isLoading: false,
  confirmAlert: _extends({}, DEFAULT_CONFIRM_ALERT)
};

var uiReducer = function uiReducer(state, action) {
  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case SHOW_LOADING_BAR:
      return _extends({}, state, {
        isLoading: true,
        loading: state.loading.add(action.payload)
      });

    case HIDE_LOADING_BAR:
      state.loading["delete"](action.payload);
      return _extends({}, state, {
        isLoading: !!state.loading.size
      });

    case SHOW_CONFIRM_ALERT:
      return _extends({}, state, {
        confirmAlert: _extends({
          isShow: true
        }, state.confirmAlert, action.payload)
      });

    case HIDE_CONFIRM_ALERT:
      return _extends({}, state, {
        confirmAlert: _extends({}, DEFAULT_CONFIRM_ALERT)
      });

    default:
      return state;
  }
};

var rootReducer = function rootReducer(appReducer) {
  return redux.combineReducers({
    customizer: customizerReducer,
    ui: uiReducer,
    auth: reduxPersist.persistReducer({
      storage: sessionStorage,
      key: 'root',
      blacklist: ['loginStatus']
    }, authReducers),
    navbar: navbarReducer,
    app: appReducer
  });
};

var Autocomplete = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Autocomplete, _React$Component);

  function Autocomplete(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onSuggestionItemClick = function (item, e) {
      if (_this.props.onSuggestionClick) {
        _this.props.onSuggestionClick(item, e);
      }

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
    };

    _this.onSuggestionItemHover = function (index) {
      _this.setState({
        activeSuggestion: index
      });
    };

    _this.onChange = function (e) {
      var userInput = e.currentTarget.value;

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput: userInput
      });

      if (e.target.value < 1) {
        _this.setState({
          showSuggestions: false
        });
      }
    };

    _this.onInputClick = function (e) {
      e.stopPropagation();
    };

    _this.onKeyDown = function (e) {
      var _this$state = _this.state,
          activeSuggestion = _this$state.activeSuggestion,
          showSuggestions = _this$state.showSuggestions,
          userInput = _this$state.userInput;
      var filterKey = _this.props.filterKey;
      var suggestionList = ReactDOM.findDOMNode(_this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        _this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= _this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < _this.filteredData.length - 1) {
          _this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= _this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            _this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              _this.onSuggestionItemClick(_this.filteredData[activeSuggestion], e);

              _this.setState({
                userInput: _this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (_this.props.onKeyDown !== undefined && _this.props.onKeyDown !== null && _this.props.onKeyDown) {
        _this.props.onKeyDown(e, userInput);
      }
    };

    _this.renderGroupedSuggestion = function (arr) {
      var _this$props = _this.props,
          filterKey = _this$props.filterKey,
          customRender = _this$props.customRender;

      var _assertThisInitialize = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize.onSuggestionItemHover,
          _assertThisInitialize2 = _assertThisInitialize.state,
          activeSuggestion = _assertThisInitialize2.activeSuggestion,
          userInput = _assertThisInitialize2.userInput;

      var renderSuggestion = function renderSuggestion(item, i) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(item, e);
            },
            onMouseEnter: function onMouseEnter() {
              _this.onSuggestionItemHover(_this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map(function (item, i) {
        return renderSuggestion(item, i);
      });
    };

    _this.renderUngroupedSuggestions = function () {
      var _this$filteredData;

      var _this$props2 = _this.props,
          filterKey = _this$props2.filterKey,
          suggestions = _this$props2.suggestions,
          customRender = _this$props2.customRender,
          suggestionLimit = _this$props2.suggestionLimit;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize3.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize3.onSuggestionItemHover,
          _assertThisInitialize4 = _assertThisInitialize3.state,
          activeSuggestion = _assertThisInitialize4.activeSuggestion,
          userInput = _assertThisInitialize4.userInput;

      _this.filteredData = [];
      var sortSingleData = suggestions.filter(function (i) {
        var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);

      (_this$filteredData = _this.filteredData).push.apply(_this$filteredData, sortSingleData);

      return sortSingleData.length ? sortSingleData.map(function (suggestion, index) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(suggestion, e);
            },
            onMouseEnter: function onMouseEnter() {
              return _this.onSuggestionItemHover(_this.filteredData.indexOf(suggestion));
            }
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      }) : /*#__PURE__*/React__default.createElement("li", {
        className: "suggestion-item no-result"
      }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
        size: 15
      }), ' ', /*#__PURE__*/React__default.createElement("span", {
        className: "align-middle ml-50"
      }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: 'common.noResults'
      })));
    };

    _this.renderSuggestions = function () {
      var _this$props3 = _this.props,
          filterKey = _this$props3.filterKey,
          grouped = _this$props3.grouped,
          filterHeaderKey = _this$props3.filterHeaderKey,
          suggestions = _this$props3.suggestions;

      var _assertThisInitialize5 = _assertThisInitialized(_this),
          renderUngroupedSuggestions = _assertThisInitialize5.renderUngroupedSuggestions,
          userInput = _assertThisInitialize5.state.userInput;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        _this.filteredData = [];
        return suggestions.map(function (suggestion) {
          var _this$filteredData2;

          var sortData = suggestion.data.filter(function (i) {
            var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);

          (_this$filteredData2 = _this.filteredData).push.apply(_this$filteredData2, sortData);

          return /*#__PURE__*/React__default.createElement(React__default.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? _this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React__default.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    _this.clearInput = function (val) {
      if (_this.props.clearInput && !val) {
        _this.setState({
          userInput: ''
        });
      }
    };

    _this.handleExtenalClick = function (e) {
      var container = _this.refs.container;
      var target = e.target;

      if (target !== container && !container.contains(target)) {
        _this.setState({
          showSuggestions: false
        });

        if (_this.props.externalClick) _this.props.externalClick(e);
      }
    };

    _this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    _this.filteredData = [];
    document.body.addEventListener('click', _this.handleExtenalClick);
    return _this;
  }

  var _proto = Autocomplete.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var textInput = ReactDOM.findDOMNode(this.input);
    var _this$props4 = this.props,
        autoFocus = _this$props4.autoFocus,
        onSuggestionsShown = _this$props4.onSuggestionsShown,
        clearInput = _this$props4.clearInput;

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
  };

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _onChange = this.onChange,
        _onKeyDown = this.onKeyDown,
        _this$state2 = this.state,
        showSuggestions = _this$state2.showSuggestions,
        userInput = _this$state2.userInput,
        openUp = _this$state2.openUp;
    var suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React__default.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: function ref(el) {
          return _this2.suggestionList = el;
        },
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      onChange: function onChange(e) {
        _onChange(e);

        if (_this2.props.onChange) {
          _this2.props.onChange(e);
        }
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      value: userInput,
      className: "vx-autocomplete-search " + (this.props.className ? this.props.className : ''),
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: function ref(el) {
        return _this2.input = el;
      },
      onFocus: function onFocus(e) {
        _this2.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: function onBlur(e) {
        if (_this2.props.onBlur) _this2.props.onBlur(e);

        _this2.setState({
          focused: false
        });
      }
    }), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, this.props.placeholder), suggestionsListComponent));
  };

  return Autocomplete;
}(React__default.Component);
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

var UserDropdown = function UserDropdown() {
  var history = reactRouterDom.useHistory();
  var dispatch = reactRedux.useDispatch();

  var handleNavigation = function handleNavigation(e, path) {
    e.preventDefault();
    history.push(path);
  };

  var onClickLogout = function onClickLogout() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "navbar.logout"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "navbar.logout.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(logoutAction());
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
    right: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/account-info');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/change-password');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/terms-and-condition');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.FileText, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.termAndCondition"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/privacy-policy');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Shield, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.privacyPolicy"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/language');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Globe, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.language"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/contact');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.contact"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    onClick: onClickLogout
  }, /*#__PURE__*/React__default.createElement(Icon.Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "navbar.logout"
  }))));
};

var NavbarUser = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(NavbarUser, _React$PureComponent);

  function NavbarUser() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      navbarSearch: false,
      suggestions: []
    };

    _this.handleNavbarSearch = function () {
      _this.setState({
        navbarSearch: !_this.state.navbarSearch
      });
    };

    _this.getCountryCode = function (locale) {
      var countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };

    _this.onSuggestionItemClick = function (item) {
      if (!item.isExternalApp) {
        history.push("" + item.menuPath);
      } else {
        window.location.href = item.navLinkExternal;
      }
    };

    return _this;
  }

  var _proto = NavbarUser.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (prevProps.roles !== this.props.roles) {
      var suggestions = this.props.roles.map(function (item) {
        item.name = _this2.props.intl.formatMessage({
          id: "menu." + item.keyLang
        });
        item.isExternalApp = item.appId !== _this2.props.appId;
        item.navLinkExternal = getExternalAppUrl(item.appId, item.menuPath);
        return item;
      });
      this.setState({
        suggestions: suggestions
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props$user = this.props.user,
        userSettings = _this$props$user.userSettings,
        user = _objectWithoutPropertiesLoose(_this$props$user, ["userSettings", "userDetails"]);

    userSettings = userSettings || {};
    return /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
      className: "nav-link-search pt-2"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React__default.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "name",
      onSuggestionClick: this.onSuggestionItemClick,
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: function externalClick() {
        _this3.setState({
          navbarSearch: false
        });
      },
      onKeyDown: function onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
          _this3.setState({
            navbarSearch: false
          });

          _this3.props.handleAppOverlay('');
        }
      },
      customRender: function customRender(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) {
        var IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React__default.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: function onClick(e) {
            return onSuggestionItemClick(item, e);
          },
          onMouseEnter: function onMouseEnter() {
            return onSuggestionItemHover(filteredData.indexOf(item));
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "d-flex align-items-center"
        }, /*#__PURE__*/React__default.createElement(IconTag, {
          size: 17
        }), /*#__PURE__*/React__default.createElement("div", {
          className: "ml-2"
        }, item.name)));
      },
      onSuggestionsShown: function onSuggestionsShown(userInput) {
        if (_this3.state.navbarSearch) {
          _this3.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React__default.createElement(Icon.X, {
      size: 24,
      onClick: function onClick(e) {
        e.stopPropagation();

        _this3.setState({
          navbarSearch: false
        });

        _this3.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React__default.createElement(Icon.Bell, {
      size: 21
    }))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "user-name text-bold-600"
    }, user.fullName)), /*#__PURE__*/React__default.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React__default.createElement("img", {
      src: userSettings.avatar || '',
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React__default.createElement(UserDropdown, null)));
  };

  return NavbarUser;
}(React__default.PureComponent);

var NavbarUser$1 = reactIntl.injectIntl(NavbarUser);

var ThemeNavbar = function ThemeNavbar(props) {
  var colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  var navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React__default.createElement(reactstrap.Navbar, {
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
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React__default.createElement(Icon.Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React__default.createElement("ul", {
    className: "nav navbar-nav d-none d-xl-flex bookmark-icons"
  }, Array(5).fill(0).map(function (_, index) {
    return /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
      key: index
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "img-fluid",
      src: IMAGE["NAV_ICON_" + (index + 1)]
    }));
  })))), /*#__PURE__*/React__default.createElement(NavbarUser$1, {
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

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles,
    authToken: state.auth.authToken
  };
};

var Navbar = reactRedux.connect(mapStateToProps, {
  logoutAction: logoutAction
})(ThemeNavbar);

function getWindowDimensions() {
  var _window = window,
      width = _window.innerWidth,
      height = _window.innerHeight;
  return {
    width: width,
    height: height
  };
}

function useWindowDimensions() {
  var _useState = React.useState(getWindowDimensions()),
      windowDimensions = _useState[0],
      setWindowDimensions = _useState[1];

  React.useEffect(function () {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowDimensions;
}

var Footer = function Footer(props) {
  var _useWindowDimensions = useWindowDimensions(),
      width = _useWindowDimensions.width;

  var history = reactRouterDom.useHistory();
  var dispatch = reactRedux.useDispatch();
  var appId = reactRedux.useSelector(function (state) {
    return state.customizer.appId;
  });

  var goToPage = function goToPage(e, navLink) {
    e.preventDefault();

    if (appId === AppId.INSURANCE_APP) {
      history.push(navLink);
    } else {
      window.location.href = getExternalAppUrl(AppId.INSURANCE_APP, navLink);
    }
  };

  var onClickBackHome = function onClickBackHome(e) {
    e.preventDefault();
    dispatch(goBackHomePage());
  };

  return /*#__PURE__*/React__default.createElement("footer", null, /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': width < MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))))), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light footer-mobile text-center', {
      'd-none': width >= MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickBackHome
  }, /*#__PURE__*/React__default.createElement(Icon.Home, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "menu.home"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, '/contracts');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.List, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "menu.contract"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "position-relative w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, '/buy-insurance');
    }
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.BUY_INSURANCE,
    className: "buy-insurance",
    alt: ""
  }), /*#__PURE__*/React__default.createElement(Icon.PlusCircle, {
    style: {
      visibility: 'hidden'
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "menu.buyInsurance"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickBackHome
  }, /*#__PURE__*/React__default.createElement(Icon.Gift, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "menu.promotion"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return history.push('/contact');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.contact"
  }))))), props.hideScrollToTop === false ? /*#__PURE__*/React__default.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "primary",
    className: "btn-icon scroll-top d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement(Icon.ArrowUp, {
    size: 15
  }))) : null);
};

var changeTheme = function changeTheme(theme) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_THEME",
      theme: theme
    });
  };
};
var setAppId = function setAppId(appId) {
  return function (dispatch) {
    return dispatch({
      type: "SET_APP_ID",
      appId: appId
    });
  };
};
var collapseSidebar = function collapseSidebar(value) {
  return function (dispatch) {
    return dispatch({
      type: "COLLAPSE_SIDEBAR",
      value: value
    });
  };
};
var changeNavbarColor = function changeNavbarColor(color) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_COLOR",
      color: color
    });
  };
};
var changeNavbarType = function changeNavbarType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_TYPE",
      style: style
    });
  };
};
var changeFooterType = function changeFooterType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_FOOTER_TYPE",
      style: style
    });
  };
};
var changeMenuColor = function changeMenuColor(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_MENU_COLOR",
      style: style
    });
  };
};
var hideScrollToTop = function hideScrollToTop(value) {
  return function (dispatch) {
    return dispatch({
      type: "HIDE_SCROLL_TO_TOP",
      value: value
    });
  };
};

var SidebarHeader = function SidebarHeader(props) {
  var toggleSidebarMenu = props.toggleSidebarMenu,
      activeTheme = props.activeTheme,
      collapsed = props.collapsed,
      toggle = props.toggle,
      sidebarVisibility = props.sidebarVisibility,
      menuShadow = props.menuShadow;
  var dispatch = reactRedux.useDispatch();

  var onClickHome = function onClickHome() {
    dispatch(goBackHomePage());
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-header"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "nav navbar-nav flex-row"
  }, /*#__PURE__*/React__default.createElement("li", {
    className: "nav-item my-auto mr-auto cursor-pointer",
    onClick: onClickHome
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "img-fluid logo-img",
    src: IMAGE.LOGO_NO_TEXT,
    alt: "logo"
  }), /*#__PURE__*/React__default.createElement("img", {
    className: "img-fluid logo-text",
    src: IMAGE.LOGO_TEXT,
    alt: "logo"
  })), /*#__PURE__*/React__default.createElement("li", {
    className: "nav-item nav-toggle"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "nav-link modern-nav-toggle"
  }, collapsed === false ? /*#__PURE__*/React__default.createElement(Icon.Disc, {
    onClick: function onClick() {
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
  }) : /*#__PURE__*/React__default.createElement(Icon.Circle, {
    onClick: function onClick() {
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
  }), /*#__PURE__*/React__default.createElement(Icon.X, {
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
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('shadow-bottom', {
      'd-none': menuShadow === false
    })
  }));
};

var SideMenuGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuGroup, _React$Component);

  function SideMenuGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      isOpen: false,
      activeItem: _this.props.activePath
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    _this.flag = true;
    _this.parentArray = [];
    _this.childObj = {};
    return _this;
  }

  var _proto = SideMenuGroup.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
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
  };

  _proto.renderChild = function renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(function (child) {
      var CustomAnchorTag = child.isExternalApp ? "a" : reactRouterDom.Link;

      if (!_this2.parentArray.includes(item.id) && _this2.flag) {
        _this2.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        _this2.props.collapsedMenuPaths(child.navLink);
      }

      if (_this2.props.activeItemState === child.navLink) {
        _this2.childObj = child;

        _this2.props.parentArr.push(_this2.parentArray);

        _this2.flag = false;
      }

      if (child.permissions && child.permissions.includes(_this2.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React__default.createElement("li", {
          key: child.id,
          className: classnames({
            hover: _this2.props.hoverIndex === child.id,
            'has-sub': child.type === 'collapse',
            open: child.type === 'collapse' && activeGroup.includes(child.id),
            'sidebar-group-active': _this2.props.currentActiveGroup.includes(child.id),
            active: _this2.props.activeItemState === child.navLink && child.type === 'item' || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: function onClick(e) {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (_this2.props.deviceWidth <= 1200 && child.type === 'item') {
              _this2.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
          className: classnames({
            'd-flex justify-content-between': child.type === 'collapse'
          }),
          to: child.navLink && child.type === 'item' ? child.navLink : '',
          href: _this2.props.getItemLink(child),
          onMouseEnter: function onMouseEnter() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: function onMouseLeave() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: function onClick(e) {
            return child.type === 'collapse' ? e.preventDefault() : '';
          },
          target: child.newTab ? '_blank' : undefined
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React__default.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : '', child.type === 'collapse' ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ''), child.children ? _this2.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : '');
      } else if (child.navLink === _this2.props.activePath && !child.permissions.includes(_this2.props.currentUser)) {
        return _this2.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  };

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  };

  return SideMenuGroup;
}(React__default.Component);

var SideMenuContent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuContent, _React$Component);

  function SideMenuContent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    _this.handleGroupClick = function (id, parent, type) {
      if (parent === void 0) {
        parent = null;
      }

      if (type === void 0) {
        type = '';
      }

      var open_group = _this.state.activeGroups;
      var active_group = _this.state.currentActiveGroup;
      var temp_arr = _this.state.tempArr;

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
          var temp = open_group.filter(function (obj) {
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

      _this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    _this.initRender = function (parentArr) {
      _this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    _this.getItemLink = function (item) {
      return item.isExternalApp ? getExternalAppUrl(item.appId, item.navLink) : '';
    };

    _this.parentArr = [];
    _this.collapsedPath = null;
    return _this;
  }

  var _proto = SideMenuContent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.initRender(this.parentArr[0] || []);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath || prevProps.navConfigs !== this.props.navConfigs) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var menuItems = this.props.navConfigs.map(function (item) {
      var CustomAnchorTag = item.isExternalApp ? "a" : reactRouterDom.Link;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React__default.createElement("li", {
          className: "navigation-header",
          key: "group-header-" + item.groupTitle
        }, /*#__PURE__*/React__default.createElement("span", null, item.groupTitle));
      }

      var renderItem = /*#__PURE__*/React__default.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: _this2.state.activeGroups.includes(item.id),
          'sidebar-group-active': _this2.state.currentActiveGroup.includes(item.id),
          hover: _this2.props.hoverIndex === item.id,
          active: _this2.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (item.type === 'item') {
            _this2.props.handleActiveItem(item.navLink);

            _this2.handleGroupClick(item.id, null, item.type);

            if (_this2.props.deviceWidth <= 1200 && item.type === 'item') {
              _this2.props.toggleMenu();
            }
          } else {
            _this2.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: _this2.getItemLink(item),
        className: "d-flex " + (item.badgeText ? 'justify-content-between' : 'justify-content-start'),
        onMouseEnter: function onMouseEnter() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: function onMouseLeave() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: function onClick(e) {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React__default.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React__default.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: _this2.handleGroupClick,
        activeGroup: _this2.state.activeGroups,
        handleActiveItem: _this2.props.handleActiveItem,
        activeItemState: _this2.props.activeItemState,
        handleSidebarMouseEnter: _this2.props.handleSidebarMouseEnter,
        activePath: _this2.props.activePath,
        hoverIndex: _this2.props.hoverIndex,
        initRender: _this2.initRender,
        parentArr: _this2.parentArr,
        triggerActive: undefined,
        currentActiveGroup: _this2.state.currentActiveGroup,
        getItemLink: _this2.getItemLink,
        permission: _this2.props.permission,
        currentUser: _this2.props.currentUser,
        redirectUnauthorized: _this2.redirectUnauthorized,
        collapsedMenuPaths: _this2.props.collapsedMenuPaths,
        toggleMenu: _this2.props.toggleMenu,
        deviceWidth: _this2.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        _this2.collapsedPath = item.navLink;

        _this2.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(_this2.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === _this2.props.activePath && !item.permissions.includes(_this2.props.currentUser.role)) {
        return _this2.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, menuItems);
  };

  return SideMenuContent;
}(React__default.Component);

var Sidebar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Sidebar, _Component);

  function Sidebar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: _this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });

        _this.checkDevice();
      }
    };

    _this.checkDevice = function () {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function mq(query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        _this.setState({
          ScrollbarTag: "div"
        });
      } else {
        _this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    _this.changeActiveIndex = function (id) {
      if (id !== _this.state.activeIndex) {
        _this.setState({
          activeIndex: id
        });
      } else {
        _this.setState({
          activeIndex: null
        });
      }
    };

    _this.handleSidebarMouseEnter = function (id) {
      if (id !== _this.state.hoveredMenuItem) {
        _this.setState({
          hoveredMenuItem: id
        });
      } else {
        _this.setState({
          hoveredMenuItem: null
        });
      }
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    return _this;
  }

  Sidebar.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  };

  var _proto = Sidebar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        toggleSidebarMenu = _this$props.toggleSidebarMenu,
        visibilityState = _this$props.visibilityState,
        sidebarHover = _this$props.sidebarHover,
        toggle = _this$props.toggle,
        color = _this$props.color,
        sidebarVisibility = _this$props.sidebarVisibility,
        activeTheme = _this$props.activeTheme,
        collapsed = _this$props.collapsed,
        activePath = _this$props.activePath,
        sidebarState = _this$props.sidebarState,
        currentLang = _this$props.currentLang,
        permission = _this$props.permission,
        currentUser = _this$props.currentUser,
        collapsedMenuPaths = _this$props.collapsedMenuPaths;
    var _this$state = this.state,
        menuShadow = _this$state.menuShadow,
        activeIndex = _this$state.activeIndex,
        hoveredMenuItem = _this$state.hoveredMenuItem,
        activeItem = _this$state.activeItem,
        ScrollbarTag = _this$state.ScrollbarTag;

    var scrollShadow = function scrollShadow(container, dir) {
      if (container && dir === "up" && container.scrollTop >= 100) {
        _this2.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        _this2.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe(e) {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames("main-menu menu-fixed menu-light menu-accordion menu-shadow theme-" + activeTheme, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: function onMouseEnter() {
        return sidebarHover(false);
      },
      onMouseLeave: function onMouseLeave() {
        return sidebarHover(true);
      }
    }, /*#__PURE__*/React__default.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath
    }), /*#__PURE__*/React__default.createElement(ScrollbarTag, _extends({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: function onScrollDown(container) {
        return scrollShadow(container, "down");
      },
      onScrollUp: function onScrollUp(container) {
        return scrollShadow(container, "up");
      },
      onYReachStart: function onYReachStart() {
        return menuShadow === true && _this2.setState({
          menuShadow: false
        });
      }
    }), /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe() {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React__default.createElement(SideMenuContent, {
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
  };

  return Sidebar;
}(React.Component);

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    currentUser: state.auth,
    appId: state.customizer.appId,
    navConfigs: state.navbar.navConfigs
  };
};

var Sidebar$1 = reactRedux.connect(mapStateToProps$1)(Sidebar);

var Layout = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(Layout, _PureComponent);

  function Layout() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      sidebarState: _this.props.customizer.sidebarCollapsed,
      layout: _this.props.customizer.theme,
      collapsedContent: _this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    _this.collapsedPaths = [];
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });
      }
    };

    _this.handleCustomizer = function (bool) {
      _this.setState({
        customizer: bool
      });
    };

    _this.handleCollapsedMenuPaths = function (item) {
      var collapsedPaths = _this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        _this.collapsedPaths = collapsedPaths;
      }
    };

    _this.toggleSidebarMenu = function (val) {
      _this.setState({
        sidebarState: !_this.state.sidebarState,
        collapsedContent: !_this.state.collapsedContent
      });
    };

    _this.sidebarMenuHover = function (val) {
      _this.setState({
        sidebarState: val
      });
    };

    _this.handleSidebarVisibility = function () {
      if (_this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', function () {
            if (_this.state.sidebarHidden) {
              _this.setState({
                sidebarHidden: !_this.state.sidebarHidden
              });
            }
          });
        }

        _this.setState({
          sidebarHidden: !_this.state.sidebarHidden
        });
      }
    };

    _this.handleCurrentLanguage = function (lang) {
      _this.setState({
        currentLang: lang
      });
    };

    _this.handleAppOverlay = function (value) {
      if (value.length > 0) {
        _this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        _this.setState({
          appOverlay: false
        });
      }
    };

    _this.handleAppOverlayClick = function () {
      _this.setState({
        appOverlay: false
      });
    };

    return _this;
  }

  var _proto = Layout.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    var _this$props = this.props,
        pathname = _this$props.location.pathname,
        _this$props$customize = _this$props.customizer,
        theme = _this$props$customize.theme,
        direction = _this$props$customize.direction;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      var layout = theme;
      var dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props2 = this.props,
        pathname = _this$props2.location.pathname,
        _this$props2$customiz = _this$props2.customizer,
        theme = _this$props2$customiz.theme,
        sidebarCollapsed = _this$props2$customiz.sidebarCollapsed;
    var layout = theme;

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
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var appProps = this.props.customizer;
    var menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    var sidebarProps = {
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
    var navbarProps = {
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
    var footerProps = {
      appId: this.props.appId,
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("wrapper vertical-layout theme-" + appProps.menuTheme, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React__default.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React__default.createElement(Navbar, navbarProps), /*#__PURE__*/React__default.createElement("div", {
      className: "content-wrapper pb-4 pb-md-0"
    }, this.props.children)), /*#__PURE__*/React__default.createElement(Footer, footerProps), /*#__PURE__*/React__default.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  };

  return Layout;
}(React.PureComponent);

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = reactRedux.connect(mapStateToProps$2, {
  changeTheme: changeTheme,
  collapseSidebar: collapseSidebar,
  changeNavbarColor: changeNavbarColor,
  changeNavbarType: changeNavbarType,
  changeFooterType: changeFooterType,
  changeMenuColor: changeMenuColor,
  hideScrollToTop: hideScrollToTop
})(Layout);

var LOAD_NATIVGATION$1 = 'LOAD_NATIVGATION';
var LOAD_USER_ROLE$1 = 'LOAD_USER_ROLE';
var loadNavtigation = function loadNavtigation(appId) {
  return function (dispatch) {
    try {
      return Promise.resolve(NavBarService.getNativagtion()).then(function (res) {
        var roles = res.data || [];
        var navConfigs = getNativgationConfig(appId, roles);
        dispatch({
          type: LOAD_NATIVGATION$1,
          payload: {
            navConfigs: navConfigs,
            roles: roles
          }
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var loadUserRoles = function loadUserRoles() {
  return function (dispatch, getState) {
    try {
      var groupId = getState().auth.user.groupId;

      if (!groupId) {
        return Promise.resolve();
      }

      return Promise.resolve(NavBarService.getUserGroupRole(groupId)).then(function (res) {
        if (res.status === 200) {
          dispatch({
            type: LOAD_USER_ROLE$1,
            payload: res.data
          });
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var Context = React__default.createContext();

var IntlProviderWrapper = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(IntlProviderWrapper, _React$Component);

  function IntlProviderWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      locale: _this.props.locale,
      messages: _this.props.appMessage[_this.props.locale]
    };
    return _this;
  }

  var _proto = IntlProviderWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var children = this.props.children;
    var _this$state = this.state,
        locale = _this$state.locale,
        messages = _this$state.messages;
    return /*#__PURE__*/React__default.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: function switchLanguage(language) {
          localStorage.setItem('language', language);

          _this2.setState({
            locale: language,
            messages: _this2.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React__default.createElement(reactIntl.IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "vi"
    }, children));
  };

  return IntlProviderWrapper;
}(React__default.Component);

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

var BaseFormGroup = function BaseFormGroup(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      type = _ref.type,
      disabled = _ref.disabled,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired;

  var _onBlur = function onBlur(e, form) {
    form.handleBlur(e);
    var value = e.target.value;
    value = value.trim();
    form.setFieldValue(fieldName, value);
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: messageId
  }, function (msg) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: fieldName
    }, function (_ref2) {
      var field = _ref2.field,
          form = _ref2.form;
      return /*#__PURE__*/React__default.createElement(reactstrap.Input, _extends({
        className: "form-control " + (isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) && 'is-invalid')
      }, field, {
        type: type,
        disabled: disabled,
        value: field.value,
        placeholder: msg,
        onBlur: function onBlur(e) {
          return _onBlur(e, form);
        }
      }));
    }), isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, getPropObject(errors, fieldName)) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
  }));
};

var DatePicker = function DatePicker(props) {
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(Flatpickr, props), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, props.placeholder), props.errors && props.touched && getPropObject(props.errors, props.fieldName) && getPropObject(props.touched, props.fieldName) ? /*#__PURE__*/React__default.createElement("div", {
    className: "text-danger"
  }, getPropObject(props.errors, props.fieldName)) : null);
};

var BaseFormDatePicker = function BaseFormDatePicker(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      options = _ref.options,
      intl = _ref.intl,
      _onChange = _ref.onChange,
      disabled = _ref.disabled,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired;
  var defaultOptions = {
    dateFormat: 'm/d/Y'
  };
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(formik.Field, {
    name: fieldName
  }, function (_ref2) {
    var field = _ref2.field,
        form = _ref2.form;
    return /*#__PURE__*/React__default.createElement(DatePicker, {
      className: "form-control position-relative " + (!disabled ? 'bg-white' : '') + " " + (isRequired && errors[fieldName] && touched[fieldName] && 'is-invalid'),
      placeholder: intl.formatMessage({
        id: messageId
      }),
      fieldName: fieldName,
      notRequired: !isRequired,
      errors: errors,
      disabled: disabled,
      touched: touched,
      value: field.value,
      options: options || defaultOptions,
      onChange: function onChange(date) {
        form.setFieldValue(fieldName, date[0]);

        if (_onChange) {
          _onChange(date);
        }
      }
    });
  }));
};

var BaseFormDatePicker$1 = reactIntl.injectIntl(BaseFormDatePicker);

var Select = function Select(props) {
  var _useState = React.useState(''),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  var _useState2 = React.useState(false),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  React.useEffect(function () {
    setInputValue(props.value);
  }, [props.value]);

  var onChange = function onChange(e, actions) {
    if (props.onChange) {
      props.onChange(e, actions);
    }

    if (props.isMulti) {
      setInputValue(e ? e.map(function (item) {
        return item.value;
      }).join() : '');
    } else {
      setInputValue(e ? e.value : '');
    }
  };

  var onFocus = function onFocus(e) {
    if (props.onFocus) {
      props.onFocus(e);
    }

    setIsFocused(true);
  };

  var onBlur = function onBlur(e) {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setIsFocused(false);
  };

  var SelectComponent = React.useCallback(function (componentProps) {
    switch (props.type) {
      case 'creatable':
        return /*#__PURE__*/React__default.createElement(CreatableSelect, componentProps);

      case 'async':
        return /*#__PURE__*/React__default.createElement(AsyncSelect, componentProps);

      default:
        return /*#__PURE__*/React__default.createElement(ReactSelect, componentProps);
    }
  }, [props]);
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(SelectComponent, _extends({}, props, {
    isDisabled: props.disabled,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    theme: function theme(_theme) {
      return _extends({}, _theme, {
        colors: _extends({}, _theme.colors, {
          primary: '#338955'
        })
      });
    }
  })), props.required ? getPropObject(props.errors, props.fieldName) && getPropObject(props.touched, props.fieldName) ? /*#__PURE__*/React__default.createElement("div", {
    className: "text-danger"
  }, getPropObject(props.errors, props.fieldName)) : null : '', /*#__PURE__*/React__default.createElement("input", {
    className: "d-none",
    placeholder: props.placeholder,
    value: inputValue
  }), inputValue ? /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    className: classnames({
      'text-primary': isFocused
    })
  }, props.placeholder) : '');
};

var BaseFormGroupSelect = function BaseFormGroupSelect(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      options = _ref.options,
      defaultValue = _ref.defaultValue,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired,
      isAsync = _ref.isAsync,
      disabled = _ref.disabled,
      _onChange = _ref.onChange,
      loadOptions = _ref.loadOptions,
      type = _ref.type,
      defaultOptions = _ref.defaultOptions;
  var intl = reactIntl.useIntl();
  return /*#__PURE__*/React__default.createElement(formik.Field, {
    name: fieldName
  }, function (_ref2) {
    var field = _ref2.field,
        form = _ref2.form;
    return /*#__PURE__*/React__default.createElement(Select, {
      placeholder: intl.formatMessage({
        id: messageId
      }),
      className: "" + (isRequired && getPropObject(errors, fieldName) && getPropObject(touched, fieldName) && 'is-invalid'),
      type: type,
      classNamePrefix: "Select",
      fieldName: fieldName,
      required: isRequired,
      value: options.find(function (item) {
        return item.value === field.value;
      }),
      defaultValue: defaultValue,
      disabled: disabled,
      errors: errors,
      isAsync: isAsync,
      loadOptions: loadOptions,
      defaultOptions: defaultOptions,
      touched: touched,
      options: options,
      onChange: function onChange(e) {
        form.setFieldValue(fieldName, e.value);

        if (_onChange) {
          _onChange(e);
        }
      }
    });
  });
};

var DataColetionService = /*#__PURE__*/function () {
  function DataColetionService() {}

  DataColetionService.getCitiesByCountry = function getCitiesByCountry(countryId, locale) {
    try {
      return Promise.resolve(HttpClient.get(API_GET_CITIES_BY_COUNTRY, {
        params: {
          countryId: countryId
        },
        isBackgroundRequest: true
      })).then(function (res) {
        return res.status === 200 ? mapDataToSelectOptions(res.data, locale) : [];
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  DataColetionService.getDistrictByCity = function getDistrictByCity(cityId, locale) {
    try {
      return Promise.resolve(HttpClient.get(API_GET_DISTRICTS_BY_CITY, {
        params: {
          cityId: cityId
        },
        isBackgroundRequest: true
      })).then(function (res) {
        return res.status === 200 ? mapDataToSelectOptions(res.data, locale) : [];
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  DataColetionService.getWardsByDistrict = function getWardsByDistrict(districtId, locale) {
    try {
      return Promise.resolve(HttpClient.get(API_GET_WARDS_BY_CITY, {
        params: {
          districtId: districtId
        },
        isBackgroundRequest: true
      })).then(function (res) {
        return res.status === 200 ? mapDataToSelectOptions(res.data, locale) : [];
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  DataColetionService.getAllBanks = function getAllBanks(locale) {
    try {
      return Promise.resolve(HttpClient.get(API_GET_BANKS, {
        isBackgroundRequest: true
      })).then(function (res) {
        return res.status === 200 ? mapDataToSelectOptions(res.data, locale) : [];
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return DataColetionService;
}();
var mapDataToSelectOptions = function mapDataToSelectOptions(data, lang) {
  return data.map(function (item) {
    return {
      value: item.id + '',
      id: item.id,
      label: item[lang === 'vi' ? 'vn' : 'en'] || item.vn
    };
  });
};

var useCityList = function useCityList(countryCode) {
  var _useState = React.useState([]),
      cities = _useState[0],
      setCities = _useState[1];

  var _useIntl = reactIntl.useIntl(),
      locale = _useIntl.locale;

  React.useEffect(function () {
    if (!countryCode) {
      return;
    }

    loadCitiesByCountry(countryCode);
  }, [countryCode]);

  var loadCitiesByCountry = function loadCitiesByCountry(code) {
    try {
      return Promise.resolve(DataColetionService.getCitiesByCountry(code, locale)).then(function (data) {
        setCities(data);
        return data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    cities: cities,
    loadCitiesByCountry: loadCitiesByCountry
  };
};
var useDistrictList = function useDistrictList(cityCode) {
  var _useState2 = React.useState([]),
      districts = _useState2[0],
      setDistricts = _useState2[1];

  var _useIntl2 = reactIntl.useIntl(),
      locale = _useIntl2.locale;

  React.useEffect(function () {
    if (!cityCode) {
      return;
    }

    loadDitrictsByCity(cityCode);
  }, [cityCode]);

  var loadDitrictsByCity = function loadDitrictsByCity(code) {
    try {
      return Promise.resolve(DataColetionService.getDistrictByCity(code, locale)).then(function (data) {
        setDistricts(data);
        return data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    districts: districts,
    loadDitrictsByCity: loadDitrictsByCity
  };
};
var useWardList = function useWardList(districtCode) {
  var _useState3 = React.useState([]),
      wards = _useState3[0],
      setWards = _useState3[1];

  var _useIntl3 = reactIntl.useIntl(),
      locale = _useIntl3.locale;

  React.useEffect(function () {
    if (!districtCode) {
      return;
    }

    loadWardsByDistrict(districtCode);
  }, [districtCode]);

  var loadWardsByDistrict = function loadWardsByDistrict(code) {
    try {
      return Promise.resolve(DataColetionService.getWardsByDistrict(code, locale)).then(function (data) {
        setWards(data);
        return data;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    wards: wards,
    loadWardsByDistrict: loadWardsByDistrict
  };
};
var useBankList = function useBankList() {
  var _useState4 = React.useState([]),
      banks = _useState4[0],
      setBanks = _useState4[1];

  var _useIntl4 = reactIntl.useIntl(),
      locale = _useIntl4.locale;

  React.useEffect(function () {
    loadBanks();
  }, []);

  var loadBanks = function loadBanks() {
    try {
      return Promise.resolve(DataColetionService.getAllBanks(locale)).then(function (_DataColetionService$) {
        setBanks(_DataColetionService$);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    banks: banks,
    loadBanks: loadBanks
  };
};

var validationSchema = Yup.object().shape({
  fullName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.fullname.required"
  })).matches(NAME_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.fullname.invalid"
    });
  }),
  icType: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })),
  icNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })).when('icType', {
    is: 'CMND',
    then: Yup.string().matches(PERSONAL_ID_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'CCCD',
    then: Yup.string().matches(CITIZEN_INDENTIFY_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'HC',
    then: Yup.string().matches(PASSPORT_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }),
  dateOfBirth: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  })),
  userDetails: Yup.object().shape({
    address: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.address.required"
    })),
    city: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.province.required"
    })),
    ward: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.ward.required"
    })),
    district: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.district.required"
    }))
  })
});

var UserAccountTab = function UserAccountTab() {
  var _useSelector = reactRedux.useSelector(function (state) {
    return state.auth.user;
  }),
      _useSelector$userDeta = _useSelector.userDetails,
      userDetails = _useSelector$userDeta === void 0 ? {} : _useSelector$userDeta,
      _useSelector$userSett = _useSelector.userSettings,
      userSettings = _useSelector$userSett === void 0 ? {} : _useSelector$userSett,
      user = _objectWithoutPropertiesLoose(_useSelector, ["userDetails", "userSettings"]);

  var dispatch = reactRedux.useDispatch();

  var _useCityList = useCityList(VN_COUNTRY_CODE),
      cities = _useCityList.cities;

  var _useDistrictList = useDistrictList(null),
      districts = _useDistrictList.districts,
      loadDitrictsByCity = _useDistrictList.loadDitrictsByCity;

  var _useWardList = useWardList(null),
      wards = _useWardList.wards,
      loadWardsByDistrict = _useWardList.loadWardsByDistrict;

  var _useBankList = useBankList(),
      banks = _useBankList.banks;

  var _useState = React.useState({
    url: userSettings.avatar,
    file: null
  }),
      avatar = _useState[0],
      setAvatar = _useState[1];

  React.useEffect(function () {
    if (userDetails && userDetails.city) {
      loadDitrictsByCity(userDetails.city);
      loadWardsByDistrict(userDetails.district);
    }
  }, []);

  var onChangeAvatar = function onChangeAvatar(e) {
    var validTypeExtension = ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'HEIF', 'HEVC', 'heic'];
    var file = e.target.files[0];

    if (!file) {
      return;
    }

    var fileType = file.type.split('/').pop().toLowerCase();

    if (validTypeExtension.indexOf(fileType) < 0) {
      toastError( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.updateInfo.imageTypeInvalid"
      }));
      return;
    }

    if (bytesToMb(file.size) >= MAX_FILE_SIZE) {
      toastError( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.updateInfo.imageExceedSize",
        values: {
          size: MAX_FILE_SIZE
        }
      }));
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setAvatar({
        url: reader.result,
        file: file
      });
    };
  };

  var onSubmit = function onSubmit(values) {
    try {
      dispatch(showConfirmAlert$1({
        title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
          id: "setting.accountInformation"
        }),
        isShow: true,
        content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
          id: "setting.updateInfo.confirmMessage"
        }),
        onConfirm: function onConfirm() {
          dispatch(updateUserInfo(trimObjectValues(values), avatar.file));
        }
      }));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  var onChangeCity = function onChangeCity(id, setFieldValue) {
    try {
      loadDitrictsByCity(id);
      setFieldValue('userDetails.district', '');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onChangeDistrict = function onChangeDistrict(id, setFieldValue) {
    try {
      loadWardsByDistrict(id);
      setFieldValue('userDetails.ward', '');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "mb-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "mr-2 my-25"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "users-avatar-shadow rounded",
    object: true,
    src: avatar.url,
    alt: "user profile image",
    height: "84",
    width: "84"
  })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "mt-2",
    body: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
    className: "font-medium-1 text-bold-600",
    style: {
      textTransform: 'uppercase'
    },
    tag: "p",
    heading: true
  }, user.fullName), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountCode"
  }), " : ", user.userCode), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex flex-wrap"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    tag: "label",
    className: "mr-1 mt-2",
    color: "primary",
    outline: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.Input, {
    type: "file",
    name: "file",
    id: "uploadImg",
    onChange: onChangeAvatar,
    hidden: true,
    accept: "image/*"
  }), /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.change"
  })))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    initialValues: _extends({}, user, {
      userDetails: userDetails,
      userSettings: userSettings
    })
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched,
        values = _ref.values,
        setFieldValue = _ref.setFieldValue;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      disabled: true,
      messageId: "register.fullname",
      fieldName: "fullName",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "3"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.idType",
      fieldName: "icType",
      disabled: true,
      options: IC_TYPES_OPTIONS,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "3"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.nbrPer",
      fieldName: "icNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormDatePicker$1, {
      disabled: true,
      messageId: "completeInformation.dateOfBirth",
      fieldName: "dateOfBirth",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.gender",
      fieldName: "gender",
      disabled: true,
      options: GENDER_OPTIONS,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      disabled: true,
      messageId: "register.phoneNumber",
      fieldName: "phoneNumber",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "register.email",
      fieldName: "email",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.address",
      fieldName: "userDetails.address",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.province",
      fieldName: "userDetails.city",
      options: cities,
      onChange: function onChange(_ref2) {
        var id = _ref2.id;
        return onChangeCity(id, setFieldValue);
      },
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.district",
      fieldName: "userDetails.district",
      options: districts,
      onChange: function onChange(_ref3) {
        var id = _ref3.id;
        return onChangeDistrict(id, setFieldValue);
      },
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.ward",
      fieldName: "userDetails.ward",
      options: wards,
      errors: errors,
      touched: touched
    }))), values.userType === USER_TYPE.KD ? /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.bank",
      fieldName: "userDetails.bankName",
      options: banks,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.branch",
      fieldName: "userDetails.bankBranch",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.accountNbr",
      fieldName: "userDetails.bankAccount",
      errors: errors,
      touched: touched
    }))) : '', /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end  mt-2",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button",
      color: "secondary",
      onClick: onClickBackHome
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.home"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "ml-2",
      type: "submit",
      color: "primary"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.saveChanges"
    })))));
  }), /*#__PURE__*/React__default.createElement(reactstrap.Row, null)));
};

var formSchema = Yup.object().shape({
  oldPassword: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "changePassword.oldPassword.required"
  })).matches(PASSWORD_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "changePassword.oldPassword.invalid"
    });
  }),
  newPassword: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "changePassword.newPassword.required"
  })).matches(PASSWORD_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "changePassword.newPassword.invalid"
    });
  }),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  })).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "changePassword.confirmPassword.required"
  }))
});

var ChangePassword = function ChangePassword() {
  var dispatch = reactRedux.useDispatch();

  var onClickSubmit = function onClickSubmit(values) {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.changePassword"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "changePassword.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(changePassword(values));
      }
    }));
  };

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    },
    onSubmit: onClickSubmit,
    validationSchema: formSchema
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, {
      className: "mt-3"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      type: "password",
      messageId: "changePassword.oldPassword",
      fieldName: "oldPassword",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      type: "password",
      messageId: "changePassword.newPassword",
      fieldName: "newPassword",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      type: "password",
      messageId: "createPassword.enterThePassword",
      fieldName: "passwordConfirmation",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.1"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.2"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.3"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end  mt-2",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button",
      color: "secondary",
      onClick: onClickBackHome
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.home"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      className: "ml-2",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.saveChanges"
    })))));
  });
};

var AccountSettings = function AccountSettings(props) {
  var _useState = React.useState('account-info'),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    return setActiveTab(props.activeTab);
  }, [props.activeTab]);
  return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, null, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, {
    className: "text-uppercase"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: 'setting.personalSetting'
  }))), /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Nav, {
    tabs: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'account-info'
    }),
    onClick: function onClick() {
      history.push('/account-info');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'change-password'
    }),
    onClick: function onClick() {
      history.push('/change-password');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React__default.createElement(reactstrap.TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "account-info"
  }, /*#__PURE__*/React__default.createElement(UserAccountTab, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "change-password"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    md: "6",
    sm: "11",
    className: "mx-auto"
  }, /*#__PURE__*/React__default.createElement(ChangePassword, null))))))));
};

var TERMS = [{
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

var InfoItems = function InfoItems(_ref) {
  var data = _ref.data,
      type = _ref.type;
  var intl = reactIntl.useIntl();

  var _useState = React.useState({
    collapseID: '',
    status: 'Closed'
  }),
      state = _useState[0],
      setState = _useState[1];

  var toggleCollapse = function toggleCollapse(collapseID) {
    collapseID = state.collapseID !== collapseID ? collapseID : '';
    setState(_extends({}, state, {
      collapseID: collapseID
    }));
  };

  var _onEntered = function onEntered(id) {
    if (id === state.collapseID) setState(_extends({}, state, {
      status: 'Opened'
    }));
  };

  var _onEntering = function onEntering(id) {
    if (id === state.collapseID) setState(_extends({}, state, {
      status: 'Opening...'
    }));
  };

  var _onExited = function onExited(id) {
    if (id === state.collapseID) setState(_extends({}, state, {
      status: 'Closed'
    }));
  };

  var _onExiting = function onExiting(id) {
    if (id === state.collapseID) setState(_extends({}, state, {
      status: 'Closing...'
    }));
  };

  return data.map(function (item1) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "collapse-margin",
      key: item1.id
    }, /*#__PURE__*/React__default.createElement(reactstrap.Card, {
      onClick: function onClick() {
        return toggleCollapse(item1.id);
      },
      className: classnames({
        'collapse-collapsed': state.status === 'Closed' && state.collapseID === item1.id,
        'collapse-shown': state.status === 'Opened' && state.collapseID === item1.id,
        closing: state.status === 'Closing...' && state.collapseID === item1.id,
        opening: state.status === 'Opening...' && state.collapseID === item1.id
      })
    }, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, {
      className: "p-1"
    }, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, {
      className: "lead collapse-title collapsed col-11 p-0\""
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "generalInfo." + type + "." + item1.id
    })), /*#__PURE__*/React__default.createElement(Icon.ChevronDown, {
      size: 15,
      className: "collapse-icon"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Collapse, {
      isOpen: item1.id === state.collapseID,
      onEntering: function onEntering() {
        return _onEntering(item1.id);
      },
      onEntered: function onEntered() {
        return _onEntered(item1.id);
      },
      onExiting: function onExiting() {
        return _onExiting(item1.id);
      },
      onExited: function onExited() {
        return _onExited(item1.id);
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, null, item1.items.map(function (item2) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("p", {
        className: "ml-1",
        key: item2.id,
        dangerouslySetInnerHTML: {
          __html: intl.formatMessage({
            id: "generalInfo." + type + "." + item1.id + "." + item2.id
          })
        }
      }), item2.items ? item2.items.map(function (item3) {
        return /*#__PURE__*/React__default.createElement("p", {
          className: "ml-2",
          key: item3.id,
          dangerouslySetInnerHTML: {
            __html: intl.formatMessage({
              id: "generalInfo." + type + "." + item1.id + "." + item2.id + "." + item3.id
            })
          }
        });
      }) : '');
    })))));
  });
};

var Terms = function Terms() {
  var dispatch = reactRedux.useDispatch();

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, null, /*#__PURE__*/React__default.createElement("div", {
    className: "vx-collapse"
  }, /*#__PURE__*/React__default.createElement(InfoItems, {
    data: TERMS,
    type: "terms"
  })), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.home"
  })))))));
};

var Radio = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Radio, _React$Component);

  function Radio() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("vx-radio-con " + this.props.className + " vx-radio-" + this.props.color)
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "radio",
      defaultChecked: this.props.defaultChecked,
      value: this.props.value,
      disabled: this.props.disabled,
      name: this.props.name,
      onClick: this.props.onClick,
      onChange: this.props.onChange,
      ref: this.props.ref,
      checked: this.props.checked
    }), /*#__PURE__*/React__default.createElement("span", {
      className: classnames("vx-radio", {
        "vx-radio-sm": this.props.size === "sm",
        "vx-radio-lg": this.props.size === "lg"
      })
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--border"
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--circle"
    })), /*#__PURE__*/React__default.createElement("span", null, this.props.label));
  };

  return Radio;
}(React__default.Component);

var LanguageTab = function LanguageTab() {
  var dispatch = reactRedux.useDispatch();
  var intl = reactIntl.useIntl();

  var _useState = React.useState(localStorage.getItem('language')),
      lang = _useState[0],
      setLang = _useState[1];

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  var onClickSaveChange = function onClickSaveChange(context) {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.language"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "generalInfo.changeLanguage.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(changeLanguageSetting(lang, function () {
          return context.switchLanguage(lang);
        }));
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(Context.Consumer, null, function (context) {
    return /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-3"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "mx-auto col-6"
    }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Radio, {
      label: intl.formatMessage({
        id: 'navbar.language.vi'
      }),
      color: "primary",
      onChange: function onChange() {
        return setLang('vi');
      },
      defaultChecked: context.state.locale === 'vi',
      name: "lang"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: intl.formatMessage({
        id: 'navbar.language.en'
      }),
      color: "primary",
      onChange: function onChange() {
        return setLang('en');
      },
      defaultChecked: context.state.locale === 'en',
      name: "lang"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end mt-3",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button",
      color: "secondary",
      onClick: onClickBackHome
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.home"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "ml-2",
      onClick: function onClick() {
        return onClickSaveChange(context);
      },
      color: "primary"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "common.saveChanges"
    }))));
  });
};

var POLICIES = [{
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

var Policies = function Policies() {
  var dispatch = reactRedux.useDispatch();

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, null, /*#__PURE__*/React__default.createElement("div", {
    className: "vx-collapse"
  }, /*#__PURE__*/React__default.createElement(InfoItems, {
    data: POLICIES,
    type: "policy"
  })), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.home"
  })))))));
};

function useDeviceDetect() {
  var _React$useState = React__default.useState(false),
      isMobile = _React$useState[0],
      setMobile = _React$useState[1];

  React__default.useEffect(function () {
    var userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    var mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile: isMobile
  };
}

var ContactTab = function ContactTab() {
  var _useDeviceDetect = useDeviceDetect(),
      isMobile = _useDeviceDetect.isMobile;

  var dispatch = reactRedux.useDispatch();

  var onClickBackHome = function onClickBackHome() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.home"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "common.backHome.confirmMessage"
      }),
      onConfirm: function onConfirm() {
        dispatch(goBackHomePage());
      }
    }));
  };

  var onClickCall = function onClickCall() {
    dispatch(showConfirmAlert$1({
      title: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.call"
      }),
      isShow: true,
      content: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "setting.call.confirmMessage",
        values: {
          phoneNumber: CONTACT_PHONE
        }
      }),
      onConfirm: function onConfirm() {
        window.open("tel:0899300800", '_blank');
      }
    }));
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    lg: "4",
    md: "6",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "w-300px mx-auto"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "box-content"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "mailto:lienhe@inon.vn",
    target: "_blank"
  }, "lienhe@inon.vn")), /*#__PURE__*/React__default.createElement("div", {
    className: "card-btns d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    className: "gradient-light-primary text-white"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "text-white",
    href: "mailto:lienhe@inon.vn",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.sendEmail"
  }))))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    lg: "4",
    md: "6",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "w-300px mx-auto"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "box-content"
  }, /*#__PURE__*/React__default.createElement("h5", null, CONTACT_PHONE)), /*#__PURE__*/React__default.createElement("div", {
    className: "card-btns d-flex justify-content-center mt-2"
  }, isMobile ? /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    className: "gradient-light-primary text-white",
    onClick: onClickCall
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.call"
  })) : ''))))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    className: "d-flex justify-content-end flex-wrap mt-2",
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    type: "button",
    color: "secondary",
    onClick: onClickBackHome
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "common.home"
  })))));
};

var GeneralInfo = function GeneralInfo(props) {
  var _useState = React.useState('terms-and-condition'),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    return setActiveTab(props.activeTab);
  }, [props.activeTab]);
  return /*#__PURE__*/React__default.createElement(reactstrap.Row, {
    className: "general-info"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, null, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, {
    className: "text-uppercase"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: 'setting.generalInformation'
  }))), /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Nav, {
    tabs: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'terms-and-condition'
    }),
    onClick: function onClick() {
      history.push('/terms-and-condition');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.FileText, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.termAndCondition"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'privacy-policy'
    }),
    onClick: function onClick() {
      history.push('/privacy-policy');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Shield, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.privacyPolicy"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'language'
    }),
    onClick: function onClick() {
      history.push('/language');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Globe, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.language"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'contact'
    }),
    onClick: function onClick() {
      history.push('/contact');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.contact"
  }))))), /*#__PURE__*/React__default.createElement(reactstrap.TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "terms-and-condition"
  }, /*#__PURE__*/React__default.createElement(Terms, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "privacy-policy"
  }, /*#__PURE__*/React__default.createElement(Policies, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "language"
  }, /*#__PURE__*/React__default.createElement(LanguageTab, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "contact"
  }, /*#__PURE__*/React__default.createElement(ContactTab, null)))))));
};

var CheckBox = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CheckBox, _React$Component);

  function CheckBox() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CheckBox.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "vx-checkbox-con " + (this.props.className ? this.props.className : '') + " vx-checkbox-" + this.props.color
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.defaultChecked,
      checked: this.props.checked,
      value: this.props.value,
      disabled: this.props.disabled,
      onClick: this.props.onClick ? this.props.onClick : null,
      onChange: this.props.onChange ? this.props.onChange : null
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "vx-checkbox vx-checkbox-" + (this.props.size ? this.props.size : 'md')
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "vx-checkbox--check"
    }, this.props.icon)), /*#__PURE__*/React__default.createElement("span", null, this.props.label));
  };

  return CheckBox;
}(React__default.Component);

var formSchema$1 = Yup.object().shape({
  username: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login.username.required"
  })),
  password: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login.password.required"
  })).matches(PASSWORD_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.password.invalid"
    });
  })
});

var Login = function Login() {
  var _useState = React.useState(null),
      rememberMe = _useState[0],
      setRememberMe = _useState[1];

  var _useState2 = React.useState(false),
      isRemeberMe = _useState2[0],
      setIsRemeberMe = _useState2[1];

  var dispatch = reactRedux.useDispatch();
  var loginStatus = reactRedux.useSelector(function (state) {
    return state.auth.loginStatus;
  });
  React.useEffect(function () {
    var user = JSON.parse(localStorage.getItem(REMEMBER_ME_TOKEN));

    if (user) {
      setRememberMe(user);
    }
  }, []);

  var onSubmit = function onSubmit(values, actions) {
    dispatch(loginAction({
      username: trimValue(values.username),
      password: values.password,
      isRemeberMe: isRemeberMe
    }));
    actions.setSubmitting(false);
  };

  var onClickNotMe = function onClickNotMe() {
    localStorage.removeItem(REMEMBER_ME_TOKEN);
    setRememberMe(null);
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    enableReinitialize: true,
    initialValues: {
      username: rememberMe ? rememberMe.username : '',
      password: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$1
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("h4", {
      className: "text-center text-white mb-3"
    }, rememberMe ? /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.sayHi",
      values: {
        name: rememberMe.name
      }
    }) : /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.firstWelcome"
    }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger mt-1"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.fail"
    })) : ''), rememberMe ? '' : /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "login.username",
      fieldName: "username",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.password"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.FastField, {
        name: "password"
      }, function (_ref2) {
        var field = _ref2.field,
            form = _ref2.form;
        return /*#__PURE__*/React__default.createElement(reactstrap.Input, _extends({
          type: "password",
          className: "form-control " + (errors.password && touched.password && 'is-invalid'),
          placeholder: msg
        }, field, {
          onChange: function onChange(e) {
            return form.setFieldValue('password', e.target.value);
          }
        }));
      }), errors.password && touched.password ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.password) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "d-flex justify-content-between align-items-center"
    }, rememberMe ? /*#__PURE__*/React__default.createElement("a", {
      onClick: onClickNotMe
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.notMe"
    })) : /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "login.rememberMe"
      }),
      onChange: function onChange(e) {
        return setIsRemeberMe(e.target.checked);
      },
      defaultChecked: isRemeberMe
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "divider",
      style: {
        height: '30px'
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "float-right"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/forgot-password",
      className: "text-white"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword"
    })))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login"
    }))));
  });
};

var formSchema$2 = Yup.object().shape({
  fullName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.fullname.required"
  })).matches(NAME_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.fullname.invalid"
    });
  }),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  })),
  phoneNumber: Yup.string().matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber.invalid"
    });
  }).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.phoneNumber.required"
  })),
  refCode: Yup.string().length(10, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.refCode.invalid"
    });
  }).matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.refCode.invalid"
    });
  })
});

var Register = function Register() {
  var _useState = React.useState(false),
      isAppcepted = _useState[0],
      setIsAppcepted = _useState[1];

  var _useState2 = React.useState(false),
      isNotApccepted = _useState2[0],
      setIsNotAccepted = _useState2[1];

  var dispatch = reactRedux.useDispatch();
  var intl = reactIntl.useIntl();

  var onSubmit = function onSubmit(values) {
    try {
      if (!isAppcepted) {
        setIsNotAccepted(true);
        return Promise.resolve();
      }

      dispatch(register(values));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var ontoggleAccepted = function ontoggleAccepted(checked) {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      refCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$2
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      fieldName: "fullName",
      errors: errors,
      touched: touched,
      messageId: "register.fullname"
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      fieldName: "email",
      errors: errors,
      touched: touched,
      messageId: "register.email"
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      fieldName: "phoneNumber",
      errors: errors,
      touched: touched,
      messageId: "register.phoneNumber"
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      fieldName: "refCode",
      errors: errors,
      touched: touched,
      messageId: "register.refCode"
    }), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      onChange: function onChange(e) {
        return ontoggleAccepted(e.target.checked);
      },
      defaultChecked: isAppcepted
    }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.agreeWith"
    }), ' ', /*#__PURE__*/React__default.createElement("a", {
      className: "text-primary"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.policyAndCondition"
    })), ' ', /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.useService"
    }))), isNotApccepted ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.mustAppcepted"
    })) : null, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register"
    })))));
  });
};

var formSchema$3 = Yup.object().shape({
  username: Yup.string().matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.username.invalid"
    });
  }).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.username.required"
  })),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  }))
});

var ForgotPassword = function ForgotPassword() {
  var _useState = React.useState(false),
      isModalOpen = _useState[0],
      setIsOpenModal = _useState[1];

  var _useState2 = React.useState(''),
      emailSuggestion = _useState2[0],
      setEmailSuggestion = _useState2[1];

  var dispatch = reactRedux.useDispatch();

  var onSubmit = function onSubmit(values, actions) {
    dispatch(forgotPassword(values));
  };

  var onClickSuggestion = function onClickSuggestion(username) {
    try {
      return Promise.resolve(AuthService.getSuggestionEmail(username)).then(function (res) {
        if (res.status === 200) {
          setEmailSuggestion(res.data);
          toggleModal();
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var toggleModal = function toggleModal() {
    setIsOpenModal(!isModalOpen);
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$3
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched,
        values = _ref.values;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("h4", {
      className: "text-center text-white"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative mt-3"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.username"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "username",
        className: "form-control " + (errors.username && touched.username && 'is-invalid'),
        placeholder: msg
      }), errors.username && touched.username ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.username) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.email"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.FastField, {
        name: "email"
      }, function (_ref2) {
        var field = _ref2.field,
            form = _ref2.form;
        return /*#__PURE__*/React__default.createElement(reactstrap.Input, _extends({
          className: "" + (errors.email && touched.email && 'is-invalid not-show-icon'),
          placeholder: msg
        }, field, {
          onChange: function onChange(e) {
            return form.setFieldValue('email', e.target.value);
          }
        }));
      }), errors.email && touched.email ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.email) : null, values.username ? /*#__PURE__*/React__default.createElement("div", {
        className: "form-control-position text-primary cursor-pointer",
        onClick: function onClick() {
          return onClickSuggestion(values.username);
        }
      }, /*#__PURE__*/React__default.createElement(Icon.Sun, {
        size: 15
      })) : '', /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.verify"
    }))));
  }), /*#__PURE__*/React__default.createElement(reactstrap.Modal, {
    isOpen: isModalOpen,
    toggle: toggleModal,
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React__default.createElement(reactstrap.ModalBody, {
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/React__default.createElement("div", null, !emailSuggestion ? /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.notFoundEmailSuggestion"
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.yourEmailIs"
  }), ":", ' ', /*#__PURE__*/React__default.createElement("b", null, emailSuggestion))), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-end"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    color: "primary",
    onClick: toggleModal
  }, "OK"), ' ')))));
};

var formSchema$4 = Yup.object().shape({
  password: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.password.required"
  })).matches(PASSWORD_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.password.invalid"
    });
  }),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  })).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.password.required"
  }))
});

var CreatePassword = function CreatePassword(_ref) {
  var isLanding2 = _ref.isLanding2;
  var history = reactRouterDom.useHistory();
  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    isLanding2 ? setRegisterToken() : setResetPassword();
  }, []);

  var onClickContinue = function onClickContinue(values) {
    if (isLanding2) {
      dispatch(createPassword(values.password));
    } else {
      dispatch(resetPassword(values.password));
    }
  };

  var setRegisterToken = function setRegisterToken() {
    var code = new URLSearchParams(document.location.search).get('registerToken');

    if (code) {
      dispatch(saveRegisterToken(code));
      history.push(history.location.pathname);
    }
  };

  var setResetPassword = function setResetPassword() {
    var code = new URLSearchParams(document.location.search).get('resetToken');

    if (code) {
      dispatch(saveResetPasswordToken(code));
      history.push(history.location.pathname);
    }
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: onClickContinue,
    validationSchema: formSchema$4
  }, function (_ref2) {
    var errors = _ref2.errors,
        touched = _ref2.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("div", {
      className: "text-center mb-3"
    }, /*#__PURE__*/React__default.createElement("h4", {
      className: isLanding2 ? 'font-weight-bold' : 'font-weight-bold text-white'
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.title"
    }))), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      type: "password",
      messageId: "login.password",
      fieldName: "password",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      type: "password",
      messageId: "createPassword.enterThePassword",
      fieldName: "passwordConfirmation",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.1"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.2"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.3"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: isLanding2 ? 'createPassword.continutes' : 'createPassword.done'
    }))));
  });
};

var LandingHeader = function LandingHeader(_ref) {
  var isLanding2 = _ref.isLanding2;
  return /*#__PURE__*/React__default.createElement(Context.Consumer, null, function (context) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/"
    }, /*#__PURE__*/React__default.createElement("img", {
      src: isLanding2 ? IMAGE.LOGO : IMAGE.LOGO_WHITE,
      alt: "logo"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "languages d-flex align-items-center ",
      style: {
        paddingTop: '20px'
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return context.switchLanguage('vi');
      },
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'vi'
      })
    }, "VIE"), /*#__PURE__*/React__default.createElement("div", {
      className: "divider mr-1",
      style: {
        height: '15px'
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return context.switchLanguage('en');
      },
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  });
};

var LandingFooter = function LandingFooter() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "ld-footer pt-2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-none d-lg-flex justify-content-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "d-block d-lg-none text-center"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  })))));
};

var size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};
var devices = {
  tablet: "(max-width: " + size.tablet + ")",
  laptop: "(max-width: " + size.laptop + ")"
};

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  height: 100%;\n  .landing-page {\n    background-image: url('", "');\n\n    @media ", " {\n      background-image: url('", "');\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var PagetStyle = styled.div(_templateObject(), IMAGE.LANDING_PAGE_BG, devices.laptop, IMAGE.LANDING_PAGE_TABLET_BG);

var LandingPage = function LandingPage(props) {
  var _useState = React.useState(''),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    setActiveTab(props.activeTab || 'login');
  }, [props.activeTab]);

  var TabView = function TabView() {
    switch (activeTab) {
      case 'login':
        return /*#__PURE__*/React__default.createElement(Login, null);

      case 'register':
        return /*#__PURE__*/React__default.createElement(Register, null);

      case 'forgot-password':
        return /*#__PURE__*/React__default.createElement(ForgotPassword, null);

      case 'reset-password':
      case 'provide-new-password':
        return /*#__PURE__*/React__default.createElement(CreatePassword, null);

      default:
        return '';
    }
  };

  var goToLink = function goToLink(link) {
    return history.push(link);
  };

  return /*#__PURE__*/React__default.createElement(PagetStyle, null, /*#__PURE__*/React__default.createElement("div", {
    className: "landing-page"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "position-absolute w-100"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "ld-main"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-1 mb-md-3 mb-xl-5"
  }, /*#__PURE__*/React__default.createElement(LandingHeader, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "lg-content-header d-flex cursor-pointer"
  }, /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return goToLink('/login');
    },
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'login'
    })
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login"
  })), /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return goToLink('/register');
    },
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'register'
    })
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "lg-content p-2 p-md-4 p-lg-5"
  }, /*#__PURE__*/React__default.createElement(TabView, null))), /*#__PURE__*/React__default.createElement(LandingFooter, null)));
};

var CompleteInforValidate = Yup.object().shape({
  icNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.idType.required"
  })).when('icType', {
    is: 'CMND',
    then: Yup.string().matches(PERSONAL_ID_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'CCCD',
    then: Yup.string().matches(CITIZEN_INDENTIFY_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'HC',
    then: Yup.string().matches(PASSPORT_REGEX, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }),
  dateOfBirth: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  address: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.address.required"
  })),
  bankName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.bank.required"
  })),
  bankBranch: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.branch.required"
  })),
  bankNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.accountNbr.required"
  })),
  city: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.province.required"
  })),
  ward: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.ward.required"
  })),
  district: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.district.required"
  })),
  refCode: Yup.string().matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.refCode.invalid"
    });
  })
});

var CompleteInformation = function CompleteInformation() {
  var user = reactRedux.useSelector(function (state) {
    return state.auth.register.user;
  });

  var _useCityList = useCityList(VN_COUNTRY_CODE),
      cities = _useCityList.cities;

  var _useDistrictList = useDistrictList(cities[0] ? cities[0].id : null),
      districts = _useDistrictList.districts,
      loadDitrictsByCity = _useDistrictList.loadDitrictsByCity;

  var _useWardList = useWardList(districts[0] ? districts[0].id : null),
      wards = _useWardList.wards,
      loadWardsByDistrict = _useWardList.loadWardsByDistrict;

  var _useBankList = useBankList(),
      banks = _useBankList.banks;

  var dispatch = reactRedux.useDispatch();

  var onSubmit = function onSubmit(values) {
    dispatch(compeleteInfo(trimObjectValues(values)));
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "completeInfor"
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
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
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      lg: "3",
      className: "mb-3"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.fullname"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.fullName)), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2  mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.phoneNumber)), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2  mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, "Email*")), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.email))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      lg: "9"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.idType",
      fieldName: "icType",
      options: IC_TYPES_OPTIONS,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.nbrPer",
      fieldName: "icNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormDatePicker$1, {
      messageId: "completeInformation.dateOfBirth",
      fieldName: "dateOfBirth",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.gender",
      fieldName: "gender",
      defaultValue: GENDER_OPTIONS[0],
      options: GENDER_OPTIONS,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.province",
      fieldName: "city",
      options: cities,
      onChange: function onChange(_ref2) {
        var id = _ref2.id;
        return loadDitrictsByCity(id);
      },
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.district",
      fieldName: "district",
      options: districts,
      onChange: function onChange(_ref3) {
        var id = _ref3.id;
        return loadWardsByDistrict(id);
      },
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.ward",
      fieldName: "ward",
      options: wards,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "8"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.address",
      fieldName: "address",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.gif",
      fieldName: "refCode",
      isRequired: false
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect, {
      messageId: "completeInformation.bank",
      fieldName: "bankName",
      options: banks,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.branch",
      fieldName: "bankBranch",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup, {
      messageId: "completeInformation.accountNbr",
      fieldName: "bankNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center justify-content-md-end"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/create-password"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.back"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "submit",
      className: "ml-2"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.done"
    }))))));
  }));
};

var LandingPage2 = function LandingPage2(props) {
  var _useState = React.useState(''),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    setActiveTab(props.activeTab || 'create-password');
  }, [props.activeTab]);

  var TabView = function TabView() {
    switch (activeTab) {
      case 'create-password':
        return /*#__PURE__*/React__default.createElement("div", {
          className: "col-12 col-md-10 cpl-lg-8 mx-auto"
        }, /*#__PURE__*/React__default.createElement(CreatePassword, {
          isLanding2: true
        }));

      case 'complete-information':
        return /*#__PURE__*/React__default.createElement(CompleteInformation, {
          isLanding2: true
        });

      default:
        return '';
    }
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "landing-page",
    style: {
      backgroundImage: "url('" + IMAGE.LANDING_PAGE_2_BG + "')"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-10 mx-auto mb-5"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-main2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-header d-flex justify-content-between  mb-5"
  }, /*#__PURE__*/React__default.createElement(LandingHeader, {
    isLanding2: true
  })), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('lg-content p-2 p-md-4 p-lg-5 col-12 mx-auto', {
      'col-lg-6 col-md-8': activeTab !== 'complete-information'
    })
  }, /*#__PURE__*/React__default.createElement(TabView, null)))), /*#__PURE__*/React__default.createElement(LandingFooter, null)));
};

var ConfirmAlert = function ConfirmAlert() {
  var _useSelector = reactRedux.useSelector(function (state) {
    return state.ui.confirmAlert;
  }),
      title = _useSelector.title,
      isShow = _useSelector.isShow,
      content = _useSelector.content,
      onConfirm = _useSelector.onConfirm,
      onCancel = _useSelector.onCancel,
      confirmBtnText = _useSelector.confirmBtnText,
      cancelBtnText = _useSelector.cancelBtnText,
      otherConfigs = _objectWithoutPropertiesLoose(_useSelector, ["title", "isShow", "content", "onConfirm", "onCancel", "confirmBtnText", "cancelBtnText"]);

  var dispatch = reactRedux.useDispatch();
  var intl = reactIntl.useIntl();

  var onClickConfirm = function onClickConfirm() {
    if (onConfirm) {
      onConfirm();
    }

    dispatch(hideConfirmAlert());
  };

  var onClickCancel = function onClickCancel() {
    if (onCancel) {
      onCancel();
    }

    dispatch(hideConfirmAlert());
  };

  return /*#__PURE__*/React__default.createElement(SweetAlert, _extends({
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

var AppRouter = function AppRouter(props) {
  var checkLoginStatus = props.checkLoginStatus,
      appId = props.appId,
      user = props.user,
      loginStatus = props.loginStatus,
      isAuthentication = props.isAuthentication,
      authToken = props.authToken,
      children = props.children,
      loadNavtigation = props.loadNavtigation,
      loadUserRoles = props.loadUserRoles,
      setAppId = props.setAppId,
      history = props.history,
      message = props.message;
  React.useEffect(function () {
    setAppId(appId);
    var urlParams = new URLSearchParams(document.location.search);
    var code = urlParams.get('code') || authToken;
    var redirectUrl = urlParams.get('redirectUrl');

    if (code && loginStatus !== LOGIN_STATUS.SUCCESS) {
      checkLoginStatus(code, redirectUrl);
    }

    if (authToken) {
      loadNavtigation(appId);
      loadUserRoles();
    }
  }, [authToken]);

  var setMessages = function setMessages(message) {
    if (message === void 0) {
      message = {};
    }

    var newMessage = {};
    Object.keys(message).forEach(function (key) {
      newMessage[appId + '.' + key] = message[key];
    });
    return newMessage;
  };

  var appMessage = {
    en: _extends({}, messages_en, setMessages(message.en)),
    vi: _extends({}, messages_vi, setMessages(message.vi))
  };
  var settingRoutes = [{
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
  var landingPageRoutes = [{
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
  var landingPage2Routes = [{
    path: 'create-password'
  }, {
    path: 'complete-information'
  }];
  return /*#__PURE__*/React__default.createElement(IntlProviderWrapper, {
    locale: user && user.userSettings ? user.userSettings.language.toLowerCase() : localStorage.getItem('language'),
    appMessage: appMessage
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Router, {
    history: history
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: "/",
    render: function render(props) {
      return isAuthentication ? /*#__PURE__*/React__default.createElement(Layout$1, _extends({}, props, {
        appId: appId
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, settingRoutes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(item.component, {
              activeTab: item.path
            });
          }
        });
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/",
        render: function render() {
          return children;
        }
      }))) : /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, landingPageRoutes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(LandingPage, {
              activeTab: item.path
            });
          }
        });
      }), landingPage2Routes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(LandingPage2, {
              activeTab: item.path
            });
          }
        });
      }), appId === AppId.ELITE_APP ? /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/",
        render: function render() {
          return children;
        }
      }) : /*#__PURE__*/React__default.createElement(reactRouterDom.Redirect, {
        from: "/",
        to: "/login"
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Redirect, {
        from: "/",
        to: "/"
      }));
    }
  }))), /*#__PURE__*/React__default.createElement(reactToastify.ToastContainer, {
    hideProgressBar: true,
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true
  }), /*#__PURE__*/React__default.createElement(ConfirmAlert, null));
};

var mapStateToProps$3 = function mapStateToProps(state) {
  return {
    isAuthentication: !!state.auth.authToken,
    authToken: state.auth.authToken,
    loginStatus: state.auth.loginStatus,
    user: state.auth.user
  };
};

var AppRouter$1 = reactRedux.connect(mapStateToProps$3, {
  checkLoginStatus: checkLoginStatus,
  loadNavtigation: loadNavtigation,
  loadUserRoles: loadUserRoles,
  loginAction: loginAction,
  setAppId: setAppId
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

var LoadingSpinner = function LoadingSpinner() {
  var _useSelector = reactRedux.useSelector(function (state) {
    return state.ui;
  }),
      isLoading = _useSelector.isLoading;

  return isLoading ? /*#__PURE__*/React__default.createElement(TopBarProgress, null) : null;
};

var RippleButton = function RippleButton(_ref) {
  var rippleColor = _ref.rippleColor,
      during = _ref.during,
      block = _ref.block,
      rest = _objectWithoutPropertiesLoose(_ref, ["rippleColor", "during", "block"]);

  return /*#__PURE__*/React__default.createElement(Ripples, {
    color: rippleColor ? rippleColor : "rgba(255, 255, 255, .5)",
    during: during,
    className: "" + (block ? "d-block" : "")
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, rest));
};

RippleButton.propTypes = _extends({}, reactstrap.Button.propTypes, {
  rippleColor: PropTypes.string,
  during: PropTypes.number
});
reactstrap.Button.Ripple = RippleButton;

var isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

var App = function App(_ref) {
  var children = _ref.children,
      appId = _ref.appId,
      appReducer = _ref.appReducer,
      message = _ref.message,
      apiBaseUrl = _ref.apiBaseUrl,
      history = _ref.history;
  var middlewares = [thunk, createDebounce()];
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  var store = redux.createStore(rootReducer(appReducer), {}, composeEnhancers(redux.applyMiddleware.apply(void 0, middlewares)));
  var persistor = reduxPersist.persistStore(store);
  setBaseHistory(history);
  setUpHttpClient(store, apiBaseUrl);
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(react.PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React__default.createElement(LoadingSpinner, null), /*#__PURE__*/React__default.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    history: history,
    children: children
  })));
};

unregister();

var FallbackSpinner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FallbackSpinner, _React$Component);

  function FallbackSpinner() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FallbackSpinner.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "fallback-spinner"
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "fallback-logo",
      src: IMAGE.LOGO,
      alt: "logo"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-3 effects"
    })));
  };

  return FallbackSpinner;
}(React__default.Component);

var SHOW_CONFIRM_ALERT$1 = 'SHOW_CONFIRM_ALERT';
var HIDE_CONFIRM_ALERT$1 = 'HIDE_CONFIRM_ALERT';
var showConfirmAlert$2 = function showConfirmAlert(configs) {
  return function (dispatch) {
    return dispatch({
      type: SHOW_CONFIRM_ALERT$1,
      payload: configs
    });
  };
};
var hideConfirmAlert$1 = function hideConfirmAlert() {
  return function (dispatch) {
    return dispatch({
      type: HIDE_CONFIRM_ALERT$1
    });
  };
};

var usePageAuthorities = function usePageAuthorities() {
  var _useState = React.useState([]),
      authorities = _useState[0],
      setAuthorities = _useState[1];

  var _useSelector = reactRedux.useSelector(function (state) {
    return state.navbar;
  }),
      userRoles = _useSelector.userRoles,
      roles = _useSelector.roles;

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    var roleList = roles.filter(function (item) {
      return history.location.pathname.includes(item.menuPath);
    });

    if (!roleList.length) {
      return;
    }

    roleList.sort(function (a, b) {
      return a.id - b.id;
    });
    var lastRole = roleList[roleList.length - 1];
    var userRoleList = userRoles.filter(function (item) {
      return item.roleId === lastRole.id;
    });
    var authList = userRoleList.map(function (item) {
      return item.authority;
    });
    setAuthorities(authList);
  }, [userRoles, history.location.pathname]);
  return authorities;
};

Object.defineProperty(exports, 'toast', {
  enumerable: true,
  get: function () {
    return reactToastify.toast;
  }
});
Object.defineProperty(exports, 'FormattedMessage', {
  enumerable: true,
  get: function () {
    return reactIntl.FormattedMessage;
  }
});
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () {
    return reactstrap.Button;
  }
});
exports.AppId = AppId;
exports.AutoComplete = Autocomplete;
exports.BaseApp = App;
exports.BaseAppConfigs = appConfigs;
exports.BaseAppUltils = index;
exports.BaseFormDatePicker = BaseFormDatePicker$1;
exports.BaseFormGroup = BaseFormGroup;
exports.BaseFormGroupSelect = BaseFormGroupSelect;
exports.Checkbox = CheckBox;
exports.DatePicker = DatePicker;
exports.FallbackSpinner = FallbackSpinner;
exports.HttpClient = HttpClient;
exports.Radio = Radio;
exports.Select = Select;
exports.hideConfirmAlert = hideConfirmAlert$1;
exports.showConfirmAlert = showConfirmAlert$2;
exports.useBankList = useBankList;
exports.useCityList = useCityList;
exports.useDeviceDetect = useDeviceDetect;
exports.useDistrictList = useDistrictList;
exports.usePageAuthorities = usePageAuthorities;
exports.useWardList = useWardList;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
